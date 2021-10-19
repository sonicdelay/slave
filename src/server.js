const path = require("path");
const http = require("http");
const uuid = require("uuid");
const express = require("express");
const serveIndex = require("serve-index");
const fs = require("fs");
//const mmm = require("mmmagic");
const db = require("./database.js")
    //import * as http from 'http';
    //const ws = require('ws');
    //const expressWs = require('express-ws');

const contentPath = "./src/public";
const dataPath = "../";
const port = "3456";

console.log(path.resolve(contentPath));

const auth = {
    login: "admin",
    password: "admin",
};

//const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
const app = express();
const server = http.createServer(app);

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("pages/index", { title: "Hey", message: "Hello there!" });
});
app.get("/about", (req, res) => {
    res.render("pages/about", {});
});


app.get("/db", (req, res, next) => {
    const sql = "SELECT * FROM data"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
            // {
            //     "message": "success",
            //     "data": rows
            // })
    });
});



app.use(
    "/",
    express.static(contentPath),
    serveIndex(contentPath, { icons: false, hidden: true }),
);



// app.use("/datax/:id", (req, res, next) => {
//   const id = req.params.id;
//   res.send(`
//  <html>
//  <head>
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
//  <style>
//  * {
//    margin:0;
//    padding:0;
//    width:100%;
//    height:100%;
//    background-color:#404040;
//    box-sizing: border-box;
//  }

// .extra {
//    background-color:#808080;
// }
//  </style> 
//  </head>
//  <body>
//    <video poster="/data/${id}" preload="auto">
//     <source src="/data/${id}"></source>
//     </video>
//       <script>
//         document.querySelector("video").addEventListener('dblclick',(ev)=>{
//           ev.target.classList.toggle('extra');
//           ev.target.toggleAttribute("controls");
//         });
//       </script>
//     </body>
//   </html>
//   `);
// });

// app.use("/data/:id", (req, res, next) => {
//   const rootPath = path.resolve(dataPath);
//   const id = req.params.id;
//   const folderpath = id.match(/.{1,4}/g);
//   url = `${rootPath}/${folderpath.join("/")}/${id}`;

//   console.log(req.method, url);
//   try {
//     if (fs.existsSync(url)) {
//       stats = fs.statSync(url);
//       magic.detectFile(url, (err, result) => {
//         console.log(result);
//         res.type(result);
//         res.sendFile(url);
//       });
//     }
//   } catch (err) {
//     res.send("No file named " + id);
//   }
// });
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render("error", { error: err });
});

server.listen(port, () => {
    console.log(`Listen e.g. on http://localhost:${port}.`);
});

//const wss = expressWs(app, server);
//const aWss = wss.getWss('*');
//aWss.on('connection', ws => {
//  console.log('[WSS] connected');
//  ws.id = uuid.v4().toString();
//  ws.send(JSON.stringify({ type: 'wss:connected', id: ws.id }));
//});
//app.ws('*', (ws, req) => {
//  ws.id = uuid.v4().toString();
//  ws.on('message', msg => {
//    console.log('msg:', msg, ws.id);
//    ws.send(JSON.stringify({ msg: new Date() }));
//  });
//});
//console.log('[WSS] connected');
//  private handleActions() {
//    this.app.on('action', (action: Action) => {
//      switch (action.type) {
//        case 'wss:send':
//          let target = action.target || '';
//          let data = action.data || '';
//          this.broadcast(target, data);
//          break;
//        case 'wss:lifebeat':
//          setInterval(() => {
//            this.broadcast('', {
//              type: 'wss:lifebeat',
//              timestampdate: new Date(),
//            });
//          }, 5000);
//          break;
//      }
//    });
//  }
//  public broadcast(id: string, msg: any) {
//    this.aWss.clients.forEach((client) => {
//      if (id === '' || client.id === id) {
//        if(typeof msg !== 'string') msg=JSON.stringify(msg);
//        client.send(msg);
//      }
//    });
//  }
// 0a09be49fbef2ee3cc94a14690b3ff92f1cfc5617dff585e2d4ec2fbfab7db53
// 6b287fd2edbe05a48f2b1c53c0472d978258a9606d88b052aceeb89b9e0208b4
// 000012b25fbe8f044fd55617783731f8310bdec8061aa3cfa1ac4902d8b8097e
