const Account = require('../models/account');
const handler = require('./handler');

exports.getAllAccounts = handler.getAll(Account);