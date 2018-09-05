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
PW.ui.PageContent = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {Element}
     */
    this._containerElement = null;

    /**
     * @private
     */
    this._header = new PW.ui.PageHeader(domHelper);

    /**
     * @private
     */
    this._body = new PW.ui.PageBody(domHelper);

    /**
     * @private
     */
    this._footer = new PW.ui.PageFooter(domHelper);

    this.addChild(this._header, false);
    this.addChild(this._body, false);
    this.addChild(this._footer, false);
};

PW.ui.PageContent.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.PageContent.prototype.constructor = PW.ui.PageContent;


/**
 * @protected
 * @override
 */
PW.ui.PageContent.prototype.onApply = function () {
    var dom = this.getDOMHelper();
    var elem = this.getElement();

    var containerElem = this._containerElement = elem.querySelector('.' + PW.ui.PageContentCSSClassName.CONTAINER);

    var headerElem = dom.getElementByClassName(containerElem, PW.ui.PageHeaderCSSClassName.PAGE_HEADER, 0);
    var bodyElem = dom.getElementByClassName(containerElem, PW.ui.PageBodyCSSClassName.PAGE_BODY, 0);
    var footerElem = dom.getElementByClassName(containerElem, PW.ui.PageFooterCSSClassName.PAGE_FOOTER, 0);

    this._header.apply(headerElem);
    this._body.apply(bodyElem);
    this._footer.apply(footerElem);

    WebF.ui.Control.prototype.onApply.call(this);

    this._header.getNavbar().getNavbarNav().getContact().addEventHandler(WebF.ui.ControlEventType.CLICK, this._onHeaderNavBarNavContactClick.bind(this));
    this._body.getContact().getHeader().addEventHandler(PW.ui.ContactHeaderEventType.CLOSE, this._onBodyContactClose.bind(this));
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.PageContent.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.PageContentCSSClassName.PAGE_CONTENT)) {
        return false;
    }

    var containerElem = element.querySelector('.' + PW.ui.PageContentCSSClassName.CONTAINER);

    if (!containerElem ||
        !dom.getElementByClassName(containerElem, PW.ui.PageHeaderCSSClassName.PAGE_HEADER, 0) ||
        !dom.getElementByClassName(containerElem, PW.ui.PageBodyCSSClassName.PAGE_BODY, 0) ||
        !dom.getElementByClassName(containerElem, PW.ui.PageFooterCSSClassName.PAGE_FOOTER, 0)) {
        return false;
    }

    return true;
};

/**
 * @private
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.PageContent.prototype._onHeaderNavBarNavContactClick = function (e) {
    WebF.dom.classList.remove(this.getElement(), PW.ui.PageContentCSSClassName.CONTACT_COLLAPSED);

    this._body.getBgd().resize();
};

/**
 * @private
 * @param {WebF.events.WFEvent} e
 */
PW.ui.PageContent.prototype._onBodyContactClose = function (e) {
    WebF.dom.classList.add(this.getElement(), PW.ui.PageContentCSSClassName.CONTACT_COLLAPSED);

    this._body.getBgd().resize();
};

/**
 * @override
 */
PW.ui.PageContent.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Control.prototype.dispose.call(this);

    this._containerElement = null;
};