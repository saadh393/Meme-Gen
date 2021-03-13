const cData = {
  selectionType: undefined,
  alignment: undefined,
  activeFontMenu: [],
};

// Initialize Values
init();

// Default State
defaultPropartyValues();

// Event Handling
mainMenuEvents();

// Event : When Any Object is Selected
canvas.on("object:selected", (e) => {
  cData.selectionType = e.target.type;

  if (e.target.type === "textbox") {
    fontSliderProperties.show("slide", { direction: "down" }, 300);
    currentSelection = e.target;

    cData.fontStyle = canvas.getActiveObject().fontStyle;
    cData.fontWeight = canvas.getActiveObject().fontWeight;
    cData.underline = canvas.getActiveObject().underline || false;
    cData.alignment = canvas.getActiveObject().textAlign;
    cData.fontSize = canvas.getActiveObject().fontSize;

    // Updating Current Menu State
    menuState(".btnBold", "fontWeight", ["normal", "bold"]);
    menuState(".btnItalic", "fontStyle", ["normal", "italic"]);
    menuState(".btnUnderline", "underline", [false, true]);

    if (canvas.getActiveObject().shadow) {
      cData.shadowBlur = canvas.getActiveObject().shadow.blur || 0;
    } else {
      cData.shadow = {
        color: "rgb(0,0,0)",
        blur: 0,
        offsetX: 0,
        offsetY: 0,
      };
    }

    if (!cData.stroke) {
      cData.stroke = {
        strokeWidth: canvas.getActiveObject().strokeWidth || 0,
        stroke: canvas.getActiveObject().stroke || "rgb(0,0,0)",
        strokeLineCap: "butt",
      };
    }
  }
});

// Event : When Any Object is Deselected
canvas.on("selection:cleared", (e) => {
  removeInactiveDialogs();
  fontSliderProperties.hide("slide", { direction: "down" }, 400);

  cData.selectionType = undefined;
  cData.alignment = undefined;
  cData.shadowBlur = 0;

  ido_Text.value = "";
  currentSelection = 0;
  cData.colorPickerVisible = false;
});

removeBtn(); // for Remove Icon

// Setting Canvas Background
const template = new Image(960, 862);
template.src = "./templates/template1.jpg";
canvas.setBackgroundImage(template.src, canvas.renderAll.bind(canvas), {
  scaleX: canvas.width / 960,
  scaleY: canvas.height / 862,
});

// Add Text
btnAddText.addEventListener("click", (e) => {
  removeInactiveDialogs();

  $("#ido_main").show();
  toolbar.hide();
  cData.activeFontMenu.push("#ido_main");

  ido_ok.addEventListener("click", (e) => {
    // Creating New
    let text = new fabric.Textbox(ido_Text.value);
    text.set({
      left: canvas.width / 2 - text.width / 2,
      top: canvas.height / 2 - text.height / 2,
    });
    text.centeredScaling = true;
    text.set("fontWeight", idoData.bold ? "bold" : "normal");
    text.set("fontStyle", idoData.italic ? "italic" : "normal");
    text.set("underline", idoData.underline);
    text.set("fontFamily", "Poppins");
    canvas.add(text).renderAll();

    resetIdo();
  });

  document.getElementById("ido_close").addEventListener("click", () => {
    resetIdo();
  });

  /* Formating Area of ido */

  // Bold
  const ido_Bold = $("#formatingArea-bold");
  ido_Bold.click(() => {
    // if (!idoData.bold) {
    //   idoData.bold = true;
    //   ido_Text.style.fontWeight = "bold";
    //   ido_Bold[0].style.backgroundColor = "#ffa726";
    // } else {
    //   idoData.bold = false;
    //   ido_Bold.removeAttr("style");
    //   ido_Text.style.fontWeight = "normal";
    // }
  });

  // Italic
  const ido_Italic = $("#formatingArea-italic");
  ido_Italic.click(() => {
    ido_Text.style.fontStyle = ido_Text.style.fontStyle == "normal" ? "italic" : "normal";
    idoData.italic = ido_Text.style.fontStyle == "italic" ? "italic" : "normal";
    console.log(idoData.italic);
    // if (!idoData.italic) {
    //   console.log(idoData);
    //   idoData.italic = true;
    //   ido_Text.style.fontStyle = "italic";
    //   ido_Italic[0].style.backgroundColor = "#ffa726";
    // } else {
    //   console.log(idoData);

    //   idoData.italic = false;
    //   ido_Text.style.fontStyle = "normal";
    //   ido_Italic[0].style.backgroundColor = "#4287f5";
    // }
  });

  // Underline
  const ido_underline = $("#formatingArea-underline");
  ido_underline.click(() => {
    if (!idoData.underline) {
      idoData.underline = true;
      ido_Text.style.textDecoration = "underline";
      ido_underline[0].style.backgroundColor = "#ffa726";
    } else {
      idoData.underline = false;
      ido_Text.style.textDecoration = "auto";
      ido_underline.removeAttr("style");
    }
  });

  // Center - Left - Right
  let ido_formateCenter = $("#formatingArea-center");
  ido_formateCenter.click(() => {
    !idoData.align ? (idoData.align = "center") : idoData;
    let aligns = ["left", "right", "center", "justified"];
    let i = aligns.indexOf(idoData.align) + 1;
    i > 3 ? (i = 0) : i;
    idoData.align = aligns[i];
    ido_Text.style.textAlign = aligns[i];
    ido_formateCenter.attr("src", `./icons/${aligns[i]}.svg`);
  });
});

