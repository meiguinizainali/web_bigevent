// 每次调用$.get .post .ajax的时候会先调用这个函数
// 在这个函数中可以拿到我们给AJax提供的配置对象
$.ajaxPrefilter(function(options){

    
    options.url = 'http://www.liulongbin.top:3007' + options.url


        // 统一为有权限的接口设置headers请求头
        // 只有包含/my的接口会ajax会添加headers
        if(options.url.indexOf('/my/') !== -1){
            options.headers = {
                Authorization : localStorage.getItem('token') || ''
          
            }
        }
        

        // 全局统一挂载 complete函数
        options.complete = function (res) {
                // console.log(res); // 在页面上写index.html直接进去也不可以
                if(res.responseJSON.status === 1 && res.responseJSON.message ===  "身份认证失败！") {
                    localStorage.removeItem('token')
                    location.href = '/dashijian/login.html'
                }
            }
        
})



// 这个是jquery自带的函数   可以调用这个函数然后省略下次写url地址的根目录