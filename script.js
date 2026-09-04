// ===================== البيانات =====================
const tasks = [
    {
        icon: '🔐',
        name: 'المصادقة الثنائية',
        click: '👉 فعّل 2FA',
        badge: 'آخر خطوة',
        badgeClass: '',
        link: 'https://www.facebook.com/settings?tab=security&section=two_factor&ref=sec',
        btnClass: '',
        check: () => check2FA() // دالة المراقبة
    },
    {
        icon: '📱',
        name: 'مراجعة الأجهزة',
        click: '👉 اخلع الغريب',
        badge: 'شوف واخلع',
        badgeClass: 'red',
        link: 'https://www.facebook.com/settings?tab=security&section=sessions&ref=sec',
        btnClass: 'green',
        check: () => checkDevices()
    },
    {
        icon: '🔔',
        name: 'تنبيهات الدخول',
        click: '👉 فعّل التنبيهات',
        badge: 'آخر خطوة',
        badgeClass: '',
        link: 'https://www.facebook.com/settings?tab=security&section=login_alerts&ref=sec',
        btnClass: '',
        check: () => checkAlerts()
    },
    {
        icon: '🔑',
        name: 'تغيير كلمة المرور',
        click: '👉 غير كلمة السر',
        badge: 'آخر خطوة',
        badgeClass: 'orange',
        link: 'https://www.facebook.com/settings?tab=security&section=password&ref=sec',
        btnClass: 'orange',
        check: () => checkPassword()
    },
    {
        icon: '👥',
        name: 'إدارة الأدمن',
        click: '👉 شيل الزيادة',
        badge: 'شيل الزيادة',
        badgeClass: 'red',
        link: 'https://www.facebook.com/settings?tab=admin&ref=sec',
        btnClass: 'green',
        check: () => checkAdmins()
    },
    {
        icon: '✅',
        name: 'الفحص الأمني',
        click: '👉 اتبع التعليمات',
        badge: 'آخر خطوة',
        badgeClass: 'orange',
        link: 'https://www.facebook.com/securitycheckup/?ref=sec',
        btnClass: 'orange',
        special: true,
        check: () => checkSecurity()
    }
];

// ===================== دوال المراقبة (محاكاة) =====================
// في الواقع، لازم تكون متصلة بـ API فيسبوك، لكن هنا بنحاكي النتائج

function check2FA() {
    // محاكاة: 80% من المستخدمين مفعلين 2FA
    const isActive = Math.random() > 0.2;
    return {
        status: isActive ? 'pass' : 'fail',
        message: isActive ? '✅ المصادقة الثنائية مفعلة' : '⚠️ المصادقة الثنائية غير مفعلة!',
        emoji: isActive ? '✅' : '❌'
    };
}

function checkDevices() {
    const hasUnknown = Math.random() > 0.7;
    return {
        status: hasUnknown ? 'warn' : 'pass',
        message: hasUnknown ? '⚠️ يوجد جهاز غير معروف متصل!' : '✅ كل الأجهزة معروفة',
        emoji: hasUnknown ? '⚠️' : '✅'
    };
}

function checkAlerts() {
    const isActive = Math.random() > 0.15;
    return {
        status: isActive ? 'pass' : 'fail',
        message: isActive ? '✅ تنبيهات الدخول مفعلة' : '⚠️ تنبيهات الدخول غير مفعلة!',
        emoji: isActive ? '✅' : '❌'
    };
}

function checkPassword() {
    const isStrong = Math.random() > 0.3;
    return {
        status: isStrong ? 'pass' : 'warn',
        message: isStrong ? '✅ كلمة المرور قوية' : '⚠️ يُفضل تغيير كلمة المرور',
        emoji: isStrong ? '✅' : '⚠️'
    };
}

function checkAdmins() {
    const hasExtra = Math.random() > 0.8;
    return {
        status: hasExtra ? 'warn' : 'pass',
        message: hasExtra ? '⚠️ يوجد أدمن إضافي غير معروف!' : '✅ الأدمن مضبوط',
        emoji: hasExtra ? '⚠️' : '✅'
    };
}

