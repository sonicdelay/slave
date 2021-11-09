import './bootstrap.bundle.min.js';

const nav = {
  Frontend: `//${window.location.hostname}:4200`,
  Adminer: `//${window.location.hostname}:8081`,
};
const entrypoint = "main.html";
let theme = "light";

document.addEventListener("DOMContentLoaded", (event) => {
  detectColorScheme();
  keyboardhandler();
  linkHandler();
  load(entrypoint, 'body');
  load('lorem.html', '#content');
  console.log("Loaded");
});

let ws = null;
let new_uri;
const loc = window.location;

if (loc.protocol === 'https:') {
  new_uri = 'wss:';
} else {
  new_uri = 'ws:';
}
new_uri += `//${loc.host}`;

const connect = (url) => {
  try {
    ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send('{"type":"app:wss:connected"}');
      ws.onmessage = function (ev) {
        var data = ev.data;
        handleData(data);
      };

      ws.onclose = (evt) => {
        ws = null;
        console.log('ws connection error');
        setTimeout(() => {
          console.log('reconnect');
          connect(new_uri);
        }, 5000);
      };

      ws.onerror = (evt) => {
        console.log(evt);
      };
    };
  } catch (e) {
    console.log(e);
    setTimeout(() => {
      connect(new_uri);
    }, 5000);
  }
};

const sendMsg = (msg) => {
  if (ws != null && ws.readyState == 1) {
    ws.send(msg);
  }
};

const handleData = (data) => {
  try {
    var parsedData = JSON.parse(data);
    $('#feedback').val(JSON.stringify(parsedData, null, 2));
  } catch (e) {
    console.log(data);
  }
};

$(document).ready(() => {
  // for (let key in nav) {
  //   var button = document.createElement('button');
  //   button.innerHTML = key;
  //   button.addEventListener('click', () => {
  //     document.open(nav[key], '', '');
  //   });
  //   document.querySelector('#nav').appendChild(button);
  // }

  connect(new_uri);
  setInterval(
    () =>
      sendMsg(
        JSON.stringify({
          type: 'app:wss:lifebeat',
          timestamp: new Date(),
        })
      ),
    10000
  );

  $('#action').on('change keyup paste', (ev) => {
    try {
      var parsedData = JSON.parse($('#action').val());
      $('#action').removeClass('error');
      $('#action').val(JSON.stringify(parsedData, null, 2));
    } catch (e) {
      $('#action').addClass('error');
      console.log(e);
    }
  });

  $('.send').click(() => {
    console.log($('#action').val());
    sendMsg($('#action').val());
  });

  $('#action').val(JSON.stringify({ type: 'app:wss:echo' }, null, 2));

  $('#file').on('change', (evt) => {
    const formData = new FormData();
    const files = evt.target.files;

    $.each(files, (obj, v) => {
      console.log(obj, v);
      formData.append('file[]', v);
    });

    console.dir(document.location.pathname);

    $.ajax({
      url: '/api/fm/',
      data: formData,
      type: 'POST',
      contentType: false,
      processData: false,
    });
  });
});


const keyboardhandler = () => {
  document.addEventListener("keydown", (ev) => {
    console.log(ev);
    if (ev.key == "F10") { //} && ev.altKey && ev.ctrlKey) {
      console.log(ev.key);
      switchTheme();
    }

    if (ev.key == "F9") {
      document.querySelectorAll("*").forEach(
        x => {
          x.setAttribute("style", x.getAttribute("style") + `background-color:rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}); `);
          //x.setAttribute("style", `border: 2px solid rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}); `);
        });
    }
  }, false);
};

const linkHandler = () => {
  document.addEventListener("click", (event) => {
    if (event.target.nodeName == "A") {
      event.preventDefault();
      const link = event.target;
      const url = link.getAttribute("href");
      console.dir(url);
      if (/^(f|ht)tps?:\/\//i.test(url)) {
        window.open(url, url, "");
      } else if (/\{.*\}/g.test(url)) {
        console.log(`Object ${url}`);
        alert(url);
      } else {
        console.log(`Intern ${url}`);
        load(url, '#content');
      }
    }
  });
};

const load = (url, targetSelector, ctx = { a: 'hovercraft', b: { c: 'A' } }) => {
  fetch(url)
    .then(response => response.text())
    // .then(response => response.json())
    .then(data => {
      console.log(data);
      const el = document.querySelectorAll(targetSelector);
      el.forEach(element => {
        element.innerHTML = interpolate(data, ctx);
      });

    });
};

const interpolate = (t, c) => { return t.replace(/\${([^}]+)}/g, (m, p) => p.split('.').reduce((a, f) => a ? a[f] : undefined, c) ?? ''); };

