class Button {
  constructor(x, y, width, height, label, onClick) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.onClick = onClick;
  }

  display() {
    stroke(255)
    strokeWeight(5)
    fill(200);
    rect(this.x, this.y, this.width, this.height, 5);
    noStroke()
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.width / 2, this.y + this.height / 2);
  }

  checkClick(mx, my) {
    if (mx > this.x && mx < this.x + this.width && my > this.y && my < this.y + this.height) {
      this.onClick();
    }
  }
}