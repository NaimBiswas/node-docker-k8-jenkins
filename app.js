const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.set('trust proxy', true);


app.get("/", (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', clientIp);
    res.status(200).json({
        message: "Hello Work from GitHub>Webhook>JenKins Pipeline>Docker>gCloud Artifact>GKE cluster",
        ip:req?.ip,
        xForwadedIp: clientIp

    })
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
