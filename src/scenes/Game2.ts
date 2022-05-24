import Phaser from 'phaser'
import TextureKeys2 from '~/consts/TextureKeys2'
import RocketMouse2 from './../game/RocketMouse2'
import LaserObstacle2 from './../game/LaserObstacle2'

export default class Game2 extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite
  private mouse!: RocketMouse2
  private mouseHole!: Phaser.GameObjects.Image

  private window1!: Phaser.GameObjects.Image
  private window2!: Phaser.GameObjects.Image
  private windows: Phaser.GameObjects.Image[] = []

  private bookcase1!: Phaser.GameObjects.Image
  private bookcase2!: Phaser.GameObjects.Image
  private bookcases: Phaser.GameObjects.Image[] = []

  private laserObstacle2!: LaserObstacle2

  private coins!: Phaser.Physics.Arcade.StaticGroup

  private score = 0
  private scoreText!: Phaser.GameObjects.Text

  constructor() {
    super('game2')
  }

  init() {
    this.score = 0
  }

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

    this.window1 = this.add.image(50, 50, TextureKeys2.Window1).setOrigin(0, 0)
    this.window2 = this.add.image(350, 50, TextureKeys2.Window1).setOrigin(0, 0)

    this.windows = [this.window1, this.window2]

    this.bookcase1 = this.add
      .image(600, 380, TextureKeys2.Bookcase1)
      .setOrigin(0, 0.5)

    this.bookcase2 = this.add
      .image(850, 290, TextureKeys2.Bookcase2)
      .setOrigin(0, 0.5)

    this.bookcases = [this.bookcase1, this.bookcase2]

    this.laserObstacle2 = new LaserObstacle2(this, 1200, 300)
    this.add.existing(this.laserObstacle2)

    this.coins = this.physics.add.staticGroup()
    this.spawnCoins()

    this.mouse = new RocketMouse2(this, width * 0.5, height * 0.5)
    this.add.existing(this.mouse)

    const body = this.mouse.body as Phaser.Physics.Arcade.Body

    this.physics.add.overlap(
      this.coins,
      this.mouse,
      this.handleCollectCoins,
      undefined,
      this,
    )

    this.physics.add.overlap(
      this.laserObstacle2,
      this.mouse,
      this.handleOverlapLaser,
      undefined,
      this,
    )

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55)
    body.setCollideWorldBounds(true)
    body.setVelocityX(200)

    this.cameras.main.startFollow(this.mouse)
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

    this.scoreText = this.add
      .text(10, 10, `Score: ${this.score}`, {
        fontSize: '24px',
        color: '#080808',
        backgroundColor: '#f8e71c',
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setScrollFactor(0)
  }

  update() {
    const scrollX = this.cameras.main.scrollX

    this.wrapWindows()
    this.wrapBookcases()
    this.wrapLaserObstacle2()

    const coinsLength = this.coins.getLength()
    const lastCoinIndex = this.coins.children.entries[coinsLength - 1].body
      .gameObject.x

    if (lastCoinIndex < scrollX) {
      this.spawnCoins()
    }

    this.background.setTilePosition(scrollX)
  }

  private handleOverlapLaser(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
  ) {
    this.mouse.kill()
  }

  private wrapLaserObstacle2() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    const body = this.laserObstacle2.body as Phaser.Physics.Arcade.StaticBody

    const width = this.laserObstacle2.width
    if (this.laserObstacle2.x + width < scrollX) {
      this.laserObstacle2.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 1000,
      )

      this.laserObstacle2.y = Phaser.Math.Between(0, 300)

      body.position.x = this.laserObstacle2.x + body.offset.x
      body.position.y = this.laserObstacle2.y
    }
  }

  private spawnCoins() {
    this.coins.children.each((child) => {
      const coin = child as Phaser.Physics.Arcade.Sprite
      this.coins.killAndHide(coin)
      coin.body.enable = false
    })

    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let x = rightEdge + 100

    const numCoins = Phaser.Math.Between(1, 20)

    for (let i = 0; i < numCoins; ++i) {
      const coin = this.coins.get(
        x,
        Phaser.Math.Between(100, this.scale.height - 100),
        TextureKeys2.ObjectCoin,
      ) as Phaser.Physics.Arcade.Sprite

      coin.setVisible(true)
      coin.setActive(true)

      const body = coin.body as Phaser.Physics.Arcade.StaticBody
      body.setCircle(body.width * 0.5)
      body.enable = true

      // const coin = this.coins.create(
      //   x,
      //   Phaser.Math.Between(100, this.scale.height - 100),
      //   TextureKeys2.ObjectCoin,
      // ) as Phaser.Physics.Arcade.Sprite

      // const body = coin.body as Phaser.Physics.Arcade.StaticBody
      // body.setCircle(body.width * 0.5)
      // body.enable = true
      // 이렇게 써도 된다!

      body.updateFromGameObject()
      x += coin.width * 1.5
    }
  }

  private handleCollectCoins(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
  ) {
    const coin = obj2 as Phaser.Physics.Arcade.Sprite

    this.coins.killAndHide(coin)

    coin.body.enable = false

    this.score += 1
    this.scoreText.text = `Score: ${this.score}`
  }

  private wrapBookcases() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let width = this.bookcase1.width
    if (this.bookcase1.x + width <= scrollX) {
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800,
      )

      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase1.x - win.x) <= win.width
      })

      this.bookcase1.visible = !overlap
    }

    width = this.bookcase2.width
    if (this.bookcase2.x + width <= scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + width,
        this.bookcase1.x + width + 800,
      )

      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase2.x - win.x) <= win.width
      })

      this.bookcase2.visible = !overlap
    }
  }

  private wrapWindows() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let width = this.window1.width
    if (this.window1.x + width <= scrollX) {
      this.window1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800,
      )
    }

    width = this.window2.width
    if (this.window2.x + width <= scrollX) {
      this.window2.x = Phaser.Math.Between(
        this.window1.x + width,
        this.window1.x + width + 800,
      )
    }
  }
}
