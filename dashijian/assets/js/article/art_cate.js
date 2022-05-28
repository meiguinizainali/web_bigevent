$(function() {
    var layer = layui.layer
    var form = layui.form  // 这是一般是ajax请求里面快速获取form里面的内容
    initartcatelist()
    // 获取文章分类列表
    function initartcatelist() {
        $.ajax({
            method : 'get',
            url :'/my/article/cates',
            success :function(res) {
             var htmlstr =   template('tpl_table',res)  // 模板引擎函数template
            //  template返回的是一个字符串   用htmlstr接收一下
            $("tbody").html(htmlstr)
            }
        })
    }

    // 为添加类别做点击事件
    var indexadd = null // 设置一个空变量
    $('#btnadd').on('click',function() {
        indexadd = layer.open({ // 如果点击发生就把poen事件装进去indexadd
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $("#dialog-add").html()
          });     
            
    })


    $("body").on('submit','#form-add',function(e) {
        e.preventDefault()
        $.ajax({
            method :'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success : function(res) {
                if(res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
              initartcatelist()
                layer.msg('新增分类成功')
                // 根据索引关闭对应的弹出层
                layer.close(indexadd) // 添加成功后关闭open事件
            }
        })
    })

    // 事件委托给编辑按钮绑定事件
    var indexedit = null
    $('tbody').on('click','.btn-edit',function() {
        // 弹出一个修改文章分类信息的层
        indexedit = layer.open({ 
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $("#dialog-edit").html()
          });  
        //   根据返回数据的id获取id里的内容    attr获取属性值
          var id = $(this).attr('data-id')
          $.ajax({
            method :'get',
            url :'/my/article/cates/' + id,
            success :function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取id失败')
                }
                // 给指定的form表单填充数据
                form.val('form-edit',res.data)
            }
        })
        })


        // 事件委托给修改分类表单绑定submit事件
        $("body").on('submit','#form-edit',function(e) {
            e.preventDefault()
            $.ajax({
                method : 'post',
                url :'/my/article/updatecate',
                data:$(this).serialize(),
                success:function(res){
                    if(res.status !==0) {
                        console.log(res);
                    return layer.msg('更新分类数据失败')
                    }
                    layer.msg('更新分类数据成功')
                    layer.close(indexedit)
                     initartcatelist()

                }
            })

           
        })

        $('body').on('click','#btnclear',function(){
            var id = $(this).attr('data-ids')
            layer.confirm('确认要删除吗?', {icon: 3, title:'提示'}, function(index){
                $.ajax({
                    method : 'get',
                    url :'/my/article/deletecate/'+id,
                    success:function(res){
                        if(res.status !== 0) {
                            return layer.msg('删除失败')
                        }
                        layer.msg('删除成功')
                        layer.close(index);
                         initartcatelist()
                    }
                })
                
            })
            });
           
})


