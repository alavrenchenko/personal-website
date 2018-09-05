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

/**
 * @constructor
 * @param {Object} target
 * @param {string} error
 */
PW.ui.validators.formField.FormFieldValidatorResult = function (target, error) {
    /**
     * @type {Object}
     */
    this.target = target;

    /**
     * @type {string}
     */
    this.error = error;
};

/**
 * @returns {boolean}
 */
PW.ui.validators.formField.FormFieldValidatorResult.prototype.isValid = function () {
    return (this.error == null);
};