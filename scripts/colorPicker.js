const btnColorPicker = $("#chnageColor");
const colorPickerSlider = $("#colorPickerSlider");
colorPickerSlider.hide();

btnColorPicker.on("click", () => {
  if (!canvas.getActiveObject()) {
    alert("You must have to select any text to pick any color.");
    return;
  }

  removeInactiveDialogs();
  cData.activeFontMenu.push("#colorPickerSlider");
  colorPickerSlider.show();
});

//   if ($("#colorPickerSlider")) {
//     $("#colorPickerSlider").hide("slide", "up", 200, () => {
//       //   $("#colorPickerSlider").remove();
//     });
//     return;
//   }
//   let colorPickerBox = `
//         <h3> Pick Color For Your Text </h3>
//         <input type="color" name="color" id="inputColor" width="100px" height="100px" />
//         <img src="../icons/cancel.svg" id="btnCloseColorPicker" width="25px" height="25px" style="position:absolute;top: -10px; right: -10px; cursor : pointer" />
//     `;
//   const div = document.createElement("div");
//   div.id = "colorPickerDialog";
//   div.innerHTML = colorPickerBox;
//   document.getElementsByTagName("body")[0].appendChild(div);

//   let fontPropertiesPostion = $("#font-slider-properties").offset();
//   $("#colorPickerDialog")[0].style.top = fontPropertiesPostion.top - 82 + "px";

//   $("#btnCloseColorPicker").on("click", () => {
//     $("#colorPickerDialog").hide("slide", "up", 150, () => {
//       $("#colorPickerDialog").remove();
//     });
//   });

// inputColor is the Input Field for color Choosing
//   $("#inputColor").on("input", (e) => {
//     if (canvas.getActiveObject()) {
//       if (currentSelection === 0) {
//         return;
//       }
//       console.log(e.target.value);
//       currentSelection.setColor(e.target.value);
//       canvas.renderAll();
//     }
//   });

//   $("#inputColor").on("change", (e) => {
//     $("#colorPickerDialog").hide("slide", "up", 200, () => {
//       $("#colorPickerDialog").remove();
//     });
//   });

//   cData.activeFontMenu.push("#colorPickerDialog");

const updateColor = (colorCode) => {
  if (canvas.getActiveObject()) {
    if (currentSelection === 0) {
      return;
    }
    currentSelection.setColor(colorCode);
    canvas.renderAll();
  }
};
