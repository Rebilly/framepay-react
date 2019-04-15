setTimeout(() => {
    const node = document.createElement('ul');
    [
        'bank-separate',
        'card-separate',
        'checkout-combined',
        'multiple-methods'
    ]
        .forEach(route => {
            node.innerHTML += `<li><a href="/${route}.html">${route}</a></li>`;
        });

    document.body.appendChild(node);
}, 1000);