document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const cloud = document.createElement('div')
    const gravity = 0.9
    let cloudLeftSpace = 35 //50
    let startPoint = 150
    let cloudBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0
    let speed = 2
    
    function createcloud() {
      grid.appendChild(cloud)
      cloud.classList.add('cloud')
      doodlerLeftSpace = platforms[0].left
      cloud.style.left = cloudLeftSpace + 'px' 
      cloud.style.bottom = cloudBottomSpace + 'px'
    }
    
    class Platform {   
      constructor(newPlatformBottom) {
      this.bottom = newPlatformBottom
      this.left = Math.random() * 315
      this.visual = document.createElement('div')
        
      const visual = this.visual
      visual.classList.add('platform')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      grid.appendChild(visual)
      }
    }
    
    function createPlatforms() {
      for (let i =0; i < platformCount; i++) {
        let platformGap = 600 / platformCount
        let newPlatformBottom = 100 + i * platformGap
        let newPlatform = new Platform (newPlatformBottom)
        platforms.push(newPlatform)
        console.log(platforms)
      }
    }
    
    function movePlatforms() {
      if (cloudBottomSpace > 200) {
        platforms.forEach(platform => {
          platform.bottom -= 4
          let visual = platform.visual
          visual.style.bottom = platform.bottom + 'px'
          
          if (platform.bottom < 10) {
            let firstPlatform = platforms[0].visual
            firstPlatform.classList.remove('platform')
            platforms.shift()
            score ++
            console.log(platforms)
            let newPlatform = new Platform(600)
            platforms.push(newPlatform)
          }
        })
      }
    }
    
    function jump() {
      clearInterval(downTimerId)
      isJumping = true
      upTimerId = setInterval(function () {
        cloudBottomSpace += 20
        cloud.style.bottom = cloudBottomSpace + 'px'
        if (cloudBottomSpace > startPoint + 200) {
          fall()
        }
      },20)
    }
    
    function fall() {
      clearInterval(upTimerId)
      isJumping = false
      downTimerId = setInterval(function () {
        cloudBottomSpace -= 5
        cloud.style.bottom = cloudBottomSpace + 'px'
        if (cloudBottomSpace <= 0) {
          gameOver()
        }
        platforms.forEach(platform => {
          if (
          (cloudBottomSpace >= platform.bottom) &&
            (cloudBottomSpace <= platform.bottom + 15) &&
            ((cloudLeftSpace + 60) >= platform.left) &&
            (cloudLeftSpace <= (platform.left + 85)) &&
            !isJumping
          ) {
            console.log('landed')
            startPoint = cloudBottomSpace
            jump()
          }
        })
      },30)
    }
    
    function gameOver() {
      console.log('game over')
      isGameOver = true
      while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
      }
      grid.innerHTML = score
      clearInterval(upTimerId)
      clearInterval(downTimerId)
      clearInterval(leftTimerId)
      clearInterval(rightTimerId)
    }
    
    function control(e) {
      if (e.key === "ArrowLeft") {
        moveLeft()
      } else if (e.key === "ArrowRight") {
        moveRight()
      } else if (e.key === "ArrowUp") {
        moveStraight()
      }
    }
    
    function moveLeft() {
      if (isGoingRight) {
        clearInterval(rightTimerId)
        isGoingRight = false
      }
      isGoingLeft = true
      leftTimerId = setInterval(function () {
        if (cloudLeftSpace >= 0) {
          cloudLeftSpace -= 5
          cloud.style.left = cloudLeftSpace + 'px'
        } else moveRight()
        cloudLeftSpace -= 5
        cloud.style.left = cloudLeftSpace + 'px'
      },20)
    }
    
    function moveRight() {
      if (isGoingLeft) {
        clearInterval(leftTimerId)
        isGoingleft = false
      }
      isGoingRight = true
      rightTimerId = setInterval(function () {
        if (cloudLeftSpace<= 340) {
          cloudLeftSpace += 5
          cloud.style.left = cloudLeftSpace + 'px'
        } else moveLeft()
      })
    }
    
    function moveStraight() {
      isGoingRight = false
      isGoingLeft = false
      clearInterval(rightTimerId)
      clearInterval(leftTimerId)
    }
    
    function start() {
      if (!isGameOver) {
        createPlatforms()
        createcloud()
        setInterval(movePlatforms,30)
        jump()
        document.addEventListener('keyup', control)
      }
    }
    start()
  })
