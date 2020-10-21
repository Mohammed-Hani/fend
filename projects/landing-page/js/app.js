/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const SECTIONS = document.querySelectorAll('section');
const SECTIONS_HEADS = document.querySelectorAll('section h2');
const NAV_BAR_LIST = document.querySelector('#navbar__list');
const ACTIVE_SECTION_CLASS_NAME = 'your-active-class';
const ACTIVE_LINK_CLASS_NAME = 'active';
const NAV_LINK_CLASS_NAME = 'menu__link';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar() {
    const DOC_FRAG = document.createDocumentFragment();
    for (let section of SECTIONS) {
        let newNavItem = document.createElement('li');
        let navLink = document.createElement('a');
        navLink.classList.add(NAV_LINK_CLASS_NAME);
        navLink.innerText = section.dataset.nav;
        newNavItem.appendChild(navLink);

        DOC_FRAG.appendChild(newNavItem);
    }
    NAV_BAR_LIST.appendChild(DOC_FRAG);

}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    const TOP_ARR = [];
    SECTIONS.forEach(function (section) {
        TOP_ARR.push(Math.abs(section.getBoundingClientRect().top));
    });
    const NEAREST_TOP_SECTION_IDX = TOP_ARR.indexOf(Math.min(...TOP_ARR));
    if (TOP_ARR[NEAREST_TOP_SECTION_IDX] < window.innerHeight) {
        const ACTIVE_SECTION = document.getElementById('section' + (NEAREST_TOP_SECTION_IDX + 1));
        if (!ACTIVE_SECTION.classList.contains(ACTIVE_SECTION_CLASS_NAME)) {
            if (document.getElementsByClassName(ACTIVE_SECTION_CLASS_NAME).length > 0) {
                document.querySelector('.' + ACTIVE_SECTION_CLASS_NAME).classList.remove(ACTIVE_SECTION_CLASS_NAME);
                document.querySelector('.' + ACTIVE_LINK_CLASS_NAME).classList.remove(ACTIVE_LINK_CLASS_NAME);
            }
            
            ACTIVE_SECTION.classList.add(ACTIVE_SECTION_CLASS_NAME);
            NAV_BAR_ITEMS[NEAREST_TOP_SECTION_IDX].classList.add(ACTIVE_LINK_CLASS_NAME);
        }
    }
    
    
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(evt) {
    const SECTION_NAV = evt.target.innerText;
    document.getElementById('section' + SECTION_NAV.charAt(SECTION_NAV.length - 1)).scrollIntoView({ 'behavior': 'smooth' });
}

// Add collapsible class to all section headings
function addCollapsibleClass() {
    for (let head of SECTIONS_HEADS) {
        head.classList.add('collapsible');
    }
}

// Add click event listener to all section headings
function addSectionHeadsClickEvent() {
    SECTIONS_HEADS.forEach((head) => head.addEventListener('click', ));
}

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 
buildNavBar();
const NAV_BAR_ITEMS = document.querySelectorAll('.' + NAV_LINK_CLASS_NAME); 

// Scroll to section on link click
NAV_BAR_LIST.addEventListener('click', scrollToSection);

// Set sections as active
document.addEventListener('scroll', setActiveSection);


// Apply collapsible class to all section headings
addCollapsibleClass();
