const app = require('../server');

const betCtrl = {
    getPendingBets: (req, res) => {
        const db = req.app.get('db');
        console.log(req.body);
        db.getPendingBets(req.body).then(response => {
            res.send(response);
        })
    }
}

module.exports = betCtrl;