var scores = 0;
var divy = new Array();
var sum = 0,
    lastx = 0,
    lasty = 0,
    l_rnum = 0,
    o_dnum = 0,
    sum = 0,
    clickedimg = "",
    left_x = 0,
    left_y = 0,
    up_x = 0,
    up_y = 0;
var img_lib = new Array("img/UDK.png", "img/RU.png", "img/HNS.png", "img/YMN.png", "img/893.png"); //图片库
var imgdata = new Array(); //存储姐贵对应的数字
var vis = new Array(); //标记数组
var _clickedimg = new Array(); //用来存点击的两张图片
function init() {
    //生成界面
    for (var i = 0; i < 7; i++) {
        imgdata[i] = new Array();
        for (var j = 0; j < 7; j++) {
            imgdata[i][j] = "";
        }
    }
    for (var i = 0; i < 7; i++) {
        vis[i] = new Array();
        for (var j = 0; j < 7; j++) {
            vis[i][j] = 0;
        }
    }
    var x = document.getElementById("box");
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            imgdata[i][j] = parseInt(Math.random() * 10) % 5; //随机数，imgdata数组存的是数字
            x.innerHTML += "<div onclick=exchange(this," + i + "," + j + ")><img src=" + img_lib[imgdata[i][j]] + "></div>";
        }
    }
    //由于开始就是随机生成整盘姐贵，必须全盘扫描是否有满足可以消除的姐贵，并消除
    scanallimgs();
}

function exchange(obj, x, y) {
    var n = 0,
        m = 0;
    if (sum == 0) { //sum用来计算第几次点击
        lastx = x; //把第一次点击的照片存起来，方便后面的画图，不然找不到上一次点击的图片是什么
        lasty = y;
    }
    _clickedimg[sum] = imgdata[x][y]; //把交换的图片存起来
    sum++;
    if (sum >= 2 && lastx == x && lasty == y) sum = 1; //处理连续点击一样的图片
    if (sum == 2) {
        if (imgdata[x][y] == imgdata[lastx][lasty]) {
            alert("还想不想玩了这个游戏！！");
        } else if (lastx == x || lasty == y) {
            if (Math.abs(lasty - y) == 1 || Math.abs(lastx - x) == 1) {
                imgdata[x][y] = _clickedimg[0]; //交换图片
                imgdata[lastx][lasty] = _clickedimg[1];
                divy = document.getElementsByTagName("div");
                obj.innerHTML = '<img src="' + img_lib[imgdata[x][y]] + '">';
                divy[lastx * 7 + lasty + 1].innerHTML = '<img src="' + img_lib[imgdata[lastx][lasty]] + '">';
                n = scan(x, y); //对两张图片分别扫描是否能够消除
                m = scan(lastx, lasty);
                if (n == 1 || m == 1) { //只要其中一个可以消除，就满足交换
                    sum = 0;
                    _clickedimg[0] = _clickedimg[1] = 0;
                    removeimg(); //消除图片
                    scores++;
                    $("#scr").text("分数: "+ scores);
                    //alert("消除成功！！！");
                    addimg(); //添加图片
                    scanallimgs(); //扫描随机添加上来的图片是否可以消除
                } else {
                    //两张图片都不满足交换，就还原位置
                    imgdata[x][y] = _clickedimg[1];
                    imgdata[lastx][lasty] = _clickedimg[0];
                    _clickedimg[0] = _clickedimg[1] = 0;
                    divy = document.getElementsByTagName("div");
                    obj.innerHTML = '<img src="' + img_lib[imgdata[x][y]] + '">';
                    divy[lastx * 7 + lasty + 1].innerHTML = '<img src="' + img_lib[imgdata[lastx][lasty]] + '">';
                    sum = 0;
                    alert("啊，不能削除，我忘了啊！");
                    l_rnum = 0;
                    o_dnum = 0;
                }

            } else {
                alert("这两位姐贵不相邻！！！！！！"); //在同行或者同列不相邻
                sum = 0;
            }
        } else {
            alert("这两位不相邻！！！！！！"); //不在同行也不在同列相邻
            sum = 0;
        }
    }
}

