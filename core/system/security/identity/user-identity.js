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

class UserIdentity {
    /**
     * 
     * @param {string} name Name of the current user.
     * @param {Object} ticket
     * @param {Object} target Current user.
     * @param {boolean} isAuthenticated
     */
    constructor(name, ticket, target, isAuthenticated) {
        let _name = name;
        let _ticket = ticket;
        let _target = target;
        let _isAuthenticated = isAuthenticated;

        Object.defineProperty(this, 'name', {
            /**
             * Gets the name of the current user.
             */
            get: () => {
                return _name;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'ticket', {
            get: () => {
                return _ticket;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'target', {
            /**
             * Gets the current user.
             */
            get: () => {
                return _target;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'isAuthenticated', {
            /**
             * Gets a value that indicates whether the user has been authenticated.
             */
            get: () => {
                return _isAuthenticated;
            },
            enumerable: true
        });
    }
}

module.exports = UserIdentity;