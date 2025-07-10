const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const clearButton = document.querySelector(".clear-btn");
const imageList = document.querySelector(".image-list");
const form = document.querySelector(".form");

runEventListeners();

function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

async function search(e) {
  e.preventDefault();
  clear();
  let value = searchInput.value.trim();
  if (value === "") return;
  searchInput.value = "";
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
      method: "GET",
      headers: {
        Authorization: "Client-ID -9da016xI09ms1teQbiXpVcTdgxixdnB-GOL0AK3p5g",
      },
    });

    const data = await response.json();
    data.results.forEach((image) => {
      addImageToUI(image.urls.small);
    });
  } catch (error) {
    console.log("Hata oluştu:", error);
  }
}

function addImageToUI(url) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const link = document.createElement("a");

  div.className = "content";
  img.className = "content-img";

  img.setAttribute("src", url);
  img.setAttribute("alt", "image");

  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");

  link.appendChild(img);
  div.appendChild(link);
  imageList.appendChild(div);
}

function clear() {
  Array.from(imageList.children).forEach((content) => {
    content.remove();
  });
}
