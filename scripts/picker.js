/*!
 * Colr Pickr
 *
 * R-TEK
 *
 * https://github.com/R-TEK/colr_pickr
 *
 * MIT License
 */
let colorPicker = {
    instance: null,
    boxStatus: false,
    boxStatusTouch: false,
    sliderStatus: false,
    sliderStatusTouch: false,
    opacityStatus: false,
    opacityStatusTouch: false,
    colorTypeStatus: 'HEXA',
    hue: 0,
    saturation: 100,
    lightness: 50,
    alpha: 1,
    contextMenuElem: null,
    doubleTapTime: 0
};
window.LSCustomColors = {
    0: []
};

function ColorPicker(element, color) {
    this.element = element;
    element.colorPickerObj = this;
    element.setAttribute('data-color', color);
    element.style.background = color;
    element.addEventListener('click', function(event) {
        colorPicker.instance = event.target.colorPickerObj;
        document.getElementById('color_picker').style.display = 'block';
        document.getElementById('color_picker_bg').style.display = 'block';
        // if (event.target.getAttribute('data-color') != 'undefined')
        //     updateColorDisplays(event.target.getAttribute('data-color'));
    });
}
(function() {
    const HTMLContent = `
		<svg id="color_box" width="348" height="185">
			<defs>
				<linearGradient id="saturation" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="#fff"></stop>
					<stop offset="100%" stop-color="hsl(0,100%,50%)"></stop>
				</linearGradient>
				<linearGradient id="brightness" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="rgba(0,0,0,0)"></stop>
					<stop offset="100%" stop-color="#000"></stop>
				</linearGradient>
				<pattern id="pattern_config" width="100%" height="100%">
					<rect x="0" y="0" width="100%" height="100%" fill="url(#saturation)"></rect> }
					<rect x="0" y="0" width="100%" height="100%" fill="url(#brightness)"></rect>
				</pattern>
			</defs>
			<rect rx="5" ry="5" x="1" y="1" width="348" height="185" stroke="#fff" stroke-width="2" fill="url(#pattern_config)"></rect>
			<svg id="box_dragger" x="336" y="14" style="overflow: visible;">
				<circle r="9" fill="none" stroke="#000" stroke-width="2"></circle>
				<circle r="7" fill="none" stroke="#fff" stroke-width="2"></circle>
			</svg>
		</svg>
		<br>
		<svg id="color_picked_preview" width="40" height="50">
			<circle cx="20" cy="29" r="18" stroke="#a7a7a7" stroke-width="1"></circle>
		</svg>
		<div id="sliders">
			<svg id="color_slider" width="285" height="20">
				<defs>
					<linearGradient id="hue" x1="100%" y1="0%" x2="0%" y2="0%">
						<stop offset="0%" stop-color="#f00"></stop>
						<stop offset="16.666%" stop-color="#ff0"></stop>
						<stop offset="33.333%" stop-color="#0f0"></stop>
						<stop offset="50%" stop-color="#0ff"></stop>
						<stop offset="66.666%" stop-color="#00f"></stop>
						<stop offset="83.333%" stop-color="#f0f"></stop>
						<stop offset="100%" stop-color="#f00"></stop>
					</linearGradient>
				</defs>
				<rect rx="5" ry="5" x="1" y="1" width="285" height="20" stroke="#fff" stroke-width="2" fill="url(#hue)"></rect>
				<svg id="color_slider_dragger" x="277" y="11" style="overflow: visible;">
					<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
					<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
				</svg>
			</svg>
			<svg id="opacity_slider" width="285" height="20">
				<defs>
					<linearGradient id="opacity" x1="100%" y1="0%" x2="0%" y2="0%">
						<stop offset="0%" stop-color="#000"></stop>
						<stop offset="100%" stop-color="#fff"></stop>
					</linearGradient>
				</defs>
				<rect rx="5" ry="5" x="1" y="6" width="285" height="10" stroke="#fff" stroke-width="2" fill="url(#opacity)"></rect>
				<svg id="opacity_slider_dragger" x="277" y="11" style="overflow: visible;">
					<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
					<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
				</svg>
			</svg>
		</div>
		
		 
		<div id="color_context_menu" class="color_ctx_menu">
			<button id="color_clear_single" class="color_ctx_menu" name="remove-single-color">Remove Color</button>
			<button id="color_clear_all" class="color_ctx_menu" name="remove-all-colors">Remove All</button>
		</div>
	`;
    const colorPickerContainer = document.createElement('ASIDE');
    colorPickerContainer.id = 'color_picker';
    colorPickerContainer.innerHTML = HTMLContent;
    document.getElementsByTagName('BODY')[0].appendChild(colorPickerContainer);
    const colorPickerBackground = document.createElement('DIV');
    colorPickerBackground.id = 'color_picker_bg';
    document.getElementsByTagName('BODY')[0].appendChild(colorPickerBackground);
    if (localStorage.getItem('custom_colors') === null) {
        localStorage.setItem('custom_colors', '{"0": []}');
    } else {
        window.LSCustomColors = JSON.parse(localStorage.getItem('custom_colors'));
        for (let x = window.LSCustomColors[0].length - 1; x >= 0; x--) {
            // let customColorElem = document.createElement('BUTTON');
            // customColorElem.className = 'custom_colors_preview';
            // customColorElem.style.background = window.LSCustomColors[0][x];
            // customColorElem.setAttribute('data-custom-color', window.LSCustomColors[0][x]);
            // document.getElementById('custom_colors_box').appendChild(customColorElem);
        }
        if (window.LSCustomColors[0].length == 28)
            document.getElementById('custom_colors_add').style.display = 'none';
    }
})();
document.addEventListener('mousedown', function() {
    if (event.target.id != 'color_context_menu') {
        document.getElementById('color_context_menu').style.display = 'none';
    }
});
document.getElementById('color_picker_bg').addEventListener('click', function() {
    document.getElementById('color_picker').style.display = 'none';
    document.getElementById('color_picker_bg').style.display = 'none';
    colorChange(`hsla(${colorPicker.hue}`);
});

