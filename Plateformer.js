import {
  VirtualConsole,
  PIXEL_TYPE
} from "./VirtualConsole.js";

import {
  CONSOLE_COLOR
} from "./ConsoleColors.js";
import {
  ConsoleSprite
} from "./Sprite.js";

let sLevel = "";
let nLevelWidth;
let nLevelHeight;

// Player Properties
let fPlayerPosX;
let fPlayerPosY;

let fNewPlayerPosX;
let fNewPlayerPosY;

let fPlayerVelX;
let fPlayerVelY;
let bPlayerOnGround;

// Camera properties
let fCameraPosX;
let fCameraPosY;

let debugMode = true;

export class Plateformer {
  constructor(virtualScreen, jario, level) {
    if (debugMode) {
      this.debugScreen = new VirtualConsole(80, 6, 11, 12, "Roboto Mono", 14);
      //console.log(this.debugScreen)

      this.debugScreen.setOriginX(300);
      this.debugScreen.setOriginY(340);
      //this.debugScreen.setBg("lightgrey")
      //            this.debugScreen.clear()
    }

    this.Screen = virtualScreen;

    this.nTileWidth = 16;
    this.nTileHeight = 16;

    //debugger;
    /*
    let ScreenWidth = width; // canvas width
    let ScreenHeight = height; // canvas height
    */

    //  dynamic loading to be implemented = this.jarioText = this.jario.load('assets/jario.txt').then (response => response.toString())

    this.jario = jario;
    this.level = level;

    let ScreenWidth = this.Screen.ConsoleCharWidth();
    let ScreenHeight = this.Screen.ConsoleCharHeight();

    this.nVisibleTilesX = ScreenWidth / this.nTileWidth;
    this.nVisibleTilesY = ScreenHeight / this.nTileHeight;

    this.previousKeycode = 0;

    
    this.nDirModX = 0;
    this.nDirModY = 0;

  }

  start() {
    // Level storage
    nLevelWidth = 64;
    nLevelHeight = 16;

    sLevel = "";

    sLevel += "...............................................................#";
    sLevel += ".......OOOO....................................................#";
    sLevel += ".......OOOO....................................................#";
    sLevel += ".........................########.............................?#";
    sLevel += ".....BB?BB?BB..........###.............#.#....................B#";
    sLevel += ".....................###...............#.#......................";
    sLevel += "...................####.........................................";
    sLevel += "#####...#######MMM##...#############.############.......########";
    sLevel += "...................................#.#...............###........";
    sLevel += "...############.........############.#............###...........";
    sLevel += "...#..........#.........#............#.........###..............";
    sLevel += "........................#.###########.......###.................";
    sLevel += "........................#................###....................";
    sLevel += "........................#####........#####......................";
    sLevel += "....GGGGGG.........................#............................";
    sLevel += "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";
    /*
    sLevel += "................................................................";
    sLevel += "................................................................";
    sLevel += ".........OOOO...................................................";
    sLevel += "........OOOO....................................................";
    sLevel += ".......................########.................................";
    sLevel += ".....BB?BBBB?BB.......###..............#.#......................";
    sLevel += "....................###................#.#......................";
    sLevel += "...................####.........................................";
    sLevel += "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG.##############.....########";
    sLevel += "...................................#.#...............###........";
    sLevel += "........................############.#............###...........";
    sLevel += "........................#............#.........###..............";
    sLevel += "........................#.############......###.................";
    sLevel += "........................#................###....................";
    sLevel += "........................#################.......................";
    sLevel += "................................................................";
*/

    // Player Properties
    fPlayerPosY = 1.0;
    fPlayerVelX = 0.0;

    fPlayerVelY = 0.0;
    fPlayerPosX = 1.0;

    bPlayerOnGround = false;

    // Camera properties
    fCameraPosX = 0.0;
    fCameraPosY = 0.0;
  }

  onUserCreate() {
    this.start();
  }

