$(function(){
    renderTable()
   function renderTable(){
        // 请求文章列表数据
        $.ajax({
            url:"/my/article/cates",
            success:function(res){
              if(res.status==0){
                let htmlStr=template('tmp-list',res)
                $("tbody").html(htmlStr)
              }
            }
        })
}
// 添加分类弹出框
$('.btn-add').on("click",function(){
   window.addIndex= layer.open({
        title: '添加文章分类',
        type:1,
        area: ['500px', '250px'],
        content: $("#addCteTmp").html()
      });     
})

// 数据的校验
layui.form.verify({
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '用户名不能有特殊字符';
      }
      if(/(^\_)|(\__)|(\_+$)/.test(value)){
        return '用户名首尾不能出现下划线\'_\'';
      }
      if(/^\d+\d+\d$/.test(value)){
        return '用户名不能全为数字';
      }
    }
  });      
// 确认添加
$('body').on('submit','.addForm',function(e){
    e.preventDefault()
  $.ajax({
      type:'POST',
      url:"/my/article/addcates",
      data:$(this).serialize(),
      success:function(res){
          if(res.status===0){
            layer.close(addIndex)
            renderTable()
          }
      }
  })
})

    // 删除功能
    $('tbody').on('click','.btn-del',function(){
        let id = $(this).data("id")
        layer.confirm('确认要删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:"/my/article/deletecate/" + id,
                success:function(res){
                 if(res.status===0){
                    layer.close(index);
                    renderTable()
                 }
                }
            })
            
          });
    })
})