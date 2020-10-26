$(function(){
    
    $('form a').on("click",function(){
     $(this).parents('.item').hide().siblings().show()
    })
    // 对表单进行校验
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
        },
        repass:function(value,item){
           let repass = $(".pwd").val()
           if(repass !== value){
               return '两次密码不一致'
           }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });      
      $(".register form").on('submit',function(e){
        e.preventDefault()
        // 实现注册功能
        $.ajax({
            url:"/api/reguser",
            type:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status===0){
                    $('.login').show().next().hide()
                }else{
                    layer.open({
                        title:"温馨提示",
                        content:res.message,
                        time:2000
                    })
                }
            }
        })
      })
        //   登陆功能
        $(".login form").on("submit",function(e){
            e.preventDefault()
            $.ajax({
                url:'/api/login',
                type:"POST",
                data:$(this).serialize(),
                success:function(res){
                    layer.msg(res.message, {icon: 6}); 
                    if(res.status===0){
                        window.localStorage.setItem('token',res.token)
                        location.href='./index.html'
                    }
                }

            })
        })
})