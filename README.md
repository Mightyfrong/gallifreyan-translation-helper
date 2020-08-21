# Gallifreyan Translation Helper
###### by MightyFrong

This is an online tool aimed at artists and hobbyists who produce designs in one of 3 types of Gallifreyan:

* [Sherman's][1]
* [TARDIS Console][2]
* [Doctor's Cot][3]

More details on how the translators for each one can be found below.

## Sherman's

Designed as a pattern memory aid, this translator draws each character either as an individual glyph, or stacking characters depending on choice. Also displays the glyphs in horizontal lines instead of writing them in the expected circular fashion for ease of reading.

One can optionally toggle whether C is transcribed to K/S in the language controls.

Numbers are a bit flawed as individual glyphs and currently don't support negative numbers. To keep things easier within the algorithm a zero is added to each number by default, so don't wonder about the top translation.

## TARDIS Console (WIP)

Due to the detail in TARDIS Console glyphs, a look-up table of some sort of drawing instructions is needed for each individual letter. The format we chose was [SVG path data][4], which can be parsed by the `CanvasRenderContext2D.prototype.stroke()` and `.fill()` methods.

Because glyphs consist of a mixture of filled shapes and different line thicknesses, one set path data was insufficient for each letter. 3 line thicknesses were identified, and so each glyph is described by 4 sets of path data, the first being filled shapes. A semi-colon was chosen to separate the path strings, so the code which processes them looks like this:

```js
function drawGlyph(ctx, pathString) {
	pathString.split(";")              
		.forEach((str, idx) => { 
			const path = new Path2D(str);

			if (idx) {
				ctx.lineWidth = idx;
				ctx.stroke(path);
			} else
				ctx.fill(path);
		});
}
```

## Doctor's Cot

This one is the most complicated of the 3 languages as it transcribes the exact phonetics of words instead of just their letters. Hence, the user is given an on-screen IPA ([International Phonetic Alphabet][5]) keyboard.

Translation takes the input string through 3 steps:

1. **Phonetic Units** - input is broken up into words and each word into its constituent sounds, which are either consonants or vowels.
2. **Cot Glyphs** - consecutive PhoneticUnits are grouped into Doctor's Cot glyphs, which can represent up to 2 consonants + 1 vowel.
3. **Drawing** - outline and decoration info are looked up for each CotGlyph and drawn on the canvas.

[1]: https://shermansplanet.com/gallifreyan/guide.pdf
[2]: https://tardisconsolegallifreyan.weebly.com/tutorials.html
[3]: https://doctorscotgallifreyan.com/walk-through/4lnekzojej4p5klcph0ppntibb19ib

[4]: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
[5]: https://en.wikipedia.org/wiki/International_Phonetic_Alphabet