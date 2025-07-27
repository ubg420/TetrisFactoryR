phina.define('TutorialScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#FFFFFF';


    this.bggroup = DisplayElement().addChildTo(this);

    var self = this;

    var bg = Sprite('Setumei1').addChildTo(this.bggroup);
    bg.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.setPosition(this.gridX.center(18),this.gridY.center());
    bg.tweener
      .clear()
      .to({x:self.gridX.center()}, 700,"easeOutSine");




    var startlabel;
    startlabel = Label('つぎへ').addChildTo(this);
    startlabel.setPosition(this.gridX.center(6.2),this.gridY.center(7));
    startlabel.strokeWidth = 8;
    startlabel.fontSize = 58; // フォントサイズを変更
    startlabel.fill= "hsla({0}, 80%, 45%, 0.75)".format(200); // フォントサイズを変更
    startlabel.fill= "white"; // フォントサイズを変更
    
    startlabel.fontFamily = "def"; // フォントサイズを変更    
    this.pagecnt = 0;
    
    
/*
    OK.onpointend = function(e) {
      if(self.pagecnt == 0){
        var bg = Sprite('Setumei2').addChildTo(self.bggroup);
        bg.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        bg.setPosition(self.gridX.center(12),self.gridY.center());
        bg.tweener
          .clear()
          .to({x:self.gridX.center()}, 700,"easeOutSine");
        self.pagecnt++;
      }
      else if(self.pagecnt == 1){

        var bg = Sprite('Setumei3').addChildTo(self.bggroup);
        bg.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        bg.setPosition(self.gridX.center(12),self.gridY.center());
        bg.tweener
          .clear()
          .to({x:self.gridX.center()}, 700,"easeOutSine");
        self.pagecnt++;

      }
      else if(self.pagecnt == 2){

            self.exit();

      }

    };
*/


  },

  update: function(app){

  },

  update: function(app){

  },

  onpointend: function(){
    if(this.pagecnt == 0){
      var bg = Sprite('Setumei2').addChildTo(this.bggroup);
      bg.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      bg.setPosition(this.gridX.center(12),this.gridY.center());
      bg.tweener
        .clear()
        .to({x:this.gridX.center()}, 700,"easeOutSine");
      this.pagecnt++;
      SoundManager.play("Catch");
      
    }
    else if(this.pagecnt == 1){

      var bg = Sprite('Setumei3').addChildTo(this.bggroup);
      bg.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      bg.setPosition(this.gridX.center(12),this.gridY.center());
      bg.tweener
        .clear()
        .to({x:this.gridX.center()}, 700,"easeOutSine");
      this.pagecnt++;
      SoundManager.play("Catch");
      

    }
    else if(this.pagecnt == 2){
      var bg = Sprite('Setumei4').addChildTo(this.bggroup);
      bg.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      bg.setPosition(this.gridX.center(12),this.gridY.center());
      bg.tweener
        .clear()
        .to({x:this.gridX.center()}, 700,"easeOutSine");
      this.pagecnt++;
      SoundManager.play("Catch");
      

    }
    else if(this.pagecnt == 3){
      this.pagecnt++;
      this.exit();
      SoundManager.play("Catch");
      
      
    }
  },



});


phina.define("OKButton", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit();

        this.x = SCREEN_WIDTH /2 ;
        this.y = 1185;
        this.sprite = Sprite('OK').addChildTo(this);

    },

    update: function(app) {

    },


    onpointend: function(){

    },

});


    //	this.x = this.mx + GameMain.Player.x;
    //	this.y = this.my + GameMain.Player.y;
