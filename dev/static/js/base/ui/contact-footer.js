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
PW.ui.ContactFooter = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     */
    this._sendBtn = new PW.ui.Button(domHelper);
    this._sendBtn.setText('Send');

    /**
     * @private
     * @type {HTMLElement}
     */
    this._statusElement = null;

    /**
     * @private
     * @type {string}
     */
    this._status = null;

};

PW.ui.ContactFooter.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.ContactFooter.prototype.constructor = PW.ui.ContactFooter;

/**
 * @returns {PW.ui.Button}
 */
PW.ui.ContactFooter.prototype.getSendBtn = function () {
    return this._sendBtn;
};

/**
 * @param {string} value
 */
PW.ui.ContactFooter.prototype.setStatus = function (value) {
    var status = (value != null) ? String(value) : null;

    if (this._status == status) {
        return;
    }

    this._status = status;

    if (!this._statusElement) {
        return;
    }

    this._statusElement.innerText = (status != null) ? status : '';
};

/**
 * @protected
 * @override
 */
PW.ui.ContactFooter.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();
    var classList = WebF.dom.classList;

    elem = dom.getDocument().createElement('div');
    classList.add(elem, PW.ui.ContactFooterCSSClassName.CONTACT_FOOTER);
    this.setElement(elem);

    var statusElem = dom.getDocument().createElement('span');
    classList.addAll(statusElem, [PW.ui.ContactFooterCSSClassName.STATUS, PW.ui.BaseCSSClassName.FLOAT_LEFT]);

    elem.appendChild(statusElem);
    this._statusElement = statusElem;

    this._sendBtn.render(elem);
    classList.add(this._sendBtn.getElement(), PW.ui.BaseCSSClassName.FLOAT_RIGHT);

    WebF.ui.Control.prototype.onRender.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.ContactFooter.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.ContactFooterCSSClassName.CONTACT_FOOTER)) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.ContactFooter.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Control.prototype.dispose.call(this);

    this._statusElement = null;
};