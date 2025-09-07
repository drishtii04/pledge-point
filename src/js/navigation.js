function initializeNavigation() {
    const nav = document.getElementById('main-nav');
    nav.innerHTML = `
        <div class="container">
            <div class="nav-content">
                <a href="/" class="nav-logo">Hope Foundation</a>
                <button class="mobile-menu-button" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#impact">Impact</a></li>
                    <li><a href="#events">Events</a></li>
                    <li><a href="#volunteer">Volunteer</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#donate" class="donate-button">Donate</a></li>
                </ul>
            </div>
        </div>
    `;

    // Mobile menu functionality
    const mobileMenuButton = nav.querySelector('.mobile-menu-button');
    const navLinks = nav.querySelector('.nav-links');

    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenuButton.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileMenuButton.classList.remove('active');
        }
    });
}
