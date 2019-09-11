var Calculator = /** @class */ (function () {
    function Calculator(parameters) {
        this.IsSet = false;
        this.OpPLDictionary = {
            '(': 1,
            '+': 2,
            '-': 2,
            '*': 3,
            '/': 3,
            ')': 4
        };
        this.ops = new Array();
        this.nums = new Array();
        if (parameters) {
            this.OrExpression = parameters;
            this.IsSet = true;
        }
    }
    Calculator.prototype.SetNew = function (oe) {
        this.OrExpression = oe;
        this.IsSet = true;
        this.ops.length = 0;
        this.nums.length = 0;
        this.IsSet = true;
    };
    Calculator.prototype.IsHigherThanTop = function (op) {
        if (this.ops.length == 0)
            return true;
        else if (this.OpPLDictionary[op] > this.OpPLDictionary[this.ops[this.ops.length - 1]])
            return true;
        else
            return false;
    };
    Calculator.prototype.CalculateOne = function () {
        var tmpOp = this.ops.pop();
        var rhs = this.nums.pop();
        var lhs = this.nums.pop();
        var tmpRes;
        switch (tmpOp) {
            case '+':
                tmpRes = lhs + rhs;
                break;
            case '-':
                tmpRes = lhs - rhs;
                break;
            case '*':
                tmpRes = lhs * rhs;
                break;
            case '/':
                tmpRes = lhs / rhs;
                break;
            default:
                throw new Error("非法运算符");
        }
        this.nums.push(tmpRes);
    };
    Calculator.prototype.GetResult = function () {
        if (!this.IsSet)
            throw new Error("未初始化表达式");
        this.IsSet = false;
        var tmpNum = '';
        var tmp;
        var tmpDouble;
        for (var i = 0; i < this.OrExpression.length; i++) {
            if (this.OrExpression[i].match('^\\d\\.?\\d*$') !== null || this.OrExpression[i] == '.') // 字符是否是数字(能否安全转化为int型) 还有点的处理
            {
                tmpNum += this.OrExpression[i];
                if (i == this.OrExpression.length - 1) // 如果最后是数字结尾的处理
                {
                    //if (double.TryParse(tmpNum, out tmpDouble) == false) throw new Error("非法数字!");
                    tmpDouble = Number(tmpNum);
                    this.nums.push(tmpDouble);
                    tmpNum = '';
                }
            } else //处理符号
            {
                if (tmpNum != '') // 保存上一个数字
                {
                    //if (double.TryParse(tmpNum, out tmpDouble) == false) throw new Error("非法数字!");
                    tmpDouble = Number(tmpNum);
                    this.nums.push(tmpDouble);
                    tmpNum = "";
                }
                if (this.OrExpression[i] == '(')
                    this.ops.push('(');
                else if (this.OrExpression[i] == ')') {
                    while (this.ops[this.ops.length - 1] != '(')
                        this.CalculateOne();
                    this.ops.pop();
                } else if (this.IsHigherThanTop(this.OrExpression[i]))
                    this.ops.push(this.OrExpression[i]); // 其他运算符的处理
                else {
                    while (!this.IsHigherThanTop(this.OrExpression[i]))
                        this.CalculateOne();
                    this.ops.push(this.OrExpression[i]);
                }
            }
        }
        while (this.ops.length != 0)
            this.CalculateOne(); // 如果栈此时仍非空 继续计算
        return this.nums.pop();
    };
    return Calculator;
}());




var result = 0,
    str1 = "",
    str = "0";
var flag;
document.oncontextmenu = new Function("event.returnValue=false;"); //禁用右键菜单功能
document.onselectstart = new Function("event.returnValue=false;"); //禁止用户选中网页上的内容
//alert("欢迎使用计算器！");
console.log("简单计算器V1.3");
console.log("v1.2更新解决了结果超过10位被截掉的问题\n页面部分样式变动");
console.log("v1.3更新使用了less重写css\n解决结果显示区域跳动问题\n去掉了奇怪的提示\n页面布局变化");
console.log("v2.0更新 核心算法使用TypeScript重构,支持运算符优先级,支持括号");
/*
function click1() 
{
			alert("Welcome!")
}*/
//if (confirm("是否查看按钮说明？")) alert("说明：按钮E→退格\n按钮AC→清除");





function preRes() //等号
{
    try {
        let cal = new Calculator(str1);
        result = cal.GetResult();
        let tem = parseInt(result);
        if (result - tem !== 0) str = String(result.toFixed(14)); //！== === js特有，因为使用!=在WS里Warning
        else str = String(result);
        str = parseFloat(str).toString();
        console.log('结果: '+ str);
        //str = cal.GetResult().toString();

        document.getElementById("scr").innerHTML = str;
    } catch (error) {
        alert(error.toString() + "请检查语法");

    }

    /*Cal();
    let tem = parseInt(result);
    if (result - tem !== 0) str = String(result.toFixed(14)); //！== === js特有，因为使用!=在WS里Warning
    else str = String(result);
    if (str == "0.30000000000000") str = "0.3";
    //if(str.length-str.indexOf(".")>12) str=str.substr(0,str.indexOf(".")+10);
    document.getElementById("scr").innerHTML = str;
    console.log("result = " + result);*/
}

function Input(y) //输入
{
    str1 += y;
    document.getElementById("sho").innerHTML = str1;
}
//1~0以及.的输入
function pre1() {
    Input("1");
}

function pre2() {
    Input("2");
}

function pre3() {
    Input("3");
}

function pre4() {
    Input("4");
}

function pre5() {
    Input("5");
}

function pre6() {
    Input("6");
}

function pre7() {
    Input("7");
}

function pre8() {
    Input("8");
}

function pre9() {
    Input("9");
}

function pre0() {
    Input("0");
}

function preleft() {
    Input("(");
}

function preright() {
    Input(")");
}

function preP() {
    Input(".");
}

function preD() {
    if (str1 != "") {
        str1 = str1.substr(0, str1.length - 1);
        document.getElementById("sho").innerHTML = str1;
    } else alert("已经没有东西了！！");
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

function preAdd() {
    Input("+");
    //GetTmp();
    //flag = 1;
}

function preSub() {
    Input("-");
    //GetTmp();
    //flag = 2;
}

function preMul() {
    Input("*");
    //GetTmp();
    //lag = 3;
}

function preDiv() {
    Input("/");
    //GetTmp();
    //flag = 4;
}