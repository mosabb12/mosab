// تهيئة Three.js للوقو ثلاثي الأبعاد
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// تأثيرات التمرير
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.template-card').forEach(card => {
    observer.observe(card);
});

// معاينة القوالب
document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const template = this.closest('.template-card');
        showTemplatePreview(template);
    });
});

function showTemplatePreview(template) {
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
        <div class="preview-content">
            <span class="close-preview">&times;</span>
            <iframe src="template-preview.html" frameborder="0"></iframe>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-preview').onclick = () => modal.remove();
}

// نظام الدفع
function initializePayment(price, templateId) {
    // تكامل مع PayPal
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price
                    }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(function(details) {
                alert('تم الدفع بنجاح!');
                // إرسال التفاصيل للخادم
            });
        }
    }).render('#paypal-button-container');
}

// تأثيرات إضافية
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.template-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// تفعيل خدمة العملاء
const supportWidget = document.querySelector('.support-widget');
supportWidget.addEventListener('click', () => {
    window.open('https://wa.me/1234567890', '_blank');
});

// تحميل متأخر للصور
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
});

// إدارة ظهور شعارات التواصل
class SocialNotifications {
    constructor() {
        this.notifications = document.querySelectorAll('.social-notification');
        this.currentIndex = 0;
        this.interval = 6000; // 6 ثواني
        this.init();
    }

    init() {
        // إخفاء جميع الإشعارات في البداية
        this.notifications.forEach(notification => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(120%)';
        });

        // بدء دورة العرض
        this.startCycle();
    }

    showNotification(index) {
        // إخفاء الإشعار السابق
        if (this.currentNotification) {
            this.currentNotification.classList.remove('active');
        }

        // عرض الإشعار الحالي
        const notification = this.notifications[index];
        notification.classList.add('active');
        this.currentNotification = notification;

        // إضافة تأثيرات صوتية (اختياري)
        this.playNotificationSound();
    }

    hideNotification(index) {
        const notification = this.notifications[index];
        notification.classList.remove('active');
    }

    startCycle() {
        // عرض الإشعار الأول
        this.showNotification(0);

        // بدء الدورة
        setInterval(() => {
            this.hideNotification(this.currentIndex);
            this.currentIndex = (this.currentIndex + 1) % this.notifications.length;
            this.showNotification(this.currentIndex);
        }, this.interval);
    }

    playNotificationSound() {
        // تأثير صوتي خفيف (اختياري)
        const audio = new Audio('notification-sound.mp3');
        audio.volume = 0.1;
        audio.play().catch(() => {}); // تجاهل الأخطاء إذا كان الصوت معطلاً
    }
}

// تفعيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new SocialNotifications();
});

// إضافة تفاعلات عند النقر
document.querySelectorAll('.social-notification').forEach(notification => {
    notification.addEventListener('click', function() {
        const platform = this.classList[1]; // whatsapp, snapchat, or messenger
        const links = {
            whatsapp: 'https://wa.me/966123456789',
            snapchat: 'https://snapchat.com/add/MOSAB',
            messenger: 'https://m.me/MOSABstore'
        };
        window.open(links[platform], '_blank');
    });
});