/// ========== 导航栏 Nav ==========
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close'),
    navLinks = document.querySelectorAll('.nav__link')

function showMenu(menu) {
    menu.classList.add('show-menu')
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        showMenu(navMenu)
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        closeMenu(navMenu)
    })
}

navLinks.forEach(e => e.addEventListener('click', () => {
    closeMenu(navMenu)
}))

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

/// ========== 切换明暗主题 ==========
const themeButton = document.getElementById('light-dark-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/// ========== 国际化 ==========
currLanguage = 'zh'

const translations = {
    zh: zh_json,
    en: en_json,
};

function translateContent(language) {
    const elements = document.querySelectorAll('[data-i18n-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        element.textContent = translations[language][key];
    });
}

const translateBtn = document.getElementById('translate')

translateContent(currLanguage)

translateBtn.addEventListener('click', () => {
    currLanguage = currLanguage == 'en' ? 'zh' : 'en'
    translateContent(currLanguage)
})


/// ========== 更改主色调 ==========
// HTML元素
const root = document.documentElement
const hueButton = document.getElementById('hue-button')
const colorInput = document.getElementById('color-input')

hueButton.addEventListener('click', () => {
    colorInput.click()

    // 给 color picker 赋初值
    // let hue = getComputedStyle(root).getPropertyValue('--hue-color')
    // colorInput.value = `hsl(${hue}, 69%, 61%)`
})

// hexColor 转 rgb
function hexToRgb(hexColor) {
    // 去除可能包含的 '#' 符号
    hexColor = hexColor.replace('#', '');

    // 使用正则表达式将 hex 颜色代码拆分成 R、G、B 分量
    const match = hexColor.match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

    if (!match) {
        // 如果颜色代码无效，返回 null 或者你认为合适的值
        return null;
    }

    // 将十六进制值转换为十进制
    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);

    // 返回 RGB 格式字符串
    // return `${r},${g},${b}`;
    return [r, g, b]
}

// rgb 转 hsl
// 与浏览器的 color picker 计算的hue值有细微误差
function rgbToHsl(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h *= 60;
    }

    // 将 h, s, l 转换为整数
    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return [h, s, l];
}

colorInput.addEventListener('input', () => {
    const hexColor = colorInput.value
    console.log(hexColor)
    const rgb = hexToRgb(hexColor)
    console.log(rgb)
    const hsl = rgbToHsl(rgb)
    console.log(hsl)

    root.style.setProperty('--hue-color', hsl[0]);

    // 使 s 值和 l 值不被改变
    // this.value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
})
