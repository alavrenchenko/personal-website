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

'use string';

const ConnectionInfo = require('./connection-info');

/**
 * Encapsulates all HTTP-specific information about an individual HTTP request.
 */
class HttpContext {
    /**
     * @param {PWApplication} app
     * @param {IncomingMessage} request
     * @param {ServerResponse} response 
     */
    constructor(app, request, response) {
        request.httpContext = this;
        response.httpContext = this;

        let _app = app;
        let _request = request;
        let _response = response;
        let _connection = null;

        Object.defineProperty(this, 'application', {
            get: () => {
                return _app;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'request', {
            /**
             * Gets the IncomingMessage object for the current HTTP request.
             */
            get: () => {
                return _request;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'response', {
            /**
             * Gets the ServerResponse object for the current HTTP request.
             */
            get: () => {
                return _response;
            },
            enumerable: true
        });

        /**
         * @type {UserIdentity}
         */
        this.user = null;
        
        Object.defineProperty(this, 'connection', {
            /**
             * Gets information about the underlying connection for this request.
             */
            get: () => {
                return _connection;
            },
            enumerable: true
        });

        this.isCompleteRequest = false;

        this.compressResponse = true;

        _connection = new ConnectionInfo(this);
    }
}

module.exports = HttpContext;