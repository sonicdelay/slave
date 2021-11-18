const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const vm = require('vm');
const ws = require('ws');
const express = require('express');
const serveIndex = require('serve-index');
const uuid = require('uuid');
const os = require('os');
const inspect = require('util').inspect;
const bodyParser = require('body-parser');
const Busboy = require('busboy');

const contentPath = "../";
const app = express();
const auth = { login: 'admin', password: 'admin' };

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.post('*', (req, res, next) => {
  const busboy = new Busboy({
    headers: req.headers,
    limits: {
      fileSize: 256 * 1024 * 1024,
    },
  });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (filename != "") {
      var saveTo = path.join(os.tmpdir(), path.basename(filename));
      if(!req.body[fieldname]) req.body[fieldname] = [];
      try {
        file.pipe(fs.createWriteStream(saveTo));
        req.body[fieldname].push({
          tmpFile: saveTo, filename, encoding, mimetype
        });
      } catch (e) {
        next();
      }
    }
  });
  busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
    if(!req.body[fieldname]) req.body[fieldname] = [];
    req.body[fieldname].push(val);
  });
  busboy.on('finish', next);
  req.pipe(busboy);
});

app.use((req, res, next) => {
  console.log("--------------------------------------");
  console.log(req.method, req.url, req.body);
  next();
});


app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }
  res.set("WWW-Authenticate", 'Basic realm="401"');
  res.status(401).send("Authentication required.");
});

app.use((req, res, next) => {
  const reqUrl = new URL(req.url, req.protocol + '://' + req.headers.host + '/');
  let filepath = path.resolve(contentPath + reqUrl.pathname);
  if (reqUrl && reqUrl.pathname.indexOf(".es6") !== -1) {
    fs.stat(filepath, (err, stats) => {
      if (err) {
        next();
      }
      fs.readFile(filepath, (err, data) => {
        if (err) {
          next({ status: 404, message: err.toString() });
        }
        if (reqUrl.search === "?exec") {
          try {
            const sandbox = {
              __dirname,
              __filename,
              console,
              require,
              global,
              reqUrl,
              app,
              req,
              res,
              next
            };
            vm.runInNewContext(data.toString(), sandbox);
            next();
          } catch (e) {
            next({
              status: null,
              path: filepath,
              error: e.toString(),
              stack: String(e.stack)
            });
          }
        } else {
          res.sendFile(filepath, { headers: { 'Content-Type': 'text/plain' } });
        }
      });
    });
  } else next();
});

app.use(
  (req, res, next) => {
    if (req.url.indexOf(".es6") === -1) {
      return express.static(path.join(__dirname, contentPath), options = {
        dotfiles: 'allow'
      })(req, res, next);
      return next();
    }
  }
  , serveIndex(path.join(__dirname, contentPath), {
    'icons': true,
    'hidden': true,
    'template': function (locals, cb) {
      locals.style = undefined;
      console.dir(locals);
      cb(null, `<html><body>
      <h1>${locals.directory}&nbsp;<label>+<input type="file" multiple style="display:none;" />
      </label></h1>
      <ul>
      ${locals.fileList.map((item, i) => `<li><a href="${item.name}">${item.name}</a></li>\r\n`).join('')}
      </ul>
      <!-- 
      [${locals.fileList.map((item, i) => `{"name":"${item.name}"},\r\n`).join('')}]
      ${locals.fileList.map((item, i) => `<img><a href="${item.name}" style="background-color:#404040;background-repeat:no-repeat;background-position: center center;background-size:contain;width:128px;height:128px;  background-image:url('${item.name}');float:left;"></a>`).join('')}
      -->
      </body>
      </html>
      `);
    }
  }));
//##### Error handler #####
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.status) res.status(err.status);
  res.json(err);
});

//##### Action logger #####
app.on("action", function (msg) {
  console.log(msg);
});

const server = app.listen(3000, function () {
  console.log('server is running at %s', server.address().port);
});

//##### WSS setup #####
const wss = new ws.Server({ server });
wss.on("connection", (ws) => {
  ws.id = uuid.v4().toString();
  console.log(ws.id);
  ws.on("message", (message) => {
    try {
      message = JSON.parse(message);
    } catch (e) {
      console.error(e);
    }
    app.emit("action", message);
  });
  ws.on('close', () => {
    console.log('disconnected');
    ws.terminate();
  });
  app.wss = wss;
});

const broadcast = (msg, id = '') => {
  app.wss.clients.forEach((client) => {
    if (id === '' || client.id === id) {
      if (typeof msg !== 'string') msg = JSON.stringify(msg);
      client.send(msg);
    }
  });
};