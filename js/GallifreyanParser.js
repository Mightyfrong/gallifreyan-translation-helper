export class GallifreyanParser {
	constructor(letterMap) {
		this.letterMap = letterMap;
	}

	parseWords(input) {
		let result = { input: input.split(/\s+/), output: [] };
		while (result.input.length && !result.error) {
			const res = this.parseWord(result.input.shift());
			if (res.error)
				result.error = res.error;
			else
				result.output.push(res.output);
		}
		return result;
	}

	parseWord(input) {
		let result = { input, output: [] };
		while (result.input.length && !result.error) {
			const res = this.parseLetter(result.input);
			if (res.error)
				result.error = res.error
			else {
				result.output.push(res.output);
				result.input = res.input;
			}
		}
		return result;
	}

	parseLetter(input) {
		const first2 = this.parseChars(2, input);

		return first2.error ?
			this.parseChars(1, input) :
			first2;
	}

	parseChars(n, input) {
		const chars = input.slice(0, n);
		const ltr = this.letterMap.get(chars);

		return ltr ?
			{ input: input.slice(n), output: ltr } :
			{ input, error: `Unrecognised chars "${chars}".` };
	}
}