// Loading Image On Canvas
let imageBrowse = $("#imgLoader");
imageBrowse.change((e) => {
  var reader = new FileReader();
  reader.onload = function (event) {
    var imgObj = new Image();
    imgObj.src = event.target.result;
    imgObj.onload = function () {
      // start fabricJS stuff

      var image = new fabric.Image(imgObj);
      image.set({
        left: 250,
        top: 250,
        padding: 10,
        cornersize: 10,
      });
      image.scale(0.25).setCoords();
      canvas.add(image);

      // end fabricJS stuff
    };
  };
  reader.readAsDataURL(e.target.files[0]);
});
