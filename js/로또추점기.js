// var number = Array(45); // 빈 배열 만들기 , 너무 많을때만 사용
// /*
// 로그 쳐보면 empty * 45이다. empty는 반복문이 불가하다.
//  */
// console.log(number);
// var filled = number.fill(); // 이렇게 채워줘야 됨.
// /* forEach보다 map이 좋다?
// filled.forEach(function (val, index) {
//     filled[index] = index + 1;
// });
// */
// var map = filled.map(function (val, index) {
//     return index+1;
// });
// console.log(map);

// 위에 과정을 한번에 하기
var number = Array(45).fill()
    .map(function (val, index) {
        return index + 1
    });
console.log(number);

var random = [];

//for은 반복횟수를 정확히 알 때
//while은 반복횠수가 명확하지 않을 때  or 기준값이 계속 변화할 때
while (number.length > 0) {
    var index = Math.floor(Math.random() * number.length);
    var value = number.splice(index, 1)[0];
    random.push(value);
}
console.log(random);

var bonus = random[random.length - 1];
var result = random.slice(0, 6); // 0 ~ 5 까지 뽑아온다.
var asc = function (p, c) {
    return p - c;
};
console.log('당첨 숫자들 ', result.sort(asc), '보너스 ', bonus);
/*
var resultWindow = document.getElementById('result-window');
//클래스는 여러개 일수 있으니 index 붙여주자
var bonusWindow = document.getElementsByClassName('bonus-ball')[0];
*/

//getElement는 Class는 Elements고 헷갈림. 그래서 querySelector가 있음 이걸 추천ㅋ
var resultWindow = document.querySelector('#result-window');
var bonusWindow = document.querySelector('.bonus-ball');
ballStyle(bonusWindow, bonus);
for (var i = 0; i < result.length; i++) {
    // 시간차 두기, for문안에 비동기 함수(setTimeout함수)가 있으면 클로저 문제생김
    /*
    setTimeout(function () {
        var ball = document.createElement('div');
        ball.textContent = result[i];
        resultWindow.appendChild(ball);
    }, 1000);
    */
    ballStyle(resultWindow, result[i]);
}



function getBcColor(value) {
    var bcColor;
    if (value <= 10) {
        bcColor = 'red'
    } else if (value <= 20) {
        bcColor = 'orange'
    } else if (value <= 30) {
        bcColor = 'yellow'
    } else if (value <= 40) {
        bcColor = 'blue'
    } else{
        bcColor = 'green'
    }
    return bcColor;
}

function ballStyle(window, value) {
    var ball = document.createElement('div');
    ball.textContent = value;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '20px';  // border-radius -> borderRadius
    ball.style.width = '40px';
    ball.style.height = '40px';
    ball.style.lineHeight = '40px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px';
    ball.style.backgroundColor = getBcColor(value);
    ball.id = '공아이디' + value; // ID는 이렇게해도 들어감
    ball.className = '공아이디' + value; // class 는 className으로 해야한다.
    window.appendChild(ball);
}