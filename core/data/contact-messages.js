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

const mysql = require('mysql');

const dataValidation = require('../data-validation')
const systemUtils = require('../system/utils');

/**
 * @constructor
 * @param {DatabaseManagementSystem} db
 */
const ContactMessages = function (db) {
    this.db = db;
};

/**
 * @param {ContactMessage} contactMessage
 * @returns {number} Status.
 */
ContactMessages.prototype.createContactMessage = async function (contactMessage) {
    if (!contactMessage) {
        return 1;
    }

    var name = contactMessage.name;
    var email = contactMessage.email;

    if ((name == null) || ((name = systemUtils.string.trim(name)).length < 1)) {
        return 2;
    }

    if ((email == null) || !dataValidation.isEmailValid((email = systemUtils.string.trim(email)))) {
        return 3;
    }

    if (systemUtils.string.isNullOrWhitespace(contactMessage.message)) {
        return 4;
    }

    contactMessage.name = name;
    contactMessage.email = email;
    contactMessage.createdDateTime = new Date();

    if (await this._dbCreateContactMessage(contactMessage) !== true) {
        return 5;
    }

    return 0;
};

/**
 * @private
 * @param {ContactMessage} contactMessage
 * @returns {boolean}
 */
ContactMessages.prototype._dbCreateContactMessage = function (contactMessage) {
    return new Promise((resolve, reject) => {
        let conn = mysql.createConnection(this.db.PERSONAL_WEBSITE_CONNECTION_CONFIG);

        conn.connect((error) => {
            if (error) {
                console.log(error);
                return resolve(false);
            }

            let sql = `INSERT INTO ${this.db.PERSONAL_WEBSITE_CONTACT_MESSAGES_TABLE} (Name, Email, Message, CreatedDateTime, CreatedDateTimeTicks, Ip, UserAgent) VALUES (${conn.escape(contactMessage.name)}, ${conn.escape(contactMessage.email)}, ${conn.escape(contactMessage.message)}, ${conn.escape(contactMessage.createdDateTime)}, ${conn.escape(contactMessage.createdDateTime.valueOf())}, ${conn.escape(contactMessage.ip)}, ${conn.escape(contactMessage.userAgent)})`;

            conn.query({ sql: sql, timeout: 30000 }, (error, results, fields) => {
                conn.destroy();

                if (error) {
                    console.log(error);
                    return resolve(false);
                }

                contactMessage.id = results.insertId;

                resolve(true);
            });
        });
    });
};

module.exports = ContactMessages;