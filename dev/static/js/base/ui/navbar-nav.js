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
PW.ui.NavbarNav = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {PW.ui.NavLinkItem}
     */
    this._niContact = new PW.ui.NavLinkItem(domHelper, 'Contact');

    /**
     * @private
     * @type {PW.ui.NavLinkItem}
     */
    this._niGitHub = new PW.ui.NavLinkItem(domHelper, 'GitHub');
    this._niGitHub.setHref('https://github.com/alavrenchenko');
    this._niGitHub.setTarget(PW.ui.HyperlinkTarget.BLANK);

    this.addChild(this._niContact, false);
    this.addChild(this._niGitHub, false);

    /**
     * @private
     * @type {function(Event)}
     */
    this._contactClickHandler = null;
};

PW.ui.NavbarNav.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.NavbarNav.prototype.constructor = PW.ui.NavbarNav;

/**
 * @returns {PW.ui.NavLinkItem}
 */
PW.ui.NavbarNav.prototype.getContact = function () {
    return this._niContact;
};

/**
 * @protected
 * @override
 */
PW.ui.NavbarNav.prototype.onApply = function () {
    var dom = this.getDOMHelper();
    var elem = this.getElement();

    dom.removeChildNodes(elem);

    this._niContact.render(elem);
    WebF.dom.classList.add(this._niContact.getElement(), PW.ui.NavbarNavCSSClassName.CONTACT);

    this._niGitHub.render(elem);

    WebF.ui.Control.prototype.onApply.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.NavbarNav.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.NavbarNavCSSClassName.NAVBAR_NAV)) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.NavbarNav.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }


    WebF.ui.Control.prototype.dispose.call(this);
};