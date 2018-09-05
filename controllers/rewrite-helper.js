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

const rewriteHelper = {};

/**
 * @param {HttpContext} context
 * @returns {boolean}
 */
rewriteHelper.invoke = function (context) {
    let request = context.request;
    let host = request.headers['host'];

    if (host && (host.length > 6) && (host.substring(0, 4) === 'www.')) {
        context.response.writeHead(301, {
            'Location': `${request.protocol}://${host.substring(4)}${request.url}`
        });

        context.response.end();
        context.isCompleteRequest = true;

        return true;
    }

    return false;
};

module.exports = rewriteHelper;