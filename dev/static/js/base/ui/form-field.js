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
 * @abstract
 * @constructor
 * @extends {WebF.ui.Control}
 * @param {WebF.dom.DOMHelper} domHelper
 * @param {PW.ui.FormFieldType} type
 */
PW.ui.FormField = function (domHelper, type) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {PW.ui.FormFieldType}
     */
    this._type = type;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._wrapperElement = null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._labelElement = null;

    /**
     * @private
     * @type {string}
     */
    this._label = null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._errorElement = null;

    /**
     * @private
     * @type {string}
     */
    this._error = null;

    /**
     * @type {Array<PW.ui.validators.formField.FormFieldValidator>}
     */
    this.validators = [];
};

PW.ui.FormField.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.FormField.prototype.constructor = PW.ui.FormField;

/**
 * @returns {PW.ui.FormFieldType}
 */
PW.ui.FormField.prototype.getType = function () {
    return this._type;
};

/**
 * @returns {HTMLElement}
 */
PW.ui.FormField.prototype.getWrapperElement = function () {
    return this._wrapperElement;
};

/**
 * @returns {HTMLElement}
 */
PW.ui.FormField.prototype.getLabelElement = function () {
    return this._labelElement;
};

/**
 * @param {HTMLElement} element
 */
PW.ui.FormField.prototype.setLabelElement = function (element) {
    this._labelElement = element;

    if (element) {
        element.innerText = (this._label != null) ? this._label : '';
    }
};

/**
 * @virtual
 * @returns {string}
 */
PW.ui.FormField.prototype.getLabel = function () {
    return this._label;
};

/**
 * @virtual
 * @param {string} value
 */
PW.ui.FormField.prototype.setLabel = function (value) {
    var label = (value != null) ? String(value) : null;

    if (this._label == label) {
        return;
    }

    this._label = label;

    if (!this._labelElement) {
        return;
    }

    this._labelElement.innerText = (label != null) ? label : '';
};

/**
 * @returns {HTMLElement}
 */
PW.ui.FormField.prototype.getErrorElement = function () {
    return this._errorElement;
};

/**
 * @param {HTMLElement} element
 */
PW.ui.FormField.prototype.setErrorElement = function (element) {
    this._errorElement = element;

    if (element) {
        element.innerText = (this._error != null) ? this._error : '';
    }
};

/**
 * @virtual
 * @returns {string}
 */
PW.ui.FormField.prototype.getError = function () {
    return this._error;
};

/**
 * @virtual
 * @param {string} value
 */
PW.ui.FormField.prototype.setError = function (value) {
    var error = (value != null) ? String(value) : null;

    if (this._error == error) {
        return;
    }

    var oldHasError = this.hasError();
    this._error = error;

    if (this._errorElement) {
        this._errorElement.innerText = (error != null) ? error : '';
    }

    var elem = this.getElement();

    if (elem && (oldHasError !== this.hasError())) {
        var classList = WebF.dom.classList;

        if (this.hasError()) {
            classList.add(elem, PW.ui.FormFieldCSSClassName.INVALID);
        }
        else {
            classList.remove(elem, PW.ui.FormFieldCSSClassName.INVALID);
        }
    }

    var e = new WebF.events.WFEvent(PW.ui.FormFieldEventType.ERROR_CHANGED, this);

    this.onErrorChanged(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
PW.ui.FormField.prototype.onErrorChanged = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

PW.ui.FormField.prototype.hasError = function () {
    return ((this._error != null) && (this._error.length > 0));
};


/**
 * @protected
 * @override
 */
PW.ui.FormField.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;

    elem = doc.createElement('div');
    classList.add(elem, PW.ui.FormFieldCSSClassName.FORM_FIELD);

    var wrapperElem = doc.createElement('div');
    classList.add(wrapperElem, PW.ui.FormFieldCSSClassName.WRAPPER);

    elem.appendChild(wrapperElem);
    this._wrapperElement = wrapperElem;

    this.setElement(elem);

    WebF.ui.Control.prototype.onRender.call(this);
};

/**
 * @virtual
 */
PW.ui.FormField.prototype.validate = function () {

};


/**
 * @override
 */
PW.ui.FormField.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    this.validators = null;

    WebF.ui.Control.prototype.dispose.call(this);

    this._wrapperElement = null;
    this._labelElement = null;
    this._errorElement = null;
};