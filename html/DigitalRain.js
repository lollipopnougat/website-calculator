window.onload = function () {
  //获取画布对象
  const canvas = document.getElementById('canvas');
  //获取画布的上下文
  const context = canvas.getContext('2d');
  const s = window.screen;
  const W = (canvas.width = s.width);
  const H = canvas.height;
  //获取浏览器屏幕的宽度和高度
  //const W = window.innerWidth;
  //const H = window.innerHeight;
  //设置canvas的宽度和高度
  canvas.width = W;
  canvas.height = H;
  //每个文字的字体大小
  const fontSize = 12;
  //计算列
  const colunms = Math.floor(W / fontSize);
  //记录每列文字的y轴坐标
  const drops = [];
  //给每一个文字初始化一个起始点的位置
  for (let i = 0; i < colunms; i++) {
    drops.push(0);
  }
  //运动的文字
  const str = 'WELCOME TO LNP\'S WEBSITE';
  //4:fillText(str,x,y);原理就是去更改y的坐标位置
  //绘画的函数
  function draw() {
    context.fillStyle = 'rgba(238,238,238,.08)'; //遮盖层
    context.fillRect(0, 0, W, H);
    //给字体设置样式
    context.font = '600 ' + fontSize + 'px  Georgia';
    //给字体添加颜色
    context.fillStyle = [
      '#33B5E5',
      '#0099CC',
      '#AA66CC',
      '#9933CC',
      '#99CC00',
      '#669900',
      '#FFBB33',
      '#FF8800',
      '#FF4444',
      '#CC0000'
    ][parseInt(Math.random() * 10)]; //randColor();可以rgb,hsl, 标准色，十六进制颜色
    //写入画布中
    for (let i = 0; i < colunms; i++) {
      const index = Math.floor(Math.random() * str.length);
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      context.fillText(str[index], x, y);
      //如果要改变时间，肯定就是改变每次他的起点
      if (y >= canvas.height && Math.random() > 0.99) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  function randColor() {
    //随机颜色
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  draw();
  setInterval(draw, 35);
};
