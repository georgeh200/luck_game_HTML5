"use strict";

var GAME_STATUS_LOADING=0;
var GAME_STATUS_START=1;
var GAME_STATUS_SPINNING=2;
var GAME_STATUS_RESULT=3;
var GAME_WIDTH=960;
var GAME_HEIGHT=536;

var assetManager=null;
var game=null;
window.onload= function ()
{
 assetManager=new   AssetManager();
     game=new Game();
    game.start();
}

function Game()
{
  var self=this;
  this.width=GAME_WIDTH;
  this.height=GAME_HEIGHT;
  this.gameStatus=GAME_STATUS_LOADING;
  this.spinView=null;
  this.navigator=null;
  this.spinButton=null;
  this.resultView=null;
  this.lucky=0;
  this.showResultTime=0;


    this.canvas = document.getElementById('canvas');
    this.initializeObjects=function(){
      self.spinView=new SpinView();
      self.navigator=new Navigator();
      self.spinButton=new SpinButton();
      self.resultView=new Result();
    };
    this.positionObjects=function(){
      self.spinView.x=20;
      self.spinView.y=150;
      self.navigator.x=530;
        self.navigator.y=150;
        self.spinButton.x=330;
          self.spinButton.y=300;

          self.resultView.x=300;
            self.resultView.y=100;

    };
    this.start = function() {
      self.context = this.canvas.getContext("2d");

      self.initializeObjects();
      self.positionObjects();



        setInterval(this.cycle, 1000/30);
      assetManager.start(function(success){
        if(success==true)
        {


          self.canvas.addEventListener('mousemove',function(event){
            var rect = self.canvas.getBoundingClientRect();
              var x=(event.clientX - rect.left);
              var y=(event.clientY - rect.top);
              var handled=self.navigator.mousemove(x,y);
              if(!handled)
              handled=self.spinButton.mousemove(x,y);
              if(!handled)
              document.getElementById("canvas").style.cursor = "auto";

          },false);

          self.canvas.addEventListener('mousedown',function(event){
            var rect = self.canvas.getBoundingClientRect();
              var x=(event.clientX - rect.left);
              var y=(event.clientY - rect.top);
              var handled=self.navigator.mousedown(x,y);
  if(!handled)
  handled=self.spinButton.mousedown(x,y);
              if(!handled)
              document.getElementById("canvas").style.cursor = "auto";

          },false);


            self.gameStatus=GAME_STATUS_START;
        }

      });

    };

    this.clear = function() {
        self.context.clearRect(0, 0, this.width, this.height);
    } ;
    ///////////////////
    this.cycle=function()
    {
      self.spinView.cycle();


      self.resultView.cycle();
      self.paint();
    };
    //////
    this.paint=function()
    {
      self.clear();
      if(self.gameStatus==GAME_STATUS_LOADING)
      {
        assetManager.paint(self.context);
        return;
      }

      self.context.drawImage(assetManager.background,0,0);
      self.spinView.paint(self.context);
        self.navigator.paint(self.context);
        self.spinButton.paint(self.context);
        self.context.drawImage(assetManager.logo,0,0);
        self.resultView.paint(self.context);

    };
    this.spin=function()
    {
      self.navigator.enabled=false;
      self.gameStatus=GAME_STATUS_SPINNING;
      self.spinView.spin();
    };

    this.spinFinish=function(){
      var diff=Math.abs(self.spinView.currentIndex-self.navigator.currentIndex);

      if(diff==0) self.lucky=100;
      else
      {
        self.lucky=100-(diff*20);

        self.lucky=Math.floor(Math.random() * (20))+self.lucky;
    }
    self.navigator.enabled=true;
      self.gameStatus=GAME_STATUS_RESULT;

    };




}
