"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const Lazyload = () => {
  const imgs = document.querySelectorAll('img');

  if ('loading' in HTMLImageElement.prototype) {
    imgs.forEach(img => {
      img.classList.add('lazy');
      console.log(img.width, img.height);
      const ratio = Number(img.getAttribute('data-ratio'));
      img.style.height = img.width * ratio + "px";

      img.onload = e => {
        img.removeAttribute('style');
        e.target.classList.remove('lazy');
      };
    });
  }
};

var _default = Lazyload;
exports.default = _default;