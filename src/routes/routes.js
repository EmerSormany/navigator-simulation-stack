const express = require('express')
const path = require('path');
const { browserController } = require('../controllers/controllers');

const routes = express.Router()

routes.get('/', browserController.index)
routes.post('/search', browserController.search)
routes.post('/back', browserController.back)
routes.post('/forward', browserController.forward)


module.exports = {routes}