function mainMenuEvents() {
  // Sub Menu Events
  fontPropertiesEvents();
}

function fontPropertiesEvents() {
  // Change Font Family
  chnageFont.on("click", () => {
    if (currentSelection == 0) return;
    // fontFamilyProperties.show();
    fontFamilyProperties.toggle();
    removeInactiveDialogs();
    cData.activeFontMenu.push("#fontFamily-properties");
  });

  // Change Font Size
  $("#chnageSize").on("click", () => {
    if (currentSelection == 0) return;
    fontSizeController.show();
    $("#fontSizeSlider")[0].value = cData.fontSize;
    $("#fontSizeVal")[0].innerText = cData.fontSize;
    updateFontSize();
    removeInactiveDialogs();
    cData.activeFontMenu.push("#fontSizeController");
  });

  const adjustDiv = $("#adjustment");
  const positionDiv = $("#position");
  const colorDiv = $("#color");
  positionDiv.hide();
  colorDiv.hide();
  // Shadow Menu Selection
  $("#btnAdjust").on("click", () => {
    positionDiv.hide();
    colorDiv.hide();
    adjustDiv.show();
  });

  $("#btnPosition").on("click", () => {
    colorDiv.hide();
    adjustDiv.hide();
    positionDiv.show();
  });

  $("#btnColor").on("click", () => {
    positionDiv.hide();
    adjustDiv.hide();
    colorDiv.show();
  });

  // Change Shadow
  $("#chnageShadow").on("click", () => {
    if (currentSelection == 0) return;
    removeInactiveDialogs();
    cData.activeFontMenu.push("#shadowSlider");
    shadowSlider.show();

    // Blur
    blurInputValue[0].value = cData.shadowBlur || 0;
    blurInputValue.on("input", (e) => {
      cData.shadow.blur = e.target.value;
      canvas.getActiveObject().set({
        shadow: cData.shadow,
      });
      canvas.renderAll();
    });
  });

  // Horizental or offsetX
  $("#horizentalInputValue").on("input", (e) => {
    cData.shadow.offsetX = e.target.value;
    canvas.getActiveObject().set({
      shadow: cData.shadow,
    });
    canvas.renderAll();
  });

  // Vertical or offsetX
  $("#verticalInputValue").on("input", (e) => {
    cData.shadow.offsetY = e.target.value;
    canvas.getActiveObject().set({
      shadow: cData.shadow,
    });
    canvas.renderAll();
  });

  // Color Picker
  $("#shadowColorPicker").on("input", (e) => {
    cData.shadow.color = e.target.value;
    canvas.getActiveObject().set({
      shadow: cData.shadow,
    });
    canvas.renderAll();
  });

  // Stroke Menu Handler
  $("#fontStroke").on("click", () => {
    if (currentSelection == 0) return;
    strokeRootDiv.show();
    removeInactiveDialogs();
    cData.activeFontMenu.push("#strokeRootDiv");
  });
  $("#strokeWidthValue").on("input", (e) => {
    cData.stroke.strokeWidth = e.target.value;
    canvas.getActiveObject().set(cData.stroke);
    canvas.renderAll();
  });
}

