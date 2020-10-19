
$(function () {
    //layui来判断两次密码一致
    layui.form.verify({
        repwd: function (value) {
            //形参value就是确认密码框中的值
            var rep = $("#fmpwd").val();//密码框value
            if (value !== rep) {
                return '两次密码不一致!'
            }
        }
    })
    //点击
    $("#fmData").on("submit", function (e) {
        e.preventDefault();
        var strdt = $("#fmData").serialize();
        $.ajax({
            url: "/my/updatepwd",
            method: "post",
            data: strdt,
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg(res.message, {
                        icon: res.status ? 2 : 1,
                        time: 700 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
                else {
                    layui.layer.msg(res.message, {
                        icon: res.status ? 2 : 1,
                        time: 700 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        localStorage.removeItem('token');
                        window.parent.location.href = '/index.html';
                    });

                }
            }
        })
    });
})