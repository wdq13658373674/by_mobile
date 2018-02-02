/*日历*/
$(function(){
    //全局的年月日，适用于任何时候获取的年月日。
    var  sev_y, sev_m, sev_d;
    var yl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthArr=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十-月','十二月'];

    /*初始化*/
    inits();
    /*选择年月*/
    mui('.by-mydate').on('tap','.month',function(){
        var self=this;

        var optionsJson = self.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);

        self.picker=new mui.DtPicker(options);
        self.picker.show(function(rs){
            var yy=rs.y.text;
            var mm=rs.m.text;

            if (mm != sev_m || yy != sev_y) {
                jump(yy, mm, sev_d);
                console.log('年：'+yy+'月：'+mm+'日：'+sev_d)
            };
            /*释放组件*/
            self.picker.dispose();
            self.picker = null;
        });

    })

    /*初始化*/
    function inits() {
        var globledate = new Date();
        var y = globledate.getFullYear();
        var m = globledate.getMonth() + 1;
        var d = globledate.getDate();
        sev_m = m;
        sev_y = y;
        sev_d = d;
        var nowweak = new Date(y, m - 1, 1).getDay();
        if (nowweak == 7) nowweak = 0;
        get_first(nowweak, y, m, d);

        $("#ymym").html(sev_y + "." + formate(sev_m));
        $(".month #num").html(formate(sev_m));
        $('.mui-bar .bar-month').text(monthArr[sev_m-1]);
    };
    /*html初始化*/
    function get_first(a, b, c, d) {
        var str = '<tr>';
        if ((c - 2) < 0) {
            var ldays = 31;
            var lm = 12;
            var lb = b - 1;
        } else {
            var ldays = yl[c - 2];
            var lm = c - 1;
            var lb = b;
        }

        if (c == 12) {
            var xdays = 31;
            var xm = 1;
            var xb = b + 1;
        } else {
            var xdays = yl[c];
            var xm = c + 1;
            var xb = b;
        }

        if (ldays == 28) {
            if ((lb % 4 == 0 && lb % 100 != 0) || (lb % 100 == 0 && lb % 400 == 0)) {
                ldays = 29;
            }
        }

        if (xdays == 28) {
            if ((xb % 4 == 0 && xb % 100 != 0) || (xb % 100 == 0 && xb % 400 == 0)) {
                xdays = 29;
            }
        }
        var dd;
        if (yl[c - 1] == 28) {
            if ((b % 4 == 0 && b % 100 != 0) || (b % 100 == 0 && b % 400 == 0)) {
                dd = 29;
            } else {
                dd = 28;
            }
        } else {
            dd = yl[c - 1];
        }

        var num = 1;
        /*上月填补*/
        for (var i = a; i > 0; i--) {
            var bday = ldays - i + 1;

            str += ' <td data_y="' + lb + '" data_m="' + lm + '" data_d="' + bday + '" class="list not_this js_up">'+bday +'</td>';

            if (num % 7 == 0) {
                str += '</tr><tr>';
            }
            num++;
        }

        /*本月*/
        for (var i = 1; i <= dd; i++) {
            str += ' <td data_y="' + b + '" data_m="' + c + '" data_d="' + i + '" class="list">' + '<span style="position:relative;z-index:10;">'+i +'</span><span class="bg"></span>' + '</td>';

            if (num % 7 == 0) {
                str += '</tr><tr>';
            }
            num++;
        }

        /*下月填补*/
        var last =(a + dd) % 7;
        if(last!=0){
            for (var i = 1,len=7-last; i <= len; i++) {
                str += ' <td data_y="' + xb + '" data_m="' + xm + '" data_d="' + i + '" class="list not_this js_down">'+ i + '</td>';
                if (num % 7 == 0) {
                    str += '</tr><tr>';
                }
                num++;
            }
        }

        if(str.substring(str.length-4,str.length)=="<tr>"){
            str = str.substring(0,str.length-4);
        }

        $('#tables1').html(str);
        $('.tables td').eq(sev_d-1+a).addClass('today');//添加class="today"
        $('.tables td').eq(sev_d-1+a).parent().addClass('show');//添加class="today"
        var inx=$('.today').index();
        $('.week-list li').eq(inx).addClass('active').siblings().removeClass('active');
        bind_click();
    }
    /*年 月 日跳转*/
    function jump(yyyy, mm, dd) {
        sev_y = parseInt(yyyy);
        sev_m = parseInt(mm);
        sev_d = parseInt(dd);

        var globledate = new Date(yyyy, parseInt(mm) - 1, parseInt(dd));
        var y = globledate.getFullYear();
        var m = globledate.getMonth() + 1;
        var d = globledate.getDate();

        var nowweak = new Date(y, m - 1, 1).getDay();
        if (nowweak == 7) nowweak = 0;
        get_first(nowweak, y, m, d);

        $("#ymym").html(sev_y + "." + formate(sev_m));
        $(".month #num").html(formate(sev_m));
        $('.mui-bar .bar-month').text(monthArr[sev_m-1]);
    }
    /*绑定日期点击事件*/
    function bind_click() {
        mui('.tables').off().on('tap','td',function(){
            var self = $(this);

            sev_y = self.attr('data_y');//年
            sev_m = self.attr('data_m');//月
            sev_d = self.attr('data_d');//日

            if(self.hasClass('not_this')){
                jump(sev_y,sev_m,sev_d);
            }else {
                $('.tables .today').removeClass('today');
                $('.tables .show').removeClass('show');

                var inx=self.index();
                self.addClass("today");
                self.parent().addClass("show");
                $('#week1 li').eq(inx).addClass('active').siblings().removeClass('active');
            }

            console.log('年：'+sev_y+'月：'+sev_m+'日：'+sev_d);
        })
    }
    /*月份格式转化*/
    function formate(num){
        return num < 10 ? '0' + num : num;
    }
})