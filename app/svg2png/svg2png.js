"use strict";
function svg2png(svg, size, callback) {
    let xlinkNS = "http://www.w3.org/1999/xlink";
    let total = 0, encoded = 0;
    // convert an external bitmap image to a dataURL
    let toDataURL = function (image) {
        let img = new Image();
        // CORS workaround, this won't work in IE<11
        // If you are sure you don't need it, remove the next line and the double onerror handler
        // First try with crossorigin set, it should fire an error if not needed
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            // we should now be able to draw it without tainting the canvas
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // draw the loaded image
            canvas.getContext('2d').drawImage(img, 0, 0);
            // set our <image>'s href attribute to the dataURL of our canvas
            image.setAttributeNS(xlinkNS, 'href', canvas.toDataURL());
            // that was the last one
            if (++encoded === total)
                exportDoc(size);
        };
        // No CORS set in the response
        img.onerror = function () {
            // save the src
            let oldSrc = this.src;
            // there is an other problem
            this.onerror = function () {
                console.warn('failed to load an image at : ', this.src);
                if (--total === encoded && encoded > 0)
                    exportDoc(size);
            };
            // remove the crossorigin attribute
            this.removeAttribute('crossorigin');
            // retry
            this.src = '';
            this.src = oldSrc;
        };
        // load our external image into our img
        let href = image.getAttributeNS(xlinkNS, 'href');
        // really weird bug that appeared since this answer was first posted
        // we need to force a no-cached request for the crossOrigin be applied
        // img.src = href + (href.indexOf('?') > -1 ? +'&1' : '?1');  //more then 1
        img.src = href;
    };
    // get an external svg doc to data String
    let parseFromUrl = function (url, element) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.status === 200) {
                let response = this.responseText || this.response;
                let dataUrl = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(response);
                element.setAttributeNS(xlinkNS, 'href', dataUrl);
                if (++encoded === total)
                    exportDoc(size);
            }
            // request failed with xhr, try as an <img>
            else {
                toDataURL(element);
            }
        };
        xhr.onerror = function () {
            toDataURL(element);
        };
        xhr.open('GET', url);
        xhr.send();
    };
    let images = svg.querySelectorAll('image');
    total = images.length;
    encoded = 0;
    // loop through all our <images> elements
    for (let i = 0; i < images.length; i++) {
        let href = images[i].getAttributeNS(xlinkNS, 'href');
        // check if the image is external
        if (href.indexOf('data:image') < 0) {
            // if it points to another svg element
            if (href.indexOf('.svg') > 0) {
                parseFromUrl(href, images[i]);
            }
            else // a pixel image
                toDataURL(images[i]);
        }
        // else increment our counter
        else if (++encoded === total)
            exportDoc(size);
    }
    // if there were no <image> element
    if (total === 0)
        exportDoc(size);
    function exportDoc(size) {
        let bBox = svg.getBoundingClientRect();
        let xSVG = svg;
        if (xSVG.width.baseVal.unitType !== 1)
            svg.setAttribute('width', "" + bBox.width);
        if (xSVG.height.baseVal.unitType !== 1)
            svg.setAttribute('height', "" + bBox.height);
        let svgData = (new XMLSerializer()).serializeToString(svg);
        let svgURL = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData);
        let svgImg = new Image();
        svgImg.onload = function () {
            let canvas = document.createElement('canvas');
            // IE11 doesn't set a width on svg images...
            canvas.width = svgImg.width || bBox.width;
            canvas.height = svgImg.height || bBox.height;
            let oldWidth = canvas.width;
            let oldHeight = canvas.height;
            if (oldWidth > oldHeight) {
                canvas.width = size;
                let scale = size / oldWidth;
                canvas.height = oldHeight * scale;
            }
            else {
                canvas.height = size;
                let scale = size / oldHeight;
                canvas.width = oldWidth * scale;
            }
            canvas.getContext('2d').drawImage(svgImg, 0, 0, canvas.width, canvas.height);
            let baseCallback = function (imgURL) {
                if (callback)
                    callback(imgURL);
            };
            baseCallback(canvas.toDataURL('image/png'));
        };
        svgImg.src = svgURL;
    }
}
//# sourceMappingURL=svg2png.js.map