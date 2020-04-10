"use strict";
var MockDevices;
(function (MockDevices) {
    MockDevices["IPhone"] = "iPhone";
    MockDevices["IPad"] = "iPad";
    MockDevices["IMac"] = "iMac";
    MockDevices["MacBook"] = "MacBook";
    MockDevices["AppleWatch"] = "Apple Watch";
})(MockDevices || (MockDevices = {}));
var MockType;
(function (MockType) {
    MockType["flat"] = "Flat";
    MockType["real"] = "Real";
})(MockType || (MockType = {}));
class IMockup {
    constructor() {
        this._flat_iPhones = [
            'iPhone X & XS Gold',
            'iPhone X & XS Silver',
            'iPhone X & XS Space Gray',
            'iPhone Xs Max Gold',
            'iPhone Xs Max Silver',
            'iPhone Xs Max Space Gray',
            'iPhone XR Black',
            'iPhone XR Blue',
            'iPhone XR Coral',
            'iPhone XR Red',
            'iPhone XR White',
            'iPhone XR Yellow',
            'iPhone SE Rose Gold',
            'iPhone 7 & 8 Gold',
            'iPhone 7 & 8 Rose Gold',
            'iPhone 7 & 8 Silver',
            'iPhone 7 & 8 Black',
            'iPhone 7 & 8 Jet Black',
            'iPhone 7 & 8 Plus Gold',
            'iPhone 7 & 8 Plus Rose Gold',
            'iPhone 7 & 8 Plus Silver',
            'iPhone 7 & 8 Plus Black',
            'iPhone 7 & 8 Plus Jet Black',
            'iPhone 6 & 6s Gold',
            'iPhone 6 & 6s Rose Gold',
            'iPhone 6 & 6s Silver',
            'iPhone 6 & 6s Space Gray',
            'iPhone 6 & 6s Plus Gold',
            'iPhone 6 & 6s Plus Rose Gold',
            'iPhone 6 & 6s Plus Silver',
            'iPhone 6 & 6s Plus Space Gray'
        ];
        this._real_iPhones = [
            'iPhone 11 Pro Midnight Green',
            'iPhone X Silver',
            'iPhone 8 Gold',
            'iPhone 8 Plus Gold'
        ];
        this._flat_iPads = [
            'iPad Pro 2017 12.9" Silver',
            'iPad Pro 2017 12.9" Space Gray'
        ];
        this._real_iPads = [
            'iPad Pro 2018 11"',
            'iPad Pro 2018 12.9"'
        ];
        this._flat_iMacs = [
            'iMac 27"'
        ];
        this._real_iMacs = [];
        this._flat_MacBooks = [
            'MacBook Pro TouchBar 15" Silver',
            'MacBook Pro TouchBar 15" Space Gray'
        ];
        this._real_MacBooks = [
            'MacBook Pro 16" Silver'
        ];
        this._flat_AppleWatches = [
            'Apple Watch 38mm',
            'Apple Watch 40mm',
            'Apple Watch 42mm',
            'Apple Watch 44mm'
        ];
        this._real_AppleWatches = [
            'Apple Watch S3 42mm'
        ];
        this.device = MockDevices.IPhone;
        this.mockType = MockType.flat;
        this.model = this._flat_iPhones[0];
        this.screenColor = "black";
        this.svgModel_1 = function (body, svgURL, imgURL, screenColor, x, y, width, height) {
            d3.svg(svgURL)
                .then(function (xml) {
                var _a;
                (_a = body.node()) === null || _a === void 0 ? void 0 : _a.appendChild(xml.documentElement);
                // get svg wherein svg
                let xSVG = body.select('svg');
                xSVG.append('style').html('#screen{fill:' + screenColor + ';}');
                xSVG.attr('id', 'iMockupSVG');
                xSVG.style('width', '100%');
                xSVG.style('height', '100%');
                // set out side svg viewBox = inside svg viewBox
                body.attr('viewBox', xSVG.attr('viewBox'));
                let screenLayer = xSVG.select('#screenLayer');
                let screen = xSVG.select('#screen');
                let defs = screenLayer.append('defs');
                defs.append("clipPath")
                    .attr("id", "image-clip")
                    .append('path')
                    .attr('d', screen.attr('d'))
                    .attr('transform', screen.attr('transform'));
                screenLayer.append('image')
                    .attr('xlink:href', imgURL)
                    .attr('x', x)
                    .attr('y', y)
                    .attr('width', width)
                    .attr('height', height)
                    .attr("clip-path", "url(#image-clip)");
            });
        };
        this.svgModel_2 = function (body, svgURL, imgURL, screenColor) {
            d3.svg(svgURL)
                .then(function (xml) {
                var _a;
                (_a = body.node()) === null || _a === void 0 ? void 0 : _a.appendChild(xml.documentElement);
                // get svg wherein svg
                let xSVG = body.select('svg');
                xSVG.append('style').html('#screen{fill:' + screenColor + ';}');
                xSVG.attr('id', 'iMockupSVG');
                xSVG.style('width', '100%');
                xSVG.style('height', '100%');
                // set out side svg viewBox = inside svg viewBox
                body.attr('viewBox', xSVG.attr('viewBox'));
                let screenLayer = xSVG.select('#screenLayer');
                let screen = xSVG.select('#screen');
                let defs = screenLayer.append('defs');
                defs.append("clipPath")
                    .attr("id", "image-clip")
                    .append('rect')
                    .attr('width', screen.attr('width'))
                    .attr('height', screen.attr('height'))
                    .attr('x', screen.attr('x'))
                    .attr('y', screen.attr('y'));
                screenLayer.append('image')
                    .attr('xlink:href', imgURL)
                    .attr('x', screen.attr('x'))
                    .attr('y', screen.attr('y'))
                    .attr('width', parseInt(screen.attr('width')) - 2)
                    .attr('height', screen.attr('height'))
                    .attr("clip-path", "url(#image-clip)");
            });
        };
    }
    getModels(devices, mockType) {
        switch (devices) {
            case MockDevices.IPhone:
                switch (mockType) {
                    case MockType.real:
                        return this._real_iPhones;
                    case MockType.flat:
                        return this._flat_iPhones;
                    default:
                        throw "Can't find mock type";
                }
            case MockDevices.IPad:
                switch (mockType) {
                    case MockType.real:
                        return this._real_iPads;
                    case MockType.flat:
                        return this._flat_iPads;
                    default:
                        throw "Can't find mock type";
                }
            case MockDevices.IMac:
                switch (mockType) {
                    case MockType.real:
                        return this._real_iMacs;
                    case MockType.flat:
                        return this._flat_iMacs;
                    default:
                        throw "Can't find mock type";
                }
            case MockDevices.MacBook:
                switch (mockType) {
                    case MockType.real:
                        return this._real_MacBooks;
                    case MockType.flat:
                        return this._flat_MacBooks;
                    default:
                        throw "Can't find mock type";
                }
            case MockDevices.AppleWatch:
                switch (mockType) {
                    case MockType.real:
                        return this._real_AppleWatches;
                    case MockType.flat:
                        return this._flat_AppleWatches;
                    default:
                        throw "Can't find mock type";
                }
            default:
                throw "Can't find device";
        }
    }
    setDevice(device, mockType, model) {
        this.device = device;
        this.mockType = mockType;
        this.model = model;
        return this;
    }
    setScreenColor(hexColor) {
        this.screenColor = hexColor;
        return this;
    }
    mockup(selector, imgURL) {
        if (d3.select(selector).empty())
            throw "Can't find selector";
        let devices = this.getModels(this.device, this.mockType);
        let index = devices.indexOf(this.model);
        let body = d3.select(selector);
        body.selectAll('*').remove();
        if (index == -1)
            throw "Can't find model";
        if (!imgURL) {
            imgURL = 'src/img/apple.jpg';
        }
        let svgURL = "";
        switch (this.mockType) {
            case MockType.flat:
                switch (this.model) {
                    case 'iPhone X & XS Gold':
                        //app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone X-Xs Gold.svg
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone X-Xs Gold.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 41.1, 45, 1125, 2436);
                        break;
                    case 'iPhone X & XS Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone X-Xs Silver.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 41.1, 45, 1125, 2436);
                        break;
                    case 'iPhone X & XS Space Gray':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone X-Xs Space Gray.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 41.1, 45, 1125, 2436);
                        break;
                    case 'iPhone Xs Max Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone Xs Max Space Gray.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 42.1, 45.5, 1242, 2688);
                        break;
                    case 'iPhone Xs Max Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone Xs Max Space Gray.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 42.1, 45.5, 1242, 2688);
                        break;
                    case 'iPhone Xs Max Space Gray':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone Xs Max Space Gray.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 42.1, 45.5, 1242, 2688);
                        break;
                    case 'iPhone XR Black':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone XR Black.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 43, 42, 828, 1792);
                        break;
                    case 'iPhone XR Blue':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone XR Blue.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 43, 42, 828, 1792);
                        break;
                    case 'iPhone XR Coral':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone XR Coral.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 43, 42, 828, 1792);
                        break;
                    case 'iPhone XR Red':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone XR Red.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 43, 42, 828, 1792);
                        break;
                    case 'iPhone XR White':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone XR White.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 43, 42, 828, 1792);
                        break;
                    case 'iPhone XR Yellow':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone XR Yellow.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 43, 42, 828, 1792);
                        break;
                    case 'iPhone SE Rose Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone SE Rose Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Rose Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Rose Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Silver.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Black':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Black.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Jet Black':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Jet Black.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Plus Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Plus Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Plus Rose Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Plus Rose Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Plus Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Plus Silver.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Plus Black':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Plus Black.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 7 & 8 Plus Jet Black':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 7-8 Plus Jet Black.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Rose Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Rose Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Silver.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Space Gray':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Space Gray.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Plus Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Plus Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Plus Rose Gold':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Plus Rose Gold.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Plus Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Plus Silver.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 6 & 6s Plus Space Gray':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPhone/SVG/iPhone 6-6s Plus Space Gray.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'MacBook Pro TouchBar 15" Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/MacBook/SVG/MacBook Pro TouchBar 15 inches Silver.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'MacBook Pro TouchBar 15" Space Gray':
                        svgURL = 'app/iMockup/mockups/pommePlate/MacBook/SVG/MacBook Pro TouchBar 15 inches Space Gray.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iMac 27"':
                        svgURL = 'app/iMockup/mockups/pommePlate/iMac/SVG/iMac 27 inches.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'Apple Watch 38mm':
                        svgURL = 'app/iMockup/mockups/pommePlate/Apple Watch/SVG/Apple Watch 38mm.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'Apple Watch 40mm':
                        svgURL = 'app/iMockup/mockups/pommePlate/Apple Watch/SVG/Apple Watch 40mm.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 54, 54, 323, 393);
                        break;
                    case 'Apple Watch 42mm':
                        svgURL = 'app/iMockup/mockups/pommePlate/Apple Watch/SVG/Apple Watch 42mm.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'Apple Watch 44mm':
                        svgURL = 'app/iMockup/mockups/pommePlate/Apple Watch/SVG/Apple Watch 44mm.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 60, 60, 369, 447);
                        break;
                    case 'iPad Pro 2017 12.9" Silver':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPad/SVG/iPad Pro 12.9 Silver.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPad Pro 2017 12.9" Space Gray':
                        svgURL = 'app/iMockup/mockups/pommePlate/iPad/SVG/iPad Pro 12.9 Space Gray.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                }
                break;
            case MockType.real:
                switch (this.model) {
                    case 'iPhone 8 Gold':
                        svgURL = 'app/iMockup/mockups/real/iPhone/IPhone8.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone 8 Plus Gold':
                        svgURL = 'app/iMockup/mockups/real/iPhone/IPhone8Plus.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPhone X Silver':
                        svgURL = 'app/iMockup/mockups/real/iPhone/iPhoneX_fix.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 24, 23, 312, 677);
                        break;
                    case 'iPhone 11 Pro Midnight Green':
                        svgURL = 'app/iMockup/mockups/real/iPhone/IPhone_11_Pro_Midnight_Green_fix.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 24, 23, 312, 677);
                        break;
                    case 'Apple Watch S3 42mm':
                        svgURL = 'app/iMockup/mockups/real/Apple Watch/Apple Watch S3-42mm.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 182, 250, 235, 295);
                        break;
                    case 'MacBook Pro 16" Silver':
                        svgURL = 'app/iMockup/mockups/real/MacBook/MacBook Pro 16 Silver.svg';
                        this.svgModel_2(body, svgURL, imgURL, this.screenColor);
                        break;
                    case 'iPad Pro 2018 11"':
                        svgURL = 'app/iMockup/mockups/real/iPad/iPad Pro 2018 11 inches.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 70, 65, 626, 895);
                        break;
                    case 'iPad Pro 2018 12.9"':
                        svgURL = 'app/iMockup/mockups/real/iPad/iPad Pro 2018 12.9 inches.svg';
                        this.svgModel_1(body, svgURL, imgURL, this.screenColor, 65, 88, 636, 849);
                        break;
                }
                break;
            default:
                throw "Can't find mock type";
        }
    }
}
//# sourceMappingURL=iMockup.js.map