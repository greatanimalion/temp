var sex_;
var typeid_;
var allpagesmuen;
var page=1;
var per_page;
var user_phone;
var user_amount;
var user_pay;
var _id_1;
var idchange;
var order_addname;
var order_addprice;
var order_pay;
var order_addphone;
var order_change_;
var usersex;
var errtime=0
var rex
//得到所有页数
getAllData(1);
//页面查询
function getAllData(page) {
    var table = document.getElementById('table');
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/food/getInfoByPage",
        dataType: "JSON",
        data: {
            page:1,
            per_page:99999
        },
        success: function (result) {
            console.log(result);
            let arr = result.data;
            var s = '';
            allpagesmuen=result.data.length
            if(page=='')page=1
            if(page>parseInt(allpagesmuen/5+1)){
                alert("数字过大，已自动定位到最后一页");
                page=parseInt(allpagesmuen/5+1);
                document.getElementById("page").value=page;
            }         
            var time=5*(page)
            if(time>=arr.length)time=arr.length
            for (let i = 5*(page-1);  i <time; i++) {
                document.getElementById("_page").innerHTML = `当前页数:${page}页,共${parseInt(allpagesmuen/5+1)}页`
                if(arr[i].typeid=="0")typeid_="米"
                else if(arr[i].typeid=="1")typeid_="面"
                else if(arr[i].typeid=="2")typeid_="饮料"
                else if(arr[i].typeid=="3")typeid_="水果"
                s +=
                    "<tr>" +
                    "<th>" + arr[i].name + "</th>" +
                    "<th>" + arr[i].price + "</th>" +
                    "<th>" + arr[i].desc + "</th>" +
                    "<th>" + arr[i].typename + "</th>" +
                    "<th>" + typeid_ + "</th>" +
                    "<th>" + "<span  style='margin-right:20px;'  onclick='delOne(\"" + arr[i]._id +
                     "\")'>删除</span>/<span style='margin-left:20px;' onclick='displaychange(\"" + arr[i].name + "\",\"" + arr[i].price + "\",\"" + arr[i].desc + "\",\"" + arr[i].typename + "\",\"" + arr[i].typeid + "\",\"" + arr[i]._id + "\")'>修改</span>" + "</th>"
                     "</tr>"
            }
            table.innerHTML = s;
            
        },
        error: function (err) {
            console.log(err)
        }
    })
}
search(1)
//修改菜单展示与消失
document.getElementById("change_muen_").style.display = "none"
function displaychange(n1, n2, n3, n4, n5, n6) {
    appear()
    document.getElementById("change_muen_").style.display = "block"
    document.getElementsByClassName("change_muen_name")[0].value = n1
    document.getElementsByClassName("change_muen_price")[0].value = n2
    document.getElementsByClassName("change_muen_des")[0].value = n3
    document.getElementsByClassName("change_muen_type")[0].value = n4
    if(n5=="0")n5="米"
    else if(n5=="1")n5="面"
    else if(n5=="2")n5="饮料"
    else if(n5=="3")n5="水果"
    document.getElementsByClassName("change_muen_num")[0].value = n5
    _id_1=n6;

}
//启动白幕
var back = document.getElementsByClassName("back")[0]
//出现白幕
function appear() {
    back.style.display = "block"
}
//消失白幕
function disappear() {
    back.style.display = "none"
}
//取消键
function cancel() {
    disappear()
    document.getElementById("addmes").style.display = "none";
    document.getElementById("add_muen_").style.display = "none"
    document.getElementById("change_muen_").style.display = "none"
    document.getElementById("add_Order").style.display = "none"
    document.getElementById("changeUser").style.display="none"
}
 function cancel1(){
    disappear()
    document.getElementById("changeUser1").style.display="none"
 }
