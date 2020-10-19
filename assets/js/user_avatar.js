$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比  4/3
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 上传按钮
    $("#btnShang").on("click", function () {
        $("#file").click();
    })

    //file内容改变 change事件
    $("#file").on("change", function (e) {
        //获取用户选择的文件
        //当前选择的文件 列表
        var filelist = e.target.files;
        if (filelist.length <= 0) {
            return layui.layer.msg('请选择图片！');
        }
        console.log(1);
        // 拿到用户选择的文件
        var file = e.target.files[0];
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);

        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


        //确定按钮
        $("#btnyes").on("click", function () {
            // 将裁剪后的图片，输出为 base64 格式的字符串
            var dataURL = $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 100,
                    height: 100
                })
                .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            $.ajax({
                method: "POST",
                url: "/my/update/avatar",
                data: { avatar: dataURL },
                success: function (res) {
                    console.log(res);
                    layer.msg(res.message, {
                        icon: res.status ? 2 : 1,
                        time: 700 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        if (res.status === 0) {
                            window.parent.getUserInfo();
                        }
                    })
                }
            })
        })
    })
})