var array = [];
var firstN = document.querySelector("#fullName");
var email = document.querySelector("#email");
var phone = document.querySelector("#phone");
var subject = document.querySelector("#subject");
var comments = document.querySelector("#message");
const submitBtn = document.querySelector("#submitBtn");

function saveInfo() {
    array.unshift(firstN.value, email.value, phone.value, subject.value, comments.value);
    console.log(array);
    localStorage.setItem('Contact Info', JSON.stringify(array));
};

submitBtn.addEventListener('click', function() {
    saveInfo();
    // console.log(firstN.value, firstN.textContent);
    alert("Info is saved, thank you! (check local storage)");
});

function renderInfo() {
    var prevInfo = JSON.parse(localStorage.getItem('Contact Info'));
    if (prevInfo !== null) {
        array = prevInfo
        firstN.value = prevInfo[0];
        email.value = prevInfo[1];
        phone.value = prevInfo[2];
        alert("We've loaded your previous login info!");
    }
};

renderInfo();   