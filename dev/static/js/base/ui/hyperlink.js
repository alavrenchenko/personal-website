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
PW.ui.Hyperlink = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {string}
     */
    this._href = null;

    /**
     * @private
     * @type {PW.ui.HyperlinkTarget?}
     */
    this._target = null;
};

PW.ui.Hyperlink.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.Hyperlink.prototype.constructor = PW.ui.Hyperlink;

/**
 * @virtual
 * @returns {string}
 */
PW.ui.Hyperlink.prototype.getHref = function () {
    return this._href;
};

/**
 * @virtual
 * @returns {string}
 */
PW.ui.Hyperlink.prototype.getFullHref = function () {
    var elem;

    return (elem = this.getElement()) ? elem.href : null;
};

/**
 * @virtual
 * @param {string} value
 */
PW.ui.Hyperlink.prototype.setHref = function (value) {
    if (this._href == value) {
        return;
    }

    this._href = value;

    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    if (value != null) {
        elem.href = value;
    }
    else {
        elem.removeAttribute('href');
    }
};

/**
 * @virtual
 * @returns {PW.ui.HyperlinkTarget?}
 */
PW.ui.Hyperlink.prototype.getTarget = function () {
    return this._target;
};

/**
 * @virtual
 * @param {PW.ui.HyperlinkTarget?} value
 */
PW.ui.Hyperlink.prototype.setTarget = function (value) {
    if (this._target == value) {
        return;
    }

    this._target = value;

    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    if (value != null) {
        elem.target = value;
    }
    else {
        elem.removeAttribute('target');
    }
};

/**
 * @protected
 * @override
 */
PW.ui.Hyperlink.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();

    elem = dom.getDocument().createElement('a');

    if (this._href != null) {
        elem.href = this._href;
    }

    if (this._target != null) {
        elem.target = this._target;
    }

    this.setElement(elem);

    WebF.ui.Control.prototype.onRender.call(this);
};

/**
 * @protected
 * @override
 */
PW.ui.Hyperlink.prototype.onApply = function () {
    var elem = this.getElement();

    this._href = elem.getAttribute('href');
    this._target = elem.getAttribute('target');

    WebF.ui.Control.prototype.onApply.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.Hyperlink.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || (element.tagName !== 'A')) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.Hyperlink.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }


    WebF.ui.Control.prototype.dispose.call(this);
};