"use strict";

const el = document.querySelector('header[role="banner"]');
var scrollY = 0;
var status = 0;
var oldstatus;
var elHeight;

const resize = () => elHeight = el.clientHeight;

const change = () => status === 0 ? el.classList.remove('small') : el.classList.add('small');

const scroll = () => {
  scrollY = window.pageYOffset;
  status = scrollY > elHeight ? 1 : 0;
  oldstatus !== status && change();
  oldstatus = status;
};

window.addEventListener('scroll', scroll, false);
window.addEventListener('resize', resize, false);
resize();
const nav = document.querySelector('nav[role="navigation"]');

const open = () => {
  el.classList.add('open');
  document.body.classList.add('hasPopin');
  nav.classList.add('open');
  nav.classList.remove('close');
};

const close = () => {
  document.body.classList.remove('hasPopin');
  nav.classList.remove('open');
  nav.classList.add('close');
  nav.addEventListener('animationend', () => {
    nav.classList.remove('close');
    el.classList.remove('open');
  }, {
    once: true
  });
};

const btn_nav = document.querySelector('.btn-nav');

btn_nav.onclick = () => {
  btn_nav.classList.toggle('active');
  btn_nav.classList.contains('active') ? open() : close();
};