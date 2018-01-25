var Instrument = {
	Color: "black",
	List: {
		"Pipet": false,
		"Pen": true,
		"Brush": false,
		"Fill": false
	},

	Now: function() {
		for (var i in this.List) 
			if (this.List[i] == true) return i; 
	},

	Set: function(newInstr) {
		var lastInstr = this.Now();
			this.List[newInstr] = true;
			this.List[lastInstr] = false;
		document.getElementById(lastInstr).className = "tool";
		document.getElementById(newInstr).className = "toolActive";
	},

	Action: {
		getColorOfPixel: function (Pixel) {
			this.setColor(Pixel.style.backgroundColor);
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
				if (ThisPixel.Neighbours[i] && ThisPixel.Neighbours[i].style.backgroundColor == lastColor) 
					this.fillColor(ThisPixel.Neighbours[i]);
		},

		Onclick: function (Target) {
			switch (Instrument.Now()) {
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

var Touch = function(Pixel) {
	Instrument.Action.Onclick(Pixel);
}

var setColor = function(newColor) {
	var lastColor = Instrument.Color;
	Instrument.Color = newColor;
	document.getElementById(lastColor).className = "color";
	document.getElementById(newColor).className = "colorActive";
}

class pNeighbours {
	constructor(Pixel) {
		// Получаем индекс нашего пикселя
		for (var i in Pixel.parentElement.childNodes)
			 	if (Pixel.parentElement.childNodes[i] == Pixel) 
			 		this.index = i;
		// Получаем соседние элементы пикселей в одном ряду
		this.Neighbours = {
			nLeft: Pixel.previousElementSibling,
			nRight: Pixel.nextElementSibling,
			nTop: undefined,
			nBottom: undefined
		};

		// Получаем соседние элементы пикселей в разных рядах
		if (Pixel.parentElement.previousElementSibling) 
			this.Neighbours.nTop = Pixel.parentElement.previousElementSibling.childNodes[this.index];
		if (Pixel.parentElement.nextElementSibling) 
			this.Neighbours.nBottom = Pixel.parentElement.nextElementSibling.childNodes[this.index];
	}
}
	

			/*		
			// комментарий на языке javascript
			Pixel.nextElementSibling; 
			// Возвращает следующий элемент в разметке HTML
			// -> Правый пиксель

			Pixel.previousElementSibling; 
			// Возвращает следующий элемент в разметке HTML
			// -> Левый пиксель

			Pixel.parentElement; 
			// Возвращает родительский элемент в разметке HTML
			// -> Ряд, в котором находится пиксель

			Pixel.parentElement.nextElementSibling; 
			// Возвращает следующий за родительским элемент в разметке HTML
			// -> Ряд ниже, над котором находится пиксель

			Pixel.parentElement.previousElementSibling; 
			// Возвращает родительский элемент в разметке HTML
			// -> Ряд выше, под котором находится пиксель

			Pixel.parentElement.previousElementSibling.childNodes[ INDEX ]; 
			// -> Возвращает элемент разметки HTML, который находится на INDEX месте в ряду выше

			Pixel.parentElement.nextElementSibling.childNodes[ INDEX ]; // Аналогично
			// -> Возвращает элемент разметки HTML, который находится на INDEX месте в ряду ниже
			*/