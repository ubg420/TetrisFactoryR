phina.define('CountDownScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#FFFFFF';

    this.Start();


  },

  update: function(app){

  },


  Start: function(){
    this.children.clear();      

    SoundManager.play("Clear");
    var self = this;
    var startlabel;
    startlabel = Label('3').addChildTo(this);
    startlabel.setPosition(this.gridX.center(),this.gridY.center());
    startlabel.strokeWidth = 8;
    startlabel.fontSize = 128; // フォントサイズを変更
    startlabel.fill= "hsla({0}, 80%, 45%, 0.75)".format(200); // フォントサイズを変更
    startlabel.scaleX = 0; // フォントサイズを変更    
    startlabel.scaleY = 0; // フォントサイズを変更    
    startlabel.tweener
    .clear()
    .to({alpha:1,scaleX:1,scaleY:1}, 300,"easeOutSine")
    .wait(400)
    .call(function(){
      SoundManager.play("Clear");
      startlabel.scaleX = 0; 
      startlabel.scaleY = 0;    
      startlabel.text = "2";    
     })
    .to({alpha:1,scaleX:1,scaleY:1}, 300,"easeOutSine")    
    .wait(400)
    .call(function(){
      SoundManager.play("Clear");
      startlabel.scaleX = 0; 
      startlabel.scaleY = 0;    
      startlabel.text = "1";    
     })    
     .to({alpha:1,scaleX:1,scaleY:1}, 300,"easeOutSine")         
     .wait(400)     
    .call(function(){
        startlabel.remove();
        self.exit();
        
    })

  },

});



    //	this.x = this.mx + GameMain.Player.x;
    //	this.y = this.my + GameMain.Player.y;
