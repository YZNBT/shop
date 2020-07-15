

"ui";

//此代码由飞云脚本圈整理提供（www.feiyunjs.com）

// 误区一：使用线程开启无障碍
// 浪费CPU和内存资源，不必要的线程
// threads.start(function() {
//      auto.waitFor();
// });


// 误区二：直接使用auto()
// 对用户不友好
// auto();

// 正确示范：
// 通过一个开关表示无障碍权限是否开启
// 如果用户没有开启直接运行则提示

ui.layout(
    <vertical>
        <appbar>
            <toolbar title="UI脚本使用无障碍服务的最佳实践"/>
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
        <text textSize="16sp" textColor="black" text="关注人数："/>
        <input id="zan" inputType = "number"/>
        <text textSize="16sp" textColor="black" text="请输入男或女："/>
        <input id="man"/>

        <button id="start" text="开始运行"/>
    </vertical>
);

ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    main();
});

var count = 0;
function main() {
    console.show()
        // 这里写脚本的主逻辑
        threads.start(function () {
            //请求截图
            requestScreenCapture();
            app.launchApp("抖音短视频")
            log("打开抖音,缓冲8秒");
            sleep(8500)
            进入关注();
            进入直播();
            var a =text("直播已结束").findOne(1000);
            if(a){
                end();
            }
            点击观看人数()
            点击在线用户()
            slip();//到底
            //获取关注人数
            var num = ui.zan.getText();
            while(count < num){
                operation();
               if(nextBro()){
                   log("下滑进入下一个直播间");
                   re();
                   swipe(200,1600,321,300,500);
                   主函数();
               }
                time(1);
                five();
            }
            getRandomNum(3);
            log("脚本结束");
        });
}


function 主函数(){
            var a =text("直播已结束").findOne(1000);
            if(a){
                end();
            }
            点击观看人数()
            点击在线用户()
            slip();//到底
            //获取关注人数
}

function 进入关注(){
        var a = text("关注").findOne(1000);
        if(a){
            log("进入关注页面")
            a.click()
            getRandomNum(3); 
        }
        
}

function 进入直播(){
    var a = id("bj4").findOne(1000);
    if(a){
        time(1)
        var b = id("bwg").findOne(1000);
        b.click();
        log("进入直播间")
        getRandomNum(3);
    }else{
         log("进入直播间失败")
    }   
}

function 点击观看人数(){
    var a = id("d9r").findOne(2000);
    if(a){
        var x = random(948, 1044);
        var y = random(33,123);
        click(x,y);
        log("进入观看人数页面");
        getRandomNum(3);
    }else{10
        log("进入观看人数页面失败")
    }
}


function 点击在线用户(){
    var a = text("在线用户").id("text").findOne(1000);
    if(a){
        var x = random(720,900);
        var y = random(562,623);
        click(x,y);
        time(0.5)
    }
}


//时间函数
function time(num){
    sleep(num*1000);
}

//随机时间函数
function getRandomNum(max){
    var a = random(2,max);
    a = a < 2 ? 2 : a;
    time(a)
}

//直播结束判断
function end(){
    var a =text("直播已结束").findOne(500);
    if(a){
        log("直播已经结束,进入下一个直播间")
        time(1.5);
        var b = text("直播中").findOne(500);
        b.parent().click();
        getRandomNum(3);
    }
}



//滑到底端
function slip(){
    var flag = id("f18").findOne(1000);
    log("滑动")
    var flag = true;
    var i = 0;
    var flag = id("f18").findOne(500);
    while(flag == null){
       // flag = scrollDown(0);
       var x1 = random(200,800);
       var x2 = random(200,800);
       var y1 = random(1500,1550);
       var y2 = random(700,720);
       swipe(x1,y1,x2,y2,500);
       // getsmall 
       i++;
       if(i > 29){
          break;
       }
       flag = id("f18").findOne(500);
    }
}

//操作粉丝
function operation(){
    var x = random(200,800);
    var y = random(1510,1520);
    var num = ui.zan.getText();
    for(var i = 0;i < 5;i++){
        click(x,y);
        sleep(2000)
        if(ui.man.getText() == "男"){
            man();
        }else if(ui.man.getText() == "女"){
            woman();
        }
        back();
        if(count >= num){
            return;
        }
        x = random(200,800);
        y = random(1510-(190*(i+1)),1520-(190*(i+1)));
        getsmall();
    }
    
}

//男粉丝操作
function man(){
    //截图
    var img = captureScreen();
    var point = findColor(img, "#ff5de3ed", {
        region: [300, 1200, 500,500],
        threshold: 4
    });
    if(point){
        if(!text("已关注").findOne(1000)){
            var a =text("+关注").findOne(1000)
            if(a){
                a.click();
                count++;
                log("已经关注"+count+"人")
                getsmall();
            }
            back()
        }else{
            back();
        }
    }
}

//女粉丝操作
function woman(){
    //截图
    var img = captureScreen();
    var point = findColor(img, "#ffff6b88", {
        region: [300, 1200, 500,500],
        threshold: 4
    });
    if(point){
        if(!text("已关注").findOne(1000)){
            var a =text("+关注").findOne(1000)
            if(a){
                a.click();
                count++;
                log("已经关注"+count+"人")
                getsmall();
            }
            back();
        }else{
            back();
        }
    }
}

function getsmall(){
    var a = random(1,2);
    sleep(a*1000)
}

//向下滑一下
function down(){
    var x1 = random(200,600);
    var x2 = random(200,600);
    var y1 = random(220,250);
    var y2 = random(1000,1010);
    swipe(x1,y1,x2,y2,500);
}

//下滑5个
function five(){
    var x1 = random(200,600);
    var x2 = random(200,600);
    var y1 = random(700,710);
    var y2 = random(1600,1606);
    swipe(x1,y1,x2,y2,500);
    getRandomNum(3);
}

//退出在线用户界面时出现立即赠送，点击放回
function re(){
    if(id("fxq").findOne(1000)){
        back();
    }
}

//出现粉丝团，结束，进行下一个直播
function nextBro(){
    if(id("axd").findOne(1000)){
        back();
        return true;
    }
    return false;
}

//直接点击直播，进入直播间
function 点击直播进入直播间(){
    var flag = id("ck7").findOne(1000);
    if(flag != null){
       var x = random(48,156);
       var y = random(84,192)
      click(x,y);
    }
}