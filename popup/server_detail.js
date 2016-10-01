var headers=chrome.extension.getBackgroundPage().currentHeader;
function $(id){return document.getElementById(id);}
function html(id,html){$(id).innerHTML=html};

html("header",headers.header);
$("qrcode").src="http://qr.liantu.com/api.php?text="+encodeURIComponent(headers.url);
if($("qrcode").src.length>100){
	$("qrcode").width=$("qrcode").height=$("qrcode").src.length;
}else{
	$("qrcode").width=$("qrcode").height=100;
}
html("ip",headers.ip);
$("ip").href="http://ip.cn/index.php?ip="+headers.ip;
