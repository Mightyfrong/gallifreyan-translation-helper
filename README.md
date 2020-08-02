# Gallifreyan Translation Helper
###### by MightyFrong

This is an online tool aimed at artists and hobbyists who produce designs in one of 3 types of Gallifreyan:

* [Sherman's Circular](https://shermansplanet.com/gallifreyan/guide.pdf)
* TARDIS Console
* [Doctor's Cot](https://doctorscotgallifreyan.com/walk-through/4lnekzojej4p5klcph0ppntibb19ib)

More details on how the translators for each one can be found below.

## Sherman's

Designed as a pattern memory aid, this translator draws each letter as in individual glyph, not stacking vowels with consonants or two consonants of the same base. Also displays the glyphs in horizontal lines instead of writing them in the expected circular fashion for ease of reading.

Currently, this is the only one of the three translators that are completely functional.

## TARDIS Console (WIP)

The underlying translator is fully complete but draws the designs of letters from a dictionary of their visual representations which is only partly filled. Thus, most letters won't yield a visible result on the canvas.

## Doctor's Cot (WIP)

This one is the most complicated of the 3 languages as it transcribes the exact phonetics of words instead of just their letters. As such, to get a meaningful input, the user is provided with an on-screen IPA ([International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet))

### IPALetter

When "Translate" is pressed, the text input is first converted into an array of IPALetter objects which contain outline and decoration information for each sound as it is represented by Doctor's Cot:

```js
class IPALetter {
	constructor(ol, d) {
		this.outlines = ol;
		this.decoration = d;
	}
}
```