  onUserUpdate() {
    // update and draw

    //fPlayerVelX = 0.0
    //fPlayerVelY = 0.0

    let elapsedTime = deltaTime / 1000;
    debugMode &&
      this.debug(
        0,
        3,
        "elapsedTime>" + nf(elapsedTime, 2, 5).toString() + "   "
      );
    //debugMode && this.debug(0,3, elapsedTime.toString() + "   ")

    this.Screen.clear();

    // handle input
    if (focused) {
      debugMode && this.debug(0, 5, "          "); // erase "lost focus" since we have focus !
      // result : this.requestedAction (one letter)
      if (keyIsPressed) {
        this.keyHeld = keyCode == this.previousKeyCode;
        // this.keyHeld = false;

        switch (keyCode) {
          case 38:
            fPlayerVelY += -6.0 * elapsedTime;
            break;

          case 40:
            fPlayerVelY += 6.0 * elapsedTime;
            //  this.requestedAction = "D"; // accelerate downwards
            //  break;
            break;

          case 37:
            // left
            fPlayerVelX += -13.0 * elapsedTime;
            this.nDirModY = 1;
            break;

          case 39:
            // right
            fPlayerVelX += 13.0 * elapsedTime;
            this.nDirModY = 0;
            break;

          case 32:
            if (!this.keyHeld) {
              // if "space" no double jump
              if (fPlayerVelY == 0) {
                fPlayerVelY = -13;
                this.nDirModX = 1;
              }
            }
            break;

            //case 27:
            //  this.requestedAction = "X"; // exit
            //  break;
          default:
        }
        this.previousKeyCode = keyCode;
      } else {
        this.keyHeld = false;
        this.previousKeyCode = 0;
      }
    } else {
      debugMode && this.debug(0, 5, "lost focus");
    }

    // gravity
    fPlayerVelY += 25.0 * elapsedTime;

    // Drag

    if (!keyIsPressed) {
      if (bPlayerOnGround)
        // {
        //fPlayerVelX += - 2.0 * fPlayerVelX  * elapsedTime;
        fPlayerVelX *= 0.88;
      if (Math.abs(fPlayerVelX) < 0.2) fPlayerVelX = 0.0;
      // }
    }

    fNewPlayerPosX = fPlayerPosX + fPlayerVelX * elapsedTime;
    fNewPlayerPosY = fPlayerPosY + fPlayerVelY * elapsedTime;

    // Clamp velocities
    let maxVel = 8.0;
    if (fPlayerVelX > maxVel) fPlayerVelX = maxVel;

    if (fPlayerVelX < -maxVel) fPlayerVelX = -maxVel;

    if (fPlayerVelY > maxVel * 10) fPlayerVelY = maxVel * 10;

    if (fPlayerVelY < -maxVel * 10) fPlayerVelY = -maxVel * 10;

    // Check for Collision
    if (fPlayerVelX <= 0) {
      // Moving Left
      if (
        this.getTileChar(0 | fNewPlayerPosX, 0 | fPlayerPosY) != "." ||
        this.getTileChar(fNewPlayerPosX | 0, 0 | (fPlayerPosY + 0.9)) != "."
      ) {
        fNewPlayerPosX = (0 | fNewPlayerPosX) + 1;
        fPlayerVelX = 0.0;
      }
    } // Moving Right
    else {
      if (
        this.getTileChar((fNewPlayerPosX + 1.0) | 0, fPlayerPosY | 0) != "." ||
        this.getTileChar((fNewPlayerPosX + 1.0) | 0, (fPlayerPosY + 0.9) | 0) !=
        "."
      ) {
        fNewPlayerPosX = 0 | fNewPlayerPosX;
        fPlayerVelX = 0.0;
      }
    }

    bPlayerOnGround = false;
    if (fPlayerVelY <= 0) {
      // Moving Up
      if (
        this.getTileChar(fNewPlayerPosX | 0, fNewPlayerPosY | 0) != "." ||
        this.getTileChar((fNewPlayerPosX + 0.9) | 0, fNewPlayerPosY | 0) != "."
      ) {
        fNewPlayerPosY = (0 | fNewPlayerPosY) + 1;
        fPlayerVelY = 0;
      }
    } // Moving Down
    else {
      if (
        this.getTileChar(0 | fNewPlayerPosX, (fNewPlayerPosY + 1.0) | 0) !=
        "." ||
        this.getTileChar(
          (fNewPlayerPosX + 0.9) | 0,
          (fNewPlayerPosY + 1.0) | 0
        ) != "."
      ) {
        fNewPlayerPosY = 0 | fNewPlayerPosY;
        fPlayerVelY = 0;
        bPlayerOnGround = true; // Player has a solid surface underfoot
        this.nDirModX = 0;
        // nDirModX = 0;
      }
    }

    debugMode &&
      this.debug(0, 4, "VelocityX>" + nf(fPlayerVelX, 2, 2).toString() + "  ");
    debugMode &&
      this.debug(20, 4, "VelocityY>" + nf(fPlayerVelY, 2, 2).toString() + "  ");

    fPlayerPosX = fNewPlayerPosX;
    fPlayerPosY = fNewPlayerPosY;

    // Link camera to player position

    fCameraPosX = fPlayerPosX;
    fCameraPosY = fPlayerPosY;

    // Calculate Top-Leftmost visible tile
    this.fOffsetX = fCameraPosX - (this.nVisibleTilesX + 0.0) / 2.0;
    this.fOffsetY = fCameraPosY - (this.nVisibleTilesY + 0.0) / 2.0;

    // Clipping
    if (this.fOffsetX < 0) this.fOffsetX = 0;
    if (this.fOffsetY < 0) this.fOffsetY = 0;

    let maximumX = nLevelWidth - this.nVisibleTilesX;
    if (this.fOffsetX > maximumX) this.fOffsetX = maximumX;

    if (this.fOffsetY > nLevelHeight - this.nVisibleTilesY)
      this.fOffsetY = nLevelHeight - this.nVisibleTilesY;

    debugMode &&
      this.debug(30, 0, "fOfssetX>" + nf(this.fOffsetX, 2, 2).toString());
    debugMode &&
      this.debug(30, 1, "fOfssetY>" + nf(this.fOffsetY, 2, 2).toString());

    debugMode &&
      this.debug(0, 2, "IsOnFloor>" + bPlayerOnGround.toString() + "  ");
    //console.log("offsetX ",this.fOffsetX)
    //console.log(this.fOffsetY)

    /*
    
    // this displays the whole level
    for (let x=0; x<64; x++)
        for (let y=0; y<16; y++) {
            let c = this.getTileChar(x,y)
            this.Screen.gotoXY(x+96,y)            
            this.Screen.putchar(c)    
        }
    */

    let TileChar;

    // Get offsets for smooth movement
    let fTileOffsetX = (this.fOffsetX - (this.fOffsetX | 0)) * this.nTileWidth;
    let fTileOffsetY = (this.fOffsetY - (this.fOffsetY | 0)) * this.nTileHeight;

    for (let x = 0; x < this.nVisibleTilesX; x++) {
      for (let y = 0; y < this.nVisibleTilesY; y++) {
        TileChar = this.getTileChar(
          x + parseInt(this.fOffsetX),
          y + parseInt(this.fOffsetY)
        );

        switch (TileChar) {
          case ".": // sky
            break;
          case "?":
            this.level.DrawPartialSprite(
              this.Screen,
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              this.nTileWidth,
              this.nTileHeight,
              this.nTileWidth,
              this.nTileHeight
            );
            /*
            this.Screen.textFill(
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              (x + 1) * this.nTileWidth - ((0 | fTileOffsetX)),
              (y + 1) * this.nTileHeight - ((0 | fTileOffsetY)),
              PIXEL_TYPE.PIXEL_SOLID,
              CONSOLE_COLOR.FG_CYAN
            );
            */
            break;
          case "B":
            /*
            this.Screen.textFill(
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              (x + 1) * this.nTileWidth - (1 + (0 | fTileOffsetX)),
              (y + 1) * this.nTileHeight - (1 + (0 | fTileOffsetY)),
              PIXEL_TYPE.PIXEL_SOLID,
              CONSOLE_COLOR.FG_BLUE
            );*/
            this.level.DrawPartialSprite(
              this.Screen,
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              0 * this.nTileWidth,
              1 * this.nTileHeight,
              this.nTileWidth,
              this.nTileHeight
            );
            break;

          case "O":
            this.level.DrawPartialSprite(
              this.Screen,
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              3 * this.nTileWidth,
              0 * this.nTileHeight,
              this.nTileWidth,
              this.nTileHeight
            );
            /*
            this.Screen.textFill(
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              (x + 1) * this.nTileWidth - (1 + (0 | fTileOffsetX)),
              (y + 1) * this.nTileHeight - (1 + (0 | fTileOffsetY)),
              PIXEL_TYPE.PIXEL_SOLID,
              CONSOLE_COLOR.FG_DARK_YELLOW
            );
            */
            break;
          case "G":
            this.level.DrawPartialSprite(
              this.Screen,
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              0 * this.nTileWidth,
              0 * this.nTileHeight,
              this.nTileWidth,
              this.nTileHeight
            );
            // this.Screen.textFill(
            //   x * this.nTileWidth - (0 | fTileOffsetX),
            //   y * this.nTileHeight - (0 | fTileOffsetY),
            //   (x + 1) * this.nTileWidth - ((0 | fTileOffsetX)),
            //   (y + 1) * this.nTileHeight - ((0 | fTileOffsetY)),
            //   PIXEL_TYPE.PIXEL_SOLID,
            //   CONSOLE_COLOR.FG_DARK_BLUE
            // );
            break;
          case "#":
            this.level.DrawPartialSprite(
              this.Screen,
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              2 * this.nTileWidth,
              0 * this.nTileHeight,
              this.nTileWidth,
              this.nTileHeight
            );
            /*
            this.Screen.textFill(
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              (x + 1) * this.nTileWidth - (1 + (0 | fTileOffsetX)),
              (y + 1) * this.nTileHeight - (1 + (0 | fTileOffsetY)),
              PIXEL_TYPE.PIXEL_SOLID,
              CONSOLE_COLOR.FG_YELLOW
            );*/
            break;
          case "M":
            this.level.DrawPartialSprite(
              this.Screen,
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              1 * this.nTileWidth,
              0 * this.nTileHeight,
              this.nTileWidth,
              this.nTileHeight
            );
            /*
            this.Screen.textFill(
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              (x + 1) * this.nTileWidth - (1 + (0 | fTileOffsetX)),
              (y + 1) * this.nTileHeight - (1 + (0 | fTileOffsetY)),
              PIXEL_TYPE.PIXEL_SOLID,
              CONSOLE_COLOR.FG_YELLOW
            );*/
            break;
          default:
            console.log("alert ! : unknown " + TileChar);
            this.Screen.textFill(
              x * this.nTileWidth - (0 | fTileOffsetX),
              y * this.nTileHeight - (0 | fTileOffsetY),
              (x + 1) * this.nTileWidth - (1 + (0 | fTileOffsetX)),
              (y + 1) * this.nTileHeight - (1 + (0 | fTileOffsetY)),
              PIXEL_TYPE.PIXEL_SOLID,
              CONSOLE_COLOR.FG_RED
            );
            break;
        } //switch
      } // 2nd for
    } // end for

    debugMode &&
      this.debug(
        0,
        0,
        "player pos X>" + nf(fPlayerPosX, 2, 2).toString() + "  "
      );
    debugMode &&
      this.debug(
        0,
        1,
        "player pos Y>" + nf(fPlayerPosY, 2, 2).toString() + "  "
      );

    // player
    let xP = fPlayerPosX - this.fOffsetX;
    let yP = fPlayerPosY - this.fOffsetY;

    debugMode && this.debug(46, 0, "subtractionX>" + nf(xP, 2, 2).toString());
    debugMode && this.debug(46, 1, "subtractionY>" + nf(yP, 2, 2).toString());

    /*
    this.Screen.textFill(
      (xP * this.nTileWidth) | 0,
      0 | (yP * this.nTileHeight),
      0 | ((xP + 1.0) * this.nTileWidth - 1),
      0 | ((yP + 1.0) * this.nTileHeight - 1),
      PIXEL_TYPE.PIXEL_SOLID,
      CONSOLE_COLOR.FG_RED
    );
    */

    // origginal C++
    // DrawPartialSprite((fPlayerPosX - fOffsetX) * nTileWidth, (fPlayerPosY - fOffsetY) * nTileWidth, spriteMan, nDirModX * nTileWidth, nDirModY * nTileHeight, nTileWidth, nTileHeight);

    this.jario.DrawPartialSprite(
      this.Screen,
      (0 | (xP * this.nTileWidth)),
      (0 | (yP * this.nTileHeight)),
      this.nDirModX * this.nTileWidth,
      this.nDirModY * this.nTileHeight,
      this.nTileWidth,
      this.nTileHeight
    );


  }

  getTileChar(xx, yy) {
    if (xx > -1 && xx < nLevelWidth && yy > -1 && yy < nLevelHeight) {
      return sLevel.charAt(xx + yy * nLevelWidth);
    }
    // out of bounds, error
    return "!";
  }

  setTileChar(xx, yy, c) {
    let index = xx + yy * nLevelWidth;
    let newLevel = sLevel.substr(0, index) + c + sLevel.substr(index + 1);
    sLevel = newLevel;
  }

  draw() {
    this.Screen.draw();

    debugMode && this.debugScreen.draw();

    // this.jario.drawToScreen(0,0 , 4)
  }

  debug(x, y, st) {
    this.debugScreen.gotoXY(x, y);
    this.debugScreen.write(st);
  }
}