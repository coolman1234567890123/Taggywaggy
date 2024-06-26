function checkIfWon () {
    if (sprites2.length == 1) {
        if (sprites2[0] == mp.getPlayerSprite(mp.PlayerNumber.One)) {
            game.splash("Player 1 Wins!")
        } else if (sprites2[0] == mp.getPlayerSprite(mp.PlayerNumber.Two)) {
            game.splash("Player 2 Wins!")
        } else if (sprites2[0] == mp.getPlayerSprite(mp.PlayerNumber.Three)) {
            game.splash("Player 3 Wins!")
        } else {
            game.splash("Player 4 Wins!")
        }
        game.reset()
    }
}
mp.onLifeZero(function (player2) {
    mp.getPlayerSprite(player2).destroy(effects.fire, 500)
    sprites2.removeAt(sprites2.indexOf(mp.getPlayerSprite(player2)))
    if (it == mp.getPlayerSprite(player2)) {
        it.sayText("", 2000, false)
        it = sprites2._pickRandom()
        youreIt()
    }
    checkIfWon()
})
function youreIt () {
    it.sayText("It", 2000, false)
    it.setPosition(randint(5, 155), randint(15, 115))
    it.setKind(SpriteKind.Enemy)
    info.startCountdown(10)
}
info.onCountdownEnd(function () {
    it.setKind(SpriteKind.Player)
    reduceLife(it)
    it = sprites2._pickRandom()
    youreIt()
})
function reduceLife (sprite: Sprite) {
    if (sprite == mp.getPlayerSprite(mp.PlayerNumber.One)) {
        mp.changePlayerStateBy(mp.PlayerNumber.One, MultiplayerState.Lives, -1)
    } else if (sprite == mp.getPlayerSprite(mp.PlayerNumber.Two)) {
        mp.changePlayerStateBy(mp.PlayerNumber.Two, MultiplayerState.Lives, -1)
    } else if (sprite == mp.getPlayerSprite(mp.PlayerNumber.Three)) {
        mp.changePlayerStateBy(mp.PlayerNumber.Three, MultiplayerState.Lives, -1)
    } else {
        mp.changePlayerStateBy(mp.PlayerNumber.Four, MultiplayerState.Lives, -1)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.stopCountdown()
    it.sayText("", 2000, false)
    reduceLife(sprite)
    it = sprite
    otherSprite.setKind(SpriteKind.Player)
    youreIt()
})
let it: Sprite = null
let sprites2: Sprite[] = []
game.showLongText("lets play taggy waggy", DialogLayout.Center)
game.showLongText("Brighton and arsenal are doo doo so kill them >:D", DialogLayout.Center)
sprites2 = [
sprites.create(assets.image`ghost`, SpriteKind.Player),
sprites.create(assets.image`duck`, SpriteKind.Player),
sprites.create(assets.image`bat`, SpriteKind.Player),
sprites.create(assets.image`crab`, SpriteKind.Player)
]
for (let value of mp.allPlayers()) {
    mp.setPlayerSprite(value, sprites2[mp.playerToIndex(value)])
    mp.moveWithButtons(value, mp.getPlayerSprite(value))
    mp.getPlayerSprite(value).setStayInScreen(true)
    mp.setPlayerState(value, MultiplayerState.Lives, 3)
}
mp.getPlayerSprite(mp.PlayerNumber.One).setPosition(5, 15)
mp.getPlayerSprite(mp.PlayerNumber.Two).setPosition(155, 15)
mp.getPlayerSprite(mp.PlayerNumber.Three).setPosition(5, 105)
mp.getPlayerSprite(mp.PlayerNumber.Four).setPosition(155, 105)
it = sprites2._pickRandom()
youreIt()
