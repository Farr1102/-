//  传参方式
// var arr={
//   count:4,
//   liWidth:1000,
//   DURA:500,
//   imgs:[
//     "../images/banner1.png",
//     "../images/banner2.png",
//     "../images/banner3.png",
//     "../images/banner4.png",
//    ],
//   id:"#d1"
// }
function carousel({count,liWidth,DURA=500,imgs,id}){
  var father=document.getElementById(id);
  var ulImgs=document.createElement("ul");
  father.appendChild(ulImgs);
  var cir=document.createElement("ul")
  father.appendChild(cir);
  ulImgs.style.width=liWidth*(count+1)+"px";
  ulImgs.style.marginLeft="0px";
  //动态生成imgs的li
  for(var i=0;i<=count;i++){
    var li=document.createElement("li");
    var img=document.createElement("img");
    i<count?img.src=imgs[i]:img.src=imgs[0];
    li.appendChild(img);
    ulImgs.appendChild(li);
  }
  //动态生成圆点的li
  for(var i=0;i<count;i++){
    var li=document.createElement("li");
    cir.appendChild(li);
  }
  var lis=cir.children;
  cir.firstElementChild.setAttribute("class","active");
  var i=0;
  var moveTo=to=>{
    if(to==undefined){
      to=i+1;
    }
    if(i==0){
      if(to>i){
      ulImgs.className="transition";
      }else{
        ulImgs.className="";
        ulImgs.style.marginLeft=-count*liWidth+"px";
        setTimeout(()=>{
          moveTo(count-1);
        },100);
        return;
      }
    }
    i=to;
    ulImgs.style.marginLeft=-i*liWidth+"px";
    for(var li of lis){
      li.className="";
    }
    if(i==count){
      i=0;
      setTimeout(()=>{
        ulImgs.className="";
        ulImgs.style.marginLeft=0;
      },DURA);
    }
    lis[i].className="active";
  }
  //设置自动播放
  var timer=setInterval(()=>{
    moveTo();
  },3000);
  ulImgs.onmouseover=()=>{
    clearInterval(timer);
  }
  ulImgs.onmouseout=()=>{
    timer=setInterval(() => {
      moveTo();
    }, 3000);
  }
//点击小点的事件  利用冒泡
  cir.onclick=e=>{
    var li=e.target;
    if(li.nodeName=="LI"){
      if(li.className!=="active"){
        for(var i=0;i<lis.length;i++){
          if(lis[i]==li){
            break;
          }
        }
        moveTo(i);
        setTimeout(()=>{
          canClick=true;
        },DURA)
      }
    }
  }
  //顺带直接把css动态生成
  var head=document.getElementsByTagName("head")[0];
  var style=document.createElement("style");
  style.innerHTML=`
    *{margin: 0;padding:0 ;}
    ul{
      list-style: none;
    }
    #${id}{
    width: ${liWidth}px;
    /* height: 312px; */
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    }
    #${id}>ul:first-child.transition{
      transition:all .5s linear;
    }
    #${id}>ul:first-child>li{
      width: ${liWidth}px;
      float: left;
    }
    #${id}>ul:first-child img{
      width: ${liWidth}px;
    }
    #${id}>ul:last-child{
      margin: 0 auto;
      list-style: none;
      position: absolute;
      bottom: 25px;
      left: 50%;
      margin-left: -40px;
    }
    #${id}>ul:last-child>li{
      float: left;
      width: ${liWidth>900?15:8}px;height:${liWidth>900?15:8}px;
      background-color: #ccc;
      border-radius: 50%;
      margin: 0 5px;
      cursor: pointer;
    }
    #${id}>ul:last-child>li.active{
      background-color: red;
    }
  `;
  head.appendChild(style);

}

