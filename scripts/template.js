let templateList = document.getElementById("templateList");
for (item of templateList.children) {
  item.onclick = (e) => {
    console.log(e);
  };
}
