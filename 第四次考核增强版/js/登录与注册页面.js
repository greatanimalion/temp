
function login(acount, password) {
    // ajax读取本地的文件
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/user/login",
        dataType: "JSON",
        data: {
            us: acount,
            ps: password
        },
        success: function (result) {//result:服务器返回的json
            if (result.msg == "登录成功") {
                alert("登录成功");
                location.href = "./管理页面.html";
            }
            else {
                alert("账号或密码错误");
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

//判断用户账号信息是否跳转网页
function isPrime() {
    var useraccunt = document.getElementById("acount").value;//正则表达式计算
    var userpasswoed = document.getElementById("password").value;
    localStorage.setItem("passworld", useraccunt);
    login(useraccunt, userpasswoed);
}

//跳转注册页面
function creatuser() {
    document.getElementsByClassName("log_")[0].style.display = "none"
}
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
function rolate() {
    a1.style.transform = 'rotateY(-180deg)';
    a2.style.transform = 'rotateY(0deg)';
}
function rolateback() {
    a1.style.transform = 'rotateY(0deg)';
    a2.style.transform = 'rotateY(180deg)';
}
//验证码等待
var wat=3;
var captcha=document.getElementsByClassName("captcha")[0];
 function GetRTime(){//+wat+'秒'
    var rex= /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
    if(!rex.test(document.getElementsByClassName("captcha")[0].value)){alert("邮箱格式错误，请重新输入")}
    else{
     document.getElementsByClassName("btn1")[0].disabled=true
        if(wat == 0){
            captcha.value='';
            document.getElementsByClassName("btn1")[0].disabled=false
          
            wat=3
        }else{
           
            console.log(captcha.value)
            captcha.value=wat;
            wat--;
            setTimeout('GetRTime()',1000);
        }
    }
}

//注册js
var time=0;//是否发送成功验证
function post_(){   
    var mail=document.getElementById("YOUXIANG").value;
$.ajax({
    async: true,
    type: "post",
    url: "http://118.195.129.130:3000/user/getMailCode",
    dataType: "JSON",
    data: {
       mail:mail
    },
    success: function (result) {
        console.log(result);
        let arr=result.msg
        console.log(arr);
        if(arr=="发送失败，请稍后再试"){
            alert("注册失败，请稍后再试");
        }
        else{ 
             alert("注册成功");
             time++;
            }
    },
    error: function (err) {
        console.log(err)
    }
})
}
function okRegister(){
    if(time==1){
       rolateback();
    }
    else{
        alert("请输入验证码");
    }
}

/////////////////////////////////////在这里修改代码