// preorder-widget.js

document.addEventListener("DOMContentLoaded", function () {
  const button = document.createElement("button");
  button.innerText = "Pre-Order Now";
  button.style.backgroundColor = "#000";
  button.style.color = "#fff";
  button.style.padding = "10px 20px";
  button.style.marginTop = "20px";
  button.style.border = "none";
  button.style.cursor = "pointer";

  // Inject below product description
  const productForm = document.querySelector("form[action*='/cart/add']");
  if (productForm) {
    productForm.parentElement.appendChild(button);
  }
});
