// 每次调用$.get .post .ajax的时候会先调用这个函数
// 在这个函数中可以拿到我们给AJax提供的配置对象
$.ajaxPrefilter(function(options){

    
    options.url = 'http://www.liulongbin.top:3007' + options.url

})



// 这个是jquery自带的函数   可以调用这个函数然后省略下次写url地址的根目录