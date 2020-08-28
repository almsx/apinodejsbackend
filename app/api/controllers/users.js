// Load Users Model
const userModel = require('../models/users');
// Load Modules Bcrypt and jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {

        userModel.create({ name: req.body.name, lastName: req.body.lastName, email: req.body.email, password: req.body.password, dateRegister: req.body.dateRegister }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "Ok", message: "Success", data: null });

        });
    },
    login: function (req, res, next) {
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({ status: "Ok", message: "success", data: { user: userInfo, token: token } });
                } else {
                    res.json({ status: "error", message: "Invalid email/password", data: null });
                }
            }
        });
    },
    list: function (req, res, next) {
        let usersList = [];
        userModel.find({}, function (err, users) {
            if (err) {
                next(err);
            } else {
                for (let user of users) {
                    usersList.push({ id: user._id, name: user.name, lastName: user.lastName, email: user.email, dateRegister: user.dateRegister });
                }
                res.json({ status: "Ok", message: "success", data: { usersList } });
            }
        });
    }
}