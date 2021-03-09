/**
 *  Abbreviations
 *    1. Input Dialog Overlay = ido
 *
 *
 *
 */

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
  // console.log(e.target.type);

  if (e.target.type === "textbox") {
    cData.fontStyle = canvas.getActiveObject().fontStyle;
    cData.fontWeight = canvas.getActiveObject().fontWeight;
    cData.underline = canvas.getActiveObject().underline;
    cData.alignment = canvas.getActiveObject().textAlign;
    cData.fontSize = canvas.getActiveObject().fontSize;

    if (canvas.getActiveObject().shadow) {
      cData.shadowBlur = canvas.getActiveObject().shadow.blur || 0;
      // test
    } else {
      const shadow = {
        color: "rgb(0,0,0)",
        blur: 0,
        offsetX: 0,
        offsetY: 0,
      };
      cData.shadow = shadow;
    }

    if (!cData.stroke) {
      cData.stroke = {
        strokeWidth: canvas.getActiveObject().strokeWidth || 0,
        stroke: canvas.getActiveObject().stroke || "rgb(0,0,0)",
        strokeLineCap: "butt",
      };
    }

    currentSelection = e.target;
    ido_Text.value = e.target.text;
    fontSliderProperties.show();
  }
});

// Event : When Any Object is Deselected
canvas.on("selection:cleared", (e) => {
  console.log("selection:cleared");
  cData.selectionType = undefined;
  cData.alignment = undefined;
  cData.shadowBlur = 0;

  // Add Text Customizations
  // fontsSubMenuVisibility();
  // fontSliderProperties.hide(); // style.display = 'none'
  // $("#colorPickerSlider").hide();
  // $(".textAlign").remove();

  ido_Text.value = "";
  fontFamilyProperties.hide();
  fontSizeController.hide();
  removeInactiveDialogs();
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

/*  
  This Piece of code used to choose template 
  Uplaod image to Canvas
  Add Text to The canvas
  
  Reference : HTML LINE => 23 

*/
// const addImage = document.getElementById("addImage");
// addImage.addEventListener("change", (e) => {
//   const targetFile = e.target.files[0];
//   const reader = new FileReader();
//   reader.onload = function (f) {
//     const imageRef = f.target.result;
//     fabric.Image.fromURL(imageRef, (img) => {
//       const oImage = img
//         .set({
//           left: 0,
//           top: 0,
//           angle: 0,
//         })
//         .scale(0.4);
//       canvas.add(oImage).renderAll();
//     });
//   };

//   reader.readAsDataURL(targetFile);
// });

// Add Text
btnAddText.addEventListener("click", (e) => {
  console.log("clicked");
  removeInactiveDialogs();
  $("#ido_main").show();
  cData.activeFontMenu.push("#ido_main"); //> ido_main

  ido_ok.addEventListener("click", (e) => {
    // if (!textBox) {
    //   // Creating New
    //   text = new fabric.Textbox(ido_Text.value, {
    //     left: 100,
    //     top: 100,
    //   });
    //   text.centeredScaling = true;
    //   text.set("fontWeight", idoData.bold ? "bold" : "normal");
    //   text.set("fontFamily", "Poppins");
    //   canvas.add(text).renderAll();
    //   fontsSubMenuVisibility();
    // } else {
    //   // Editing Existing
    //   currentSelection.text = ido_Text.value;
    //   canvas.add(currentSelection).renderAll();
    //   // canvas.getActiveObject().set("text", ido_Text.value);
    //   // canvas.requestRenderAll();
    //   currentSelection = 0;
    // }

    // Creating New
    text = new fabric.Textbox(ido_Text.value, {
      left: 100,
      top: 100,
    });
    text.centeredScaling = true;
    text.set("fontWeight", idoData.bold ? "bold" : "normal");
    text.set("fontFamily", "Poppins");
    canvas.add(text).renderAll();
    fontsSubMenuVisibility();
    ido_Main.hide();
    ido_Text.value = "";
  });

  document.getElementById("ido_close").addEventListener("click", () => {
    ido_Text.value = "";
    ido_Main.hide();
  });

  /* Formating Area of ido */

  // Bold
  let ido_Bold = $("#formatingArea-bold");
  ido_Bold.click(() => {
    if (!idoData.bold) {
      idoData.bold = true;
      ido_Text.style.fontWeight = "bold";
      ido_Bold[0].style.backgroundColor = "#ffa726";
    } else {
      idoData.bold = false;
      ido_Bold.removeAttr("style");
      ido_Text.style.fontWeight = "normal";
    }
  });

  // Italic
  let ido_Italic = $("#formatingArea-italic");
  ido_Italic.click(() => {
    if (!idoData.italic) {
      idoData.italic = true;
      ido_Text.style.fontStyle = "italic";
      ido_Italic[0].style.backgroundColor = "#ffa726";
    } else {
      idoData.italic = false;
      ido_Text.style.fontStyle = "normal";
      ido_Italic.removeAttr("style");
    }
  });

  // Underline
  let ido_underline = $("#formatingArea-underline");
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
    console.log();
  });
});

