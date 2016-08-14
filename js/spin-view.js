"use strict";

function SpinView(){

    var self=this;
    this.x=0;
    this.y=0;
    this.width=250;
    this.height=250;
    this.currentIndex=-1;
    this.spinTimes=1000000;

    this.spin=function()
    {
      self.spinTimes=0;

    }

  this.cycle=function()
  {
    if(self.spinTimes<50)
    {
    self.currentIndex=Math.floor(Math.random() * 5);
    self.spinTimes++;
  }
    else if(game.gameStatus==GAME_STATUS_SPINNING) {
      game.spinFinish();
    }



  };

  this.paint=function(context)
  {

    context.drawImage(assetManager.predict,self.x+self.width/2-assetManager.predict.width/2
      ,self.y+self.height/2-assetManager.predict.height/2);

      if(self.currentIndex>=0)
      {

        if(game.gameStatus==GAME_STATUS_SPINNING)
        context.drawImage(assetManager.arrImages[self.currentIndex],self.x+85,self.y+95,70,50);
        else if(game.gameStatus==GAME_STATUS_RESULT)
      context.drawImage(assetManager.arrImages[self.currentIndex],
        this.x+this.width/2-assetManager.arrImages[self.currentIndex].width/2
        ,this.y+this.height-assetManager.arrImages[self.currentIndex].height+30);
      }


  }

}
