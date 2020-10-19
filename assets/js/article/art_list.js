
$(function () {
    // 请求参数对象
    var req = {
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 2,
        // 文章分类的 Id
        cate_id: '',
        // 文章的状态，可选值有：已发布、草稿
        state: ''
    }
    $.ajax({
        method: "get",
        url: "/my/article/list",
        data: req,
        success(res) {
            console.log(res);
            template('tdmoban', res.data);
        }
    })

    //2.定义美化时间的过滤器 -----------------------
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(num) {
        return num < 10 ? "0" + num : num;
    }
})