export class CotGlyph {constructor(out, inn, vow) {
		this.outer = out;
		this.inner = inn || null;
		this.vowel = vow || null;

		this.toString = this.outer.toString;
		if(this.inner) this.toString += this.inner.toString;
		if(this.vowel) this.toString += this.vowel.toString;
	}

	draw(ctx, radius, textSpace) {
		function drawConsonant(con, isInner) {
			let currentRad = radius/(1+isInner);
	
			con.outlines.forEach(thicness => {
				currentRad -= thicness/2;
	
				ctx.lineWidth = thicness;

				ctx.beginPath();
				ctx.arc(0, 0, currentRad, 0, 2 * Math.PI);
				ctx.stroke();

				ctx.fill();
	
				currentRad -= 2 + thicness/2;
			});
		}
		function drawDecoration(con){
			const desc  = con.decoration(radius);
			const path = new Path2D(desc);
			ctx.stroke(path);
		}

		ctx.fillStyle = '#444';
		ctx.fillText(this.toString, 0, - radius - textSpace/2);

		ctx.fillStyle = '#fff';
		drawConsonant(this.outer, 0);
		drawDecoration(this.outer);

		if(this.inner){
			ctx.save();
			ctx.rotate(Math.PI/2);
			drawDecoration(this.inner);
			ctx.restore();
			drawConsonant(this.inner, 1);
		}else
			drawConsonant(this.outer, 1);
	}
}