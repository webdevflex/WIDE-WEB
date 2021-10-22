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
        breakpoints: {
            1024: {
                slidesPerView: 2,
            },
            600: {
                slidesPerView: 1,
            },
        }
    });
//END

//Связанный слайдер истории . страница О нас
    let tabsHistory = document.querySelector('.tabs-buttons .swiper-wrapper');

    let tabButtons = new Swiper('.tabs-buttons', {
        slidesPerView: 'auto',
        slidesPerGroup: '1',
        freeMode: true,
        slidesPerColumn: 1,
        // centeredSlides:true,
        // centerSlidesBounds:true,
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
    // let userURlinkBrest = document.querySelector('.ur-info-link-brest');
    // let userInfoBrest = document.querySelector('.ur-info-brest');
    // let userURlinkSpb = document.querySelector('.ur-info-link-spb');
    // let userInfoSpb = document.querySelector('.ur-info-spb');
    // userURlinkBrest.addEventListener("click", function () {
    //     userInfoBrest.classList.toggle('activeURBrest');
    // })
    // userURlinkSpb.addEventListener("click", function () {
    //     userInfoSpb.classList.toggle('activeURSpb');
    // })
//END
//ТАБЫ НАШЕЙ КОМАНДЫ СТРАНИЦА О НАС
    let $tabs = function(target) {
        let
            _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
            _eventTabsShow,
            _showTab = function(tabsLinkTarget) {
                var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
                tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
                tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
                tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
                // если следующая вкладка равна активной, то завершаем работу
                if (tabsLinkTarget === tabsLinkActive) {
                    return;
                }
                // удаляем классы у текущих активных элементов
                if (tabsLinkActive !== null) {
                    tabsLinkActive.classList.remove('tabs__link_active');
                }
                if (tabsPaneShow !== null) {
                    tabsPaneShow.classList.remove('tabs__pane_show');
                }
                // добавляем классы к элементам (в завимости от выбранной вкладки)
                tabsLinkTarget.classList.add('tabs__link_active');
                tabsPaneTarget.classList.add('tabs__pane_show');
                document.dispatchEvent(_eventTabsShow);
            },
            _switchTabTo = function(tabsLinkIndex) {
                let tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
                if (tabsLinks.length > 0) {
                    if (tabsLinkIndex > tabsLinks.length) {
                        tabsLinkIndex = tabsLinks.length;
                    } else if (tabsLinkIndex < 1) {
                        tabsLinkIndex = 1;
                    }
                    _showTab(tabsLinks[tabsLinkIndex - 1]);
                }
            };

        _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

        _elemTabs.addEventListener('click', function(e) {
            let tabsLinkTarget = e.target;
            // завершаем выполнение функции, если кликнули не по ссылке
            if (!tabsLinkTarget.classList.contains('tabs__link')) {
                return;
            }
            // отменяем стандартное действие
            e.preventDefault();
            _showTab(tabsLinkTarget);
        });

        return {
            showTab: function(target) {
                _showTab(target);
            },
            switchTabTo: function(index) {
                _switchTabTo(index);
            }
        }

    };
    $tabs('.tabs');
// END
// //показываем -скрываем отзывы (b2b-cabinet.html)
    let reviewItemAll = document.querySelectorAll('.reviews-item');
    let btnReview = document.querySelector('.reviews-btnAll');
    if(btnReview){
        btnReview.addEventListener('click',function(){
            reviewItemAll.forEach(elem =>{
                if(elem.hasAttribute('data-id')){
                    elem.classList.toggle('show-reviews')
                }
                
            })
            btnReview.parentNode.removeChild(btnReview)
        })
    }
// //показываем -скрываем отзывы (about.html)

    let reviewsAll = document.querySelectorAll('.reviews-our-clinic-block');
    let btnReviews = document.querySelector('.btn-more');
    if(btnReviews){
        btnReviews.addEventListener('click',function(){
            reviewsAll.forEach(elem =>{
                if(elem.hasAttribute('data-id')){
                    elem.classList.toggle('show-reviews')
                }  
            })
            btnReviews.parentNode.removeChild(btnReviews)
        })
    }
   


   
   

});

