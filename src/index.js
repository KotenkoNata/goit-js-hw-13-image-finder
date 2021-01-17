import "./styles.css";
import fetchObject from "./js/apiService";
import galleryRefs from "./js/refs";
import renderTemplate from "./templates/item.hbs";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/src/styles/main.scss";
import { hidePreloader, showPreloader } from "./js/preloader";

const { form, gallery } = galleryRefs;

function getLastGalleryImage() {
  return document.querySelector(`.photo-item:last-child`);
}

function loadNewImagesPage() {
  showPreloader();
  fetchObject.getFetch().then((hits) => {
    const items = renderTemplate(hits);
    appendItems(items);
    scrollToFirstImgOnPage();
    bindIntersectionObserver();
    hidePreloader();
  });
}

function createIntersectionObserver() {
  const options = {
    //rootMargin: "100px",
    threshold: [0.75],
  };

  const onEntry = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        loadNewImagesPage();
      }
    });
  };

  return new IntersectionObserver(onEntry, options);
}

function bindIntersectionObserver() {
  let lastGalleryImage = getLastGalleryImage();
  let io = createIntersectionObserver();
  io.observe(lastGalleryImage);
}

function scrollToFirstImgOnPage() {
  setTimeout(function () {
    let selector = `[page='${fetchObject.page}'].photo-item`;
    let el = document.querySelectorAll(selector)[0];
    el.scrollIntoView({
      behavior: "smooth",
    });
  }, 50);
}

function appendItems(items) {
  if (fetchObject.page === 1) {
    gallery.innerHTML = "";
  }
  gallery.insertAdjacentHTML("beforeend", items);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target.elements.query.value;

  showPreloader();
  fetchObject.getFetch(query).then((hits) => {
    const items = renderTemplate(hits);
    appendItems(items);
    scrollToFirstImgOnPage();
    bindIntersectionObserver();
    hidePreloader();
  });
});

const handleImageClick = function (event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const img = event.target;
  const instance = basicLightbox.create(
    `<img src="${img.dataset.source}" width="800" height="600">`
  );

  instance.show();
};

gallery.addEventListener("click", handleImageClick);
