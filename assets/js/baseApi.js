//异步对象请求之前执行这个函数
$.ajaxPrefilter(function (option) {
    option.url = "http://ajax.frontend.itheima.net" + option.url;
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    //同意处理 服务端返回的 未登录的错误信息
    option.complete = function (res) {
        if (res.responseJSON.status === 1) {
            localStorage.removeItem('token');
            location.href = '/index.html';
        }
    }

})