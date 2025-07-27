phina.define("Gun", {
    superClass: "DisplayElement",
    init: function(pos_x) {
      this.superInit();

        this.x = BLOCK_SIZE * pos_x + BLOCK_SIZE /2;
        
        this.y = SCREEN_HEIGHT  - (BLOCK_SIZE);
        this.y = SCREEN_HEIGHT  - (BLOCK_SIZE/2);
        

        this.pos_x = pos_x;
        this.vx = 0;
        this.vy = 0;
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
        
        this.setInteractive(true);
        


      },


      onpointstart : function(){
        var shoot = ShootBlock(this.pos_x).addChildTo(ShootBlockGroup)
        this.colision.y = BLOCK_SIZE/2;
        SoundManager.play("Shoot");
        



        this.colision.tweener
        .clear()        
        .wait(100)
        
        .to({y:0}, 300,"easeOutQuart");
      },


      update: function(app) {
        
      },


        


    



});

