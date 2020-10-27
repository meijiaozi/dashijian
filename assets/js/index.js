$(function(){
    $('.logout').on('click',function(){
        // 1.退出功能
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            window.localStorage.removeItem('token')
            location.href='./login.html'
            layer.close(index);
          });
        
    })
    getUserInfo()
        //   2.发送请求用户信息
    function getUserInfo(){
        $.ajax({
            url:"/my/userinfo",
            success:function(res){
                if(res.status===0){
                $('.username').text(res.data.username)
                }
                if(res.data.user_pic){
                  $(".text-avatar").hide()
    
                  $('.layui-nav-img').show().attr('src',res.data.user_pic)
                }else{
                    $('.layui-nav-img').hide()()
                    $(".text-avatar").show().text(res.data.username.slice(0,1).toUpperCase())
                }
            }
        })
    }
})