function defaultPropartyValues() {
  // calculateCanvas();

  currentSelection = 0;
  textBox = false;

  // Hide Popups
  fontSliderProperties.hide();
  fontFamilyProperties.hide();
  fontSizeController.hide();
  strokeRootDiv.hide();
  shadowSlider.hide();
  ido_Main.hide();

  // Image Browse Input Field Width
  const menuWidth = btnAddText.offsetWidth;
  imageBrowseInputField.style.width = menuWidth + "px";
  imageBrowseInputField.style.marginRight = 5 + "px";

  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: "#ff0000",
    cornerColor: "#333",
  });

  // Rendering
  renderFontsDom(); // Creating Font Name Lists
  renderColorDom("colorPickerContainer", "inputColor", updateColor);
  renderColorDom("shadowColorRender", "shadowColorPicker", updateShadowColor);
  renderColorDom("strokeColorRender", "shadowColorPicker", updateStrokeColor);
  renderPaintDialogOverlay();

  renderRangeSlider("fontSizeSlider", "fontSizeVal", "fontSizeController");

  // Positioning
  shadowSlider[0].style.bottom = mainSlider.offsetHeight * 2 - 1 + "px";
}

function init() {
  canvas = new fabric.Canvas("canvas");
  canvas.selection = false; // Disable Drag Selection

  // Toolbar
  toolbar = $("#toolbar");

  menuText = document.getElementById("dialogFont");
  btnAddText = document.getElementById("addText");
  ido_Main = $("#ido_main"); //document.getElementById("ido_main");
  ido_Text = document.getElementById("ido_Text");
  ido_ok = document.getElementById("ido_ok");
  mainSlider = document.getElementById("mainSlider");
  imageBrowseInputField = document.getElementById("imgLoader");

  // Main Menu
  chnageFont = $("#chnageFont");

  // Font Properties Menu
  fontSliderProperties = $("#font-slider-properties");
  fontFamilyProperties = $("#fontFamily-properties");
  fontSizeController = $("#fontSizeController");

  // Font Size Controller
  slideValue = document.getElementById("sliderVal");

  // IDO Data holder for Text and AlignMents
  idoData = {};

  // Text Shadow
  shadowSlider = $("#shadowSlider");
  shadowSliderContainer = $("#shadowSliderContainer");
  document.getElementById("shadowSlider").style.height = "100px";
  blurInputValue = $("#blurInputValue");

  // Text Stroke
  strokeRootDiv = $("#strokeRootDiv");
}

