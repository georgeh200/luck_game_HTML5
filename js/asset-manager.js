"use strict";

function AssetManager() {
  this.background=null;
  this.arrImages=[];
  this.arrowLeft=null;
  this.arrowRight=null;
  this.predict=null;
  this.spin=null;
  this.logo=new Image();
  this.logo.src="res/logo.jpg";

  this.successCount = 0;
   this.errorCount = 0;
 this.downloadQueue = [];
  this.cache = {};
}

AssetManager.prototype.cycle = function(canvas) {

}

AssetManager.prototype.paint = function(context) {

context.font = "18px Arial";
  context.fillStyle = "green";
  if(this.errorCount>0)
  {

    context.fillStyle = "red";
    context.fillText("Error download resources",10,GAME_HEIGHT/2-100);
    context.fillText("we are sorry, Game can not start",10,GAME_HEIGHT/2-60);

  }
  else context.fillText("Loading",GAME_WIDTH/2-50,GAME_HEIGHT/2-50);
   context.fillRect(10,GAME_HEIGHT/2-20,(GAME_WIDTH-20)*(this.successCount+this.errorCount)/this.downloadQueue.length,40);
   context.drawImage(this.logo,0,0);
}




AssetManager.prototype.start = function(callback) {

var self=this;
var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
   if (xhttp.readyState == 4 && xhttp.status == 200) {

     var resObject = JSON.parse(xhttp.responseText);
     for (var k in resObject) {
             if (resObject.hasOwnProperty(k)) {

                 self.queueDownload(resObject[k]);
             }
         }




     self.downloadAll(function() {

       var success=(self.errorCount===0);
       if(success)
       {
         self.arrImages[0]=self.getAsset(resObject.sym2);
        self.arrImages[1]=self.getAsset(resObject.sym3);
        self.arrImages[2]=self.getAsset(resObject.sym4);
        self.arrImages[3]=self.getAsset(resObject.sym5);
        self.arrImages[4]=self.getAsset(resObject.sym6);
        self.background=self.getAsset(resObject.bg);
          self.arrowLeft=self.getAsset(resObject.arrowLeft);
            self.arrowRight=self.getAsset(resObject.arrowRight);
              self.predict=self.getAsset(resObject.predict);
              self.spin=self.getAsset(resObject.spin);

       }
    callback(success);

     });



   }
 };
 xhttp.open("GET", "res.json", true);
 xhttp.send();


}

AssetManager.prototype.queueDownload = function(path) {
   this.downloadQueue.push(path);
}

AssetManager.prototype.isDone = function() {
   return (this.downloadQueue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.getAsset = function(path) {
   return this.cache[path];
}

AssetManager.prototype.downloadAll = function(downloadCallback) {
var self = this;


 if (self.downloadQueue.length === 0) {
     downloadCallback();
 }
var index=0
 function downloadIndex()
 {
   console.log('downloadIndexdownloadIndex:',index);
   var path = self.downloadQueue[index];

   var img = new Image();

   img.addEventListener("load", function() {
       // coming soon
       self.successCount += 1;
       if (self.isDone()) {
        downloadCallback();
   }
   }, false);
   img.addEventListener("error", function() {

       self.errorCount += 1;
       if (self.isDone()) {
        downloadCallback();
   }
   }, false);
   img.src = path;
   self.cache[path] = img;
   index++;
   if(index<self.downloadQueue.length)
   setTimeout(downloadIndex,200);
 }

 downloadIndex(index);

}
