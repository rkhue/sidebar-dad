const toggleButton = document.querySelector('.toggle-button');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const contentArea = document.querySelector('.content-area');
const navItems = document.querySelectorAll('.nav-item');
const pageContents = document.querySelectorAll('.page-content');


function toggleSidebar() {
    sidebar.classList.toggle('show-sidebar');
    overlay.classList.toggle('active');
    contentArea.classList.toggle('sidebar-open');
}

function closeSidebar() {
    sidebar.classList.remove('show-sidebar');
    overlay.classList.remove('active');
    contentArea.classList.remove('sidebar-open');
}

toggleButton.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);