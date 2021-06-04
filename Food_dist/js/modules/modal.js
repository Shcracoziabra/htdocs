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