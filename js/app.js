toggleButton = document.querySelector('#toggle-button')
sidebar = document.querySelector('.sidebar')
closeButton = document.querySelector('#close-button')

toggleButton.addEventListener('click', function(){
    sidebar.classList.toggle('show-sidebar')
})

// closeButton.addEventListener('click', function(){
//     sidebar.classList.remove('show-sidebar')
// })