function removeBtn() {
  function addDeleteBtn(x, y) {
    $(".deleteBtn").remove();
    const btnLeft = x + 0;
    const btnTop = y - 15;
    const deleteBtn = `<img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/close-222-1153172.png" class="deleteBtn" style="position:absolute;top:${btnTop}px;left:${btnLeft}px;cursor:pointer;width:20px;height:20px;"/>`;
    $(".canvas-container").append(deleteBtn);
  }

  canvas.on("object:selected", (e) => {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
  });

  canvas.on("mouse:down", (e) => {
    console.log("mouse:down");
    cData.selectionType == "textbox" ? (textBox = true) : (textBox = false);
    !textBox ? $("#formatingMenus").hide() : $("#formatingMenus").show();
    !canvas.getActiveObject() && $(".deleteBtn").remove();
  });

  canvas.on("object:modified", (e) => {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
  });

  canvas.on("object:scaling", (e) => {
    $(".deleteBtn").remove();
    var shape = e.target,
      maxWidth = shape.get("maxWidth"),
      maxHeight = shape.get("maxHeight"),
      actualWidth = shape.scaleX * shape.width,
      actualHeight = shape.scaleY * shape.height;

    if (shape.type == "image") {
      if (!isNaN(maxWidth) && actualWidth >= maxWidth) {
        shape.set({
          scaleX: maxWidth / shape.width,
          lockScalingX: true,
        });
      }

      if (!isNaN(maxHeight) && actualHeight >= maxHeight) {
        shape.set({
          scaleY: maxHeight / shape.height,
          lockScalingY: true,
        });
      }
    }
  });

  canvas.on("object:moving", (e) => {
    $(".deleteBtn").remove();
  });

  canvas.on("object:rotating", (e) => {
    $(".deleteBtn").remove();
  });

  // Delete Button CLick Event
  $(document).on("click", ".deleteBtn", () => {
    if (canvas.getActiveObject()) {
      canvas.remove(canvas.getActiveObject());
      $(".deleteBtn").remove();
      $("#formatingMenus").hide();
    }
  });

  // Bold Button CLick Event
  $(document).on("click", ".btnBold", () => {
    if (canvas.getActiveObject()) {
      renderMenuState(".btnBold", "fontWeight", ["normal", "bold"]);
      canvas.renderAll();
    }
  });

  // Italic Button CLick Event
  $(document).on("click", ".btnItalic", () => {
    if (canvas.getActiveObject()) {
      renderMenuState(".btnItalic", "fontStyle", ["normal", "italic"]);
      canvas.renderAll();
    }
  });

  // Underline Button CLick Event
  $(document).on("click", ".btnUnderline", () => {
    if (canvas.getActiveObject()) {
      renderMenuState(".btnUnderline", "underline", [false, true]);
      canvas.renderAll();
    }
  });

  // textAlign Button CLick Event
  $(document).on("click", ".textAlign", () => {
    if (canvas.getActiveObject()) {
      var alignments = ["left", "center", "right", "justified"];
      let i = (alignments.indexOf(cData.alignment) % 4) + 1;
      i > 3 ? (i = 0) : (i = i);
      canvas.getActiveObject().set("textAlign", alignments[i]);
      canvas.renderAll();
      cData.alignment = alignments[i];
      $(".textAlign")[0].src = "../icons/" + alignments[i] + ".svg";
    }
  });
}

function updateFont(fontName) {
  if (cData.selectionType == 0) return;
  canvas.getActiveObject().set("fontFamily", fontName);
  canvas.requestRenderAll();
}

function updateFontSize() {
  document.getElementById("fontSizeSlider").oninput = () => {
    if (currentSelection == 0) return;
    const val = document.getElementById("fontSizeSlider").value;
    $("#fontSizeVal")[0].innerText = val;
    canvas.getActiveObject().set("fontSize", val);
    canvas.requestRenderAll();
  };
}

function removeInactiveDialogs() {
  if (cData.colorPickerVisible) {
    // Checking Default Input Color Is Visible or Not
    cData.colorPickerVisible = false;
    return;
  } else {
    cData.activeFontMenu.forEach((item) => {
      if ($(item).is(":visible")) {
        $(item).hide();
      }
    });
    cData.activeFontMenu = [];
  }
}

function renderFontsDom() {
  const fontList = [
    "Poppins",
    "Roboto",
    "Oswald",
    "Arial",
    "Lobster",
    "Pacifico",
    "Satisfy",
    "Bangers",
    "Audiowide",
    "Sacramento",
  ];

  fontList.forEach((fontName) => {
    let p = document.createElement("p");
    let fontNameContainer = document.getElementById("fontNameContainer");
    p.className = "slider-Item";
    p.onclick = () => updateFont(fontName);

    p.style.fontFamily = fontName;
    p.innerText = fontName;
    fontNameContainer.appendChild(p);
  });
}

