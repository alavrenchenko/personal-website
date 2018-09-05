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
 * Background.
 * 
 * @constructor
 * @extends {PW.ui.Canvas}
 * @param {WebF.dom.DOMHelper} domHelper
 */
PW.ui.Bgd = function (domHelper) {
    PW.ui.Canvas.call(this, domHelper);

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this._ctx = null;

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this._cacheCanvas = null;

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this._cacheCtx = null;

    /**
     * @private
     * @type {ImageData}
     */
    this._cacheImageData = null;

    /**
     * @private
     * @type {string}
     */
    this._imageRequestUrl = '/base';

    /**
     * @private
     * @type {number}
     */
    this._imageRequestType = 0;

    /**
     * @private
     * @type {Image}
     */
    this._image = null;

    /**
     * @private
     * @type {number}
     */
    this._imageWidth = 0;

    /**
     * @private
     * @type {number}
     */
    this._imageHeight = 0;

    /**
     * @private
     * @type {number}
     */
    this._updateTimeout = 32;

    /**
     * @private
     * @type {number}
     */
    this._updateTimer = -1;

    /**
     * @private
     * @type {boolean}
     */
    this._updateStarted = false;

    /**
     * @private
     * @const
     * @type {number}
     */
    this._STEP_DEFAULT = 1500;

    /**
     * @private
     * @type {number}
     */
    this._step = this._STEP_DEFAULT;

    /**
     * @private
     * @type {number}
     */
    this._maxWidth = 700;

    /**
     * @private
     * @type {number}
     */
    this._maxHeight = 700;
};

PW.ui.Bgd.prototype = Object.create(PW.ui.Canvas.prototype);
PW.ui.Bgd.prototype.constructor = PW.ui.Bgd;


/**
 * @protected
 * @override
 */
PW.ui.Bgd.prototype.onRender = function () {
    PW.ui.Canvas.prototype.onRender.call(this);

    var elem = this.getElement();
    WebF.dom.classList.addAll(elem, [PW.ui.BgdCSSClassName.BGD_CANVAS, PW.ui.BaseCSSClassName.BLOCK_CENTER]);

    this._ctx = elem.getContext('2d');

    this._cacheCanvas = this.getDOMHelper().getDocument().createElement('canvas');
    this._cacheCtx = this._cacheCanvas.getContext('2d');

    this.getDOMHelper().getWindow().setTimeout(this._loadImage.bind(this));
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.Bgd.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.PageHeaderCSSClassName.PAGE_HEADER)) {
        return false;
    }

    return true;
};

PW.ui.Bgd.prototype.startUpdate = function () {
    if (this._updateStarted) {
        return;
    }

    this._updateStarted = true;

    this._updateCanvas();
};

/**
 * @private
 */
PW.ui.Bgd.prototype._updateCanvas = function () {
    if (!this._updateStarted || !this.isEnabled() || !this.isVisible()) {
        this.cancelUpdate();
    }

    this._paint();

    this._updateTimer = this.getDOMHelper().getWindow().setTimeout(this._updateCanvas.bind(this), this._updateTimeout);
};

PW.ui.Bgd.prototype.cancelUpdate = function () {
    this._updateStarted = false;

    if (this._updateTimer != -1) {
        this.getDOMHelper().getWindow().clearTimeout(this._updateTimer);
        this._updateTimer = -1;
    }
};

PW.ui.Bgd.prototype._paint = function () {
    var elem = this.getElement();

    if (!elem) {
        return;
    }

    var canvasWidth = elem.width;
    var canvasHeight = elem.height;
    var time = Date.now();

    var imageData = this._ctx.createImageData(canvasWidth, canvasHeight);

    var data = imageData.data;
    var cacheData = this._cacheImageData.data;

    var counter = this._step * 2 - time % this._step;

    for (var x = 0; x < canvasHeight; x++) {
        if (x > this._imageHeight) {
            continue;
        }

        var counter2 = counter;

        for (var i = 0; i < canvasWidth; i++) {
            if (i > this._imageWidth) {
                continue;
            }

            var index = (x * canvasWidth + i) * 4;
            var avg = (cacheData[index] + cacheData[index + 1] + cacheData[index + 2]) / 3;
            counter2 += avg;

            if (counter2 <= this._step) {
                continue;
            }
            
            data[index] = 100;
            data[index + 1] = 100;
            data[index + 2] = 150;
            data[index + 3] = 255;

            counter2 -= this._step / 2;
        }
    }

    this._ctx.putImageData(imageData, 0, 0);
};

/**
 * @private
 */