function colorChange(color) {
    const event = new CustomEvent('colorChange', {
        detail: {
            color: color
        }
    });
   
}
let HSLAToRGBA = function(h, s, l, a, toHex) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    if (toHex === true) {
        return RGBAToHexA(r, g, b, a);
    } else {
        return {
            r: r,
            g: g,
            b: b,
            a: a
        };
    }
};
let RGBAToHSLA = function(r, g, b, a) {
    r /= 255;
    g /= 255;
    b /= 255;
    a = a == undefined ? 1 : a;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return {
        h: h,
        s: s,
        l: l,
        a: a
    };
};
let RGBAToHexA = function(r, g, b, a) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    if (a.length == 1) a = '0' + a;
    if (a == 'ff') {
        return '#' + r + g + b;
    } else {
        return '#' + r + g + b + a;
    }
};
let hexAToRGBA = function(h, toHSL) {
    if (h.length == 7) h += 'ff';
    else if (h.length == 4) h += h.substring(1, 4) + 'ff';
    let r = 0,
        g = 0,
        b = 0,
        a = 1;
    if (h.length == 5) {
        r = '0x' + h[1] + h[1];
        g = '0x' + h[2] + h[2];
        b = '0x' + h[3] + h[3];
        a = '0x' + h[4] + h[4];
    } else if (h.length == 9) {
        r = '0x' + h[1] + h[2];
        g = '0x' + h[3] + h[4];
        b = '0x' + h[5] + h[6];
        a = '0x' + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);
    if (toHSL === true) {
        return RGBAToHSLA(+r, +g, +b, a);
    } else {
        return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + a + ')';
    }
};


// Decision Pending
// document.querySelectorAll('.rgba_input').forEach((element) => {
//     element.addEventListener('change', function() {
//         const rgbaInput = document.querySelectorAll('.rgba_input');
//         if (rgbaInput[0].value > 255) throw 'Value must be below 256';
//         if (rgbaInput[1].value > 255) throw 'Value must be below 256';
//         if (rgbaInput[2].value > 255) throw 'Value must be below 256';
//         if (rgbaInput[3].value > 1) throw 'Value must be equal to or below 1';
//         updateColorDisplays(`rgba(${rgbaInput[0].value}, ${rgbaInput[1].value}, ${rgbaInput[2].value}, ${rgbaInput[3].value})`);
//     });
// });

