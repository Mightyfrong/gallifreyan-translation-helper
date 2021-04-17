# Gallifreyan Translation Helper
###### by MightyFrong

This is a tool aimed at artists and hobbyists who produce designs in one of the fan based types of Gallifreyan. Please recognize this tool ***not*** as a translator: it serves the purpose of quicker impressions of writing syntax. The artistic composition is, and should be, your challenge. Please do not use any of these outputs for an immediate tattoo template!

Gallifreyan is based on the [Doctor Who TV Series](https://www.doctorwho.tv/) by BBC. All writing systems are inspired by the shows artwork but finally fan based and made up. The shows graphics do not translate to anything. But these awesome writing systems do.

The creators of the Gallifreyan Translation Helper do not guarantee for correct output and strongly recommend to let everything be proofread by people that are comfortable with the respective system. Head over to the fine people of [r/gallifreyan](https://www.reddit.com/r/gallifreyan/) for help and advice.

## Supported scribes
* [Sherman's](#Shermans)
* [Doctors's Cot](#Doctors-Cot)
* [TARDIS Console](#TARDIS-Console)
* [Flux](#Flux)
* [Clockwork](#Clockwork)
* [GC Gallifreyan](#GC-Gallifreyan)
* [cBettenbender's](#cBettenbenders)
* [CC Gallifreyan](#CC-Gallifreyan)
* [DotScript](#DotScript)
* [ArtByBoredom Gallifreyan](#ArtByBoredom)
* [DarkIfaerie's Gallifreyan](#Darkifaeries)
* [Eva's Gallifreyan](#Evas)
* [bpjmarriott's Old High Gallifreyan](#bpjmarriotts)
* [ODDISM's Old High Gallifreyan](#ODDISMs)

## Abstract

See the [wiki](https://github.com/Mightyfrong/gallifreyan-translation-helper/wiki) for a high-level overview of the project. The rest of this documentation is planned to follow.

The supported systems generate an svg-output that can be saved by right-clicking and are hopefully useful to initiate artistic work within your vector-graphics-application.

The application can be used online and/or installed as a progressive web app for offline use on the go (props to [simplepwa.com](https://simplepwa.com/)). The interface provides you with the neccessary controls for rendering and occasionally IPA-keyboards or otherwise permitted characters if differing from standard latin characters.

## Sherman's
source: [Sherman's Circular Gallifreyan by Loren Sherman][SCG]

![creator approved](https://img.shields.io/badge/creator-approved-brightgreen)

Primarily designed as a pattern memory aid, this module draws each character either as an individual glyph, or stacked depending on choice. It displays the words either in a circular fashion (not spiral though) or every glyph/stack in horizontal lines for ease of reading.

One can optionally toggle whether C is transcribed to K/S in the language controls.

Numbers are supported, but only make sense with stacking enabled. Dot and comma both are valid decimal separators in number stacks.

Diacritics are supported according to the [official guide][SCG] for german umlauts, accent acute, accent grave, ñ and scandinavian å, ø and æ.

Decorator lines do not connect anywhere at the moment. This is as well due to the fact we did not come up with a reasonable algorithm to accomplish that yet, as random straight lines are neither easy to read nor aesthetically appealing.

Supported characters are `[a-z0-9.?!"'-,;:éèíìüúùæäáàåöóòøñ]`, uppercase will be converted.

### What To Expect
<img src="assets/Gallifreyan_sherman's linear.svg" alt="sherman's circular gallifreyan linear displayed" width="512" />
-
<img src="assets/Gallifreyan_sherman's circular.svg" alt="sherman's circular gallifreyan circular displayed" width="512" />

[^ back to top](#Supported-Scribes)

## Doctor's Cot
source: [Doctor's Cot by Brittany Goodman][DCG]

The progress of vectorizing all the things got a bit stuck for a few weeks and one of us wasn't able to understand and contribute to foreign code. So Doctor's Cot was straightforwand rebuild based on the coding style of CC-Gallifreyan. ɑ-based vowels are a bit impure regarding connectivity, but on the plus side there is canonical punctuation (except start indication).
Like in the original Cot-module there is an IPA-keyboard. Since the author has published a simplyfied english version as well there is a respective keyboard that translates the english characters to the IPA-characters according to the official tables.

Supported characters will be available on the provided keyboard. Please be aware about adding `א` (aleph) for lonely vowels manually.

### What to expect
<img src="assets/Gallifreyan_dɒktəz kɒt.svg" alt="doctor's cot gallifreyan" width="512" />

[^ back to top](#Supported-Scribes)

## TARDIS Console
source: [TARDIS Console by Purple Emily][TCG]

![creator approved](https://img.shields.io/badge/creator-approved-brightgreen)

Another approach was chosen to get this one finally running. TARDIS Console is heavily inspired by the shows artwork and therefore has huge tables of glyphs that have no simple pattern or system to style consonants and vowels. This style is not easily wrapped up to an algorithm. The glyps and paired vowels were redrawn in inkscape and will be resized and placed to the canvas.

Vowels are always attached to a consonant, leading or double vowels or these that come on the third place are accompanied by aleph.
Currently only the table of the guide part 1 is supported `[a-zא]`, punctuation and number are postponed ([the construction file is available](assets/tardisconsole.svg)).

### What To Expect
<img src="assets/Gallifreyan_tardis console linear.svg" alt="sherman's circular gallifreyan linear displayed" width="512" />
-
<img src="assets/Gallifreyan_tardis console circular.svg" alt="sherman's circular gallifreyan circular displayed" width="512" />

[^ back to top](#Supported-Scribes)

## Flux

source: [Flux Gallifreyan by u/lost_chm][FLUX]

![creator approved](https://img.shields.io/badge/creator-approved-brightgreen)

The GTH displays the words either in a clockwise circular fashion (not spiral or layers though) or every glyph in horizontal lines (left to right) for ease of reading.

C will always be converted to phonetic s or k unless it is part of ch - which is of course a character on its own.

Decorator lines do not connect anywhere at the moment. This is as well due to the fact we did not come up with a reasonable algorithm to accomplish that yet, as random straight lines are neither easy to read nor aesthetically appealing.

Supported characters are currently `[a-zß]`, uppercase will be converted.

### What To Expect
<img src="assets/Gallifreyan_linear flux.svg" alt="flux gallifreyan linear displayed" width="512" />
-
<img src="assets/Gallifreyan_circular flux.svg" alt="flux gallifreyan circular displayed" width="512" />

[^ back to top](#Supported-Scribes)

## Clockwork
source: [Clockwork Gallifreyan by FYeahGallifreyan][CW]

The GTH displays the words either in a clockwise circular fashion (not spiral or layers though) or every glyph/stack in horizontal lines (left to right) for ease of reading.

Decorator lines do not connect anywhere at the moment. This is as well due to the fact we did not come up with a reasonable algorithm to accomplish that yet, as random straight lines are neither easy to read nor aesthetically appealing.

Supported characters will be available on the provided keyboard. Ellipsis(...) is not supported unfortunately. Since punctuation is essential, every phrase that is not terminated by a supported punctuation character will be complemented with a period by default. You can choose the amout of stacking.

### What To Expect
<img src="assets/Gallifreyan_klɒkwɜɹk lineɛ..svg" alt="clockwork gallifreyan linear displayed" width="512" />
-
<img src="assets/Gallifreyan_klɒkwɜɹk siɹkjulɛ..svg" alt="clockwork gallifreyan circular displayed" width="512" />

[^ back to top](#Supported-Scribes)

## GC Gallifreyan
source: [GC Gallifreyan by TrueGreenman][GC]

This is currently a permanent work in progress that displays characters either single or stacked. The punctuation will be displayed as a glyph. Currently it is unsure if a circular display and reading-order-indication will happen, because somewhat linear grouping within a circular sentence is likely not something that can be displayed in a way that clears things up properly. Please use this module for impression of glyphs and character grouping only.   

C will always be converted to phonetic k or s. Since punctuation is essential, every phrase that is not terminated by a supported punctuation character will be complemented with a period by default.

Decorator lines do not connect anywhere at the moment. This is as well due to the fact we did not come up with a reasonable algorithm to accomplish that yet, as random straight lines are neither easy to read nor aesthetically appealing.

### What To Expect
<img src="assets/Gallifreyan_greenman circular gallifreyan.svg" alt="GC ggclifreyan linear displayed" width="512" />

[^ back to top](#Supported-Scribes)

## cBettenbender's
source: [Circular Gallifreyan by Cat Bettenbender][CB]

By time of implementing this writing system the instructions were still described as unfinished and surely felt a bit unclear. To make matters worse the initial publication was long time ago. Although the first page of the documentation describes the system as literal without phonetic replacements for consonants, some latin characters are missing, examples lead to other conclusions and vowels are most definetly described as phonetic. So after all there has to be a keyboard that limits allowed characters and inserts respective ipa-vowels. Grouping characters happens by syllables, but since putting this into an algorithm is currently beyond the ability of this helper you'll have to group by splitting syllables with space by your own.

Some of the design choices are based on personal choice, contextual considerations, the few impressions from the guide and maybe lack of coding skills:
* *repetition indicators for vowels* are a thing in this interpretation. Double vowels normally change the sound, probably leading to another glyph, but in case of names double vowels might be allowed
* *start indicators* for consonants and vowels will always attach to or be placed within the widest free section of the syllable circle. There's hope that this interferes the least but will surely do occasionally (**again: this is not a translator, just a helping aid for patterns!**). Since the indicators will be random placed within their boundary maybe a re-render fixes it from time to time. The consonant indicator will never direct to opposing sides, but you'll get the spirit
* *consonant connectors* work for only two connected consonants, I am currently unaware in which scenario one syllable contains longer chains

Since the documentation is unfinished the GTH gives even less warranty for this module than for any others.

Supported characters will be available on the provided keyboard.

### What to expect
<img src="assets/Gallifreyan_cbettenbenders.svg" alt="cBettenbenders gallifreyan" width="512" />

[^ back to top](#Supported-Scribes)

## CC Gallifreyan
source: [CC Gallifreyan by gumex][CC]

This system processes the latin alphabet with th and ng only, no diacritics, punctuation or numbers.

Characters are simply stacked, while being read from outside to the center, but its up to the artist to decide about the number of stacked characters. This translation helper splits characters in words evenly to the set number. The maximum stacking amount is limited for easier reading, although the writing system itself is not clearly restricted in this context. Base- and decorator-graphics are tilted slightly to make it look less monotonous, yet orientated to one side to avoid problems from overlapping (this is just a programmatic necessity, not an artistic recommendation!).

Supported characters are `[a-z]`, uppercase will be converted.

### What to expect
<img src="assets/Gallifreyan_cc gallifreyan.svg" alt="cc gallifreyan" width="512" />

[^ back to top](#Supported-Scribes)

## DotScript
source: [DotScript by Rachel Sutherland][DS]

This writing system may not be widely used but is quite easy and was quick and fun to program. Each character is assigned one of five geometric shapes that have a special placement regarding the base line for consonants and a smaller representation for vowels. The character `z` has it's own shape. This system of one distinct glyph for every character makes DotScript more of a font than a writing system. But implementing it was a useful experience.

Supported characters are `[a-z]`, uppercase will be converted.

### What To Expect
<img src="assets/Gallifreyan_dotscript.svg" alt="dotscript" width="512" />

[^ back to top](#Supported-Scribes)

## ArtByBoredom
source: [Gallifreyan Alphabet by Aaron Jay][ABB]

Like DotScript this system is more likely a font with geometric shapes representing latin alphabet characters. It is the first implemented gallifreyan distinguishing between upper- and lowercase characters. And like DotScript this is not a writing system per se but included for the sake of completeness and another coding exercise.

Supported characters are `[a-zA-Z.,:;-/"']` and if you say *but there are more punctuation characters* you most probably won't need this tool anyway.

### What To Expect
<img src="assets/Gallifreyan_ArtByBoredom.svg" alt="ArtByBoredom gallifreyan" width="512" />

[^ back to top](#Supported-Scribes)

## DarkIfaerie's
source: [Gallifreyan Alphabet by Sarah "DarkIfaerie"][DF]

![creator approved](https://img.shields.io/badge/creator-approved-brightgreen)

With one glyph for every character of the english alphabet DarkIFaerie's gallifreyan is more or less another font. The small difference considering it a system is arranging the characters in a circle and reading clockwise.

Supported characters are `[a-z]`, uppercase will be converted.

### What To Expect
<img src="assets/Gallifreyan_darkifaerie_linear.svg" alt="DarkIfaerie's gallifreyan" width="512" />
-
<img src="assets/Gallifreyan_darkifaerie_circular.svg" alt="DarkIfaerie's gallifreyan" width="512" />

[^ back to top](#Supported-Scribes)

## Eva's
source: [Eva's Gallifreyan Alphabet Pt1](https://cdn.discordapp.com/attachments/708950194309431306/713761320129789972/Guide_1.jpg) | [Eva's Gallifreyan Alphabet Pt2](https://cdn.discordapp.com/attachments/708950194309431306/713761452955271168/Guide_2.jpg)

Eva's Gallifreyan Alphabet comes with one glyph for every phonetic character. It is written counterclockwise from the bottom and every word is surrounded by a circle.

Supported characters will be available on the provided keyboard.

### What To Expect
<img src="assets/Gallifreyan_ivʌs gællifreɪen linear.svg" alt="Eva's gallifreyan linear" width="512" />
-
<img src="assets/Gallifreyan_ivʌs gællifreɪen circular.svg" alt="Eva's gallifreyan circular" width="512" />

[^ back to top](#Supported-Scribes)
## bpjmarriott's
source: [Old High Gallifreyan by bpjmarriott][BPJM]

Old High Gallifreyan is not a circular font at all, but since it is a timelords script it still is considerable fitting in the translation helper. bpjmarriott's gallifreyan is supposed to be read from top to bottom.

Supported characters are `[a-z0-9.,!?":;']`, uppercase will be converted.

### What To Expect
<img src="assets/Gallifreyan_bpjmarriotts old high gallifreyan.svg" alt="bpjmarriot's gallifreyan" width="512" />

[^ back to top](#Supported-Scribes)

## ODDISM's
source: [Old High Gallifreyan by ODDISM][ODD]

Another Old High Gallifreyan thats not a circular font. It is the latest version and the successor of [FREAKISM's Old High Gallifreyan](https://freakism.tumblr.com/post/11577887916/im-proud-click-here-for-big-version-i-did) ([that is in fact the same author](https://freakism.tumblr.com/post/42112673388/so-i-just-found-your-old-high-gallifreyan)). According to the authors sources this font seems to be written from left to right. Or maybe the other way round, but this was the decision. This is a phonetic font - the original table has words as well as IPA-characters. Both are provided as keyboards, but the input will be filled with IPA-characters.

Supported characters will be available on the provided keyboard.

### What To Expect
<img src="assets/Gallifreyan_ɒddɪsm oʊld haɪ gællɪfreɪæn.svg" alt="oddISM's gallifreyan" width="512" />

[^ back to top](#Supported-Scribes)

## Copyright & Licence Notice

Copyright 2020-2021 [Mightyfrong][MF], [erroronline1][EOL1], [ModisR][MR]
 
This file is part of the Gallifreyan Translation Helper,
henceforth referred to as "the GTH".

The GTH is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The GTH is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with the GTH.  If not, see <https://www.gnu.org/licenses/>.

[MF]: https://github.com/Mightyfrong
[EOL1]: https://github.com/erroronline1
[MR]: https://github.com/ModisR

[SCG]: https://shermansplanet.com/gallifreyan/guide.pdf
[DCG]: https://doctorscotgallifreyan.com/walk-through/4lnekzojej4p5klcph0ppntibb19ib
[TCG]: https://tardisconsolegallifreyan.weebly.com/tutorials.html
[FLUX]: https://fluxgallifreyan.weebly.com/
[CW]: https://fyeahgallifreyan.tumblr.com/post/49952734330/clockwork-gallifreyan-complete-writing-guide
[GC]: https://www.deviantart.com/truegreenman/gallery/61284794/gc-guide
[CB]: https://www.deviantart.com/cbettenbender/gallery/33798145/circular-gallifreyan
[CC]: https://www.deviantart.com/gumex/art/CC-Gallifreyan-458112363
[DS]: https://www.deviantart.com/rachelsutherland/gallery/58931409/dotscript-gallifreyan-guide
[ABB]: https://www.deviantart.com/artbyboredom/art/Gallifreyan-Alphabet-298046680
[DF]: https://www.deviantart.com/darkifaerie/art/Gallifreyan-Alphabet-270857268
[BPJM]: https://www.deviantart.com/bpjmarriott/art/Old-High-Gallifreyan-Alphabet-370087020
[ODD]: https://odd-things-happen.tumblr.com/post/21573543574/my-finished-gallifreyan-alphabet-i-think-im

[1]: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
[2]: https://en.wikipedia.org/wiki/International_Phonetic_Alphabet
