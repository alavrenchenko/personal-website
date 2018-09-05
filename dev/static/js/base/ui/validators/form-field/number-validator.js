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
 * @extends {PW.ui.validators.formField.FormFieldValidator<TValidateTarget>}
 * @param {PW.ui.validators.formField.FormFieldValidatorType?} type
 * @template TValidateTarget
 */
PW.ui.validators.formField.NumberValidator = function (type) {
    PW.ui.validators.formField.FormFieldValidator.call(this, (type != null) ? type : PW.ui.validators.formField.FormFieldValidatorType.NUMBER);
};

PW.ui.validators.formField.NumberValidator.prototype = Object.create(PW.ui.validators.formField.FormFieldValidator.prototype);
PW.ui.validators.formField.NumberValidator.prototype.constructor = PW.ui.validators.formField.NumberValidator;


/**
 * @override
 * @param {TValidateTarget} target
 * @returns {PW.ui.validators.formField.FormFieldValidatorResult}
 */
PW.ui.validators.formField.NumberValidator.prototype.validate = function (target) {
    var result = new PW.ui.validators.formField.FormFieldValidatorResult(null, null);

    if (!WebF.base.isNumber(target) && !this.isNumber(target)) {
        result.target = target;
        result.error = 'Enter a number';
    }

    return result;
};

/**
 * @param {Object} value
 * @returns {boolean}
 */
PW.ui.validators.formField.NumberValidator.prototype.isNumber = function (value) {
    var num = parseFloat(value);

    if (isNaN(num)) {
        return false;
    }

    return isFinite(num);
};