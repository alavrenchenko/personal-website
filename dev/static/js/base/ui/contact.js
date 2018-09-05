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
PW.ui.Contact = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);

    /**
     * @private
     * @type {HTMLElement}
     */
    this._contentElement = null;

    /**
     * @private
     */
    this._header = new PW.ui.ContactHeader(domHelper, 'Contact me');

    /**
     * @private
     */
    this._body = new PW.ui.ContactBody(domHelper);

    /**
     * @private
     */
    this._footer = new PW.ui.ContactFooter(domHelper);

    this.addChild(this._header, false);
    this.addChild(this._body, false);
    this.addChild(this._footer, false);

    /**
     * @private
     * @type {WebF.net.xhr.XhrClient}
     */
    this._xhrClient = null;

    /**
     * @type {WebF.net.xhr.WFXhr}
     */
    this._formDataRequest = null;

    /**
     * @private
     * @type {string}
     */
    this._contactRequestUrl = '/base';

    /**
     * @private
     * @type {number}
     */
    this._formDataRequestType = 1;

    /**
     * @type {PW.ui.ContactStatus}
     */
    this._status = PW.ui.ContactStatus.BEING_EDITED;

    /**
     * @type {PW.ui.ContactCSSClassName?} Value: PW.ui.ContactCSSClassName.STATUS_SENDING, PW.ui.ContactCSSClassName.STATUS_SUCCESSFUL, PW.ui.ContactCSSClassName.STATUS_ERROR or null.
     */
    this._statusClassName = null;

    /**
     * @private
     * @type {function(WebF.events.WFNativeEvent)>}
     */
    this._$fieldTextInputChangeHandler = null;
};

PW.ui.Contact.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.Contact.prototype.constructor = PW.ui.Contact;

/**
 * @returns {PW.ui.ContactHeader}
 */
PW.ui.Contact.prototype.getHeader = function () {
    return this._header;
};

/**
 * @returns {PW.ui.ContactBody}
 */
PW.ui.Contact.prototype.getBody = function () {
    return this._body;
};

/**
 * @protected
 * @override
 */
PW.ui.Contact.prototype.onRender = function () {
    var elem = this.getElement();

    if (elem) {
        return;
    }

    var dom = this.getDOMHelper();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;

    elem = doc.createElement('div');
    classList.addAll(elem, [PW.ui.ContactCSSClassName.CONTACT, PW.ui.ContactCSSClassName.CARD, PW.ui.BaseCSSClassName.BLOCK_CENTER]);
    this.setElement(elem);

    var contentElem = doc.createElement('div');
    classList.add(contentElem, PW.ui.ContactCSSClassName.CONTENT);
    elem.appendChild(contentElem);
    this._contentElement = contentElem;

    this._header.render(contentElem);
    this._body.render(contentElem);
    this._footer.render(contentElem);

    WebF.ui.Control.prototype.onRender.call(this);

    this._body.getNameField()

    this._footer.getSendBtn().addEventHandler(WebF.ui.ControlEventType.CLICK, this._onFooterSendBtnClick.bind(this));
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.Contact.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.ContactCSSClassName.CONTACT) ||
        !WebF.dom.classList.contains(element, PW.ui.ContactCSSClassName.CARD)) {
        return false;
    }

    return true;
};

/**
 * @private
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.Contact.prototype._onFooterSendBtnClick = function (e) {
    this._sendFormData();
};

/**
 * @private
 */
