const jwt = require('jsonwebtoken');

const config = require('../../config/auth.json');

module.exports = (req, res, next) => {

    const tokenHeader = req.headers.authorization;

    if (!tokenHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = tokenHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ] = parts;

    let testScheme = new RegExp(/^Bearer/i);

    if (!testScheme.test(scheme))
        return res.status(401).send({ error: 'Token poorly formatted' });

    jwt.verify(token, config.secret, (err, decoded) => {
       if (err)
           return res.status(401).send({ error: 'Token invalid' });

       req.userId = decoded.id;

       return next();
    });
};