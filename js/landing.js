const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('is-open', !open);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    });
  });
}

document.querySelectorAll('[data-work-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const detail = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    if (detail) detail.hidden = open;
  });
});
