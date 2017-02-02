var Yzp=function(query){
  if(query.match(/#/)){
      var object=new YzpElement();
      object.element=document.querySelector(query);
      return object;
  }else{
    var objectList=[];
    for(var i=0;i<document.querySelectorAll(query).length;i++){
      var object=new YzpElement();
      object.element=document.querySelectorAll(query)[i];
      objectList.push(object);
    }
      return objectList;
  }
}

function YzpElement(){
  this.element=null;
  /*获取元素父节点*/
  this.getParent=function(){
    function YzpObject(){
      YzpElement.call(this);
    };
    var result=new YzpObject();
    result.element=this.element.parentNode;
    return result;
  };
  /*只获取元素节点,当参数为数字时返回对应下标的子对象,当参数为字符串且该字符串不为
  “first”于“last”时返回对应标签的集合，当输入参数为空时放回全部子对象*/
  this.getChildren=function(input){
    var allChildren=[];
    function YzpObject(){
      YzpElement.call(this);
    };
    for(var i=0;i<this.element.children.length;i++){
      var object=new YzpObject();
      object.element=this.element.children[i];
      allChildren.push(object);
    }
    if(typeof(input)=="number"){
      return allChildren[input];
    }else if(input instanceof Array){
      var result=[];
      for(var i=0;i<input.length;i++){
        result.push(allChildren[input[i]]);
      }
      return result;
    }else if(typeof(input)=="string"){
      if(input=="last"){
          return allChildren[allChildren.length-1];
      }else if(input=="first"){
          return allChildren[0];
      }else{
        var result=[];
        for(var i=0;i<allChildren.length;i++){
          if(allChildren[i].tagName==input){
            result.push(allChildren[i]);
          }
        }
      }
    }else{
      return allChildren;
    }
  };
  /*获取元素之前的同辈元素，如果入参为数字，那么返回对应位置的同类元素，例如当数值为1时
  返回前一个元素。当入参为数组时，返回对应位置的一系列元素，例如当值为[1,2]时返回前一位
  及前两位元素。当入参为字符串时返回之前的对应标签的一系列元素集合
  */
  this.getPrevsibling=function(input){
    var elementList=this.getParent().getChildren();
    var index=yzpLibrary.getIndexOfList(this,elementList);
    if(typeof(input)=="number"){
      return elementList[index-input];
    }else if(input instanceof Array){
      var result=[];
      for(var i=0;i<input.length;i++){
        result.push(elementList[index-input[i]]);
      }
      return result;
    }else if(typeof(input)=="string"){
      var result=[];
      for(var i=0;i<index;i++){
        if(elementList[i].element.tagName==input.toUpperCase()){
            result.push(elementList[i]);
        }
      }
      return result;
    }else{
      return elementList;
    }
  };
  /*获取元素之后的同辈元素，如果入参为数字，那么返回对应位置的同类元素，例如当数值为1时
  返回后一个元素。当入参为数组时，返回对应位置的一系列元素，例如当值为[1,2]时返回后一位
  及后两位元素。当入参为字符串时返回之后的对应标签的一系列元素集合
  */
  this.getNextsibling=function(input){
    var elementList=this.getParent().getChildren();
    var index=yzpLibrary.getIndexOfList(this,elementList);
    if(typeof(input)=="number"){
      return elementList[index+input];
    }else if(input instanceof Array){
      var result=[];
      for(var i=0;i<input.length;i++){
        result.push(elementList[index+input[i]]);
      }
      return result;
    }else if(typeof(input)=="string"){
      var result=[];
      for(var i=index;i<elementList.length;i++){
        if(elementList[i].element.tagName==input.toUpperCase()){
            result.push(elementList[i]);
        }
      }
      return result;
    }else{
      return elementList;
    }
  };
  /*获取元素的真实宽度(包括padding)*/
  this.getWidth=function(){
      return this.element.offsetWidth;
  };
  /*获取元素真实高度*/
  this.getHeight=function(){
    return this.element.offsetHeight;
  };
  this.getAttribute=function(attr){
    return this.element.getAttribute(attr);
  };
  this.setAttribute=function(attr,value){
    this.element.setAttribute(attr,value);
    return this;
  };
  this.getStyle=function(){
    return this.element;
  };
  /*设定元素样式，入参型如{key:value,key1:value1,key2:value2}*/
  this.setStyle=function(style){
    for(key in style){
        this.element.style[key]=style[key];
    }
    return this;
  };
  this.setInnerhtml=function(innerHTML){
    this.element.innerHTML=innerHTML;
    return this;
  };
  /*删除子元素,当接受参数为数数字或数组时删除对应下标的子元素,当接受参数为字符串时删除
  对应标签，当没有接受参数时删除全部子元素*/
  this.removeChildren=function(input){
    var childrenList=this.getChildren();
    if(typeof(input)=="number"){
      this.element.removeChild(childrenList[input]);
    }else if(input instanceof Array){
      for(var i=0;i<input.length;i++){
        var key=input[i];
        var removeElement=childrenList[key].element;
        this.element.removeChild(removeElement);
      }
    }else if(typeof(input)=="string"){
      var childrenList=this.getChildren();
      for(var i=0;i<childrenList.length;i++){
        if(childrenList[i].element.tagName==input.toUpperCase()){
          var removeElement=childrenList[i].element;
          this.element.removeChild(removeElement);
        }
      }
    }else{
      this.element.innerHTML='';
    }
    return this;
  };
  /*追加子元素,以字符串形式*/
  this.addChildren=function(children) {
    var wrap=document.createElement("div");
    wrap.innerHTML=children;
    this.element.appendChild(wrap);
    return this;
  };
  /*元素事件监听兼容ie8*/
  this.setEventlistener=function(eventType,callback,boolean){
    var This=this;
    if(this.element.addEventListener){
      this.element.addEventListener(eventType,function(event){
        callback.call(This,event);
      },boolean);
    }else{
      this.element.attachEvent(eventType,function(event){
        callback.call(This,event);
      },boolean);
    }
    return this;
  }
}

var yzpLibrary={
  /*获取远程数据*/
  getData:function(option,callback){
    var http=new XMLHttpRequest();
    http.timeout=3000;
    http.ontimeout=function(e){
      console.log("请求超时");
    };
    http.onerror=function(e){
      console.log("发生错误");
    };
    http.onreadystatechange=function(){
      if(http.readyState==4&&http.status==200){
        var data=JSON.parse(http.responseText);
        callback(data);
      }
    }
    if(option.math=="GET"){
      http.open('GET',option.url,true);
      http.send();
    }else{
      http.open('POST',option.url,true);
      http.send(option.data);
    }
  },
  /*获取元素在list中的下标*/
  getIndexOfList:function(element,elementList){
    for(var i=0;i<elementList.length;i++){
      if(element.element==elementList[i].element){
        return i;
      }else{
        continue;
      }
    }
    return null;
  },
  /*获取鼠标相对于事件源的坐标*/
  getOffset:function(event){
    if(event.offsetX){
      return {offsetX:event.offsetX,offsetY:event.offsetY}
    }else{
      return {offsetX:event.layerX,offsetY:event.layerY}
    }
  },
  createYzpElement:function(tagName){
    var newelement=new YzpElement();
    newelement.element=document.createElement(tagName);
    return newelement;
  }
}
