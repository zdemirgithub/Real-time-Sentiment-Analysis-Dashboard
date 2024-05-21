import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import * as nlp from 'nlp-library'; // Example NLP library

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Initialize NLP model (e.g., sentiment analysis)
const nlpModel = nlp.loadModel();

// WebSocket connection for real-time communication
io.on('connection', (socket) => {
    console.log('A client connected');

    // Example: Receive text data from client and perform sentiment analysis
    socket.on('textData', (data: string) => {
        const sentiment = nlp.analyzeSentiment(data); // Analyze sentiment
        socket.emit('sentimentData', sentiment); // Send sentiment data back to client
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
