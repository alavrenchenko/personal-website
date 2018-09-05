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

const arrayUtils = require('./internal/array');
const charUtils = require('./internal/char');
const objectUtils = require('./internal/object');
const stringUtils = require('./internal/string');




const utils = {
    array: arrayUtils,
    char: charUtils,
    object: objectUtils,
    string: stringUtils
};

module.exports = utils;