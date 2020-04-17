/**
 * Language setting
 */
let supportedLanguage = ["zh", "en"];
let text_lib = {
    'normal-setting': {
        "zh": "一般設定: ",
        "en": "Normal settings: "
    },
    'lan-select': {
        "zh": "語言選擇: ",
        "en": "Language select: "
    },
    'iMark-setting': {
        "zh": "iMark 設定: ",
        "en": "iMark settings: "
    },
    'iMark-device': {
        "zh": "設備 : ",
        "en": "Device : "
    },
    'iMark-font': {
        "zh": "字形 : ",
        "en": "Font : "
    },
    'iMark-color': {
        "zh": "顏色 : ",
        "en": "Color : "
    },
    'iMark-markRight': {
        "zh": "圖標在右邊 : ",
        "en": "Mark right : "
    },
    'iMark-sloganScale': {
        "zh": "標語縮放 : ",
        "en": "Slogan scaling : "
    },
    'iMark-preview': {
        "zh": "圖標預覽 : ",
        "en": "Mark preview : "
    },
    'iMark-composite-picture': {
        "zh": "合成照片 : ",
        "en": "Composite picture : "
    },
    'mark-position': {
        "zh": "圖標位置 : ",
        "en": "Mark position : "
    },
    'mark-position-up': {
        "zh": "上",
        "en": "up"
    },
    'mark-position-down': {
        "zh": "下",
        "en": "down"
    },
    'mark-position-left': {
        "zh": "左",
        "en": "left"
    },
    'mark-position-right': {
        "zh": "右",
        "en": "right"
    },
    'mark-margin': {
        "zh": "圖標邊距 : ",
        "en": "Mark margin :"
    },
    'picture-rotate': {
        "zh": "照片旋轉 : ",
        "en": "Picture rotate :"
    },
    'picture-preview': {
        "zh": "合成預覽 : ",
        "en": "Picture preview : "
    },
    'picture-tip': {
        "zh": "~長按圖片可以下載合成好的圖片~",
        "en": "Long click to download image"
    },
};

let $selectLan = $('#lanSelect');
supportedLanguage.forEach(function (language) {
    let $opt = $('<option/>');
    $opt.val(language).text(language);
    $selectLan.append($opt);
});
$selectLan.on('change', function () {
    fillLan();
});
let fillLan = function () {
    $('.translate').each(function () {
        let id = $(this).data('tid');
        $(this).html(text_lib[id][$selectLan.val()]);
    })
};
fillLan();

/**
 * iMark setting
 */
let iMark = new IMark();
let devices = iMark.getDevices();
let fonts = iMark.getFonts();
let $deviceSelect = $('#iMarkDeviceSelect');
let $fontSelect = $('#iMarkFontSelect');
let $colorSelect = $('#iMarkColorSelect');
let markBase64URL;


devices.forEach(function (device) {
    let $opt = $('<option/>');
    $opt.val(device).text(device);
    $deviceSelect.append($opt);
});
fonts.forEach(function (font) {
    let $opt = $('<option/>');
    $opt.val(font).text(font);
    $fontSelect.append($opt);
});

let createMark = function () {
    iMark.setDevice("" + $deviceSelect.val())
        .setFont("" + $fontSelect.val())
        .setColor("" + $colorSelect.val())
        .setMarkRight($('#iMarkMarkRight').is(':checked'))
        .setSloganScaling($('#iMarkSloganScale').is(':checked'))
        .mark('#iMark', function (url) {
            if (url) {
                $('#iMarkPreview').attr('src', url);
                markBase64URL = url;
                compositePicture(imgBase64URL, markBase64URL, function (url) {
                    $('#picturePreview').attr('src', url);
                });
            }
        })
};

let compositePicture = function (imgURL, markURL, callback) {
    let LR = $('input[type=radio][name="LeftRight"]:checked').attr('value');
    let UD = $('input[type=radio][name="UpDown"]:checked').attr('value');
    let margin = parseInt($('#markMarginSelect').find("option:selected").attr('value'));
    let angle = parseInt($('#pictureRotateSelect').find("option:selected").attr('value'));

    let canvas = document.createElement('canvas');
    let img = new Image();
    img.src = imgURL;
    img.onload = function () {
        let imgW = img.width, imgH = img.height;
        if (angle === 0) {
            canvas.height = imgH;
            canvas.width = imgW;
        } else {
            canvas.height = imgW;
            canvas.width = imgH;
        }
        let mark = new Image();
        mark.src = markURL;
        mark.onload = function () {
            let mh = canvas.width / 12;
            let mw = mark.width * (mh / mark.height);

            let context = canvas.getContext('2d');

            context.save();
            context.rotate(angle * Math.PI / 180);
            if (angle > 0) {
                context.translate(0, -canvas.width);
                context.drawImage(img, 0, 0, canvas.height, canvas.width);
            } else if (angle < 0) {
                context.translate(-canvas.height, 0);
                context.drawImage(img, 0, 0, canvas.height, canvas.width);
            } else {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            context.restore();

            let pX = canvas.width - mw;
            let pY = canvas.height - mh;
            switch (LR) {
                case 'left':
                    switch (UD) {
                        case 'up':
                            context.drawImage(mark, margin, margin, mw, mh);
                            break;
                        case 'down':
                            context.drawImage(mark, margin, pY- margin, mw, mh);
                            break;
                    }
                    break;
                case 'right':
                    switch (UD) {
                        case 'up':
                            context.drawImage(mark, pX-margin, margin, mw, mh);
                            break;
                        case 'down':
                            context.drawImage(mark,pX- margin, pY- margin, mw, mh);
                            break;
                    }
                    break;
            }
            callback(canvas.toDataURL('image/png'));
        };
    };
};

/**
 * 產生圖片預覽 以及控制
 * */
createMark();

$('.iMarkSetting').on('change', function () {
    createMark()
});
$('.compositeSetting').on('change', function () {
    compositePicture(imgBase64URL, markBase64URL, function (url) {
        $('#picturePreview').attr('src', url);
    });
});
