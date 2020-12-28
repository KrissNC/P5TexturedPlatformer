import { CONSOLE_COLOR, P5COLOR } from "./ConsoleColors.js";

export class ConsoleSprite {
  constructor(...params) {
    this.m_Glyphs = [];
    this.m_Colours = [];

    if (params.length == 2) {
      this.nWidth = params[0];
      this.nHeight = params[1];
      this.create(this.nWidth, this.nHeight);
    } else {
      this.nWidth = 0;
      this.nHeight = 0;
    }

    this.P5colors = new P5COLOR();
  }

  async Load(file) {
    let promis = await fetch(file);
    const buffer = await promis.text();
    // console.log(this.data);
    // this loags the content of the file
    // now how do I get it from outside .
    return buffer; // returns a promise ... (
  }

  create(w, h) {
    for (let i = 0; i < w * h; i++) {
      this.m_Glyphs.push(" ");
      this.m_Colours.push(CONSOLE_COLOR.BG_BLACK); // black
    }
  }

  parseBin(buffer) {
    this.nWidth = this.readInt32(buffer, 0);
    this.nHeight = this.readInt32(buffer, 4);

    //console.log(text)
    let sizePart = 8; // 4 for width 4 for height

    let dataPartLength = buffer.bytes.length - sizePart; // 8192 jario

    // console.log(dataPartLength);

    let dataOffSet = sizePart;

    let colorPartLength = dataPartLength / 2; // jario : 4096 bytes each part
    // let glyphPartLength = colorPartLength; unused

    let nbColors = colorPartLength / 2; // 2048 shortInt () ==> 64*32 !
    let nbGlyphs = nbColors;

    // console.log(nbColors);

    let shortInt;

    // parse colors
    let offset = 0;
    while (offset < nbColors) {
      shortInt = this.readShortInt(buffer, dataOffSet + offset * 2);
      this.m_Colours.push(shortInt);
      offset++;
    }

    dataOffSet = 8 + nbColors * 2;

    // parse glyphs
    offset = 0;
    while (offset < nbGlyphs) {
      shortInt = this.readShortInt(buffer, dataOffSet + offset * 2);
      this.m_Glyphs.push(shortInt);
      offset++;
    }
  }

  readShortInt(buffer, offset) {
    let val = buffer.bytes[offset] + 256 * buffer.bytes[offset + 1];
    return val;
  }

  readInt32(buffer, offset) {
    let val =
      buffer.bytes[offset] +
      256 * buffer.bytes[offset + 1] +
      256 * 256 * buffer.bytes[offset + 2] +
      256 * 256 * 256 * buffer.bytes[offset + 3];
    return val;
  }

  // unused
  P5drawToScreen(X, Y, blockSize) {
    let glyph;
    let col;

    for (let y = 0; y < this.nHeight; y++) {
      for (let x = 0; x < this.nWidth; x++) {
        glyph = this.m_Glyphs[x + y * this.nWidth];
        if (glyph == 32) continue;

        col = this.m_Colours[x + y * this.nWidth];
        fill(this.P5colors._c(col));
        rect(x * blockSize + X, Y + y * blockSize, blockSize, blockSize);
      }
    }
  }

  DrawSprite(VirtualConsole, X, Y) { // == DrawSprite in Javid's

    /*    
    this.nbElems = this.nbCols * this.nbLines
    this.inks = new Array(this.nbElems)
    this.bgs  = new Array(this.nbElems)
    this.chars= new Array(this.nbElems)
    */
    let glyph;
    let color;
    let DestX;
    let DestY;
    let consoleWidth=VirtualConsole.ConsoleCharWidth()

    for (let y = 0; y < this.nHeight; y++) {
      for (let x = 0; x < this.nWidth; x++) {
        glyph = this.m_Glyphs[x + y * this.nWidth];

        if (glyph == 32) continue;

        // some glyph here
        DestX = X + x;
        DestY = (Y + y)*consoleWidth

        color = this.m_Colours[x + y * this.nWidth];

        VirtualConsole.chars[DestX + DestY] = '\u2588';
        // VirtualConsole.chars[DestX + DestY] = glyph;

        // ink should/could be splitted in fg and bg
        VirtualConsole.inks[DestX + DestY] = color;
      }
    }
  }

  DrawPartialSprite(VirtualConsole, X, Y, ox, oy, w, h) { // == PartialDrawSprite in Javid's

  let glyph;
  let color;

  let DestX;
  let DestY;

  let consoleWidth=VirtualConsole.ConsoleCharWidth()

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      glyph = this.m_Glyphs[(x+ox) + (y+oy)*this.nWidth];
      if (glyph == 32) continue;

      //console.log
      DestX = X + x;
      DestY = (Y + y) * consoleWidth;

      color = this.m_Colours[(x+ox) + (y+oy)*this.nWidth];

      VirtualConsole.chars[DestX + DestY] = '\u2588';
      // VirtualConsole.chars[DestX + DestY] = glyph;

      // ink should/could be splitted in fg and bg
      // VirtualConsole.inks[DestX + DestY] = color;
      VirtualConsole.inks[DestX + DestY] = color ; //this.P5colors.CONSOLE_COLOR.y;
    }
  }
}

}
