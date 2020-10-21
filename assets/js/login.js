
//声明两个btn全局变量
var $btnLogin, $btnReg;
var flag = true;
$(function () {
    //登录的div
    $btnLogin = $(".login-box");
    //注册的div
    $btnReg = $(".reg-box");
    //去注册按钮
    //on绑定事件可以用事件使用事件委托的方式，并且同一元素可绑定多个相同事件
    $("#link_reg").on("click", function () {
        // 重置表单 
        $("#reset").trigger("click");
        $btnLogin.hide();
        $btnReg.show();
        flag = false;
    })
    //去登录按钮
    $("#link_login").on("click", function () {
        $btnLogin.show();
        $btnReg.hide();
        flag = true;
    })
    //---------------
    //表单验证 //submit提交之前触发该代码
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
    // -----------------------

    // var net = "http://ajax.frontend.itheima.net";
    //注册提交
    $("#fmReg").on("submit", function (e) {
        e.preventDefault();
        //获取数据
        let txtAll = $("#fmReg").serialize();
        //获取数据
        /*  let userName = $("#fm-reg [name=username]").val();
         let passWord = $("#fm-reg [name=password]").val(); */

        $.post("/api/reguser", txtAll, function (res) {
            //成功
            layui.layer.msg(res.message, {
                icon: res.status ? 5 : 1,
                time: 600 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
                if (res.status == 0) {
                    //获取注册的用户名
                    $("#loginName").val($("#userName").val());
                    $("#userPwd").val("");
                    $("#link_login").trigger("click");
                }
            });
        })
    })
    //登录按钮
    $("#loginfm").on("submit", function (e) {
        e.preventDefault();
        let loginV = $(this).serialize();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: loginV,
            success: function (res) {
                layer.msg(res.message, {
                    icon: res.status ? 2 : 1,
                    time: 600 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //==0成功
                    if (res.status == 0) {
                        localStorage.setItem("token", res.token);
                        location = "logined.html"
                    }
                })

            }
        })
    })

    //回车按钮
    $(document).on("keyup", function (e) {
        if (e.keyCode == 13) {
            if (flag) {
                /* $("#loginName,#userPwd").trigger('blur'); */
                $("#loginfm").trigger('submit');
            } else {
                $("#regBtn").trigger("click");
            }

        }
    })
})