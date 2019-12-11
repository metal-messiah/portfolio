const closeButtons = document.querySelectorAll('.close');
const sideBar = document.querySelector('#sidebar');
const tabs = document.querySelectorAll('.tab');
const sidebarContents = document.querySelectorAll('.sidebar-contents');

const toggleSidebar = () => {
  const currentLeft = sideBar.style.left;
  const width = sideBar.offsetWidth;
  sideBar.style.left = currentLeft < 0 ? 0 : -width;
};

const openSidebar = () => {
  sideBar.style.left = 0;
  Array.from(closeButtons).forEach(b => {
    b.style.display = 'flex';
  });
};

const closeSidebar = () => {
  console.log('close sidebar');
  sideBar.style.left = -sideBar.offsetWidth;

  Array.from(closeButtons).forEach(b => {
    b.style.display = 'none';
  });

  setTabActive(null);
};

const setSidebarContent = key => {
  let elem = document.querySelector(`#${key}`);
  clearAll();
  elem.style.display = 'flex';
  setTabActive(key);
  openSidebar();
};

const clearAll = () => {
  console.log('clear all');
  Array.from(sidebarContents).forEach(c => {
    c.style.display = 'none';
  });
};

const setTabActive = tag => {
  Array.from(tabs).forEach(tab => {
    if (tab.dataset.tag === tag) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
};

Array.from(closeButtons).forEach(b => {
  b.addEventListener('click', e => closeSidebar());
  b.addEventListener('touchstart', () => closeSidebar());
});

Array.from(tabs).forEach(tab => {
  tab.addEventListener('click', () => setSidebarContent(tab.dataset.tag));
  tab.addEventListener('touchstart', () => setSidebarContent(tab.dataset.tag));
});

window.onload = () => {
  if (window.innerWidth >= 1400) {
    setSidebarContent('bio');
  }
};
