class Game {
  constructor() {
    this.miko = new Miko(400, 210); // Miko character instance
    this.particles = [];
    this.darkparticles = [];
    this.score = 0;
    this.gameOver = false;
    this.startScreen = true; // Start screen flag
    this.justWalkThrough = false; // Just Walk Through mode flag
    this.particleOnly = false; // Particle Only mode flag
    this.startButton = new Button(width / 2 - 50, height / 2 + 90, 100, 30, "Start Game", () => this.startGame());
    this.playAgainButton = new Button(625, height / 2 + 40, 100, 30, "Play Again", () => this.reset());
    this.justWalkThroughButton = new Button(525, height / 2 + 90, 155, 30, "Just Walk Through", () => this.startJustWalkThrough());
    this.particleOnlyButton = new Button(125, height / 2 + 90, 165, 30, "Sacred Energy Only", () => this.startParticleOnly());
    this.darkparticleHits = 0; // Track darkparticle hits

    for (let i = 0; i < 10; i++) {
      this.particles.push(new Particle(random(width), random(-height, 0)));
    }
    for (let v = 0; v < 5; v++) {
      this.darkparticles.push(new Darkparticle(random(width), random(-height, 0)));
    }

    this.glowDuration = 120; // Glow duration (frames)
    this.glowCounter = 0;
  }

  startGame() {
    this.startScreen = false;
    this.justWalkThrough = false;
    this.particleOnly = false;
    for (let particle of this.particles) {
      particle.start(); // Show particles on game start
    }
    for (let darkparticle of this.darkparticles) {
      darkparticle.start(); // Show darkparticles on game start
    }
  }

  startJustWalkThrough() {
    this.startScreen = false;
    this.justWalkThrough = true;
    this.particleOnly = false;
    for (let particle of this.particles) {
      particle.visible = false; // Hide particles
    }
    for (let darkparticle of this.darkparticles) {
      darkparticle.visible = false; // Hide darkparticles
    }
  }

  startParticleOnly() {
    this.startScreen = false;
    this.justWalkThrough = false;
    this.particleOnly = true;
    for (let particle of this.particles) {
      particle.visible = true; // Show particles
    }
    for (let darkparticle of this.darkparticles) {
      darkparticle.visible = false; // Hide darkparticles
    }
  }

  update() {
    if (this.startScreen || this.gameOver) return;

    this.miko.update();

    if (!this.justWalkThrough) {
      if (!this.particleOnly) {
        for (let darkparticle of this.darkparticles) {
          darkparticle.update();
          if (darkparticle.checkCollision(this.miko)) {
            this.darkparticleHits++;
            this.gameOver = true; // Set gameOver to true on collision
          }
        }
      }

      for (let particle of this.particles) {
        particle.update();

        if (particle.checkCollision(this.miko)) {
          this.miko.startGlowing();
          this.glowCounter = this.glowDuration;
          particle.reset();
          if (!this.particleOnly) {
            this.score++;
            console.log("Score: " + this.score);

            if (this.score >= 20) {
              this.gameOver = true;
            }
          }
        }
      }
    }

    if (this.miko.isGlowing) {
      this.glowCounter--;
      if (this.glowCounter <= 0) {
        this.miko.isGlowing = false;
        shinesound.play();
      }
    }
  }

  display() {
    if (this.startScreen) {
      background(252,225,184); // Start screen background color
      textSize(30);
      fill(55);
      image(mikoImages[0],350,10,mikoImages[0].width*0.75,mikoImages[0].height*0.75)
      textAlign(CENTER, CENTER);
      text("Miko is a maiden who works in Japanese Shrine!", width / 2, height / 2 - 50);
      textSize(20);
      text("Collect 20 sacred energy! Experience 4 seasons as you go to the sides!", width / 2, height / 2 -20);
      textSize(20);
      text("You don't want to touch a dark energy...", width / 2, height / 2+10 );
      textSize(20);
      text("Use left & right keys and Click to Play！", width / 2, height / 2+35 );
      textSize(20);
      text("Click when you are in another two Mode and return to the Start page", width / 2, height / 2+60 )
      
      this.startButton.display();
      this.justWalkThroughButton.display(); // Display Just Walk Through button on start screen
      this.particleOnlyButton.display(); // Display Particle Only button on start screen
    } else {
      seasons[seasonCounter].display();
animation.draw();
      if (!this.gameOver) {
        if (!this.justWalkThrough) {
          for (let particle of this.particles) {
            particle.display();
          }
          if (!this.particleOnly) {
            for (let darkparticle of this.darkparticles) {
              darkparticle.display();
            }
          }
        }
        image(shrine1, 0, 0, width, height);
          
        this.miko.display();
         

        if (seasons[winter]) {
          image(winterleg, 0, 0, width, height);
        }
        image(foreground1, 0, 0, width, height);
      
      }

      if (this.gameOver) {
        if (this.darkparticleHits >= 1) {
          // Display the game over image and text
          image(gameOverImage, 0, 0, width, height);
          textSize(29);
          fill(255, 0, 0);
          stroke(255);
          strokeWeight(5);
          textAlign(CENTER, CENTER);
          text("ゲームオーバー", 689, height/2);
        } else if (this.score >= 20) {
          // Display the game clear image and text
          image(gameClearImage, 0, 0, width, height);
          textSize(32);
          fill(255, 0, 0);
          stroke(255);
          strokeWeight(5);
          textAlign(CENTER, CENTER);
          text("ゲームクリア", 675, height / 2);
        }

        // Display the play again button
        this.playAgainButton.display();
      }
    }
  }

  reset() {
    this.score = 0;
    this.gameOver = false;
    this.startScreen = true; // Return to start screen on reset
    this.justWalkThrough = false; // Reset Just Walk Through mode
    this.particleOnly = false; // Reset Particle Only mode
    this.darkparticleHits = 0; // Reset darkparticle hits
    for (let particle of this.particles) {
      particle.reset(); // Reset particle position
      particle.visible = true; // Reset particle visibility
    }
    for (let darkparticle of this.darkparticles) {
      darkparticle.reset(); // Reset darkparticle position
      darkparticle.visible = true; // Reset darkparticle visibility
    }

    // Reset text properties to initial values
    textSize(30);
    fill(255);
    noStroke();
  }

  returnToStartScreen() {
    this.startScreen = true;
    this.justWalkThrough = false;
    this.particleOnly = false;
  }

  mousePressed(mx, my) {
    if (this.startScreen) {
      this.startButton.checkClick(mx, my);
      this.justWalkThroughButton.checkClick(mx, my); // Check Just Walk Through button on start screen
      this.particleOnlyButton.checkClick(mx, my); // Check Particle Only button on start screen
    } else if (this.gameOver) {
      this.playAgainButton.checkClick(mx, my);
    } else if (this.justWalkThrough || this.particleOnly) {
      this.returnToStartScreen(); // Return to start screen on click in Just Walk Through or Particle Only mode
    }
  }
}

function mousePressed() {
  game.mousePressed(mouseX, mouseY);
}