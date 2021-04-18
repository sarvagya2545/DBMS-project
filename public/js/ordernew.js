const foodItemContainer = document.querySelector('.food-items ul');
let foodItems = [];
const formNewOrder = document.querySelector('.form-new-order');
let dishSelect = document.querySelector('select.dish');
let dishVals = Array.from(dishSelect.children).map(child => ({
    name: child.innerHTML.trim(),
    price: child.dataset['price']
}));
let customerSelect = document.querySelector('select.customer');

const foodItemHTMLString = `
    <li class="food-item" id="food-item-number-%ID%">
    <h4>%ITEM_NAME%</h4>
    <p class="price">₹%PRICE%</p>
    <div class="qty">
        <button>+</button>
        <p>1</p>
        <button>-</button>
    </div>
    <button>Delete</button>
    </li>
`;

document.querySelector('.btn-add-dish').addEventListener('click', addItem);
document.querySelector('.form-new-order').addEventListener('submit', submitOrder);

function submitOrder(e) {
    e.preventDefault();
    var formData = {
        foodItems,
        customer: customerSelect.value
    }

    fetch('/dishes/add-order', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
}

function addItem(e) {
    // Add item
    e.preventDefault();
    if (dishSelect.value === '-') {
        // no dish selected
        return alert('Please select a dish');
    }

    // check if item is already in the itemlist
    if (foodItems.some(item => item.name === dishVals[parseInt(dishSelect.value) + 1].name)) {
        // update qty of item
        updateQtyAndPrice(parseInt(dishSelect.value), true);
        return;
    }

    // update our data
    foodItems.push({
        name: dishVals[parseInt(dishSelect.value) + 1].name,
        qty: 1,
        price: dishVals[parseInt(dishSelect.value) + 1].price
    })


    let newItem = foodItemHTMLString.replace('%ID%', parseInt(dishSelect.value))
        .replace('%ITEM_NAME%', dishVals[parseInt(dishSelect.value) + 1].name)
        .replace('%PRICE%', dishVals[parseInt(dishSelect.value) + 1].price);

    foodItemContainer.insertAdjacentHTML('beforeend', newItem)

    // add event listener to the newly created + and - buttons
    addUpdateListeners(parseInt(dishSelect.value));
}

function addUpdateListeners(index) {
    console.log(index);
    let foodItem = document.querySelector('#food-item-number-' + index);
    foodItem.children[2].children[0].addEventListener('click', () => updateQtyAndPrice(index, true))
    foodItem.children[2].children[2].addEventListener('click', () => updateQtyAndPrice(index, false))
    foodItem.children[3].addEventListener('click', () => deleteItem(index, foodItem));
}

function updateQtyAndPrice(index, increment) {
    // UI
    let foodItem = document.querySelector('#food-item-number-' + index);
    let prevQty = foodItem.children[2].children[1].innerText;
    let newPrice;
    if (increment) {
        foodItem.children[2].children[1].innerHTML = parseInt(prevQty) + 1;
        newPrice = parseInt(foodItem.children[1].innerText.slice(1)) + parseInt(dishVals[index + 1].price);
    } else {
        if (prevQty >= 1) {
            foodItem.children[2].children[1].innerHTML = parseInt(prevQty) - 1;
            newPrice = parseInt(foodItem.children[1].innerText.slice(1)) - parseInt(dishVals[index + 1].price);
        }
    }

    if (prevQty >= 1 || increment)
        foodItem.children[1].innerText = '₹' + newPrice.toString();

    // Data updation
    foodItems = foodItems.map(item => {
        if (item.name == dishVals[index + 1].name) {
            return ({
                ...item,
                qty: increment ? item.qty + 1 : item.qty - 1
            })
        }
        return item;
    })
}

function deleteItem(delIndex) {
    let el = document.querySelector('#food-item-number-' + delIndex);
    el.parentNode.removeChild(el);
    foodItems = foodItems.filter((item, index) => {
        return item.name !== dishVals[delIndex + 1].name
    });
}