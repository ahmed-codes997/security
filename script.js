// لما المستخدم يضغط على أي زر
document.querySelectorAll('.btn[data-url]').forEach(button => {
    button.addEventListener('click', function () {
        const url = this.getAttribute('data-url');

        // نطلب تأكيد قبل الفتح
        const confirmMessage = '🔐 هتفتح الإعدادات في فيسبوك\n\n' +
            'تأكد إنك داخل على حسابك الأول، وبعدين اظبط الإعداد بنفسك.\n\n' +
            'متابع؟';

        if (confirm(confirmMessage)) {
            // نفتح الرابط في تبويب جديد
            window.open(url, '_blank');
        }
    });
});

// زر الطوارئ
document.getElementById('emergencyBtn').addEventListener('click', function () {
    const url = 'https://www.facebook.com/settings?tab=admin_roles';

    const emergencyMessage = '🚨 **تحذير طوارئ** 🚨\n\n' +
        'هتفتح صفحة إدارة الأدمن.\n' +
        'من هناك تقدر:\n' +
        '• تشوف مين عنده صلاحيات\n' +
        '• تشيل أي حد مش موثوق\n' +
        '• تغير الصلاحيات للقراءة بس\n\n' +
        '⚠️ هل أنت متأكد إنك عايز تروح هناك دلوقتي؟';

    if (confirm(emergencyMessage)) {
        window.open(url, '_blank');
    }
});

// نطبع رسالة ترحيب في الكونسول عشان المطورين
console.log('🛡️ تطبيق حماية صفحة الفيسبوك شغال ✅');
console.log('📌 لو عايز تعدل الروابط، ابحث عن data-url في الـ HTML');