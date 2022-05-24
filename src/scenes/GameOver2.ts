import Phaser from 'phaser'

export default class GameOver2 extends Phaser.Scene {
  constructor() {
    super('gameover2')
  }

  create() {
    const { width, height } = this.scale

    const x = width * 0.5
    const y = height * 0.5

    this.add
      .text(x, y, 'Press SPACE to Play Again', {
        fontSize: '32px',
        color: '#ffffff',
        backgroundColor: '#000000',
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.stop('gameover2')
      this.scene.stop('game2')

      this.scene.start('game2')
    })
  }
}
