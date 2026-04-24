// AUTO upload when file selected
document.getElementById("fileInput").addEventListener("change", uploadItem);

function uploadItem() {
  const fileInput = document.getElementById("fileInput");

  if (!fileInput.files.length) return;

  const files = Array.from(fileInput.files);

  let items = JSON.parse(localStorage.getItem("shelfItems")) || [];

  files.forEach(file => {
    const reader = new FileReader();

    reader.onload = function(e) {
      const data = e.target.result;
      items.push(data);
      localStorage.setItem("shelfItems", JSON.stringify(items));
      displayItems();
    };

    reader.readAsDataURL(file);
  });

  fileInput.value = ""; // reset so same file can be picked again
}

function displayItems() {
  const shelf = document.getElementById("shelf");
  shelf.innerHTML = "";

  let items = JSON.parse(localStorage.getItem("shelfItems")) || [];

  items.forEach((data, index) => {
    const item = document.createElement("div");
    item.className = "item";

    const img = document.createElement("img");
    img.src = data;

    // tap = fullscreen
    img.onclick = () => {
      document.getElementById("viewer").style.display = "flex";
      document.getElementById("viewerImg").src = data;
    };

    const del = document.createElement("button");
    del.innerText = "X";
    del.className = "delete";

    del.onclick = function () {
      items.splice(index, 1);
      localStorage.setItem("shelfItems", JSON.stringify(items));
      displayItems();
    };

    item.appendChild(img);
    item.appendChild(del);
    shelf.appendChild(item);
  });
}

// load saved images
window.onload = function () {
  displayItems();
};

// close viewer
document.getElementById("viewer").onclick = function () {
  this.style.display = "none";
};
