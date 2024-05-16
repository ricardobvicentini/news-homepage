'use strict';

const body = document.querySelector('body');
const main = document.querySelector('main');
const btnOpen = document.getElementById('btnOpen');
const btnClose = document.getElementById('btnClose');
const navContent = document.querySelector('.nav__content');
const overlay = document.querySelector('.nav__overlay');
const footer = document.querySelector('footer');
const media = window.matchMedia('(width < 41.68em)');

/*  Inert functions to set and remove focus of hidden elements */
function setInert(el) {
  el.setAttribute('inert', '');
}

function removeInert(el) {
  el.removeAttribute('inert');
}

/*  Initial setup on desktop/mobile */
function setupNav(event) {
  if (event.matches) {
    setInert(navContent);
    /* Delay 'block' to hide animation when reloading */
    setTimeout(() => {
      navContent.style.display = 'block';
      overlay.style.display = 'block';
    }, 500);
  } else {
    removeInert(navContent);
    navContent.style.display = null;
    overlay.style.display = null;
  }
}

setupNav(media);

/* Display change according to viewport (media) */
media.addEventListener('change', (event) => {
  navContent.style.display = event.matches ? 'block' : null;
  overlay.style.display = event.matches ? 'block' : null;
  return event.matches ? setInert(navContent) : removeInert(navContent);
});

function openCloseMenu(e, bool) {
  e.setAttribute('aria-expanded', `${bool}`);
}

btnOpen.onclick = (event) => {
  openCloseMenu(event.target, true);
  openCloseMenu(btnClose, true);
  body.classList.add('noscroll');
  removeInert(navContent);
  setInert(main);
  setInert(footer);
  btnClose.focus();
};

btnClose.onclick = (event) => {
  openCloseMenu(btnOpen, false);
  openCloseMenu(event.target, false);
  body.classList.remove('noscroll');
  setInert(navContent);
  removeInert(main);
  removeInert(footer);
  btnOpen.focus();
};
