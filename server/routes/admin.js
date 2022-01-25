var express = require('express');
var router = express.Router();

function isAdmin(data) {
    return data.username === 'admin' && data.password === 'qwerty123';
}

router.post('/auth', function(req, res, next) {
    let data = req.body;

    if (isAdmin(data)) {
        res.status(200);
    }
    else {
        res.status(401);
    }
    res.send();
});

module.exports = router;
