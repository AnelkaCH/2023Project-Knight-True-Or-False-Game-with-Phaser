import Phaser from 'phaser'
import ScoreLabel from '../ui/ScoreLabel'
import GameOverScene from './GameOverScene'


export default class MathFighterScene extends Phaser.Scene {
    constructor() {
        super('math-fighter-scene')
    }

    init() {
        this.gameHalfWidth = this.scale.width * 0.5
        this.gameHalfHeight = this.scale.height * 0.5
        this.player = undefined
        this.enemy = undefined
        this.slash = undefined
        this.startGame = false
        this.questionText = undefined
        this.buttonT = undefined
        this.buttonF = undefined
        this.number = 0
        this.question = []
        this.answer = []
        this.correctAnswer = undefined
        this.playerAttack = false
        this.enemyAttack = false
        this.scoreLabel = 0
        this.timerLabel = undefined
        this.countdownTimer = 50
        this.timedEvent = undefined
        this.enemyType = undefined
        this.answer = []
        this.answer[0] = 'F'
        this.answer[1] = 'T'
        this.answer[2] = 'T'
        this.answer[3] = 'F'
        this.answer[4] = 'F'
        this.answer[5] = 'T'
        this.answer[6] = 'F'
        this.answer[7] = 'T'
        this.answer[8] = 'T'
        this.answer[9] = 'F'
        this.answerR = undefined
        this.value1 = undefined
        this.answerText = undefined
        }
    preload() {
        this.load.image('background', 'images/bg_layer1.png')
        this.load.image('fight-bg', 'images/fight-bg.png')
        this.load.image('tile', 'images/tile.png')
        this.load.image('start-btn', 'images/Start-Button-Vector-PNG.png')
        this.load.image('T', 'images/true-button.png')
        this.load.image('F', 'images/falso-button.png')

        this.load.spritesheet('player', 'images/warrior1.png',
            { frameHeight: 80, frameWidth: 80 })
        this.load.spritesheet('demon', 'images/demon.png',
            { frameHeight: 39, frameWidth: 32.3})
        this.load.spritesheet('ogre', 'images/troll.png',
            { frameHeight: 41, frameWidth: 32})
        this.load.spritesheet('pumpkin', 'images/pumpkin_dude.png',
            { frameHeight: 32, frameWidth: 16})
        this.load.spritesheet('numbers', 'images/numbers.png',
            { frameHeight: 71.25, frameWidth: 131 })
        this.load.spritesheet('slash', 'images/slash.png',
            { frameHeight: 88, frameWidth: 42 })
    }

    create() {
        this.add.image(240, 320, 'background')

        const fight_bg = this.add.image(240, 160, 'fight-bg')
        const tile = this.physics.add.staticImage(240, fight_bg.height - 40, 'tile')

        this.player = this.physics.add.sprite(this.gameHalfWidth - 150, this.gameHalfHeight - 200, 'player')
            .setBounce(0.2)
            .setOffset(-50, -10)
        this.physics.add.collider(this.player, tile)
        this.enemy = this.physics.add.sprite(this.gameHalfWidth + 150, this.gameHalfHeight - 200, 'demon')
            .setOffset(50, -4)
            .setBounce(0.2)
            .setFlipX(true)
            .setScale(2)
        this.physics.add.collider(this.enemy, tile)
        

        this.slash = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-500)
            .setOffset(0, -10)
            .setDepth(1)
            .setCollideWorldBounds(true)
        this.createAnimation()

        // start the gameStart
        let start_button = this.add.image(this.gameHalfWidth, this.gameHalfHeight + 181, 'start-btn')

            .setInteractive().setScale(0.5)

        start_button.on('pointerdown', () => {
            this.gameStart()
            start_button.destroy()
        }, this)
        // end the gameStart
      //  this.physics.add.collider(this.enemy, tile)

        this.physics.add.overlap(this.slash, this.player, this.spriteHit, null, this)
        this.physics.add.overlap(this.slash, this.enemy, this.spriteHit, null, this)

        this.scoreLabel = this.createScoreLabel(26, 16, 0)
        this.timerLabel = this.add.text(this.gameHalfWidth, 16,
            null).setDepth(5)

