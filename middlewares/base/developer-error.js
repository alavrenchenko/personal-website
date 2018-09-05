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

const http = require('http');

function developerError() {
    return function developerError(error, request, response, next) {
        let status = error.status || error.statusCode || 500;
        let description = http.STATUS_CODES[status];

        response.status(status);

        response.render('error', {
            title: status,
            content: {
                title: `${status} ${description}`,
            },
            error: error
        });
    };
}

module.exports = developerError;