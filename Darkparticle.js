class Darkparticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25; // Particle size
    this.currentImage = dark1;
    this.frameCount = 0;
    this.scaleFactor = 0.50;
    this.speed = random(1, 3); // Random speed
    this.visible = false; // Visibility flag
  }

  update() {
    if (!this.visible) return; // Skip update if not visible

    this.y += this.speed;
    if (this.y > height) {
      this.reset();
    }
    this.frameCount++;
    if (this.frameCount % switchInterval === 0) {
      this.currentImage = this.currentImage === dark1 ? dark2 : dark1;
    }
  }

  display() {
    if (!this.visible) return; // Skip display if not visible

    if (this.currentImage) {
      push();
      translate(this.x, this.y);
      scale(this.scaleFactor);
      image(this.currentImage, 0, 0);
      pop();
    }
  }

  reset() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = random(1, 3); // Random speed
  }

  start() {
    this.visible = true; // Set visibility to true
  }

  checkCollision(miko) {
    let d = dist(this.x, this.y, miko.x, miko.y);
    return d < this.size / 2 + miko.size / 2;
  }
}