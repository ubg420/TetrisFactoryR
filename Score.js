phina.define("Score", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit();

        this.x =100;
        this.y = 50;

        this.vx = 0;
        this.vy = 0;
        this.g  = 0;

        this.width = 22;
        this.height = 22;

        this.MoveMode = "Normal"

        this.scaleX = 1;
        this.scaleY = 1;

        this.setBoundingType("rect");
        this.color = "hsla(133, 100%, 50%, 1)";
        this.ColisionFLG = false;

        this.Score = 0;

        this.label = Label("Score").addChildTo(this);
        this.label.fontSize = 52; // フォントサイズを変更
        this.label.x = 0;
        this.label.fill = BlockColor;

        this.ScoreLabel = Label(("      0" + this.Score).substr(-9)).addChildTo(this);
        this.ScoreLabel.text = this.Score;
        this.ScoreLabel.strokeWidth = 8;
        this.ScoreLabel.fontSize = 52; // フォントサイズを変更
        this.ScoreLabel.x = 202; // フォントサイズを変更
        
      //  this.ScoreLabel.fontFamily = 'e_bullet';

        
        this.addScore = Label('').addChildTo(this);
        this.MissScoreLabel = Label('').addChildTo(this);
        
        

      },

      update: function(app) {
        var p = app.pointer;
        
    
      },

      AddScore:function(point){


        point = Math.floor(point * (1 + (GAMEMAIN.Combo / 2)));
        
        this.Score += point;

        this.ScoreLabel.text = this.Score;
        this.ScoreLabel.fill = BlockColor;
        this.label.fill = BlockColor;
        

      },


});

