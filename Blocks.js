phina.define("Blocks", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit();

        this.x = BLOCK_SIZE * 2 + BLOCK_SIZE /2;
        this.y = (BLOCK_SIZE * 2 + BLOCK_SIZE /2 )+margin_top;
 
        

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

        //コリジョン
        this.colision = RectangleShape().addChildTo(this);
        this.colision.width = this.width;
        this.colision.height = this.height;
        this.colision.alpha = 0; //コリジョン可視化 = 1
        this.colision.stroke = 'red';  

        BlockGroup = DisplayElement().addChildTo(this); //ブロックグループ作成
        
        this.colision.fill = '';  
        
        

        this.HitFLG = false;

        var l = 1;
        
        /*
        for(var i=0; i<l; i++){
          r += c[Math.floor(Math.random()*cl)];
        }
        */
        this.timer = 0;
        this.ShotTime = 2;

        this.ShotFLG = false;

        this.MoveMode = "wait";


        this.center = 2;
        this.map =  [
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0]
        ];
        

        this.AddBlock(2,2);

        
    },

    update: function(app) {


    },

    AddBlock: function(x,y){
      
      this.map[y][x] = 1;

      var block = RectangleShape().addChildTo(BlockGroup);
      block.width = BLOCK_SIZE -10;
      block.height = BLOCK_SIZE -10;

      block.y = BLOCK_SIZE * (y - this.center)
      block.x = BLOCK_SIZE * (x - this.center);

      block.alpha = 1; //コリジョン可視化 = 1
      block.stroke = strokeColor;  
      block.fill =  BlockColor;
      
      block.strokeWidth = 10;  
      block.cornerRadius = 10;  


      this.SetColision();
      this.CheckBlocks();
    },

    SetBlocks:function(){

      for (var y = 0; y < 5; y ++) {
        for (var x = 0; x < 5; x ++) {
            if(this.map[y][x] == 1){
              
              var block = RectangleShape().addChildTo(BlockGroup);
              block.width = BLOCK_SIZE -10;
              block.height = BLOCK_SIZE -10;
        
              block.y = BLOCK_SIZE * (y - this.center)
              block.x = BLOCK_SIZE * (x - this.center);
        
              block.alpha = 1; //コリジョン可視化 = 1
              block.stroke = strokeColor;  
              block.fill =  BlockColor;
              
              block.strokeWidth = 10;  
              block.cornerRadius = 10;  
        
            }
        }
      }

      
    },


    SetColision: function(){
      ColisionGroup.children.clear();
      
      for (var y = 0; y < 5; y ++) {
        for (var x = 0; x < 5; x ++) {
          
            if(this.map[y][x] == 1){
              
              if(y < 4){
                
                if(this.map[y+1][x] == 0){
                  //コリジョン
                  var colision = RectangleShape().addChildTo(ColisionGroup);
                  colision.width = BLOCK_SIZE /2;
                  colision.height =  BLOCK_SIZE / 4;


                  colision.y = BLOCK_SIZE * y + BLOCK_SIZE  ;
                  colision.x = BLOCK_SIZE * x + BLOCK_SIZE /2;


                  colision.alpha = 0; //コリジョン可視化 = 1
                  colision.stroke = 'green';  
                  colision.fill = '';  
                  colision.pos_x = x;
                  colision.pos_y = y+1;
                  
                  
                }       
      
              }else{

                var colision = RectangleShape().addChildTo(ColisionGroup);
                colision.width = BLOCK_SIZE /2;
                colision.height =  BLOCK_SIZE / 4;
                colision.y = BLOCK_SIZE * y + BLOCK_SIZE;
                colision.x = BLOCK_SIZE * x + BLOCK_SIZE /2
                colision.alpha = 0; //コリジョン可視化 = 1
                colision.stroke = 'green';  
                colision.fill = '';  
                colision.pos_x = x;
                colision.pos_y = y+1;
                
                  

              }
            }
        }

    }
      
    },

    RotationRight: function(){
      ColisionGroup.children.clear();
      SoundManager.play("Rotation");
      
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
              temp[x][y] = this.map[4 -y][x];

          }
      }

      for (var y = 0; y < 5; y ++) {
          for (var x = 0; x < 5; x ++) {
              this.map[y][x] = temp[y][x];
          }
      }

      var self = this;
      this.tweener
      .clear()
      .by({rotation:90}, 100,"easeOutSine")
      .call(function(){
        BlockGroup.children.clear();
        self.rotation = 0;
        self.SetBlocks();        
        self.SetColision();
        self.CheckBlocks();
        
      })

      
    },

    RotationLeft: function(){
      ColisionGroup.children.clear();
      SoundManager.play("Rotation");
      
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
//              temp[x][y] = this.map[4 -y][x];
              temp[4-y][x] = this.map[x][y];
              
          }
      }

      for (var y = 0; y < 5; y ++) {
          for (var x = 0; x < 5; x ++) {
              this.map[y][x] = temp[y][x];
          }
      }

      var self = this;
      this.tweener
      .clear()
      .by({rotation:-90}, 100,"easeOutSine")
      .call(function(){
        BlockGroup.children.clear();
        self.rotation = 0;
        self.SetBlocks();        
        self.SetColision();
        self.CheckBlocks();
        
      })


      
    },

    CheckBlocks: function(){


      var Hit = 0;
      var miss = 0;
      for (var y = 0; y < 5; y ++) {
        for (var x = 0; x < 5; x ++) {
          if(this.map[y][x] == 1){

            if(GAMEMAIN.otehon[y][x] == 1){
              Hit++;
            }            
            else{
              miss++;
            }
          
          }
        }
      }

      if(Hit >= GAMEMAIN.otehoncnt){
        this.ClearBlocks();
        
        if(miss == 0){
          GAMEMAIN.Perfect(Hit);
        }else{
          GAMEMAIN.Succes(Hit);
        }

        this.AddBlock(2,2);
        
        
      }
      
    },

    ClearBlocks:function(){
      ColisionGroup.children.clear();
      BlockGroup.children.clear();

      this.map  = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ];



    },
      

    HitCheck: function(){
      //当たり判定
      var eg = E_BulletGroup.children;
      var self = this;
      eg.each(function(Object) {
        if(self.hitTestElement(Object)){

          switch (Object.tag) {
            case "Enemy":

              var scale = 4;
              GAMEMAIN.Score.MissScore();
              var shape = CircleShape().addChildTo(EffectGroup);
              shape.x = self.x;
              shape.y = self.y;
              
              // 位置を指定
              shape.fill = '';
              shape.stroke = 'red';
              shape.strokeWidth = 2 * scale;
              shape.radius  = 180;
              shape.tweener
              .clear()
              .to({alpha:1,scaleX:scale,scaleY:scale},300,"easeOutCubic")
              .to({alpha:1,scaleX:0,scaleY:0},500,"easeInCubic")
              .call(function(){
                //self.MoveMode = "Shot";                
                shape.remove();
              })
        
              //コリジョン
              /*
              var flash = RectangleShape().addChildTo(EffectGroup);
              flash.x = SCREEN_WIDTH / 2;
              flash.y = self.y;
              flash.width = SCREEN_WIDTH * 2;
              flash.height = 100;
              flash.alpha = 1; //コリジョン可視化 = 1
              flash.stroke = 'red';  
              flash.fill = 'red';  
              flash.tweener
              .clear()
              .wait(100)
              .to({alpha:1,scaleX:scale,scaleY:0},500,"easeOutCubic")              
              .call(function(){
                flash.remove();

              })
              */

              self.timer = -10;
              GAMEMAIN.ResetCombo();
              Object.remove();

              break;
          }
        }
      });

    },


});

