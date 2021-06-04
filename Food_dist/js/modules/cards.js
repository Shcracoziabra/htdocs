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