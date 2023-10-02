"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const user_js_1 = require("./models/user.js");
require("./db/connections.js");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
});
app.options('*', (0, cors_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/login', (0, cors_1.default)({ origin: '*' }), async (req, res) => {
    try {
        const user = await user_js_1.User.findByCredentials(req.body.login, req.body.password);
        res.send(user);
    }
    catch (e) {
        res.status(404).send(e);
    }
});
app.post('/register', async (req, res) => {
    const user = new user_js_1.User(req.body);
    try {
        await user.save();
        res.send(user);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/chat.html'));
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
});
httpServer.listen(port, () => {
    console.log('Server is up on port ' + port);
});
