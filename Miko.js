class Miko {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.currentFrame = 0;
    this.frameCount = 0;
    this.movingRight = true;
    this.isGlowing = false;
    this.tinted = false;
    this.glowDuration = 60; // Duration in frames
    this.glowStartFrame = 0;
    this.isMoving = false; // New flag to check if Miko is moving
  }

  checkTint() {
    if (this.x >= 250 && this.x <= 400) {
      this.tinted = true;
    } else {
      this.tinted = false;
    }
  }

  update() {
    this.isMoving = false; // Reset moving flag

    if (keyIsPressed) {
      if (keyCode === LEFT_ARROW) {
        if (this.x > 0) {
          this.x -= speed;
          this.currentFrame = (frameCount % 13 < 5) ? 1 : 2;
          this.movingRight = false;
          this.isMoving = true;
        } else {
          this.x = 700;
          updateSeasonCounter(-1);
        }
      } else if (keyCode === RIGHT_ARROW) {
        const offset = mikoImages[this.currentFrame].width * scaleFactor;
        if (this.x < width - offset) {
          this.x += speed;
          this.currentFrame = (frameCount % 13 < 5) ? 1 : 2;
          this.movingRight = true;
          this.isMoving = true;
        } else {
          this.x = 100;
          updateSeasonCounter(1);
        }
      }
    } else {
      this.currentFrame = 0;
    }

    // Update glow status based on duration
    if (this.isGlowing && frameCount - this.glowStartFrame > this.glowDuration) {
      this.isGlowing = false;
    }
  }

  display() {
    this.checkTint();
    if (this.isGlowing) {
      if (this.isMoving) {
        image(mikoshine2, this.x, this.y, mikoshine2.width * 0.75, mikoshine2.height * 0.75);
      } else {
        image(mikoshine, this.x, this.y, mikoshine.width * 0.75, mikoshine.height * 0.75);
      }
    } else {
      noTint();
    }
    push();
    translate(this.x, this.y);
    if (this.tinted) {
      tint(177, 177, 177); // Apply a darker tint
    } else {
      noTint();
    }
    if (this.movingRight) {
      scale(-1, 1);
      image(mikoImages[this.currentFrame], -mikoImages[this.currentFrame].width * scaleFactor, 0, mikoImages[this.currentFrame].width * scaleFactor, mikoImages[this.currentFrame].height * scaleFactor);
    } else {
      image(mikoImages[this.currentFrame], 0, 0, mikoImages[this.currentFrame].width * scaleFactor, mikoImages[this.currentFrame].height * scaleFactor);
    }
    pop();
  }

  // Method to start glowing
  startGlowing() {
    this.isGlowing = true;
    this.glowStartFrame = frameCount;
    shinesound.play(); // Ensure the sound plays when glowing starts
  }
}