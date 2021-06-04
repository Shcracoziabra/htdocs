/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex','female' );
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);  
            } 
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); 

    function calcTotal() {
        if (!sex || !height || !weight  || !age || !ratio ) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
        } else {
            result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
        }

    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => elem.addEventListener('click', (e)=> {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
             sex = e.target.getAttribute('id');
             localStorage.setItem('sex', sex);
            }
            elements.forEach(elem => elem.classList.remove(activeClass));
            e.target.classList.add(activeClass);
            calcTotal();
        }));


        

        
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px inset red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });


    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class Card { 
        constructor (src, alt, menuName, menuText, price, parent, ...classes) {

            this.src = src;
            this.alt = alt;
            this.menuName = menuName;
            this.menuText = menuText;
            this.price = price;
            this.parent = parent;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            
            const container = document.querySelector(this.parent);
            const item = document.createElement('div');
            if(this.classes.length === 0) {
                item.classList.add('menu__item');
            }else {
                this.classes.forEach(className => item.classList.add(className));
            }
            const img = document.createElement('img');
            const title = document.createElement('h3');
            const descr = document.createElement('div');
            const divider = document.createElement('div');
            const priceDiv = document.createElement('div');
            const cost = document.createElement('div');
            const total = document.createElement('div');
            const span = document.createElement('span');


            img.setAttribute('src', this.src);
            img.setAttribute('alt', this.alt);
            title.classList.add('menu__item-subtitle');
            descr.classList.add('menu__item-descr');
            divider.classList.add('menu__item-divider');
            priceDiv.classList.add('menu__item-price');
            cost.classList.add('menu__item-cost');
            total.classList.add('menu__item-total');

            title.innerHTML = `Меню "${this.menuName}"`;
            descr.innerHTML = this.menuText;
            cost.innerHTML = 'Цена:';
            span.innerHTML = this.price;        
            
            container.append(item);
            item.append(img, title, descr, divider, priceDiv);
            priceDiv.append(cost, total);
            total.append(span, 'грн/день');
        }
    }

    const getResource = async (url, data) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Card(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: data
        });
        return await res.json();
    };
    
    function bindPostData(form){
        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
        
            form.insertAdjacentElement('afterend', statusMessage);

            /* const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); */

            //request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

/*             const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });  */
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

/*             request.addEventListener('load', ()=>{
                if(request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            }); */
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class= 'modal__content'>
            <div class='modal__close' data-close>&times;</div>
            <div class='modal__title'>${message}</div>
        </div>`;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=> {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const buttons = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');  
        document.body.style.overflow = 'hidden'; 
        clearInterval(modalTimerId);
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');  
        document.body.style.overflow = ''; 
    }


    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close')== '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(); 
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        let endOfPage = Math.round(window.pageYOffset + document.documentElement.clientHeight);
        if (endOfPage >= document.documentElement.scrollHeight)
        {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event)=> {
        let target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const deadline = '2021-06-30';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        if (Date.parse(endtime) < Date.parse(new Date())){
            t = 0;
        } 
            const days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t/(1000 * 60 * 60)) % 24),
                  minutes = Math.floor((t / 1000 / 60) % 60),
                  seconds = ((t / 1000) % 60);

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }




    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            let t = getTimeRemaining(endtime);
            
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds. innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");

    tabs();
    modal();
    timer();
    forms();
    slider();
    calculator();
    cards();

});
    // Timer

    // Modal

    // Cards

    // Forms

    // Slider
    
    // Caculator

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map