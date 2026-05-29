import { questionBank, answerBank } from './questions.js';
class Wall extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'wall');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(78, 186);
    }
}

class Door extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'door');

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}


class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.atlas('scientist', 'assets/scientistSpriteSheet.png', 'assets/scientistSprites.json');
        this.load.atlas('door', 'assets/doorSpriteSheet.png', 'assets/doorSprites.json');
        this.load.image('background', 'assets/background.jpg');
        this.load.image('wall', 'assets/wall.png');
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
        // this.door = this.physics.add.staticSprite(config.scale.width/2, config.scale.height/4, 'door');
        this.correct = false
        this.cooldown = false
        // this.doorOpen = () => {
        //     console.log(this.correct)
        //     if(this.correct === true){
        //         console.log("correct answer")
        //         doorOpened = true
        //         this.doorColliderArr[this.doorColliderArr.indexOf(this)].destroy()
        //         this.door.anims.play('doorOpen', true);
        //     }
        //     if(doorOpened === false){
        //         this.scene.pause()
        //         this.scene.launch('QuizScene');
        //     }
        // }
        // this.doorCollider = this.physics.add.collider(this.door, this.scientist, this.doorOpen, null, this);


        // wall creator
        // this.wall = new Wall(this, 400, 400);
        // this.physics.add.collider(this.wall, this.scientist);
        // this.wall.body.setImmovable(true);



        this.cursors = this.input.keyboard.createCursorKeys();
        this.createMaze()
    }

    createMaze() {
        const walls = [
            // [x, y, rotated?]
            // --- Boundary walls ---
            // Top
            [186, 39, true], [372, 39, true], [558, 39, true], [744, 39, true],
            [930, 39, true], [1116, 39, true], [1302, 39, true], [1488, 39, true],
            [1674, 39, true], [1860, 39, true],
            // Bottom
            [186, 1001, true], [372, 1001, true], [558, 1001, true], [744, 1001, true],
            [930, 1001, true], [1116, 1001, true], [1302, 1001, true], [1488, 1001, true],
            [1674, 1001, true], [1860, 1001, true],
            // Left
            [39, 93, false], [39, 279, false], [39, 465, false], [39, 651, false],
            [39, 837, false], [39, 1023, false],
            // Right
            [1881, 93, false], [1881, 279, false], [1881, 465, false], [1881, 651, false],
            [1881, 837, false], [1881, 1023, false],

            // // --- Interior maze walls ---
            // // Horizontal interior walls
            // [300, 220, true], [486, 220, true], [672, 220, true],
            // [900, 400, true], [1086, 400, true], [1272, 400, true],
            // [500, 600, true], [686, 600, true], [872, 600, true],
            // [1200, 200, true], [1386, 200, true], [1572, 200, true],
            // [1100, 700, true], [1286, 700, true], [1472, 700, true],
            // [300, 775, true], [486, 775, true], [672, 775, true],

            // // Vertical interior walls
            // [248, 300, false], [248, 486, false],
            // horizontal
    [372, 220, true],
    [558, 220, true],
    [930, 220, true],
    [1116, 220, true],
    [1488, 220, true],

    // vertical
    [248, 279, false],
    [620, 279, false],
    [806, 279, false],
    [1364, 279, false],
    [1736, 279, false],


    // ---- Upper Middle ----

    // horizontal
    [186, 406, true],
    [372, 406, true],
    [744, 406, true],
    [930, 406, true],
    [1302, 406, true],
    [1488, 406, true],
    [1674, 406, true],

    // vertical
    [434, 465, false],
    [992, 465, false],
    [1550, 465, false],


    // ---- Center Section ----

    // horizontal
    [558, 592, true],
    [744, 592, true],
    [1116, 592, true],
    [1302, 592, true],

    // vertical
    [248, 651, false],
    [620, 651, false],
    [1178, 651, false],
    [1736, 651, false],


    // ---- Lower Middle ----

    // horizontal
    [186, 778, true],
    [372, 778, true],
    [930, 778, true],
    [1116, 778, true],
    [1488, 778, true],
    [1674, 778, true],

    // vertical
    [806, 837, false],
    [1364, 837, false],


    // ---- Bottom Area ----

    // horizontal
    [558, 920, true],
    [744, 920, true],
    [1302, 920, true],

        ];

        walls.forEach(([x, y, rotated]) => {
            const w = new Wall(this, x, y);
            if (rotated) {
                w.setAngle(90);
                w.body.setSize(186, 78);
            }
            w.body.setImmovable(true);
            this.physics.add.collider(w, this.scientist);
        });

        this.doorArr = []
        this.doorColliderArr = []
        const doors = [
            [245, 650, true], [722, 880, true]
        ]

        doors.forEach(([x, y, rotated]) => {
            const d = new Door(this, x, y);
            if (rotated) {
                d.setAngle(90);
                d.body.setSize(d.height,d.width)
            }
            d.body.setImmovable(true);
            this.doorArr.push(d)
            var doorOpened = false
            let collider;
            collider = (this.physics.add.collider(d, this.scientist,this.doorOpen = () => {
                if(this.cooldown == false){
                    if(this.correct === true){
                        collider.destroy()
                        doorOpened = true
                        d.anims.play('doorOpen', true);
                        this.correct = false
                    }
                    if(doorOpened === false){
                        this.scene.pause()
                        this.scene.launch('QuizScene'); //stops the game when the knight dies
                    }
                }
            }, null, this));
        });
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

class QuizScene extends Phaser.Scene {
    constructor() {
        super('QuizScene')
    }

    preload() {
        this.load.image('quizBackground', 'assets/quizBackground.jpg');
    }

    create() {
        const quizBackground = this.add.image(0, 0, 'quizBackground'); // adds quiz background image
        quizBackground.setOrigin(0.5, 0.5);
        quizBackground.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2); // cneters the image
        const scaleX = this.sys.game.config.width / quizBackground.width;
        const scaleY = this.sys.game.config.height / quizBackground.height;
        const scale = Math.max(scaleX, scaleY);
        quizBackground.setScale(scale);

        this.answer = false
        const scene = this


        this.quizDiv = document.createElement('div');

        let questionNum = Phaser.Math.Between(0, questionBank.length-1)
        // How many electrons does oxygen have in its ionized form?
        this.quizDiv.innerHTML =
        `
            <h1>Answer this question correctly to pass</h1>
            <div class="questions">
                <h3>${questionBank[questionNum]}</h3>
                <form>
                <div class="choices">
                    <label for="option1">6</label><br>
                </div>

                <div class="choices">
                    <label for="option2">4</label><br>
                </div>

                <div class="choices">
                    <label for="option3">8</label><br>
                </div>

                <div id="correct" class="choices">
                    <label for="option4">Hello World</label>
                </div>
                </form>
            </div>
        `

        this.quizDiv.style.cssText =
        `
            position:absolute;
            left: 17vw;
            top: 50px;
            margin: 30px;
            text-align: center;
            color: rgb(30, 77, 43);
        `

        var questions = this.quizDiv.querySelector('.questions')
        questions.style.cssText =
        `
            border: 4px solid rgba(139, 105, 20, 0.8);
            margin: 10px;
            padding-left: 20px;
            padding-bottom: 10px;
        `


        var h3 = this.quizDiv.querySelector('h3')
        h3.style.cssText =
        `
            margin: 10px;
        `

        var choices = this.quizDiv.querySelectorAll(".choices")
        choices.forEach(function(choice){
            choice.style.cssText =
            `
                border: 4px solid rgba(139, 105, 20, 0.8);
                margin-bottom: 10px;
                margin-right: 20px;
                padding: 10px;
                font-size: 25px;
            `
            choice.addEventListener("click",function(){
                if(choice.id == "correct"){
                    scene.answer=true
                } else {
                    const gameScene = scene.scene.get('GameScene');  // get GameScene
                    gameScene.cooldown = true
                    gameScene.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            gameScene.cooldown = false
                        },
                    });
                    scene.quizDiv.remove();
                    scene.scene.resume('GameScene');
                    scene.scene.stop();
                }
            })
        })
        document.body.appendChild(this.quizDiv);
    }

    update() {
        if(this.answer === true){
            const gameScene = this.scene.get('GameScene');
            gameScene.correct = true;
            this.quizDiv.remove();
            this.scene.resume('GameScene');
            this.scene.stop();
        }
    }

}

// game configuration
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1040,
    },
    backgroundColor: `#FFFFFF`,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0, x:0},
            debug: true
        }
    },
    scene: [ GameScene, QuizScene ]
}

const game = new Phaser.Game(config)