function mainMenuEvents() {
  // Text Sub Menu Bar Appearence Controller
  menuText.addEventListener("click", () => {
    fontsSubMenuVisibility();
  });

  // Sub Menu Events
  fontPropertiesEvents();
}

function fontPropertiesEvents() {
  // Change Font Family
  chnageFont.on("click", () => {
    if (currentSelection == 0) return;
    fontFamilyProperties.show();
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
  currentSelection = 0;
  textBox = false;

  // Hide Popups
  fontSliderProperties.hide();
  fontFamilyProperties.hide();
  fontSizeController.hide();
  strokeRootDiv.hide();
  shadowSlider.hide();
  ido_Main.hide();

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

  // Positioning
  shadowSlider[0].style.bottom = mainSlider.offsetHeight * 2 - 1 + "px";

  // Temporary
  text = new fabric.Textbox("Hello World", {
    left: 100,
    top: 100,
    dirty: true,
  });
  text.centeredScaling = true;
  text.set("fontWeight", idoData.bold ? "bold" : "normal");
  text.set("fontFamily", "Poppins");
  canvas.add(text).renderAll();
  fontsSubMenuVisibility();
  ido_Main.hide();
  ido_Text.value = "";
}

function init() {
  canvas = new fabric.Canvas("canvas");
  canvas.selection = false; // Disable Drag Selection

  menuText = document.getElementById("dialogFont");
  btnAddText = document.getElementById("addText");
  ido_Main = $("#ido_main"); //document.getElementById("ido_main");
  ido_Text = document.getElementById("ido_Text");
  ido_ok = document.getElementById("ido_ok");
  mainSlider = document.getElementById("mainSlider");

  // Main Menu
  chnageFont = $("#chnageFont");

  // Font Properties Menu
  fontSliderProperties = $("#font-slider-properties"); // document.getElementById('font-slider-properties');
  fontFamilyProperties = $("#fontFamily-properties"); // document.getElementById('fontFamily-properties')
  fontSizeController = $("#fontSizeController");

  // Font Size Controller
  slideValue = document.getElementById("sliderVal");
  inputSlider = document.getElementById("fontSizeSlider");

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
  function textAlign(x, y) {
    $(".textAlign").remove();
    const left = x - 53;
    const top = y + 20;
    const textAlign = `<img src="../icons/left.svg" class="textAlign flootBtn" style="display: none;position:absolute;top:${top}px;left:${left}px;cursor:pointer;width:20px;height:20px;"/>`;
    if (cData.selectionType != "textbox") return;
    $(".canvas-container").append(textAlign);
    $(".textAlign").show("slide", { direction: "right" }, 110);
  }

  function addDeleteBtn(x, y) {
    $(".deleteBtn").remove();
    const btnLeft = x + 0;
    const btnTop = y - 15;
    const deleteBtn = `<img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/close-222-1153172.png" class="deleteBtn" style="position:absolute;top:${btnTop}px;left:${btnLeft}px;cursor:pointer;width:20px;height:20px;"/>`;
    $(".canvas-container").append(deleteBtn);
  }

  // Bold btn
  function btnBold(x, y) {
    $(".btnBold").remove();
    const btnLeft = x - 53;
    const btnTop = y + 90;
    const btnBold = `<img src="../icons/bold-text.svg" class="btnBold flootBtn" style="display: none;position:absolute;top:${btnTop}px;left:${btnLeft}px;cursor:pointer;width:20px;height:20px;"/>`;
    if (cData.selectionType != "textbox") return;
    $(".canvas-container").append(btnBold);
    $(".btnBold").show("slide", { direction: "right" }, 130);
  }

  // Bold btn
  function btnItalic(x, y) {
    $(".btnItalic").remove();
    const btnLeft = x - 53;
    const btnTop = y + 160;
    const btnItalic = `<img src="../icons/italic-text.svg" class="btnItalic flootBtn" style="display: none; position:absolute;top:${btnTop}px;left:${btnLeft}px;cursor:pointer;width:20px;height:20px;"/>`;
    if (cData.selectionType != "textbox") return;
    $(".canvas-container").append(btnItalic);
    $(".btnItalic").show("slide", { direction: "right" }, 150);
  }

  function btnUnderline(x, y) {
    $(".btnUnderline").remove();
    const btnLeft = x - 53;
    const btnTop = y + 230;
    const btnUnderline = `<img src="../icons/underline-text.svg" class="btnUnderline flootBtn" style="display: none;position:absolute;top:${btnTop}px;left:${btnLeft}px;cursor:pointer;width:20px;height:20px;"/>`;
    if (cData.selectionType != "textbox") return;
    $(".canvas-container").append(btnUnderline);
    $(".btnUnderline").show("slide", { direction: "right" }, 170);
  }

  canvas.on("object:selected", (e) => {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);

    if (cData.selectionType == "textbox") {
      // btnBold(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
      // textAlign(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
      // btnItalic(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
      // btnUnderline(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
      selectedTextItemActivity("object:selected");
    }
  });

  canvas.on("mouse:down", (e) => {
    console.log("mouse:down");
    if (cData.selectionType != "textbox") {
      $(".textAlign").hide("fade", 100, function () {
        $(".textAlign").remove();
      });
      $(".btnBold").hide("fade", 100, function () {
        $(".btnBold").remove();
      });
      $(".btnItalic").hide("fade", 100, function () {
        $(".btnItalic").remove();
      });
      $(".btnUnderline").hide("fade", 100, function () {
        $(".btnUnderline").remove();
      });
    }
    cData.selectionType == "textbox" ? (textBox = true) : (textBox = false);
    if (!canvas.getActiveObject()) {
      $(".deleteBtn").remove();
    }

    console.log(canvas.getActiveObject());
  });

  canvas.on("object:modified", (e) => {
    addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);

    if (cData.selectionType == "textbox") {
      selectedTextItemActivity("object:modified");
    }
  });

  canvas.on("object:scaling", (e) => {
    $(".deleteBtn").remove();
  });

  canvas.on("object:moving", (e) => {
    $(".deleteBtn").remove();
  });

  canvas.on("object:rotating", (e) => {
    $(".deleteBtn").remove();
  });

  // Delete Button CLick Event
  $(document).on("click", ".deleteBtn", () => {
    console.log(canvas.getActiveObject());

    if (canvas.getActiveObject()) {
      canvas.remove(canvas.getActiveObject());
      $(".deleteBtn").remove();
      $(".btnBold").remove();
      $(".btnItalic").remove();
      $(".btnUnderline").remove();
      $(".textAlign").remove();
    }
  });

  // Bold Button CLick Event
  $(document).on("click", ".btnBold", () => {
    if (canvas.getActiveObject()) {
      if (cData.fontWeight == "normal") {
        canvas.getActiveObject().set("fontWeight", "bold");
        document.querySelector(".btnBold").style.backgroundColor = "var(--Orange500)";
        cData.fontWeight = "bold";
      } else {
        canvas.getActiveObject().set("fontWeight", "normal");
        document.querySelector(".btnBold").style.backgroundColor = "";
        cData.fontWeight = "normal";
      }

      canvas.renderAll();
    }
  });

  // Italic Button CLick Event
  $(document).on("click", ".btnItalic", () => {
    if (canvas.getActiveObject()) {
      if (cData.fontStyle == "normal") {
        canvas.getActiveObject().set("fontStyle", "italic");
        document.querySelector(".btnItalic").style.backgroundColor = "var(--Orange500)";
        cData.fontStyle = "italic";
      } else {
        canvas.getActiveObject().set("fontStyle", "normal");
        cData.fontStyle = "normal";
        document.querySelector(".btnItalic").style.backgroundColor = "";
      }
      canvas.renderAll();
    }
  });

  // Underline Button CLick Event
  $(document).on("click", ".btnUnderline", () => {
    if (canvas.getActiveObject()) {
      if (cData.underline == false) {
        canvas.getActiveObject().set("underline", true);
        document.querySelector(".btnUnderline").style.backgroundColor = "var(--Orange500)";
        cData.underline = true;
      } else {
        canvas.getActiveObject().set("underline", false);
        document.querySelector(".btnUnderline").style.backgroundColor = "";
        cData.underline = false;
      }

      canvas.renderAll();
    }
  });

  // textAlign Button CLick Event
  $(document).on("click", ".textAlign", () => {
    if (canvas.getActiveObject()) {
      var alignments = ["left", "center", "right", "justify"];
      let i = (alignments.indexOf(cData.alignment) % 4) + 1;
      i > 3 ? (i = 0) : (i = i);
      canvas.getActiveObject().set("textAlign", alignments[i]);
      canvas.renderAll();
      cData.alignment = alignments[i];
      $(".textAlign")[0].src = "../icons/" + alignments[i] + ".svg";
    }
  });
}

