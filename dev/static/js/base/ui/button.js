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
PW.ui.Button = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {HTMLElement}
     */
    this._rippleElement = null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._contentElement = null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._textElement = null;

    /**
     * @private
     * @type {string}
     */
    this._text = null;

    /**
     * @private
     * @type {boolean}
     */
    this._transitionStarted = false;

    /**
     * @private
     * @type {number}
     */
    this._transitionTimeout = 300;

    /**
     * @private
     * @type {number}
     */
    this._transitionTimer = -1;
};

PW.ui.Button.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.Button.prototype.constructor = PW.ui.Button;

/**
 * @virtual
 * @returns {string}
 */
PW.ui.Button.prototype.getText = function () {
    return this._text;
};

/**
 * @virtual
 * @param {string} value
 */
PW.ui.Button.prototype.setText = function (value) {
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
 * @override
 * @param {boolean} enable
 */
PW.ui.Button.prototype.setEnabled = function (enable) {
    var elem = this.getElement();

    if (elem) {
        elem.disabled = !enable;
    }

    WebF.ui.Control.prototype.setEnabled.call(this, enable);
};


/**
 * @protected
 * @override
 */
PW.ui.Button.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;

    elem = doc.createElement('button');
    classList.add(elem, PW.ui.ButtonCSSClassName.BTN);
    elem.type = 'button';
    this.setElement(elem);

    this._rippleElement = doc.createElement('div');
    classList.add(this._rippleElement, PW.ui.ButtonCSSClassName.RIPPLE);
    elem.appendChild(this._rippleElement);

    var contentElem = doc.createElement('div');
    classList.add(contentElem, PW.ui.ButtonCSSClassName.CONTENT);

    var textElem = doc.createElement('span');
    classList.add(textElem, PW.ui.ButtonCSSClassName.TEXT);

    if (this._text != null) {
        textElem.innerText = this._text;
    }

    contentElem.appendChild(textElem);

    elem.appendChild(contentElem);
    this._contentElement = contentElem;
    this._textElement = textElem;

    if (!this.isEnabled()) {
        elem.disabled = true;
    }

    WebF.ui.Control.prototype.onRender.call(this);

    this.addEventHandler(WebF.ui.ControlEventType.MOUSE_DOWN, this._onBtnMouseDown.bind(this));
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.Button.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.ButtonCSSClassName.BTN)) {
        return false;
    }

    return true;
};

/**
 * @private
 * @param {WebF.events.WFNativeEvent}
 */
PW.ui.Button.prototype._onBtnMouseDown = function (e) {
    var nativeEvent = e.nativeEvent;

    this._startTransition(nativeEvent.layerX, nativeEvent.layerY);
};

/**
 * @private
 * @param {number} x
 * @param {number} y
 */
PW.ui.Button.prototype._startTransition = function (x, y) {
    if (this._transitionStarted) {
        this._cancelTransition();
    }


    var elem = this.getElement();
    var rippleStyle = this._rippleElement.style;

    rippleStyle.top = y + 'px';
    rippleStyle.left = x + 'px';
    rippleStyle.width = elem.offsetWidth + 'px';
    rippleStyle.height = Math.max(elem.offsetWidth, elem.offsetHeight) + 'px';

    WebF.dom.classList.add(elem, PW.ui.ButtonCSSClassName.TRANSITION);

    this._transitionStarted = true;
    this._transitionTimer = this.getDOMHelper().getWindow().setTimeout(this._endTransition.bind(this), this._transitionTimeout);
};

/**
 * @private
 */
PW.ui.Button.prototype._endTransition = function () {
    if (!this._transitionStarted) {
        return;
    }

    WebF.dom.classList.remove(this.getElement(), PW.ui.ButtonCSSClassName.TRANSITION);

    this._transitionTimer = -1;
    this._transitionStarted = false;
};

/**
 * @private
 */
PW.ui.Button.prototype._cancelTransition = function () {
    if (!this._transitionStarted) {
        return;
    }

    this.getDOMHelper().getWindow().clearTimeout(this._transitionTimer);
    this._endTransition();
};


/**
 * @override
 */
PW.ui.Button.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Control.prototype.dispose.call(this);
};