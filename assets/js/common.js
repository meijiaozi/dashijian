$.ajaxPrefilter(function(options){
    // 这个函数在所有的ajax请求之前执行的
    // options是一个对象,里面存储了所有的ajax函数的参数内容

    options.url='http://ajax.frontend.itheima.net'+options.url

    if(options.url.includes("/m")){
        options.headers={
            Authorization:window.localStorage.getItem('token')
        }
    }

     
    options.complete=function(res){  
        if(res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！'){
            // 删除本地中的无效token
            localStorage.removeItem('token')
      
            // 应该先跳转到登陆页面进行登陆
            location.href = './login.html'
}}
  
})