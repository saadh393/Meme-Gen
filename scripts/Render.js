function renderMenuState(className, property, value) {
  if (cData[property] == value[0]) {
    canvas.getActiveObject().set(property, value[1]);
    document.querySelector(className).style.backgroundColor = "#3f51b5";
    cData[property] = value[1];
  } else {
    canvas.getActiveObject().set(property, value[0]);
    document.querySelector(className).style.backgroundColor = "";
    cData[property] = value[0];
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
  image.src = "./icons/Down-Btn.png";
  //   image.src = "./icons/Down Btn.svg";
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
    colorBox.onclick = () => handleFunc(color, colorBox);

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

function renderMenuDialog(_rootId, _containerId, _imagesId, _callback) {
  const rootContainer = document.createElement("div");
  rootContainer.className = "DialogMain";
  rootContainer.id = _rootId;

  const dialogContainer = document.createElement("div");
  dialogContainer.className = "dialogContainer";
  dialogContainer.id = _containerId;

  const imageList = document.createElement("div");
  imageList.className = "images";
  imageList.id = _imagesId;

  const shapeColorHolder = document.createElement("div");
  shapeColorHolder.id = "shapeColorHolder";

  dialogContainer.appendChild(imageList);
  dialogContainer.appendChild(shapeColorHolder);
  rootContainer.appendChild(dialogContainer);
  document.body.appendChild(rootContainer);

  _callback();
}

function renderShapeDialogItems() {
  // Input Shapes As Image Render
  const shapeImageNames = ["circle.svg", "rect.svg", "traingle.svg", "poli.svg"];
  shapeImageNames.forEach((image) => {
    const img = document.createElement("img");
    img.src = `./icons/shapes/${image}`;
    img.onclick = () => selectedShape(img, image);
    document.getElementById("shapeImages").appendChild(img);
  });
  renderColorDom("shapeColorHolder", "shapeFillPicker", shapeFillColor, true);

  //   // Fill and Stroke Input Render
  //   const div = document.createElement("div");
  //   div.className = "flex-space-between";

  //   div.innerHTML = `
  //   <div style="display: flex;align-items: center;gap: 10px;">
  //   Fill : <input type='color' id='shapeFillPicker' style="width: 35px; height: 35px; margin-top: 6px;"/>
  //   </div>
  //   <div style="display: flex;align-items: center;gap: 10px;">
  //   Stroke : <input type='color' id='shapeStrokePicker' style="width: 35px; height: 35px; margin-top: 6px;"/>
  //   </div>
  //   `;
  //   const shapeContainer = document.getElementById("shapeContainer");
  //   shapeContainer.appendChild(div);
  //   renderRangeSlider("shapeStrokeInput", "shapeWidthValue", "shapeContainer");

  const bottomButtons = document.createElement("div");
  bottomButtons.className = "brashButtons";

  const okbtn = document.createElement("button");
  const cancelbtn = document.createElement("button");

  okbtn.id = "shapeOkBtn";
  okbtn.innerText = "ok";
  cancelbtn.id = "shapeCancelBtn";
  cancelbtn.innerText = "Cancel";

  bottomButtons.appendChild(cancelbtn);
  bottomButtons.appendChild(okbtn);
  shapeContainer.appendChild(bottomButtons);
}
