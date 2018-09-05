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
 * @extends {PW.ui.validators.formField.TextValidator<string>}
 * @param {number?} minLength
 * @param {number?} maxLength
 */
PW.ui.validators.formField.LengthValidator = function (minLength, maxLength) {
    PW.ui.validators.formField.TextValidator.call(this, PW.ui.validators.formField.FormFieldValidatorType.LENGTH);

    /**
     * @type {number?}
     */
    this.minLength = minLength;

    /**
     * @type {number?}
     */
    this.maxLength = maxLength;

    /**
     * @type {string|null}
     */
    this.lengthZeroErrorMessage = null;
};

PW.ui.validators.formField.LengthValidator.prototype = Object.create(PW.ui.validators.formField.TextValidator.prototype);
PW.ui.validators.formField.LengthValidator.prototype.constructor = PW.ui.validators.formField.LengthValidator;


/**
 * @override
 * @param {string} target
 * @returns {PW.ui.validators.formField.FormFieldValidatorResult}
 */
PW.ui.validators.formField.LengthValidator.prototype.validate = function (target) {
    var result = PW.ui.validators.formField.TextValidator.prototype.validate.call(this, target);

    if (!result.isValid()) {
        return result;
    }

    label_V_1: {
        if ((this.lengthZeroErrorMessage != null) && (target.length < 1)) {
            result.target = target;
            result.error = this.lengthZeroErrorMessage;
            break label_V_1;
        }

        if ((this.minLength != null) && (this.minLength > target.length)) {
            result.target = target;
            result.error = 'Minimum length: ' + this.minLength + ' characters';
            break label_V_1;
        }

        if ((this.maxLength != null) && (this.maxLength < target.length)) {
            result.target = target;
            result.error = 'Maximum length: ' + this.maxLength + ' characters';
        }
    }

    return result;
};