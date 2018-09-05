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

class ContactMessage {
    /**
     * @param {string} name
     * @param {string} email
     * @param {string} message
     */
    constructor(name, email, message) {
        /**
         * @type {number}
         */
        this.id = -1;

        /**
         * @type {string}
         */
        this.name = name;

        /**
         * @type {string}
         */
        this.email = email;

        /**
         * @type {string}
         */
        this.message = message;

        /**
         * @type {Date}
         */
        this.createdDateTime = null;

        /**
         * @type {string}
         */
        this.ip = null;

        /**
         * @type {string}
         */
        this.userAgent = null;
    }
}

module.exports = ContactMessage;