"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var nodemailer_1 = require("nodemailer");
var parse_dont_validate_1 = require("parse-dont-validate");
var contact_1 = require("../../../common/src/contact");
var contactRouter = function (app) { return ({
    sendEmail: function () {
        return app.post('/api/contact', function (req, res) {
            if (req.method !== 'POST') {
                throw new Error('Only accept POST request');
            }
            else {
                var body = req.body;
                var name_1 = body.name, email = body.email, message = body.message;
                var parsedName_1 = (0, contact_1.getName)((0, parse_dont_validate_1.parseAsString)(name_1).orElseGetEmptyString());
                var parsedEmail_1 = (0, contact_1.getEmail)((0, parse_dont_validate_1.parseAsString)(email).orElseGetEmptyString());
                var parsedMessage_1 = (0, contact_1.getMessage)((0, parse_dont_validate_1.parseAsString)(message).orElseGetEmptyString());
                if ((0, contact_1.allValueValid)(parsedName_1, parsedEmail_1, parsedMessage_1)) {
                    var email_1 = process.env.EMAIL;
                    var pass = process.env.PASS;
                    var options = {
                        from: "".concat(parsedName_1.value.trim(), " <").concat(email_1, ">"),
                        to: "Gervin Fung Da Xuen <".concat(email_1, ">"),
                        subject: 'UTARi Contact Form',
                        text: "Hello, my name is ".concat(parsedName_1.value.trim(), "\n\nYou can reach me at ").concat(parsedEmail_1.value, "\n\nI would like to ").concat(parsedMessage_1.value.trim())
                    };
                    nodemailer_1["default"]
                        .createTransport({
                        host: 'smtp-mail.outlook.com',
                        port: 587,
                        secure: false,
                        tls: {
                            ciphers: 'SSLv3'
                        },
                        auth: {
                            user: email_1,
                            pass: pass
                        }
                    })
                        .sendMail(options, function (error) {
                        var result = (error
                            ? {
                                type: 'failed',
                                error: error.message
                            }
                            : {
                                type: 'succeed',
                                name: __assign(__assign({}, parsedName_1), { value: '' }),
                                email: __assign(__assign({}, parsedEmail_1), { value: '' }),
                                message: __assign(__assign({}, parsedMessage_1), { value: '' })
                            });
                        res.status(200).json(result);
                    });
                }
                else {
                    var result = {
                        type: 'input',
                        name: name_1,
                        email: email,
                        message: message
                    };
                    res.status(200).json(result);
                }
            }
        });
    }
}); };
exports["default"] = contactRouter;
