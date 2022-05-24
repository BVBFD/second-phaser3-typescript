import Phaser from 'phaser'
import TextureKeys2 from '~/consts/TextureKeys2'

export default class Preloader2 extends Phaser.Scene {
  constructor() {
    super('preloader2')
  }

  init() {}
  preload() {
    this.load.image(TextureKeys2.Background, 'house/bg_repeat_340x640.png')
    this.load.image(TextureKeys2.MouseHole, 'house/object_mousehole.png')

    this.load.image(TextureKeys2.Window1, 'house/object_window1.png')
    this.load.image(TextureKeys2.Window2, 'house/object_window2.png')

    this.load.image(TextureKeys2.Bookcase1, 'house/object_bookcase1.png')
    this.load.image(TextureKeys2.Bookcase2, 'house/object_bookcase2.png')

    this.load.image(TextureKeys2.LaserEnd, 'house/object_laser_end.png')
    this.load.image(TextureKeys2.LaserMiddle, 'house/object_laser.png')

    this.load.atlas(
      TextureKeys2.RocketMouseAtlas,
      'characters/rocket-mouse.png',
      'characters/rocket-mouse.json',
    )

    this.load.image(TextureKeys2.ObjectCoin, 'house/object_coin.png')
  }
  create() {
    this.anims.create({
      key: 'rocketMouseRun',
      frames: this.anims.generateFrameNames(TextureKeys2.RocketMouseAtlas, {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'rocketMouseFlameRun',
      frames: this.anims.generateFrameNames(TextureKeys2.RocketMouseAtlas, {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'rocketMouseFall',
      frames: [
        {
          key: TextureKeys2.RocketMouseAtlas,
          frame: 'rocketmouse_fall01.png',
        },
      ],
    })

    this.anims.create({
      key: 'rocketMouseFly',
      frames: [
        {
          key: TextureKeys2.RocketMouseAtlas,
          frame: 'rocketmouse_fly01.png',
        },
      ],
    })

    this.anims.create({
      key: 'rocketMouseDead',
      frames: this.anims.generateFrameNames(TextureKeys2.RocketMouseAtlas, {
        start: 1,
        end: 2,
        prefix: 'rocketmouse_dead',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 10,
    })

    this.scene.start('game2')
  }
  update() {}
}
