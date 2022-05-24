import Phaser from 'phaser'
import TextureKeys2 from '~/consts/TextureKeys2'

enum MouseState {
  Running,
  Killed,
  Dead,
}

export default class RocketMouse2 extends Phaser.GameObjects.Container {
  private mouse!: Phaser.GameObjects.Sprite
  private flame!: Phaser.GameObjects.Sprite
  private mouseState = MouseState.Running
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.mouse = scene.add
      .sprite(0, -30, TextureKeys2.RocketMouseAtlas)
      .setOrigin(0.5, 1)
      .play('rocketMouseRun')

    this.flame = scene.add
      .sprite(-63, -15, TextureKeys2.RocketMouseAtlas)
      .setOrigin(0.5, 1)

    this.flame.setVisible(false)

    scene.physics.add.existing(this)

    this.add(this.flame)
    this.add(this.mouse)

    const body = this.body as Phaser.Physics.Arcade.Body

    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7)
    body.setOffset(this.mouse.width * -0.3, -this.mouse.height - 15)

    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body
    switch (this.mouseState) {
      case MouseState.Running:
        {
          if (this.cursors.space.isDown) {
            body.setAccelerationY(-600)
            this.mouse.play('rocketMouseFly', true)
            this.flame.setVisible(true)
          } else {
            body.setAccelerationY(0)
            this.flame.setVisible(false)
          }

          if (body.blocked.down) {
            this.mouse.play('rocketMouseRun', true)
          }
        }
        break

      case MouseState.Killed:
        {
          body.velocity.x *= 0.99

          if (body.velocity.x <= 5) {
            this.mouseState = MouseState.Dead
          }
        }
        break

      case MouseState.Dead:
        {
          body.setVelocity(0, 0)
        }
        break
    }
  }
}
