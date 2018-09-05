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

const UserIdentity = require('../../core/system/security/identity/user-identity');

/**
 * @param {AuthenticationModule} authModule
 * @param {function} handler
 */
function authenticateRequest(authModule, handler) {
    return function authenticateRequest(request, response, next) {
        let context = request.httpContext;

        if (authModule != null) {
            authModule.invoke(context);
        }

        if (handler != null) {
            handler(context);
        }

        if (context.isCompleteRequest === true) {
            return;
        }

        if (context.user == null) {
            context.user = new UserIdentity(null, null, null, false);
        }

        next();
    };
}

module.exports = authenticateRequest;