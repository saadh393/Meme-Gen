let cData = {
    selectionType: undefined,

}
// Initialize Values
init()

// Default State
defaultPropartyValues();

// Event Handling
mainMenuEvents();


// Event : When Any Object is Selected
canvas.on('object:selected', function(e) {
    cData.selectionType = e.target.type

    if (e.target.type === 'textbox') {
        cData.fontStyle = canvas.getActiveObject().fontStyle
        cData.fontWeight = canvas.getActiveObject().fontWeight
        currentSelection = e.target
        contentDialogInput.value = e.target.text
        fontSliderProperties.show();

        // Bold Background Color
        if (cData.fontWeight == 'normal'){
            document.querySelector('.btnBold').style.backgroundColor = "var(--Orange500)"
        }else{
            document.querySelector('.btnBold').style.backgroundColor = ""
        }
    }
});

// Event : When Any Object is Deselected
canvas.on('selection:cleared', function(e) {
    cData.selectionType = undefined
    // Add Text Customizations
    fontsSubMenuVisibility();
    contentDialogInput.value = ""
    fontSliderProperties.hide(); //style.display = 'none'
    fontFamilyProperties.hide();
    currentSelection = 0;

})

//removeBtn(); // for Remove Icon

// Setting Canvas Background
let template = new Image(960, 862);
template.src = './templates/template1.jpg';
canvas.setBackgroundImage(template.src, canvas.renderAll.bind(canvas), {
    scaleX: canvas.width / 960,
    scaleY: canvas.height / 862

});


// Adding Image
let addImage = document.getElementById('addImage');
addImage.addEventListener("change", function(e) {
    let targetFile = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(f) {
        let imageRef = f.target.result;
        fabric.Image.fromURL(imageRef, function(img) {
            var oImage = img.set({
                left: 0,
                top: 0,
                angle: 0
            }).scale(0.4);
            canvas.add(oImage).renderAll()
        });
    }

    reader.readAsDataURL(targetFile)
})

// Add Text
btnAddText.addEventListener("click", function() {

    btnContentDialog.style.display = 'grid'
    contentDialogSubmit.addEventListener("click", function(e) {

        if (currentSelection == 0) {
            console.log("Creating New")
            text = new fabric.Textbox(contentDialogInput.value, {
                left: 100,
                top: 100
            });
            text.fontFamily = 'cursive';
            text.centeredScaling = true;
            canvas.add(text).renderAll();
            fontsSubMenuVisibility();

        } else {
            currentSelection.text = contentDialogInput.value;
            canvas.add(currentSelection).renderAll()
            currentSelection = 0;

        }
        btnContentDialog.style.display = 'none'
        contentDialogInput.value = ""
    });

    document.getElementById("cancelText").addEventListener("click", () => {
        btnContentDialog.style.display = 'none'
    })



});



function mainMenuEvents() {

    //Text Sub Menu Bar Appearence Controller
    menuText.addEventListener('click', () => {
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
    })

    // Change Font Size 
    $("#chnageSize").on("click", () => {
        if (currentSelection == 0) return;
        updateFontSize();
        fontSizeController.fadeToggle(100, 'linear')
    })
}

function defaultPropartyValues() {

    currentSelection = 0;

    //Hide Popups
    fontSliderProperties.hide();
    fontFamilyProperties.hide();
    fontSizeController.hide();

    fabric.Object.prototype.set({
        transparentCorners: false,
        borderColor: '#ff0000',
        cornerColor: '#333'
    });

    // Font Size Controller
    slideValue.style.left = "45%";
    slideValue.textContent = inputSlider.value;

}

function init() {
    canvas = new fabric.Canvas('canvas');
    canvas.selection = false; // Disable Drag Selection

    menuText = document.getElementById('dialogFont');
    btnAddText = document.getElementById('addText');
    btnContentDialog = document.getElementById('dialog')
    contentDialogInput = document.getElementById('textFortext')
    contentDialogSubmit = document.getElementById('btnForText')
    mainSlider = document.getElementById('mainSlider')

    // Main Menu
    chnageFont = $("#chnageFont");

    // Font Properties Menu
    fontSliderProperties = $("#font-slider-properties") //document.getElementById('font-slider-properties');
    fontFamilyProperties = $("#fontFamily-properties") //document.getElementById('fontFamily-properties')
    fontSizeController = $("#fontSizeController")

    // Font Size Controller
    slideValue = document.getElementById('sliderVal');
    inputSlider = document.getElementById('fontSizeSlider');

}

