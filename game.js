class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.atlas('scientist', 'assets/scientistSpriteSheet.png', 'assets/scientistSprites.json');
        this.load.atlas('door', 'assets/doorSpriteSheet.png', 'assets/doorSprites.json');
        this.load.image('background', 'assets/background.jpg');
    }

    create() {
    // background stuff
        const backgroundImage1 = this.add.image(0, 0, 'background'); // adds top left background image
        backgroundImage1.setOrigin(0.5, 0.5);
        backgroundImage1.setPosition(this.sys.game.config.width / 4, this.sys.game.config.height / 4); // cneters the image
        const backgroundImage2 = this.add.image(0, 0, 'background'); // adds top right background image
        backgroundImage2.setOrigin(0.5, 0.5);
        backgroundImage2.setPosition(this.sys.game.config.width / 4, this.sys.game.config.height * (3/4)); // cneters the image
        const backgroundImage3 = this.add.image(0, 0, 'background'); // adds bottom left background image
        backgroundImage3.setOrigin(0.5, 0.5);
        backgroundImage3.setPosition(this.sys.game.config.width * (3/4), this.sys.game.config.height / 4); // cneters the image
        const backgroundImage4 = this.add.image(0, 0, 'background'); // adds bottom right background image
        backgroundImage4.setOrigin(0.5, 0.5);
        backgroundImage4.setPosition(this.sys.game.config.width * (3/4), this.sys.game.config.height * (3/4)); // cneters the image
        const scaleX = this.sys.game.config.width / backgroundImage1.width/2;
        const scaleY = this.sys.game.config.height / backgroundImage1.height/2;
        const scale = Math.max(scaleX, scaleY);
        backgroundImage1.setScale(scale);
        backgroundImage2.setScale(scale);
        backgroundImage3.setScale(scale);
        backgroundImage4.setScale(scale);


        // scientist animation creator
            // moving
        this.anims.create({ key:'scientistMoving', frameRate: 10, frames: this.anims.generateFrameNames('scientist', {prefix:'scientist', end: 3, zeroPad:1}), repeat: -1});
            // standing
        this.anims.create({ key:'scientistStanding', frameRate: 1, frames: this.anims.generateFrameNames('scientist', {prefix:'scientist', start:4, end: 4, zeroPad:1}), repeat: -1});

        // doors open and closing
        this.anims.create({ key:'doorClosing', frameRate: 1, frames: this.anims.generateFrameNames('door', {prefix:'door', start: 0, end: 0, zeroPad:1}), repeat: -1});

        this.anims.create({ key:'doorOpen', frameRate: 1, frames: this.anims.generateFrameNames('door', {prefix:'door', start: 1, end: 1, zeroPad:1}), repeat: -1});

        // scientist sprite creator
        this.scientist = this.physics.add.sprite(config.scale.width/2, config.scale.height/2, 'scientist');
        this.scientist.scale=0.7
        this.scientist.body.setSize(50, 130)

        // door creator
        this.door = this.physics.add.staticSprite(config.scale.width/2, config.scale.height/4, 'door');
        var doorOpened = false
        function doorOpen(){
            if(doorOpened == false){
                if(prompt("How many electrons does oxygen have in it's ionized form?") == 10){
                    doorOpened = true
                    doorCollider.destroy()
                    alert("Correct")
                    this.door.anims.play('doorOpen', true);
                } else {
                    alert("Wrong")
                }
            }
        }
        var doorCollider = this.physics.add.collider(this.door, this.scientist, doorOpen, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.scientist.setVelocity(0,0);

        if (this.cursors.left.isDown) // move left
        {
            this.scientist.setFlipX(true);
            this.scientist.setVelocityX(-150);
            this.scientist.anims.play('scientistMoving', true);
        }
        else if (this.cursors.right.isDown) // move right
        {
            this.scientist.setFlipX(false);
            this.scientist.setVelocityX(150);
            this.scientist.anims.play('scientistMoving', true);
        }


        if (this.cursors.up.isDown) // move down
        {
            this.scientist.setVelocityY(-150);
            this.scientist.anims.play('scientistMoving', true);
        }
        else if (this.cursors.down.isDown) // move up
        {
            this.scientist.setVelocityY(150);
            this.scientist.anims.play('scientistMoving', true);
        }

        // makes it so that holding two buttons doesn't make you faster

        if ((this.cursors.up.isDown == true &&  this.cursors.left.isDown == true)) {
            this.scientist.setVelocity(-Math.sqrt(11250),-Math.sqrt(11250));
            this.scientist.anims.play('scientistMoving', true);
        }
        if ((this.cursors.up.isDown == true &&  this.cursors.right.isDown == true)) {
            this.scientist.setVelocity(Math.sqrt(11250),-Math.sqrt(11250));
            this.scientist.anims.play('scientistMoving', true);
        }
        if ((this.cursors.down.isDown == true &&  this.cursors.left.isDown == true)) {
            this.scientist.setVelocity(-Math.sqrt(11250),Math.sqrt(11250));
            this.scientist.anims.play('scientistMoving', true);
        }
        if ((this.cursors.down.isDown == true &&  this.cursors.right.isDown == true)) {
            this.scientist.setVelocity(Math.sqrt(11250),Math.sqrt(11250));
            this.scientist.anims.play('scientistMoving', true);
        }

        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
        } else {
            this.scientist.play('scientistStanding')
        }
    }
}
// game configuration
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        height: 1040,
        width: 1920,
    },
    backgroundColor: `#FFFFFF`,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0, x:0},
            debug: true // Hitboxes for debug
        }
    },
    scene: [ GameScene ]
}

const game = new Phaser.Game(config)
