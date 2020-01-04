### 스코프
var는 선언한 함수 내부에서만 유효하여 펑션 스코프라고 부른다.
```js

var x = 'abs';

function ex(){
  var x = 'aaa';
  x = 'change';
}

ex();
window.alert(x); // --> abs 출력

var x = 'abs';

function ex(){
  x = 'aaa';
  x = 'change';
}

ex();
window.alert(x); // --> abs -> aaa -> change 출력
```

### 스코프 체인
```js
var name = 'james';

function outer() {
  console.log('outer', name);
  function inner() {
    var enermy = 'nero';
    console.log('inner', name);
    // 현재 함수에 name이 없으면 한 단계 올라가서 찾고 또 없으면 한 단계 올라가서 찾는것을 반복한다.(스코프 체인)
  }
  inner();
}

outer();
console.log(enermy); // inner 함수 내에서 선언한 enermy뿐이라서  enermy is not defiend 에러가 발생한다.
```
### 렉시컬(정적) 스코프(스코핑)
코드가 적힌 순간 스코프가 정해는 것을 **렉시컬 스코프** 라고 한다.
JS가 다이나믹하다지만 스코프만은 정적이다.
정적 스코프를 이용하면 비밀 변수를 활용할 수도 있다(?)
```js
var name = 'james';
function log(){
  // 여기엔 var name이 없으므로 상위 name이 항상 출력될 것이다.
  // 즉 무슨일이 있어도 여기 name은 어떠한 영향도 받지 않는다.
  console.log(name);
}

function wrapper(){
  name = 'nero';
  log();
}
wrapper(); // nero가 출력

//================================================================================ //

var name = 'james';
function log(){
  // 여기엔 var name이 없으므로 상위 name이 항상 출력될 것이다.
  console.log(name);
}

function wrapper(){
  var name = 'nero';
  log();
}
wrapper(); // james가 출력

//================================================================================ //

var name = 'james';
function outer(){
  console.log('outer', name);
  function inner(){ // 함수도 렉시컬 스코프가 적용되어서 이 inner는 최상위 외부에선 선언이 불가능 하다.
    var enermy = 'nero';
    console.log('inner', name);
  }
  inner();
}

outer();
```
