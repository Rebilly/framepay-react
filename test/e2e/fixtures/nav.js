setTimeout(() => {
    const node = document.createElement('ul');
    [
        'apple-pay',
        'bank-separate',
        'card-separate',
        'card-separate-rebilly-fields',
        'card-separate-brands',
        'checkout-combined',
        'google-pay',
        'iban',
        'multiple-methods',
        'paypal',
    ]
        .forEach(route => {
            node.innerHTML += `<li><a href="/${route}.html">${route}</a></li>`;
        });

    document.body.appendChild(node);
}, 1000);