// document.getElementById('custom_colors_box').addEventListener('click', function(event) {
//     if (event.target.className == 'custom_colors_preview') {
//         const color = event.target.getAttribute('data-custom-color');
//         updateColorDisplays(color);
//     }
// });
let addCustomColor = function() {
    if (window.LSCustomColors[0].length == 27)
        document.getElementById('custom_colors_add').style.display = 'none';
    const color = `hsla(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;
    let customColorElem = document.createElement('BUTTON');
    customColorElem.className = 'custom_colors_preview';
    customColorElem.style.background = color;
    customColorElem.setAttribute('data-custom-color', color);
    // document.getElementById('custom_colors_box').appendChild(customColorElem);
    window.LSCustomColors[0].unshift(color);
    localStorage.setItem('custom_colors', JSON.stringify(window.LSCustomColors));
};
document.getElementById('custom_colors_add').addEventListener('mouseup', function() {
    addCustomColor();
});
// document.getElementById('custom_colors_box').addEventListener('contextmenu', function(event) {
//     if (event.target.className == 'custom_colors_preview') {
//         event.preventDefault();
//         const contextMenu = document.getElementById('color_context_menu');
//         contextMenu.style.display = 'block';
//         contextMenu.style.top = event.target.getBoundingClientRect().top + 25 + 'px';
//         contextMenu.style.left = event.target.getBoundingClientRect().left + 'px';
//         colorPicker.contextMenuElem = event.target;
//     }
// });
let clearSingleCustomColor = function(element) {
    const elemToRemove = element === undefined ? colorPicker.contextMenuElem : element;
    // document.getElementById('custom_colors_box').removeChild(elemToRemove);
    window.LSCustomColors = {
        '0': []
    };
    for (let x in document.getElementsByClassName('custom_colors_preview')) {
        if (isNaN(x) === true) {
            continue;
        }
        window.LSCustomColors[0].push(document.getElementsByClassName('custom_colors_preview')[x].getAttribute('data-custom-color'));
    }
    localStorage.setItem('custom_colors', JSON.stringify(window.LSCustomColors));
    document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_single').addEventListener('mousedown', function() {
    clearSingleCustomColor();
});
let clearSingleCustomColorTouch = function(event) {
    if (event.target.className == 'custom_colors_preview') {
        const now = new Date().getTime();
        const timeSince = now - colorPicker.doubleTapTime;
        if (timeSince < 200 && timeSince > 0) {
            clearSingleCustomColor(event.target);
        } else {
            colorPicker.doubleTapTime = new Date().getTime();
        }
    }
};
// document.getElementById('custom_colors_box').addEventListener('touchstart', function() {
//     clearSingleCustomColorTouch(event);
// }, {
//     passive: true
// });
let clearAllCustomColors = function() {
    window.LSCustomColors = {
        '0': []
    };
    while (document.getElementsByClassName('custom_colors_preview').length > 0) {
        // document.getElementById('custom_colors_box').removeChild(document.getElementsByClassName('custom_colors_preview')[0]);
    }
    localStorage.setItem('custom_colors', JSON.stringify(window.LSCustomColors));
    document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_all').addEventListener('mousedown', function() {
    clearAllCustomColors();
});
let colorSliderHandler = function(position) {
    const sliderContainer = document.getElementById('color_slider');
    const sliderDragger = document.getElementById('color_slider_dragger');
    let eventX = position - sliderContainer.getBoundingClientRect().left;
    if (eventX < 11) {
        eventX = 11;
    }
    if (eventX > 277) {
        eventX = 277;
    }
    sliderDragger.attributes.x.nodeValue = eventX;
    const percent = ((eventX - 11) / 266) * 100;
    const HColor = Math.round(359 - (359 / 100) * percent);
    colorPicker.hue = HColor;
    const HSLA = `hsla(${HColor}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;
    document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSLA);
    document.getElementById('saturation').children[1].setAttribute('stop-color', `hsl(${HColor}, 100%, 50%)`);
    updateColorValueInput();
};
document.getElementById('color_slider').addEventListener('mousedown', function(event) {
    colorPicker.sliderStatus = true;
    colorSliderHandler(event.pageX);
});
document.addEventListener('mousemove', function(event) {
    if (colorPicker.sliderStatus === true) {
        colorSliderHandler(event.pageX);
    }
});
document.addEventListener('mouseup', function() {
    if (colorPicker.sliderStatus === true) {
        console.log("Mouse Up")
        colorPicker.sliderStatus = false;

    }
});
document.getElementById('color_slider').addEventListener('touchstart', function(event) {
    colorPicker.sliderStatusTouch = true;
    colorSliderHandler(event.changedTouches[0].clientX);
}, {
    passive: true
});
document.addEventListener('touchmove', function() {
    if (colorPicker.sliderStatusTouch === true) {
        event.preventDefault();
        colorSliderHandler(event.changedTouches[0].clientX);
    }
}, {
    passive: false
});
document.addEventListener('touchend', function() {
    if (colorPicker.sliderStatusTouch === true) {
        colorPicker.sliderStatusTouch = false;
    }
});
let opacitySliderHandler = function(position) {
    const sliderContainer = document.getElementById('opacity_slider');
    const sliderDragger = document.getElementById('opacity_slider_dragger');
    let eventX = position - sliderContainer.getBoundingClientRect().left;
    if (eventX < 11) {
        eventX = 11;
    }
    if (eventX > 277) {
        eventX = 277;
    }
    sliderDragger.attributes.x.nodeValue = eventX;
    const percent = ((eventX - 11) / 266) * 100;
    let alpha = (1 / 100) * percent;
    alpha = Number(Math.round(alpha + 'e' + 2) + 'e-' + 2);
    colorPicker.alpha = alpha;
    const HSLA = `hsla(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${alpha})`;
    document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSLA);
    updateColorValueInput();
};
document.getElementById('opacity_slider').addEventListener('mousedown', function(event) {
    colorPicker.opacityStatus = true;
    opacitySliderHandler(event.pageX);
});
document.addEventListener('mousemove', function(event) {
    if (colorPicker.opacityStatus === true) {
        opacitySliderHandler(event.pageX);
    }
});
document.addEventListener('mouseup', function() {
    if (colorPicker.opacityStatus === true) {
        colorPicker.opacityStatus = false;
    }
});
document.getElementById('opacity_slider').addEventListener('touchstart', function(event) {
    colorPicker.opacityStatusTouch = true;
    opacitySliderHandler(event.changedTouches[0].clientX);
}, {
    passive: true
});
document.addEventListener('touchmove', function() {
    if (colorPicker.opacityStatusTouch === true) {
        event.preventDefault();
        opacitySliderHandler(event.changedTouches[0].clientX);
    }
}, {
    passive: false
});
document.addEventListener('touchend', function() {
    if (colorPicker.opacityStatusTouch === true) {
        colorPicker.opacityStatusTouch = false;
    }
});
let colorBoxHandler = function(positionX, positionY, touch) {
    const boxContainer = document.getElementById('color_box');
    const boxDragger = document.getElementById('box_dragger');
    let eventX = positionX - boxContainer.getBoundingClientRect().left;
    let eventY = touch === true ? positionY - boxContainer.getBoundingClientRect().top : positionY -
        boxContainer.getBoundingClientRect().top -
        document.getElementsByTagName('HTML')[0].scrollTop;
    if (eventX < 14) {
        eventX = 14;
    }
    if (eventX > 336) {
        eventX = 336;
    }
    if (eventY < 14) {
        eventY = 14;
    }
    if (eventY > 173) {
        eventY = 173;
    }
    boxDragger.attributes.y.nodeValue = eventY;
    boxDragger.attributes.x.nodeValue = eventX;
    const SPercent = Math.round(((eventX - 15) / 322) * 100);
    const percentX = 100 - SPercent / 2;
    const percentY = 100 - ((eventY - 15) / 159) * 100;
    let LPercent = Math.floor((percentY / 100) * percentX);
    colorPicker.saturation = SPercent;
    colorPicker.lightness = LPercent;
    const HSLA = `hsla(${colorPicker.hue}, ${SPercent}%, ${LPercent}%, ${colorPicker.alpha})`;
    document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSLA);
    updateColorValueInput();
};
document.getElementById('color_box').addEventListener('mousedown', function(event) {
    colorPicker.boxStatus = true;
    colorBoxHandler(event.pageX, event.pageY);
});
document.addEventListener('mousemove', function(event) {
    if (colorPicker.boxStatus === true) {
        colorBoxHandler(event.pageX, event.pageY);
    }
});
document.addEventListener('mouseup', function(event) {
    if (colorPicker.boxStatus === true) {
        colorPicker.boxStatus = false;
        // Here You Go
        if (currentSelection === 0){ return};
        oldTxt = currentSelection.text
        currentSelection.text = " "
        currentSelection.text = oldTxt;
        currentSelection.setColor(colorPicker.color)
        canvas.add(currentSelection).renderAll();
        
    }
});
document.getElementById('color_box').addEventListener('touchstart', function(event) {
    colorPicker.boxStatusTouch = true;
    colorBoxHandler(event.changedTouches[0].clientX, event.changedTouches[0].clientY, true);
}, {
    passive: true
});
document.addEventListener('touchmove', function() {
    if (colorPicker.boxStatusTouch === true) {
        event.preventDefault();
        colorBoxHandler(event.changedTouches[0].clientX, event.changedTouches[0].clientY, true);
    }
}, {
    passive: false
});
document.addEventListener('touchend', function() {
    if (colorPicker.boxStatusTouch === true) {
        colorPicker.boxStatusTouch = false;
    }
});
let updateColorDisplays = function(color) {
    if (color.substring(0, 1) == '#') {
        color = hexAToRGBA(color, true);
    } else if (color.substring(0, 1) == 'r') {
        const rgb = color.match(/[.?\d]+/g);
        rgb[3] = rgb[3] == undefined ? 1 : rgb[3];
        color = RGBAToHSLA(rgb[0], rgb[1], rgb[2], rgb[3]);
    } else {
        const hsl = color.match(/[.?\d]+/g);
        hsl[3] = hsl[3] == undefined ? 1 : hsl[3];
        color = {
            h: hsl[0],
            s: hsl[1],
            l: hsl[2],
            a: hsl[3]
        };
    }
    colorPicker.hue = color.h;
    colorPicker.saturation = color.s;
    colorPicker.lightness = color.l;
    colorPicker.alpha = color.a;
    updateColorValueInput();
    document.getElementById('color_picked_preview').children[0].setAttribute('fill', `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a}`);
    document.getElementById('saturation').children[1].setAttribute('stop-color', `hsl(${color.h}, 100%, 50%)`);
    const boxDragger = document.getElementById('box_dragger');
    let x, y;
    const percentY = 100 - (color.l / (100 - color.s / 2)) * 100;
    y = (159 / 100) * percentY + 14;
    x = (322 / 100) * color.s + 14;
    boxDragger.attributes.x.nodeValue = x;
    boxDragger.attributes.y.nodeValue = y;
    const hueSliderDragger = document.getElementById('color_slider_dragger');
    let percentHue = 100 - (color.h / 359) * 100;
    let hueX = (266 / 100) * percentHue + 11;
    hueSliderDragger.attributes.x.nodeValue = hueX;
    const alphaSliderDragger = document.getElementById('opacity_slider_dragger');
    let alphaX = (266 / 100) * (color.a * 100) + 11;
    alphaSliderDragger.attributes.x.nodeValue = alphaX;
};
let updateColorValueInput = function() {
    if (colorPicker.colorTypeStatus == 'HEXA') {
        const hexValue = HSLAToRGBA(colorPicker.hue, colorPicker.saturation, colorPicker.lightness, colorPicker.alpha, true);
        colorPicker.color = hexValue
        // document.getElementById('hex_input').value = hexValue;
    } else if (colorPicker.colorTypeStatus == 'RGBA') {
        const RGBAValue = HSLAToRGBA(colorPicker.hue, colorPicker.saturation, colorPicker.lightness, colorPicker.alpha);
        document.getElementsByClassName('rgba_input')[0].value = RGBAValue.r;
        document.getElementsByClassName('rgba_input')[1].value = RGBAValue.g;
        document.getElementsByClassName('rgba_input')[2].value = RGBAValue.b;
        document.getElementsByClassName('rgba_input')[3].value = RGBAValue.a;
    } else {
        document.getElementsByClassName('hsla_input')[0].value = colorPicker.hue;
        document.getElementsByClassName('hsla_input')[1].value = colorPicker.saturation;
        document.getElementsByClassName('hsla_input')[2].value = colorPicker.lightness;
        document.getElementsByClassName('hsla_input')[3].value = colorPicker.alpha;
    }
};