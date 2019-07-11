var p = document.getElementsByTagName("video")[0];
var keyCode = 16;
var infoTimeout;
var infoBox;
var originalTime;

function main() {
	if(!p) {
		return;
	}
	
	var keyHeld = false;

	p.onwheel = function(event) {
		event.preventDefault();
		if (event.deltaY < 0) {
			mod = 1;
		} else {
			mod = -1;
		}
		if (keyHeld) {
			if (originalTime == undefined) {
				originalTime = p.currentTime;
			}
			seek(mod);
		}
	}
	
	document.addEventListener("keydown", (e) => {
		if(e.keyCode == keyCode) {
			keyHeld = true;
		}
	});
	
	document.addEventListener("keyup", (e) => {
		if(e.keyCode == keyCode) {
			keyHeld = false;
		}
	});

}

main();

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
	return pre + mins + ":" + Math.abs(secs) % 60;
}

function infoText(info) {
	clearTimeout(infoTimeout);
	if(infoBox) {
		infoBox.remove();
	}
	infoBox = document.createElement("div");
	infoBox.innerHTML = info;
	infoBox.style.position = "absolute";
	var rect = p.getBoundingClientRect();
	infoBox.style.fontSize = "20px";
	infoBox.style.right = rect.right + "px";
	infoBox.style.top = rect.top + "px";
	infoBox.style["-webkit-text-stroke"] = "1px rgba(255,255,255,0.6)";
	p.parentNode.appendChild(infoBox);
	infoTimeout = setTimeout(() => {
		infoBox.remove();
		originalTime = undefined;
		}, 1000);
}