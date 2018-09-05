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
 * @extends {WebF.app.Application}
 */
PW.app.PWApplication = function () {
    WebF.app.Application.call(this, window);

    /**
     * @private
     * @type {function(Event)}
     */
    this._$pageContentInitializedHandler = null;


    if (this.mainWindow.page.isContentInitialized()) {
        this._onPageContentInitialized2();
    }
    else {
        this._$pageContentInitializedHandler = this._onPageContentInitialized.bind(this);
        this.mainWindow.page.contentInitialized.addHandler(this._$pageContentInitializedHandler);
    }
};

PW.app.PWApplication.prototype = Object.create(WebF.app.Application.prototype);
PW.app.PWApplication.prototype.constructor = PW.app.PWApplication;

/**
 * @protected
 * @override
 */
PW.app.PWApplication.prototype.createPage = function () {
    if (this.mainWindow.page) {
        return;
    }

    this.mainWindow.page = new PW.app.view.PWPage(this.mainWindow, true);
};

/**
 * @private
 */
PW.app.PWApplication.prototype._onPageContentInitialized2 = function () {

};



/**************************************************************************************
 * <App EventHandlers>
 *************************************************************************************/
/**
 * @protected
 * @override
 * @param {WebF.events.WFEvent} e
 */
PW.app.PWApplication.prototype.onPageInitialized = function (e) {
    WebF.app.Application.prototype.onPageInitialized.call(this, e);
};

/**
 * @private
 * @param {WebF.events.WFEvent} e
 */
PW.app.PWApplication.prototype._onPageContentInitialized = function (e) {
    this.mainWindow.page.contentInitialized.removeHandler(this._$pageContentInitializedHandler);
    this._$pageContentInitializedHandler = null;

    this._onPageContentInitialized2();
};



/**************************************************************************************
 * </App EventHandlers>
 *************************************************************************************/


/**
 * @override
 */
PW.app.PWApplication.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }



    this._$pageContentInitializedHandler = null;

    WebF.app.Application.prototype.dispose.call(this);
};