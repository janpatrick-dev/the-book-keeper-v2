const showDrawer = () => {
  const drawerElement = document.querySelector('.drawer');
  console.log(drawerElement);
  if (drawerElement === null) { return; }
  drawerElement.classList.remove('hide-side');
};

const hideDrawer = () => {
  const drawerElement = document.querySelector('.drawer');
  if (drawerElement === null) { return; }
  drawerElement.classList.add('hide-side');
};

const showAddBookPopup = () => {
  const addBookPopupElement = document.querySelector('.add-book-popup');
  if (addBookPopupElement === null) { return; }
  addBookPopupElement.classList.remove('hide');
}

const hideAddBookPopup = () => {
  const addBookPopupElement = document.querySelector('.add-book-popup');
  if (addBookPopupElement === null) { return; }
  addBookPopupElement.classList.add('hide');
}

export default {
  showDrawer,
  hideDrawer,
  showAddBookPopup,
  hideAddBookPopup
};