
$(function () {
    // 定义加载文章分类的方法
    initCate();
    // 初始化富文本编辑器
    initEditor()

    // 定义文章的发布状态
    var art_state = "已发布";

    // 选择封面的按钮
    $("#btnChooseImage").on("click", function () {
        $("[type=file").trigger("click");
    })

    // 监听file类型的change事件  // 获取用户选择文件的列表
    $("#coverFile").on("change", function (e) {
        var files = e.target.files;
        // 判断用户是否选择了文件

        if (files.length === 0) {
            return;
        }
        // 根据文件，创建对应的url地址
        var newImgURL = URL.createObjectURL(files[0]);
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })


    // 存为草稿点击
    $("#btnSave2").on("click", function () {
        art_state = "草稿";
    })

    // 为表单绑定submit
    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        // 基于form表单快速创建一个formData
        var fd = new FormData($(this)[0]);

        // 将发布状态追加到fd
        fd.append("art_state", art_state);
        // 裁剪后的图片，输出为图片文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob);
                publishArticle(fd);
            })
    })
})


// 定义一个发布文章的方法
function publishArticle(fd) {
    $.ajax({
        method: "post",
        url: "/my/article/add",
        data: fd,
        // 注意：如果向服务器提交的是fromData数据格式，必须提交以下两个配置
        contentType: false,
        processData: false,
        success(res) {
            layui.layer.msg(res.message, {
                icon: res.status ? 5 : 1,
                time: 500
            }, function () {
                location.href = "/article/art_list.html";
            });
            //if (res.status === 0) {
            //}
        }
    })
}

// 定义加载文章分类的方法
function initCate() {
    $.ajax({
        method: "GET",
        url: "/my/article/cates",
        success(res) {
            console.log(res);
            /* layui.layer.msg(res.message, {
                icon: res.status ? 5 : 1,
                time: 700
            }); */
            if (res.status === 0) {
                // 调用模板引擎，渲染分类下拉菜单
                var strHtml = template("tpl-cates", res.data);
                $("#select").html(strHtml);
                // 一定要调用form.render()，重新渲染结构
                layui.form.render();

            }
        }
    })
}

// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)