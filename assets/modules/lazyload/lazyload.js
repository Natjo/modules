/* eslint-disable */
const Lazyload = () => {
    const imgs = document.querySelectorAll('img');

    if ('loading' in HTMLImageElement.prototype) {
        imgs.forEach(img => {
            img.classList.add('lazy');
            console.log(img.width , img.height);
            const ratio = Number(img.getAttribute('data-ratio'));
            img.style.height = (img.width * ratio) + "px";
            img.onload = (e) => {
                img.removeAttribute('style');
                e.target.classList.remove('lazy');
            }
        });
    }
};

export default Lazyload;