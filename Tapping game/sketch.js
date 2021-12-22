var MC
var shopOwner
var mcIMG, shopOwnerIMG, bgIMG
var upg, taps
var score = 0
var upgCount = 0
var rate = 1
var gemsCollected = 0
var scoreSuffix
function preload() {
    mcIMG = loadImage("MainCharacter.png")
    shopOwnerIMG = loadImage("ShopOwner.png")
    bgIMG = loadImage("bgImg.jpg")
    upgImg = loadImage("upgrades.png")
    reward1Img = loadImage("Reward1.png")
    reward2Img = loadImage("Reward2.png")
    reward3Img = loadImage("Reward3.png")
    reward4Img = loadImage("Reward4.png")
    reward5Img = loadImage("Reward5.png")
}


function setup() {
    createCanvas(windowWidth, windowHeight)
    MC = createSprite(500, height - 300, 20, 20)
    MC.addImage(mcIMG)
    MC.scale = .5
    shopOwner = createSprite(250, height - 300, 20, 20)
    shopOwner.addImage(shopOwnerIMG)
    shopOwner.scale = .48
    taps = createImg("Taps.png")
    taps.position(width / 2, height - 200)
    taps.size(200, 200)
    taps.mouseClicked(tapsAdd)
    upgGroup = new Group()

    reward1 = createSprite(160, height - 250, 20, 20)
    reward1.visible = false
    reward1.addImage(reward1Img)
    reward1.scale = 0.3

    reward2 = createSprite(200, height - 320, 20, 20)
    reward2.visible = false
    reward2.addImage(reward2Img)
    reward2.scale = 0.3

    reward3 = createSprite(250, height - 410, 20, 20)
    reward3.visible = false
    reward3.addImage(reward3Img)
    reward3.scale = 0.3

    reward4 = createSprite(320, height - 320, 20, 20)
    reward4.visible = false
    reward4.addImage(reward4Img)
    reward4.scale = 0.3

    reward5 = createSprite(340, height - 250, 20, 20)
    reward5.visible = false
    reward5.addImage(reward5Img)
    reward5.scale = 0.15
}

function draw() {
    background(bgIMG)
    if (keyIsDown(UP_ARROW) && MC.y > height / 2) {
        MC.y = MC.y - 10
    }
    if (keyIsDown(DOWN_ARROW) && MC.y < height - 90) {
        MC.y = MC.y + 10
    }
    if (keyIsDown(LEFT_ARROW) && MC.x > 30) {
        MC.x = MC.x - 10
    }
    if (keyIsDown(RIGHT_ARROW) && MC.x < width - 30) {
        MC.x = MC.x + 10
    }
    if (score > 1000) {
        reward1.visible = true
        rate = rate + 5
    }
    if (score > 1000000) {
        reward2.visible = true
        rate = rate + 50
    }
    if (score > 1000000000) {
        reward3.visible = true
        rate = rate + 100
    }
    if (gemsCollected > 100) {
        reward4.visible = true
        rate = rate + 9999
    }
    if (gemsCollected > 1000) {
        reward5.visible = true
        rate = rate + 9999999
    }
    drawSprites();
    // console.log(rate)
    textSize(50)
    fill("black")

    if (score >= 0 && score < 1000000) {
        text("Taps: " + score, 20, 50)
    }
    else if (score >= 1000000 && score < 1000000000) {
        scoreSuffix = (score / 1000000).toFixed(2) 
        text("Taps: " + scoreSuffix + "  Million", 20, 50)
    }
    else if (score >= 1000000000) {
        scoreSuffix = (score / 1000000000).toFixed(2)  
        text("Taps: " + scoreSuffix + "  Billion", 20, 50)

    }

    text("Gems Collected: " + gemsCollected, 20, 120)
    createGems();
    MC.overlap(upgGroup, function (collector, collected) {
        collected.remove()
        rate = rate + 1
        upgCount = upgCount - 1
        gemsCollected = gemsCollected + 1
    })


}
function tapsAdd() {
    score = score + rate

}
function createGems() {
    if (frameCount % 60 === 0 && upgCount < 25) {
        upg = createSprite(random(30, width - 30), random(height / 2 + 40, height - 90))
        upgCount = upgCount + 1
        upg.scale = .1
        upg.addImage(upgImg)
        upgGroup.add(upg)
    }

}