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
            default: throw new Error("非法运算符");
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
            }
            else //处理符号
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
                }
                else if (this.IsHigherThanTop(this.OrExpression[i]))
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
