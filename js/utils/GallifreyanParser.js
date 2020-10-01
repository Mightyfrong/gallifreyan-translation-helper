export class GallifreyanParser {
	constructor(letterMap, errorElem = null) {
		this.letterMap = letterMap;
		this.errorElem = errorElem;
	}

	parseWords(input) {
		let result = { input: input.split(/\s+/), output: [], error: "" };
		while (result.input.length) {
			const res = this.parseWord(result.input.shift());
			result.output.push(res.output);

			if (res.error)
				result.error += "\n" + res.error;
		}
		this.errorElem.innerHTML = result.error;
		return result;
	}

	parseWord(input) {
		let result = { input, output: [], error: "" };
		while (result.input.length) {
			const res = this.parseLetter(result.input);

			result.input = res.input;

			if (res.output)
				result.output.push(res.output);
			if (res.error)
				result.error += "\n" + res.error
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
			{ input: input.slice(n), error: `Unrecognised chars "${chars}".` };
	}
}