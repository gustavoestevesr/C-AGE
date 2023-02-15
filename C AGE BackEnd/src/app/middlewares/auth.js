const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    // verificando se há um Header
    if( !authHeader ){
        return res.status(401).send({ error: 'No token provided' });
    }

    // dividir Header em 2 partes
    const parts = authHeader.split(' ');
    // conferindo a formatacao do Header
    if( !parts.length === 2){
        return res.status(401).send({ error: 'Token error' });
    }

    const [scheme,token] = parts;

    // contem a palavra Bearer?
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformatted' });
    }

    // Validando token do Header
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) { 
            return res.status(401).send({ error: 'Token invalid' }); 
        }

        req.userId = decoded.id;
        return next();
    });

};