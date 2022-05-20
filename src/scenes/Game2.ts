import Phaser from 'phaser'
import TextureKeys2 from '~/consts/TextureKeys2'
import RocketMouse2 from './../game/RocketMouse2'

export default class Game2 extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite
  private mouse!: RocketMouse2
  private mouseHole!: Phaser.GameObjects.Image
  private window1!: Phaser.GameObjects.Image
  private window2!: Phaser.GameObjects.Image
  private bookcase1!: Phaser.GameObjects.Image
  private bookcase2!: Phaser.GameObjects.Image

  constructor() {
    super('game2')
  }
  init() {}
  //   preload() {}
  create() {
    const { width, height } = this.scale

    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys2.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)

    this.mouseHole = this.add.image(
      Phaser.Math.Between(400, 0),
      501,
      TextureKeys2.MouseHole,
    )

    this.window1 = this.add.image(450, 50, TextureKeys2.Window1).setOrigin(0, 0)

    this.mouse = new RocketMouse2(this, width * 0.5, height * 0.5)
    this.add.existing(this.mouse)

    const body = this.mouse.body as Phaser.Physics.Arcade.Body

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55)
    body.setCollideWorldBounds(true)
    body.setVelocityX(200)

    this.cameras.main.startFollow(this.mouse)
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
  }
  update() {}
}
