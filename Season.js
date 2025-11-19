class Season {
  constructor(imgs, bgCol, sound) {
    this.imgs = imgs;
    this.bgCol = bgCol;
    this.sound = sound;
  }
  
  display() {
    background(this.bgCol);
    image(this.imgs[2], 0, 0, width, height);
    for (let cloud of clouds) {
      cloud.move();
      cloud.display();
      image(this.imgs[0], 0, 0, 800, 300);
      image(this.imgs[1], 0, 0, width, height);
      image(this.imgs[3], 0, 0, 800, 300);
    }
  }
  
  update(){
    
  }
}