const { json } = require('express')
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware.js')
const Accounts = require('./accounts-model.js')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(accounts=>{
      res.status(200).json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(201).json(req.accountId)

})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = req.body
  Accounts.create(newAccount)
    .then(account=>{
      console.log(account)
      res.status(201).json(account)
    }).catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  const updatedBody = req.body
  Accounts.updateById(id, updatedBody)
    .then(account=>{
      res.status(200).json(account)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  const deletedAccount = req.body
  Accounts.deleteById(id)
    .then(()=>{
      res.status(200).json(deletedAccount)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
