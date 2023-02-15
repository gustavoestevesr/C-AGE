const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Doctor = require('../models/doctor');

const router = express.Router();

// necessario enviar o token no header para validar e indentificar o usuario
router.use(authMiddleware);

// mostrar todos os usuarios
router.get('/', async (req, res) => {
    try {
        // pegar todos os usuarios do banco
        const doctors = await Doctor.find();
        // retornar usuarios do banco
        return res.send({ doctors });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading doctors' });
    }
});

// mostrar usuario especifico
router.get('/:doctorId', async (req, res) => {
    try {
        // pegar usuario especifico banco
        const doctor = await Doctor.findById(req.params.doctorId);
        // retornar usuario do banco
        return res.send({ doctor });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading doctor' });
    }
});

// atualizar totalmente um usuario especifico
router.put('/:doctorId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { name, email, phone, birthdayDate, bloodType, emergencyContact, allergy, continuousMedication, password, socialHabit } = req.body;
        // encontrar e atualizar usuario
        const doctor = await Doctor.findByIdAndUpdate(req.params.doctorId, {
            name,
            email,
            password,
        }, {
            new: true
        }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo

        var socialHabitJson = { habitName: socialHabit };
        doctor.socialHabit.push(socialHabitJson);

        // retornar usuario atualizado
        return res.send({ doctor });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating doctor' });
    }
});

// atualizar parcialmente um usuario especifico
router.patch('/:doctorId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { name, email, password, socialHabit } = req.body;
        // encontrar e atualizar usuario
        const doctor = await Doctor.findByIdAndUpdate(req.params.doctorId, {
            name,
            email,
            password,
        }, {
            new: true
        }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo

        var socialHabitJson = { habitName: socialHabit };
        doctor.socialHabit.push(socialHabitJson);

        // retornar usuario atualizado
        return res.send({ doctor });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating doctor' });
    }
});

// deletar usuario
router.delete('/:doctorId', async (req, res) => {
    try {
        // encontrar e remover usuario especifico do banco
        await Doctor.findByIdAndRemove(req.params.doctorId);
        // retornar status ok
        return res.send();
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error removing doctor' });
    }
});

module.exports = app => app.use('/doctors', router);