//删除菜品
function delOne(params) {
    var isprimedelete = confirm("确定删除吗")
    console.log(params);
    if (isprimedelete == true) {
        search()
        $.ajax({
            async: true,
            type: "post",
            url: "http://118.195.129.130:3000/food/del",
            dataType: "JSON",
            data: {
                _id: params
            },
            success: function (result) {
                console.log(result);
                alert("修改成功");
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

}
var cont = document.getElementsByClassName("hidof");
//使每个页面消失
for (i = 0; i < cont.length; i++) {
    cont[i].style.display = "none";
}
function search() {
    page = document.getElementById("page").value;
  if(page=='')page=1
  rex=/^[0-9]{0,5}$/
  if(!rex.test(page))alert("请输入数字查询")
  else {
    if(page<=0){
        page=1;alert("输入数值有误，已自动定位到第一页")
        document.getElementById("page").value=page;
    }
      getAllData(page);
}
}
//
var page1
function search1() {
    page1 = document.getElementById("page2").value;
    rex=/^[1-9]{1,5}$/
    if(rex.test(page1)){getusers(page1);}
    else alert("请输入正确信息")
}
//请求log页面的uesr查询id
let userid;
$.ajax({
    async: true,
    type: "post",
    url: "http://118.195.129.130:3000/users/getInfoByKw_users",
    dataType: "JSON",
    data: {
        kw: localStorage.getItem("passworld")
    },
    success: function (result) {
        userid = result.data[0]._id
        usersex=result.data[0].sex
    }

})
//置顶标签选着
function card(ent, classname) {
    let i, temp;
    for (i = 0; i < cont.length; i++) {
        cont[i].style.display = "none";
        document.getElementsByClassName("select")[i].style.background = ""
    }
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/user/inquire",
        dataType: "JSON",
        data: {
            "_id": userid
        },
        success: function (result) {
            document.getElementById("change_age").value = result.data[0].age;
            document.getElementById("change_us").value = result.data[0].us;
            document.getElementById("change_phone").value = result.data[0].phone;
            idchange = result.data[0]._id;
            console.log(result);
            var sex = '';
            sex_ = result.data[0].sex;
            if (result.data[0].sex == 1) sex = "女";
            else sex = "男"
            document.getElementsByClassName("inframe")[0].innerHTML = `
            <div>性别:${sex}</div>
            <div>年龄:${result.data[0].age}</div>
            <div>电话:${result.data[0].phone}</div>
            <div>用户id:${result.data[0]._id}</div>
            <div>用户名:${result.data[0].us}</div>
            <div>积分:${result.data[0].integral}</div>
            <div class="Changemes" id="id_chang" onclick="id_change()">修改信息</div>
            <div class="Changemes" id="exit" onclick="exit()"> 退出</div>
            `
        }
    });

    temp = document.getElementsByClassName(classname)[0];
    temp.style.display = "block";
    document.getElementsByClassName(ent)[0].style.background = "rgba(138, 139, 141, 0.6)"
}
//显示主页
card('s2', 'order');
//用户修改信息显示
function id_change() {
    appear()
    document.getElementById("addmes").style.display = "block";
}
if(usersex==0)document.getElementsByClassName("change_sex")[0].checked=true
else document.getElementsByClassName("change_sex")[1].checked=true
//获取性别
function seleteSex(thisValue) {
    if (thisValue == "0") { document.getElementsByClassName("change_sex")[1].checked = false; sex_ = "0"; }
    if (thisValue == "1") { document.getElementsByClassName("change_sex")[0].checked = false; sex_ = "1" }
}
//修改信息图框消失且上传修改数据
function func_change(q) {
    disappear()
    errtime=0
    document.getElementById(q).style.display = "none";
    var us_ = document.getElementById("change_us").value;
    rex=/^[\u4e00-\u9fa5]{1,10}$/
    if(!rex.test(us_)){errtime++;}
    var age_ = document.getElementById("change_age").value;
     rex=/[6-99]$/
    if(!rex.test(age_))errtime++
    var phone_ = document.getElementById("change_phone").value;
    rex=/1[0-9]{10}$/
    if(!rex.test(phone_))errtime++
    if(errtime==0){
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/user/mod",
        dataType: "JSON",
        data: {
            us: us_,
            _id: idchange,
            age: age_,
            sex: sex_,
            phone: phone_
        },
        success: function (result) {
            console.log(result);
            alert("修改成功");
            window.location. reload ();
        },
        error: function (err) {
            console.log(err);
            alert("修改失败");
        }
    })
    }
    else {alert("输入信息不规范，请重新输入");}
}
//退出选项
function exit() {
    var a = confirm("真的要退出吗?");
    if (a == true) { location.href = "./登录与注册页面.html"; }
    localStorage.clear("passworld")
}
var display_add = document.getElementById("add_muen_");
display_add.style.display = "none"
//添加显示
function displayadd() {
    display_add.style.display = "block";
    appear()
}
//添加菜品
function addconfirm() {
    disappear()
    errtime=0
    var add_muen_name = document.getElementsByClassName("add_muen_name")[0].value;
    rex=/^[\u4e00-\u9fa5]{1,10}$/;
    if(!rex.test(add_muen_name)){errtime++} 
    var add_muen_price = document.getElementsByClassName("add_muen_price")[0].value;
    rex=/^[1-9]{1}[0-9]{0,10}$/;
    if(!rex.test(add_muen_price)){errtime++}
    var add_muen_des = document.getElementsByClassName("add_muen_des")[0].value;
    rex=/^[\u4e00-\u9af5]{1,10}$/
    if(!rex.test(add_muen_des)){errtime++}
    var add_muen_type = document.getElementsByClassName("add_muen_type")[0].value;
    rex=/^[\u4e00-\u9af5]{1,10}$/
    if(!rex.test(add_muen_type)){errtime++}
    var add_muen_num = document.getElementsByClassName("add_muen_num")[0].value;
    if(add_muen_num=="米")add_muen_num="0"
    else if(add_muen_num=="面")add_muen_num="1"
    else if(add_muen_num=="饮料")add_muen_num="2"
    else if(add_muen_num=="水果")add_muen_num="3"
    else {errtime++}
    if(errtime==0){
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/food/add",
        dataType: "JSON",
        data: {
            name: add_muen_name,
            price: add_muen_price,
            desc: add_muen_des,
            typename: add_muen_type,
            typeid: add_muen_num
        },
        success: function (result) {
            console.log(result);
            alert("添加成功");
            display_add.style.display = "none";

        },
        error: function (err) {
            console.log(err);
            alert("添加失败")
        }
    })
    }
    else {alert("请输入规范内容"); display_add.style.display = "none";}
}
//修改菜品

