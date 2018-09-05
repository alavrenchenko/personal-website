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
PW.ui.PageHeader = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     */
    this._navbar = new PW.ui.Navbar(domHelper);

    this.addChild(this._navbar, false);
};

PW.ui.PageHeader.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.PageHeader.prototype.constructor = PW.ui.PageHeader;

/**
 * @returns {PW.ui.Navbar}
 */
PW.ui.PageHeader.prototype.getNavbar = function () {
    return this._navbar;
};

/**
 * @protected
 * @override
 */
PW.ui.PageHeader.prototype.onApply = function () {
    var dom = this.getDOMHelper();
    var elem = this.getElement();

    var navbarElem = dom.getElementByClassName(elem, PW.ui.NavbarCSSClassName.NAVBAR, 0);

    this._navbar.apply(navbarElem);

    WebF.ui.Control.prototype.onApply.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.PageHeader.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.PageHeaderCSSClassName.PAGE_HEADER) ||
        !dom.getElementByClassName(element, PW.ui.NavbarCSSClassName.NAVBAR, 0)) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.PageHeader.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }


    WebF.ui.Control.prototype.dispose.call(this);
};