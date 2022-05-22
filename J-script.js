const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0] //FIRST ELEMENT IN ARRAY

toggleButton.addEventListener('click', () => { //WHENEVER THIS ELEMENT IS CLICKED IT RUNS FUNCTION THAT SHOWS NAVBAR
    navbarLinks.classList.toggle('active') //ACCESS NAVBAR LINKS AND TOGGLES ALL CLASS IN LISTS
})

