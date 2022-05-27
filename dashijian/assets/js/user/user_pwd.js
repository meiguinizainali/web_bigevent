$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ] ,
         samepwd : function (value) {
             if(value === $('[name=oldpwd]').val()) {
                 return '新旧密码不能一致'
             }
         },
         repwd: function(value) {
             if(value !== $('[name=newpwd]').val()) {
                 return '两次密码不一致'
             }
         }
    })

  
    // 重置表单的数据
    // $("#btnremove").on('click',function(e) {
    //     e.preventDefault()
    //     initUserInfo() //点击重置  再次发起get请求 自动填写之前的内容
    // })
    // 监听表单提交事件
    $(".layui-form").on('submit',function(e){
        // 阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method : 'post',
            url :'/my/updatepwd', // 这里url地址出现问题  后面的不能正常运行
            data: $(this).serialize(),  // serialize快速拿到form表单填写的内容 data属性里面
            success: function(res) {
                if(res.status !== 0 ) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                // 调用父页面中的方法  重新渲染头像和信息
                $('.layui-form')[0].reset()
            }
        })
    })
})