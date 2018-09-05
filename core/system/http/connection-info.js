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

class ConnectionInfo {
    /**
     * 
     * @param {HttpContext} context 
     */
    constructor(context) {
        let _httpContext = context;

        let socket = context.request.socket;

        /*
        * Forwarded HTTP Extension: https://tools.ietf.org/html/rfc7239
        * x-forwarded-for
        */
        /**
         * Gets the IP address of the remote client.
         * 
         * @type {String}
         */
        this.remoteIpAddress = socket.remoteAddress;
        /**
         * Gets the remote IP family. 'IPv4' or 'IPv6'.
         * 
         * @type {String}
         */
        this.remoteIPFamily = socket.remoteFamily;
        /**
         * Gets the port of the remote client.
         * 
         * @type {Number?}
         */
        this.remotePort = socket.remotePort;
        /**
         * Gets the local IP address the remote client is connecting on.
         * 
         * @type {String}
         */
        this.localIpAddress = socket.localAddress;
        /**
         * Gets the local port.
         * 
         * @type {Number?}
         */
        this.localPort = socket.localPort;
    }
}

module.exports = ConnectionInfo;