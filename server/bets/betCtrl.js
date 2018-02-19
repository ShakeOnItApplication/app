const app = require('../server');

const betCtrl = {
    getPendingBets: (req, res) => {
        const db = req.app.get('db');
        db.getPendingBets(req.body).then(response => {
            res.send(response);
        })
    },
    getActiveBets: (req, res) => {
        const db = req.app.get('db');
        db.getActiveBets(req.body).then(response => {
            res.send(response);
        })
    },
    getRecentHistory: (req, res) => {
        const db = req.app.get('db');
        console.log(req.body);
        db.getRecentHistory(req.body).then(response => {
            res.send(response);
        })
    }
}

module.exports = betCtrl;