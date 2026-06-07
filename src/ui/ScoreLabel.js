import Phaser from 'phaser'
const formatScore = (gameScore) => `Score: ${gameScore}`
export default class ScoreLabel extends Phaser.GameObjects.Text {
    constructor(scene, x, y, score, style) {
        super(scene, x, y, formatScore(score), style)
        this.score = score
    }
    setScore(score) {
        this.score = score
        this.setText(formatScore(this.score))
    }
    getScore() {
        return this.score
    }
    add(points) {
        this.setScore(this.score + points)
    }
}