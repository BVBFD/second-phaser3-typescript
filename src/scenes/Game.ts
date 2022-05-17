import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
import SceneKeys from '~/consts/SceneKeys'
import AnimationKeys from '~/consts/AnimationKeys'

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite

  constructor() {
    super(SceneKeys.Game)
  }

  init() {}

  preload() {
    // this.load.image('background', 'house/bg_repeat_340x640.png')
    // this.load.atlas(
    //   'rocket-mouse',
    //   'characters/rocket-mouse.png',
    //   'characters/rocket-mouse.json',
    // )
  }

  create() {
    this.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    })

    // this is the same with the generateFrameNames()
    // this.anims.create({
    //   key: 'rocket-mouse-run',
    //   frames: [
    //     { key: 'rocket-mouse', frame: 'rocketmouse_run01.png' },
    //     { key: 'rocket-mouse', frame: 'rocketmouse_run02.png' },
    //     { key: 'rocket-mouse', frame: 'rocketmouse_run03.png' },
    //     { key: 'rocket-mouse', frame: 'rocketmouse_run04.png' },
    //   ],
    //   frameRate: 10,
    //   repeat: -1,
    // })

    this.add.image(0, 0, TextureKeys.Background).setOrigin(0, 0)

    const width = this.scale.width
    const height = this.scale.height

    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)

    const mouse = this.physics.add
      .sprite(
        width * 0.5,
        height - 30,
        TextureKeys.RocketMouse,
        'rocketmouse_fly01.png',
      )
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun)

    const body = mouse.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)

    body.setVelocityX(200)

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30)

    this.cameras.main.startFollow(mouse)
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
  }

  update(t: number, dt: number) {
    this.background.setTilePosition(this.cameras.main.scrollX)
  }
}
