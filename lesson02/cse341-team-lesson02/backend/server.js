const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

app.listen(port, () => {
    console.log(`Server running on port localhost:${port}`)
})