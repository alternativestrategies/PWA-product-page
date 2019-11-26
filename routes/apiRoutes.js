const express =     require('express')
const usersCtrl =   require('../controllers')
const verifyToken = require('../auth').verifyToken

const router = new express.Router()
const Products = require('../models/product.js')

router.route('/users/').get(usersCtrl.index)

router.route('/users/').post(usersCtrl.create)

router.post('/users/authenticate', usersCtrl.authenticate)

router.get('/products', async(req, res) => {
    try {
        let products = await Products.find();
        return res.send(products) 
    }
    catch(err){
        console.log(err)
    }
})
router.use(verifyToken)

router.route('/users/:id').get(usersCtrl.show)

router.route('/users/:id').patch(usersCtrl.update)

router.route('/users/:id').delete(usersCtrl.destroy)

module.exports = router