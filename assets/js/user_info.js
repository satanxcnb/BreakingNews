$(function () {
    var form = layui.form;
    form.verify({
        nikname: function (value) {
            if (value.length > 6) {
                return '必须1-6个字符之间'
            }
        }
    })
    //重置
    /* $("#btnReset").on("click", function (e) {
        e.preventDefault();
        getUserInfo();
    }) */
    //form表单提交
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        var str = $(this).serialize();
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data: str,
            success: function (res) {
                //成功！
                layui.layer.msg(res.message, {
                    icon: res.status ? 5 : 1,
                    time: 700 //2秒关闭（如果不配置，默认是3秒）
                })
                if (res.status === 0) {
                    window.parent.getUserInfo();
                }
            }
        })

    })
    getUserInfo();
})

//发送请求
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        success: function (res) {
            layui.form.val('formUserInfo', res.data);
        }
    })
}