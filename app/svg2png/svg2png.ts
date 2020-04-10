function svg2png(svg: HTMLElement, size: number, callback: { (imgURL?: string): void }) {
    let xlinkNS = "http://www.w3.org/1999/xlink";
    let total = 0, encoded = 0;
    
    let toDataURL = function (image: any) {

        let img = new Image();

        img.crossOrigin = 'anonymous';

        img.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            canvas.getContext('2d')!.drawImage(img, 0, 0);

            image.setAttributeNS(xlinkNS, 'href', canvas.toDataURL());

            if (++encoded === total) exportDoc(size);
        };

        img.onerror = function () {
            let oldSrc = this.src;
            this.onerror = function () {
                console.warn('failed to load an image at : ', this.src);
                if (--total === encoded && encoded > 0) exportDoc(size);
            };

            this.removeAttribute('crossorigin');

            this.src = '';
            this.src = oldSrc;
        };

        let href = image.getAttributeNS(xlinkNS, 'href');

        // img.src = href + (href.indexOf('?') > -1 ? +'&1' : '?1');  //more then 1

        img.src = href;
    };


    let parseFromUrl = function (url: string, element: any) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.status === 200) {
                let response = this.responseText || this.response;
                let dataUrl = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(response);
                element.setAttributeNS(xlinkNS, 'href', dataUrl);
                if (++encoded === total) exportDoc(size);
            }

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


    for (let i = 0; i < images.length; i++) {
        let href = images[i].getAttributeNS(xlinkNS, 'href')!;

        if (href.indexOf('data:image') < 0) {

            if (href.indexOf('.svg') > 0) {
                parseFromUrl(href, images[i]);
            } else
                toDataURL(images[i]);
        }

        else if (++encoded === total)
            exportDoc(size);
    }

    if (total === 0)
        exportDoc(size);

    function exportDoc(size: number) {
        let bBox = svg.getBoundingClientRect();
        let xSVG = <SVGSVGElement><any>svg;

        if (xSVG.width.baseVal.unitType !== 1)
            svg.setAttribute('width', "" + bBox.width);
        if (xSVG.height.baseVal.unitType !== 1)
            svg.setAttribute('height', "" + bBox.height);

        let svgData = (new XMLSerializer()).serializeToString(svg);
        let svgURL = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData);
        let svgImg = new Image();
        svgImg.onload = function () {
            let canvas = document.createElement('canvas')!!;
            // IE11 doesn't set a width on svg images...

            canvas.width = svgImg.width || bBox.width;
            canvas.height = svgImg.height || bBox.height;

            let oldWidth = canvas.width;
            let oldHeight = canvas.height;
            if (oldWidth > oldHeight) {
                canvas.width = size;
                let scale = size / oldWidth;
                canvas.height = oldHeight * scale;
            } else {
                canvas.height = size;
                let scale = size / oldHeight;
                canvas.width = oldWidth * scale;
            }

            canvas.getContext('2d')!.drawImage(svgImg, 0, 0, canvas.width, canvas.height);

            let baseCallback = function (imgURL?: string) {
                if (callback)
                    callback(imgURL)
            };
            baseCallback(canvas.toDataURL('image/png'));
        };
        svgImg.src = svgURL;
    }
}
