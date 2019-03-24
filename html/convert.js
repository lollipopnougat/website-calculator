// -*- coding=utf-8 -*-
/* jshint esversion: 6 */


function replacePos(strObj, pos, replacetext) {
    let str = strObj.substr(0, pos) + replacetext + strObj.substring(pos + 1, strObj.length);
    return str;
}


function GetComplement(x) {
    if (x[0] == "0") return x;
    else {
        let flag = false;
        let no = x.length - 1;
        for (let i = x.length - 1; i >= 0; i--) {
            if (x[i] == "1" && flag == false) flag = true;
            else if (flag == true && no != 0) {
                if (x[i] == "0") x = replacePos(x, i, "1");
                else x = replacePos(x, i, "0");
            }
            no--;
        }
        return x;
    }
}

function GetOpposite(x) {
    if (x[0] == "0") return x;
    else {
        for (let i = 1; i < x.length; i++) {
            if (x[i] == "0") x = replacePos(x, i, "1");
            else x = replacePos(x, i, "0");
        }
        return x;
    }
}


function main() {
    if ($("#kw").val() == "") {
        mdui.snackbar({
            message: '输入不能为空！'
        });
    } else {
        let num = Number($("#kw").val());
        let numst = num.toString(2);
        if (num < 0) numst = replacePos(numst, 0, "1");
        else numst = "0" + numst;
        $("#show1").text("原码: " + numst);
        $("#show2").text("反码: " + GetOpposite(numst));
        $("#show3").text("补码: " + GetComplement(numst));
        mdui.snackbar({
            message: '转换完毕'
        });
    }

}

var fla = "7799mtt";
