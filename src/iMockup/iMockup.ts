enum Devices {
    IPhone = "iPhone",
    IPad = "iPad",
    IMac = "iMac",
    MacBook = "MacBook",
    AppleWatch = "Apple Watch"
}

enum Type {
    real = "Real",
    flat = "Flat"
}

class IMockup {
    private _flat_iPhones = [
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
    private _real_iPhones = [
        'iPhone 11 Pro Midnight Green',
        'iPhone X Silver',
        'iPhone 8 Gold',
        'iPhone 8 Plus Gold'
    ];
    private _flat_iPads = [
        'iPad Pro 2017 12.9" Silver',
        'iPad Pro 2017 12.9" Space Gray'
    ];
    private _real_iPads = [
        'iPad Pro 2018 11"',
        'iPad Pro 2018 12.9"'
    ];
    private _flat_iMacs = [
        'iMac 27"'
    ];
    private _real_iMacs = [];
    private _flat_MacBooks = [
        'MacBook Pro TouchBar 15" Silver',
        'MacBook Pro TouchBar 15" Space Gray'
    ];
    private _real_MacBooks = [
        'MacBook Pro 16" Silver'
    ];
    private _flat_AppleWatches = [
        'Apple Watch 38mm',
        'Apple Watch 40mm',
        'Apple Watch 42mm',
        'Apple Watch 44mm'
    ];
    private _real_AppleWatches = [
        'Apple Watch S3 42mm'
    ];

    private device = Devices.IPhone;
    private type = Type.flat;
    private model = this._flat_iPhones[0];

    getDevices(devices: Devices, imgType: Type): Array<string> {
        switch (devices) {
            case Devices.IPhone:
                switch (imgType) {
                    case Type.real:
                        return this._real_iPhones;
                    case Type.flat:
                        return this._flat_iPhones;
                    default:
                        throw "Can't find type"
                }
            case Devices.IPad:
                switch (imgType) {
                    case Type.real:
                        return this._real_iPads;
                    case Type.flat:
                        return this._flat_iPads;
                    default:
                        throw "Can't find type"
                }
            case Devices.IMac:
                switch (imgType) {
                    case Type.real:
                        return this._real_iMacs;
                    case Type.flat:
                        return this._flat_iMacs;
                    default:
                        throw "Can't find type"
                }
            case Devices.MacBook:
                switch (imgType) {
                    case Type.real:
                        return this._real_MacBooks;
                    case Type.flat:
                        return this._flat_MacBooks;
                    default:
                        throw "Can't find type"
                }
            case Devices.AppleWatch:
                switch (imgType) {
                    case Type.real:
                        return this._real_AppleWatches;
                    case Type.flat:
                        return this._flat_AppleWatches;
                    default:
                        throw "Can't find type"
                }
            default:
                throw "Can't find device"
        }
    }

    setDevice(device: Devices, imgType: Type, model: string) {
        this.device = device;
        this.type = imgType;
        this.model = model;
    }

    mockup(selector: string) {
        let devices = this.getDevices(this.device, this.type);
        console.log(devices);
    }
}
