const XVAL = 101;
const YVAL = 83;

let enemyPositionY = [3,1,2];
let enemyPositionX = [1,3,2];

// Enemies our player must avoid
var Enemy = function(i) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 100;
    this.x = enemyPositionX[i]*XVAL;
    this.y = enemyPositionY[i]*YVAL;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.x > 5*XVAL) {
        this.x = -1;
        this.speed = 150;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.speed = 50;
    this.x = 2*XVAL;
    this.y = 5*YVAL;
};

//function for detecting collision with enemy
Player.prototype.isCollided = function() {
    for (let enemy of allEnemies) {
        if((Math.abs(this.x-enemy.x) < XVAL/2) && ((this.y-enemy.y) === 0)) {
            return true;
        }
    }
    return false;
};

//update position on reaching goal or colliding with enemies
Player.prototype.update = function() {
    if((this.y === 0) || this.isCollided()) {
        this.x = 2*XVAL;
        this.y = 5*YVAL; 
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handles input
Player.prototype.handleInput = function(direction) {

    switch(direction) {
      case 'left' : if(this.x > 0) this.x -=XVAL;
                    else this.x = 4*XVAL;
                    break;
      case 'right' : if(this.x < 4*XVAL) this.x +=XVAL;
                     else this.x = 0;
                     break;
      case 'down' :  if(this.y < 5*YVAL) this.y +=YVAL;
                      break;
      case 'up'   : if(this.y > YVAL) this.y -= YVAL;
                    else this.y = 5*YVAL;
                      break;
    }
}

//instantiating player and enemy objects
var allEnemies =[new Enemy(0), new Enemy(1), new Enemy(2)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
