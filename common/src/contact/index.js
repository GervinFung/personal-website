"use strict";
exports.__esModule = true;
exports.getName = exports.getEmail = exports.getMessage = exports.allValueValid = void 0;
var granula_string_1 = require("granula-string");
var validateEmail = function (email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};
var getName = function (string) {
    var value = granula_string_1.GranulaString.createFromString(string);
    return {
        value: value,
        error: value.isEmpty()
            ? '*Please do not leave name section empty*'
            : value.isBlank()
                ? '*Please do not leave name section blank*'
                : ''
    };
};
exports.getName = getName;
var getEmail = function (string) {
    var value = granula_string_1.GranulaString.createFromString(string);
    return {
        value: value,
        error: value.isEmpty()
            ? '*Please do not leave email section empty*'
            : value.isBlank()
                ? '*Please do not leave email section blank*'
                : validateEmail(value.valueOf())
                    ? ''
                    : '*Please enter valid email format*'
    };
};
exports.getEmail = getEmail;
var getMessage = function (string) {
    var value = granula_string_1.GranulaString.createFromString(string);
    return {
        value: value,
        error: value.isEmpty()
            ? '*Please do not leave message section empty*'
            : value.isBlank()
                ? '*Please do not leave message section blank*'
                : value.inRangeOf({
                    min: 10,
                    excludeBlankSpace: true
                })
                    ? ''
                    : '*At least 10 words are required*'
    };
};
exports.getMessage = getMessage;
var allValueValid = function (_a, _b, _c) {
    var name = _a.value, nameErr = _a.error;
    var email = _b.value, emailErr = _b.error;
    var message = _c.value, messageErr = _c.error;
    var noError = (0, granula_string_1.isEmpty)(nameErr) && (0, granula_string_1.isEmpty)(emailErr) && (0, granula_string_1.isEmpty)(messageErr);
    var nameInvalid = name.isBlank() || name.isEmpty();
    var messageInvalid = message.isBlank() ||
        message.isEmpty() ||
        !message.inRangeOf({
            min: 10,
            excludeBlankSpace: true
        });
    var inputValid = messageInvalid && validateEmail(email.valueOf()) && !nameInvalid;
    return noError && !inputValid;
};
exports.allValueValid = allValueValid;
