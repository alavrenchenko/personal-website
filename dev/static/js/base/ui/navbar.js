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
PW.ui.Navbar = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     */
    this._navbarBrand = new PW.ui.NavbarBrand(domHelper);
    this._navbarBrand.setText('Alexey Lavrenchenko');

    /**
     * @private
     */
    this._navbarNav = new PW.ui.NavbarNav(domHelper);

    this.addChild(this._navbarBrand, false);
    this.addChild(this._navbarNav, false);
};

PW.ui.Navbar.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.Navbar.prototype.constructor = PW.ui.Navbar;

/**
 * @returns {PW.ui.NavbarNav}
 */
PW.ui.Navbar.prototype.getNavbarNav = function () {
    return this._navbarNav;
};


/**
 * @protected
 * @override
 */
PW.ui.Navbar.prototype.onApply = function () {
    var dom = this.getDOMHelper();
    var elem = this.getElement();

    var navbarBrandElem = dom.getElementByClassName(elem, PW.ui.NavbarBrandCSSClassName.NAVBAR_BRAND, 0);
    var navbarNavElem = dom.getElementByClassName(elem, PW.ui.NavbarNavCSSClassName.NAVBAR_NAV, 0);

    this._navbarBrand.apply(navbarBrandElem);
    this._navbarNav.apply(navbarNavElem);

    WebF.ui.Control.prototype.onApply.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.Navbar.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.NavbarCSSClassName.NAVBAR)) {
        return false;
    }

    if (!dom.getElementByClassName(element, PW.ui.NavbarBrandCSSClassName.NAVBAR_BRAND, 0) ||
        !dom.getElementByClassName(element, PW.ui.NavbarNavCSSClassName.NAVBAR_NAV, 0)) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.Navbar.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }


    WebF.ui.Control.prototype.dispose.call(this);
};