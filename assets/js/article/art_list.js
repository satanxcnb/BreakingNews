
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

$(function () {

    // 编辑按钮
    $("tbody").on("click", "#btn-eidt", function () {
        location.href = "/artcle/art_edit.html";
    })

    //删除按钮
    $("tbody").on("click", "#btnDel", function () {
        var Dellength = $("tr #btnDel").length;
        // 弹出层，询问用户是否删除
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function (index) {
            //获取文章id
            var id = $("#btnDel").attr("data-id");
            //do something
            $.ajax({
                method: "get",
                url: "/my/article/delete/" + id,
                success(res) {
                    layer.msg(res.message, {
                        icon: res.status ? 5 : 1,
                        time: 600
                    });
                    // console.log(Dellength);
                    if (Dellength == 1) {
                        //证明此页码上没有数据了，应该让页码数-1，并刷新页面
                        req.pagenum = req.pagenum == 1 ? 1 : req.pagenum - 1;
                    }
                    if (res.status === 0) {
                        getTable()
                    }
                }
            })
            layer.close(index);
        });
    })

    getCates();
    getTable();

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

    // 筛选功能
    $("#ctFm").on("submit", function (e) {
        e.preventDefault();
        var cate_id = $("#ctFm [name=cate_id]").val();
        var state = $("#ctFm [name=state]").val();
        req.cate_id = cate_id;
        req.state = state;
        getTable();
    })

})
// 渲染筛选下拉框
function getCates() {
    $.get("/my/article/cates", function (res) {
        if (res.status === 0) {
            var strHtml = template("tpl-cates", res.data);
            $("#selects").empty().append(strHtml);

            // 重新渲染表单页面
            layui.form.render();
        }
    })
}

// 初始化页面
function getTable() {

    $.ajax({
        method: "get",
        url: "/my/article/list",
        data: req,
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            var strHtml = template('tdmoban', res.data);
            $("tbody").html(strHtml);
            // 传一个 总条数
            readerPage(res.total);
        }
    })
}

// 渲染分页的方法
function readerPage(total) {
    // laypage.reader()方法来渲染分页功结构
    layui.laypage.render({
        elem: "pageBox",//分页容器的iD
        count: total,//总数据条数
        layout: ["count", "limit", "prev", "page", "next", "skip"],
        limits: [2, 3, 5, 10],
        jump: function (obj, first) {
            //obj包含了当前分页的所有参数，比如：
            // 点击分页触发的jump,first就是undifned
            req.pagenum = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
            // obj.limit 拿到最新的每页显示多少条目数
            req.pagesize = obj.limit;
            if (!first) {
                getTable();
            }
        },
        limit: req.pagesize,//每页显示多少条
        curr: req.pagenum  //设置默认 被选中的分页
    })
}