function fontsSubMenuVisibility() {
  fontSliderProperties.fadeToggle(300, "linear");
}

function updateFont(fontName) {
  // console.log(selectionType);
  if (cData.selectionType == 0) return;
  canvas.getActiveObject().set("fontFamily", fontName);
  canvas.requestRenderAll();
}

function updateFontSize() {
  inputSlider.oninput = () => {
    if (currentSelection == 0) return;
    const val = inputSlider.value;
    $("#fontSizeVal")[0].innerText = val;
    canvas.getActiveObject().set("fontSize", val);
    canvas.requestRenderAll();
    // currentSelection.fontSize = val;
    // canvas.add(currentSelection).renderAll();
  };
}

function selectedTextItemActivity(x) {
  return;
  // Bold or Not
  if (cData.fontWeight == "normal") {
    document.querySelector(".btnBold").style.backgroundColor = "";
  } else {
    document.querySelector(".btnBold").style.backgroundColor = "var(--Orange500)";
  }

  // Italic Or Not
  if (cData.fontStyle == "normal") {
    document.querySelector(".btnItalic").style.backgroundColor = "";
  } else {
    document.querySelector(".btnItalic").style.backgroundColor = "var(--Orange500)";
  }

  // Underline Or Not
  if (cData.underline == true) {
    document.querySelector(".btnUnderline").style.backgroundColor = "var(--Orange500)";
  } else {
    document.querySelector(".btnUnderline").style.backgroundColor = "";
  }
}

function removeInactiveDialogs() {
  if (cData.colorPickerVisible) {
    // Checking Default Input Color Is Visible or Not
    cData.colorPickerVisible = false;
    return;
  } else {
    cData.activeFontMenu.forEach((item) => {
      console.log("Color Picker Visible ", cData.colorPickerVisible);
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

function renderColorDom(id, colorField, handleFunc) {
  const rootDiv = document.getElementById(id);

  // Down Button
  const downBtnDiv = document.createElement("div");
  downBtnDiv.className = "slider-Item";

  const image = document.createElement("img");
  image.src = "./icons/Down Btn.svg";
  image.onclick = removeInactiveDialogs;

  downBtnDiv.appendChild(image);
  rootDiv.appendChild(downBtnDiv);

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
    colorBox.style.backgroundColor = color;
    colorBox.onclick = () => handleFunc(color);

    sliderItem.appendChild(colorBox);
    rootDiv.appendChild(sliderItem);
  });
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