function checkSecurity() {
    const isSecure = Math.random() > 0.1;
    return {
        status: isSecure ? 'pass' : 'fail',
        message: isSecure ? '✅ الحساب آمن' : '⚠️ يوجد ثغرات أمنية!',
        emoji: isSecure ? '✅' : '❌'
    };
}

// ===================== عرض المهام =====================
function renderTasks() {
    const container = document.getElementById('taskList');
    let html = '';

    tasks.forEach((task) => {
        const btnClass = task.btnClass ? `btn-go ${task.btnClass}` : 'btn-go';
        const badgeHtml = task.badge ? `<span class="badge ${task.badgeClass}">${task.badge}</span>` : '';

        html += `
            <div class="task" id="task-${task.name}">
                <div class="info">
                    <span class="icon">${task.icon}</span>
                    <span class="name">${task.name}</span>
                    <span class="what-to-click">${task.click}</span>
                    ${badgeHtml}
                    <span class="check-status" id="status-${task.name}">⏳</span>
                </div>
                <a href="${task.link}" 
                   target="_blank" 
                   class="${btnClass}"
                   onclick="return openLink(event, '${task.link}', '${task.name}')">
                    👉 افتح
                </a>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ===================== فتح الرابط =====================
function openLink(event, url, taskName) {
    const confirmMsg = 
        `🔐 تأكد إنك مسجل دخولك في فيسبوك.\n` +
        `📌 هتفتح: ${taskName}\n\n` +
        `اضغط "موافق" للاستمرار.`;

    if (!confirm(confirmMsg)) {
        event.preventDefault();
        return false;
    }
    return true;
}

// ===================== وظيفة الفحص =====================
function scanAccount() {
    const btn = document.getElementById('scanBtn');
    btn.disabled = true;
    btn.textContent = '⏳ جاري الفحص...';

    const resultsContainer = document.getElementById('monitorResults');
    resultsContainer.classList.remove('show');
    resultsContainer.innerHTML = '';

    // تحديث حالة الحساب
    document.getElementById('accountStatus').textContent = 'جاري الفحص...';

    // محاكاة وقت الفحص
    setTimeout(() => {
        let allPass = true;
        let resultsHtml = '<h3>📋 نتائج الفحص:</h3>';

        tasks.forEach((task) => {
            if (task.check) {
                const result = task.check();
                const statusEl = document.getElementById(`status-${task.name}`);
                
                if (statusEl) {
                    statusEl.textContent = result.emoji;
                    statusEl.style.color = result.status === 'pass' ? '#28a745' : 
                                          result.status === 'warn' ? '#ffc107' : '#dc3545';
                }

                resultsHtml += `
                    <div class="result-item">
                        <span class="r-icon">${result.emoji}</span>
                        <span>${task.icon} ${task.name}</span>
                        <span class="r-status ${result.status}">${result.message}</span>
                    </div>
                `;

                if (result.status !== 'pass') allPass = false;
            }
        });

        // تحديث حالة الحساب العامة
        const statusCard = document.querySelector('.status-card');
        const statusText = document.getElementById('accountStatus');
        
        if (allPass) {
            statusText.textContent = '🟢 آمن بالكامل';
            statusCard.className = 'status-card safe';
        } else {
            statusText.textContent = '🟡 يحتاج انتباه';
            statusCard.className = 'status-card warning';
        }

        document.getElementById('lastCheck').textContent = new Date().toLocaleTimeString();

        // عرض النتائج
        resultsContainer.innerHTML = resultsHtml;
        resultsContainer.classList.add('show');

        btn.disabled = false;
        btn.textContent = '🔍 افحص حسابي الآن';

    }, 2000);
}

// ===================== تشغيل =====================
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    
    // فحص تلقائي عند تحميل الصفحة
    setTimeout(scanAccount, 500);

    // ربط زر الفحص
    document.getElementById('scanBtn').addEventListener('click', scanAccount);
});