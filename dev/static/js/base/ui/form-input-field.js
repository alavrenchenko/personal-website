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
 * @extends {PW.ui.FormField}
 * @param {WebF.dom.DOMHelper} domHelper
 * @param {boolean} multiline
 */
PW.ui.FormInputField = function (domHelper, multiline) {
    PW.ui.FormField.call(this, domHelper, PW.ui.FormFieldType.INPUT);

    /**
     * @private
     * @type {boolean}
     */
    this._multiline = multiline;

    /**
     * @private
     * @type {HTMLElement} TextBoxElement: @type {HTMLInputElement|HTMLTextAreaElement}
     */
    this._textBoxElement = null;

    /**
     * @private
     * @type {boolean}
     */
    this._hasTextInputEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasTextChangeEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasTextBoxFocusEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasTextBoxBlurEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasTextBoxKeyDownEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasTextBoxKeyUpEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasValue = false;

    /**
     * @type {boolean}
     */
    this.isValidateWhenInputText = false;

    /**
     * @type {boolean}
     */
    this.isTrimWhitespaceCharsWhenValidate = false;


    var nativeEventTypeEnum = WebF.events.NativeEventType;

    var textBoxNETypes = [nativeEventTypeEnum.FOCUS, nativeEventTypeEnum.BLUR, nativeEventTypeEnum.INPUT, nativeEventTypeEnum.CHANGE];
    var labelNETypes = null;

    // version < 10
    if (WebF.userAgent.browser.isIE()) {
        textBoxNETypes.push(nativeEventTypeEnum.KEYDOWN);
        textBoxNETypes.push(nativeEventTypeEnum.KEYUP);

        // version < 11
        labelNETypes = [nativeEventTypeEnum.MOUSEDOWN];
    }

    var systemNativeEventTypes = this.getSystemNativeEventTypes();
    systemNativeEventTypes['_textBoxElement'] = textBoxNETypes;

    if (labelNETypes) {
        systemNativeEventTypes['_labelElement'] = labelNETypes;
    }
};

PW.ui.FormInputField.prototype = Object.create(PW.ui.FormField.prototype);
PW.ui.FormInputField.prototype.constructor = PW.ui.FormInputField;

/**
 * @protected
 * @override
 * @param {WebF.events.EDActionEvent} e
 */