function changeconfirm() {
    disappear()
    errtime=0
    var change_muen_name = document.getElementsByClassName("change_muen_name")[0].value;
    var rex=/^[\u4e00-\u9fa5]{1,10}$/
    if(!rex.test(change_muen_name)){errtime++}
    var change_muen_price = document.getElementsByClassName("change_muen_price")[0].value;
    rex=/^[1-9]{1}[0-9]{0,10}$/ ;
    if(!rex.test(change_muen_price)){errtime++}
    var change_muen_des = document.getElementsByClassName("change_muen_des")[0].value;
    rex=/^[\u4e00-\u9af5]{1,10}$/
    if(!rex.test(change_muen_des)){errtime++}
    var change_muen_type = document.getElementsByClassName("change_muen_type")[0].value;
    rex=/^[\u4e00-\u9af5]{1,10}$/
    if(!rex.test(change_muen_type)){errtime++}
    var change_muen_num = document.getElementsByClassName("change_muen_num")[0].value;

    if(change_muen_num=="米")change_muen_num="0"
    else if(change_muen_num=="面")change_muen_num="1"
    else if(change_muen_num=="饮料")change_muen_num="2"
    else if(change_muen_num=="水果")change_muen_num="3"
    else {errtime++}
    if(errtime==0){
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/food/update",
        dataType: "JSON",
        data: {
            name: change_muen_name,
            price: change_muen_price,
            desc: change_muen_des,
            typename: change_muen_type,
            typeid: change_muen_num,
            _id: _id_1
        },
        success: function (result) {
          
            if (result.msg == "修改成功") alert("修改成功")
            else alert("修改失败")
            document.getElementById("change_muen_").style.display = "none";
           
        },
        error: function (err) {
            console.log(err);
        }
    })
    }
   
    else {alert("请输入正确的内容");   document.getElementById("change_muen_").style.display = "none";}
}
var table2 = document.getElementById("table2");
//判断支付状态
function ispr(pay) {
    if (pay == "0") return "未支付"
    else return "已支付"
}
//得到所有用户
var userallpage=1
function getusers(page1) {
    page1=document.getElementById("page2").value
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/order/getInfoByPage_order",
        data: {
            page,
            per_page
        },
        success: function (result) {
            console.log(result);
            var Arr = result.data;
            var str = '';
            var time=(page1-1)*5
            var maxpage=parseInt(Arr.length/5)+1;
            var u1=page1*5
            if(u1>Arr.length)u1=Arr.length
            if(page1>maxpage){
                page1=maxpage; time=(page1-1)*5;
                alert("数值过大已自动定位到第最后一页")
                document.getElementById("page2").value= page1}
            if(page1<=0){
                alert("输入错误已自动定位到第一页");
                page1=1
                document.getElementById("page2").value=page1
            }
            document.getElementById("_page2").innerText=`当前页数:${page1}页,共${maxpage}页`
            for (var j = time; j < u1; j++) {
                var str1=Arr[j].time.substring(0,19);
                var str2= Arr[j].updatedAt.substring(0,19)
                str +=
                    "<tr>" +
                    "<th>" + ispr(Arr[j].pay) + "</th>" +
                    "<th>" + Arr[j].us + "</th>" +
                    "<th>" + Arr[j].amount + "</th>" +
                    "<th>" + Arr[j].phone + "</th>" +
                    "<th>" +str1 + "</th>" +
                    "<th>" + str2 + "</th>" +
                    "<th>" + "<div ><span style='margin-right:15px;' onclick='delTwo(\"" + Arr[j]._id + 
                    "\")'>删除</span>/<span style='margin-left:15px;'  onclick='changeUserappear(\""+Arr[j].us+"\",\""+Arr[j]._id+"\",\""+Arr[j].phone+"\",\""+Arr[j].amount+"\",\""+Arr[j].pay+"\")'>修改</span></div>" + 
                    "</th>"
                "</tr>"
            }
            table2.innerHTML = str;
        },
        error: function (err) {
            console.log(err);
        }
    })
}
//
var usertempid
function changeUserappear(us,id,phone,amount,pay){
    appear()
    document.getElementById("changeUser1").style.display="block";
    document.getElementsByClassName("Userchange")[0].value=us;
    document.getElementsByClassName("Userchange")[1].value=phone;
    document.getElementsByClassName("Userchange")[2].value=amount;
    usertempid=id;
    if(pay==0)document.getElementsByClassName("Userpay")[0].checked=true
    else document.getElementsByClassName("Userpay")[1].checked=true
}
//
function notrepeat(thisvalue){
    document.getElementsByClassName("Userpay")[0].checked=false
    document.getElementsByClassName("Userpay")[1].checked=false
    if(thisvalue==0)document.getElementsByClassName("Userpay")[0].checked=true;
    else document.getElementsByClassName("Userpay")[1].checked=true
}
//改变用户订单信息
function changeTwo(){
    errtime=0
    var rex =/^[\u4e00-\u9fa5]{1,10}$/
    if(!rex.test(document.getElementsByClassName("Userchange")[0].value)){errtime++}
  
    rex=/^[0-9][1-9]{0,5}/;
    if(!rex.test(document.getElementsByClassName("Userchange")[1].value)){errtime++}
    var Pay;
    if(document.getElementsByClassName("Userpay")[0].checked==true)Pay=0
    else Pay=1
    
    if(errtime==0){
    $.ajax({
        async:true,
        type:"post",
        url:"http://118.195.129.130:3000/order/update_order",
        dataType:"JSON",
        data:{
            us: document.getElementsByClassName("Userchange")[0].value,
            amount:document.getElementsByClassName("Userchange")[2].value,
            pay:Pay,
            _id:usertempid,
            phone:document.getElementsByClassName("Userchange")[1].value
        },
        success:function(){
            disappear();
            alert("修改成功");
            document.getElementById("changeUser1").style.display="none";
        },
        error:function(){
            alert("修改失败")
        }
    })}
    else alert("请规范输入")
}
getusers(1);
//删除菜品
function delTwo(param) {
     var isprimedeleteuser= confirm("确定删除？");
     if(isprimedeleteuser==true){
        card('s3','change')
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/order/del_order",
        dataType: "JSON",
        data: {
            _id: param
        },
        success: function (result) {
            console.log(result);
            alert("修改成功");
        },
        error: function (err) {
            console.log(err);
        }
    })
    window.location. reload ();
}

}
document.getElementById("add_Order").style.display = "none"
//判断支付状态
function seletepay(thisValue) {
    if (thisValue == "0") { document.getElementsByClassName("addpay")[1].checked = false; order_pay = "0"; }
    if (thisValue == "1") { document.getElementsByClassName("addpay")[0].checked = false; order_pay = "1" }
   
}
//添加菜单
function addo() {
    appear()
    document.getElementById("add_Order").style.display = "block";
    
}
//确定添加菜单
function order_confirm() {
    errtime=0
    order_addname = document.getElementById("order_addname").value
    rex=/^[\u4e00-\u9fa5]{1,10}/
    if(!rex.test(order_addname))errtime++
    order_addprice = document.getElementById("order_addprice").value
    rex=/^1[0-9]{0,5}/
    if(!rex.test(order_addprice))errtime++
    order_addphone = document.getElementById("order_addphone").value
    rex=/^1[0-9]{10}/
    if(!rex.test(order_addphone)){errtime++}
    if(errtime==0){
    $.ajax({
        async: true,
        type: "post",
        url: "http://118.195.129.130:3000/order/add_order",
        dataType: "JSON",
        data: {
            us: order_addname,
            amount: order_addprice,
            phone: order_addphone,
            pay: order_pay
        },
        success: function (result) {
            alert("添加成功");
            disappear()
        },
        error: function (err) {
            console.log(err);
        }
    })
    cancel()
    }   
    else alert("请输入规范内容")
    
}

//
// var names = document.getElementById("txtname").value; //获取你所填写的信息
//             var ze= /^[\u4e00-\u9fa5]{2,6}$/;  //定义约束,要求输入2到6个中文
//             if (!ze.test(names)) {   //判断
//                alert("请输入2~6个汉字!"); //输入不合规范
              
//             }