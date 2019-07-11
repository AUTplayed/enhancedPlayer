var p = document.getElementsByTagName("video")[0];
var keyCode = 16;
var fastKeyCode = 18;
var infoTimeout;
var infoBox;
var originalTime;

function main() {
	if(!p) {
		return;
	}
	
	var keyHeld = false;
	var fastMod = 1;

	document.addEventListener("wheel", function(event) {
		//event.preventDefault();
		if (event.deltaY < 0) {
			mod = 1;
		} else {
			mod = -1;
		}
		if (keyHeld) {
			if (originalTime == undefined) {
				originalTime = p.currentTime;
			}
			seek(mod * fastMod);
		}
	});
	
	document.addEventListener("keydown", (e) => {
		if (e.keyCode == keyCode) {
			keyHeld = true;
		}
		if (e.keyCode == fastKeyCode) {
			fastMod = 3;
		}
	});
	
	document.addEventListener("keyup", (e) => {
		if (e.keyCode == keyCode) {
			keyHeld = false;
		}
		if (e.keyCode == fastKeyCode) {
			fastMod = 1;
		}
	});

}

main()

function seek(time) {
	var newtime = p.currentTime + time;
	var deltatime = newtime - originalTime;
	p.currentTime = newtime;
	infoText(toTimeString(newtime) + "(" + toTimeString(deltatime, true) + ")");
}

function toTimeString(secs, op) {
	secs = Math.round(secs);
	var mins;
	var pre = "";
	if (secs < 0) {
		mins = Math.ceil(secs / 60);
		if (op) {
			pre = "-";
		}
	} else {
		mins = Math.floor(secs / 60);
		if (op) {
			pre = "+";
		}
	}
	var secsString = Math.abs(secs) % 60;
	secsString = secsString >= 10 ? secsString : "0" + secsString;
	return pre + mins + ":" + secsString;
}

function infoText(info) {
	clearTimeout(infoTimeout);
	if (infoBox) {
		infoBox.remove();
	}
	infoBox = document.createElement("div");
	infoBox.innerHTML = info;
	infoBox.style.position = "absolute";
	//var rect = p.getBoundingClientRect();
	infoBox.style.fontSize = "20px";
	infoBox.style.right = "0px";
	infoBox.style.top = "0px";
	infoBox.style["-webkit-text-stroke"] = "1px rgba(255,255,255,0.6)";
	p.parentNode.appendChild(infoBox);
	infoTimeout = setTimeout(() => {
			infoBox.remove();
			originalTime = undefined;
		}, 1000);
}