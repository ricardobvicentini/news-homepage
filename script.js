'use strict';

const body = document.querySelector('body');
const btnOpen = document.getElementById('btnOpen');
const btnClose = document.getElementById('btnClose');
const navContent = document.querySelector('.nav__content');
const overlay = document.querySelector('.nav__overlay');
const media = window.matchMedia('(width < 69.37em)');

/*  Inert functions to set and remove focus of hidden elements */
function setInert() {
  navContent.setAttribute('inert', '');
}

function removeInert() {
  navContent.removeAttribute('inert');
}

/*  Initial setup on desktop/mobile */
function setupNav(event) {
  if (event.matches) {
    setInert();
    /* Delay 'block' to hide animation when reloading */
    setTimeout(() => {
      navContent.style.display = 'block';
      overlay.style.display = 'block';
    }, 500);
  } else {
    removeInert();
    navContent.style.display = null;
    overlay.style.display = null;
  }
}

setupNav(media);

/* Display change according to viewport (media) */
media.addEventListener('change', (event) => {
  navContent.style.display = event.matches ? 'block' : null;
  overlay.style.display = event.matches ? 'block' : null;
  /* if (event.matches) {
    setInert();
  } else {
    removeInert();
  } */
  return event.matches ? setInert() : removeInert();
});

function openCloseMenu(e, bool) {
  e.setAttribute('aria-expanded', `${bool}`);
}

btnOpen.onclick = (event) => {
  openCloseMenu(event.target, true);
  openCloseMenu(btnClose, true);
  body.classList.add('noscroll');
  removeInert();
};

btnClose.onclick = (event) => {
  openCloseMenu(btnOpen, false);
  openCloseMenu(event.target, false);
  body.classList.remove('noscroll');
  setInert();
};
