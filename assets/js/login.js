
//声明两个btn全局变量
var $btnLogin, $btnReg;

$(function () {
    //登录的div
    $btnLogin = $(".login-box");
    //注册的div
    $btnReg = $(".reg-box");
    //去注册按钮
    //on绑定事件可以用事件使用事件委托的方式，并且同一元素可绑定多个相同事件
    $("#link_reg").on("click", function () {
        $btnLogin.hide();
        $btnReg.show();
    })
    //去登录按钮
    $("#link_login").on("click", function () {
        $btnLogin.show();
        $btnReg.hide();
    })
    //---------------
    //表单验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //验证两次密码框中的值是否一样

        repwd: function (value) {
            //形参value就是确认密码框中的值

            var rep = $(".reg-box [name=password]").val();//密码框value
            if (value !== rep) {
                return '两次密码不一致!'
            }
        }
    });
    var net = "http://ajax.frontend.itheima.net";
    //注册提交
    $("#regBtn").on("click", function () {
        //获取数据
        let txtAll = $("#fmReg").serialize();
        //获取数据
        let userName = $("#fm-reg [name=username]").val();
        let passWord = $("#fm-reg [name=password]").val();

        $.post(net + "/api/reguser", txtAll, function (res) {
            console.log(res);
            //成功
            if (res.status == 0) {
                layer.msg(res.message);
                $("#link_login").trigger("click");
                return;
            }
            layer.msg(res.message)

        })
    })
    //登录按钮
    $("#loginbtn").on("click", function () {
        let loginV = $("#loginfm").serialize();
        $.ajax({
            method: "POST",
            url: net + "/api/login",
            data: loginV,
            success: function (res) {
                console.log(res);
                layer.msg(res.message, {
                    icon: res.status ? 2 : 1,
                    time: 700 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //==0成功
                    if (res.status == 0) {
                        location = "login.html"
                    }
                });
            }
        })
    })
})