phina.define("MainScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,

    });
    GAMEMAIN = this;

    var label = Label('Start').addChildTo(this);
    label.setPosition(this.gridX.center(),this.gridY.center());
    label.fill = "hsla({0}, 80%, 45%, 0.75)".format(200); // 色を変更
    label.strokeWidth = 8;
    label.fontSize = 114; // フォントサイズを変更
    label.scaleY = 1; // フォントサイズを変更
    label.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .to({scaleX:5,scaleY:5,alpha:0}, 500)    
    .call(function(){
        label.remove();
    })
    


    //ローテーション時つかうブロックマップの初期化
    this.NextBmap = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]

    ];

    //お手本
    this.otehon = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];

    this.Bmap = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];
    this.OtehonPattern = 7;
    
    EffectGroup = DisplayElement().addChildTo(this); //ブロックグループ作成
    

//    BlockGroup = DisplayElement().addChildTo(this); //ブロックグループ作成
    ShootBlockGroup = DisplayElement().addChildTo(this); //ブロックグループ作成
    OtehonGroup = DisplayElement().addChildTo(this);//お手本ブロックグループ作成
    this.SetOtehonBlock();    
    
    ColisionGroup = DisplayElement().addChildTo(this); //ブロックグループ作成
    this.Blocks = Blocks().addChildTo(this);




    //スコアとコンボ数
    this.point = 0;
    this.combo = 0;



    
    //ブロックのパターン数
    this.pattern = 8;

    //this.OtehonCreate(this.pattern);


    this.GunGroup = DisplayElement().addChildTo(this); //ブロックグループ作成
    
    for (var index = 0; index < 5; index++) {
        var gun = Gun(index).addChildTo(this.GunGroup);
        
/*
        var line = RectangleShape().addChildTo(this);
        line.width = BLOCK_SIZE -2;
        line.height = SCREEN_HEIGHT + 100;


        line.y = SCREEN_HEIGHT /2;
        line.x = BLOCK_SIZE * index + BLOCK_SIZE /2;

        line.alpha = 0.2; //コリジョン可視化 = 1
        line.stroke = 'AAAAAA';  
        line.fill = '';  
        line.strokeWidth = 3;  
        line.cornerRadius = 10;  
 */ 

    }
    

    var flickArea = RectangleShape().addChildTo(this);
    flickArea.width = SCREEN_WIDTH;
    flickArea.height = SCREEN_HEIGHT -20;
    flickArea.setPosition(this.gridX.center(),this.gridY.center(-2));
    flickArea.alpha = 0; //コリジョン可視化 = 1
    flickArea.stroke = 'Black';  
    flickArea.fill = 'red';  
    flickArea.strokeWidth = 10;  
    flickArea.cornerRadius = 10;  

    var flickable = Flickable().attachTo(flickArea);
    // 横のみ許可
    flickable.horizontal = false;
    flickable.vertical = false;
    var self = this;

    this.TouchFLG = false;

    flickable.onflickstart = function(e) {

          var angle = e.direction.toAngle().toDegree()|0;

          var top_u = 280;
          var top_l = 100;
          var left = 180;
          var right = 360
          

        //左
        if (100 < angle && angle < 240) {
            self.Blocks.RotationLeft();
            
        }

        if (0 <= angle && angle < 80  || 270 < angle && angle <=360) {
            self.Blocks.RotationRight();
            
        }
    };

    flickable.onflickcancel = function(e) {
      this.cancel();

    };

    this.timerlabel = Label('Time:').addChildTo(this);
    this.timerlabel.setPosition(this.gridX.center(6.2),this.gridY.center(-7.2));
    this.timerlabel.fill = BlockColor; // 色を変更
    this.timerlabel.strokeWidth = 8;
    this.timerlabel.fontSize = 64; // フォントサイズを変更

    this.timer = 90000;
  //  this.timer = 3000;
    

    this.score = Score().addChildTo(this);
    this.score.ScoreLabel.fill = BlockColor;
    

    this.Combo = 0;


    this.GameOverFLG = false;
    SoundManager.playMusic("Bgm");
    

  },




  update: function(app) {
    if(!this.GameOverFLG){
        this.timer -= app.deltaTime;
        this.timerlabel.text = Math.floor(this.timer / 1000);    
        if(this.timer < 800){
            this.GameOverFLG = true;
            this.GameOver();
        }


    }else{

    }
    

  },

  GameOver: function() {

    SoundManager.play('Timeup');
    SoundManager.stopMusic("Bgm");
    
   //this.GunGroup.children.clear();
    OtehonGroup.children.clear();
    ColisionGroup.children.clear();    
    this.Blocks.children.clear();
    this.Blocks.remove();    
    this.timerlabel.remove();
    this.timerlabel.remove();
    this.score.label.remove();    
    this.score.ScoreLabel.remove();    
    
    var timeup;
    timeup = Label('タイムアップ').addChildTo(this);
    timeup.fill = BlockColor; // 色を変更
    timeup.fontSize = 104; // フォントサイズを変更
    timeup.x = GAMEMAIN.gridX.center(12);
    timeup.y = GAMEMAIN.gridY.center(-3);
    timeup.fontFamily = "def";    
    timeup.tweener.clear()
    .to({x:GAMEMAIN.gridX.center()}, 800,"easeOutQuart")
    .wait(1000)    
    .to({scaleY:0}, 500,"easeOutQuart")
    
    .call(function(){
        var result = Result().addChildTo(GAMEMAIN);
        timeup.remove();

    })
  },
    
    
  Succes: function(hit) {

    this.Combo = 0;

    OtehonGroup.children.clear();
    SoundManager.play("Clear");
    
    var shape = CircleShape().addChildTo(EffectGroup);
    // 位置を指定
    shape.setPosition(this.Blocks.x, this.Blocks.x);
    shape.fill = '';
    shape.stroke = BlockColor;
    
    shape.radius  = 80;
    shape.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .to({alpha:0,radius:190,scaleX:2,scaleY:2}, 700,"easeOutCubic")
    
    .call(function(){
      shape.remove();
    })


/*
    var shape = CircleShape().addChildTo(EffectGroup);
    // 位置を指定
    shape.setPosition(this.Blocks.x, this.Blocks.x);
    shape.fill = BlockColor;
    shape.stroke = '';
    
    shape.radius  = 80;
    shape.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .to({radius:200,scaleX:2,scaleY:0.2}, 700,"easeOutCubic")
    
    .call(function(){
      shape.remove();
    })

    var shape2 = CircleShape().addChildTo(EffectGroup);
    // 位置を指定
    shape2.setPosition(this.Blocks.x, this.Blocks.x);
    shape2.fill = 'white';
    shape2.stroke = '';
    
    shape2.radius  = 80;
    shape2.tweener
    .clear()
    .wait(53)
    .to({radius:200,scaleX:2,scaleY:0.3}, 600,"easeOutCubic")
    .wait(222)    
    .call(function(){
        shape2.remove();
    })
*/
    this.SetOtehonBlock();
    
    var eg = this.GunGroup.children;
    var self = this;
    eg.each(function(Object) {
        Object.colision.fill = BlockColor;  
        Object.colision.stroke = strokeColor;  
        
    });
    this.timerlabel.fill = BlockColor;
    this.score.AddScore(hit * 50);
    
  },

  Perfect: function(hit) {


    SoundManager.play("Perfect");
    
    EffectGroup.children.clear();
    
    OtehonGroup.children.clear();
    this.OtehonPattern+=2;
    
    this.Combo++;

    var self = this;
    
    var label = Label('Perfect').addChildTo(this);
    label.setPosition(this.gridX.center(13),this.gridY.center(2));
    label.fill = BlockColor; // 色を変更
    label.strokeWidth = 8;
    label.fontSize = 114; // フォントサイズを変更
    label.scaleY = 1; // フォントサイズを変更
    label.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .to({x:self.gridX.center(-3)}, 300,"easeOutCubic")
    .wait(700)    
    .call(function(){
        label.remove();
    })
    
    
    if(this.Combo > 1){

        var label2 = Label('×'+this.Combo).addChildTo(this);
        label2.setPosition(this.gridX.center(13),this.gridY.center(3.5));
        label2.fill = BlockColor; // 色を変更
        label2.strokeWidth = 8;
        label2.fontSize = 114; // フォントサイズを変更
        
        label2.tweener
        .clear()
    //    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
        .wait(200)    
        .to({x:self.gridX.center(1)}, 300,"easeOutCubic")
        .wait(500)    
        .call(function(){
            label2.remove();
        })
            

    }



        
    var shape = CircleShape().addChildTo(EffectGroup);
    // 位置を指定
    shape.setPosition(this.Blocks.x, this.Blocks.x);
    shape.fill = BlockColor;
    shape.stroke = '';
    
    shape.radius  = 80;
    shape.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .to({radius:250,scaleX:2,scaleY:2}, 700,"easeOutCubic")
    .call(function(){
      shape.remove();
    })

    var shape2 = CircleShape().addChildTo(EffectGroup);
    // 位置を指定
    shape2.setPosition(this.Blocks.x, this.Blocks.x);
    shape2.fill = 'white';
    shape2.stroke = '';
    
    shape2.radius  = 80;
    shape2.tweener
    .clear()
    .wait(35)
    .to({radius:253,scaleX:2,scaleY:2}, 600,"easeOutCubic")
    .wait(222)    
    .call(function(){
        shape2.remove();
    })







    this.SetOtehonBlock();
    
    var eg = this.GunGroup.children;
    var self = this;
    eg.each(function(Object) {
        Object.colision.fill = BlockColor;  
        Object.colision.stroke = strokeColor;  
        
    });

    this.timerlabel.fill = BlockColor;
    
    this.score.AddScore(hit * 100);
    



  },




  OtehonClear:function(){
    
  },
        

  SetOtehonBlock: function(){

    this.OtehonCreate(this.OtehonPattern);

    for (var y = 0; y < 5; y ++) {
      for (var x = 0; x < 5; x ++) {
          if(this.otehon[y][x] == 1){

              //コリジョン
              var oblock = RectangleShape().addChildTo(OtehonGroup);

              oblock.width = BLOCK_SIZE -10;
              oblock.height = BLOCK_SIZE -10;

              oblock.y = (BLOCK_SIZE * y + BLOCK_SIZE /2) + margin_top;
              oblock.x = BLOCK_SIZE * x + BLOCK_SIZE /2;
              
              oblock.stroke = BlockColor;  
              oblock.fill = '';  
              
              oblock.strokeWidth = 10;  
              oblock.cornerRadius = 10;  
              

          }
          else{
             
          }
      }
      if(y >= 5 && x >= 5){
          this.Nextflg = 0;
      }


//      block = blocks(3,3).addChildTo(blockGroup);
      


  }


  },




  OtehonCreate: function(pattern){
    
    var otehonpattern = rand(pattern);

    switch(otehonpattern){
        case 0:
            this.otehon = [
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            
        ];
        this.blockcolor = "blue";
        break;

        case 1:
            this.otehon = [
                [0,0,1,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
            ];

        break;


        case 2:
            this.otehon = [
                [0,0,0,0,0],
                [0,0,1,0,0],
                [0,1,1,1,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
            ];
    

        break;

        case 3:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;
        

        case 4:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,0,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 5:
        this.otehon = [
            [0,0,0,0,0],
            [0,1,0,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 6:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,1,1,1,1],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 7:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 7:
        this.otehon = [
            [0,0,1,1,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 8:
        this.otehon = [
            [0,1,1,0,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 9:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,1,0,0],
            [1,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 9:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,0,0],
            [1,1,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;



        case 10:
        this.otehon = [
            [0,0,0,1,1],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 11:
        this.otehon = [
            [1,1,0,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 12:
        this.otehon = [
            [1,0,0,0,0],
            [1,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 13:
        this.otehon = [
            [0,0,0,0,1],
            [0,0,1,1,1],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 14:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,1,0,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 14:
        this.otehon = [
            [0,0,0,1,0],
            [0,0,0,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 15:
        this.otehon = [
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 16:
        this.otehon = [
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,1,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 17:
        this.otehon = [
            [0,1,1,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 18:
        this.otehon = [
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 19:
        this.otehon = [
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 19:
        this.otehon = [
            [0,1,1,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 20:
        this.otehon = [
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 21:
        this.otehon = [
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;



        case 22:
        this.otehon = [
            [0,1,0,0,0],
            [0,1,1,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 23:
        this.otehon = [
            [0,0,0,1,0],
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 24:
        this.otehon = [
            [0,0,0,1,0],
            [0,0,0,1,1],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 25:
        this.otehon = [
            [0,1,0,0,0],
            [1,1,0,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 27:
        this.otehon = [
            [0,0,1,0,0],
            [0,1,1,0,0],
            [1,1,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 28:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,1,0],
            [0,0,1,1,1],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 29:
        this.otehon = [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 30:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,0,1,1],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];

        break;

        case 31:
        this.otehon = [
            [0,0,0,0,0],
            [1,1,0,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];

        break;


        case 32:
        this.otehon = [
            [0,0,0,0,0],
            [0,1,0,0,0],
            [0,1,1,1,1],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];

        break;


        case 33:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,0,1,0],
            [1,1,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];

        break;


        case 34:
        this.otehon = [
            [0,1,1,0,0],
            [1,0,1,0,0],
            [1,1,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 35:
        this.otehon = [
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,1,1,1],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 36:
        this.otehon = [
            [0,0,1,0,0],
            [0,1,1,0,0],
            [0,0,1,1,1],
            [0,0,0,1,0],
            [0,0,0,0,0],
        ];

        break;


        case 37:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,1,0],
            [1,1,1,0,0],
            [0,1,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 38:
        this.otehon = [
            [0,0,0,0,0],
            [0,0,1,1,0],
            [0,1,1,1,0],
            [0,1,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 39:
        this.otehon = [
            [0,0,0,0,0],
            [0,1,1,0,0],
            [0,1,1,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
        ];

        break;

        case 40:
        this.otehon = [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,1,1,1,1],
            [0,0,0,1,0],
            [0,0,0,0,0],
        ];

        break;

        case 41:
        this.otehon = [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [1,1,1,1,0],
            [0,1,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 42:
        this.otehon = [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,1,1,1,0],
            [0,1,0,1,0],
            [0,0,0,0,0],
        ];

        break;


        case 43:
        this.otehon = [
            [0,1,0,1,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 44:
        this.otehon = [
            [0,0,0,1,1],
            [0,0,1,1,0],
            [0,1,1,0,0],
            [0,1,0,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 45:
        this.otehon = [
            [1,1,0,0,0],
            [0,1,1,0,0],
            [0,0,1,1,0],
            [0,0,0,1,0],
            [0,0,0,0,0],
        ];

        break;

        case 46:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,0,0],
            [1,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 47:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,1,1,1,1],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 48:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,1,0],
            [0,1,1,1,1],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;

        case 49:
        this.otehon = [
            [0,0,1,0,0],
            [0,1,1,0,0],
            [1,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];

        break;



        case 50:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,1,1,1,1],
            [0,1,1,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 51:
        this.otehon = [
            [0,0,1,0,0],
            [0,0,1,0,0],
            [1,1,1,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
        ];

        break;



        case 52:
        this.otehon = [
            [1,1,0,1,1],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        break;


        case 53:
        this.otehon = [
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];
        break;

        case 54:
        this.otehon = [
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
        ];
        break;

        case 55:
        this.otehon = [
            [0,1,1,0,0],
            [0,1,1,0,0],
            [0,1,1,0,0],
            [0,1,1,0,0],
            [0,0,0,0,0],
        ];
        break;


        case 55:
        this.otehon = [
            [0,0,1,1,0],
            [0,0,1,1,1],
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
        ];
        break;

        case 56:
        this.otehon = [
            [0,0,1,1,0],
            [0,1,1,1,0],
            [0,0,1,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
        ];
        break;


        case 57:
        this.otehon = [
            [0,1,1,1,1],
            [0,0,1,0,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];
        break;

        case 58:
        this.otehon = [
            [1,1,1,1,0],
            [0,0,1,0,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];
        break;

        case 59:
        this.otehon = [
            [1,1,1,0,0],
            [0,0,1,0,0],
            [1,1,1,1,1],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];
        break;

        
        case 60:
        this.otehon = [
            [0,0,1,1,1],
            [0,0,1,0,0],
            [1,1,1,1,1],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ];
        break;


        case 61:
        this.otehon = [
            [0,1,1,1,1],
            [0,1,1,0,0],
            [0,0,1,1,1],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];
        break;


        case 62:
        this.otehon = [
            [1,1,1,1,0],
            [0,0,1,1,0],
            [1,1,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];
        break;

        case 62:
        this.otehon = [
            [1,1,0,1,1],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];
        break;


        case 62:
        this.otehon = [
            [1,1,1,1,1],
            [1,0,1,0,1],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
        ];
        break;





        
    }


    

        
    var kaitenkaisu = rand(4)
    for(var i = 0; i < kaitenkaisu; i++){
         this.OtehonRotation();
    }
   

    this.otehoncnt=0;
    
    for (var y = 0; y < 5; y ++) {
    for (var x = 0; x < 5; x ++) {
        if(this.otehon[y][x] == 1){

            this.otehoncnt++;
                
        }
    }


    BlockColor = "hsla({0}, 80%, 45%, 0.75)".format(otehonpattern * 22);
    strokeColor = "hsla({0}, 40%, 45%, 1)".format(otehonpattern * 22);

    }

  },



  OtehonRotation: function(){
    
    //回転処理
    var temp  = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];

    for (var y = 0; y < 5; y ++) {
        for (var x = 0; x <5; x ++) {
            temp[x][y] = this.otehon[4 -y][x];

        }
    }

    for (var y = 0; y < 5; y ++) {
        for (var x = 0; x < 5; x ++) {
            this.otehon[y][x] = temp[y][x];
        }
    }


  },


    OtehonKaiten: function(){

    }

  

});



function rand(n){
  return Math.floor(Math.random() * (n + 1));
}
  