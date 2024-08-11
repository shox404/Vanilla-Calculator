let writableBtns = document.querySelectorAll(".writable");
let input = document.getElementById("input");
let clearBtn = document.getElementById("clearBtn");
let backspaceBtn = document.getElementById("backspaceBtn");
let equalBtn = document.getElementById("equalBtn");
let colors = document.querySelectorAll(".color")
let methods = document.querySelectorAll(".method")

input.focus();

function isNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
}

function query(key, property) {
    let params = new URLSearchParams({ [key]: property });
    params.toString();
    window.location.href = window.origin + "?" + params;
}

function customize(color) {
    equalBtn.style.background = color;
    methods.forEach((item) => {
        item.style.color = color;
    });
}

window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const color = urlParams.get('color');
    customize(color);
});

writableBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        input.scrollTo({
            left: input.scrollWidth
        })
        if (input.value.length > 0) {
            if (isNumber(input.value.at(-1)) && isNumber(e.target.innerText)) {
                return input.value = input.value + e.target.innerText;
            }
            if (isNumber(input.value.at(-1)) && !isNumber(e.target.innerText)) {
                return input.value = input.value + e.target.innerText;
            }
            if (!isNumber(input.value.at(-1)) && isNumber(e.target.innerText)) {
                return input.value = input.value + e.target.innerText;
            }
            if (!isNumber(input.value.at(-1)) && !isNumber(e.target.innerText)) {
                return input.value = input.value.slice(0, -1) + e.target.innerText;
            }
        } else {
            return input.value = (!Number(e.target.innerText) ? "0" : "") + input.value + e.target.innerText;
        }
    });
});

clearBtn.addEventListener("click", () => {
    return input.value = "";
});

backspaceBtn.addEventListener("click", () => {
    return input.value = input.value.slice(0, -1);
});

equalBtn.addEventListener("click", () => {
    let value = input.value.replace("÷", "/").replace("×", "*");
    return input.value = eval(value);
});

colors.forEach((color) => {
    color.addEventListener("click", (event) => {
        query("color", event.target.classList[1]);
        customize(event.target.classList[1]);
    });
});