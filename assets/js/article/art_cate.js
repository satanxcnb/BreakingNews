$(function () {
    initArtCateList();
    var indexAdd = null;
    $("#btnAdd").on("click", function () {
        indexAdd = layui.layer.open({
            type: 1,
            area: ["500px", "258px"],
            title: "添加文章列表",
            content: $('#dialog-add').html() //这里content是一个普通的String
        });
    });

    // 添加按钮点击
    $("body").on("submit", "#formAddPanel", function (e) {
        var strValue = $(this).serialize();
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: strValue,
            success(res) {
                if (res.status === 0) {
                    layui.layer.msg(res.message, {
                        icon: res.status ? 5 : 1,
                        time: 700 //2秒关闭（如果不配置，默认是3秒）
                    });
                    layer.close(indexAdd);
                    initArtCateList();
                }
            }
        })
    });

    //编辑btnEdit
    $("tbody").on("click", "#btnEdit", function () {
        indexAdd = layui.layer.open({
            type: 1,
            area: ["500px", "258px"],
            title: "编辑文章列表",
            content: $('#dialog-edit').html()
        });
        /*  var tdFisrt = $(this).parent().siblings("td")[0]; //DOM对象
         console.log(tdFisrt.innerText); */
        //获取id
        var id = $(this).attr("data-id");
        $.ajax({
            method: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status === 0) {
                    layui.form.val('fmEdit', res.data);
                }
            }
        })
    })
    //确定编辑
    $(document).on("click", "#yesEdit", function (e) {
        e.preventDefault();
        var dt = $("#fmEdit").serialize();
        $.ajax({
            method: "post",
            url: "/my/article/updatecate",
            data: dt,
            success: function (res) {
                layui.layer.msg(res.message, {
                    icon: res.status ? 5 : 1,
                    time: 700 //2秒关闭（如果不配置，默认是3秒）
                });
                if (res.status === 0) {
                    layer.close(indexAdd);
                    initArtCateList();
                }
            }
        })
    });

    //删除按钮
    $("tbody").on("click", "#btnDel", function () {
        var id = $(this).attr("data-id");
        layer.confirm('您确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    layui.layer.msg(res.message, {
                        icon: res.status ? 5 : 1,
                        time: 700 //2秒关闭（如果不配置，默认是3秒）
                    });
                    if (res.status === 0) {
                        //渲染数据
                        initArtCateList();
                    }
                }
            })
            layer.close(index);
        });

    })
})
// 获取文章分类
function initArtCateList() {
    $.ajax({
        method: "get",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status === 0) {
                var strHtml = template("tpl-table", res.data);
                $("tbody").empty().append(strHtml);
            }
        }
    })
}
