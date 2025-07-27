phina.define("ShootBlock", {
    superClass: "DisplayElement",
    init: function(pos_x) {
      this.superInit();

        this.x = BLOCK_SIZE * pos_x + BLOCK_SIZE /2;
        
        this.y = SCREEN_HEIGHT - (BLOCK_SIZE /2);

        var speed = 140;

        this.vy = speed;
        this.g  = 0;

        this.width = BLOCK_SIZE;
        this.height = BLOCK_SIZE;

        this.MoveMode = "Normal"

        this.scaleX = 1;
        this.scaleY = 1;

        this.setBoundingType("rect");
        this.color = "hsla(133, 100%, 50%, 1)";
        this.ColisionFLG = false;

        //コリジョン
        this.colision = RectangleShape().addChildTo(this);
        this.colision.width = this.width -10;
        this.colision.height = this.height -10;
        this.colision.alpha = 1; //コリジョン可視化 = 1
        this.colision.stroke = strokeColor;  
        
        this.colision.strokeWidth = 10;  
        this.colision.cornerRadius = 10;  
        this.colision.fill = BlockColor;  
        
        this.HitFLG = false;        


      },


      onpointstart : function(){

      },


      update: function(app) {
        this.y = this.y - this.vy;
        if(this.y < -this.height){
          this.remove();
        }
        if(!this.HitFLG){
          this.HitCheck();          
          
        }
      },

      HitCheck: function(){
        //当たり判定
        var cg = ColisionGroup.children;
        var self = this;
        cg.each(function(Object) {

          if(!self.HitFLG){
            if(self.hitTestElement(Object)){
              self.HitFLG = true;
              if(Object.pos_y < 5){
                SoundManager.play("Catch");
                
                
                var shape = CircleShape().addChildTo(EffectGroup);
                // 位置を指定
                shape.setPosition(self.x, self.y +50);
                shape.fill = BlockColor;
                shape.stroke = '';
                
                shape.radius  = 110;
                shape.scaleY  = 0.5;
                shape.scaleX  = 1.1;
                
                shape.tweener
                .clear()
            //    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
                .to({radius:120,scaleX:1.8,scaleY:0.1}, 300,"easeOutCubic")
                
                .call(function(){
                  shape.remove();
                })

                var shape2 = CircleShape().addChildTo(EffectGroup);
                // 位置を指定
                shape2.setPosition(self.x, self.y +50);
                shape2.fill = 'white';
                shape2.stroke = '';
                shape2.scaleY  = 0.5;
                shape2.scaleX  = 1.1;
                
                
                
                shape2.radius  = 110;
                shape2.tweener
                .clear()
                .wait(35)
                .to({radius:120,scaleX:2,scaleY:0.15}, 200,"easeOutCubic")
                .wait(222)    
                .call(function(){
                    shape2.remove();
                })
                GAMEMAIN.Blocks.AddBlock(Object.pos_x,Object.pos_y);
                



                self.remove();  
              }
              else{

                self.tweener
                .clear()
                .by({x:300,y:300,rotation:90}, 100,"easeOutSine")
                .call(function(){
                  self.remove();
                })
              }
            }
            
          }



        });
        
      },
  

});

