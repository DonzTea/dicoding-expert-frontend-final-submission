const DrawerInitiator = {
  init({ button, drawer }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    window.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('show');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('show');
  },
};

export default DrawerInitiator;
