// STORE FILES
function saveItem(file, folder, data) {
  let items = JSON.parse(localStorage.getItem("vaultItems")) || [];

  items.push({
    name: file.name,
    type: file.type,
    data: data,
    folder: folder
  });

  localStorage.setItem("vaultItems", JSON.stringify(items));
}


// GET FILES
function getItems() {
  return JSON.parse(localStorage.getItem("vaultItems")) || [];
}


// DELETE FILE
function deleteItem(index) {
  let items = getItems();
  items.splice(index, 1);
  localStorage.setItem("vaultItems", JSON.stringify(items));
}
