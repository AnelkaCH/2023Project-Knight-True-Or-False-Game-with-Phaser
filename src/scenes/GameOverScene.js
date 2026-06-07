import Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super ('game-over-scene')
    }
    preload() {
        this.load.image('replay-btn', 'images/rb.png')
        this.load.image('gm', 'images/gameover.png')
        this.load.image('bg', 'images/bg_layer1.png')
    }
    create(){
        this.add.image(240, 240, 'bg')
        this.add.image(240, 180, 'gm')

        var replayB = this.add.image(240, 400, 'replay-btn').setInteractive().setScale(0.15)
        replayB.on('pointerdown', () => {
            this.scene.start('math-fighter-scene')
        }, this)
    }
}