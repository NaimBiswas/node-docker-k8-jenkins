const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Server is up and running 4")
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
