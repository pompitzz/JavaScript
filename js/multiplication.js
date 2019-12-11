// var answer = x * y;
// var isAnswer = false;
// console.log(answer);
// while (!isAnswer) {
//     var num = prompt(String(x) + '곱하기' + String(y) + '의 답은 ?');
//     if (Number(num) === answer) {
//         alert("정답");
//         isAnswer = true;
//     } else {
//         alert("틀렸습니다.");
//     }
// }

var x = Math.ceil(Math.random() * 9) + 1;
var y = Math.ceil(Math.random() * 9) + 1;
var answor = x * y;

var word = document.createElement('div');
word.textContent = String(x) + "곱하기" + String(y) + "는?";
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
form.append(input);
var btn = document.createElement('button');
btn.textContent = '입력';
form.append(btn);
var result = document.createElement('div');
document.body.append(result);

btn.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(answor);
    if(answor === Number(input.value)){
        result.textContent = "정답";
        x = Math.ceil(Math.random() * 9) + 1;
        y = Math.ceil(Math.random() * 9) + 1;
        answor = x * y;
        input.value = '';
        input.focus();
    }else{
        result.textContent = "땡";
        input.value = '';
        input.focus();
    }
});



