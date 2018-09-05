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

const rewriteHelper = require('./rewrite-helper');

const controller = {};

/**
 * @param {HttpContext} context
 * @returns {Object} ViewData.
 */
controller.initialize = function (context) {
    rewriteHelper.invoke(context);

    if (context.isCompleteRequest === true) {
        return null;
    }

    context.response.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');

    let appResoursesPaths = context.application.appResoursesPaths;

    let viewData = {};

    if (appResoursesPaths.cssBundle != null) {
        viewData.styles = [{
            href: appResoursesPaths.cssBundle
        }];
    }
    else {
        viewData.styles = [{
            href: appResoursesPaths.libWebFCSS
        },
        {
            href: appResoursesPaths.cssBase
        }];
    }

    if (appResoursesPaths.jsBundle != null) {
        viewData.scripts = [{
            src: appResoursesPaths.jsBundle
        }];
    }
    else {
        viewData.scripts = [{
            src: appResoursesPaths.libWebFJS
        },
        {
            src: appResoursesPaths.jsBase
        }];
    }
    return viewData;
};

module.exports = controller;