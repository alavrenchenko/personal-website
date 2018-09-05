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
 * @extends {PW.ui.FormInputField}
 * @param {WebF.dom.DOMHelper} domHelper
 * @param {string} tagName
 * @template TTextFieldElement
 */
PW.ui.FormSingleLineInputField = function (domHelper) {
    PW.ui.FormInputField.call(this, domHelper, false);

    /**
     * @type {PW.ui.SingleLineInputType}
     */
    this._inputType = PW.ui.SingleLineInputType.TEXT;
};

PW.ui.FormSingleLineInputField.prototype = Object.create(PW.ui.FormInputField.prototype);
PW.ui.FormSingleLineInputField.prototype.constructor = PW.ui.FormSingleLineInputField;

/**
 * @returns {PW.ui.SingleLineInputType}
 */
PW.ui.FormSingleLineInputField.prototype.getInputType = function () {
    return this._inputType;
};

/**
 * @param {PW.ui.SingleLineInputType} value
 */
PW.ui.FormSingleLineInputField.prototype.setInputType = function (value) {
    if (this._inputType == value) {
        return;
    }

    this._inputType = value;
    var textBoxElem = this.getTextBoxElement();

    if (!textBoxElem) {
        return;
    }

    textBoxElem.type = value;
};

/**
 * @protected
 * @override
 */
PW.ui.FormSingleLineInputField.prototype.onRender = function () {
    PW.ui.FormInputField.prototype.onRender.call(this);

    var textBoxElem = this.getTextBoxElement();
    textBoxElem.type = this._inputType;
};



/**
 * @override
 */
PW.ui.FormSingleLineInputField.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    PW.ui.FormInputField.prototype.dispose.call(this);
};