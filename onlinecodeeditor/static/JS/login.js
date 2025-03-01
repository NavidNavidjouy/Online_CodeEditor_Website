function captchaCode(){
  
    let captchaText = document.querySelector('#captcha');
    var ctx = captchaText.getContext("2d");
    ctx.font = "30px Roboto";
    ctx.fillStyle = "#";
    let userText = document.querySelector('#textBox');
    let submitButton = document.querySelector('.animated-button');
    let output = document.querySelector('#output');
    let refreshButton = document.querySelector('#refreshButton');
    let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let emptyArr = [];
    for (let i = 1; i <= 7; i++) {
      emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    var c = emptyArr.join('');
      ctx.fillText(emptyArr.join(''),captchaText.width/4, captchaText.height/2);
    userText.addEventListener('keyup', function(e) {
    
    if (e.keyCode === 13) {
    if (userText.value === c) {
      output.classList.add("correctCaptcha");
      output.innerHTML = "Correct!";
    } else {
      output.classList.add("incorrectCaptcha");
      output.innerHTML = "Incorrect, please try again";
    }
    }
    });
    submitButton.addEventListener('click', function(event) {
      if (userText.value === c) {
        output.innerHTML = "";
      }else if(userText.value === '') {
        output.innerHTML = "Please enter complete information";
        event.preventDefault();
      }else {
        output.innerHTML = "The security code is not correct";
        event.preventDefault();
      }
    });
    refreshButton.addEventListener('click', function() {
    userText.value = "";
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
      refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
      ctx.clearRect(0, 0, captchaText.width, captchaText.height);
      c = refreshArr.join('');
      ctx.fillText(refreshArr.join(''),captchaText.width/4, captchaText.height/2);
      output.innerHTML = "";
    });
    }
    
    function animation(){
      let all = document.querySelectorAll('*');
      if(window.innerWidth < 600){
        for (const a of all) {
        a.removeAttribute('data-aos')
        }
      }
      setTimeout(() => {
        for (const a of all) {
          a.removeAttribute('data-aos')
        }
      }, 2000)
    }
    
    
    function eye(){
      let x1 = 0;
      let x2 = 0;
      let eyeBtn1 = document.querySelector('.fa-eye1');
      let eyeBtn2 = document.querySelector('.fa-eye2');
      let input1 = document.querySelector('.input1')
      let input2 = document.querySelector('.input2')
      
    eyeBtn1.addEventListener('click', () => {
      if(x1 == 0){
        input1.setAttribute('type' , 'text');
        eyeBtn1.className = 'fa-regular fa-eye1 fa-eye-slash';
        x1++;
      }else{
        input1.setAttribute('type' , 'password');
        eyeBtn1.className = 'fa-regular fa-eye1 fa-eye'
        x1--;
      }
    })
    eyeBtn2.addEventListener('click', () => {
      if(x2 == 0){
        input2.setAttribute('type' , 'text');
        eyeBtn2.className = 'fa-regular fa-eye2 fa-eye-slash';
        x2++;
      }else{
        input2.setAttribute('type' , 'password');
        eyeBtn2.className = 'fa-regular fa-eye2 fa-eye';
        x2--;
      }
    })
    }
    
    
    
    captchaCode();
    eye();
    animation();