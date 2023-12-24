var num = 0;

/**
 * 拷贝文本到剪贴板
 * @param {string} val - 文本
 */
async function copy(val) {
  await navigator.clipboard.writeText(val);
  console.log('copy successfully');
}

/** 获取值 */
async function getexp() {
    num++;
    const os = (await getOS()) ?? getOSUA(navigator.userAgent);
    const bs = await getBrowserVer();
    if (os && os != '' && bs ) {
      document.querySelector('#show').innerText = `系统: ${os}, 浏览器: ${bs}`;

    }
    if (num == 3) {
        copy(navigator.userAgent);
    }
}

/**
 * 判断操作系统
 * @return {string} - 操作系统字符串
 */
async function getOS() {
  const ua = await navigator.userAgentData.getHighEntropyValues(['platformVersion']);
  if (navigator.userAgentData.platform === 'Windows') {
    const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
    if (majorPlatformVersion >= 13) {
      return 'Windows 11';
    } else if (majorPlatformVersion > 0) {
      return 'Windows 10';
    }
  } else {
    return `${ua.platform} ${ua.platformVersion}`;
  }
}


/**
 * 通过UA判断系统版本
 * @param {string} ua - 用户代理字符串(UserAgent)
 */
function getOSUA(ua) {
  const isWin = /Windows\sNT\s(\d+.\d*)/i;
  const isMac = /Macintosh/i;
  const isAndroid = /Android\s(\d\.?\d?[^;]?\d?)/i;
  const isApple = /iP\w+/i;
  const isLinux = /Linux/i;
  let res = isWin.exec(ua);
  if (res) {
    switch(res[1]) {
      case '10.0': return 'Windows 10';
      case '6.3': return 'Windows 8.1';
      case '6.2': return 'Windows 8';
      case '6.1': return 'Windows 7';
      case '6.0': return 'Windows Vista';
      case '5.2': return 'Windows Server 2003';
      case '5.1': return 'Windows XP';
      default:
        return `Windows NT ${res[1]}`;
    }
  }
  res = isMac.exec(ua);
}

/**
 * 判断浏览器
 * @returns - 浏览器字符串
 */
async function getBrowserVer() {
  const ua = await navigator.userAgentData.getHighEntropyValues(['platformVersion']);
  return `${ua.brands[0].brand} ${ua.brands[0].version}`;
}
