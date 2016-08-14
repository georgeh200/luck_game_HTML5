"use strict";

function Navigator(){

  var self=this;
  this.currentIndex=1;
  this.x=0;
  this.y=0;
  this.width=400;
  this.height=200;
  this.enabled=true;



  this.cycle=function()
  {

  };

  this.paint=function(context)
  {
      context.font = "italic bold 20px Tahoma";
      context.fillStyle = "green";
      context.fillRect(self.x+40,self.y,self.width-65,30);
        context.fillStyle = "white";
        context.fillText('Select image of luck :)',self.x+50,self.y+20);
      var img=assetManager.arrImages[self.currentIndex];
      context.drawImage(img,this.x+this.width/2-img.width/2,this.y+this.height/2-img.height/2);
      context.drawImage(assetManager.arrowLeft,this.x+10,this.y+self.height/2-assetManager.arrowLeft.height/2);
      context.drawImage(assetManager.arrowRight,this.x+this.width-10-assetManager.arrowRight.width,self.y+self.height/2-assetManager.arrowRight.height/2);
  }

  this.mousemove=function(x,y)
  {

    if(self.enabled&&x>=self.x&&x<=self.x+self.width
    &&y>=self.y&&y<=self.y+self.height)
    {
      if(x>=self.x+self.width-assetManager.arrowRight.width-15)
      {
        document.getElementById("canvas").style.cursor = "pointer";
      }
      else
      if(x<=self.x+assetManager.arrowLeft.width+15)
      {

        document.getElementById("canvas").style.cursor = "pointer";
      }
      else {
        document.getElementById("canvas").style.cursor = "auto";
      }

        return true;
    }
    false;

  };


  this.mousedown=function(x,y)
  {

    if(self.enabled&x>=self.x&&x<=self.x+self.width
    &&y>=self.y&&y<=self.y+self.height)
    {
      if(x>=self.x+self.width-assetManager.arrowRight.width-15)
      {  self.currentIndex++;
        self.currentIndex%=assetManager.arrImages.length;

      }
      else
      if(x<=self.x+assetManager.arrowLeft.width+15)
      {
        self.currentIndex--;
        if(self.currentIndex==-1)
        self.currentIndex=assetManager.arrImages.length-1;

      }

        return true;
    }
    false;

  };

};