            this.physics.add.collider(this.enemy, tile)

    }

    update(time) {
        if (this.correctAnswer === true && !this.playerAttack) {
            this.player.anims.play('player-attack', true)
            this.time.delayedCall(500, () => {
                this.createSlash(this.player.x + 60, this.player.y, 0, 600)
                //this.switchEnemy()
            })

            this.playerAttack = true
            
        }

        if (this.correctAnswer === undefined) {

            this.player.anims.play('player-standby', true)
            this.enemy.anims.play('enemy-standby', true) 
            
            
        }

        if (this.correctAnswer === false && !this.enemyAttack) {
            this.enemy.anims.play('enemy-attack', true)

            this.time.delayedCall(500, () => {
                this.createSlash(this.enemy.x - 60, this.enemy.y, 2, -600, true)
            })

            this.enemyAttack = true
        }

        if (this.startGame = true) {
            this.timerLabel.setStyle({
                fontSize: '24px',
                fill: '#000',
                fontStyle: 'bold',
                align: 'center'
            }).setText(this.countdownTimer)
          //  this.switchEnemy()
            
        }


      //  this.clickAnswer(this.value1)

    }

    createAnimation() {
        // PLAYER'S ANIMATION

        this.anims.create({
            key: 'player-standby',
            frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19 }),
            frameRate: 10,
            repeat: -1 //tanya
        })
        this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
            frameRate: 10
        })
        this.anims.create({
            key: 'player-hit',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10
        })
        this.anims.create({
            key: 'player-die',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10
        })


        // ENEMY'S ANIMATION

        this.anims.create({
            key: 'enemy-standby',
            frames: this.anims.generateFrameNumbers('demon', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'enemy-attack',
            frames: this.anims.generateFrameNumbers('demon', { start: 4, end: 7 }),
            frameRate: 10
        })
        this.anims.create({
            key: 'enemy-hit',
            frames: this.anims.generateFrameNumbers('demon', { start: 4, end: 7 }),
            frameRate: 10
        })
        this.anims.create({
            key: 'enemy-die',
            frames: this.anims.generateFrameNumbers('demon', { start: 4, end: 6 }),
            frameRate: 10
        })

        this.anims.create({
            key: 'enemy2-standby',
            frames: this.anims.generateFrameNumbers('ogre', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'enemy2-attack',
            frames: this.anims.generateFrameNumbers('ogre', { start: 4, end: 7 }),
            frameRate: 10
        })
        this.anims.create({
            key: 'enemy2-hit',
            frames: this.anims.generateFrameNumbers('ogre', { start: 4, end: 7 }),
            frameRate: 10
        })
        this.anims.create({
            key: 'enemy2-die',
            frames: this.anims.generateFrameNumbers('ogre', { start: 4, end: 6 }),
            frameRate: 10
        })
    }

    gameStart() {
        // this.startGame = true

        this.player.anims.play('player-standby', true)
        this.enemy.anims.play('enemy-standby', true)

        this.answerText = this.add.text(this.gameHalfWidth, 200, '0', { fontSize: '32px', fill: '#F806B2', fontFamily: 'Chalkduster, fantasy' })
        this.questionText = this.add.text(this.gameHalfWidth, 100, '0', { fontSize: '32px', fill: '#F806B2', fontFamily: 'Chalkduster, fantasy' })

        this.createButtons()

        this.input.on('gameobjectdown', this.clickAnswer, this) //tanya

        this.generateQuestion()
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.gameOver,
            callbackScope: this,
            loop: true
            })



    }
    questionAnswers(answer) {
      
        this.answer[0] = 'F'
        this.answer[1] = 'T'
        this.answer[2] = 'F'
        this.answer[3] = 'F'
        this.answer[4] = 'F'
        this.answer[5] = 'T'
        this.answer[6] = 'F'
        this.answer[7] = 'F'
        this.answer[8] = 'T'
        this.answer[9] = 'T'

    }

    createButtons() {
        const startPositionY = this.scale.height - 246
        const widthDifference = 131
        const heightDifference = 71.25

        this.buttonT = this.add.image(this.gameHalfWidth - 100, startPositionY + 80, 'T')
            .setScale(0.5)
            .setInteractive()
            .setData('value', 'T')

        this.buttonF = this.add.image(this.gameHalfWidth + 100, startPositionY + 80, 'F')
            .setScale(0.5)
            .setInteractive()
            .setData('value', 'F')
           
    }

    generateQuestion() {
        this.question[0] = 'United States consists of 50 states.'
        this.question[1] = 'C in the periodic table represent the element CALCIUM.'
        this.question[2] = 'EVERY number with the power of 0 will be equal to 1.'
        this.question[3] = 'Mount Everest is the tallest mountain.'
        this.question[4] = 'The male chromosome is XX.'
        this.question[5] = 'Albert Einstein dicovered and created the equation E=mc^2'
        this.question[6] = 'Burj Khalifa is the tallest building.'
        this.question[7] = 'China has the largest economy (Nominal GDP).'
        this.question[8] = '7 x 7 = 7 ^ 7'
        this.question[9] = 'There are 193 members in the UN.'

        this.questionText.setText(this.question[Phaser.Math.Between(0,9)]).setScale(0.6)
        const textHalfWidth = this.questionText.width * 0.3
        this.questionText.setX(this.gameHalfWidth - textHalfWidth)
    }

    clickAnswer(pointer,object, event) {
      //  this.createButtons()
        let value = object.getData('value')
        console.log(value)
        this.answerText.setText(`${value}`)
        if (value === 'T') {
            this.answerR = value
            this.checkAnswer()
            value = null
           
        } else if (value === 'F') {
            this.answerR = value
            this.checkAnswer()
            value = null
        }
       

        event.stopPropagation()
    }

    checkAnswer() {
       
        //let value = object.getData('value')
        //this.clickAnswer('value')
        /*
        this.answer[0] = 'F'
        this.answer[1] = 'T'
        this.answer[2] = 'T'
        this.answer[3] = 'F'
        this.answer[4] = 'F'
        this.answer[5] = 'T'
        this.answer[6] = 'F'
        this.answer[7] = 'T'
        this.answer[8] = 'T'
        this.answer[9] = 'F' 
        */
        
        //Ogre
        /*if (this.question[0] && this.enemyType == 2 && this.answer[0] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[1] && this.enemyType == 2 && this.answer[1] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[2] && this.enemyType == 2 && this.answer[2] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[3] && this.enemyType == 2 && this.answer[3] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[4] && this.enemyType == 2 && this.answer[4] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[5] && this.enemyType == 2 && this.answer[5] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[6] && this.enemyType == 2 && this.answer[6] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[7] && this.enemyType == 2 && this.answer[7] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[8] && this.enemyType == 2 && this.answer[8] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }

        if (this.question[9] && this.enemyType == 2 && this.answer[9] === this.answerR) {
            this.correctAnswer = true
        } else {
            this.correctAnswer = false
        }*/

        //Demon
        if (this.question[0] && this.enemyType == 1 && this.answer[0] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[1] && this.enemyType == 1 && this.answer[1] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[2] && this.enemyType == 1 && this.answer[2] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[3] && this.enemyType == 1 && this.answer[3] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[4] && this.enemyType == 1 && this.answer[4] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[5] && this.enemyType == 1 && this.answer[5] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[6] && this.enemyType == 1 && this.answer[6] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[7] && this.enemyType == 1 && this.answer[7] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[8] && this.enemyType == 1 && this.answer[8] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }

        if (this.question[9] && this.enemyType == 1 && this.answer[9] === this.answerR) {
            this.correctAnswer = false
        } else {
            this.correctAnswer = true
        }
            
          /*if (this.question[1]) {
            if (this.answer[0] === this.answerR) {
                if (this.enemyType == 1) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            
                if (this.enemyType == 2) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
            
            }
        }  if (this.question[2]) {
            if (this.answer[0] === this.answerR) {
                if (this.enemyType == 1) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            
                if (this.enemyType == 2) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            }
        } 
         if (this.question[3]) {
            if (this.answer[0] === this.answerR) {
                if (this.enemyType == 1) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
           
                if (this.enemyType == 2) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
            }
            }
         if (this.question[4]) {
            if (this.answer[0] === this.answerR) {
                this.correctAnswer = true
            }
             else 
                this.correctAnswer = false
            
        } 
        if (this.question[5]) {
            if (this.answer[0] === this.answerR) {
                this.correctAnswer = true
            } else 
                this.correctAnswer = false
            
        }  if (this.question[6]) {
            if (this.answer[0] === this.answerR) {
                if (this.enemyType == 1) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            
           
                if (this.enemyType == 2) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
            }
            
        }
         if (this.question[7]) {
            if (this.answer[0] === this.answerR) {
                if (this.enemyType == 1) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            
                if (this.enemyType === 2) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                }
            }
        if (this.question[8]) {
            if (this.answer[0] === this.answerR) {
                if (this.enemyType == 1) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            
                if (this.enemyType == 2) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            }
        }
      if (this.question[9]) {
            if (this.answer[0] === this.answerR) {
                if (this.enemyType == 1) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
           
                if (this.enemyType == 2) {
                    this.correctAnswer = true
                } else 
                    this.correctAnswer = false
                
            } 
        }*/
    }

    createSlash(x, y, frame, velocity, flip = false) {
        this.slash.setPosition(x, y)
            .setActive(true)
            .setVisible(true)
            .setFrame(frame)
            .setFlipX(flip)
            .setVelocityX(velocity)
    }

    spriteHit(slash, sprite) {
        slash.x = 0
        slash.y = 0

        slash.setActive(false)
        slash.setVisible(false)

        if (sprite.texture.key == 'player') {
            sprite.anims.play('player-hit', true)
            if (this.scoreLabel.getScore() > 0) {
                this.scoreLabel.add(-50)
            }

        } else {
            sprite.anims.play('enemy-hit', true)
            this.scoreLabel.add(50)


        }

        this.time.delayedCall(500, () => {
            this.playerAttack = false
            this.enemyAttack = false
            this.correctAnswer = undefined
            this.generateQuestion()
        }
        )
    }

    createScoreLabel(x, y, score) {
        const style = { fontSize: '24px', fill: '#000', fontStyle: 'bold' }
        const label = new ScoreLabel(this, x, y, score, style).setDepth(1)

        this.add.existing(label)

        return label
    }

    gameOver() {
        this.countdownTimer -= 1
        if (this.countdownTimer < 0) {
            this.scene.start('game-over-scene', {
                score: this.scoreLabel.getScore()
            })
        }
    }
}