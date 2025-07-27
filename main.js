phina.globalize();


var SCREEN_WIDTH    = 900;
var SCREEN_HEIGHT   = 1400;

var BLOCK_SIZE = SCREEN_WIDTH / 5;
var Group;
var ObjectGroup;
var BlockGroup;
var ColisionGroup;
var ShootBlockGroup;
var OtehonGroup;
var EffectGroup;
var EffectGroup2;

var margin_top = 80;

var BlockColor;
var strokeColor;


var BULLET_POINT = 20;
var DANMAKU_POINT = 10;


var GAMEMAIN;

var ASSETS = {
  image: {
    
    'Setumei1':'img/setumei_1.PNG',
    'Setumei2':'img/setumei_2.PNG',
    'Setumei3':'img/setumei_3.PNG',
    'Setumei4':'img/setumei_4.PNG',
    
    'cachacacha':'img/logo.png',
    'Retry':'img/Retry.png',
    'Reload':'img/reload.png',
    'Tweet':'img/Tweet.png',
    'Back':'img/Back.png',
    'utyo':'img/utyo.png'
    
  },
  spritesheet: {

  },

  sound: {
    'Bgm':'sound/130_straight-up-bright-house.wav',
    'Shoot':'sound/Laser-shoot2.wav',
    'Catch':'sound/deepzap.mp3',
    'Rotation':'sound/kaiten2.wav',
    'Clear':'sound/twotone-808-cowbell.wav',
    'Perfect':'sound/orchhit5.wav',
    'Timeup':'sound/police-whistle2.mp3',
  },

  font:{

    'def': './font/851letrogo.ttf',    
    'en': './font/min_GN-KagakuGothic.woff'
  },
};

phina.main(function() {
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  app.replaceScene(SceneSequence());
  app.run();
});

// SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    this.superInit({
      scenes: [

        {
          label: "Loading", // ラベル。参照用
          className: "LoadingScene", // シーンAのクラス名
          nextLabel:"Title",
        },

        {
          label: "Title", // ラベル。参照用
          className: "TitleScene", // シーンAのクラス名
          nextLabel:"Tutorial",
        },

        {
          label: "Tutorial", // ラベル。参照用
          className: "TutorialScene", // シーンAのクラス名
          nextLabel:"CountDown",
        },

        {
          label: "CountDown", // ラベル。参照用
          className: "CountDownScene", // シーンAのクラス名
          nextLabel:"Main",
        },


        {
          label: "Main",
          className: "MainScene",
        },

        {
          label: "Result",
          className: "ResultScene",
        }

      ]
    });
  }
});

phina.define("LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function(params) {
    this.superInit({
      assets: ASSETS,
      exitType: "auto",

    });

  }

});

phina.define('ResultScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();
  },
});
