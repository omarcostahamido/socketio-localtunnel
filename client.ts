#!/usr/bin/env node
import { program } from 'commander';
import { io } from 'socket.io-client';
import fetch from 'cross-fetch';

program
  .option('-d, --debug', 'output extra debugging')
  .argument('-host, --slt-server-host', 'your socketio-localtunnel-server url')
  .argument('-url, --local-server-url', 'your local server url')
  .argument('-id, --user-id', 'your self defined userId')
  .parse(process.argv);

const options = program.opts();
const [host, url, id] = program.args;

if (options.debug) {
  console.log('arguments:');
  console.log({ host, url, id });
}
console.log(`your url is: ${host}/${id}`);
const socket = io(host, { query: { id } });

socket.on('api', async ({ method, body, headers, path }) => {
  const res = await fetch(`${url}/${path || ''}`, {
    method,
    body,
    headers,
  }).catch(error => console.log(error));
  const text = await res?.text();
  socket.emit('api', text);
});

socket.on('error', error => {
  console.log('error:');
  console.log(error);
});

socket.on('reconnect', attempt => {
  console.log('reconnect:');
  console.log(attempt);
});

socket.on('reconnect_attempt', attempt => {
  console.log('reconnect_attempt:');
  console.log(attempt);
});

socket.on('reconnect_error', error => {
  console.log('reconnect_error:');
  console.log(error);
});

socket.on('reconnect_failed', error => {
  console.log('reconnect_failed:');
  console.log(error);
});

socket.on('ping', ping => {
  console.log('ping:');
  console.log(ping);
});
