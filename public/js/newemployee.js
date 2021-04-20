const newEmployeeForm = document.querySelector('.form-new-employee');
const successBorder = '2px solid green';
const failureBorder = '2px solid red';
const neutralBorder = '2px solid black';

const formElements = {
    email: document.querySelector('#email_address'),
    name: document.querySelector('#name'),
    designation: document.querySelector('#designation'),
    salary: document.querySelector('#salary'),
    contact: document.querySelector('#contact'),
    password: document.querySelector('#password'),
    password2: document.querySelector('#password2')
}

const regexFields = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // email regex
    name: /^[A-Z\s]+$/i,
    salary: /^\d+$/, // salary => any number of any length
    contact: /^\d{10}$/, // contact number => 10 digits long
    password: /^.{6,}$/i, // case insensitive 6 characters
}

let isMatched = {
    email: false, name: false, password: false, salary: false, contact: false, password: false, password2: false
}

for (let node in formElements) {
    if (formElements.hasOwnProperty(node)) {
        if (regexFields[node])
            formElements[node].addEventListener('input', function (e) {
                matchRegex.call(this, e, regexFields[node]);
            });
        if (node === "password2") {
            formElements[node].addEventListener('input', function (e) {
                matchPassword.call(this, e, formElements['password']);
            })
        }
        if (!regexFields[node] && node !== "password2") {
            formElements[node].addEventListener('input', function () {
                this.style.border = neutralBorder;
                isMatched[node] = true;
            })
        }
    }
}

function matchRegex(e, regex) {
    this.style.border = regex.test(e.target.value) ? successBorder : failureBorder;
    this.nextElementSibling.style.display = regex.test(e.target.value) ? 'none' : 'block';
    isMatched[e.target.name] = regex.test(e.target.value);
}

function matchPassword(e, passwordElement) {
    this.style.border = passwordElement.value === e.target.value ? successBorder : failureBorder;
    this.nextElementSibling.style.display = passwordElement.value === e.target.value ? 'none' : 'block';
    isMatched.password2 = passwordElement.value === e.target.value;
}

newEmployeeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let success = true;
    for (node in formElements) {
        if (formElements.hasOwnProperty(node)) {
            if (!isMatched[node]) {
                if (formElements[node].nextElementSibling)
                    formElements[node].nextElementSibling.style.display = 'block';
                formElements[node].style.border = failureBorder;
                success = false;
            } else {
                if (formElements[node].nextElementSibling)
                    formElements[node].nextElementSibling.style.display = 'none';
                formElements[node].style.border = successBorder;
            }
        }
    }

    if (!success) {
        return alert('Please fill all the missing fields');
    }

    const bodyObj = {}

    for (node in formElements) {
        if (formElements.hasOwnProperty(node)) {
            bodyObj[node] = formElements[node].value
        }
    }

    post('/employees/new', bodyObj);
})

function post(path, params, method = 'post') {
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}