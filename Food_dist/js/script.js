'use strict';
window.addEventListener('DOMContentLoaded', () => {
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

/*     const logo = document.querySelector('.header__logo');
    let timerId, i = 0;
    logo.addEventListener('click', ()=> {
        timerId = setInterval(logger, 1000);
    });
    

    function logger(){
        if (i === 3) {
            clearInterval(timerId);
        }
        console.log('text');
        i++;
    } */

    // Timer

    const deadline = '2021-03-30';

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

    // Modal

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

    class Card { 
        constructor (src, alt, menuName, menuText, price, ...classes) {

            this.src = src;
            this.alt = alt;
            this.menuName = menuName;
            this.menuText = menuText;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            

            const container = document.querySelector('.menu__field .container');
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
    // first card
    const firstText = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';

    new Card ("img/tabs/vegy.jpg", "vegy", "Фитнес", firstText, 9).render();

    // second card
    const secondText = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!';

    new Card ("img/tabs/elite.jpg", "elite", "Премиум", secondText, 16, 'menu__item').render();

    // third card
    const thirdText = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.';

    new Card ("img/tabs/post.jpg", "post", "Постное", thirdText, 12, 'menu__item','big').render();

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
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

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            }); 

            
            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }, 
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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
});