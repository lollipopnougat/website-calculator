// -*- coding=utf-8 -*-
/* jshint esversion: 6 */
var num = 0;
var Fla = "= C928861732AB";

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

function copy(inp) {
    let i;
    switch(inp) {
        case 1: i = $("#show1").text();break;
        case 2: i = $("#show2").text();break;
        case 3: i = $("#show3").text();break;
        default: i = null;
    }
    let oInput = document.createElement("input");
    i = i.split(' ');
    if (i.length == 1) mdui.snackbar({ message: '不能复制空结果' });
    else {
        oInput.value = i[1];
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = "oInput";
        oInput.style.display="none";
        mdui.snackbar({
            message: '已复制'
        });
    } 
}
