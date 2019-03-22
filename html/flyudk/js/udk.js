var udk = {
	flyTimer:null,//小鸟飞翔定时器
	wingTimer:null,//小鸟翅膀摆动定时器
	
	div:document.createElement("div"),
	showudk:function(parentObj) {
		this.div.style.width = "40px";
		this.div.style.height = "40px";
		this.div.style.backgroundImage = "url(img/udk0.png)";
		this.div.style.backgroundRepeat = "no-repeat";
		this.div.style.position = "absolute";
		this.div.style.left = "50px";
		this.div.style.top = "200px";
		this.div.style.zIndex = "1";
		
		parentObj.appendChild(this.div);  //将小鸟DIV插入游戏界面中
	},
	
	fallSpeed: 0, //小鸟下落速度
	flyudk: function(){ //控制小鸟飞翔下落的函数
		udk.flyTimer = setInterval(fly,40);
		function fly() {
			udk.div.style.top = udk.div.offsetTop + udk.fallSpeed++ + "px";
			if (udk.div.offsetTop < 0) {  
				udk.fallSpeed = 2; //这里用于控制小鸟不要飞出界面
			}
			if (udk.div.offsetTop >= 395) {
				udk.fallSpeed = 0;
				clearInterval(udk.flyTimer); //一旦飞到地面，清除定时器
				clearInterval(udk.wingTimer); //清除翅膀摆动定时器
			}
			if (udk.fallSpeed > 12) {
				udk.fallSpeed = 12;  //鸟的最大下落速度控制在12
			}
		}
	},
	
	wingWave: function() { //控制小鸟煽动翅膀的函数
		var up = ["url(img/up_udk0.png)", "url(img/up_udk1.png)"];
		var down = ["url(img/down_udk0.png)", "url(img/down_udk1.png)"];
		var i = 0, j = 0;
		udk.wingTimer = setInterval(wing,120);//逐帧动画，小鸟煽动翅膀
		function wing() {
			if (udk.fallSpeed > 0) {
				udk.div.style.backgroundImage = down[i++];
				if (i==2) {i = 0}
			}if (udk.fallSpeed < 0) {
				udk.div.style.backgroundImage = up[j++];
				if (j==2) {j = 0}
			}
		}
	},	
};
