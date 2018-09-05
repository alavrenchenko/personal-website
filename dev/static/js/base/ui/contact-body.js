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
 * @extends {WebF.ui.Control}
 * @param {WebF.dom.DOMHelper} domHelper
 */
PW.ui.ContactBody = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     */
    this._nameField = new PW.ui.FormSingleLineInputField(domHelper);
    this._nameField.setLabel('Name');

    var validator = new PW.ui.validators.formField.LengthValidator(1, 100);
    validator.lengthZeroErrorMessage = 'Enter your name';
    this._nameField.validators.push(validator);

    this._nameField.isValidateWhenInputText = true;

    /**
     * @private
     */
    this._emailField = new PW.ui.FormSingleLineInputField(domHelper);
    this._emailField.setLabel('Email');
    this._emailField.setInputType(PW.ui.SingleLineInputType.EMAIL);

    validator = new PW.ui.validators.formField.LengthValidator(null, 100);
    validator.lengthZeroErrorMessage = 'Enter your email';
    this._emailField.validators.push(validator);

    validator = new PW.ui.validators.formField.EmailValidator();
    this._emailField.validators.push(validator);

    this._emailField.isValidateWhenInputText = true;

    /**
     * @private
     */
    this._messageField = new PW.ui.FormMultilineInputField(domHelper);
    this._messageField.setLabel('Message');

    validator = new PW.ui.validators.formField.LengthValidator(10, 5000);
    validator.lengthZeroErrorMessage = 'Enter a message';
    this._messageField.validators.push(validator);

    this._messageField.isValidateWhenInputText = true;

    this.addChild(this._nameField, false);
    this.addChild(this._emailField, false);
    this.addChild(this._messageField, false);
};

PW.ui.ContactBody.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.ContactBody.prototype.constructor = PW.ui.ContactBody;

/**
 * @returns {PW.ui.FormSingleLineInputField}
 */
PW.ui.ContactBody.prototype.getNameField = function () {
    return this._nameField;
};

/**
 * @returns {PW.ui.FormSingleLineInputField}
 */
PW.ui.ContactBody.prototype.getEmailField = function () {
    return this._emailField;
};

/**
 * @returns {PW.ui.FormMultilineInputField}
 */
PW.ui.ContactBody.prototype.getMessageField = function () {
    return this._messageField;
};



/**
 * @virtual
 * @returns {string}
 */
PW.ui.ContactBody.prototype.getTitle = function () {
    return this._title;
};

/**
 * @protected
 * @override
 */
PW.ui.ContactBody.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();

    elem = dom.getDocument().createElement('div');
    WebF.dom.classList.add(elem, PW.ui.ContactBodyCSSClassName.CONTACT_BODY);
    this.setElement(elem);

    this._nameField.render(elem);
    this._emailField.render(elem);
    this._messageField.render(elem);

    this._messageField.getTextBoxElement().style.height = '150px';

    WebF.ui.Control.prototype.onRender.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.ContactBody.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.ContactBodyCSSClassName.CONTACT_BODY)) {
        return false;
    }

    return true;
};

/**
 * @override
 */
PW.ui.ContactBody.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Control.prototype.dispose.call(this);
};