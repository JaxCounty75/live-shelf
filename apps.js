// ===== INIT =====
const fileInput = document.getElementById("fileInput");
const shelf = document.getElementById("shelf");

// auto upload when file picked
fileInput.addEventListener("change", uploadItems);

// load on start
window.onload = displayItems;


// ===== UPLOAD FILES =====
function uploadItems() {
  const files = fileInput.files;
  if (!files.length) return;

  let items = JSON.parse(localStorage.getItem("vaultItems")) || [];

  Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.onload = function(e) {
      const newItem = {
        name: file.name,
        type: file.type,
        data: e.target.result,
        date: Date.now()
      };

      items.push(newItem);
      localStorage.setItem("vaultItems", JSON.stringify(items));

      displayItems();
    };

    reader.readAsDataURL(file);
  });

  fileInput.value = ""; // reset input
}


// ===== DISPLAY FILES =====
function displayItems() {
  shelf.innerHTML = "";

  let items = JSON.parse(localStorage.getItem("vaultItems")) || [];

  items.forEach((item, index) => {
    const box = document.createElement("div");
    box.className = "item";

    let content;

    // image preview
    if (item.type.startsWith("image/")) {
      content = document.createElement("img");
      content.src = item.data;
    } 
    // video preview
    else if (item.type.startsWith("video/")) {
      content = document.createElement("video");
      content.src = item.data;
      content.controls = true;
    } 
    // other files
    else {
      content = document.createElement("div");
      content.innerHTML = `
        <div style="padding:15px;">
          📁 <br>
          <small>${item.name}</small>
        </div>
      `;
    }

    // DELETE BUTTON
    const del = document.createElement("button");
    del.innerText = "×";
    del.className = "delete";

    del.onclick = function () {
      items.splice(index, 1);
      localStorage.setItem("vaultItems", JSON.stringify(items));
      displayItems();
    };

    box.appendChild(content);
    box.appendChild(del);
    shelf.appendChild(box);
  });
}
