// ===================== البيانات =====================
const tasksData = [
    {
        id: '2fa',
        icon: '🔐',
        name: 'المصادقة الثنائية',
        priority: 'critical',
        priorityLabel: '🔴 حرج',
        why: 'حتى لو شخص عرف كلمة السر، سيحتاج عامل تحقق إضافي للدخول. ده أهم إعداد أمني على الإطلاق.',
        how: 'اضغط "افتح" → هتفتح صفحة المصادقة الثنائية مباشرة. فعّل "تطبيق المصادقة" أو "رسالة نصية"، بعدين ارجع واضغط "أكدت إنني عملتها".',
        link: 'https://accountscenter.facebook.com/password_and_security/two_factor'
    },
    {
        id: 'password',
        icon: '🔑',
        name: 'تغيير كلمة المرور',
        priority: 'critical',
        priorityLabel: '🔴 حرج',
        why: 'استخدم كلمة مرور قوية (حروف كبيرة وصغيرة + أرقام + رموز) وما تعيدش استخدامها في مواقع تانية.',
        how: 'اضغط "افتح" → غيّر كلمة المرور لكلمة قوية وجديدة، بعدين ارجع واضغط "أكدت إنني عملتها".',
        link: 'https://accountscenter.facebook.com/password_and_security/password'
    },
    {
        id: 'email',
        icon: '📧',
        name: 'تأمين البريد الإلكتروني',
        priority: 'critical',
        priorityLabel: '🔴 حرج',
        why: 'البريد الإلكتروني هو مفتاح إعادة تعيين كلمة السر. لو اتهكر، الحساب كله في خطر.',
        how: 'اضغط "افتح" → تأكد إن الإيميل صحيح ومفعّل، ولو تقدر فعّل التحقق الثنائي على الإيميل نفسه.',
        link: 'https://accountscenter.facebook.com/personal_info/contact_points'
    },
    {
        id: 'sessions',
        icon: '📱',
        name: 'مراجعة الأجهزة المتصلة',
        priority: 'high',
        priorityLabel: '🟠 عالي',
        why: 'قد يكون في جهاز أو متصفح قديم متصل بحسابك من غير ما تعرف.',
        how: 'اضغط "افتح" → شوف قائمة الأجهزة. لو لقيت جهاز مش بتعرفه اضغط "تسجيل الخروج" منه.',
        link: 'https://accountscenter.facebook.com/password_and_security/login_activity'
    },
    {
        id: 'alerts',
        icon: '🔔',
        name: 'تنبيهات الدخول',
        priority: 'high',
        priorityLabel: '🟠 عالي',
        why: 'هتوصلك إشعارات فورية لو حد حاول يدخل من جهاز جديد.',
        how: 'اضغط "افتح" → فعّل تنبيهات الدخول (إشعارات + إيميل) عشان تعرف بأي محاولة دخول جديدة.',
        link: 'https://accountscenter.facebook.com/password_and_security'
    },
    {
        id: 'admins',
        icon: '👥',
        name: 'إدارة الأدمن',
        priority: 'high',
        priorityLabel: '🟠 عالي',
        why: 'تأكد إن الأشخاص اللي عندهم صلاحيات إدارة الصفحة أو الحساب هم بس اللي بتثق فيهم.',
        how: 'اضغط "افتح" → راجع قائمة الأدمن والمشرفين، واحذف أي حد مش عايزه.',
        link: 'https://www.facebook.com/settings?tab=admin'
    },
    {
        id: 'apps',
        icon: '🔗',
        name: 'مراجعة التطبيقات المرتبطة',
        priority: 'medium',
        priorityLabel: '🟡 متوسط',
        why: 'تطبيقات قديمة ممكن تكون لسه متصلة بحسابك وتقدر توصل لبياناتك.',
        how: 'اضغط "افتح" → شوف التطبيقات المرتبطة واحذف أي تطبيق مش بتستخدمه.',
        link: 'https://www.facebook.com/settings?tab=applications'
    },
    {
        id: 'checkup',
        icon: '✅',
        name: 'الفحص الأمني الشامل',
        priority: 'recommended',
        priorityLabel: '🟢 موصى به',
        why: 'فحص رسمي من فيسبوك بيجمع أهم الإعدادات الأمنية ويقترح عليك اللي ناقص.',
        how: 'اضغط "افتح" → اتبع الخطوات اللي فيسبوك هيعرضها عليك. ده ملخص سريع لكل حاجة.',
        link: 'https://www.facebook.com/securitycheckup'
    }
];

