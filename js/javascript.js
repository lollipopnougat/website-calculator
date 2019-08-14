var result = 0, temp1 = 0, str1 = "", str ="0";
var flag;
document.oncontextmenu = new Function("event.returnValue=false;"); //禁用右键菜单功能
document.onselectstart = new Function("event.returnValue=false;"); //禁止用户选中网页上的内容
//alert("欢迎使用计算器！");
console.log("简单计算器V1.2");
console.log("更新解决了结果超过10位被截掉的问题\n页面部分样式变动");
/*
function click1() 
{
			alert("Welcome!")
}*/
if(confirm("是否查看按钮说明？")) alert("说明：按钮E→退格\n按钮AC→清除");
function err(x) //错误处理
{
	alert("错误！请输入第" + x + "个数！");
	let i = prompt("请输入第" + x + "个数"); //ES6语法
	return i;
}
function Cal() //计算
{
	if (temp1) 
	{
		result = temp1;
		//console.log("temp1 = "+temp1);
		temp1 = parseFloat(str1);
		//console.log("temp2 = "+temp1);
	}
	else 
	{
		temp1 = parseFloat(str1);
		result = temp1;
	}
	switch (flag)
	{
		case 1: result += temp1; flag = 0; break;
		case 2: result -= temp1; flag = 0; break;
		case 3: result *= temp1; flag = 0; break;
		case 4: result /= temp1; flag = 0; break;
	}
    // if (result == 0.30000000000000004) result = 0.3;
	temp1 = 0;
	str1 = ""; //归位很重要
	}

function GetTmp() 
{
	if(!str1) //处理上一个数不存在异常
	{
		str1 = String(err("一"));
		document.getElementById("sho").innerHTML = str1;
		temp1 = parseFloat(str1);
		str1 = "";
		alert("请继续操作");
	} 
	else 
	{
		if (temp1) //是否是连续计算
		{
			Cal();
			let tem = parseInt(result);
			if (result - tem != 0) str = String(result.toFixed(14));//处理结果为0.30000000000000004(js特色)的问题
			else str = String(result);
			if(str == "0.30000000000000") str = "0.3"; 
			//if(str.length-str.indexOf(".")>12) str=str.substr(0,str.indexOf(".")+10);
			document.getElementById("scr").innerHTML = str;
			//计算结果保留10位
			temp1 = result; //连续计算所需的部分
			//console.log(String(result)); Debug用
		}
		else 
		{
			temp1 = parseFloat(str1); //第一次计算
			//console.log(str1);
			str1 = "";
		}
	}
}

function preRes() //等号
{
	Cal();
	let tem = parseInt(result);
	if (result - tem !== 0) str = String(result.toFixed(14)); //！== === js特有，因为使用!=在WS里Warning
	else str=String(result);
	if(str == "0.30000000000000") str = "0.3";
	//if(str.length-str.indexOf(".")>12) str=str.substr(0,str.indexOf(".")+10);
	document.getElementById("scr").innerHTML = str;
	console.log("result = " + result);
}

function Input(y) //输入
{
	str1 += y;
	document.getElementById("sho").innerHTML = str1;
}
	//1~0以及.的输入
function pre1() 
{
	Input("1");
}
function pre2() 
{
	Input("2");
}
function pre3() 
{
	Input("3");
}
function pre4() 
{
	Input("4");
}
function pre5() 
{
	Input("5");
}
function pre6() 
{
	Input("6");
}
function pre7() 
{
	Input("7");
}
function pre8() 
{
	Input("8");
}
function pre9() 
{
	Input("9");
}
function pre0() 
{
	Input("0");
}
function preP() 
{
	Input(".");
}
function preD() 
{
	if (str1 != "")
	{
		str1 = str1.substr(0, str1.length - 1);
		document.getElementById("sho").innerHTML = str1;
	}
	else alert("已经没有东西了！！");
}
function preAC() //清除
{
	temp1 = 0;
	str1 = "";
	result = 0;
	str = 0;
	document.getElementById("scr").innerHTML = "结果";
	document.getElementById("sho").innerHTML = "当前值";
}

function preAdd() 
{
	GetTmp();
	flag = 1;
}
function preSub() 
{
	GetTmp();
	flag = 2;
}
function preMul() 
{
	GetTmp();
	lag = 3;	
}
function preDiv() 
{
	GetTmp();
	flag = 4;
}