"use strict";
function Result(){

  var self=this;

  this.x=0;
  this.y=0;
  this.width=500;
  this.height=100;
  this.lastTime=0;
  this.showTime=0;
  this.currentTime=0;
  this.visible;



  this.cycle=function()
  {
    if(game.gameStatus==GAME_STATUS_RESULT)
    {

      if(self.lastTime==0)
      {
        self.lastTime=(new Date()).getTime();
      }
      else{
        self.currentTime=(new Date()).getTime();
        self.showTime+=(self.currentTime-self.lastTime);

        if(self.showTime>200)
        {
          self.visible=!self.visible
          this.lastTime=0;
          this.showTime=0;

        }
        else self.lastTime=self.currentTime;

      }
    }

  };

  this.paint=function(context)
  {
    if(game.gameStatus!=GAME_STATUS_RESULT||!self.visible)
    return ;
    context.font = "italic bold 40px Tahoma";

      context.fillStyle = "white";
      context.fillText(game.lucky+'% Lucky',self.x,self.y);
  }
}
