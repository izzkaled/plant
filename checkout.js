// دالة لجلب بيانات السلة من LocalStorage
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    let total = 0;

    // عرض المنتجات في السلة
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">${item.price} ريال</div>
                <div class="quantity">الكمية: ${item.quantity}</div>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        // حساب الإجمالي
        total += item.price * item.quantity;
    });

    // تحديث إجمالي السعر
    document.getElementById('total-amount').innerText = total;
}

// دالة لمعالجة إتمام الشراء
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // جلب بيانات النموذج
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let paymentMethod = document.getElementById('payment').value;
    
    // جلب المنتجات من LocalStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // التحقق من أن السلة غير فارغة
    if (cartItems.length === 0) {
        alert('السلة فارغة. لا يمكنك إتمام الشراء.');
        return;
    }

    // جمع كل بيانات الطلب
    let orderDetails = {
        customerName: name,
        customerAddress: address,
        customerPhone: phone,
        paymentMethod: paymentMethod,
        products: cartItems
    };

    // يمكنك هنا إرسال بيانات الطلب إلى خادم أو التعامل معها حسب الحاجة
    console.log(orderDetails); // عرض تفاصيل الطلب على وحدة التحكم

    // مسح السلة بعد إتمام الشراء
    localStorage.removeItem('cart');

    // إظهار رسالة تأكيد
    alert('تم إتمام الشراء بنجاح! شكراً لتسوقك معنا.');

    // توجيه المستخدم إلى صفحة الشكر
    window.location.href = 'thankyou.html';
});

// عرض المنتجات عند تحميل صفحة الدفع
window.onload = function() {
    loadCartItems();
};

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    let total = 0;

    // عرض المنتجات في السلة
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">${item.price} ريال</div>
                <div class="quantity">الكمية: ${item.quantity}</div>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        // حساب الإجمالي
        total += item.price * item.quantity;
    });

    // تحديث إجمالي السعر
    document.getElementById('total-amount').innerText = total;
}

// دالة لمعالجة إتمام الشراء
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // جلب بيانات النموذج
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let paymentMethod = document.getElementById('payment').value;
    
    // جلب المنتجات من LocalStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // التحقق من أن السلة غير فارغة
    if (cartItems.length === 0) {
        alert('السلة فارغة. لا يمكنك إتمام الشراء.');
        return;
    }

    // جمع كل بيانات الطلب
    let orderDetails = {
        customerName: name,
        customerAddress: address,
        customerPhone: phone,
        paymentMethod: paymentMethod,
        products: cartItems,
        timestamp: new Date().toISOString() // إضافة الوقت الحالي
    };

    // إرسال بيانات الطلب إلى Firebase Firestore
    db.collection("orders").add(orderDetails)
    .then((docRef) => {
        console.log("تم تقديم الطلب بنجاح، ID:", docRef.id);

        // مسح السلة بعد إتمام الشراء
        localStorage.removeItem('cart');

        // إظهار رسالة تأكيد
        alert('تم إتمام الشراء بنجاح! شكراً لتسوقك معنا.');

        // توجيه المستخدم إلى صفحة الشكر
        window.location.href = 'thankyou.html';
    })
    .catch((error) => {
        console.error("حدث خطأ أثناء تقديم الطلب: ", error);
        alert("حدث خطأ أثناء إتمام الشراء. الرجاء المحاولة مرة أخرى.");
    });
});

// عرض المنتجات عند تحميل صفحة الدفع
window.onload = function() {
    loadCartItems();
};
