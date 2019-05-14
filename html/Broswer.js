var num = 0;

function copy(i) {
    let oInput = document.createElement("input");
    if (i == "") alert("参数不能为空!");
    else {
        oInput.value = i;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = "oInput";
        oInput.style.display = "none";
        console.log("复制成功");
    }
}

function getNetworkType() {
    var ua = navigator.userAgent;
    var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
    networkStr = networkStr.toLowerCase().replace('nettype/', '');
    var networkType;
    switch (networkStr) {
        case 'wifi':
            networkType = 'wifi';
            break;
        case '4g':
            networkType = '4g';
            break;
        case '3g':
            networkType = '3g';
            break;
        case '3gnet':
            networkType = '3g';
            break;
        case '2g':
            networkType = '2g';
            break;
        default:
            networkType = 'other';
    }
    return networkType;
}

function getexp() {
    num++;
    var str;
    var ua = navigator.userAgent;
    var isEdge = new RegExp("Edge");
    var isQQ = new RegExp("QQBrowser");
    var isMQQ = new RegExp("MQQBrowser/\\d*.\\d*");
    var isUC = new RegExp("UBrowser");
    var isFireFox = new RegExp("Firefox/\\d*.\\d*");
    var isIE = new RegExp("Trident/\\d*.\\d*");
    var isCriOS = /CriOS/;
    var isOpera = /OPR/;
    var includeChrome = /Chrome/;
    var ChromeVersion = new RegExp("Chrome/[\\d*.]* ");
    var CriVersion = new RegExp("CriOS/[\\d*.]* ");
    var SafariVersion = new RegExp("Safari/\\d*.\\d*");
    var EdgeVersion = new RegExp("Edge/\\d*.\\d*");
    var includeSafari = /Safari/;
    var isWin = /Windows NT \d+.\d*/i;
    var isAndroid = /Android \d.\d[^;]?\d?/i;
    var isApple = new RegExp("iP\\w+");
    var isMac = /Macintosh/i;
    var isQuark = new RegExp("Quark/\\d*.\\d*.\\d*.\\d*");
    if (isWin.test(ua)) {
        let st = isWin.exec(ua)[0];
        switch (st) {
            case "Windows NT 10.0":
                st = "Windows 10";
                break;
            case "Windows NT 6.1":
                st = "Windows 7";
                break;
            case "Windows NT 6.2":
                st = "Windows 8";
                break;
            case "Windows NT 6.3":
                st = "Windows 8.1";
                break;
            case "Windows NT 6.0":
                st = "Windows Vista";
                break;
            case "Windows NT 5.1":
                st = "Windows XP";
                break;
            case "Windows NT 5.2":
                st = "Windows Server 2003";
                break;
            default:
                st = "早期版本的 Windows ";
        }
        str = "您的系统看上去是 " + st + " ,<br/>";
    } else if (isMac.test(ua)) {
        let isMacOS = new RegExp("\\d*.\\d*.?\\d*");
        let iOSV = isiOS.exec(ua);
        str = "您的系统看上去是 macOS ,<br/>"
    } else if (isApple.test(ua)) {
        let sstt = isApple.exec(ua)[0];
        let isiOS = new RegExp("\\d*_\\d*_?\\d*");
        let iOSV;
        if (isiOS.test(ua)) iOSV = isiOS.exec(ua);
        else iOSV = "无法识别";
        str = "您的设备看上去是 " + sstt + " ,<br/>iOS版本: " + iOSV[0].replace(/_/g, ".") + " ,<br/>";
    } else if (isAndroid.test(ua)) {
        let st = isAndroid.exec(ua)[0];
        str = "您的系统看上去是 " + st + ",<br/>";
    } else str = "您的系统大概是 Linux 吧 ,<br/>";
    if (isEdge.test(ua)) {
        str += "浏览器是 Microsoft Edge ,<br/>Edge版本: ";
        let arr = EdgeVersion.exec(ua);
        str += arr[0].substr(4);
    } else if (isCriOS.test(ua)) {
        str += "浏览器是 Chrome 移动版（仅Apple）<br/>Chrome版本: ";
        let arr = CriVersion.exec(ua);
        str += arr[0].substr(6);
    } else if (isMQQ.test(ua)) {

        str += "浏览器是 QQ 浏览器移动版 ,<br/>版本为: ";
        let arr = isMQQ.exec(ua);
        str += arr[0].substr(11);
    } else if (isQuark.test(ua)) {
        str += "浏览器是 夸克 ,<br/>版本: ";
        let arr = isQuark.exec(ua);
        str += arr[0].substr(6);
    } else if (isQQ.test(ua)) str += "浏览器是 QQ 浏览器";
    else if (isUC.test(ua)) str += "浏览器是 UC 浏览器";
    else if (isFireFox.test(ua)) {
        str += "浏览器是 Mozilla FireFox ,<br/>版本是: ";
        let arr = isFireFox.exec(ua);
        str += arr[0].substr(8);
    } else if (isOpera.test(ua)) str += "浏览器是 Opera";
    else if (isIE.test(ua)) {
        str += "浏览器是 Microsoft IE 或使用了 IE 内核的浏览器 ,<br/>IE内核版本: ";
        let arr = isIE.exec(ua);
        str += arr[0].substr(8);

    } else if (includeSafari.test(ua) && !includeChrome.test(ua)) {
        str += "浏览器是 Apple Safari ,<br/>Safari版本: ";
        let arr = SafariVersion.exec(ua);
        str += arr[0].substr(7);
    } else if (includeSafari.test(ua) && includeChrome.test(ua)) {
        str += "浏览器可能是 Google Chrome/Chromium及衍生浏览器 ,<br/>Chrome版本: ";
        let arr = ChromeVersion.exec(ua);
        str += arr[0].substr(7);
    } else {
        str += "没见过这种浏览器，请发邮件反馈问题：( ";
        window.open("mailto:ab2defg145@126.com?subject=反馈&amp&body=我在使用该浏览器UA时网站不能识别： " + ua);
    }
    document.getElementById("show").innerHTML = str;
    if (num == 1) document.getElementById("show2").innerHTML = "Happy everyday！";
    if (num == 5) copy(ua);
    if (num == 6) document.getElementById("show2").innerHTML = "平台类型(EX): " + navigator.platform;
}