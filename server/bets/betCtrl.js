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
    getPastBets: (req, res) => {
        const db = req.app.get('db');
        db.getRecentHistory(req.body).then(response => {
            res.send(response);
        })
    }
}

module.exports = betCtrl;