function renderColorDom(id, colorField, handleFunc, isDisable) {
  const rootDiv = document.getElementById(id);

  // Down Button
  const downBtnDiv = document.createElement("div");
  downBtnDiv.className = "slider-Item";

  const image = document.createElement("img");
  image.src = "./icons/Down Btn.svg";
  image.onclick = removeInactiveDialogs;

  downBtnDiv.appendChild(image);
  !isDisable && rootDiv.appendChild(downBtnDiv);

  // Color Picker
  const colorPickerDiv = document.createElement("div");
  colorPickerDiv.className = "slider-Item";

  const inputColor = document.createElement("input");
  inputColor.style.cssText = "width: 35px; height: 35px; margin-top: 6px";
  inputColor.type = "color";
  inputColor.id = colorField;

  colorPickerDiv.appendChild(inputColor);
  rootDiv.appendChild(colorPickerDiv);

  // Vartical Line
  const vhDivSliderItem = document.createElement("div");
  const vhDiv = document.createElement("div");

  vhDivSliderItem.className = "slider-Item";
  vhDiv.className = "vh";

  vhDivSliderItem.appendChild(vhDiv);
  rootDiv.appendChild(vhDivSliderItem);

  // Colors
  const colors = [
    "#000000",
    "#ef5350",
    "#e53935",
    "#ec407a",
    "#ad1457",
    "#3f51b5",
    "#1565c0",
    "#4caf50",
    "#00796b",
    "#ffc107",
    "#ff5722",
  ];
  colors.forEach((color) => {
    const sliderItem = document.createElement("div");
    sliderItem.className = "slider-Item";

    const colorBox = document.createElement("div");
    colorBox.className = "colorBox";
    colorBox.dataset.colorCode = color;
    colorBox.style.backgroundColor = color;
    colorBox.onclick = () => handleFunc(color);

    sliderItem.appendChild(colorBox);
    rootDiv.appendChild(sliderItem);
  });
}

function renderRangeSlider(_inputId, _updatedId, _rootId) {
  const field = document.createElement("div");
  field.className = "field";

  const amount = document.createElement("div");
  amount.className = "value";
  amount.className += " left";
  amount.innerText = "Amount";

  const input = document.createElement("input");
  input.type = "range";
  input.min = 5;
  input.max = 100;
  input.id = _inputId;
  input.value = 15;
  input.step = 1;
  input.value = 15;

  const rightValue = document.createElement("div");
  rightValue.className = "value";
  rightValue.className += " right";
  rightValue.id = _updatedId;
  rightValue.innerText = "100";

  field.appendChild(amount);
  field.appendChild(input);
  field.appendChild(rightValue);

  const root = document.getElementById(_rootId);
  root.appendChild(field);
}

function updateColor(colorCode) {
  if (canvas.getActiveObject()) {
    if (currentSelection === 0) {
      return;
    }
    currentSelection.setColor(colorCode);
    canvas.renderAll();
  }
}

function updateShadowColor(colorCode) {
  if (canvas.getActiveObject()) {
    if (currentSelection === 0) {
      return;
    }
    cData.shadow.color = colorCode;
    canvas.getActiveObject().set({
      shadow: cData.shadow,
    });
    canvas.renderAll();
  }
}

function updateStrokeColor(colorCode) {
  if (canvas.getActiveObject()) {
    if (currentSelection === 0) {
      return;
    }
    cData.stroke.stroke = colorCode;
    canvas.getActiveObject().set(cData.stroke);
    canvas.requestRenderAll();
  }
}

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

function getAspctRatio(w, h) {
  var r = gcd(w, h);
  return { w: w / r, h: h / r };
}

function calculateCanvas(width, height) {
  const { w, h } = getAspctRatio(width, height);
  console.log(w, h);
  // Main Canvas Positioning
  const toolbar = document.getElementById("toolbar");
  const mainCanvas = document.getElementById("canvas");
  toolbarH = toolbar.offsetHeight;
  extraH = mainSlider.offsetHeight * 2 + 50;
  viewPortHeight = window.innerHeight;
  viewPortWidth = window.innerWidth - 20;

  canvasHeight = viewPortHeight - (toolbarH + extraH);
  canvasWidth = (viewPortHeight / h) * w;
  document.getElementById("contain").style.height = canvasHeight + 100 + "px";

  if (viewPortWidth < canvasWidth) {
    canvasWidth = viewPortWidth;
    canvasHeight = (viewPortWidth / w) * h;
  }

  canvas.setWidth(canvasWidth);
  canvas.setHeight(canvasHeight);
  canvas.renderAll();

  console.log(mainCanvas.style.top);
}

function renderMenuState(className, property, value) {
  if (cData[property] == value[0]) {
    canvas.getActiveObject().set(property, value[1]);
    document.querySelector(className).style.backgroundColor = "var(--Orange500)";
    cData[property] = value[1];
  } else {
    canvas.getActiveObject().set(property, value[0]);
    document.querySelector(className).style.backgroundColor = "";
    cData[property] = value[0];
  }
}

