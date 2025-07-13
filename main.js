const SeeContent =document.getElementById('See-Content');
const passwordContainer = document.getElementById('password-container');
const passwordInput = document.getElementById('password-input');
const submitPassword = document.getElementById('submit-password');
const errorMessage = document.getElementById('error-message');


const SeeContent1 =document.getElementById('See-Content-1');
const passwordContainer1 = document.getElementById('password-container-1');
const passwordInput1 = document.getElementById('password-input-1');
const submitPassword1 = document.getElementById('submit-password-1');
const errorMessage1 = document.getElementById('error-message-1');

const correctpassword = "001@Thuli_$Deshan:T1-M:T";
const correctpasswords = "001@Thuli_$Deshan:T2-M:T";
const correctPassword = "002@Thuli_$Deshan:T1-S:T";

SeeContent.addEventListener('click', function(){
    passwordContainer.style.display = 'block';
});

submitPassword.addEventListener('click',function(){
    if(passwordInput.value === correctpassword){
        window.location.href ="Thanks_.html";
    }else{
        errorMessage.classList.remove('hidden1');
        passwordInput.value = '';
    }
});

passwordInput.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        submitPassword.click();
    }
});


SeeContent.addEventListener('click', function(){
    passwordContainer.style.display = 'block';
});

submitPassword.addEventListener('click',function(){
    if(passwordInput.value === correctpasswords){
        window.location.href ="Thanks_.html";
    }else{
        errorMessage.classList.remove('hidden1');
        passwordInput.value = '';
    }
});

passwordInput.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        submitPassword.click();
    }
});


SeeContent1.addEventListener('click', function(){
    passwordContainer1.style.display = 'block';
});

submitPassword1.addEventListener('click',function(){
    if(passwordInput1.value === correctPassword){
        window.location.href ="Thuli@Deshan_02.html";
    }else{
        errorMessage1.classList.remove('hidden2');
        passwordInput1.value = '';
    }
});

passwordInput1.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        submitPassword1.click();
    }
});
