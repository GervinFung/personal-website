"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.numberOfPortfolioPerPage = exports.paginatePortfolio = exports.findPortfoliosFromLanguage = exports.portfolioLanguages = exports.parsePageQuery = exports.findLanguageQueried = exports.portfolioDataPromise = void 0;
var node_fetch_1 = require("node-fetch");
var parse_dont_validate_1 = require("parse-dont-validate");
var fetchGithubUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = parse_dont_validate_1.parseAsReadonlyArray;
                return [4 /*yield*/, (0, node_fetch_1["default"])('https://api.github.com/users/GervinFung/repos?per_page=50')];
            case 1: return [4 /*yield*/, (_b.sent()).json()];
            case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent(), function (repo) {
                        var name = repo.name, language = repo.language, html_url = repo.html_url, description = repo.description;
                        var parsedName = (0, parse_dont_validate_1.parseAsString)(name).orElseThrowDefault('name');
                        return ![
                            'my-web',
                            'LibGDX-Chess-Game',
                            'MinimalTicTacToe',
                            'TextEditorFX',
                            'SimpleParallelChessAI',
                            'AndroidSimpleAIChess',
                            'Connect4',
                            'TicTacToe',
                            'TextEditor',
                            'RealTimeMarkdown',
                            'Room',
                        ].find(function (portfolioName) { return parsedName === portfolioName; })
                            ? []
                            : [
                                {
                                    name: parsedName,
                                    language: (0, parse_dont_validate_1.parseAsString)(language).orElseThrowDefault('language'),
                                    description: (0, parse_dont_validate_1.parseAsString)(description).orElseThrowDefault('description'),
                                    url: (0, parse_dont_validate_1.parseAsString)(html_url).orElseThrowDefault('html_url')
                                },
                            ];
                    }])
                    .orElseThrowDefault('repositories')
                    .flat()];
        }
    });
}); };
var fetchGithubOrganization = function (organizationName) { return __awaiter(void 0, void 0, void 0, function () {
    var language, _a, _b, _c, organization, login, description, html_url;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _b = (_a = Array).from;
                _c = parse_dont_validate_1.parseAsReadonlyArray;
                return [4 /*yield*/, (0, node_fetch_1["default"])("https://api.github.com/orgs/".concat(organizationName, "/repos"))];
            case 1: return [4 /*yield*/, (_d.sent()).json()];
            case 2:
                language = _b.apply(_a, [_c.apply(void 0, [_d.sent(), function (repo) {
                            return !repo.language
                                ? []
                                : [
                                    (0, parse_dont_validate_1.parseAsString)(repo.language).orElseThrowDefault('language'),
                                ];
                        }])
                        .orElseThrowDefault('repositories')
                        .flat()
                        .reduce(function (prev, language) {
                        if (language) {
                            var prevCount = prev.get(language);
                            return prev.set(language, prevCount === undefined ? 1 : prevCount + 1);
                        }
                        return prev;
                    }, new Map())]).reduce(function (prev, _a) {
                    var language = _a[0], count = _a[1];
                    return prev.count < count
                        ? {
                            language: language,
                            count: count
                        }
                        : prev;
                }, {
                    language: '',
                    count: 0
                }).language;
                return [4 /*yield*/, (0, node_fetch_1["default"])("https://api.github.com/orgs/".concat(organizationName))];
            case 3: return [4 /*yield*/, (_d.sent()).json()];
            case 4:
                organization = _d.sent();
                login = organization.login, description = organization.description, html_url = organization.html_url;
                return [2 /*return*/, {
                        name: (0, parse_dont_validate_1.parseAsString)(login).orElseThrowDefault('login'),
                        language: language,
                        description: (0, parse_dont_validate_1.parseAsString)(description).orElseThrowDefault('description'),
                        url: (0, parse_dont_validate_1.parseAsString)(html_url).orElseThrowDefault('html_url')
                    }];
        }
    });
}); };
var portfolioLanguages = function (portfolioData) {
    return Array.from(new Set(portfolioData.map(function (data) { return data.language; })))
        .concat('All')
        .sort(function (a, b) { return a.localeCompare(b); });
};
exports.portfolioLanguages = portfolioLanguages;
var findPortfoliosFromLanguage = function (portfolioData, selectedLanguage) {
    return selectedLanguage === 'All'
        ? portfolioData
        : portfolioData.filter(function (_a) {
            var language = _a.language;
            return language === selectedLanguage;
        });
};
exports.findPortfoliosFromLanguage = findPortfoliosFromLanguage;
var parsePageQuery = function (page, numberOfPortfolioPerPage) {
    var parsedPage = parseInt(page, 10);
    return parsedPage >= 0 ? parsedPage * numberOfPortfolioPerPage : 0;
};
exports.parsePageQuery = parsePageQuery;
var findLanguageQueried = function (portfolioData, language) {
    var _a, _b;
    var finalizedLang = language === 'C' ? 'C#' : language;
    return ((_b = (_a = portfolioData.find(function (data) { return data.language === finalizedLang; })) === null || _a === void 0 ? void 0 : _a.language) !== null && _b !== void 0 ? _b : 'All');
};
exports.findLanguageQueried = findLanguageQueried;
var paginatePortfolio = function (portfolioData, pageNumber) {
    return portfolioData.flatMap(function (_, index) {
        var data = portfolioData[index + pageNumber];
        return index < 9 ? (data ? [data] : []) : [];
    });
};
exports.paginatePortfolio = paginatePortfolio;
var portfolioDataPromise = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Promise.all(['Utari-Room', 'P-YNPM'].map(fetchGithubOrganization))];
            case 1:
                _b = (_a = (_c.sent())).concat;
                return [4 /*yield*/, fetchGithubUser()];
            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); };
exports.portfolioDataPromise = portfolioDataPromise;
var numberOfPortfolioPerPage = 9;
exports.numberOfPortfolioPerPage = numberOfPortfolioPerPage;
