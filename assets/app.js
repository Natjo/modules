
const md = window.markdownit();
const main_content = document.querySelector('.main-content');
const btns = document.querySelectorAll(".sidebar button");
let git;

// btns
btns.forEach((btn) => {
    btn.onclick = () => {
        const url = `https://raw.githubusercontent.com/Natjo/${btn.dataset.module}/master/README.md`;
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            main_content.innerHTML = md.render(this.responseText);
            Prism.highlightAll();
            if(typeof git === 'object') git.remove();
            git = document.createElement('div');
           
            git.innerHTML = `<div class="git"><a href="https://github.com/Natjo/${btn.dataset.module}" target="_blank">https://github.com/Natjo/${btn.dataset.module}</a></div>`
            document.body.appendChild(git)
          
        };
        xhr.open("get", url, true);
        xhr.send();
    };
});
const _filter = () => {
    regex = new RegExp(value, "gi");
    isOpen = false;
    
    if(value.length){
        markup = "<div>";

        for(let item of datas) {
             if (regex.test(item)) {
                 isOpen = true;
                 markup += `<button type="button">${item.replace(regex, '<b>$&</b>')}</button>`;
             }
        }

        result.innerHTML = markup + "</div>";

        btns = el.querySelectorAll('button');
        
        for(let btn of btns){
            btn.onclick = e => {
                input.value = e.target.innerText;
                _close();
            }
        }
    }

    if(holdisOpen != isOpen){	
        if(isOpen == true) _open();
        else _close();
    }
    
    holdisOpen = isOpen;
}
//

const input = document.querySelector('input[type=search]');
input.oninput = () => {
    var value = input.value;
    btns.forEach(btn => {
        const regex = new RegExp(value, "gi");
        btn.classList.add('hide');  
        if(value.length){
            const str = btn.dataset.module + btn.dataset.tag;
            regex.test(str) && btn.classList.remove('hide');
        } else{
            btn.classList.remove('hide');
        }
    })
}