PW.ui.Bgd.prototype._loadImage = function () {
    var xhrClient = new WebF.net.xhr.XhrClient();
    xhrClient.timeout = 60000;
    xhrClient.requestCompleted.addHandler(this._onImageRequestCompleted.bind(this));

    var requestData = new PW.data.server.request.JsonRequestData(this._imageRequestType, null);
    var content = new WebF.net.http.JsonContent(JSON.stringify(requestData));
    var requestMsg = new WebF.net.xhr.WFXhrMessage(WebF.net.http.HttpMethod.POST, this._imageRequestUrl, content);

    xhrClient.send(requestMsg);
};

/**
 * @private
 * @param {WebF.net.WebRequestEvent} e
 */
PW.ui.Bgd.prototype._onImageRequestCompleted = function (e) {
    var response = e.response;

    if ((e.requestState === WebF.net.WebRequestState.COMPLETED) &&
        (response.getStatusCode() === WebF.net.http.HttpStatusCode.OK)) {
        this._processImageResponse(response);
    }
    else {
        /*
        var errorMsg = 'Error: Bgd > ImageRequest: RequestState: ' + e.requestState;

        if (response) {
            errorMsg += '; StatusCode: ' + response.getStatusCode();
        }

        console.log(errorMsg);
        */
    }

    e.request.dispose();

    if (response) {
        response.dispose();
    }

    e.source.dispose();
};

/**
 * @private
 * @param {WebF.net.xhr.XhrResponse} response
 */
PW.ui.Bgd.prototype._processImageResponse = function (response) {
    var data;

    try {
        data = JSON.parse(response.content.getText());
    }
    catch (e) {
        //console.log('Error: Bgd > ProcessImageResponse: ' + e.toString());
        return;
    }

    if (data.status !== 1) {
        //console.log('Error: Bgd > ProcessImageResponse: ErrorCode: ' + data.errorCode);
        return;
    }

    var imgDataUrl = data.imageDataUrl;

    if (imgDataUrl == null) {
        //console.log('Error: Bgd > ProcessImageResponse: ImageDataUrl = null');
        return;
    }

    var img = new Image();

    img.onload = this._onImageLoad.bind(this);
    img.onerror = this._onImageError.bind(this);

    this._image = img;

    img.src = imgDataUrl;
};

/**
 * @private
 * @param {Event} e
 */
PW.ui.Bgd.prototype._onImageLoad = function (e) {
    var elem = this.getElement();

    if (!elem) {
        return;
    }

    this.resize();

    this.startUpdate();
};

/**
 * @private
 * @param {ErrorEvent} e
 */
PW.ui.Bgd.prototype._onImageError = function (e) {
    this._image = null;
};

PW.ui.Bgd.prototype.resize = function () {
    var elem = this.getElement();
    var parentElem;

    if (!elem || !(parentElem = elem.parentElement) || !this._image) {
        return;
    }

    var imgHWRatio = this._image.naturalHeight / this._image.naturalWidth;
    var w = Math.min(this._maxWidth, parentElem.clientWidth);
    var h = w * imgHWRatio;

    if (h > this._maxHeight) {
        var imgWHRatio = this._image.naturalWidth / this._image.naturalHeight;
        h = this._maxHeight;
        w = h * imgWHRatio;
    }

    if (w > this._image.naturalWidth) {
        w = this._image.naturalWidth;
        h = this._image.naturalHeight;
    }

    if (w < 250) {
        this._step = 1000;
    }
    else if (w < 300) {
        this._step = 1250;
    }
    else if (this._step !== this._STEP_DEFAULT) {
        this._step = this._STEP_DEFAULT;
    }

    this.setCanvasWidth(w);
    this.setCanvasHeight(h);

    this._cacheCanvas.width = w;
    this._cacheCanvas.height = h;

    this._scaleImage(w, h);

    if (this._updateStarted && this.isEnabled() && this.isVisible()) {
        this._paint();
    }
};

/**
 * @private
 * @param {number} width Canvas width.
 * @param {number} height Canvas height.
 */
PW.ui.Bgd.prototype._scaleImage = function (width, height) {
    var imgRatio = this._image.width / this._image.height;
    var w = height * imgRatio;
    var h = height;

    this._imageWidth = w;
    this._imageHeight = h;

    this._cacheCtx.drawImage(this._image, 0, 0, w, h);
    this._cacheImageData = this._cacheCtx.getImageData(0, 0, width, height);
};

/**
 * @override
 */
PW.ui.Bgd.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    if (this._updateStarted) {
        this.cancelUpdate();
    }

    this._ctx = null;
    this._cacheCanvas = null;
    this._cacheCtx = null;
    this._cacheImageData = null;

    PW.ui.Canvas.prototype.dispose.call(this);
};