let templateMenu = document.getElementById("templateMenu");
let templateList = document.getElementById("templateList");
let templateRoot = document.getElementById("templateChooserRoot");
let closeTemplate = document.getElementById("closeTemplate");

closeTemplate.onclick = () => {
  templateRoot.style.display = "none";
};

document.getElementById("templateChooserRoot").style.display = "none";

templateMenu.onclick = () => {
  document.getElementById("templateChooserRoot").style.display = "block";
};

for (item of templateList.children) {
  let imageWidth = item.naturalWidth;
  let imageHeight = item.naturalHeight;

  item.onclick = (e) => {
    calculateCanvas(imageWidth, imageHeight);
    templateRoot.style.display = "none";
    template.src = e.target.src;
    canvas.setBackgroundImage(template.src, canvas.renderAll.bind(canvas), {
      scaleX: canvas.width / imageWidth,
      scaleY: canvas.height / imageHeight,
    });
    canvas.remove(...canvas._objects);
    canvas.renderAll();
  };
}
