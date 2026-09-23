"use strict";

// 仅添加无法通过 HTML 和 CSS 清晰实现的交互行为。

const lightbox = document.querySelector("#publication-lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector(".image-lightbox-image");
  const counter = lightbox.querySelector(".image-lightbox-counter");
  const closeButton = lightbox.querySelector(".image-lightbox-close");
  const previousButton = lightbox.querySelector(".image-lightbox-previous");
  const nextButton = lightbox.querySelector(".image-lightbox-next");
  const imageButtons = document.querySelectorAll(".publication-image-button");
  let currentImageIndex = 0;

  // 根据序号更新原图、替代文字和当前位置。
  const showImage = (index) => {
    currentImageIndex =
      (index + imageButtons.length) % imageButtons.length;

    const currentButton = imageButtons[currentImageIndex];
    const thumbnail = currentButton.querySelector("img");

    lightboxImage.src = currentButton.dataset.lightboxSrc;
    lightboxImage.alt = thumbnail.alt;
    counter.textContent = `${currentImageIndex + 1} of ${imageButtons.length}`;
  };

  // 点击论文缩略图时，在全屏查看器中显示对应原图。
  imageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showImage(index);
      lightbox.showModal();
    });
  });

  const hasMultipleImages = imageButtons.length > 1;
  previousButton.disabled = !hasMultipleImages;
  nextButton.disabled = !hasMultipleImages;

  previousButton.addEventListener("click", () => {
    showImage(currentImageIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showImage(currentImageIndex + 1);
  });

  closeButton.addEventListener("click", () => {
    lightbox.close();
  });

  // 点击图库以外的空白区域时关闭查看器。
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  // 使用键盘方向键切换上一张或下一张图片。
  lightbox.addEventListener("keydown", (event) => {
    if (!hasMultipleImages) return;

    if (event.key === "ArrowLeft") {
      showImage(currentImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentImageIndex + 1);
    }
  });

  // 关闭后清除图片地址，避免继续占用不必要的资源。
  lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
  });
}