// ===================== الحالة =====================
let progress = loadProgress();

// ===================== دوال الحفظ والتحميل =====================
function loadProgress() {
    try {
        const saved = localStorage.getItem('fb_security_progress');
        if (saved) {
            const parsed = JSON.parse(saved);
            // التأكد من أن كل المهام موجودة
            tasksData.forEach(task => {
                if (!(task.id in parsed)) {
                    parsed[task.id] = false;
                }
            });
            return parsed;
        }
    } catch (e) {
        console.warn('فشل تحميل التقدم', e);
    }
    // تهيئة جديدة
    const initial = {};
    tasksData.forEach(task => { initial[task.id] = false; });
    return initial;
}

function saveProgress() {
    localStorage.setItem('fb_security_progress', JSON.stringify(progress));
}

// ===================== عرض المهام =====================
function renderTasks() {
    const container = document.getElementById('taskList');
    let html = '';

    // ترتيب حسب الأولوية
    const priorityOrder = { critical: 0, high: 1, medium: 2, recommended: 3 };
    const sorted = [...tasksData].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    sorted.forEach(task => {
        const isDone = progress[task.id] || false;
        const doneClass = isDone ? 'completed' : '';

        html += `
            <div class="task ${doneClass}" id="task-${task.id}">
                <div class="task-main">
                    <span class="task-icon">${task.icon}</span>
                    <span class="task-name">${task.name}</span>
                    <span class="task-priority ${task.priority}">${task.priorityLabel}</span>
                    <div class="task-actions">
                        <a href="${task.link}" target="_blank" rel="noopener" class="task-btn open">🔗 افتح</a>
                        <button class="task-btn done ${isDone ? 'completed-btn' : ''}" 
                                onclick="toggleTask('${task.id}')">
                            ${isDone ? '✅ تم التأكيد' : '☑️ أكدت إنني عملتها'}
                        </button>
                        <button class="task-btn info-btn" 
                                onclick="toggleWhy('${task.id}')">
                            ℹ️
                        </button>
                    </div>
                </div>
                <div class="task-why" id="why-${task.id}">
                    <p><strong>لماذا مهم؟</strong> ${task.why}</p>
                    <p style="margin-top:8px;"><strong>إزاي تعمله؟</strong> ${task.how}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    updateDashboard();
}

// ===================== تبديل حالة المهمة =====================
function toggleTask(id) {
    progress[id] = !progress[id];
    saveProgress();
    renderTasks();
    updateDashboard();
}

// ===================== إظهار/إخفاء شرح "لماذا" =====================
function toggleWhy(id) {
    const el = document.getElementById(`why-${id}`);
    el.classList.toggle('show');
}

// ===================== تحديث لوحة التحكم =====================
function updateDashboard() {
    const total = tasksData.length;
    const completed = tasksData.filter(t => progress[t.id]).length;
    const pending = total - completed;
    const score = Math.round((completed / total) * 100);

    // النسبة المئوية
    document.getElementById('scoreNumber').textContent = score;
    document.getElementById('progressText').textContent = `${completed} / ${total}`;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('pendingCount').textContent = pending;

    // شريط التقدم
    document.getElementById('progressFill').style.width = `${score}%`;

    // الدائرة
    const circle = document.querySelector('.score-circle');
    if (circle) {
        circle.style.setProperty('--score', `${score}%`);
    }

    // الحالة
    const statusEl = document.getElementById('scoreStatus');
    if (score === 100) {
        statusEl.textContent = '🟢 حسابك آمن بالكامل!';
        statusEl.className = 'score-status secure';
    } else if (score >= 70) {
        statusEl.textContent = '🟡 أمان جيد، يحتاج تحسينات';
        statusEl.className = 'score-status medium';
    } else {
        statusEl.textContent = '🔴 حسابك يحتاج اهتمام فوري!';
        statusEl.className = 'score-status weak';
    }

    // آخر تحديث
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString('ar-EG');

    // تحديث الملخص
    updateSummary();
}

// ===================== الملخص =====================
function updateSummary() {
    const box = document.getElementById('summaryBox');
    const content = document.getElementById('summaryContent');
    
    const critical = tasksData.filter(t => t.priority === 'critical');
    const high = tasksData.filter(t => t.priority === 'high');
    const medium = tasksData.filter(t => t.priority === 'medium');
    const recommended = tasksData.filter(t => t.priority === 'recommended');

    const criticalDone = critical.filter(t => progress[t.id]).length;
    const highDone = high.filter(t => progress[t.id]).length;
    const mediumDone = medium.filter(t => progress[t.id]).length;
    const recommendedDone = recommended.filter(t => progress[t.id]).length;

    const total = tasksData.length;
    const completed = tasksData.filter(t => progress[t.id]).length;
    const score = Math.round((completed / total) * 100);

    if (completed > 0) {
        box.style.display = 'block';
        content.innerHTML = `
            <div class="summary-item">
                <span>🔴 حرج:</span>
                <span class="s-status ${criticalDone === critical.length ? 'pass' : 'fail'}">
                    ${criticalDone} / ${critical.length} مكتملة
                </span>
            </div>
            <div class="summary-item">
                <span>🟠 عالي:</span>
                <span class="s-status ${highDone === high.length ? 'pass' : 'fail'}">
                    ${highDone} / ${high.length} مكتملة
                </span>
            </div>
            <div class="summary-item">
                <span>🟡 متوسط:</span>
                <span class="s-status ${mediumDone === medium.length ? 'pass' : 'fail'}">
                    ${mediumDone} / ${medium.length} مكتملة
                </span>
            </div>
            <div class="summary-item">
                <span>🟢 موصى به:</span>
                <span class="s-status ${recommendedDone === recommended.length ? 'pass' : 'fail'}">
                    ${recommendedDone} / ${recommended.length} مكتملة
                </span>
            </div>
            <hr style="margin:10px 0;border-color:#ddd;">
            <div class="summary-item">
                <strong>الإجمالي:</strong>
                <strong>${completed} / ${total} مكتملة</strong>
            </div>
            <div class="summary-item">
                <strong>الأمان:</strong>
                <strong style="color:${score >= 70 ? '#28a745' : '#dc3545'}">
                    ${score}%
                </strong>
            </div>
        `;
    } else {
        box.style.display = 'none';
    }
}

// ===================== الفحص السريع =====================
function quickScan() {
    const btn = document.getElementById('quickScanBtn');
    btn.disabled = true;
    btn.textContent = '⏳ جاري الفحص...';

    setTimeout(() => {
        updateDashboard();
        btn.disabled = false;
        btn.textContent = '🔍 فحص سريع';
        
        const completed = tasksData.filter(t => progress[t.id]).length;
        const total = tasksData.length;
        alert(`✅ الفحص اكتمل!\nالمكتملة: ${completed} / ${total}\nنسبة الأمان: ${Math.round((completed/total)*100)}%`);
    }, 1200);
}

// ===================== إعادة تعيين التقدم =====================
function resetProgress() {
    if (confirm('⚠️ هل أنت متأكد؟ سيتم مسح كل التقدم المحفوظ.')) {
        tasksData.forEach(task => { progress[task.id] = false; });
        saveProgress();
        renderTasks();
        updateDashboard();
    }
}

// ===================== تشغيل =====================
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    document.getElementById('resetBtn').addEventListener('click', resetProgress);
    document.getElementById('quickScanBtn').addEventListener('click', quickScan);
});
