const orderControls = document.querySelectorAll('[data-order-btns]');

Array.from(orderControls).forEach(orderBtnGroup => {
    const orderId = orderBtnGroup.dataset['orderid']
    // complete order button
    orderBtnGroup.children[0].addEventListener('click', (e) => {
        if (confirm(`Are you sure this order is complete: ${orderId}`)) {
            const body = { ord_id: orderId }
            console.log(body);
            fetch('/dishes/finish', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(res => {
                    alert('Order completed');
                    location.reload();
                })
                .catch(err => console.log(err));
        }
    })

    // cancel order button
    orderBtnGroup.children[1].addEventListener('click', (e) => {
        if (confirm(`Are you sure you want to remove this order: ${orderId} ?`)) {
            const body = { ord_id: orderId }
            console.log(body);
            fetch('/dishes/remove', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(res => {
                    alert('Order removed');
                    location.reload();
                })
                .catch(err => console.log(err));
        }
    });
})