PW.ui.Contact.prototype._sendFormData = function () {
    if (this._formDataRequest) {
        return;
    }

    var nameField = this._body.getNameField();
    var emailField = this._body.getEmailField();
    var messageField = this._body.getMessageField();

    if (!nameField.isTrimWhitespaceCharsWhenValidate) {
        nameField.isTrimWhitespaceCharsWhenValidate = true;
        nameField.validate();
        nameField.isTrimWhitespaceCharsWhenValidate = false;
    }
    else {
        nameField.validate();
    }

    emailField.validate();
    messageField.validate();

    var field;

    if ((field = nameField).hasError() || (field = emailField).hasError() || (field = messageField).hasError()) {
        field.textBoxFocus();
        return;
    }

    this._footer.getSendBtn().setEnabled(false);

    var name = WebF.string.trim(nameField.getValue());
    var email = emailField.getValue();
    var msg = messageField.getValue();

    if (!this._xhrClient) {
        this._xhrClient = new WebF.net.xhr.XhrClient();
        this._xhrClient.timeout = 60000;
        this._xhrClient.requestCompleted.addHandler(this._onContactRequestCompleted.bind(this));
    }

    var data = {
        name: name,
        email: email,
        message: msg
    };

    var requestData = new PW.data.server.request.JsonRequestData(this._formDataRequestType, data);
    var content = new WebF.net.http.JsonContent(JSON.stringify(requestData));
    var requestMsg = new WebF.net.xhr.WFXhrMessage(WebF.net.http.HttpMethod.POST, this._contactRequestUrl, content);

    this._setStatus(PW.ui.ContactStatus.SENDING);

    this._formDataRequest = this._xhrClient.send(requestMsg);

    if (this._formDataRequest.requestState === WebF.net.WebRequestState.ERROR) {
        this._footer.getSendBtn().setEnabled(true);
        this._formDataRequest = null;
        this._setStatus(PW.ui.ContactStatus.ERROR, 'Error');
    }
};

/**
 * @private
 * @param {PW.ui.ContactStatus} status
 * @param {string} [errorMessage]
 */
PW.ui.Contact.prototype._setStatus = function (status, errorMessage) {
    var contactStatusEnum = PW.ui.ContactStatus;

    if ((this._status === status) || ((this._status === contactStatusEnum.SENDING) && (status === contactStatusEnum.BEING_EDITED))) {
        return;
    }

    this._status = status;

    var elem = this.getElement();

    if (!elem) {
        return;
    }

    var classList = WebF.dom.classList;
    var statusClassName = null;
    var statusText = null;

    if (this._statusClassName != null) {
        classList.remove(elem, this._statusClassName);
    }

    if (status === contactStatusEnum.BEING_EDITED) {
        statusClassName = null;
        statusText = null;

        this._unsubscribeFieldsTextInputChange();
    }
    else if (status === contactStatusEnum.SENDING) {
        statusClassName = PW.ui.ContactCSSClassName.STATUS_SENDING;
        statusText = 'Sending...';

        if (this._$fieldTextInputChangeHandler) {
            this._unsubscribeFieldsTextInputChange();
        }
    }
    else if (status === contactStatusEnum.SUCCESSFUL) {
        statusClassName = PW.ui.ContactCSSClassName.STATUS_SUCCESSFUL;
        statusText = 'Message sent';

        this._subscribeFieldsTextInputChange();
    }
    else {
        statusClassName = PW.ui.ContactCSSClassName.STATUS_ERROR;

        if (errorMessage != null) {
            statusText = errorMessage;
        }

        this._subscribeFieldsTextInputChange();
    }

    this._statusClassName = statusClassName;

    if (statusClassName) {
        classList.add(elem, statusClassName);
    }

    this._footer.setStatus(statusText);
};

/**
 * @private
 */
PW.ui.Contact.prototype._subscribeFieldsTextInputChange = function () {
    if (this._$fieldTextInputChangeHandler) {
        return;
    }

    this._$fieldTextInputChangeHandler = this._onFieldTextInputChange.bind(this);

    this._addFieldTextInputChangeHandler(this._body.getNameField(), this._$fieldTextInputChangeHandler);
    this._addFieldTextInputChangeHandler(this._body.getEmailField(), this._$fieldTextInputChangeHandler);
    this._addFieldTextInputChangeHandler(this._body.getMessageField(), this._$fieldTextInputChangeHandler);
};

/**
 * @private
 */
PW.ui.Contact.prototype._unsubscribeFieldsTextInputChange = function () {
    if (!this._$fieldTextInputChangeHandler) {
        return;
    }

    this._removeFieldTextInputChangeHandler(this._body.getNameField(), this._$fieldTextInputChangeHandler);
    this._removeFieldTextInputChangeHandler(this._body.getEmailField(), this._$fieldTextInputChangeHandler);
    this._removeFieldTextInputChangeHandler(this._body.getMessageField(), this._$fieldTextInputChangeHandler);

    this._$fieldTextInputChangeHandler = null;
};

