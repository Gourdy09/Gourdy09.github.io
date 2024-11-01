document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('#nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const hamburger = document.querySelectorAll('.line');
            const menu = document.getElementById('nav-links');
            menu.classList.remove('active'); // Hide the menu
            document.body.style.overflow = ''; // Re-enable scroll

            hamburger.forEach((line) =>{
                if(line.style.backgroundColor === "white"){
                    line.style.backgroundColor = "#171a1a";
                }
                else{
                    line.style.backgroundColor = "white";
                }
                
            });
        });
    });
});

function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.querySelectorAll('.line');
    navLinks.classList.toggle('active'); // Toggle the active class
    hamburger.forEach((line) =>{
        if(line.style.backgroundColor === "white"){
            line.style.backgroundColor = "#171a1a";
        }
        else{
            line.style.backgroundColor = "white";
        }
        
    });
    // Toggle body overflow
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
        document.body.style.overflow = ''; // Re-enable scroll
    }
}