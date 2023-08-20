/// ========== 导航栏 Nav ==========
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close'),
    navLinks = document.querySelectorAll('.nav__link')

function showMenu() {
    navMenu.classList.add('show-menu')
}

function closeMenu() {
    navMenu.classList.remove('show-menu')
}

if (navToggle) {
    navToggle.addEventListener('click', showMenu)
}

if (navClose) {
    navClose.addEventListener('click', closeMenu)
}

navLinks.forEach(e => e.addEventListener('click', closeMenu))

/// ========== 导航栏自动追踪当前section ==========
// 选中所有带id的<section>
const sections = document.querySelectorAll('section[id]')
// 当前所在的<section>
let currNavItem = document.querySelector('.nav__menu a[href*=home]')

function myfunc() {
    // 获取当前页面的垂直滚动位置
    let scrollY = window.scrollY

    sections.forEach(current => {
        // 当前<section>的高度
        let sectionHeight = current.offsetHeight
        // 当前<section>相对于页面顶部的距离，减去50像素
        let sectionTop = current.offsetTop - 50;
        // 获取当前<section>的id
        let sectionId = current.getAttribute('id')

        // 若处于当前<section>
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // 当前<section>对应的导航按钮
            let section = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
            // 若当前<section>有在导航栏里
            if (section) {
                currNavItem.classList.remove('active-link')
                currNavItem = section
                currNavItem.classList.add('active-link')
            }
        }
    })
}

window.addEventListener('scroll', myfunc)

/// ========== 导航栏添加阴影 ==========
function scrollHead() {
    const nav = document.getElementById('header')
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHead)


/// ========== 技术栈 Skills ==========
const skillsContent = document.getElementsByClassName('skills__content')
const skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
    let itemClass = this.parentNode.className
    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach(e => e.addEventListener('click', toggleSkills))


/// ========== 资历 Qualification ==========
const tabs = document.querySelectorAll('[data-target]'),    // 所有的标签
    tabContents = document.querySelectorAll('[data-content]')   // 所有的内容

// tab是被点击的标签
function onQualificationTabClick(tab) {
    // 选中被点击的标签所对应的内容
    const target = document.querySelector(tab.dataset.target)
    // 将所有内容删去active
    tabContents.forEach(tabContent => tabContent.classList.remove('qualification__active'))
    // 将选中的内容添加active
    target.classList.add('qualification__active')
    // 将所有的标签删去active
    tabs.forEach(tab => tab.classList.remove('qualification__active'))
    // 将点击的标签添加active
    tab.classList.add('qualification__active')
}

// 为所有标签添加点击事件
tabs.forEach(tab => tab.addEventListener('click', () => { onQualificationTabClick(tab); }))


/// ========== Service ==========
const modalViews = document.querySelectorAll('.services__modal'),   // 弹窗
    modalButtons = document.querySelectorAll('.services__button'),  // ViewMore按钮
    modalCloses = document.querySelectorAll('.services__modal-close')   // 弹窗的关闭按钮

// 显示弹窗，index是弹窗所对应的按钮的序号
function showModal(index) {
    modalViews[index].classList.add('active-modal')
}

// 关闭弹窗
function closeModal(index) {
    modalViews[index].classList.remove('active-modal')
}

modalButtons.forEach((modalButton, index) => modalButton.addEventListener('click', () => { showModal(index); }))
modalCloses.forEach((modalButton, index) => modalButton.addEventListener('click', () => { closeModal(index); }))

/// ========== 项目 Projects ==========
// 第三方轮播图
let swiperProjects = new Swiper('.projects__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/// ========== 获奖 Awards ==========
// 第三方轮播图
let swiperAwards = new Swiper('.awards__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }
});