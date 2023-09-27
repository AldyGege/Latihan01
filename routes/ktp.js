const express = require('express');
const router = express.Router();
//Import Express Validator
const {body, validationResult} = require('express-validator');
//Import Database
const connection = require('../config/database');

router.get('/', function (req, res){
    connection.query('select * from ktp order by nik desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data KTP',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('nik').notEmpty(),
    body('nama_lengkap').notEmpty(),
    body('jenis_kelamin').notEmpty(),
    body('tempat_lahir').notEmpty(),
    body('tanggal_lahir').notEmpty(),
    body('agama').notEmpty(),
    body('pendidikan').notEmpty(),
    body('jenis_pekerjaan').notEmpty(),
    body('golongan_darah').notEmpty(),
    body('kewarganegaraan').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nik: req.body.nik,
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        jenis_pekerjaan: req.body.jenis_pekerjaan,
        golongan_darah: req.body.golongan_darah,
        kewarganegaraan: req.body.kewarganegaraan
    }
    connection.query('insert into ktp set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
});

router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from ktp where nik = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found'
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data KTP',
                data: rows[0]
            })
        }
    })
});

router.patch('/update/:id', [
    body('nik').notEmpty(),
    body('nama_lengkap').notEmpty(),
    body('jenis_kelamin').notEmpty(),
    body('tempat_lahir').notEmpty(),
    body('tanggal_lahir').notEmpty(),
    body('agama').notEmpty(),
    body('pendidikan').notEmpty(),
    body('jenis_pekerjaan').notEmpty(),
    body('golongan_darah').notEmpty(),
    body('kewarganegaraan').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id;
    let Data = {
        nik: req.body.nik,
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        jenis_pekerjaan: req.body.jenis_pekerjaan,
        golongan_darah: req.body.golongan_darah,
        kewarganegaraan: req.body.kewarganegaraan
    }
    connection.query(`update ktp set ? where nik = ${id}`, Data, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(500).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
});

router.delete('/delete/(:id)', function(req, res) {
    let id = req.params.id;
    connection.query(`delete from ktp where nik = ${id}`, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been Delete!'
            })
        }
    })
});
module.exports = router;