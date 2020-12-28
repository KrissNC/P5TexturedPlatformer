import {VirtualConsole, PIXEL_TYPE, COLORMODE} from './VirtualConsole.js'
import {CONSOLE_COLOR, P5COLOR} from './ConsoleColors.js'
import {Plateformer} from './Plateformer.js'
import {ConsoleSprite} from './Sprite.js'

//let vs
let game;

let jario;
let jarioData;

let level;
let levelData;

function preload() {
  jarioData = loadBytes("assets/jario.spr");
  levelData = loadBytes("assets/level.spr");
}

function setup() {
  
  createCanvas(1280,1024); // divisible by 16
  noSmooth();
  setAttributes('antialias', false);

  jario = new ConsoleSprite();
  jario.parseBin(jarioData);

  level = new ConsoleSprite();
  level.parseBin(levelData);
  
  // let vs = new VirtualConsole( 20*16, 13*16, 4, 4, 'Roboto Mono', 8)
  let vs = new VirtualConsole( 20*16, 16*16, 4, 4, 'Roboto Mono', 8)
  vs.setColorMode(COLORMODE.CONSOLE) // colors will be given as integers from 0 to 31 in console mode, otherwise standard P5
  
  vs.setBg(CONSOLE_COLOR.BG_CYAN)
  vs.clear()

  // these are OK
  //vs = new VirtualConsole(160, 120, 4, 6, 'Courier Prime', 8)
  // vs = new VirtualConsole(160, 120, 4, 9, 'Consolas',8)

//  vs.setOriginX(20)
//  vs.setOriginY(10)
  
/*
  let txto() = async () { await(await fetch('jario.txt')).text()) }
  console.log(txto)
*/

  /*
  vs.textFill(0,0,0,0, PIXEL_TYPE.PIXEL_SOLID ,'orange')
  vs.textFill(0,1,0,1, PIXEL_TYPE.PIXEL_SOLID ,'green')
  
  vs.textFill(8,1,10,1, PIXEL_TYPE.PIXEL_SOLID ,'lightblue')
  vs.textFill(8,2,10,2, PIXEL_TYPE.PIXEL_SOLID ,'yellow')
  vs.textFill(8,3,10,4, 'A','white')
  vs.textFill(8,5,10,6, 'B' ,'white')
  */
  /*
  for (let i=0;i<10; i++) {
    vs.gotoXY(i,i)
    vs.putchar(PIXEL_TYPE.PIXEL_SOLID)
  }
  */
  
  game = new Plateformer(vs, jario, level )
  game.start();

  //game.onUserUpdate()
  //noLoop()
  
  //console.log(game)
  //game.draw()
}

function draw() {
  background(0);
  //vs.draw()
  game.onUserUpdate()
  game.draw()
}

window.preload=preload
window.setup = setup
window.draw = draw
