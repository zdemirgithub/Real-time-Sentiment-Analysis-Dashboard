import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const App: React.FC = () => {
    const [textData, setTextData] = useState('');
    const [sentimentData, setSentimentData] = useState('');

    // Function to send text data to server for sentiment analysis
    const handleTextSubmit = () => {
        socket.emit('textData', textData);
    };

    // Listen for sentiment data from server
    socket.on('sentimentData', (data: string) => {
        setSentimentData(data);
    });

    return (
        <div>
            <h1>Real-time Sentiment Analysis Dashboard</h1>
            <textarea value={textData} onChange={(e) => setTextData(e.target.value)} />
            <button onClick={handleTextSubmit}>Analyze Sentiment</button>
            <div>{sentimentData}</div>
        </div>
    );
};

export default App;