function removeBtn() {
    function formetterDiv(x, y){
        x-=90
        y-=11
        var textFometter = `
        <div class="textFormetter" style="padding : 2px; position:absolute;top:${y}px;left:${x}px;cursor:pointer;width:80px;height:20px;background-color:var(--Orange600); text-align-last: center;">
        </div>
    `
    $(".canvas-container").append(textFometter);
    }
    

    function addDeleteBtn(x, y) {
        $(".deleteBtn").remove();
        var btnLeft = x + 0;
        var btnTop = y - 15;
        var deleteBtn = '<img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/close-222-1153172.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:20px;height:20px;"/>';
        $(".canvas-container").append(deleteBtn);
    }

    // Bold btn
    function btnBold() {
        $(".btnBold").remove();
        let btnBold = '<img src="../icons/bold-text.svg" class="btnBold" style="cursor:pointer;width:20px;height:20px;"/>';
        if (cData.selectionType != 'textbox') return
        $(".textFormetter").append(btnBold)
        // $(".canvas-container").append(btnBold);
    }

    // Bold btn
    function btnItalic() {
        $(".btnItalic").remove();
        let btnItalic = '<img src="../icons/italic-text.svg" class="btnItalic" style="cursor:pointer;width:20px;height:20px;"/>';
        if (cData.selectionType != 'textbox') return
        $(".textFormetter").append(btnItalic);
    }

    function btnUnderline(){
        $(".btnUnderline").remove();
        let btnUnderline = '<img src="../icons/italic-text.svg" class="btnUnderline" style="cursor:pointer;width:20px;height:20px;"/>';
        if (cData.selectionType != 'textbox') return
        $(".textFormetter").append(btnUnderline);
    }



    canvas.on('object:selected', function(e) {
        formetterDiv(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        btnBold()
        btnItalic()
    });

    canvas.on('mouse:down', function(e) {
        if (!canvas.getActiveObject()) {
            formetterDiv(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
            $(".deleteBtn").remove();
            $(".btnBold").remove();
            $(".btnItalic").remove();

        }
    });

    canvas.on('object:modified', function(e) {
        formetterDiv(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        btnBold()
        btnItalic()

    });

    canvas.on('object:scaling', function(e) {
        $(".textFormetter").remove();
        $(".deleteBtn").remove();
        $(".btnBold").remove();
        $(".btnItalic").remove();
    });

    canvas.on('object:moving', function(e) {
        $(".textFormetter").remove();
        $(".deleteBtn").remove();
        $(".btnBold").remove();
        $(".btnItalic").remove();
    });

    canvas.on('object:rotating', function(e) {
        $(".textFormetter").remove();
        $(".deleteBtn").remove();
        $(".btnBold").remove();
        $(".btnItalic").remove();
    });

    // Delete Button CLick Event
    $(document).on('click', ".deleteBtn", function() {
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
            $(".deleteBtn").remove();
            $(".btnBold").remove();
            $(".btnItalic").remove();
        }
    });


    // Bold Button CLick Event
    $(document).on('click', ".btnBold", function() {
        if (canvas.getActiveObject()) {           
            if(cData.fontWeight == 'normal'){
                canvas.getActiveObject().set("fontWeight", "bold");
                document.querySelector('.btnBold').style.backgroundColor = "var(--Orange500)"
                cData.fontWeight = "bold";
            }else{
                canvas.getActiveObject().set("fontWeight", "normal");
                document.querySelector('.btnBold').style.backgroundColor = ""
                cData.fontWeight = "normal";
            }

            canvas.renderAll();
        }
    });

    // Italic Button CLick Event
    $(document).on('click', ".btnItalic", function() {
        if (canvas.getActiveObject()) {
            let fontStyle = "normal"
            cData.fontStyle == fontStyle ? fontStyle = "italic" : fontStyle = "normal";
            canvas.getActiveObject().set("fontStyle", fontStyle);
            canvas.renderAll();
            cData.fontStyle = fontStyle;
        }
    });
}

function fontsSubMenuVisibility() {
    fontSliderProperties.fadeToggle(300, "linear");
    return;
}

function updateFont(fontName) {
    if (currentSelection == 0) return;
    currentSelection.fontFamily = fontName;
    canvas.add(currentSelection).renderAll();
    fontFamilyProperties.fadeOut();
}

function updateFontSize() {
    inputSlider.oninput = (() => {
        if (currentSelection == 0) return;
        let val = inputSlider.value;
        slideValue.textContent = val

        currentSelection.fontSize = val;
        canvas.add(currentSelection).renderAll();

    });
}