const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Elderly = require('../models/elderly');

const router = express.Router();

// necessario enviar o token no header para validar e indentificar o usuario
router.use(authMiddleware);

// mostrar todos os usuarios
router.get('/', async (req, res) => {
    try {
        // pegar todos os usuarios do banco
        const elderlys = await Elderly.find();
        // retornar usuarios do banco
        return res.send({ elderlys });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading elderlys' });
    }
});

// mostrar usuario especifico
router.get('/:elderlyId', async (req, res) => {
    try {
        // pegar usuario especifico banco
        const elderly = await Elderly.findById(req.params.elderlyId);
        // retornar usuario do banco
        return res.send({ elderly });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading elderly' });
    }
});

// atualizar emergencyContact de um usuario especifico
router.patch('/emergencyContact/:elderlyId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { _emergencyName, _emergencyEmail, _emergencyPhone, _emergencyCep, _emergencyNumber } = req.body;

        // encontrar e atualizar usuario
        const elderly = await Elderly.findByIdAndUpdate(req.params.elderlyId, {
            // definir o novo contato de emergência
            emergencyContact: { emergencyName: _emergencyName, emergencyEmail: _emergencyEmail, emergencyPhone: _emergencyPhone, emergencyCep: _emergencyCep, emergencyNumber: _emergencyNumber }
        }, {
            new: true // true diz pro mongoose retornar o objeto atualizado e nao o antigo
        });

        // retornar usuario atualizado
        return res.send({ elderly });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating elderly' });
    }
});

// atualizar parcialmente um usuario especifico
router.patch('/profile/:elderlyId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { name, email, phone, susNumber, birthdayDate, cep, number } = req.body;
        // encontrar e atualizar usuario
        const elderly = await Elderly.findByIdAndUpdate(req.params.elderlyId, {
            name,
            email,
            phone,
            susNumber,
            birthdayDate,
            cep, 
            number,
        }, {
            new: true
        }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo

        // retornar usuario atualizado
        return res.send({ elderly });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating elderly' });
    }
});

// atualizar parcialmente um usuario especifico
router.patch('/comments/:elderlyId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { _doctorName, _commentTitle, _commentDescription, _tag } = req.body;

        const _comments = {
            doctorName: _doctorName,
            commentTitle: _commentTitle,
            commentDescription: _commentDescription, 
            tag: _tag, 
        }         

        // encontrar e atualizar usuario
        const elderly = await Elderly.findByIdAndUpdate(req.params.elderlyId, {
            $push: {comments: _comments}        
        }, {
            new: true
        }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo

        // retornar usuario atualizado
        return res.send({ elderly });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating elderly' });
    }
});

// atualizar parcialmente um usuario especifico
router.patch('/intercorrences/:elderlyId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { _intercorrenceTitle, _intercorrenceDescription, _painLevel, _intercorrenceDate } = req.body;

        const _intercorrences = {            
            intercorrenceTitle: _intercorrenceTitle,
            intercorrenceDescription: _intercorrenceDescription, 
            intercorrencePainLevel: _painLevel,
            createdAt: _intercorrenceDate,
        }         

        // encontrar e atualizar usuario
        const elderly = await Elderly.findByIdAndUpdate(req.params.elderlyId, {
            $push: {intercorrences: _intercorrences}        
        }, {
            new: true
        }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo

        // retornar usuario atualizado
        return res.send({ elderly });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating elderly' });
    }
});

// atualizar parcialmente um usuario especifico
router.patch('/appointments/:elderlyId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { _doctorName, _appointmentTitle, _painLevel, _appointmentDescription } = req.body;

        const _appointments = {            
            doctorName: _doctorName,
            appointmentTitle: _appointmentTitle, 
            appointmentDescription: _appointmentDescription,
        }         

        // encontrar e atualizar usuario
        const elderly = await Elderly.findByIdAndUpdate(req.params.elderlyId, {
            $push: {appointments: _appointments}        
        }, {
            new: true
        }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo

        // retornar usuario atualizado
        return res.send({ elderly });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating elderly' });
    }
});


// atualizar parcialmente um usuario especifico
router.patch('/anamnese/:elderlyId', async (req, res) => {
    try {
        // recebendo email, nome e senha do usuario
        const { _age, _bloodType, _allergy, _continuousMedication, _socialHabit } = req.body;
        // encontrar e atualizar usuario
        const elderly = await Elderly.findByIdAndUpdate(req.params.elderlyId, {
            age: _age,            
            bloodType: _bloodType,            
            allergy: _allergy,
            continuousMedication: _continuousMedication,
            socialHabit: _socialHabit,        
        }, {
            new: true
        }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo

        // retornar usuario atualizado
        return res.send({ elderly });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating elderly' });
    }
});

// deletar usuario
router.delete('/:elderlyId', async (req, res) => {
    try {
        // encontrar e remover usuario especifico do banco
        await Elderly.findByIdAndRemove(req.params.elderlyId);
        // retornar status ok
        return res.send();
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error removing elderly' });
    }
});

module.exports = app => app.use('/elderlys', router);