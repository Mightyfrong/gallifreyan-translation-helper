# Gallifreyan Translation Helper
###### by MightyFrong

This is an online tool aimed at artists and hobbyists who produce designs in one of 3 types of Gallifreyan:

* [Sherman's](https://shermansplanet.com/gallifreyan/guide.pdf)
* [TARDIS Console](https://tardisconsolegallifreyan.weebly.com/tutorials.html)
* [Doctor's Cot](https://doctorscotgallifreyan.com/walk-through/4lnekzojej4p5klcph0ppntibb19ib)

More details on how the translators for each one can be found below.

## Sherman's

Designed as a pattern memory aid, this translator draws each letter either as an individual glyph, or stacking vowels with consonants depending on choice. Also displays the glyphs in horizontal lines instead of writing them in the expected circular fashion for ease of reading. Optional translation of c to phonetic k or s.

Currently, this is the only one of the three translators that are completely functional.

## TARDIS Console (WIP)

The underlying translator is fully complete but draws the designs of letters from a dictionary of their visual representations which is only partly filled. Thus, most letters won't yield a visible result on the canvas.

## Doctor's Cot (WIP)

This one is the most complicated of the 3 languages as it transcribes the exact phonetics of words instead of just their letters. Hence, the user is given an on-screen IPA ([International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet)) keyboard.

Translation takes the input string through 3 steps:

1. **Phonetic Units** - input is broken up into words and each word into its constituent sounds, which are either consonants or vowels.
2. **Cot Glyphs** - consecutive PhoneticUnits are grouped into Doctor's Cot glyphs, which can represent up to 2 consonants + 1 vowel.
3. **Drawing** - outline and decoration info are looked up for each CotGlyph and drawn on the canvas.