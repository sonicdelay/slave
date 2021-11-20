

      var loc = window.location;
      var new_uri;

      var nav = {
        Frontend: `//${loc.hostname}:4200`,
        Adminer: `//${loc.hostname}:8081`,
        RabbitMQ: `//${loc.hostname}:15672`
      };


      var ws;
      if (loc.protocol === 'https:') {
        new_uri = 'wss:';
      } else {
        new_uri = 'ws:';
      }
      
      new_uri += `//${loc.host}`;
      document.querySelector('#path').innerHTML = new_uri;
      document.querySelector('#path').addEventListener('click', () => {toggleFullscreen();});

      connect = url => {
        try {
          ws = new WebSocket(url);
          ws.onopen = () => {
            ws.send('{"type":"app:wss:connected"}');
            ws.onmessage = function(ev) {
              var data = ev.data;

              try {
                var parsedData = JSON.parse(data);               
              } catch (e) {
                console.log(data);
              }

              handleData(parsedData);
            };

            ws.onclose = evt => {
              ws = null;
              console.log('ws connection error');
              setTimeout(() => {
                console.log('reconnect');
                connect(new_uri);
              }, 5000);
            };

            ws.onerror = evt => {
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

      sendMsg = msg => {
        if (ws != null && ws.readyState == 1) {
            console.log(typeof msg);
          if(typeof msg != 'string') msg = JSON.stringify(msg);

            console.log(msg);

          ws.send(msg);
        }
      };

      handleData = data => {
        $('#feedback').val(JSON.stringify(data, null, 2));
      };

      $(document).ready(() => {
        for (let key in nav) {
          var button = document.createElement('button');
          button.innerHTML = key;
          button.addEventListener('click', () => {
            document.open(nav[key], '', '');
          });
          document.querySelector('#nav').appendChild(button);
        }

        connect(new_uri);
        setInterval(
          () =>
            sendMsg(
              JSON.stringify({
                type: 'app:wss:lifebeat...',
                timestamp: new Date()
              })
            ),
          10000
        );

        $('#action').on('change keyup paste', ev => {
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
          sendMsg($('#action').val());
        });

        $('#action').val(JSON.stringify({ type: 'wss:info' }, null, 2));

        $('#file').on("change", evt => {        
          const formData = new FormData();
          const files = evt.target.files;

          $.each(files, (obj, v) => {
            console.log(obj,v);
            formData.append('file[]', v); 
          });

          //console.log(evt);
          
          $.ajax({
            url: '/api/fm/',
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
          });
        });
      });

      toggleFullscreen = () => {
        elem = $('body')[0];
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullScreen) {
          elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.msRequestFullScreen) {
          elem.msRequestFullScreen();
        }
      }
