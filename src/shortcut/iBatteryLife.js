let supportedLanguages = ["zh_tw", 'jp', 'en_us'];
let textLib = {
    '0': {
        "zh_tw": '電池剩餘壽命',
        'jp': '残りのバッテリー寿命',
        "en_us": 'Remaining'
    },
    '1': {
        "zh_tw": '電池減少壽命',
        'jp': 'バッテリー寿命の短縮',
        "en_us": 'Reduced'
    },
    '2': {
        "zh_tw": '充電次數',
        'jp': '充電時間',
        "en_us": 'Charge times'
    },
    '3': {
        "zh_tw": '語言選擇: ',
        'jp': '言語の選択: ',
        "en_us": 'Language select: '
    },
    '4': {
        "zh_tw": "顏色選擇: ",
        "jp": "色の選択: ",
        "en_us": "Color select: "
    },
    '5':{
        "zh_tw": "文字顏色選擇: ",
        "jp": "テキストの色の選択: ",
        "en_us": "Text color select: "
    }
};
// 設定 標題
$('#headerTitle').html('iBatteryLife');
// 創建語言選擇
let $main = $('main');
$main.append(
    '<div style="padding: 10px;position: relative;">' +
    '<label class="txtRsc" data-tid="3"></label><select id="lanSelect" aria-label="Language select"></select><br>' +
    '<label class="txtRsc" data-tid="4"></label><input type="color" id="remaining" value="#1B9E77"><input type="color" id="reduced" value="#D95F02"><br> ' +
    '<label class="txtRsc" data-tid="5"></label><input type="color" id="textColor" value="#000000"><br> ' +
    '<img id="chartPreview" src="#" alt="Battery life preview" style="width: 100%">' +
    '<div id="iBatteryLife"></div>' +
    '</div>'
);
let $selectLan = $('#lanSelect');
supportedLanguages.forEach(function (string) {
    let $opt = $('<option/>');
    $opt.val(string).text(string);
    $selectLan.append($opt);
});

// 設定 語系
$selectLan.on('change', function () {
    fillLan();
    createChart();
});

// 填充文字
let fillLan = function () {
    $('.txtRsc').each(function (index, ele) {
        let id = $(this).data('tid');
        $(this).html(textLib[id][$selectLan.val()]);
    });
};

fillLan();

// 初始化 Class
let iBatteryLife = new IBatteryLife();
let createChart = function () {
    iBatteryLife
        .setBatteryInfo(chargeT, designC, actualC)
        .setColors([$('#remaining').val(),$('#reduced').val()])
        .setTextColor($('#textColor').val())
        .setTextIntro(textLib[1][$selectLan.val()], textLib[0][$selectLan.val()], textLib[2][$selectLan.val()])
        .showChart('#iBatteryLife', function (url) {
            if (url)
                $('#chartPreview').attr('src', url);
        });
};
createChart();

$('input').on('change',function () {
    createChart()
});
