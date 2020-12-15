const md = window.markdownit(),
      main_content = document.querySelector('.main-content'),
      btns = document.querySelectorAll(".sidebar button");
let git;
btns.forEach(a => {
  a.onclick = () => {
    const b = `https://raw.githubusercontent.com/Natjo/${a.dataset.module}/master/README.md`,
          c = new XMLHttpRequest();
    c.onload = function () {
      main_content.innerHTML = md.render(this.responseText), Prism.highlightAll(), 'object' == typeof git && git.remove(), git = document.createElement('div'), git.innerHTML = `<div class="git"><a href="https://github.com/Natjo/${a.dataset.module}" target="_blank">https://github.com/Natjo/${a.dataset.module}</a></div>`, document.body.appendChild(git);
    }, c.open("get", b, !0), c.send();
  };
});

const _filter = () => {
  if (regex = new RegExp(value, "gi"), isOpen = !1, value.length) {
    markup = "<div>";

    for (let a of datas) regex.test(a) && (isOpen = !0, markup += `<button type="button">${a.replace(regex, '<b>$&</b>')}</button>`);

    result.innerHTML = markup + "</div>", btns = el.querySelectorAll('button');

    for (let a of btns) a.onclick = a => {
      input.value = a.target.innerText, _close();
    };
  }

  holdisOpen != isOpen && (!0 == isOpen ? _open() : _close()), holdisOpen = isOpen;
},
      input = document.querySelector('input[type=search]');

input.oninput = () => {
  var a = input.value;
  btns.forEach(b => {
    const c = new RegExp(a, "gi");

    if (b.classList.add('hide'), a.length) {
      const a = b.dataset.module + b.dataset.tag;
      c.test(a) && b.classList.remove('hide');
    } else b.classList.remove('hide');
  });
};