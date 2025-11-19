let currentFrame = 0;
let x = 100;
let y = 220;
let speed = 3;
let movingRight = false;
let scaleFactor = 0.75;

//shrine, cloud, sky
let shrineImage;
let clouds = [];
let skyImage;

//spring(sketch.js)
let springImage;
let springFrontImage;
let springsound;

//summer
let summerImage;
let summerMode = false;
let summer;
let summersound;

//fall
let fallImage;
let fallsky;
let fallsound;

//winter
let winterImage;
let winterMode = false;
let winter;
let wintersound;
let winterSky;
let winterFrontImage;

//particles
let img1, img2;
let particles = [];
let numParticles = 10;
let switchInterval = 30; // 画像を切り替えるフレーム数

let dark1, dark2
let darkparticles = []
let numDarkParticles = 1

//miko
let mikoImages = [];

let mikoshine;
let shinesound;

let seasonCounter = 0;
let numSeasons = 4;
let seasons = [];

let game;

let animation

  
function preload() {
  //miko
  mikoImages[0] = loadImage("https://res.cloudinary.com/dvz13kf5g/image/upload/v1728163971/%E5%B7%AB%E5%A5%B3front-pixilart_pgujll.png");
  mikoImages[1] = loadImage("https://res.cloudinary.com/dvz13kf5g/image/upload/v1728163980/%E5%B7%AB%E5%A5%B3front-pixilart_1_axbuvl.png");
  mikoImages[2] = loadImage("https://res.cloudinary.com/dvz13kf5g/image/upload/v1728163995/%E5%B7%AB%E5%A5%B3side1-pixilart_utuzas.png");
  mikoshine= loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728796705/%E5%B7%AB%E5%A5%B3shine2-pixilart_2_k4nyxk.png')
  mikoshine2= 
    loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728794975/%E5%B7%AB%E5%A5%B3frontshine-pixilart_nhdiv5.png')
  
  
  
  
  //shrine
shrine1 = loadImage ('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728518093/shrine-landscape-spring-no-sky-pixilart_pwe6ax.png')
  
//spring,cloud,sky
  background1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728517833/shrine-landscape-spring-pixilart_2_bsiwnx.png');
  foreground1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728158071/pixilart-drawing_2_m0wtqt.png');
  sky1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728160342/shrine-landscape-no-sky-pixilart_vjhxh9.png');
  cloud1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728160067/shrine-landscape-pixilart_2_sjuq3e.png');

  //summer
  summerbackground = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728160352/shrine-landscape-pixilart_4_lrturq.png')

  fallImage= loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728585849/shrine-landscape-fall-pixilart_uvt6xo.png')
  fallsky = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728704836/shrine-landscape-fall-no-sky-pixilart_sasrzr.png')
  
  //winter
  winterbackground = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728802552/shrine-landscape-winter-no-sky-pixilart_1_i297bt.png');
  wintersky1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728170888/shrine-landscape-winter-no-sky-pixilart_dvyfnw.png');
  winterleg = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728171499/shrine-landscape-winter-copy-pixilart_jroomj.png');
  
  //particles
  img1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728409522/big-light-pixilart_et6jgm.png');
  img2 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728409548/pixilart-drawing_4_fuguv7.png');
  
  
  dark1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728720983/small-light-pixilart_mehy0z.png')
  dark2 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728720986/big-light-pixilart_1_c4kvbt.png')
  
  
  gameClearImage = loadImage ('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728720237/%E5%B7%AB%E5%A5%B3front-%E3%81%86%E3%81%83%E3%82%93%EF%BD%8B-pixilart_1_u4wlup.png')
  
  gameOverImage = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728759537/%E5%B7%AB%E5%A5%B3front-sad-pixilart_1_vp5xsg.png')

  summersound= loadSound('https://res.cloudinary.com/dvz13kf5g/video/upload/v1728801198/summer3_rxhbqq.wav')
  springsound=loadSound('https://res.cloudinary.com/dvz13kf5g/video/upload/v1728800440/spring5wav_v0vdae.wav')
  fallsound= loadSound('https://res.cloudinary.com/dvz13kf5g/video/upload/v1728800325/fall2_zyi1jy.wav')
  wintersound= loadSound('https://res.cloudinary.com/dvz13kf5g/video/upload/v1728799719/winter2_drzckp.wav')
  
  shinesound = loadSound('https://res.cloudinary.com/dvz13kf5g/video/upload/v1728800945/shine5_dgzvfe.wav')
    
  animation = new Friend(0.75);
    animation.preload();
}


function setup() {
  createCanvas(800, 300);
  
  game = new Game();
  
  //spring,sky,cloud
  springImage = background1;
  springFrontImage = foreground1;
  skyImage = sky1;
  clouds.push(new Cloud(cloud1, 0, 0, 0.5));
  clouds.push(new Cloud(cloud1, cloud1.width, 0, 0.5));
  
  // seasons
  const springImgArray = [springImage, shrine1, sky1, springFrontImage];
  spring = new Season(springImgArray, 80, springsound);
  const summerImgArray = [summerbackground, shrine1, sky1, springFrontImage];
  summer = new Season(summerImgArray, 80, summersound);
  const fallImgArray = [fallImage, shrine1, fallsky, springFrontImage];
  fall = new Season(fallImgArray, 80, fallsound);
  const winterImgArray = [winterbackground, shrine1, wintersky1, winterleg];
  winter = new Season(winterImgArray, 80, wintersound);
  
  seasons = [spring, winter, fall, summer];
  
  // パーティクルの初期化
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(-height, 0)));
    
     for (let v = 0; v < numDarkParticles; v++) {
    darkparticles.push(new Darkparticle(random(width), random(-height, 0)));
     }
    
  }
  
  // Play the initial season's sound
  playSeasonSound();
}

function draw() {
  game.update();
  game.display();
}

function updateSeasonCounter(dir) {
  if (dir > 0) {
    if (seasonCounter < numSeasons - 1) {
      seasonCounter++;
    } else {
      seasonCounter = 0;
    }
  } else {
    if (seasonCounter > 0) {
      seasonCounter--;
    } else {
      seasonCounter = 3;
    }
  }
  
  playSeasonSound();
}

function playSeasonSound() {
  // Stop all sounds
  springsound.stop();
  summersound.stop();
  fallsound.stop();
  wintersound.stop();
  
  // Play the current season's sound
  let currentSeason = seasons[seasonCounter];
  currentSeason.sound.loop();
}