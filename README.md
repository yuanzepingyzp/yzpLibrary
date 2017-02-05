# yzpLibrary
my javascript library
##Useage
```javascript
Yzp("li")[2].getParent().getChildren()[0].setStyle({color:"red"});
```
##总结
###javascript对于dom的操作其实可以分为两类，get方法与set方法，对于get方法因为其返回的是对象或对象集合，所以要实现链式调用就需要使得返回的对象或对象集合继承当前对象的方法，可以利用call或apply来实现继承，而对于set方法则只需要return this即可。