function menuState(className, property, value) {
  const color = cData[property] == value[0] ? "" : "var(--Orange500)";
  document.querySelector(className).style.backgroundColor = color;
}

function resetIdo() {
  toolbar.show();
  ido_Text.value = "";
  ido_Main.hide();
  idoData = {};
  idoData.italic = false;
  idoData.bold = false;
}

function renderPaintDialogOverlay() {
  paintData = {
    brush: "PencilBrush",
    color: "#00000",
    width: 3,
  };
  renderColorDom("brashColor", "inputBrushColor", updateBrushColor, true);
  renderRangeSlider("brashRange", "brashRightValue", "brashSize");

  const selectedBrush = document.querySelector(`[data-brush=${paintData.brush}]`);
  selectedBrush.className += "selected";

  // Color Picker Color Change
  $("#inputBrushColor").on("input", (e) => {
    paintData.color = e.target.value;
  });

  // Brush Stroke Width
  $("#brashRange")[0].min = 1; // Brush Width Min Setting
  $("#brashRange")[0].max = 20;
  $("#brashRightValue")[0].innerText = paintData.width;
  $("#brashRange")[0].value = paintData.width;
  $("#brashRange").on("input", (e) => {
    paintData.width = e.target.value;
    $("#brashRightValue")[0].innerText = paintData.width;
    $("#brashRange")[0].value = paintData.width;
  });

  // Button Handeling
  $("#paintCancel").click(() => {
    $("#paintDialogMain").hide();
  });

  $("#paintOk").click(() => {
    $("#paintDialogMain").hide();
    canvas.set({ isDrawingMode: true });

    if (paintData.brush === "PencilBrush" || paintData.brush === "CircleBrush") {
      canvas.freeDrawingBrush = new fabric[paintData.brush](canvas);
    } else {
      canvas.freeDrawingBrush = brushCollections(paintData, paintData.brush);
    }
    if (canvas.freeDrawingBrush) {
      const brush = canvas.freeDrawingBrush;
      brush.color = paintData.color;
      if (brush.getPatternSrc) {
        brush.source = brush.getPatternSrc.call(brush);
      }
      brush.width = parseInt(paintData.width, 10) || 1;
    }

    console.log(paintData);
  });
}

// Brush Selection
function selectBrush(e, brushName) {
  const brush = document.querySelector(".brash");
  for (image of brush.children) {
    image.className = "";
  }
  paintData.brush = brushName;
  e.target.className += "selected";
}
function updateBrushColor(color) {
  paintData.color = color;
  const choosed = document.querySelector(`[data-color-code="${color}"]`);
  choosed.className += " selected";
  console.log(choosed);
}

// Brush Stroke
function brushCollections(paintData, brushName) {
  fabric.Object.prototype.transparentCorners = false;
  if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function () {
      var patternCanvas = fabric.document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext("2d");

      ctx.strokeStyle = paintData.color;
      ctx.lineWidth = paintData.width;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function () {
      var patternCanvas = fabric.document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext("2d");

      ctx.strokeStyle = paintData.color;
      ctx.lineWidth = paintData.width;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function () {
      var squareWidth = 10,
        squareDistance = 5;
      var patternCanvas = fabric.document.createElement("canvas");
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: paintData.color,
      });

      var canvasWidth = rect.getBoundingRect().width;

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext("2d");
      rect.render(ctx);

      return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function () {
      var squareWidth = 10,
        squareDistance = 2;

      var patternCanvas = fabric.document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext("2d");

      ctx.fillStyle = paintData.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };

    var img = new Image();
    img.src = "./icons/right.png";

    var texturePatternBrush = new fabric.PatternBrush(canvas);
    texturePatternBrush.source = img;
  }
  switch (brushName) {
    case "squarePatternBrush":
      canvas.freeDrawingBrush = squarePatternBrush;
      return squarePatternBrush;
      break;
    case "diamondPatternBrush":
      canvas.freeDrawingBrush = diamondPatternBrush;
      return diamondPatternBrush;
      break;
    case "hLinePatternBrush":
      canvas.freeDrawingBrush = hLinePatternBrush;
      return hLinePatternBrush;
      break;
    case "vLinePatternBrush":
      canvas.freeDrawingBrush = vLinePatternBrush;
      return vLinePatternBrush;
      break;
  }
}
