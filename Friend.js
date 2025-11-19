class Friend{
    constructor(scaleFactor) {
        this.friend1 = null;
        this.friend2 = null;
        this.frameCount = 0;
    }

    preload() {
        this.friend1 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728794561/pixil-frame-0_1_ypq4ok.png');
        this.friend2 = loadImage('https://res.cloudinary.com/dvz13kf5g/image/upload/v1728794565/pixil-frame-1_1_muitzf.png');
  
    }

    draw() {

        if (this.frameCount % 50 < 20) {
            image(this.friend1, 590, 200, 75, 75);
        } else {
            image(this.friend2, 590, 200, 75 , 75);
        }

        this.frameCount++;
    }
}