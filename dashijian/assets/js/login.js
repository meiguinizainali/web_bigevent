$(function() {
    $("#zhuce").on('click',function() {
        $(".login-box").hide()
        $('.reg-box').show()
    })

    $("#denglu").on('click',function() {
        $(".login-box").show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过layui自带的form对象   form对象自带的verify()函数来自定义校验规则
    form.verify({
        pwd : [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一直的规则
        repwd:function(value) {
          var pwd =   $('.reg-box [name=password]').val()
          if(pwd !== value){
              return '两次密码不一致'
          } 
        }
    })


    // 监听注册表单的提交事件
    $("#form_reg").on('submit',function(e){
        // 先阻止默认提交行为
        e.preventDefault()
        // 发起ajax的post请求
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0) {
                return layer.msg(res.message); 
            }
            layer.msg('注册成功', {icon: 6});
            $("#denglu").click()
            $(".reg-box  input").val('')
        })
    })

    // 监听登录表单的提交事件
    $("#form_login").on('submit',function(e){
        e.preventDefault()
        
        $.ajax({
            method : 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success : function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功')
                // 将登录成功得到的token字符串保存到localStorage中
                localStorage.setItem('token',res.token)
                // console.log(res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})