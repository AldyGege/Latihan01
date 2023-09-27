const express = require('express')
const app = express()
const port = 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({extended: false}));
app.use(bodyPs.json());

const ktpRouter = require('./routes/ktp.js');
app.use('/api/ktp', ktpRouter);

const kkRouter = require('./routes/kartu_keluarga.js');
app.use('/api/kk', kkRouter);

const detailRouter = require('./routes/detail_kk.js');
app.use('/api/detail', detailRouter);

app.listen(port, () => {
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})