PW.ui.FormInputField.prototype.onEventDispatcherAction = function (e) {
    var formInputFieldEventTypeEnum = PW.ui.FormInputFieldEventType;
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
        var hasEventHandler = false;
        var hasEventHandlerPropertyName = null;
        var nativeEventHandler = null;
        var sourceName;

        switch (eventType) {
            case formInputFieldEventTypeEnum.TEXT_INPUT: {
                hasEventHandler = this._hasTextInputEventHandler;
                hasEventHandlerPropertyName = '_hasTextInputEventHandler';
                nativeEventType = nativeEventTypeEnum.INPUT;
                nativeEventHandler = this.onTextBoxNativeInput.bind(this);
                sourceName = '_textBoxElement';

                break;
            }
            case formInputFieldEventTypeEnum.TEXT_CHANGE: {
                hasEventHandler = this._hasTextChangeEventHandler;
                hasEventHandlerPropertyName = '_hasTextChangeEventHandler';
                nativeEventType = nativeEventTypeEnum.CHANGE;
                nativeEventHandler = this.onTextBoxNativeChange.bind(this);
                sourceName = '_textBoxElement';

                break;
            }
            case formInputFieldEventTypeEnum.TEXT_BOX_FOCUS: {
                hasEventHandler = this._hasTextBoxFocusEventHandler;
                hasEventHandlerPropertyName = '_hasTextBoxFocusEventHandler';
                nativeEventType = nativeEventTypeEnum.FOCUS;
                nativeEventHandler = this.onTextBoxNativeFocus.bind(this);
                sourceName = '_textBoxElement';

                break;
            }
            case formInputFieldEventTypeEnum.TEXT_BOX_BLUR: {
                hasEventHandler = this._hasTextBoxBlurEventHandler;
                hasEventHandlerPropertyName = '_hasTextBoxBlurEventHandler';
                nativeEventType = nativeEventTypeEnum.BLUR;
                nativeEventHandler = this.onTextBoxNativeBlur.bind(this);
                sourceName = '_textBoxElement';

                break;
            }
            case formInputFieldEventTypeEnum.TEXT_BOX_KEY_DOWN: {
                hasEventHandler = this._hasTextBoxKeyDownEventHandler;
                hasEventHandlerPropertyName = '_hasTextBoxKeyDownEventHandler';
                nativeEventType = nativeEventTypeEnum.KEYDOWN;
                nativeEventHandler = this.onTextBoxNativeKeyDown.bind(this);
                sourceName = '_textBoxElement';

                break;
            }
            case formInputFieldEventTypeEnum.TEXT_BOX_KEY_UP: {
                hasEventHandler = this._hasTextBoxKeyUpEventHandler;
                hasEventHandlerPropertyName = '_hasTextBoxKeyUpEventHandler';
                nativeEventType = nativeEventTypeEnum.KEYUP;
                nativeEventHandler = this.onTextBoxNativeKeyUp.bind(this);
                sourceName = '_textBoxElement';

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
        var neTypes = this._systemNativeEventTypes[sourceName];

        if (!hasEventHandler) {
            if (count > 0) {
                result = this.addNativeEventHandler(source, sourceName, nativeEventType, nativeEventHandler);

                if (result || (neTypes && (neTypes.indexOf(nativeEventType) >= 0))) {
                    this[hasEventHandlerPropertyName] = true;
                }
            }
        }
        else {
            if (count < 1) {
                result = this.removeNativeEventHandler(source, sourceName, nativeEventType);

                if (result || (neTypes && (neTypes.indexOf(nativeEventType) >= 0))) {
                    this[hasEventHandlerPropertyName] = false;
                }
            }
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
PW.ui.FormInputField.prototype.registerNativeEventHandlers = function () {
    if (!this.getElement()) {
        return;
    }

    var nativeEventHandlersCache = this.getNativeEventHandlersCache();

    var sourceRootElementName = 'RootElement';
    var sourceTextBoxElementName = '_textBoxElement';

    var neHandlers = null;

    for (var sourceName in nativeEventHandlersCache) {
        if (sourceName === sourceRootElementName) {
            continue;
        }

        var source = null;

        if (sourceName === sourceTextBoxElementName) {
            source = this._textBoxElement;
        }

        neHandlers = nativeEventHandlersCache[sourceName];

        if (!source || !neHandlers) {
            continue;
        }

        for (var x = 0; x < neHandlers.length; x++) {
            neHandlers[x].source = source;
        }
    }

    var nativeEventTypeEnum = WebF.events.NativeEventType;

    var textBoxFocusEventType = nativeEventTypeEnum.FOCUS;
    var textBoxBlurEventType = nativeEventTypeEnum.BLUR;
    var textInputEventType = nativeEventTypeEnum.INPUT;
    var textChangeEventType = nativeEventTypeEnum.CHANGE;

    neHandlers = nativeEventHandlersCache[sourceTextBoxElementName];

    if (!neHandlers) {
        neHandlers = [];
        nativeEventHandlersCache[sourceTextBoxElementName] = neHandlers;
    }

    if (!WebF.array.containsByPropertyValue(neHandlers, 'eventType', textBoxFocusEventType)) {
        neHandlers.push(new WebF.events.EventHandler(this._textBoxElement, textBoxFocusEventType, this.onTextBoxNativeFocus.bind(this)));
    }

    if (!WebF.array.containsByPropertyValue(neHandlers, 'eventType', textBoxBlurEventType)) {
        neHandlers.push(new WebF.events.EventHandler(this._textBoxElement, textBoxBlurEventType, this.onTextBoxNativeBlur.bind(this)));
    }

    if (!WebF.array.containsByPropertyValue(neHandlers, 'eventType', textInputEventType)) {
        neHandlers.push(new WebF.events.EventHandler(this._textBoxElement, textInputEventType, this.onTextBoxNativeInput.bind(this)));
    }

    if (!WebF.array.containsByPropertyValue(neHandlers, 'eventType', textChangeEventType)) {
        neHandlers.push(new WebF.events.EventHandler(this._textBoxElement, textChangeEventType, this.onTextBoxNativeChange.bind(this)));
    }

    // version < 10
    if (WebF.userAgent.browser.isIE()) {
        var textBoxKeyDownEventType = nativeEventTypeEnum.KEYDOWN;
        var textBoxKeyUpEventType = nativeEventTypeEnum.KEYUP;

        if (!WebF.array.containsByPropertyValue(neHandlers, 'eventType', textBoxKeyDownEventType)) {
            neHandlers.push(new WebF.events.EventHandler(this._textBoxElement, textBoxKeyDownEventType, this.onTextBoxNativeKeyDown.bind(this)));
        }

        if (!WebF.array.containsByPropertyValue(neHandlers, 'eventType', textBoxKeyUpEventType)) {
            neHandlers.push(new WebF.events.EventHandler(this._textBoxElement, textBoxKeyUpEventType, this.onTextBoxNativeKeyUp.bind(this)));
        }

        // version < 11
        var labelMouseDownEventType = nativeEventTypeEnum.MOUSEDOWN;
        var sourceLabelElementName = '_labelElement';

        neHandlers = nativeEventHandlersCache[sourceLabelElementName];

        if (!neHandlers) {
            neHandlers = [];
            nativeEventHandlersCache[sourceLabelElementName] = neHandlers;
        }

        if (!WebF.array.containsByPropertyValue(neHandlers, 'eventType', labelMouseDownEventType)) {
            neHandlers.push(new WebF.events.EventHandler(this.getLabelElement(), labelMouseDownEventType, this.onLabelNativeMouseDown.bind(this)));
        }
    }

    WebF.ui.Control.prototype.registerNativeEventHandlers.call(this);
};

/**
 * @private
 */
PW.ui.FormInputField.prototype._updateHasValue = function () {
    var classList = WebF.dom.classList;
    var elem = this.getElement();

    if (this._textBoxElement.value.length > 0) {
        if (!this._hasValue) {
            this._hasValue = true;
            classList.add(elem, PW.ui.FormInputFieldCSSClassName.HAS_VALUE);
        }
    }
    else if (this._hasValue) {
        this._hasValue = false;
        classList.remove(elem, PW.ui.FormInputFieldCSSClassName.HAS_VALUE);
    }
};


/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxNativeInput = function (e) {
    this._updateHasValue();

    if (this.isValidateWhenInputText) {
        this.validate();
    }

    if (!this._hasTextInputEventHandler) {
        return;
    }

    var e2 = new WebF.events.WFNativeEvent(PW.ui.FormInputFieldEventType.TEXT_INPUT, this, e);

    this.onTextInput(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.FormInputField.prototype.onTextInput = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxNativeChange = function (e) {
    this._updateHasValue();

    if (!this._hasTextChangeEventHandler) {
        return;
    }

    var e2 = new WebF.events.WFNativeEvent(PW.ui.FormInputFieldEventType.TEXT_CHANGE, this, e);

    this.onTextChange(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.FormInputField.prototype.onTextChange = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxNativeFocus = function (e) {
    WebF.dom.classList.add(this.getElement(), PW.ui.FormFieldCSSClassName.FOCUSED);

    if (!this._hasTextBoxFocusEventHandler) {
        return;
    }

    var e2 = new WebF.events.WFNativeEvent(PW.ui.FormInputFieldEventType.TEXT_BOX_FOCUS, this, e);

    this.onTextBoxFocus(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxFocus = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxNativeBlur = function (e) {
    WebF.dom.classList.remove(this.getElement(), PW.ui.FormFieldCSSClassName.FOCUSED);

    if (!this._hasTextBoxBlurEventHandler) {
        return;
    }

    var e2 = new WebF.events.WFNativeEvent(PW.ui.FormInputFieldEventType.TEXT_BOX_BLUR, this, e);

    this.onTextBoxBlur(e2);
};

/**
 * @protected
 * @virtual
 * @param {KeyboardEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxNativeKeyDown = function (e) {
    var keyCode = e.keyCode;

    // keyCode: z || y
    if (e.ctrlKey && !e.shiftKey && ((keyCode === 90) || (keyCode === 89))) {
        this._updateHasValue();
    }

    if (!this._hasTextBoxKeyDownEventHandler) {
        return;
    }

    var e2 = new WebF.events.WFNativeEvent(PW.ui.FormInputFieldEventType.TEXT_BOX_KEY_DOWN, this, e);

    this.onTextBoxKeyDown(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxKeyDown = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {KeyboardEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxNativeKeyUp = function (e) {
    var keyCode = e.keyCode;

    // Backspace || Delete
    if (((keyCode === 8) || (keyCode === 46)) && (this._textBoxElement.value.length < 1) && this._hasValue) {
        this._hasValue = false;
        WebF.dom.classList.remove(this.getElement(), PW.ui.FormInputFieldCSSClassName.HAS_VALUE);
    }

    if (!this._hasTextBoxKeyUpEventHandler) {
        return;
    }

    var e2 = new WebF.events.WFNativeEvent(PW.ui.FormInputFieldEventType.TEXT_BOX_KEY_UP, this, e);

    this.onTextBoxKeyUp(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxKeyUp = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.FormInputField.prototype.onTextBoxBlur = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @returns {HTMLElement}
 */
PW.ui.FormInputField.prototype.getTextBoxElement = function () {
    return this._textBoxElement;
};

PW.ui.FormInputField.prototype.textBoxFocus = function () {
    if (!this._textBoxElement || !this.isEnabled()) {
        return;
    }

    this._textBoxElement.focus();
};

/**
 * @returns {boolean}
 */
PW.ui.FormInputField.prototype.IsMultiline = function () {
    return this._multiline;
};

/**
 * @returns {string}
 */
PW.ui.FormInputField.prototype.getValue = function () {
    return this._textBoxElement ? this._textBoxElement.value : '';
};

/**
 * @virtual
 * @param {string} value
 */
PW.ui.FormInputField.prototype.setValue = function (value) {
    if (!this._textBoxElement) {
        return;
    }

    this._textBoxElement.value = value;
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
PW.ui.FormInputField.prototype.onValueChanged = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @returns {boolean}
 */
PW.ui.FormInputField.prototype.hasValue = function () {
    return ((this._textBoxElement != null) && (this._textBoxElement.value.length > 0));
};

/**
 * @protected
 * @override
 */
PW.ui.FormInputField.prototype.onRender = function () {
    PW.ui.FormField.prototype.onRender.call(this);

    var dom = this.getDOMHelper();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;

    var elem = this.getElement();
    classList.add(elem, PW.ui.FormInputFieldCSSClassName.FORM_FIELD_TYPE_INPUT);

    var wrapperElem = this.getWrapperElement();

    var inputWrapperElem = doc.createElement('div');
    classList.add(inputWrapperElem, PW.ui.FormInputFieldCSSClassName.INPUT_WRAPPER);

    var textBoxElem;
    var className;

    if (this._multiline) {
        textBoxElem = doc.createElement('textarea');
        className = PW.ui.BaseCSSClassName.TEXT_AREA;
    }
    else {
        textBoxElem = doc.createElement('input');
        textBoxElem.type = 'text';
        className = PW.ui.BaseCSSClassName.INPUT;
    }

    classList.addAll(textBoxElem, [PW.ui.FormInputFieldCSSClassName.TEXT_BOX_ELEMENT, className]);

    inputWrapperElem.appendChild(textBoxElem);
    this._textBoxElement = textBoxElem;

    var labelElem = doc.createElement('div');
    classList.add(labelElem, PW.ui.FormFieldCSSClassName.LABEL);
    inputWrapperElem.appendChild(labelElem);

    wrapperElem.appendChild(inputWrapperElem);

    var underlineElem = doc.createElement('div');
    classList.add(underlineElem, PW.ui.FormFieldCSSClassName.UNDERLINE);

    var rippleElem = doc.createElement('span');
    classList.add(rippleElem, PW.ui.FormFieldCSSClassName.RIPPLE);
    underlineElem.appendChild(rippleElem);

    wrapperElem.appendChild(underlineElem);

    var subscriptWrapperElem = doc.createElement('div');
    classList.add(subscriptWrapperElem, PW.ui.FormFieldCSSClassName.SUBSCRIPT_WRAPPER);

    var errorElem = doc.createElement('div');
    classList.add(errorElem, PW.ui.FormFieldCSSClassName.ERROR);
    subscriptWrapperElem.appendChild(errorElem);

    wrapperElem.appendChild(subscriptWrapperElem);

    this.setLabelElement(labelElem);
    this.setErrorElement(errorElem);

    if (this.hasError()) {
        classList.add(elem, PW.ui.FormFieldCSSClassName.INVALID);
    }
};

/**
 * @protected
 * @virtual
 * @param {MouseEvent} e
 */
PW.ui.FormInputField.prototype.onLabelNativeMouseDown = function (e) {
    if (!this.getDOMHelper().isElementFocused(this._textBoxElement)) {
        this._textBoxElement.focus();
    }
};

/**
 * @override
 */
PW.ui.FormInputField.prototype.validate = function () {
    if (!this.validators) {
        return;
    }

    var value = this.isTrimWhitespaceCharsWhenValidate ? WebF.string.trim(this.getValue()) : this.getValue();

    for (var x = 0; x < this.validators.length; x++) {
        var result = this.validators[x].validate(value);

        if (!result.isValid()) {
            this.setError(result.error);
            return;
        }
    }

    this.setError(null);
};


/**
 * @override
 */
PW.ui.FormInputField.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    PW.ui.FormField.prototype.dispose.call(this);

    this._textBoxElement = null;
};