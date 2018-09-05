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
 * @extends {PW.ui.Hyperlink}
 * @param {WebF.dom.DOMHelper} domHelper
 */
PW.ui.NavbarBrand = function (domHelper) {
    PW.ui.Hyperlink.call(this, domHelper);

    /**
     * @private
     * @type {string}
     */
    this._text = null;
};

PW.ui.NavbarBrand.prototype = Object.create(PW.ui.Hyperlink.prototype);
PW.ui.NavbarBrand.prototype.constructor = PW.ui.NavbarBrand;

/**
 * @returns {string}
 */
PW.ui.NavbarBrand.prototype.getText = function () {
    return this._text;
};

/**
 * @param {string} value
 */
PW.ui.NavbarBrand.prototype.setText = function (value) {
    var text = (value != null) ? String(value) : null;

    if (this._text == text) {
        return;
    }

    this._text = text;

    var elem = this.getElement();

    if (!elem) {
        return;
    }

    elem.innerText = (text != null) ? text : '';
};

/**
 * @protected
 * @override
 */
PW.ui.NavbarBrand.prototype.onApply = function () {
    PW.ui.Hyperlink.prototype.onApply.call(this);

    var elem = this.getElement();

    if (this._text != null) {
        elem.innerText = this._text;
    }
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.NavbarBrand.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.NavbarBrandCSSClassName.NAVBAR_BRAND)) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.NavbarBrand.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    PW.ui.Hyperlink.prototype.dispose.call(this);
};