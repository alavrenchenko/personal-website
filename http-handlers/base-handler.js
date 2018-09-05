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

const fs = require('fs');

const ResultViewModelBase = require('../view-models/result-view-model-base');
const BgdImageResultViewModel = require('../view-models/base/bgd-image-result-view-model');
const ContactFormDataResultViewModel = require('../view-models/base/contact-form-data-result-view-model');
const ContactMessage = require('../core/data/contact-message');
const systemUtils = require('../core/system/utils');

async function invoke(request, response) {
    let context = request.httpContext;

    let empty = true;
    let responseData = null;
    let result = null;
    let status = 0;
    let errorCode = -1;

    label_I_1: {
        /**
         * @type {IJsonRequestDataViewModel<Object>}
         */
        let requestData = request.body;

        if (requestData == null) {
            errorCode = 10000;
            break label_I_1;
        }

        if (requestData.type === 0) {
            // Bgd Image
            empty = false;
            result = processBgdImage(context, requestData);
        }
        else if (requestData.type === 1) {
            // Contact Form Data
            empty = false;
            result = await processContactFormData(context, requestData);
        }
    }

    if ((result == null) || (empty === true)) {
        if (errorCode === -1) {
            errorCode = 15000;
        }

        result = new ResultViewModelBase();
        result.status = status;
        result.errorCode = errorCode;
    }

    try {
        responseData = JSON.stringify(result);
    }
    catch (e) {
        responseData = 'Error';
    }

    response.setHeader('Content-Type', 'application/json');

    response.end(responseData);
}

/**
 * @param {HttpContext} context
 * @param {IJsonRequestDataViewModel<Object>} requestData
 * @returns {BgdImageResultViewModel}
 */
function processBgdImage(context, requestData) {
    let result = new BgdImageResultViewModel();
    let status = 0;
    let errorCode = -1;

    label_PBI_1: {
        try {
            result.imageDataUrl = fs.readFileSync('app-data/base/bgd/image-base64.txt', 'utf8');
        }
        catch (e) {
            errorCode = 1001;
            break label_PBI_1;
        }

        status = 1;
    }

    result.status = status;
    result.errorCode = errorCode;

    return result;
}

/**
 * @param {HttpContext} context
 * @param {IJsonRequestDataViewModel<IContactFormDataViewModel>} requestData
 * @returns {ContactFormDataResultViewModel}
 */
async function processContactFormData(context, requestData) {
    let result = new ContactFormDataResultViewModel();
    let status = 0;
    let errorCode = -1;
    let errorMessage = null;

    /**
     * @type {IContactFormDataViewModel}
     */
    let data = requestData.data;

    label_PCFD_1: {
        var name;
        var email;
        var msg;

        if (data == null) {
            errorCode = 1000;
            break label_PCFD_1;
        }

        name = data.name;
        email = data.email;
        msg = data.message;

        if (systemUtils.string.isNullOrWhitespace(name)) {
            errorCode = 1001;
            errorMessage = 'Enter your name';
            break label_PCFD_1;
        }

        if (systemUtils.string.isNullOrWhitespace(email)) {
            errorCode = 1002;
            errorMessage = 'Enter your email';
            break label_PCFD_1;
        }

        if (systemUtils.string.isNullOrWhitespace(msg)) {
            errorCode = 1003;
            errorMessage = 'Enter a message';
            break label_PCFD_1;
        }

        if (name.length > 100) {
            errorCode = 1004;
            errorMessage = 'Maximum length: 100 characters';
            break label_PCFD_1;
        }

        if (email.length > 100) {
            errorCode = 1005;
            errorMessage = 'Maximum length: 100 characters';
            break label_PCFD_1;
        }

        if (msg.length < 10) {
            errorCode = 1006;
            errorMessage = 'Minimum length: 10 characters';
            break label_PCFD_1;
        }

        if (msg.length > 5000) {
            errorCode = 1007;
            errorMessage = 'Maximum length: 5000 characters';
            break label_PCFD_1;
        }

        try {
            let contactMessage = new ContactMessage(name, email, msg);
            contactMessage.ip = context.connection.remoteIpAddress;

            let userAgent = context.request.headers['user-agent'] || context.request.get('user-agent') || null;

            if (userAgent) {
                userAgent = systemUtils.string.trim(userAgent);

                if (userAgent.length > 512) {
                    userAgent = userAgent.substr(0, 512);
                }

                contactMessage.userAgent = userAgent;
            }

            let status2 = await context.application.db.contactMessages.createContactMessage(contactMessage);

            if (status2 !== 0) {
                errorCode = status2;

                if (status2 === 2) {
                    errorMessage = 'Enter your name';
                }
                else if (status2 === 3) {
                    errorMessage = 'Enter your email';
                }
                else if (status2 === 4) {
                    errorMessage = 'Enter a message';
                }

                break label_PCFD_1;
            }
        }
        catch (e) {
            errorCode = 1008;
            break label_PCFD_1;
        }

        status = 1;
    }

    result.status = status;
    result.errorCode = errorCode;
    result.errorMessage = errorMessage;

    return result;
}

module.exports = invoke;