/**
 * Normal setting
 * */
let appName = 'iMockup';

$('title').html(appName);
$('#headerTitle').html(appName);
// add style
$('head').append(
    '<style>' +
    'h3 { margin: 5px 0;}' +
    'h5 { margin: 0 10px;text-align: center;color: lightcoral;}' +
    '.labelGroup {margin: 5px;}</style>'
);
// add element to main
$('main').append('<h3 class="translate" data-tid="normal-setting"></h3>\n' +
    '    <div class="labelGroup">\n' +
    '        <label class="translate" data-tid="lan-select"></label><select id="lanSelect"\n' +
    '                                                                       aria-label="Language select"></select>\n' +
    '    </div>\n' +
    '    <h3 class="translate" data-tid="iMockup-setting"></h3>\n' +
    '    <div class="labelGroup">\n' +
    '        <label class="translate" data-tid="iMockup-device"></label><select id="iMockupDeviceSelect" class="updateModel"\n' +
    '                                                                           aria-label="iMockup device select"></select>\n' +
    '    </div>\n' +
    '    <div class="labelGroup">\n' +
    '        <label class="translate" data-tid="iMockup-style"></label><select id="iMockupStyleSelect" class="updateModel"\n' +
    '                                                                          aria-label="iMockup style select"></select>\n' +
    '    </div>\n' +
    '    <div class="labelGroup">\n' +
    '        <label class="translate" data-tid="iMockup-model"></label><select id="iMockupModelSelect" class="mockup"\n' +
    '                                                                          aria-label="iMockup model select"></select>\n' +
    '    </div>\n' +
    '    <div class="labelGroup">\n' +
    '        <label class="translate" data-tid="iMockup-screen-color"></label><input type="color" class="mockup"\n' +
    '                                                                                aria-label="iMockup screen color select"\n' +
    '                                                                                id="iMockupScreenColor">\n' +
    '    </div>\n' +
    '    <h5 class="translate tip" data-tid="iMockup-screen-color-tip"></h5>\n' +
    '    <div class="labelGroup">\n' +
    '        <label class="translate" data-tid="iMockup-download-size"></label>\n' +
    '        <select id="iMockupDownloadSize" aria-label="iMockup download size">\n' +
    '            <option value="4096" selected>4096</option>\n' +
    '            <option value="2048" selected>2048</option>\n' +
    '            <option value="1024">1024</option>\n' +
    '            <option value="512">512</option>\n' +
    '        </select>\n' +
    '    </div>\n' +
    '    <div class="labelGroup">\n' +
    '        <label class="translate" data-tid="iMockup-preview"></label>\n' +
    '        <div id="iMockupParent" style="display: flex;justify-content: center;">\n' +
    '            <div id="iMockup" style="width: 80%; height: 400px"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="labelGroup">\n' +
    '        <button id="downloadImage" class="translate" data-tid="download-image"\n' +
    '                style="width: calc(100% - 30px); border-radius: 5px; outline: none; margin: 15px"></button>\n' +
    '    </div>');
/**
 * language setting
 * */
let supportedLanguages = ['zh', 'en'];
let textLib = {
    'normal-setting': {
        "zh": "一般設定: ",
        "en": "Normal settings: "
    },
    'lan-select': {
        "zh": "語言選擇: ",
        "en": "Language select: "
    },
    'iMockup-setting': {
        "zh": "iMockup 設定: ",
        "en": "iMockup settings: "
    },
    'iMockup-device': {
        "zh": "設備選擇: ",
        "en": "Ｄevice select: "
    },
    'iMockup-style': {
        "zh": "樣式選擇: ",
        "en": "Style select: "
    },
    'iMockup-model': {
        "zh": "型號選擇: ",
        "en": "Ｍodel select: "
    },
    'iMockup-screen-color': {
        "zh": "螢幕顏色: ",
        "en": "Screen color select: "
    },
    'iMockup-screen-color-tip':{
        "zh":'照片可能無法完全貼合螢幕，設定不符合邊框的顏色將更明顯！',
        'en':'Picture may not match screen.<br> If screen color not match border will be more obvious.'
    },
    'iMockup-download-size': {
        "zh": "最大邊長尺寸: ",
        "en": "Ｍaximum side length: "
    },
    'iMockup-preview': {
        "zh": "iMockup 預覽: ",
        "en": "iMockup preview: "
    },
    'download-image': {
        "zh": "下載圖片",
        "en": "Download image"
    },
};
let $selectLan = $('#lanSelect');
supportedLanguages.forEach(function (language) {
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
        $(this).html(textLib[id][$selectLan.val()]);
    })
};
fillLan();
/**
 * iMockup setting
 * */
let iMockup = new IMockup();
let $deviceSelect = $('#iMockupDeviceSelect');
let $styleSelect = $('#iMockupStyleSelect');
let $modelSelect = $('#iMockupModelSelect');

// get supported device put in select
for (let device in MockDevices) {
    let strDevice = '' + device;
    let $opt = $('<option/>');
    $opt.val(strDevice).text(MockDevices[strDevice]);
    $deviceSelect.append($opt);
}
// get style put in select
for (let style in MockType) {
    let strStyle = '' + style;
    let $opt = $('<option/>');
    $opt.val(strStyle).text(MockType[strStyle]);
    $styleSelect.append($opt);
}

function setModel() {
    let models = iMockup.getModels(
        MockDevices[$deviceSelect.val()],
        MockType[$styleSelect.val()]
    );
    $modelSelect.html('');
    models.forEach(function (model) {
        let $opt = $('<option/>');
        $opt.val(model).text(model);
        $modelSelect.append($opt);
    });
    mockup()
}
function mockup() {
    iMockup.setScreenColor('' + $('#iMockupScreenColor').val())
        .setDevice(
            MockDevices[$deviceSelect.val()],
            MockType[$styleSelect.val()],
            "" + $modelSelect.val()
        )
        .mockup(
            '#iMockup',
            imgBase64URL
        );
}
setModel();

$('.updateModel').on('change',function () {
    setModel();
});
$('.mockup').on('change',function () {
    mockup();
});
$('#downloadImage').on('click',function () {
    svg2png(
        document.getElementById('iMockupSVG'),
        $('#iMockupDownloadSize').val(),
        function (url) {
            let link = document.createElement('a');
            link.href = url;
            link.download = 'iMockup.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
});