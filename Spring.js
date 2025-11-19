class Spring {
  constructor(image) {
    this.image = image;
  }
  
  display() {
       background(80);
    image(skyImage, 0, 0, width, height);
    image(springImage, 0, 0, width, height);
  image(springFrontImage, 0, 0, width, height);
  }
}