export const CONSOLE_COLOR = {
  FG_BLACK: 0x0000,
  FG_DARK_BLUE: 0x0001,
  FG_DARK_GREEN: 0x0002,
  FG_DARK_CYAN: 0x0003,
  FG_DARK_RED: 0x0004,
  FG_DARK_MAGENTA: 0x0005,
  FG_DARK_YELLOW: 0x0006,
  FG_GREY: 0x0007, // Thanks MS :-/
  FG_DARK_GREY: 0x0008,
  FG_BLUE: 0x0009,
  FG_GREEN: 0x000a,
  FG_CYAN: 0x000b,
  FG_RED: 0x000c,
  FG_MAGENTA: 0x000d,
  FG_YELLOW: 0x000e,
  FG_WHITE: 0x000f,
  BG_BLACK: 0x0000,
  BG_DARK_BLUE: 0x0010,
  BG_DARK_GREEN: 0x0020,
  BG_DARK_CYAN: 0x0030,
  BG_DARK_RED: 0x0040,
  BG_DARK_MAGENTA: 0x0050,
  BG_DARK_YELLOW: 0x0060,
  BG_GREY: 0x0070,
  BG_DARK_GREY: 0x0080,
  BG_BLUE: 0x0090,
  BG_GREEN: 0x00a0,
  BG_CYAN: 0x00b0,
  BG_RED: 0x00c0,
  BG_MAGENTA: 0x00d0,
  BG_YELLOW: 0x00e0,
  BG_WHITE: 0x00f0,
};

export class P5COLOR {
  _c(index) {
    return this.colors[index];
  }

  getFGColor(index) {
    return this.fgcolors[index];
  }

  getBGColor(index) {
    return this.bgcolors[index];
  }

  constructor() {
    let idx = 0;
    this.colors = [];
    this.fgcolors = [];
    this.bgcolors = [];

    this.colors[idx] = color("black");
    this.fgcolors[idx] = color("black");
    this.bgcolors[idx << 4] = color("black");

    idx++;
    this.colors[idx] = color("darkblue");
    this.fgcolors[idx] = color("darkblue");
    this.bgcolors[idx << 4] = color("darkblue");

    idx++;
    this.colors[idx] = color("darkgreen");
    this.fgcolors[idx] = color("darkgreen");
    this.bgcolors[idx << 4] = color("darkgreen");

    idx++;
    this.colors[idx] = color("darkcyan");
    this.fgcolors[idx] = color("darkcyan");
    this.bgcolors[idx << 4] = color("darkcyan");

    idx++;
    this.colors[idx] = color("darkred");
    this.fgcolors[idx] = color("darkred");
    this.bgcolors[idx << 4] = color("darkred");

    idx++;
    this.colors[idx] = color("darkmagenta");
    this.fgcolors[idx] = color("darkmagenta");
    this.bgcolors[idx << 4] = color("darkmagenta");

    idx++;
    this.colors[idx] = color("goldenrod");
    this.fgcolors[idx] = color("goldenrod");
    this.bgcolors[idx << 4] = color("goldenrod");

    idx++;
    this.colors[idx] = color("grey");
    this.fgcolors[idx] = color("grey");
    this.bgcolors[idx << 4] = color("grey");

    idx++;
    this.colors[idx] = color("darkgrey");
    this.fgcolors[idx] = color("darkgrey");
    this.bgcolors[idx << 4] = color("darkgrey");

    idx++;
    this.colors[idx] = color("blue");
    this.fgcolors[idx] = color("blue");
    this.bgcolors[idx << 4] = color("blue");

    idx++;
    this.colors[idx] = color("green");
    this.fgcolors[idx] = color("green");
    this.bgcolors[idx << 4] = color("green");

    idx++;
    this.colors[idx] = color("cyan");
    this.fgcolors[idx] = color("cyan");
    this.bgcolors[idx << 4] = color("cyan");

    idx++;
    this.colors[idx] = color("red");
    this.fgcolors[idx] = color("red");
    this.bgcolors[idx << 4] = color("red");

    idx++;
    this.colors[idx] = color("magenta");
    this.fgcolors[idx] = color("magenta");
    this.bgcolors[idx << 4] = color("magenta");

    idx++;
    this.colors[idx] = color("yellow");
    this.fgcolors[idx] = color("yellow");
    this.bgcolors[idx << 4] = color("yellow");

    idx++;
    this.colors[idx] = color("white");
    this.fgcolors[idx] = color("white");
    this.bgcolors[idx << 4] = color("white");
  }
}

/*  windows text console colors

        FG_BLUE: 0x0009,
        FG_GREEN: 0x000a,
        FG_CYAN: 0x000b,
        FG_RED: 0x000c,
        FG_MAGENTA: 0x000d,
        FG_YELLOW: 0x000e,
        FG_WHITE: 0x000f,
        BG_BLACK: 0x0000,
        BG_DARK_BLUE: 0x0010,
        BG_DARK_GREEN: 0x0020,
        BG_DARK_CYAN: 0x0030,
        BG_DARK_RED: 0x0040,
        BG_DARK_MAGENTA: 0x0050,
        BG_DARK_YELLOW: 0x0060,
        BG_GREY: 0x0070,
        BG_DARK_GREY: 0x0080,
        BG_BLUE: 0x0090,
        BG_GREEN: 0x00a0,
        BG_CYAN: 0x00b0,
        BG_RED: 0x00c0,
        BG_MAGENTA: 0x00d0,
        BG_YELLOW: 0x00e0,
        BG_WHITE: 0x00f0,
    */

/* P5 colors
const namedColors = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};
*/
