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
PW.ui.Canvas = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);
};

PW.ui.Canvas.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.Canvas.prototype.constructor = PW.ui.Canvas;

/**
 * @returns {number}
 */
PW.ui.Canvas.prototype.getCanvasWidth = function () {
    var elem;

    return (elem = this.getElement()) ? elem.width : 0;
};

/**
 * @param {number}
 */
PW.ui.Canvas.prototype.setCanvasWidth = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }


    elem.width = value;
};

/**
 * @returns {number}
 */
PW.ui.Canvas.prototype.getCanvasHeight = function () {
    var elem;

    return (elem = this.getElement()) ? elem.height : 0;
};

/**
 * @param {number}
 */
PW.ui.Canvas.prototype.setCanvasHeight = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }


    elem.height = value;
};

/**
 * @protected
 * @override
 */
PW.ui.Canvas.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();

    elem = dom.getDocument().createElement('canvas');
    this.setElement(elem);

    WebF.ui.Control.prototype.onRender.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.Canvas.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || (element.tagName !== 'CANVAS')) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.Canvas.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }


    WebF.ui.Control.prototype.dispose.call(this);
};