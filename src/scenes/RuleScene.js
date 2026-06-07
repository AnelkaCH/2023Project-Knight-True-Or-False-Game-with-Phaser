import Phaser from 'phaser'

export default class RuleScene extends Phaser.Scene {
    constructor() {
        super ('rule-scene')
    }
    preload() {
        this.load.image('nb', 'images/nb.png')
        this.load.image('bg', 'images/bg_layer1.png')
    }
    create(){
        this.add.image(240, 240, 'bg')

        this.add.text(10, 100, 'Rules:', { fontSize: '32px', fill: '#F806B2', fontFamily: 'Chalkduster, fantasy' })
        this.add.text(10, 150, '-The demon will give you questions, answer them correctly!', { fontSize: '32px', fill: '#F806B2', fontFamily: 'Chalkduster, fantasy' })
        this.add.text(10, 200, 'answer them correctly!', { fontSize: '32px', fill: '#F806B2', fontFamily: 'Chalkduster, fantasy' })

        var replayB = this.add.image(240, 400, 'nb').setInteractive().setScale(0.50)
        replayB.on('pointerdown', () => {
            this.scene.start('math-fighter-scene')
        }, this)
    }
}