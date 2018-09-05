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
 * @param {string} title
 */
PW.ui.ContactHeader = function (domHelper, title) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {string}
     */
    this._title = (title != null) ? String(title) : null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._titleElement = null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this._closeElement = null;
};

PW.ui.ContactHeader.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.ContactHeader.prototype.constructor = PW.ui.ContactHeader;

/**
 * @protected
 * @override
 * @param {WebF.events.EDActionEvent} e
 */
PW.ui.ContactHeader.prototype.onEventDispatcherAction = function (e) {
    var contactHeaderEventTypeEnum = PW.ui.ContactHeaderEventType;
    var nativeEventTypeEnum = WebF.events.NativeEventType;

    /**
     * @type {Array<WebF.events.EventHandlers>}
     */
    var handlers = e.handlers;

    for (var x = 0; x < handlers.length; x++) {
        var eventHandlers = handlers[x];

        if (!eventHandlers) {
            continue;
        }

        var eventType = eventHandlers.eventType;
        var nativeEventType = null;
        var nativeEventHandler = null;
        var sourceName;

        switch (eventType) {
            case contactHeaderEventTypeEnum.CLOSE: {
                nativeEventType = nativeEventTypeEnum.CLICK;
                nativeEventHandler = this.onCloseNativeClick.bind(this);
                sourceName = '_closeElement';

                break;
            }
        }

        if (!nativeEventType) {
            continue;
        }

        var count = this.getEventHandlerCount(eventType);
        var neHandlers;
        var source = this[sourceName];
        var result = false;

        if (count > 0) {
            this.addNativeEventHandler(source, sourceName, nativeEventType, nativeEventHandler);
        }
        else {
            this.removeNativeEventHandler(source, sourceName, nativeEventType);
        }

        eventHandlers.handlers = null;
        handlers[x] = null;
    }

    WebF.ui.Control.prototype.onEventDispatcherAction.call(this, e);
};

/**
 * @protected
 * @override
 */
PW.ui.ContactHeader.prototype.registerNativeEventHandlers = function () {
    if (!this.getElement()) {
        return;
    }

    var nativeEventHandlersCache = this.getNativeEventHandlersCache();

    var sourceRootElementName = 'RootElement';
    var sourceCloseElementName = '_closeElement';

    var neHandlers = null;

    for (var sourceName in nativeEventHandlersCache) {
        if (sourceName === sourceRootElementName) {
            continue;
        }

        var source = null;

        if (sourceName === sourceCloseElementName) {
            source = this._closeElement;
        }

        neHandlers = nativeEventHandlersCache[sourceName];

        if (!source || !neHandlers) {
            continue;
        }

        for (var x = 0; x < neHandlers.length; x++) {
            neHandlers[x].source = source;
        }
    }

    WebF.ui.Control.prototype.registerNativeEventHandlers.call(this);
};



/**
 * @protected
 * @virtual
 * @param {MouseEvent} e
 */
PW.ui.ContactHeader.prototype.onCloseNativeClick = function (e) {
    var e2 = new WebF.events.WFEvent(PW.ui.ContactHeaderEventType.CLOSE, this);

    this.onClose(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
PW.ui.ContactHeader.prototype.onClose = function (e) {
    if (!this.isEnabled()) {
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};


/**
 * @virtual
 * @returns {string}
 */
PW.ui.ContactHeader.prototype.getTitle = function () {
    return this._title;
};

/**
 * @virtual
 * @param {string} value
 */
PW.ui.ContactHeader.prototype.setTitle = function (value) {
    var title = (value != null) ? String(value) : null;

    if (this._title == title) {
        return;
    }

    this._title = title;

    if (!this._titleElement) {
        return;
    }

    this._titleElement.innerText = (title != null) ? title : '';
};

/**
 * @protected
 * @override
 */
PW.ui.ContactHeader.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;

    elem = doc.createElement('div');
    classList.add(elem, PW.ui.ContactHeaderCSSClassName.CONTACT_HEADER);

    var titleElem = doc.createElement('span');
    classList.add(titleElem, PW.ui.ContactHeaderCSSClassName.TITLE);

    if (this._title != null) {
        titleElem.innerText = this._title;
    }

    elem.appendChild(titleElem);
    this._titleElement = titleElem;

    var closeElem = doc.createElement('span');
    classList.add(closeElem, PW.ui.ContactHeaderCSSClassName.CLOSE);

    var xmlns = 'http://www.w3.org/2000/svg';
    var closeSVGElem = doc.createElementNS(xmlns, 'svg');
    closeSVGElem.setAttribute('viewBox', '0 0 16 16');
    closeSVGElem.setAttribute('width', 16);
    closeSVGElem.setAttribute('height', 16);
    closeSVGElem.setAttribute('xmlns', xmlns);

    var line = doc.createElementNS(xmlns, 'line');
    line.setAttribute('x1', 1);
    line.setAttribute('y1', 1);
    line.setAttribute('x2', 15);
    line.setAttribute('y2', 15);
    closeSVGElem.appendChild(line);

    line = doc.createElementNS(xmlns, 'line');
    line.setAttribute('x1', 1);
    line.setAttribute('y1', 15);
    line.setAttribute('x2', 15);
    line.setAttribute('y2', 1);
    closeSVGElem.appendChild(line);

    closeElem.appendChild(closeSVGElem);
    elem.appendChild(closeElem);
    this._closeElement = closeElem;

    this.setElement(elem);

    WebF.ui.Control.prototype.onRender.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.ContactHeader.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.ContactHeaderCSSClassName.CONTACT_HEADER)) {
        return false;
    }

    return true;
};


/**
 * @override
 */
PW.ui.ContactHeader.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Control.prototype.dispose.call(this);

    this._titleElement = null;
    this._closeElement = null;
};