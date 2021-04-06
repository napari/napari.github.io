function handleMenuClick(e) {
  // eslint-disable-next-line no-console
  console.log('Clicked on menu button:', e);
}

function main() {
  document.body.parentNode.classList.remove('no-js');

  const menuButton = document.querySelector('.app-bar__menu-button');
  menuButton.addEventListener('click', handleMenuClick);
}

document.addEventListener('DOMContentLoaded', main);
