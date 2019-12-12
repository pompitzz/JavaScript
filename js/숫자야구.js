/* 비동기란?
자바스크립트에서 **비동기**는 코드 상의 순서대로 실행되지 않는 코드를 의미한다.
addEventListenr는 비동기로 실행된다.
다양한 비동기를 알아본다.
 */
var body = document.body;
var arrNum;
var answer;
function getAnswer() {
    arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    answer = [];
    for (var i = 0; i < 4; i++) {
        // var poped = arrNum.pop(); // 마지막꺼 부터 뽑아간다.
        // var poped = arrNum.shift(); // 앞에꺼 부터 뽑아간다.
        // var poped = arrNum.shift(); // 앞에꺼 부터 뽑아간다.
        /*
        ceil 쓰면 안되고 splice는 원 배열의 값을 뺴는거기 때문에 인덱스 조정 필요
         */
        var a = Math.floor(Math.random() * (9 - i));
        var poped = arrNum.splice(a, 1)[0]; // a인덱스에서 한개 뽑기
        // answer.push(poped); // 뒤에 채운다 [1, 2, 3, 4]
        answer.unshift(poped); // 앞에 채운다 [4, 3, 2, 1]
    }
    console.log("정답 : " + answer);
}

getAnswer();
var result = document.createElement('h1');
body.append(result);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'text';
input.maxLength = 4;
form.append(input);
var button = document.createElement('button');
button.textContent = "입력!";
form.append(button);

var wrongCount = 0;

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var userAns = input.value;
    var joinAns = answer.join(''); // 배열을 문자로 합치기
    if (userAns === joinAns) {
        result.textContent = '홈런!';
        getAnswer();
        wrongCount = 0;
    } else {
        var userAnsArr = userAns.split('');
        var strike = 0;
        var ball = 0;
        wrongCount++;
        if (wrongCount > 10) {
            result.textContent = "10번 기회 끝 탈락! 정답은: " + userAnsArr.join('');
            getAnswer();
            input.value = '';
            wrongCount = 0;
        } else {
            for (var i = 0; i < 4; i++) {
                if (answer[i] === Number(userAnsArr[i])) {
                    strike += 1;
                } else if (answer.indexOf(Number(userAnsArr[i])) > -1) {
                    //[1, 2, 3, 4] 일때 arr.indexOf(3) = 2(index);
                    ball += 1;
                }
            }
            result.textContent = String(strike) + "스트라이크 " + String(ball) + "볼"
        }
    }
    input.focus();
    console.log(userAns)
});