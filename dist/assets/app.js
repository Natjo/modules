const md = window.markdownit(),
      main_content = document.querySelector('.main-content'),
      btns = document.querySelectorAll(".sidebar button");
let git;

const active = a => {
  btns.forEach(b => {
    b === a ? b.classList.add('active') : b.classList.remove('active');
  });
};

btns.forEach(a => {
  a.onclick = () => {
    active(a);
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

var _self = "undefined" == typeof window ? "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {} : window,
    Prism = function (b) {
  function a(a, b, c, d) {
    this.type = a, this.content = b, this.alias = c, this.length = 0 | (d || "").length;
  }

  function q(b, c, d, e) {
    b.lastIndex = c;
    var f = b.exec(d);

    if (f && e && f[1]) {
      var a = f[1].length;
      f.index += a, f[0] = f[0].slice(a);
    }

    return f;
  }

  function d() {
    var a = {
      value: null,
      prev: null,
      next: null
    },
        b = {
      value: null,
      prev: a,
      next: null
    };
    a.next = b, this.head = a, this.tail = b, this.length = 0;
  }

  function i(b, c, d) {
    var e = c.next,
        f = {
      value: d,
      prev: c,
      next: e
    };
    return c.next = f, e.prev = f, b.length++, f;
  }

  function s(b, c, d) {
    for (var e = c.next, f = 0; f < d && e !== b.tail; f++) e = e.next;

    (c.next = e).prev = c, b.length -= f;
  }

  function f() {
    v.manual || v.highlightAll();
  }

  var g = /\blang(?:uage)?-([\w-]+)\b/i,
      c = 0,
      v = {
    manual: b.Prism && b.Prism.manual,
    disableWorkerMessageHandler: b.Prism && b.Prism.disableWorkerMessageHandler,
    util: {
      encode: function b(c) {
        return c instanceof a ? new a(c.type, b(c.content), c.alias) : Array.isArray(c) ? c.map(b) : c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      },
      type: function (a) {
        return Object.prototype.toString.call(a).slice(8, -1);
      },
      objId: function (a) {
        return a.__id || Object.defineProperty(a, "__id", {
          value: ++c
        }), a.__id;
      },
      clone: function b(c, d) {
        var f, e;

        switch (d = d || {}, v.util.type(c)) {
          case "Object":
            if (e = v.util.objId(c), d[e]) return d[e];

            for (var g in f = {}, d[e] = f, c) c.hasOwnProperty(g) && (f[g] = b(c[g], d));

            return f;

          case "Array":
            return e = v.util.objId(c), d[e] ? d[e] : (f = [], d[e] = f, c.forEach(function (a, c) {
              f[c] = b(a, d);
            }), f);

          default:
            return c;
        }
      },
      getLanguage: function (a) {
        for (; a && !g.test(a.className);) a = a.parentElement;

        return a ? (a.className.match(g) || [, "none"])[1].toLowerCase() : "none";
      },
      currentScript: function () {
        if ("undefined" == typeof document) return null;
        if ("currentScript" in document) return document.currentScript;

        try {
          throw new Error();
        } catch (d) {
          var a = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(d.stack) || [])[1];

          if (a) {
            var b = document.getElementsByTagName("script");

            for (var c in b) if (b[c].src == a) return b[c];
          }

          return null;
        }
      },
      isActive: function (b, c, d) {
        for (var f; b;) {
          if (f = b.classList, f.contains(c)) return !0;
          if (f.contains("no-" + c)) return !1;
          b = b.parentElement;
        }

        return !!d;
      }
    },
    languages: {
      extend: function (a, b) {
        var c = v.util.clone(v.languages[a]);

        for (var d in b) c[d] = b[d];

        return c;
      },
      insertBefore: function (b, c, d, e) {
        var f = (e = e || v.languages)[b],
            a = {};

        for (var g in f) if (f.hasOwnProperty(g)) {
          if (g == c) for (var h in d) d.hasOwnProperty(h) && (a[h] = d[h]);
          d.hasOwnProperty(g) || (a[g] = f[g]);
        }

        var i = e[b];
        return e[b] = a, v.languages.DFS(v.languages, function (c, d) {
          d === i && c != b && (this[c] = a);
        }), a;
      },
      DFS: function b(c, d, e, f) {
        f = f || {};
        var g = v.util.objId;

        for (var h in c) if (c.hasOwnProperty(h)) {
          d.call(c, h, c[h], e || h);
          var i = c[h],
              j = v.util.type(i);
          "Object" !== j || f[g(i)] ? "Array" !== j || f[g(i)] || (f[g(i)] = !0, b(i, d, h, f)) : (f[g(i)] = !0, b(i, d, null, f));
        }
      }
    },
    plugins: {},
    highlightAll: function (a, b) {
      v.highlightAllUnder(document, a, b);
    },
    highlightAllUnder: function (b, c, d) {
      var e = {
        callback: d,
        container: b,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      v.hooks.run("before-highlightall", e), e.elements = Array.prototype.slice.apply(e.container.querySelectorAll(e.selector)), v.hooks.run("before-all-elements-highlight", e);

      for (var f, g = 0; f = e.elements[g++];) v.highlightElement(f, !0 === c, e.callback);
    },
    highlightElement: function (c, d, f) {
      function h(a) {
        i.highlightedCode = a, v.hooks.run("before-insert", i), i.element.innerHTML = i.highlightedCode, v.hooks.run("after-highlight", i), v.hooks.run("complete", i), f && f.call(i.element);
      }

      var e = v.util.getLanguage(c),
          j = v.languages[e];
      c.className = c.className.replace(g, "").replace(/\s+/g, " ") + " language-" + e;
      var a = c.parentElement;
      a && "pre" === a.nodeName.toLowerCase() && (a.className = a.className.replace(g, "").replace(/\s+/g, " ") + " language-" + e);
      var i = {
        element: c,
        language: e,
        grammar: j,
        code: c.textContent
      };
      if (v.hooks.run("before-sanity-check", i), !i.code) return v.hooks.run("complete", i), void (f && f.call(i.element));
      if (v.hooks.run("before-highlight", i), !i.grammar) h(v.util.encode(i.code));else if (d && b.Worker) {
        var k = new Worker(v.filename);
        k.onmessage = function (a) {
          h(a.data);
        }, k.postMessage(JSON.stringify({
          language: i.language,
          code: i.code,
          immediateClose: !0
        }));
      } else h(v.highlight(i.code, i.grammar, i.language));
    },
    highlight: function (b, c, d) {
      var e = {
        code: b,
        grammar: c,
        language: d
      };
      return v.hooks.run("before-tokenize", e), e.tokens = v.tokenize(e.code, e.grammar), v.hooks.run("after-tokenize", e), a.stringify(v.util.encode(e.tokens), e.language);
    },
    tokenize: function (b, c) {
      var e = c.rest;

      if (e) {
        for (var f in e) c[f] = e[f];

        delete c.rest;
      }

      var g = new d();
      return i(g, g.head, b), function z(e, n, t, r, B, D) {
        for (var l in t) if (t.hasOwnProperty(l) && t[l]) {
          var o = t[l];
          o = Array.isArray(o) ? o : [o];

          for (var F = 0; F < o.length; ++F) {
            if (D && D.cause == l + "," + F) return;
            var G = o[F],
                c = G.inside,
                g = !!G.lookbehind,
                f = !!G.greedy,
                h = G.alias;

            if (f && !G.pattern.global) {
              var d = G.pattern.toString().match(/[imsuy]*$/)[0];
              G.pattern = RegExp(G.pattern.source, d + "g");
            }

            for (var H, I = G.pattern || G, p = r.next, J = B; p !== n.tail && !(D && J >= D.reach); J += p.value.length, p = p.next) {
              if (H = p.value, n.length > e.length) return;

              if (!(H instanceof a)) {
                var K,
                    M = 1;

                if (f) {
                  if (!(K = q(I, J, e, g))) break;
                  var Q = K.index,
                      R = K.index + K[0].length,
                      A = J;

                  for (A += p.value.length; A <= Q;) p = p.next, A += p.value.length;

                  if (A -= p.value.length, J = A, p.value instanceof a) continue;

                  for (var T = p; T !== n.tail && (A < R || "string" == typeof T.value); T = T.next) M++, A += T.value.length;

                  M--, H = e.slice(J, A), K.index -= J;
                } else if (!(K = q(I, 0, H, g))) continue;

                var Q = K.index,
                    U = K[0],
                    E = H.slice(0, Q),
                    O = H.slice(Q + U.length),
                    L = J + H.length;
                D && L > D.reach && (D.reach = L);
                var N = p.prev;
                E && (N = i(n, N, E), J += E.length), s(n, N, M);
                var V = new a(l, c ? v.tokenize(U, c) : U, h, U);
                p = i(n, N, V), O && i(n, p, O), 1 < M && z(e, n, t, p.prev, J, {
                  cause: l + "," + F,
                  reach: L
                });
              }
            }
          }
        }
      }(b, g, c, g.head, 0), function (a) {
        for (var b = [], c = a.head.next; c !== a.tail;) b.push(c.value), c = c.next;

        return b;
      }(g);
    },
    hooks: {
      all: {},
      add: function (a, b) {
        var c = v.hooks.all;
        c[a] = c[a] || [], c[a].push(b);
      },
      run: function (b, c) {
        var d = v.hooks.all[b];
        if (d && d.length) for (var e, f = 0; e = d[f++];) e(c);
      }
    },
    Token: a
  };
  if (b.Prism = v, a.stringify = function b(c, d) {
    if ("string" == typeof c) return c;

    if (Array.isArray(c)) {
      var f = "";
      return c.forEach(function (a) {
        f += b(a, d);
      }), f;
    }

    var e = {
      type: c.type,
      content: b(c.content, d),
      tag: "span",
      classes: ["token", c.type],
      attributes: {},
      language: d
    },
        a = c.alias;
    a && (Array.isArray(a) ? Array.prototype.push.apply(e.classes, a) : e.classes.push(a)), v.hooks.run("wrap", e);
    var g = "";

    for (var h in e.attributes) g += " " + h + '="' + (e.attributes[h] || "").replace(/"/g, "&quot;") + '"';

    return "<" + e.tag + ' class="' + e.classes.join(" ") + '"' + g + ">" + e.content + "</" + e.tag + ">";
  }, !b.document) return b.addEventListener && (v.disableWorkerMessageHandler || b.addEventListener("message", function (c) {
    var d = JSON.parse(c.data),
        e = d.language,
        f = d.code,
        g = d.immediateClose;
    b.postMessage(v.highlight(f, v.languages[e], e)), g && b.close();
  }, !1)), v;
  var h = v.util.currentScript();

  if (h && (v.filename = h.src, h.hasAttribute("data-manual") && (v.manual = !0)), !v.manual) {
    var e = document.readyState;
    "loading" === e || "interactive" === e && h && h.defer ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16);
  }

  return v;
}(_self);

"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null
      },
      string: {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: !0
      },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/
    }
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{
            pattern: /^=/,
            alias: "attr-equals"
          }, /"|'/]
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: [{
    pattern: /&[\da-z]{1,8};/i,
    alias: "named-entity"
  }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function (b) {
  "entity" === b.type && (b.attributes.title = b.content.replace(/&amp;/, "&"));
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  value: function (b, a) {
    var c = {};
    c["language-" + a] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: !0,
      inside: Prism.languages[a]
    }, c.cdata = /^<!\[CDATA\[|\]\]>$/i;
    var d = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: c
      }
    };
    d["language-" + a] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[a]
    };
    var e = {};
    e[b] = {
      pattern: RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
        return b;
      }), "i"),
      lookbehind: !0,
      greedy: !0,
      inside: d
    }, Prism.languages.insertBefore("markup", "cdata", e);
  }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml, !function (a) {
  var b = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  a.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: "selector"
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0
        }
      }
    },
    url: {
      pattern: RegExp("\\burl\\((?:" + b.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp("^" + b.source + "$"),
          alias: "url"
        }
      }
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + b.source + ")*?(?=\\s*\\{)"),
    string: {
      pattern: b,
      greedy: !0
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/
  }, a.languages.css.atrule.inside.rest = a.languages.css;
  var c = a.languages.markup;
  c && (c.tag.addInlined("style", "css"), a.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
      pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
      lookbehind: !0,
      inside: {
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            style: {
              pattern: /(["'])[\s\S]+(?=["']$)/,
              lookbehind: !0,
              alias: "language-css",
              inside: a.languages.css
            },
            punctuation: [{
              pattern: /^=/,
              alias: "attr-equals"
            }, /"|'/]
          }
        },
        "attr-name": /^style/i
      }
    }
  }, c.tag));
}(Prism), Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
}, Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [Prism.languages.clike["class-name"], {
    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
    lookbehind: !0
  }],
  keyword: [{
    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
    lookbehind: !0
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: !0
  }],
  function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
    lookbehind: !0,
    greedy: !0,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: !0,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-flags": /[a-z]+$/,
      "regex-delimiter": /^\/|\/$/
    }
  },
  "function-variable": {
    pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: "function"
  },
  parameter: [{
    pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
    greedy: !0,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      interpolation: {
        pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
        lookbehind: !0,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\${|}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  }
}), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript, !function (b) {
  function h(a, b) {
    return "___" + a.toUpperCase() + b + "___";
  }

  Object.defineProperties(b.languages["markup-templating"] = {}, {
    buildPlaceholders: {
      value: function (d, a, f, g) {
        if (d.language === a) {
          var i = d.tokenStack = [];
          d.code = d.code.replace(f, function (b) {
            if ("function" == typeof g && !g(b)) return b;

            for (var c, e = i.length; -1 !== d.code.indexOf(c = h(a, e));) ++e;

            return i[e] = b, c;
          }), d.grammar = b.languages.markup;
        }
      }
    },
    tokenizePlaceholders: {
      value: function (j, p) {
        if (j.language === p && j.tokenStack) {
          j.grammar = b.languages[p];
          var k = 0,
              q = Object.keys(j.tokenStack);
          !function d(e) {
            for (var m, n = 0; n < e.length && !(k >= q.length); n++) if (m = e[n], "string" == typeof m || m.content && "string" == typeof m.content) {
              var v = q[k],
                  r = j.tokenStack[v],
                  o = "string" == typeof m ? m : m.content,
                  c = h(p, v),
                  i = o.indexOf(c);

              if (-1 < i) {
                ++k;
                var u = o.substring(0, i),
                    g = new b.Token(p, b.tokenize(r, j.grammar), "language-" + p, r),
                    l = o.substring(i + c.length),
                    s = [];
                u && s.push.apply(s, d([u])), s.push(g), l && s.push.apply(s, d([l])), "string" == typeof m ? e.splice.apply(e, [n, 1].concat(s)) : m.content = s;
              }
            } else m.content && d(m.content);

            return e;
          }(j.tokens);
        }
      }
    }
  });
}(Prism), !function (b) {
  var a = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
      c = [{
    pattern: /\b(?:false|true)\b/i,
    alias: "boolean"
  }, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/, /\b(?:null)\b/i],
      d = /\b0b[01]+\b|\b0x[\da-f]+\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      e = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
      f = /[{}\[\](),:;]/;
  b.languages.php = {
    delimiter: {
      pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
      alias: "important"
    },
    comment: a,
    variable: /\$+(?:\w+\b|(?={))/i,
    package: {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    },
    keyword: [{
      pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
      alias: "type-casting",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
      alias: "type-hint",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
      alias: "type-hint",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /(\)\s*:\s*\??\s*)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
      alias: "return-type",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /(\)\s*:\s*\??\s*[a-z0-9_|]\|\s*)(?:null|false)\b/i,
      alias: "return-type",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
      alias: "type-declaration",
      greedy: !0
    }, {
      pattern: /(\|\s*)(?:null|false)\b/i,
      alias: "type-declaration",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /\b(?:parent|self|static)(?=\s*::)/i,
      alias: "static-context",
      greedy: !0
    }, /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i],
    "argument-name": /\b[a-z_]\w*(?=\s*:(?!:))/i,
    "class-name": [{
      pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
      greedy: !0
    }, {
      pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
      alias: "class-name-fully-qualified",
      greedy: !0,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    }, {
      pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
      alias: "class-name-fully-qualified",
      greedy: !0,
      inside: {
        punctuation: /\\/
      }
    }, {
      pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      alias: "class-name-fully-qualified",
      greedy: !0,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    }, {
      pattern: /\b[a-z_]\w*(?=\s*\$)/i,
      alias: "type-declaration",
      greedy: !0
    }, {
      pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
      alias: ["class-name-fully-qualified", "type-declaration"],
      greedy: !0,
      inside: {
        punctuation: /\\/
      }
    }, {
      pattern: /\b[a-z_]\w*(?=\s*::)/i,
      alias: "static-context",
      greedy: !0
    }, {
      pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
      alias: ["class-name-fully-qualified", "static-context"],
      greedy: !0,
      inside: {
        punctuation: /\\/
      }
    }, {
      pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
      alias: "type-hint",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
      alias: ["class-name-fully-qualified", "type-hint"],
      greedy: !0,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    }, {
      pattern: /(\)\s*:\s*\??\s*)\b[a-z_]\w*(?!\\)\b/i,
      alias: "return-type",
      greedy: !0,
      lookbehind: !0
    }, {
      pattern: /(\)\s*:\s*\??\s*)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      alias: ["class-name-fully-qualified", "return-type"],
      greedy: !0,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    }],
    constant: c,
    function: /\w+\s*(?=\()/,
    property: {
      pattern: /(->)[\w]+/,
      lookbehind: !0
    },
    number: d,
    operator: e,
    punctuation: f
  };
  var g = {
    pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
    lookbehind: !0,
    inside: b.languages.php
  },
      h = [{
    pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
    alias: "nowdoc-string",
    greedy: !0,
    inside: {
      delimiter: {
        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
        alias: "symbol",
        inside: {
          punctuation: /^<<<'?|[';]$/
        }
      }
    }
  }, {
    pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
    alias: "heredoc-string",
    greedy: !0,
    inside: {
      delimiter: {
        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
        alias: "symbol",
        inside: {
          punctuation: /^<<<"?|[";]$/
        }
      },
      interpolation: g
    }
  }, {
    pattern: /`(?:\\[\s\S]|[^\\`])*`/,
    alias: "backtick-quoted-string",
    greedy: !0
  }, {
    pattern: /'(?:\\[\s\S]|[^\\'])*'/,
    alias: "single-quoted-string",
    greedy: !0
  }, {
    pattern: /"(?:\\[\s\S]|[^\\"])*"/,
    alias: "double-quoted-string",
    greedy: !0,
    inside: {
      interpolation: g
    }
  }];
  b.languages.insertBefore("php", "variable", {
    string: h
  }), b.languages.insertBefore("php", "variable", {
    attribute: {
      pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
      greedy: !0,
      inside: {
        "attribute-content": {
          pattern: /^(#\[)[\s\S]+(?=]$)/,
          lookbehind: !0,
          inside: {
            comment: a,
            string: h,
            "attribute-class-name": [{
              pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
              alias: "class-name",
              greedy: !0,
              lookbehind: !0
            }, {
              pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
              alias: ["class-name", "class-name-fully-qualified"],
              greedy: !0,
              lookbehind: !0,
              inside: {
                punctuation: /\\/
              }
            }],
            constant: c,
            number: d,
            operator: e,
            punctuation: f
          }
        },
        delimiter: {
          pattern: /^#\[|]$/,
          alias: "punctuation"
        }
      }
    }
  }), b.hooks.add("before-tokenize", function (a) {
    /<\?/.test(a.code) && b.languages["markup-templating"].buildPlaceholders(a, "php", /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi);
  }), b.hooks.add("after-tokenize", function (a) {
    b.languages["markup-templating"].tokenizePlaceholders(a, "php");
  });
}(Prism);