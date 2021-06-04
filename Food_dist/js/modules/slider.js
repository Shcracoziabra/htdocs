function slider() {
    const   slider = document.querySelector('.offer__slider'), 
            counter = slider.querySelector('.offer__slider-counter'),
            prev = counter.querySelector('.offer__slider-prev'),
            next = counter.querySelector('.offer__slider-next'),
            current = counter.querySelector('#current'),
            total = counter.querySelector('#total'),
            wrapper = slider.querySelector('.offer__slider-wrapper'),
            slides = slider.querySelectorAll('.offer__slide'),
            inner = slider.querySelector('.offer__slider-inner');

    let slideIndex = 1;
    let offset = 0; // first slide's of a carousel offset
    
    const width = window.getComputedStyle(wrapper).width; // width of a slider

    // Make equal width for every slide
    slides.forEach(slide => {
        slide.style.width = width;
    }); 

    function onlyDigits(str){
        return +str.replace(/\D/g, '');
    }

    // all slides in a row
    inner.style.display = 'flex';
    inner.style.width = `${onlyDigits(width)* slides.length}px`;
    wrapper.style.overflow = 'hidden'; // hides all slides except one in a slide window

    // Shows slides in a row, depends on offset
    function showSlides(){
        offset = (slideIndex - 1) * onlyDigits(width);
        inner.style.transform = `translateX(-${offset}px)`;
        inner.style.transition = '0.5s all';
    }

    // Shows total number of slides, adds zero if less then 10
    function totalSlideNum(){
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }
    }

    // Shows current slide's number, adds zero if less then 10
    function currentSlideNum(){
        if (slideIndex < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    function correctSlideInd(){
        if(slideIndex < 1){
            slideIndex = slides.length;
        }
        if(slideIndex > slides.length){
            slideIndex = 1;
        }
    }
    totalSlideNum();
    currentSlideNum();
    showSlides();

    // Shows current slide, first slide by default
    function switchSlide(n) {
        slideIndex += n;
        correctSlideInd();
        showSlides();
        totalSlideNum();
        currentSlideNum();
        activIndicator();
    }

    prev.addEventListener('click', ()=> switchSlide(-1));
    next.addEventListener('click', () => switchSlide(1));

    // makes field of slide indicators
    slider.style.position = 'relative';
    const indicators = document.createElement('ul');
    indicators.style.display = 'flex';
    
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    let dots = []; // Array for indicators items

    function activIndicator() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    }
    
    // Makes indicator items, gives each interactivity
    slides.forEach((slide, index) => {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-index', index + 1);
        dots.push(dot);
        indicators.append(dot); // adds item to indicators

        // first idicator item has opacity: 1 by default
        if (index == 0) {
            dot.style.opacity = '1';
        } 
    });
    // makes each indicator item interactive
    dots.forEach(dot => {
        dot.addEventListener('click',(e) => {
            slideIndex = +e.target.getAttribute('data-index');
            correctSlideInd();
            showSlides();
            totalSlideNum();
            currentSlideNum();
            activIndicator();
        });
    });

}

module.exports = slider;