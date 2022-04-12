"use strict";
exports.__esModule = true;
var path_1 = require("path");
var buildRouter = function (app, build) { return ({
    send: function () {
        return app.get('*', function (_, res) {
            return res.sendFile(path_1["default"].resolve(build, 'index.html'));
        });
    }
}); };
exports["default"] = buildRouter;
