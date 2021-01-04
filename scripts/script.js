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
        cData.underline = canvas.getActiveObject().underline

        currentSelection = e.target
        contentDialogInput.value = e.target.text
        fontSliderProperties.show();

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

removeBtn(); // for Remove Icon



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
    function addDeleteBtn(x, y) {
        $(".deleteBtn").remove();
        var btnLeft = x + 0;
        var btnTop = y - 15;
        var deleteBtn = '<img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/close-222-1153172.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:20px;height:20px;"/>';
        $(".canvas-container").append(deleteBtn);
    }

    // Bold btn
    function btnBold(x, y) {
        $(".btnBold").remove();
        var btnLeft = x - 20;
        var btnTop = y - 15;
        let btnBold = '<img src="../icons/bold-text.svg" class="btnBold" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:20px;height:20px;"/>';
        if (cData.selectionType != 'textbox') return
        $(".canvas-container").append(btnBold)
        // $(".canvas-container").append(btnBold);
    }

    // Bold btn
    function btnItalic(x, y) {
        $(".btnItalic").remove();
        var btnLeft = x - 40;
        var btnTop = y - 15;
        let btnItalic = '<img src="../icons/italic-text.svg" class="btnItalic" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:20px;height:20px;"/>';
        if (cData.selectionType != 'textbox') return
        $(".canvas-container").append(btnItalic);
    }

    function btnUnderline(x, y){
        $(".btnUnderline").remove();
        var btnLeft = x - 60;
        var btnTop = y - 15;
        let btnUnderline = '<img src="../icons/underline-text.svg" class="btnUnderline" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:20px;height:20px;"/>';
        if (cData.selectionType != 'textbox') return
        $(".canvas-container").append(btnUnderline);
    }



    canvas.on('object:selected', function(e) {
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        btnBold(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        btnItalic(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        btnUnderline(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        console.log(cData.selectionType)
        if(cData.selectionType == 'textbox'){
            selectedTextItemActivity('object:selected')
        }

        
    });

    canvas.on('mouse:down', function(e) {
        if (!canvas.getActiveObject()) {
            $(".deleteBtn").remove();
            $(".btnBold").remove();
            $(".btnItalic").remove();
            $(".btnUnderline").remove();
            
            // if(cData.selectionType == 'textbox'){
            //     selectedTextItemActivity()
            // }
        }
    });

    canvas.on('object:modified', function(e) {
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        btnBold(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        btnItalic(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        btnUnderline(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        if(cData.selectionType == 'textbox'){
            selectedTextItemActivity('object:modified')
        }
    });

    canvas.on('object:scaling', function(e) {
        $(".deleteBtn").remove();
        $(".btnBold").remove();
        $(".btnItalic").remove();
        $(".btnUnderline").remove();

        // if(cData.selectionType == 'textbox'){
        //     selectedTextItemActivity('object:scaling')
        // }
    });

    canvas.on('object:moving', function(e) {
        $(".deleteBtn").remove();
        $(".btnBold").remove();
        $(".btnItalic").remove();
        $(".btnUnderline").remove();
        // if(cData.selectionType == 'textbox'){
        //     selectedTextItemActivity('object:moving')
        // }
    });

    canvas.on('object:rotating', function(e) {
        $(".deleteBtn").remove();
        $(".btnBold").remove();
        $(".btnItalic").remove();
        $(".btnUnderline").remove();
        // if(cData.selectionType == 'textbox'){
        //     selectedTextItemActivity('object:rotating')
        // }
    });

    // Delete Button CLick Event
    $(document).on('click', ".deleteBtn", function() {
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
            $(".deleteBtn").remove();
            $(".btnBold").remove();
            $(".btnItalic").remove();
            $(".btnUnderline").remove();
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
            if(cData.fontStyle == 'normal'){
                canvas.getActiveObject().set("fontStyle", "italic");
                document.querySelector('.btnItalic').style.backgroundColor = "var(--Orange500)"
                cData.fontStyle = 'italic';
            }else {
                canvas.getActiveObject().set("fontStyle", "normal");
                cData.fontStyle = 'normal';
                document.querySelector('.btnItalic').style.backgroundColor = ""
            }
            canvas.renderAll();

        }
    });

    // Underline Button CLick Event
    $(document).on('click', ".btnUnderline", function() {
        if (canvas.getActiveObject()) {           
            if(cData.underline == false){
                canvas.getActiveObject().set("underline", true);
                document.querySelector('.btnUnderline').style.backgroundColor = "var(--Orange500)"
                cData.underline = true;
            }else{
                canvas.getActiveObject().set("underline", false);
                document.querySelector('.btnUnderline').style.backgroundColor = ""
                cData.underline = false;
            }

            canvas.renderAll();
        }
    });
}

function fontsSubMenuVisibility() {
    fontSliderProperties.fadeToggle(300, "linear");
    return;
}

function updateFont(fontName) {
    if (selectionType == 0) return;
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

function selectedTextItemActivity(x){
    console.table(x)
    // Bold or Not
    if (cData.fontWeight == 'normal'){
        document.querySelector('.btnBold').style.backgroundColor = ""
    }else{
        document.querySelector('.btnBold').style.backgroundColor = "var(--Orange500)"
    }

    // Italic Or Not
    if (cData.fontStyle == 'normal'){
        document.querySelector('.btnItalic').style.backgroundColor = ""
    }else{
        document.querySelector('.btnItalic').style.backgroundColor = "var(--Orange500)"
    }

    // Underline Or Not
    if (cData.underline == true){
        document.querySelector('.btnUnderline').style.backgroundColor = "var(--Orange500)"
    }else{
        document.querySelector('.btnUnderline').style.backgroundColor = ""
    }
}