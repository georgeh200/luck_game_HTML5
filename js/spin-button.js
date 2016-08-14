"use strict";
function SpinButton(){

  var self=this;

  this.x=0;
  this.y=0;
  this.width=100;
  this.height=100;



  this.cycle=function()
  {

  };

  this.paint=function(context)
  {
    if(game.gameStatus==GAME_STATUS_SPINNING)
    return ;
      context.drawImage(assetManager.spin,this.x+this.width/2-assetManager.spin.width/2,this.y+this.height/2-assetManager.spin.height/2);

  }

  this.mousemove=function(x,y)
  {
if(game.gameStatus==GAME_STATUS_SPINNING)
return false;
    if(x>=self.x&&x<=self.x+self.width
    &&y>=self.y&&y<=self.y+self.height)
    {
    document.getElementById("canvas").style.cursor = "pointer";

        return true;
    }
    false;

  };


  this.mousedown=function(x,y)
  {
    if(game.gameStatus==GAME_STATUS_SPINNING)
    return false;
    if(x>=self.x&&x<=self.x+self.width
    &&y>=self.y&&y<=self.y+self.height)
    {

      game.spin();
        return true;
    }
    false;

  };


};
