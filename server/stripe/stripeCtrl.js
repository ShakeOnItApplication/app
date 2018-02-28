const app = require('../server');
const stripe = require('stripe')(process.env.stripe_id);
const bcrypt = require('bcryptjs');



const stripeCtrl = {
    registerUser: (req, res) => {
      console.log(req.body);
      stripe.accounts.create({
        type: 'standard',
        country: 'US',
        email: req.body.email
      }, function(err, account) {
        console.log('account error', err);
        if(!err){
        const stripe_account_id = account.id;
        req.body.stripe_account_id = stripe_account_id;
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
          })
        };
      });
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
      
      },
      handleBet: (req, res) => {
        console.log(req.body);
        const db = req.app.get('db');
        if (req.body.decision === 'accept'){
        
        req.body.status = 'active';
        const amountInCents = req.body.amount * 100;

        db.getStripeId({ id: req.body.opponent_user_id }).then(response=>{
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
                  db.setBetStatus(req.body).then((response)=>{
                    res.send(response);
                  });
                } else {
                  res.send({err: 'An Error Occured'})
                }
              });
            }
          );
        
        })
      } else {
        req.body.status = 'denied';
        db.setBetStatus(req.body).then((response)=>{
          res.send('denied');
        });
      }
      },
      settleBet: (req, res) => {
        const db = req.app.get('db');
        db.getStripeAccount({ id: req.body.id }).then(response => {
          const accountId = response[0].stripe_account_id;
          const amountInCents = req.body.amount * 2 * 100;
          stripe.transfers .create({
            amount: amountInCents,
            currency: "usd",
            destination: accountId
          }, function(err, payout) {
            // asynchronously called
            console.log(err, payout);
            if (!err){
              db.settleBet(req.body).then(response => {
                res.send(response);
              })
            }
          });
        })        
      }
}

module.exports = stripeCtrl;