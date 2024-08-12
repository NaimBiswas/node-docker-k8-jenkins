const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello Work from GitHub>Webhook>JenKins Pipeline>Docker>gCloud Artifact>GKE cluster",
    })
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
