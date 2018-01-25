var Instrument = {
	
	List: { "Pen": true,
			"Brush": false,
			"Fill": false,
			"Pipet": false },

	Color: "black",

	setColor: function(newColor) {
		var usingColor = document.getElementById("usingColor");
		usingColor.style.backgroundColor = this.Color = newColor;
	},

	InstrumentNow: function() {
		for (var i in this.List) 
			if (this.List[i]) return i;	
	}, 

	setInstrument: function(Instr) {
		var Last = this.InstrumentNow();
		this.List[Last] = false;
		this.List[Instr] = true;
			document.getElementById(Instr).className = "Active";
			document.getElementById(Last).className = "notActive";
			document.getElementById("usingInstrument").innerHTML = Instr;
	},

	Action: {
		Backup: {
			Buffer: Object,
			saveProgress: function() {
				var Screen = document.getElementById("art");
				this.Buffer.push(Screen);
			},
			backupProgress: function() {

			}

		},

		getColorOfPixel: function (Pixel) {
			Instrument.setColor(Pixel.style.backgroundColor);
		},
		paintPixel: function (Pixel) {
			Pixel.style.backgroundColor = Instrument.Color;
		},
		paintBrush: function (Pixel) {
			var ThisPixel = new pNeighbours(Pixel);

			this.paintPixel(Pixel);
			for (var i in ThisPixel.Neighbours)
				if (ThisPixel.Neighbours[i]) this.paintPixel(ThisPixel.Neighbours[i]);
		},
		fillColor: function (Pixel) {
			var ThisPixel = new pNeighbours(Pixel);
			var lastColor = Pixel.style.backgroundColor;

			this.paintPixel(Pixel);
			for (var i in ThisPixel.Neighbours)
				if (ThisPixel.Neighbours[i] && ThisPixel.Neighbours[i].style.backgroundColor == lastColor) this.fillColor(ThisPixel.Neighbours[i]);
		},
		
		Onclick: function (Target) {
			switch (Instrument.InstrumentNow()) {
				case "Pipet":
					this.getColorOfPixel(Target); break;
				case "Pen":
					this.paintPixel(Target); break;
				case "Brush":
					this.paintBrush(Target); break;
				case "Fill":
					this.fillColor(Target); break;
				default:
					console.log("Exception: bad Action.Onclick call");
			}
		}
	}
}

var Touch = function (Pixel) {
	Instrument.Action.Onclick(Pixel);
}


class pNeighbours {
	constructor(Pixel) {
		for (var i in Pixel.parentElement.childNodes)
			 	if (Pixel.parentElement.childNodes[i]==Pixel) 
			 		this.cell = i;
		this.Neighbours = {
			nLeft: Pixel.previousElementSibling,
			nRight: Pixel.nextElementSibling,
			nTop: undefined,
			nBottom: undefined
		};

		if (Pixel.parentElement.previousElementSibling) 
			this.Neighbours.nTop = Pixel.parentElement.previousElementSibling.childNodes[this.cell];
		if (Pixel.parentElement.nextElementSibling) 
			this.Neighbours.nBottom = Pixel.parentElement.nextElementSibling.childNodes[this.cell];
	}
}
