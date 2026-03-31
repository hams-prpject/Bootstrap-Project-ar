const printEl = document.getElementById("typing-effect");
const phrases = ['تشخيص أولي فوري', 'حجز مواعيد سهل', 'رعاية صحية متكاملة'];

let phraseIndex = 0; // أي جملة نحن الآن؟
let charIndex = 0;   // أي حرف نحن الآن؟
let isDeleting = false; // هل نحن في مرحلة المسح؟

function type() {
    const currentPhrase = phrases[phraseIndex];
    // إذا كنا نمسح: نقص حرفاً واحداً
    // إذا كنا نكتب: زد حرفاً واحداً
    isDeleting ? charIndex-- : charIndex++

    // تحديث النص في الصفحة
    printEl.innerHTML = currentPhrase.slice(0, charIndex);

    // تحديد السرعة: المسح أسرع من الكتابة
    let typeSpeed = isDeleting ? 50 : 100;

    // المنطق الانتقالي:
    // 1. إذا انتهت الكتابة (وصلنا لآخر حرف)
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1500; // انتظر ثانية ونصف والجملة مكتملة
    }
    // 2. إذا انتهى المسح (وصلنا للصفر)
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++; // انتقل للجملة التالية

        // إذا انتهت كل الجمل، ابدأ من البداية (اختياري)
        if (phraseIndex === phrases.length) phraseIndex = 0;

        typeSpeed = 500; // انتظر نصف ثانية قبل بدء الجملة الجديدة
    }

    setTimeout(type, typeSpeed);
}

type();
