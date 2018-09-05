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
 * @extends {PW.ui.validators.formField.FormFieldValidator<string>}
 */
PW.ui.validators.formField.EmailValidator = function () {
    PW.ui.validators.formField.FormFieldValidator.call(this, PW.ui.validators.formField.FormFieldValidatorType.EMAIL);
};

PW.ui.validators.formField.EmailValidator.prototype = Object.create(PW.ui.validators.formField.FormFieldValidator.prototype);
PW.ui.validators.formField.EmailValidator.prototype.constructor = PW.ui.validators.formField.EmailValidator;

/**
 * @private
 * @const
 * @type {RegExp}
 */
PW.ui.validators.formField.EmailValidator._EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;


/**
 * @override
 * @param {string} target
 * @returns {PW.ui.validators.formField.FormFieldValidatorResult}
 */
PW.ui.validators.formField.EmailValidator.prototype.validate = function (target) {
    var result = new PW.ui.validators.formField.FormFieldValidatorResult(null, null);

    if (!WebF.base.isString(target) || !PW.ui.validators.formField.EmailValidator._EMAIL_REGEX.test(target)) {
        result.target = target;
        result.error = 'Not a valid email';
    }

    return result;
};