/**
 * @private
 * @param {PW.ui.FormInputField} field
 * @param {Object<string, function(WebF.events.WFNativeEvent)>} fieldEventHandler
 */
PW.ui.Contact.prototype._addFieldTextInputChangeHandler = function (field, fieldEventHandler) {
    if (!field) {
        return;
    }

    field.addEventHandler(PW.ui.FormInputFieldEventType.TEXT_INPUT, fieldEventHandler);
    field.addEventHandler(PW.ui.FormInputFieldEventType.TEXT_CHANGE, fieldEventHandler);
};

/**
 * @private
 * @param {PW.ui.FormInputField} field
 * @param {Object<string, function(WebF.events.WFNativeEvent)>} fieldEventHandler
 */
PW.ui.Contact.prototype._removeFieldTextInputChangeHandler = function (field, fieldEventHandler) {
    if (!field) {
        return;
    }

    field.removeEventHandler(PW.ui.FormInputFieldEventType.TEXT_INPUT, fieldEventHandler);
    field.removeEventHandler(PW.ui.FormInputFieldEventType.TEXT_CHANGE, fieldEventHandler);
};

/**
 * @param {WebF.events.WFNativeEvent} e
 */
PW.ui.Contact.prototype._onFieldTextInputChange = function (e) {
    if (this._status !== PW.ui.ContactStatus.BEING_EDITED) {
        this._setStatus(PW.ui.ContactStatus.BEING_EDITED);
    }
};

/**
 * @private
 * @param {WebF.net.WebRequestEvent} e
 */
PW.ui.Contact.prototype._onContactRequestCompleted = function (e) {
    var request = e.request;
    var response = e.response;

    if ((e.requestState === WebF.net.WebRequestState.COMPLETED) &&
        (response.getStatusCode() === WebF.net.http.HttpStatusCode.OK)) {
        if (request === this._formDataRequest) {
            this._processFormDataResponse(response);
        }
    }
    else {
        /*
        var errorMsg = 'Error: Contact > ContactRequest: RequestState: ' + e.requestState;

        if (response) {
            errorMsg += '; StatusCode: ' + response.getStatusCode();
        }

        console.log(errorMsg);
        */
    }

    if (request === this._formDataRequest) {
        this._footer.getSendBtn().setEnabled(true);
        this._formDataRequest = null;
    }

    request.dispose();

    if (response) {
        response.dispose();
    }
};

/**
 * @private
 * @param {WebF.net.xhr.XhrResponse} response
 */
PW.ui.Contact.prototype._processFormDataResponse = function (response) {
    var data;

    try {
        data = JSON.parse(response.content.getText());
    }
    catch (e) {
        //console.log('Error: Contact > ProcessFormDataResponse: ' + e.toString());
        return;
    }

    if (data.status !== 1) {
        //console.log('Error: Contact > ProcessFormDataResponse: ErrorCode: ' + data.errorCode);

        var field = null;
        var fieldError = null;

        if (data['errorMessage'] != null) {
            fieldError = data.errorMessage;
            var errorCode = data.errorCode;

            if ((errorCode === 2) ||(errorCode === 1001) || (errorCode === 1004)) {
                field = this._body.getNameField();
            }
            else if ((errorCode === 3) ||(errorCode === 1002) || (errorCode === 1005)) {
                field = this._body.getEmailField();
            }
            else if ((errorCode === 4) || (errorCode === 1003) || (errorCode === 1006) || (errorCode === 1007)) {
                field = this._body.getMessageField();
            }
        }

        var errorMessage = null;

        if (field && !WebF.string.isNullOrWhitespace(fieldError)) {
            field.setError(fieldError);
            field.textBoxFocus();
        }
        else {
            errorMessage = 'Error';
        }

        this._setStatus(PW.ui.ContactStatus.ERROR, errorMessage);

        return;
    }

    this._setStatus(PW.ui.ContactStatus.SUCCESSFUL);
};

/**
 * @override
 */
PW.ui.Contact.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    this._$fieldTextInputChangeHandler = null;

    if (this._xhrClient) {
        this._xhrClient.dispose();
        this._xhrClient = null;

        this._formDataRequest = null;
    }

    WebF.ui.Control.prototype.dispose.call(this);

    this._contentElement = null;
};