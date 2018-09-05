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
PW.ui.PageBody = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {HTMLElement}
     */
    this._col1Element = null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._col2Element = null;

    /**
     * @private
     */
    this._bgd = new PW.ui.Bgd(domHelper);

    /**
     * @private
     */
    this._contact = new PW.ui.Contact(domHelper);

    this.addChild(this._bgd, false);
    this.addChild(this._contact, false);

    /**
     * @private
     * @type {function(Event)}
     */
    this._$windowResizeHandler = null;
};

PW.ui.PageBody.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.PageBody.prototype.constructor = PW.ui.PageBody;

/**
 * @returns {PW.ui.Bgd}
 */
PW.ui.PageBody.prototype.getBgd = function () {
    return this._bgd;
};

/**
 * @returns {PW.ui.Contact}
 */
PW.ui.PageBody.prototype.getContact = function () {
    return this._contact;
};

/**
 * @protected
 * @override
 */
PW.ui.PageBody.prototype.onApply = function () {
    var dom = this.getDOMHelper();
    var elem = this.getElement();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;

    var col1Elem = doc.createElement('div');
    classList.add(col1Elem, PW.ui.PageBodyCSSClassName.COL_1);

    var col2Elem = doc.createElement('div');
    classList.add(col2Elem, PW.ui.PageBodyCSSClassName.COL_2);

    this._bgd.render(col1Elem);
    this._contact.render(col2Elem);

    elem.appendChild(col1Elem);
    elem.appendChild(col2Elem);

    this._col1Element = col1Elem;
    this._col2Element = col2Elem;

    WebF.ui.Control.prototype.onApply.call(this);

    this._$windowResizeHandler = this._onWindowResize.bind(this);
    this.getDOMHelper().getWindow().addEventListener(WebF.events.NativeEventType.RESIZE, this._$windowResizeHandler);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.PageBody.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.PageBodyCSSClassName.PAGE_BODY)) {
        return false;
    }

    return true;
};

/**
 * @private
 * @param {Event} e
 */
PW.ui.PageBody.prototype._onWindowResize = function (e) {
    this._bgd.resize();
};

/**
 * @override
 */
PW.ui.PageBody.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    if (this._$windowResizeHandler) {
        this.getDOMHelper().getWindow().removeEventListener(WebF.events.NativeEventType.RESIZE, this._$windowResizeHandler);
        this._$windowResizeHandler = null;
    }

    WebF.ui.Control.prototype.dispose.call(this);

    this._col1Element = null;
    this._col2Element = null;
};