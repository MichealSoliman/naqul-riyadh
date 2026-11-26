/**
 * شركة نقل الرياض - السكربت التفاعلي للموقع
 * تشغيل القائمة المتجاوبة وأزرار التواصل العائمة
 */

(function () {
  'use strict';

  // 1. إنشاء أزرار التواصل العائمة (واتساب واتصال) إذا لم تكن موجودة
  function initFloatingContact() {
    if (document.querySelector('.floating-contact')) return;

    var container = document.createElement('div');
    container.className = 'floating-contact';
    container.setAttribute('aria-label', 'أزرار التواصل السريع');

    container.innerHTML =
      '<a href="https://wa.me/+966559865517" class="floating-btn whatsapp" target="_blank" rel="noopener" aria-label="تواصل عبر واتساب">' +
      '<span class="floating-tooltip">محادثة واتساب</span>' +
      '<svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor">' +
      '<path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.5 2.1 7.9L.6 31.4l7.7-2c2.3 1.3 4.9 2 7.7 2 8.6 0 15.5-6.9 15.5-15.5C31.5 7.4 24.6.5 16 .5zm0 28.3c-2.4 0-4.8-.6-6.8-1.8l-.5-.3-5.1 1.3 1.4-4.9-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.9-13.1 13.1-13.1 7.2 0 13.1 5.9 13.1 13.1 0 7.2-5.9 13.2-13.1 13.2zm7.2-9.8c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7s-.9-2.2-1.2-3c-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.8.1-1.2.5-.4.4-1.6 1.6-1.6 3.9s1.6 4.5 1.9 4.8c.2.3 3.2 4.9 7.7 6.8 1.1.5 1.9.7 2.6.9 1.1.3 2.1.3 2.9.2.9-.1 2.7-1.1 3.1-2.2.4-1.1.4-2 .3-2.2-.1-.2-.4-.3-.8-.5z"/>' +
      '</svg>' +
      '</a>' +
      '<a href="tel:+966559865517" class="floating-btn phone" aria-label="اتصال مباشر">' +
      '<span class="floating-tooltip">اتصال مباشر</span>' +
      '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">' +
      '<path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.47a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.47a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.2 2.09z"/>' +
      '</svg>' +
      '</a>';

    document.body.appendChild(container);
  }

  // 2. تفعيل القائمة التفاعلية للموبايل (Hamburger Menu)
  function initMobileMenu() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var wrap = header.querySelector('.wrap');
    if (!wrap) return;

    var nav = wrap.querySelector('nav');
    if (!nav) return;

    // زر القائمة إذا لم يكن موجوداً
    var toggleBtn = wrap.querySelector('.menu-toggle');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.className = 'menu-toggle';
      toggleBtn.setAttribute('aria-label', 'فتح القائمة');
      toggleBtn.innerHTML = '<span></span><span></span><span></span>';
      wrap.appendChild(toggleBtn);
    }

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      header.classList.toggle('nav-open');
    });

    // إغلاق القائمة عند النقر على أي رابط
    var navLinks = nav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        header.classList.remove('nav-open');
      });
    }

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        header.classList.remove('nav-open');
      }
    });

    // دعم النقر على القائمة الفرعية في شاشات اللمس
    var hasSub = nav.querySelector('.has-sub');
    if (hasSub) {
      var subLink = hasSub.querySelector(':scope > a');
      if (subLink) {
        subLink.addEventListener('click', function (e) {
          if (window.innerWidth <= 991) {
            var sub = hasSub.querySelector('.sub');
            if (sub && !hasSub.classList.contains('sub-open')) {
              e.preventDefault();
              hasSub.classList.add('sub-open');
            }
          }
        });
      }
    }
  }

  // 3. تأثير شريط التنقل عند التمرير (Sticky Scrolled Header)
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // تشغيل عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initFloatingContact();
      initMobileMenu();
      initHeaderScroll();
    });
  } else {
    initFloatingContact();
    initMobileMenu();
    initHeaderScroll();
  }
})();
