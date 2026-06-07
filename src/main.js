import Phaser from 'phaser'

import RuleScene from './scenes/RuleScene'
import MathFighterSceneNew from './scenes/MathFighterSceneNew'
import GameOverScene from './scenes/GameOverScene'


const config = {
	type: Phaser.AUTO,
	width: 480,
	height: 640,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [RuleScene, MathFighterSceneNew, GameOverScene]
}

export default new Phaser.Game(config)
