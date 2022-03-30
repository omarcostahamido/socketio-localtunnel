#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const socket_io_client_1 = require("socket.io-client");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
commander_1.program
    .option('-d, --debug', 'output extra debugging')
    .argument('-host, --slt-server-host', 'your socketio-localtunnel-server url')
    .argument('-url, --local-server-url', 'your local server url')
    .argument('-id, --user-id', 'your self defined userId')
    .parse(process.argv);
const options = commander_1.program.opts();
const [host, url, id] = commander_1.program.args;
if (options.debug) {
    console.log('arguments:');
    console.log({ host, url, id });
}
console.log(`your url is: ${host}/api/${id}`);
const socket = (0, socket_io_client_1.io)(host, { query: { id } });
socket.on('api', ({ method, body, headers, path }) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, cross_fetch_1.default)(`${url}/${path || ''}`, {
        method,
        body,
        headers,
    }).catch(error => console.log(error));
    const text = yield (res === null || res === void 0 ? void 0 : res.text());
    socket.emit('api', text);
}));
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
