## socketio-localtunnel

This is a <a href="https://www.npmjs.com/package/localtunnel" target="_blank">localtunnel</a> alternative.

## How to use

This tool isn't like localtunnel have official server. You need host server by yourself.
Deploy <a href="https://github.com/liu-j-h/socketio-localtunnel-server" target="_blank">socketio-localtunnel-server</a> to heroku.

After you have a free tier heroku server, then

```shell
npm install -g socketio-localtunnel
slt YOUR_SOCKETIO_LOCALTUNNEL_SERVER_URL YOUR_LOCAL_SERVER_URL YOUR_USER_ID
```
YOUR_USER_ID is a unique id that you can create by yourself.
