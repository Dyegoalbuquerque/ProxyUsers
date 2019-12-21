const express = require('express');
const path = require('path');
const app = express();
import cors from 'cors';

app.use(express.static(path.join(__dirname, './dist/app/')));
app.use(cors());

app.get('/*', (req, res) => {
    res.sendFile( path.join(__dirname, './dist/app/index.html'));
});

app.listen(process.env.PORT || 3000);
