phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#FFFFFF';

    var x = -4.8;
    var margin = 3.2;
    var wait = 0;
    var interval = 200;
    this.textBlock(x,-6,"テ",111,wait);
    this.textBlock(x+=margin,-6,"ト",222,wait+=interval);
    this.textBlock(x+=margin,-6,"リ",333,wait+=interval);
    this.textBlock(x+=margin,-6,"ス",444,wait+=interval);
    x = -4.8;
    this.textBlock(x+=margin,-3.9,"工",55,wait+=interval);
    this.textBlock(x+=margin,-3.9,"場",666,wait+=interval);
    x = -3.2;    
    this.textBlock(x+=margin,-1.8,"R",353,wait+=400);
    
    this.wait =0;

    var startlabel;
    startlabel = Label('スタート').addChildTo(this);
    startlabel.setPosition(this.gridX.center(),this.gridY.center(4));
    startlabel.strokeWidth = 8;
    startlabel.fontSize = 88; // フォントサイズを変更
    startlabel.fill= "hsla({0}, 80%, 45%, 0.75)".format(200);; // フォントサイズを変更
    startlabel.fontFamily = "def"; // フォントサイズを変更    
    startlabel.tweener
    .clear()
    .to({alpha:1,scaleX:1,scaleY:1}, 700,"easeOutSine")
    .wait(400)
    .to({alpha:0,scaleX:0.8,scaleY:0.8}, 700,"easeInSine")
    .setLoop(true);


    for (var index = 0; index < 5; index++) {
      var color = 100;
      var Te = DisplayElement().addChildTo(this);
      Te.x = BLOCK_SIZE * index + BLOCK_SIZE /2;
      Te.y = SCREEN_HEIGHT - (BLOCK_SIZE /2);      Te.block = RectangleShape().addChildTo(Te);
      Te.block.width = BLOCK_SIZE -10;
      Te.block.height = BLOCK_SIZE -10;
      Te.block.stroke =  "hsla({0}, 40%, 45%, 1)".format(color);  
      Te.block.fill =  "hsla({0}, 80%, 45%, 0.75)".format(color);
      Te.block.strokeWidth = 10;  
      Te.block.cornerRadius = 10;  
        

  }

  },

  update: function(app){

  },

  textBlock:function(x,y,text,color,wait){

    var Te = DisplayElement().addChildTo(this);
    Te.setPosition(this.gridX.center(12),this.gridY.center(y));
    Te.block = RectangleShape().addChildTo(Te);

    Te.block.width = BLOCK_SIZE -10;
    Te.block.height = BLOCK_SIZE -10;
    Te.block.stroke =  "hsla({0}, 40%, 45%, 1)".format(color);  
    Te.block.fill =  "hsla({0}, 80%, 45%, 0.75)".format(color);
    Te.block.strokeWidth = 10;  
    Te.block.cornerRadius = 10;  

    Te.label = Label().addChildTo(Te);
    Te.label.text = text;
    Te.label.strokeWidth = 8;
    Te.label.fontSize = 112; // フォントサイズを変更
    Te.label.fill= "white"; // フォントサイズを変更
    Te.label.fontFamily = "def"; // フォントサイズを変更    
    if(text == "R"){
      Te.label.fontSize = 132; // フォントサイズを変更      
      Te.label.fontFamily = "en"; // フォントサイズを変更
    }
    

    var self = this;
    var waittime = this.wait;
    

    Te.tweener
    .clear()
    .wait(wait)
    .to({x:self.gridX.center(x)}, 700,"easeOutSine");

  },


  onclick(){
    
        if(!this.StartFLG){
          SoundManager.play("Catch");
          this.exit();
    
          //Debug
          //this.exit();
          //
        }
  },

  Start: function(){
    this.exit();
  },

});
