const tasks = [
    {
        icon: '🔐',
        name: 'المصادقة الثنائية',
        click: '👉 اضغط "تفعيل"',
        badge: 'آخر خطوة',
        badgeClass: '',
        link: 'https://www.facebook.com/settings?tab=security&section=two_factor',
        btnClass: ''
    },
    {
        icon: '📱',
        name: 'مراجعة الأجهزة',
        click: '👉 اضغط "تسجيل الخروج"',
        badge: 'شوف واخلع',
        badgeClass: 'red',
        link: 'https://www.facebook.com/settings?tab=security&section=sessions',
        btnClass: 'green'
    },
    {
        icon: '🔔',
        name: 'تنبيهات الدخول',
        click: '👉 فعّل المفتاح',
        badge: 'آخر خطوة',
        badgeClass: '',
        link: 'https://www.facebook.com/settings?tab=security&section=alerts',
        btnClass: ''
    },
    {
        icon: '🔑',
        name: 'تغيير كلمة المرور',
        click: '👉 اكتب الجديدة واضغط "حفظ"',
        badge: 'آخر خطوة',
        badgeClass: 'orange',
        link: 'https://www.facebook.com/settings?tab=security&section=password',
        btnClass: 'orange'
    },
    {
        icon: '👥',
        name: 'إدارة الأدمن',
        click: '👉 اضغط "إزالة"',
        badge: 'شيل الزيادة',
        badgeClass: 'red',
        link: 'https://www.facebook.com/settings?tab=security&section=admin_roles',
        btnClass: 'green'
    },
    {
        icon: '✅',
        name: 'الفحص الأمني',
        click: '👉 اتبع التعليمات',
        badge: 'آخر خطوة',
        badgeClass: 'orange',
        link: 'https://www.facebook.com/securitycheckup',
        btnClass: 'orange',
        special: true
    }
];

const taskList = document.getElementById('taskList');

tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';
    if (task.special) {
        div.style.borderColor = '#ffc107';
        div.style.background = '#fffde7';
    }

    div.innerHTML = `
        <div class="info">
            <span class="icon">${task.icon}</span>
            <span class="name">${task.name}</span>
            <span class="what-to-click">${task.click}</span>
            <span class="badge ${task.badgeClass}">${task.badge}</span>
        </div>
        <a href="${task.link}" target="_blank" class="btn-go ${task.btnClass}">🌐 افتح</a>
    `;

    taskList.appendChild(div);
});

console.log('✅ الصفحة جاهزة! اضغط على أي زر "افتح" - هتوصلك لآخر خطوة في فيسبوك');