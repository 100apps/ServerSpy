var headers=chrome.extension.getBackgroundPage().currentHeader;
function $(id){return document.getElementById(id);}
function html(id,html){$(id).innerHTML=html};

html("header",headers.header);

html("ip",headers.ip);
$("ip").href="http://ip.cn/index.php?ip="+headers.ip;

var width=headers.url.length>100?headers.url.length:100;

var qrcode = new QRCode("qrcode", {
    text: headers.url,
    width: width,
    height: width,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});