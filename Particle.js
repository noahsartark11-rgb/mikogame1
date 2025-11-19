class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25; // Particleのサイズを追加
    this.currentImage = img1;
    this.frameCount = 0;
    this.scaleFactor = 0.50;
    this.speed = random(1,3) // ランダムなスピード
    this.visible = false; // パーティクル表示フラグを追加
  }

  update() {
    if (!this.visible) return; // 表示フラグがfalseの場合は更新しない

    this.y += this.speed;
    if (this.y > height) {
      this.reset();
    }
    this.frameCount++;
    if (this.frameCount % switchInterval === 0) {
      this.currentImage = this.currentImage === img1 ? img2 : img1;
    }
  }

  display() {
    if (!this.visible) return; // 表示フラグがfalseの場合は表示しない

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
    this.speed = random(1, 3); // ランダムなスピード
  }

  start() {
    this.visible = true; // 表示フラグをtrueに設定
  }

  checkCollision(miko) {
    let d = dist(this.x, this.y, miko.x, miko.y);
    return d < this.size * this.scaleFactor / 2 + miko.size / 2;
  }
}