import Phaser from 'phaser'
import TextureKeys2 from '~/consts/TextureKeys2'

enum MouseState {
  Running,
  Killed,
  Dead,
}

export default class RocketMouse2 extends Phaser.GameObjects.Container {
  private mouse!: Phaser.GameObjects.Sprite
  private mouseState = MouseState.Running

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.mouse = scene.add
      .sprite(0, -30, TextureKeys2.RocketMouseAtlas)
      .setOrigin(0.5, 1)
      .play('rocketMouseRun')

    this.add(this.mouse)
    scene.physics.add.existing(this)

    const body = this.body as Phaser.Physics.Arcade.Body

    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7)
    body.setOffset(this.mouse.width * -0.3, -this.mouse.height - 15)
  }

  preUpdate() {}
}
