const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth.json')

const Doctor = require('../models/doctor');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign( params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { doctorNumber } = req.body;

    try {
        // verifica se já existe o usuario
        if (await Doctor.findOne({ doctorNumber })) {
            return res.status(400).send({ error: 'Doctor already exists' });
        }

        const doctor = await Doctor.create(req.body);

        // não retornar a senha
        doctor.password = undefined;

        // deu tudo certo
        res.send({
            doctor,
            token: generateToken({ id: doctor.id }),
        });

    } catch (err) {
        res.status(400).send({ error: 'Registration failed' });
    }

});

router.post('/authenticate', async (req, res) => {
    
    // recebendo email e senha do usuario
    const { doctorNumber, password } = req.body;

    // pegando o email e senha recebidos pelo o body do metodo post
    const doctor = await Doctor.findOne({ doctorNumber }).select('+password');

    // usuário nao encontrado
    if (!doctor) {
        return res.status(400).send({ error: 'Doctor not found' });
    }

    // senha incorreta
    if (!await bcrypt.compare(password, doctor.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    // não retornar a senha
    doctor.password = undefined;

    // gerar token a cada autenticacao
    const token =

        // deu tudo certo
        res.json({
            doctor,
            token: generateToken({ id: doctor.id }),
        });
});

router.post('/forgot_password', async (req, res) => {

    // recebendo email do usuario
    const { email } = req.body;

    try {

        // buscar se existe o email do usuario
        const doctor = await Doctor.findOne({ email });

        // usuário nao encontrado
        if (!doctor) {
            return res.status(400).send({ error: 'Doctor not found' });
        }

        // gerar token de 20 digitos no formato hexadecimal
        const token = crypto.randomBytes(20).toString('hex');

        // determinar o tempo de expiração
        const now = new Date();
        now.setHours(now.getHours() + 1);

        // atualizar dados do banco
        await Elderly.findByIdAndUpdate( elderly.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        // disparar email com template html para o usuario com o token de troca de senha
        mailer.sendMail({
            to: email,
            from: 'histhorgame@gmail.com.br',
            template: 'auth/forgot_password',
            context: {token},
        }), (err) => {
            if(err){
                res.status(400).send({ error : 'Canoot send forgot password email, try again' });
            }

            // deu tudo certo
            return res.send();
        }

    }catch (err){
        res.status(400).send({ error : 'Error on forgot password, try again' });
    }
});

router.post('/reset_password', async (req, res) => {

    // recebendo email, token e senha do usuario
    const { email, token, password } = req.body;

    try {

        // buscar se existe o email do usuario
        const doctor = await Doctor.findOne({ email }).select('+passwordResetToken passwordResetExpires');

        // usuário nao encontrado
        if (!doctor) {
            return res.status(400).send({ error: 'Doctor not found' });
        }

        // verificar se o token está correto
        if (token !== doctor.passwordResetToken ) {
            return res.status(400).send({ error: 'Token invalid' });
        }

        // pegar a hora atual
        const now = new Date();

        // verificar se o token foi expirado
        if ( now > doctor.passwordResetExpires ) {
            return res.status(400).send({ error: 'Token expired, generate a new one' });
        }

        // se deu tudo certo, salvar a nova senha
        doctor.password = password;

        // salvar no banco
        await doctor.save();

        // emitir status code ok
        res.send();
        
    } catch (err) {

        res.status(400).send({ error : 'Canoot reset password, try again' });
        
    }

});

module.exports = app => app.use('/auth/doctor', router);