const detectColorScheme = () => {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") == "dark") {
      theme = "dark";
    }
  } else if (!window.matchMedia) {
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }
  document.documentElement.classList.add(theme);
};

const switchTheme = () => {
  theme = (theme == "light") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("class", theme);
};

const toggleFullscreen = () => {
  const elem = $('html')[0];
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.msRequestFullScreen) {
    elem.msRequestFullScreen();
  }
};


// const match = (path, url) => {
//     const expression = path instanceof RegExp ? path : pathToRegExp(path);
//     const match = expression.exec(url) || false;
//     console.log(match);
//     const matches = path instanceof RegExp ? !!match : !!match && match[0] === match.input;
//     return {
//         matches,
//         params: match && matches ? match.groups || null : null,
//     };
// };

// const pathToRegExp = (path) => {
//     const pattern = path
//         .replace(/\./g, '\\.')
//         .replace(/\//g, '/')
//         .replace(/\?/g, '\\?')
//         .replace(/\/+$/, '')
//         .replace(/\*+/g, '.*')
//         .replace(
//             /:([^\d|^\/][a-zA-Z0-9_]*(?=(?:\/|\\.)|$))/g,
//             (_, paramName) => `(?<${paramName}>[^\/]+?)`,
//         )
//         .concat('(\\/|$)');
//     return new RegExp(pattern, 'gi');
// };;


// //console.log(match('/user/:uid/*', '/user/5uu/ie/fz/i'));


// function parseMarkdown(markdownText) {
//     const htmlText = markdownText
//         .replace(/^### (.*$)/gim, '<h3>$1</h3>')
//         .replace(/^## (.*$)/gim, '<h2>$1</h2>')
//         .replace(/^# (.*$)/gim, '<h1>$1</h1>')
//         .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
//         .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
//         .replace(/\*(.*)\*/gim, '<i>$1</i>')
//         .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
//         .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
//         .replace(/\n$/gim, '<br />');

//     return htmlText.trim();
// }


// var loc = window.location;
// var new_uri;
// var ws;
// if (loc.protocol === 'https:') {
//     new_uri = 'wss:';
// } else {
//     new_uri = 'ws:';
// }
// new_uri += `//${loc.host}`; // /ws
// new_uri = "ws://localhost:3000/eigentlich/egal.es6&gschissen=druf" + new Date();
// const connect = (url) => {
//     try {
//         ws = new WebSocket(url);
//         ws.onopen = () => {
//             ws.onmessage = (ev) => {
//                 handleWssData(ev.data);
//             };
//             ws.onclose = (evt) => {
//                 ws = null;
//                 setTimeout(() => {
//                     console.log('reconnect');
//                     connect(new_uri);
//                 }, 5000);
//             };
//             ws.onerror = (ev) => {
//                 console.error(ws.readyState, ev);
//                 setTimeout(() => {
//                     console.log('reconnect');
//                 }, 5000);
//             };
//         };
//     } catch (e) {
//         console.log(e);
//     }
// };
// const send = () => {
//     sendMsg({ "type": "buttonClicked", "payload": { "attack": "server" } });
// };
// const sendMsg = (msg) => {
//     if (typeof msg !== 'string') msg = JSON.stringify(msg);
//     if (ws != null && ws.readyState == 1) {
//         // console.log('send: ' + msg);
//         ws.send(msg);
//     }
// };
// const handleWssData = (data) => {
//     try {
//         var parsedData = JSON.parse(data);
//         console.log("Received Data from backend", data);
//         document.querySelector("#feedback").innerHTML = JSON.stringify(parsedData, null, 2);
//     } catch (e) {
//         console.log("Error",data,e );
//     }
// };
// // $(document).ready(() => {
// //     connect(new_uri);
// //     var msg = {
// //         "type": "lifebeat",
// //         "timestamp": new Date()
// //     };
// //     setInterval(() => sendMsg(JSON.stringify({
// //         "type": "lifebeat",
// //         "timestamp": new Date()
// //     })), 1000);

// //     $("#action").on('change keyup paste', (ev) => {
// //         try {
// //             var parsedData = JSON.parse($("#action").val());
// //             $("#action").removeClass("error");
// //             $("#action").val(JSON.stringify(parsedData, null, 2));
// //         } catch (e) {
// //             $("#action").addClass("error");
// //             console.log(e);
// //         }
// //     });

// //     $("#action").val(JSON.stringify({ "type": "exampleAction" }, null, 2));

// //     $("button").click(() => {
// //         sendMsg($("#action").val());
// //     });

// // });



  //     connect(new_uri);
  //     // var msg = {
  //     //     "type": "lifebeat",
  //     //     "timestamp": new Date()
  //     // };
  //     // setInterval(() => sendMsg(JSON.stringify({
  //     //     "type": "lifebeat",
  //     //     "timestamp": new Date()
  //     // })), 1000);







