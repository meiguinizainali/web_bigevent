$(function() {
    getUserinfo()
    var layer = layui.layer
    // 点击按钮实现退出功能
    $("#btnlogout").on('click',function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登陆页面
            location.href = '/dashijian/login.html'
            layer.close(index);
          });
    })


    
})

// 获取用户的基本信息
// 先吧函数写在外面 打开页面自动先调用这个函数获取用户基本信息
function getUserinfo() {
    $.ajax({
        method :'get',
        url :'/my/userinfo',
        // headers: {
        //     Authorization : localStorage.getItem('token') || ''
        // },
        success : function(res) {
            if(res.status !== 0) {
                return layer.msg('获取失败')
            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功还是失败最后都会调用这个回调函数
        // complete:function(res){
        //     // console.log(res); // 在页面上写index.html直接进去也不可以
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ===  "身份认证失败！") {
        //         localStorage.removeItem('token')
        //         location.href = '/dashijian/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称  如果用户有昵称优先显示昵称   如果没有  显示用户名
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $("#welcome").html('欢迎 ' + name)
    // 按需渲染用户头像
    if(user.user_pic !== null) {
        // 如果获取过来的用户信息有头像 不等于空 就显示头像
        $(".layui-nav-img").attr('stc',user.user_pic).show()
        $(".text-avatar").hide()
    }else {
        // 如果获取过来的没有头像  等于空   就显示文字
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase() // 获取name的第一个字符并且转换为大写
        $(".text-avatar").html(first).show()
    }
}