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

var config = require('../../config').base.scripts;

var path = config.path.src;

module.exports = [
    `${path}pw.js`,
    `${path}app/index.js`,
    `${path}app/view/index.js`,
    `${path}app/**/*.js`,
    `${path}data/index.js`,
    `${path}data/server/index.js`,
    `${path}data/server/request/index.js`,
    `${path}data/server/response/index.js`,
    `${path}data/**/*.js`,
    `${path}ui/index.js`,
    `${path}ui/validators/index.js`,
    `${path}ui/validators/form-field/index.js`,
    `${path}ui/validators/form-field/form-field-validator.js`,
    `${path}ui/validators/form-field/text-validator.js`,
    `${path}ui/validators/**/*.js`,
    `${path}ui/hyperlink.js`,
    `${path}ui/canvas.js`,
    `${path}ui/form-field.js`,
    `${path}ui/form-text-field.js`,
    `${path}ui/**/*.js`,
    `${path}**/*.js`,
    `${path}main.js`
];