"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var cors_1 = require("cors");
var contact_1 = require("./router/contact");
var portfolio_1 = require("./router/portfolio");
var build_1 = require("./router/build");
var expressStatic = express_1["default"].static, json = express_1["default"].json, urlencoded = express_1["default"].urlencoded;
(function () {
    var build = '../frontend/build';
    var app = (function () {
        var app = (0, express_1["default"])();
        var port = process.env.PORT || 3000;
        var middleWares = [
            json({ limit: '10mb' }),
            urlencoded({ extended: true }),
            (0, cors_1["default"])({
                origin: process.env.PUBLIC_URL,
                credentials: true
            }),
            expressStatic(path_1["default"].resolve(build)),
        ];
        app.use(middleWares);
        app.listen(port, function () {
            return console.log("\uD83D\uDE80 Express listening at port ".concat(port, " \uD83D\uDE80 at time: ").concat(new Date()));
        });
        return app;
    })();
    (0, portfolio_1["default"])(app).query();
    (0, contact_1["default"])(app).sendEmail();
    (0, build_1["default"])(app, build).send();
})();
