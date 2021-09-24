document.addEventListener("DOMContentLoaded", () => {

//Моб бургер туглим класс на открытие

    let hamburger = document.querySelector(".hamburger");

    hamburger.addEventListener("click", function() {
        this.classList.toggle('hamburger-open');
    });
//END

//Слайдер сертификатов страница О нас
    const slider = document.querySelector('.swiperSertif');


    let mySwiper = new Swiper(slider, {
        slidesPerView: 4,
        spaceBetween: 10,
        speed: 500,
        loopedSlides: 4,
        loop: false,
        watchOverflow: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });
//END

//Связанный слайдер истории . страница О нас
    let tabsHistory = document.querySelector('.tabs-buttons .swiper-wrapper');

    let tabButtons = new Swiper('.tabs-buttons', {
        slidesPerView: 'auto',
        slidesPerGroup: '1',
        freeMode: true,
        scrollbar: '.swiper-scrollbar',
        touchRatio: 0,
        mousewheelControl: true,
        onTap: function(swiper, event) {
            if (event.target.classList.contains('swiper-slide') && !event.target.classList.contains('active-tab')) {
                event.target.parentElement.querySelector('.active-tab').classList.remove('active-tab');
                event.target.classList.add('active-tab');
                tabContent.slideTo(swiper.clickedIndex);
            }
        }
    });

    let tabContent = new Swiper('.tabs-content', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoHeight: true,
        onSlideChangeStart: function(swiper, event) {
            tabsHistory.children[swiper.previousIndex].classList.remove('active');
            tabsHistory.children[swiper.activeIndex].classList.add('active');
        }
    });
//END

//ТАБЫ В КОНТАКТАХ
    const navBtn = document.querySelectorAll('.tabsCurrentButton');
    const tabsItem = document.querySelectorAll('.tabsCurrentContent');

    navBtn.forEach(onTabClick);

    function onTabClick(item) {
        item.addEventListener("click", function() {
            let currentItem = item;
            let tabId = currentItem.getAttribute('data-tab');
            let currentTab = document.querySelector(tabId);
            if (!currentItem.classList.contains('activeTabsToggle')) {
                navBtn.forEach(function(item) {
                    item.classList.remove('activeTabsToggle');
                });

                tabsItem.forEach(function(item) {
                    item.classList.remove('activeTabsToggle');
                });

                currentItem.classList.add('activeTabsToggle');
                currentTab.classList.add('activeTabsToggle');
            }
        });
    }
//END
//туглю блок юридической информации на странице Контакты
    let userURlinkBrest = document.querySelector('.ur-info-link-brest');
    let userInfoBrest = document.querySelector('.ur-info-brest');
    let userURlinkSpb = document.querySelector('.ur-info-link-spb');
    let userInfoSpb = document.querySelector('.ur-info-spb');
    userURlinkBrest.addEventListener("click", function () {
        userInfoBrest.classList.toggle('activeURBrest');
    })
    userURlinkSpb.addEventListener("click", function () {
        userInfoSpb.classList.toggle('activeURSpb');
    })
//END

});

