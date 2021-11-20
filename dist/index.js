/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controllers/posts.ts":
/*!**********************************!*\
  !*** ./src/controllers/posts.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __importStar(__webpack_require__(/*! express */ \"express\"));\r\nvar PostsController = /** @class */ (function () {\r\n    function PostsController() {\r\n        var _this = this;\r\n        this.path = '/api/posts';\r\n        this.router = express.Router();\r\n        this.posts = [\r\n            {\r\n                author: 'Marcin',\r\n                content: 'Dolor sit amet',\r\n                title: 'Lorem Ipsum',\r\n            }\r\n        ];\r\n        this.getAllPosts = function (request, response) {\r\n            response.send(_this.posts);\r\n        };\r\n        this.createAPost = function (request, response) {\r\n            var post = request.body;\r\n            _this.posts.push(post);\r\n            response.send(post);\r\n        };\r\n        this.intializeRoutes();\r\n    }\r\n    PostsController.prototype.intializeRoutes = function () {\r\n        this.router.get(this.path, this.getAllPosts);\r\n        this.router.post(this.path, this.createAPost);\r\n    };\r\n    return PostsController;\r\n}());\r\nexports.default = PostsController;\r\n\n\n//# sourceURL=webpack:///./src/controllers/posts.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\r\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nvar WebSocket = __importStar(__webpack_require__(/*! ws */ \"ws\"));\r\nvar uuid = __importStar(__webpack_require__(/*! uuid */ \"uuid\"));\r\nvar posts_1 = __importDefault(__webpack_require__(/*! ./controllers/posts */ \"./src/controllers/posts.ts\"));\r\ndotenv.config();\r\nif (!process.env.PORT) {\r\n    process.exit(1);\r\n}\r\nfunction loggerMiddleware(request, response, next) {\r\n    console.log(request.method + \" \" + request.path);\r\n    next();\r\n}\r\nvar PORT = parseInt(process.env.PORT, 10);\r\nvar app = express_1.default();\r\napp.use(loggerMiddleware);\r\napp.use(helmet_1.default());\r\napp.use(cors_1.default());\r\napp.use(express_1.default.json());\r\napp.use(express_1.default.static(path_1.default.resolve(\"./public\")));\r\nvar controllers = [\r\n    new posts_1.default()\r\n];\r\n// this.initializeMiddlewares();\r\n// this.initializeControllers(controllers);\r\n// }\r\n// private initializeMiddlewares() {\r\n// this.app.use(bodyParser.json());\r\n// }\r\n//private initializeControllers(controllers) {\r\ncontrollers.forEach(function (controller) {\r\n    app.use('/', controller.router);\r\n});\r\n//}\r\nvar server = http_1.default.createServer(app);\r\n// ########## WSS ##########\r\nvar wss = new WebSocket.Server({ server: server }); //\r\nwss.on('connection', function (ws, request) {\r\n    ws.id = uuid.v4().toString();\r\n    ws.on('message', function (message) {\r\n        var data = message;\r\n        if (typeof (data) === 'string')\r\n            data = JSON.parse(data);\r\n        switch (data.type) {\r\n            case 'wss:clients':\r\n                var s_1 = [];\r\n                wss.clients.forEach(function (x) { s_1.push(x.id); });\r\n                ws.send(JSON.stringify({\r\n                    type: 'wss:clients',\r\n                    id: s_1\r\n                }));\r\n                break;\r\n            case 'wss:info':\r\n                ws.send(JSON.stringify({\r\n                    type: 'wss:info',\r\n                    id: ws.id\r\n                }));\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n        app.emit('wss:in', data);\r\n    });\r\n    ws.on('close', function () {\r\n        console.log('CLOSE:', ws.id);\r\n    });\r\n    ws.send(JSON.stringify({\r\n        type: 'wss:connect',\r\n        id: ws.id\r\n    }));\r\n    //   setInterval(()=>{\r\n    //     ws.send(JSON.stringify({ \r\n    //       type:'wss:lifebeat',\r\n    //       id:ws.id\r\n    //     })),\r\n    //     10000\r\n    //   );\r\n});\r\napp.on('wss:in', function (data) {\r\n    console.log('IN:', data);\r\n});\r\napp.on('wss:out', function (data) {\r\n    console.log('OUT:', data);\r\n    var id = '';\r\n    if (typeof (data.target) !== 'undefined') {\r\n        id = data.target;\r\n    }\r\n    wss.clients.forEach(function (client) {\r\n        if (id === '' || client.id === id) {\r\n            if (typeof data !== 'string')\r\n                data = JSON.stringify(data);\r\n            client.send(data);\r\n        }\r\n    });\r\n});\r\n/**\r\n * Server Activation\r\n */\r\nserver.listen(PORT, function () {\r\n    console.log(\"Listening on port \" + PORT);\r\n});\r\n/**\r\n * Webpack HMR Activation\r\n */\r\n// type ModuleId = string | number;\r\n// interface WebpackHotModule {\r\n//   hot?: {\r\n//     data: any;\r\n//     accept(\r\n//       dependencies: string[],\r\n//       callback?: (updatedDependencies: ModuleId[]) => void,\r\n//     ): void;\r\n//     accept(dependency: string, callback?: () => void): void;\r\n//     accept(errHandler?: (err: Error) => void): void;\r\n//     dispose(callback: (data: any) => void): void;\r\n//   };\r\n// }\r\n// declare const module: WebpackHotModule;\r\n// if (module.hot) {\r\n//   module.hot.accept();\r\n//   module.hot.dispose(() => server.close());\r\n// }\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/index.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid\");\n\n//# sourceURL=webpack:///external_%22uuid%22?");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ws\");\n\n//# sourceURL=webpack:///external_%22ws%22?");

/***/ })

/******/ });