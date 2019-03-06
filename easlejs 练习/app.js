
var stage=new createjs.Stage("gameView");
var gameView=new createjs.Container();
stage.addChild(gameView);

var Rect=new createjs.Shape();
Rect.graphics.beginFill("green");
Rect.graphics.drawRect(0,0,100,50);
gameView.addChild(Rect);

stage.update();

createjs.Ticker.setFPS(3);
createjs.Ticker.addEventListener("tick",handlerTick);
var speedX=200;

function handlerTick(){
    if(Rect.x<=0){                 //当图形横坐标小于0，图形超出浏览器左侧
        speedX=Math.abs(speedX);   // Math.abs 计算绝对值。图形限制在
    }
    if(Rect.x>=300){
        speedX=-Math.abs(speedX);  // 负数的位置，使图形向返方向运行
    }
    Rect.x+=speedX;                //图形位置=原位置+速度
        stage.update();
}