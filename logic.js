const closeButtons = document.getElementsByClassName("close");
const sideBar = document.getElementById("sidebar");

const skills = document.getElementById("skills");
const bio = document.getElementById("bio");
const about = document.getElementById("about");

const contents = [skills, bio, about];

const toggleSidebar = () => {
    const currentLeft = sideBar.style.left;
    const width = sideBar.offsetWidth;
    sideBar.style.left = currentLeft < 0 ? 0 : -width;
};

const openSidebar = () => {
    sideBar.style.left = 0;
}

const closeSidebar = () => {
    console.log("close sidebar")
    sideBar.style.left = -sideBar.offsetWidth;
}

const setSidebarContent = (key) => {
    console.log("set sidebar content")
    clearAll();
    switch (key) {
        case 'skills':
            skills.style.display = 'flex';
            break;
        case 'bio':
            bio.style.display = 'flex';
            break;
        case 'about':
            about.style.display = 'flex';
            break;
    }
    openSidebar();
}

const clearAll = () => {
    console.log("clear all")
    contents.forEach(c => c.style.display = 'none');
}


Array.from(closeButtons).forEach(b => b.addEventListener("click", (e) => closeSidebar()));


