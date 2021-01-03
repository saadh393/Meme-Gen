let cData = {
    selectionType : undefined,

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

    }
 });

// Event : When Any Object is Deselected
canvas.on('selection:cleared', function(e){
    cData.selectionType = undefined
    // Add Text Customizations
    fontsSubMenuVisibility();
    contentDialogInput.value=""    
    fontSliderProperties.hide();//style.display = 'none'
    fontFamilyProperties.hide();
    currentSelection = 0;
})

removeBtn();    // for Remove Icon

// Setting Canvas Background
let template = new Image(960, 862);
template.src = './templates/template1.jpg';
canvas.setBackgroundImage(template.src, canvas.renderAll.bind(canvas), {
    scaleX : canvas.width / 960,
    scaleY : canvas.height / 862

});


// Adding Image
let addImage = document.getElementById('addImage');
addImage.addEventListener("change", function(e){
    let targetFile = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(f){
        let imageRef = f.target.result;
        fabric.Image.fromURL(imageRef, function(img){
            var oImage = img.set({
                left : 0,
                top : 0,
                angle : 0
            }).scale(0.4);
            canvas.add(oImage).renderAll()
        });
    }

    reader.readAsDataURL(targetFile)
})

// Add Text
btnAddText.addEventListener("click", function(){

    btnContentDialog.style.display = 'grid'
    contentDialogSubmit.addEventListener("click", function(e) {

    if(currentSelection == 0){
        console.log("Creating New")
        text = new fabric.Textbox(contentDialogInput.value, { left: 100, top: 100 });
        text.fontFamily = 'cursive';
        text.centeredScaling = true;
        canvas.add(text).renderAll();
        fontsSubMenuVisibility();

    }else{
        currentSelection.text = contentDialogInput.value;
        canvas.add(currentSelection).renderAll()
        currentSelection = 0;
    
    }
    btnContentDialog.style.display = 'none'
    contentDialogInput.value=""
});

document.getElementById("cancelText").addEventListener("click", ()=>{
    btnContentDialog.style.display = 'none'
})

    

});



function mainMenuEvents(){

    //Text Sub Menu Bar Appearence Controller
    menuText.addEventListener('click', () =>{
        fontsSubMenuVisibility();
    });


    // Sub Menu Events
    fontPropertiesEvents();
}

function fontPropertiesEvents(){

    // Change Font Family
    chnageFont.on("click", () => {
        if(currentSelection == 0) return ; 
        fontFamilyProperties.fadeToggle(100, "linear");
    })

    // Change Font Size 
    $("#chnageSize").on("click", () => {
        if(currentSelection == 0) return;
        updateFontSize();
        fontSizeController.fadeToggle(100, 'linear')
    })
}

function defaultPropartyValues(){
    
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
    slideValue.style.left= "45%";
    slideValue.textContent = inputSlider.value;
    
}

function init(){
    canvas = new fabric.Canvas('canvas');
    canvas.selection = false;       // Disable Drag Selection

    menuText = document.getElementById('dialogFont');
    btnAddText = document.getElementById('addText');
    btnContentDialog = document.getElementById('dialog')
    contentDialogInput = document.getElementById('textFortext')
    contentDialogSubmit = document.getElementById('btnForText')
    mainSlider = document.getElementById('mainSlider')

    // Main Menu
    chnageFont = $("#chnageFont");

    // Font Properties Menu
    fontSliderProperties =  $("#font-slider-properties")//document.getElementById('font-slider-properties');
    fontFamilyProperties = $("#fontFamily-properties") //document.getElementById('fontFamily-properties')
    fontSizeController = $("#fontSizeController")

    // Font Size Controller
    slideValue = document.getElementById('sliderVal');
    inputSlider = document.getElementById('fontSizeSlider');
        
    
    

}

function removeBtn(){
    function addDeleteBtn(x, y){
        $(".deleteBtn").remove(); 
        var btnLeft = x-15;
        var btnTop = y-13;
        var deleteBtn = '<img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/close-222-1153172.png" class="deleteBtn" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:20px;height:20px;"/>';
        $(".canvas-container").append(deleteBtn);
    }

    // Bold btn
    function btnBold(x, y){
        $(".btnBold").remove(); 
        let btnLeft = x - 40 ;
        let btnTop  = y - 13;
        let btnBold = '<img src="../icons/bold-text.svg" class="btnBold" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:20px;height:20px;"/>';
        if(cData.selectionType != 'textbox') return
        $(".canvas-container").append(btnBold);
    }
    
    // Bold btn
    function btnItalic(x, y){
        $(".btnItalic").remove(); 
        let btnLeft = x - 80;
        let btnTop  = y - 13;
        let btnItalic = '<img src="../icons/italic-text.svg" class="btnItalic" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:20px;height:20px;"/>';
        if(cData.selectionType != 'textbox') return
        $(".canvas-container").append(btnItalic);
    }
    

    canvas.on('object:selected',function(e){
            addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
            btnBold(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
            btnItalic(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
    });
    
    canvas.on('mouse:down',function(e){
        if(!canvas.getActiveObject()){
            $(".deleteBtn").remove(); 
            $(".btnBold").remove(); 
            $(".btnItalic").remove(); 

        }
    });
    
    canvas.on('object:modified',function(e){
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        btnBold(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        btnItalic(e.target.oCoords.tr.x, e.target.oCoords.tr.y)
        
    });
    
    canvas.on('object:scaling',function(e){
        $(".deleteBtn").remove(); 
        $(".btnBold").remove(); 
        $(".btnItalic").remove(); 
    });

    canvas.on('object:moving',function(e){
        $(".deleteBtn").remove(); 
        $(".btnBold").remove(); 
        $(".btnItalic").remove(); 
    });

    canvas.on('object:rotating',function(e){
        $(".deleteBtn").remove(); 
        $(".btnBold").remove(); 
        $(".btnItalic").remove(); 
    });

    // Delete Button CLick Event
    $(document).on('click',".deleteBtn",function(){
        if(canvas.getActiveObject()){
            canvas.remove(canvas.getActiveObject());
            $(".deleteBtn").remove();
            $(".btnBold").remove(); 
            $(".btnItalic").remove(); 
        }
    });


    // Bold Button CLick Event
    $(document).on('click',".btnBold",function(){
        if(canvas.getActiveObject()){
            let weight = "normal"
            cData.fontWeight == weight ? weight = "bold" : weight = "normal";
            canvas.getActiveObject().set("fontWeight", weight);
            canvas.renderAll();
            cData.fontWeight = weight;
        }
    });

    // Italic Button CLick Event
    $(document).on('click',".btnItalic",function(){
        if(canvas.getActiveObject()){
            let fontStyle = "normal"
            cData.fontStyle == fontStyle ? fontStyle = "italic" : fontStyle = "normal";
            canvas.getActiveObject().set("fontStyle", fontStyle);
            canvas.renderAll();
            cData.fontStyle = fontStyle;
        }
    });
}

function fontsSubMenuVisibility(){
    fontSliderProperties.fadeToggle(300, "linear");
    return;
}

function updateFont(fontName){
    if(currentSelection == 0) return;
    currentSelection.fontFamily = fontName;
    canvas.add(currentSelection).renderAll();
    fontFamilyProperties.fadeOut();
}

function updateFontSize(){
    inputSlider.oninput = (() => {
        if(currentSelection == 0) return;
        let val = inputSlider.value;
        slideValue.textContent = val 

        currentSelection.fontSize = val;
        canvas.add(currentSelection).renderAll();

    });
}