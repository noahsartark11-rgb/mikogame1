class Cloud {
  constructor(img, x, y, speed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move() {
    this.x -= this.speed;
    if (this.x < -this.img.width) {
      this.x = width;
    }
  }

  display() {
    image(this.img, this.x, this.y);
  }
}


//simply cloud
