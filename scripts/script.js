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
    cData.fontStyle = canvas.getActiveObject().fontStyle;
    cData.fontWeight = canvas.getActiveObject().fontWeight;
    cData.underline = canvas.getActiveObject().underline;
    cData.alignment = canvas.getActiveObject().textAlign;

    currentSelection = e.target;
    contentDialogInput.value = e.target.text;
    fontSliderProperties.show();
  }
});

// Event : When Any Object is Deselected
canvas.on("selection:cleared", (e) => {
  console.log("selection:cleared");
  cData.selectionType = undefined;
  cData.alignment = undefined;
  // Add Text Customizations
  fontsSubMenuVisibility();
  contentDialogInput.value = "";
  fontSliderProperties.hide(); // style.display = 'none'
  fontFamilyProperties.hide();
  currentSelection = 0;
  // $(".textAlign").remove();
});

removeBtn(); // for Remove Icon

// Setting Canvas Background
const template = new Image(960, 862);
template.src = "./templates/template1.jpg";
canvas.setBackgroundImage(template.src, canvas.renderAll.bind(canvas), {
  scaleX: canvas.width / 960,
  scaleY: canvas.height / 862,
});

// Adding Image
const addImage = document.getElementById("addImage");
addImage.addEventListener("change", (e) => {
  const targetFile = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (f) {
    const imageRef = f.target.result;
    fabric.Image.fromURL(imageRef, (img) => {
      const oImage = img
        .set({
          left: 0,
          top: 0,
          angle: 0,
        })
        .scale(0.4);
      canvas.add(oImage).renderAll();
    });
  };

  reader.readAsDataURL(targetFile);
});

// Add Text
btnAddText.addEventListener("click", (e) => {
  btnContentDialog.style.display = "grid";
  //removeInactiveDialogs()
  cData.activeFontMenu.push("#dialog");

  contentDialogSubmit.addEventListener("click", (e) => {
    if (currentSelection == 0) {
      console.log("Creating New");
      text = new fabric.Textbox(contentDialogInput.value, {
        left: 100,
        top: 100,
      });
      text.fontFamily = "cursive";
      text.centeredScaling = true;
      canvas.add(text).renderAll();
      fontsSubMenuVisibility();
    } else {
      currentSelection.text = contentDialogInput.value;
      canvas.add(currentSelection).renderAll();
      currentSelection = 0;
    }
    btnContentDialog.style.display = "none";
    contentDialogInput.value = "";
  });

  document.getElementById("cancelText").addEventListener("click", () => {
    btnContentDialog.style.display = "none";
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
    fontFamilyProperties.fadeToggle(100, "linear");
    console.log(fontFamilyProperties.attr("class"));
    removeInactiveDialogs();
    cData.activeFontMenu.push("#fontFamily-properties");
  });

  // Change Font Size
  $("#chnageSize").on("click", () => {
    if (currentSelection == 0) return;
    updateFontSize();
    fontSizeController.fadeToggle(100, "linear");
    removeInactiveDialogs();
    cData.activeFontMenu.push("#fontSizeController");
  });
}

function defaultPropartyValues() {
  currentSelection = 0;

  // Hide Popups
  fontSliderProperties.hide();
  fontFamilyProperties.hide();
  fontSizeController.hide();

  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: "#ff0000",
    cornerColor: "#333",
  });

  // Font Size Controller
  //   slideValue.style.left = "45%";
  //   slideValue.textContent = inputSlider.value;
}

function init() {
  canvas = new fabric.Canvas("canvas");
  canvas.selection = false; // Disable Drag Selection

  menuText = document.getElementById("dialogFont");
  btnAddText = document.getElementById("addText");
  btnContentDialog = document.getElementById("dialog");
  contentDialogInput = document.getElementById("textFortext");
  contentDialogSubmit = document.getElementById("btnForText");
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
      btnBold(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
      textAlign(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
      btnItalic(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
      btnUnderline(canvas.vptCoords.tr.x, canvas.vptCoords.tr.y);
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
    if (!canvas.getActiveObject()) {
      $(".deleteBtn").remove();
    }
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
        document.querySelector(".btnBold").style.backgroundColor =
          "var(--Orange500)";
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
        document.querySelector(".btnItalic").style.backgroundColor =
          "var(--Orange500)";
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
        document.querySelector(".btnUnderline").style.backgroundColor =
          "var(--Orange500)";
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
  if (selectionType == 0) return;
  currentSelection.fontFamily = fontName;
  canvas.add(currentSelection).renderAll();
  fontFamilyProperties.fadeOut();
}

function updateFontSize() {
  inputSlider.oninput = () => {
    if (currentSelection == 0) return;
    const val = inputSlider.value;
    slideValue.textContent = val;

    currentSelection.fontSize = val;
    canvas.add(currentSelection).renderAll();
  };
}

function selectedTextItemActivity(x) {
  // Bold or Not
  if (cData.fontWeight == "normal") {
    document.querySelector(".btnBold").style.backgroundColor = "";
  } else {
    document.querySelector(".btnBold").style.backgroundColor =
      "var(--Orange500)";
  }

  // Italic Or Not
  if (cData.fontStyle == "normal") {
    document.querySelector(".btnItalic").style.backgroundColor = "";
  } else {
    document.querySelector(".btnItalic").style.backgroundColor =
      "var(--Orange500)";
  }

  // Underline Or Not
  if (cData.underline == true) {
    document.querySelector(".btnUnderline").style.backgroundColor =
      "var(--Orange500)";
  } else {
    document.querySelector(".btnUnderline").style.backgroundColor = "";
  }
}

function removeInactiveDialogs() {
  cData.activeFontMenu.forEach((item) => {
    if ($(item).is(":visible")) {
      $(item).fadeToggle(100, "linear");
    }
    if (item == "#colorPickerDialog") {
      $("#colorPickerDialog").remove();
    }
  });
  cData.activeFontMenu = [];
}
