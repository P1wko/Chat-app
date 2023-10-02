import express from 'express';
import cors from "cors";
import path from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { User } from './models/user.js';
import "./db/connections.js"

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
});

app.options('*', cors());
app.use(cors());
app.use(express.json());

app.post('/login', cors({ origin: '*'}), async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.login, req.body.password);
        res.send(user);
    } catch (e) {
        res.status(404).send(e);
    }
})

app.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/chat.html'));
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
    })
})

httpServer.listen(port, () => {
    console.log('Server is up on port ' + port);
})