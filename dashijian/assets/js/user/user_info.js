
$(function() {
    var form = layui.form
var layer = layui.layer
    // layui表单验证功能
  
    form.verify({
        nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
            if(value === 'xxx'){
                alert('用户名不能为敏感词');
                return true;
              }
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method :'get',
            url:'/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取失败')
                }
                console.log(res);
            //    调用 form.val()  快速为表单赋值
            form.val('formUserInfo',res.data)
            }
        })
    }
    // 重置表单的数据
    $("#btnremove").on('click',function(e) {
        e.preventDefault()
        initUserInfo() //点击重置  再次发起get请求 自动填写之前的内容
    })
    // 监听表单提交事件
    $(".layui-form").on('submit',function(e){
        // 阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method : 'post',
            url :'/my/userinfo',
            data: $(this).serialize(),  // serialize快速拿到form表单填写的内容 data属性里面
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法  重新渲染头像和信息
                window.parent.getUserinfo()
            }
        })
    })
})  
