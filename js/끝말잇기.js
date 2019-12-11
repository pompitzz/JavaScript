// var word = 'TEST';
//
// while (true){
//     var answer = prompt(word);
//     if (word[word.length - 1] === answer[0]){
//         alert("정답");
//         word = answer;
//     }else{
//         alert("땡");
//     }
// }

var body = document.body;
var word = document.createElement('div');
word.textContent = "TEST";
document.body.append(word);

/**
 * 엔터 기능 구현을 위해 form 태그 만든다
 * 새로고침 되니깐 설정필요
 */
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
// document.body.append(input);
form.append(input);
var button = document.createElement('button');
button.textContent = "입력!";
// document.body.append(button);
form.append(button);
var result = document.createElement('div');
// document.body.append(result);
form.append(result);

button.addEventListener('click', function (event) {

    //event를 매개변수로 받아서 이렇게 사용하면 새로고침 막아진다.
    event.preventDefault();
    /*
    tag안의 값들은 textContent이고 input 같은거는 value로 받는다.
    잘 모르겠으면 브라우저 Console에서 console.dir(document.body)로 확인하자
     */
    if(word.textContent[word.textContent.length - 1] === input.value[0]){
        result.textContent = "정답";
        word.textContent = input.value;
        input.value = '';
        input.focus();
    }else{
        result.textContent = "땡";
    }
});
