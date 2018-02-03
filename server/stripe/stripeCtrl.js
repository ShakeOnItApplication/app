const app = require('../server');
const stripe = require('stripe')(process.env.stripe_id);
const bcrypt = require('bcryptjs');

const stripeCtrl = {
    registerUser: (req, res) => {
        stripe.customers.create(
      { email: req.body.email },
      function(err, customer) {
        if(!err){ // null if no error occurred
          req.body.stripe_id = customer.id;
          stripe.customers.createSource(
            customer.id,
            { source: {
                object: 'card',
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                number: req.body.number,
                cvc: req.body.cvc
            }},
            function(err, card) {
              if (!err){
                const db = req.app.get('db');
                bcrypt.hash(req.body.password, 10).then((hash) => {
                  req.body.password = hash;
                  db.registerUser(req.body)
                    .then((response) => {
                      res.send( response[0] );
                    });
              });
              } else {
                console.log(err);
              }
            }
          );
        } else {
          console.log(err);
        } 
      }
      );
    },
    placeBet: (req, res) => {
        const db = req.app.get('db');
        const amountInCents = req.body.amount * 100;

        db.getStripeId({ id: req.body.admin_user_id }).then(response=>{
          stripe.customers.retrieve(
            response[0].stripe_id,
            function(err, customer) {
              // asynchronously called
              if(err){
                return res.send({ err: 'Error' })
              }
              stripe.charges.create({
                amount: amountInCents,
                currency: "usd",
                customer: customer.id,
                source: customer.default_source,
                description: req.body.bet_title
              }, function(err, charge) {
                if (!err){
                  db.placeBet(req.body).then((response)=>{
                    res.send(response);
                  });
                } else {
                  res.send({err: 'An Error Occured'})
                }
              });
            }
          );
        
        })
      
      }
}

module.exports = stripeCtrl;