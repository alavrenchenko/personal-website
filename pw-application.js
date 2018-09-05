/*
 * Copyright 2018 Alexey Lavrenchenko (http://alavrenchenko.com/). All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const $express = require('express');
const systemUtils = require('./core/system/utils');
const AppResoursesPaths = require('./core/data/app-resourses-paths');
const DatabaseManagementSystem = require('./core/database/database-management-system');

const beginRequestMiddleware = require('./middlewares/base/begin-request');
const authenticateRequestMiddleware = require('./middlewares/base/authenticate-request');
const authorizeRequestMiddleware = require('./middlewares/base/authorize-request');

const errorMiddleware = (process.env.NODE_ENV == 'production') ? require('./middlewares/base/error') : require('./middlewares/base/developer-error');
const notFoundMiddleware = require('./middlewares/base/not-found');

const baseHandler = require('./http-handlers/base-handler');

const baseController = require('./controllers/base-controller');
const robotsController = require('./controllers/robots-controller');

const compression = require('compression');
const bodyParser = require('body-parser');
const hbs = require('hbs');

class PWApplication {
    /**
     * @param {number} port
     */
    constructor(port) {
        /**
         * @private
         */
        this._port = port;
        /**
         * @private
         */
        this._appStarted = false;

        /**
         * @private
         */
        this._appExiting = false;

        /**
         * @private
         */
        this._appRelease = true;

        /**
         * @private
         */
        this._appResoursesPaths = new AppResoursesPaths(this._appRelease);

        /**
         * @private
         */
        this._db = new DatabaseManagementSystem(this);

        /**
         * @private
         */
        this._express = $express();
    }

    get appStarted() {
        return this._appStarted;
    }

    get appExiting() {
        return this._appExiting;
    }

    get appRelease() {
        return this._appRelease;
    }

    get appResoursesPaths() {
        return this._appResoursesPaths;
    }

    get db() {
        return this._db;
    }

    get express() {
        return this._express;
    }

    appStart() {
        if (this._appStarted) {
            return false;
        }

        this._configure();

        this._express.listen(this._port);

        this._appStarted = true;

        return true;
    }

    /**
     * @private
     */
    _configure() {
        hbs.registerPartials(__dirname + '/views/shared/partials');

        this._express.set('view engine', 'hbs');

        this._express.use(compression({ filter: this._compressionFilter.bind(this) }));

        this._express.use(beginRequestMiddleware(this._onBeginRequest.bind(this)));
        this._express.use(authenticateRequestMiddleware(null, this._onAuthenticateRequest.bind(this)));
        this._express.use(authorizeRequestMiddleware(this._onAuthorizeRequest.bind(this)));

        this._express.use(bodyParser.json());

        this._express.use('/static', $express.static(__dirname + '/static', { maxAge: 3600000 }));

        if (this._appRelease === false) {
            this._express.use('/dev/static', $express.static(__dirname + '/dev/static'));
            this._express.use('/dist', $express.static(__dirname + '/dist'));
        }

        this._registerRoutes();

        this._express.use(notFoundMiddleware());
        this._express.use(errorMiddleware());

        this._express.disable('x-powered-by');
    }

    /**
     * @private
     */
    _registerRoutes() {
        this._express.post('/base', baseHandler);

        this._express.get('/', baseController.index);
        this._express.get('/robots.txt', robotsController.index);
    }

    /**
     * @private
     * @param {HttpContext} context
     */
    _onBeginRequest(context) {
        // 1
        //console.log('onBeginRequest');
    }

    /**
     * @private
     * @param {HttpContext} context
     */
    _onAuthenticateRequest(context) {
        // 2
        //console.log('onAuthenticateRequest');
    }

    /**
     * @private
     * @param {HttpContext} context
     */
    _onAuthorizeRequest(context) {
        // 3
        //console.log('onAuthorizeRequest');
    }


    /**
     * @private
     * @param {IncomingMessage} request
     * @param {ServerResponse} response
     */
    _compressionFilter(request, response) {
        let context = request.httpContext;

        if (context && !context.compressResponse) {
            return false;
        }

        return compression.filter(request, response);
    }
};

module.exports = PWApplication;