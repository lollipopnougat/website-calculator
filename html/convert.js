// -*- coding=utf-8 -*-
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
            if (x[i] == "0") x =replacePos(x, i, "1");
            else x = replacePos(x, i, "0");
        }
        return x;
    }
}


function main() {
    let num = Number(document.getElementById("kw").value);
    let numst = num.toString(2);
    if (num < 0) numst = replacePos(numst, 0, "1");
    else numst = "0" + numst;
    document.getElementById("show1").innerHTML = "原码: " + numst;
    document.getElementById("show2").innerHTML = "反码: " + GetOpposite(numst);
    document.getElementById("show3").innerHTML = "补码: " + GetComplement(numst);
}