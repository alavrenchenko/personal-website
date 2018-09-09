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

const ContactMessages = require('../data/contact-messages');

class DatabaseManagementSystem {
    /**
     * @param {PWApplication} app
     */
    constructor(app) {
        /**
         * @private
         */
        this._app = app;

        /**
         * @const
         */
        this.PERSONAL_WEBSITE_CONNECTION_CONFIG = {
            host: 'localhost',
            port: 0,
            user: 'user',
            password: 'password',
            database: 'personal_website',
            charset: 'utf8mb4_unicode_ci',
            connectTimeout: 30000,
            timezone: 'Z'
        };

        /**
         * @const
         */
        this.PERSONAL_WEBSITE_CONTACT_MESSAGES_TABLE = 'contact_messages';

        /**
         * @private
         * @readonly
         */
        this._contactMessages = new ContactMessages(this);
    }

    get app() {
        return this._app;
    }

    get contactMessages() {
        return this._contactMessages;
    }
}

module.exports = DatabaseManagementSystem;