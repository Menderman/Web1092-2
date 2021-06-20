let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
const gridLength = 200;
$(function(){
    //0-可走,1-障礙,2-終點,3-敵人
    mapArray =[
        [0,1,1],
        [0,0,0],
        [3,1,2]
    ]
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "RPG/images/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };

    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }

    imgMountain = new Image();
    imgMountain.src = "RPG/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "RPG/images/Enemy.png";

    //to do improve
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    if(mapArray[x][y]==1){
                        //mountain
                        ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==3){
                        //enemy
                        ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                }
            }
        }
    }
        
});

//處理使用者按下按鍵
$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX:朝向哪個方向
    targetImg = {//目標座標
        "x":-1,
        "y":-1
    }

    targetBlock = {//目標(2維陣列)
        "x":-1,
        "y":-1
    }

    event.preventDefault();//排除預設操作
    //console.log(event);
    switch(event.key){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;
        case"ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//臉朝下
            break;
        default://其他按鍵不處理
            return;
    }

    if(targetImg.x<=400 && targetImg.x>=0 && targetImg.y<=400 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // 一般道路(可移動)
            $("#talkBox").text("");
            currentImgMain.x = targetImg.x;
            currentImgMain.y = targetImg.y;
            break;
            case 1: // 有障礙物(不可移動)
            $("#talkBox").text("有山擋住去路");
            break;
            case 2: // 終點(可移動)
            $("#talkBox").text("抵達終點");
            currentImgMain.x = targetImg.x;
            currentImgMain.y = targetImg.y;
            break;
            case 3: // 敵人(不可移動)
            $("#talkBox").text("有敵人擋住去路");
            break;
        }
    }
    else{
        $("#talkBox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
        
});