//扫描，以当前的点击的这个图片为中心，向左向右，向上向下
function scan(x, y) {
    clickedimg = img_lib[imgdata[x][y]];
    var scan_lr = 1,
        scan_ud = 1;
    left_x = x;
    left_y = y;
    up_x = x;
    up_y = y;
    //如果该姐贵的左边与它自己相同，并且对应的标记数组大于0，就不继续扫描（因为代表已经扫过了一这行）
    if (y != 0 && img_lib[imgdata[x][y - 1]] == clickedimg && vis[x][y - 1] > 0) {
        scan_lr = 0;
    }
    //如果该姐贵的上边与它自己相同，并且对应的标记数组大于0，就不继续扫描（因为代表已经扫过了一这列）
    if (x != 0 && img_lib[imgdata[x - 1][y]] == clickedimg && vis[x - 1][y] > 0) {
        scan_od = 0;
    }
    if (scan_lr == 1) {
        for (var a = 0;; a++) {
            if (y - a < 0 || img_lib[imgdata[x][y - a]] != clickedimg) {
                break;
            } else if (img_lib[imgdata[x][y - a]] == clickedimg) { //向左扫描
                vis[x][y - a]++;
                l_rnum++;
                if (a != 0) left_y--; //记下与当前姐贵相同的最左边的姐贵，横向重置标记数组的时候是用循环从最左边开始
            }
        }
        for (var a = 1;; a++) {
            if (y + a > 6 || img_lib[imgdata[x][y + a]] != clickedimg) break;
            else if (img_lib[imgdata[x][y + a]] == clickedimg) { //向右扫描
                vis[x][y + a]++;
                l_rnum++;
            }
        }

        //向左与向右的相同姐贵加起来不超过三个，即横向不能消除，
        if (l_rnum < 3) {
            for (var i = 0; i < l_rnum; i++) {
                vis[left_x][left_y + i] = vis[left_x][left_y + i] - 1;
            }
            l_rnum = 0;
        }
    }
    if (scan_ud == 1) {
        for (var b = 0;; b++) {
            if (x - b < 0 || img_lib[imgdata[x - b][y]] != clickedimg) {
                break;
            } else if (img_lib[imgdata[x - b][y]] == clickedimg) { //向上扫描
                vis[x - b][y]++;
                o_dnum++;
                if (b != 0) up_x--; //记下与当前姐贵相同的最上边的姐贵，纵向重置标记数组的时候是用循环从最上边开始
            }

        }
        for (var b = 1;; b++) {
            if (x + b > 6 || img_lib[imgdata[x + b][y]] != clickedimg) break;
            else if (img_lib[imgdata[x + b][y]] == clickedimg) { //向下扫描
                vis[x + b][y]++;
                o_dnum++;
            }
        }
        //向下与向上的相同姐贵加起来不超过三个，即纵向不能消除，就要把标记数组减一，而不是设置为0，因为不能保证横向不能消除，为了保存那个共享的姐贵。
        if (o_dnum < 3) {
            for (var j = 0; j < o_dnum; j++) {
                vis[up_x + j][up_y] = vis[up_x + j][up_y] - 1;
            }
            o_dnum = 0;
        }
    }
    if (l_rnum >= 3 || o_dnum >= 3) { //有一行或者有一列满足消除，即相同的姐贵大于等于3，返回1，表示可以交换
        l_rnum = 0;
        o_dnum = 0;
        return 1;
    } else {
        l_rnum = 0;
        o_dnum = 0;
        return 0;
    }
}

//添加图片
function addimg() {
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (imgdata[i][j] == 9) {
                imgdata[i][j] = parseInt(Math.random() * 10) % 5; //随机添加
                divy = document.getElementsByTagName("div");
                _divnum = i * 7 + 1 + j;
                divy[_divnum].innerHTML = '<img src="' + img_lib[imgdata[i][j]] + '">';
            }
        }
    }
}

//消除图片
function removeimg() {
    var flag = 0;
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (vis[i][j] > 0) { //对应数组标记大于0就消除，并且把标记的数组标记为0
                vis[i][j] = 0;
                imgdata[i][j] = 9;
                divy = document.getElementsByTagName("div");
                _divnum = i * 7 + 1 + j;
                divy[_divnum].innerHTML = '<img src="' + "" + '">'; //消除图片
                flag = 1;
            }
        }
    }
    return flag;
}

//全盘扫描姐贵，整盘标记完再扫描，不然有些先删除了，后面扫描就会出问题
function scanallimgs() {
    var c = 0,
        s = 1;
    while (s != 0) { //s!=0表示上一个整盘姐贵与当前的整盘姐贵一样，即没有姐贵可以消除,s由removeimg()返回
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                scan(i, j);
            }
        }
        s = removeimg();
        addimg();
    }
}