//过滤器方法
//异步对象请求之前执行这个函数
$.ajaxPrefilter(function (option) {
    option.url = "http://ajax.frontend.itheima.net" + option.url;
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    //同意处理 服务端返回的 未登录的错误信息
    //complete 最后执行
    option.complete = function (res) {
        //responseJSON拿到响应数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '/index.html';
        }
    }

})