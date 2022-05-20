import Phaser from 'phaser'

import Game2 from './scenes/Game2'
import Preloader2 from './scenes/Preloader2'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [Preloader2, Game2],
}

export default new Phaser.Game(config)
