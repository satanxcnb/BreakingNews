$(function () {
    //获取用户信息
    getUserInfo();
    $(".btnEd").on("click", function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something

            layer.close(index);
            location.href = '/index.html';
            localStorage.removeItem('token');

        });
    })

})

var token = localStorage.getItem('token');
//异步获取用户完整信息---------------
function getUserInfo() {
    $.ajax({
        method: "get",
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            readerA(res.data);
        }
    });
}
//渲染用户头像
function readerA(data) {
    var uname = data.nickname || data.username;
    $(".welC").text(uname + " 欢迎您");
    //显示头像
    if (data.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", data.user_pic);
        $(".text-avtar").hide();
    } else {//显示字母头像
        $(".layui-nav-img").hide();
        $(".text-avtar").show().text(uname.charAt(0).toUpperCase());
    }
}