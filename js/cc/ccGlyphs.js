import {
	includes,
	color,
	draw
} from '../utils/funcs.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class ccBase {
    constructor() {
        this.cctable = {
            /* example: { // name of group
            	contains: [...], // array of characters for which the handling and properties apply
            	draw: function (x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
            		draw.dot(x, y, r, color.background); // to overpaint lower layers
            		draw.circle(x, y, r); // main circle
            		draw.line(x, y, x + Math.cos(Math.PI * (1.25 + tilt)) * r, y + Math.sin(Math.PI * (1.25 + tilt)) * r); // orientated element
            		draw.line(x, y, x + Math.cos(Math.PI * (.75 + tilt)) * r, y + Math.sin(Math.PI * (.75 + tilt)) * r); // orientated element
            	}
            }*/
            c: {
                contains: ["a", "e", "i", "o", "u", "b", "c"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x, y, r, color.background);
                    draw.circle(x, y, r);
                    draw.circle(x, y, r * .95);
                }
            },
            l: {
                contains: ["d", "f", "g", "h", "j", "k", "l"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x, y, r, color.background);
                    draw.circle(x, y, r);
                    draw.line(x, y, x + Math.cos(Math.PI * (1.25 + tilt)) * r, y + Math.sin(Math.PI * (1.25 + tilt)) * r);
                    draw.line(x, y, x + Math.cos(Math.PI * (.75 + tilt)) * r, y + Math.sin(Math.PI * (.75 + tilt)) * r);
                }
            },
            t: {
                contains: ["m", "n", "p", "q", "r", "s", "t"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x, y, r, color.background);
                    draw.circle(x, y, r);
                    draw.line(x, y, x + Math.cos(Math.PI * (1.25 + tilt)) * r, y + Math.sin(Math.PI * (1.25 + tilt)) * r);
                    draw.line(x, y, x + Math.cos(Math.PI * (.75 + tilt)) * r, y + Math.sin(Math.PI * (.75 + tilt)) * r);
                    draw.arc(x, y, r * .9, Math.PI * (1.25 + tilt), Math.PI * (.75 + tilt));
                }
            },
            ng: {
                contains: ["v", "w", "x", "y", "z", "th", "ng"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x, y, r, color.background);
                    draw.circle(x, y, r);
                    draw.circle(x, y, r * .9, 3);
                }
            },

        }
    }
    getBase(char) { // return name of base the given character is assigned to
        let rtrn = false;
        Object.keys(this.cctable).forEach(row => {
            if (includes(this.cctable[row].contains, char)) rtrn = row;
        });
        return rtrn;
    }
}

// specify decoration for every letter
export class ccDeco {
    constructor() {
        this.cctable = {
            /* example: { // name of group
            	contains: [...], // array of characters for which the handling and properties apply
            	draw: function (x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
            		draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1, color.background); // to overpaint lower layers
            		draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1); // orientated element
            	}
            }*/
            "dot": {
                contains: ["a", "d", "m", "v"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1);
                }
            },
            "circle": {
                contains: ["e", "f", "n", "w"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1, color.background);
                    draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1);
                }
            },
            "doublecircle": {
                contains: ["i", "g", "p", "x"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1, color.background);
                    draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1);
                    draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .06);
                }
            },
            "dotcircle": {
                contains: ["o", "h", "q", "y"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1);
                    draw.dot(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1, color.background);
                    draw.circle(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1);
                }
            },
            "twodots": {
                contains: ["u", "j", "r", "z"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1);
                    draw.dot(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1);
                }
            },
            "twocircles": {
                contains: ["b", "k", "s", "th"],
                draw: function (x, y, r, tilt) {
                    draw.dot(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1, color.background);
                    draw.circle(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1);
                    draw.dot(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1, color.background);
                    draw.circle(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1);
                }
            },
            "null": {
                contains: ["c", "l", "t", "ng"],
            },
        }
    }
    getDeco(char) { // return name of decorator the given character is assigned to
        let rtrn = false;
        Object.keys(this.cctable).forEach(row => {
            if (includes(this.cctable[row].contains, char)) rtrn = row;
        });
        return rtrn != "null" ? rtrn : false;
    }
}

/**Copyright 2020 Mightyfrong, erroronline1, ModisR
 * 
 * This file is part of the Gallifreyan Translation Helper,
 * henceforth referred to as "the GTH".
 * 
 * The GTH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The GTH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with the GTH.  If not, see <https://www.gnu.org/licenses/>.
 */