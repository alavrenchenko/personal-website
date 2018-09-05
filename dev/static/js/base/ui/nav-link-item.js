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
 * @param {string} text
 */
PW.ui.NavLinkItem = function (domHelper, text) {
    PW.ui.Hyperlink.call(this, domHelper);

    /**
     * @private
     * @type {string}
     */
    this._text = (text != null) ? String(text) : null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._textElement = null;
};

PW.ui.NavLinkItem.prototype = Object.create(PW.ui.Hyperlink.prototype);
PW.ui.NavLinkItem.prototype.constructor = PW.ui.NavLinkItem;

/**
 * @override
 * @param {string} value
 */
PW.ui.NavLinkItem.prototype.setHref = function (value) {
    PW.ui.Hyperlink.prototype.setHref.call(this, value);

    if ((this.getHref() == null) && (this.getTarget() != null)) {
        this.setTarget(null);
    }
};

/**
 * @override
 * @param {PW.ui.HyperlinkTarget?} value
 */
PW.ui.NavLinkItem.prototype.setTarget = function (value) {
    if (this.getHref() == null) {
        return;
    }

    PW.ui.Hyperlink.prototype.setTarget.call(this, value);
};

/**
 * @virtual
 * @returns {string}
 */
PW.ui.NavLinkItem.prototype.getText = function () {
    return this._text;
};

/**
 * @virtual
 * @param {string} value
 */
PW.ui.NavLinkItem.prototype.setText = function (value) {
    var text = (value != null) ? String(value) : null;

    if (this._text == text) {
        return;
    }

    this._text = text;

    if (!this._textElement) {
        return;
    }

    this._textElement.innerText = (text != null) ? text : '';
};

/**
 * @protected
 * @override
 */
PW.ui.NavLinkItem.prototype.onRender = function () {
    PW.ui.Hyperlink.prototype.onRender.call(this)

    var dom = this.getDOMHelper();
    var elem = this.getElement();
    var classList = WebF.dom.classList;

    classList.add(elem, PW.ui.NavLinkItemCSSClassName.NAV_LINK_ITEM);

    var textElem = dom.getDocument().createElement('div');
    classList.add(textElem, PW.ui.NavItemCSSClassName.TEXT);

    if (this._text != null) {
        textElem.innerText = this._text;
    }

    elem.appendChild(textElem);
    this._textElement = textElem;
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.NavLinkItem.prototype.canApply = function (element) {
    if (!PW.ui.Hyperlink.prototype.canApply.call(this, element)) {
        return false;
    }

    var dom = this.getDOMHelper();

    if (WebF.dom.classList.contains(element, PW.ui.NavLinkItemCSSClassName.NAV_LINK_ITEM)) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.NavLinkItem.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    PW.ui.Hyperlink.prototype.dispose.call(this);

    this._textElement = null;
};