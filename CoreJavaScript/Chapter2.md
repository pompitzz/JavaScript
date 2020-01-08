# 실행 컨텍스트
> 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
> JS의 동적 언어로서의 성격을 가장 잘 파악할수 있는 개념이다.

```js
// ------------(1)
var a = 1;
function outer() {
  function inner() {
    console.log(a); // undefined인 이유는 js는 var를 위로 끌어 올림
    var a = 3;
  }
  inner(); // ------------(2)
  console.log(a); // 1;
}
outer(); // -------------(3)
console.log(a); // 1;

// 실행 컨텍스트의 콜스택에 (1) 전역 컨텍스트가 쌓이고  (2) outer가 쌓이고
// (3) inner가 쌓이고 inner가 실행되고 반대로 계속 타고 내려간다.
```

어떤 실행 컨텍스트가 활성화 될 때 JS 엔진은 해당 컨텍스트와 관련된 코드들을 실행하는 데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장한다.

실행 컨텍스트에 담기는 정보는 VariableEnvironment, LexicalEnvironment, ThisBinding이 있다.

### VariableEnvironment
LexicalEnvironment와 같지만 최초 실행 시의 스냅샷을 유지한다.

실행 컨텍스트를 생성할 때 VariableEnvironment에 정보를 담고 이를 그대로 LexicalEnvironment에 복사하고 이후에 LexicalEnvironment를 활용한다.

### LexicalEnvironment
VariableEnvironment와 LexicalEnvironment의 내부는 environmentRecord와 outer-EnvironmentReference로 이루어져 있다.

#### environmentRecord와 호이스팅
environmentRecord에는 현재 컨텍스트와 관련된 코드의 식별자 정보(매개변수, 함수, 변수 등)들이 저장된다.

>전역 실행 컨텍스트는 객체를 생성하는 대신 JS 구동환경이 제공하는 전역객체를 활용한다. 브라우저의 window, Node.js의 global 등이 있다. 이를  자바스크립트 내장객체가 아닌 호스트 객체로 부른다.

#### 호이스팅
변수 정보를 수집하는 과정을 쉽게 이해하기위해 붙여진 용어

#### 매개변수와 변수의 호이스팅
```js
function a(x){ // 매개변수 수집
  console.log(x);
  var x; // 변수 수집
  console.log(x);
  var x = 2; // 변수 수집
  console.log(x);
}

// =========== 위의 매개변수는 아래 처럼 변수로 취급할 수 있다 ========= //

function a() {
  var x = 1; // 변수 수집
  console.log(x);
  var x; // 변수 수집
  console.log(x);
  var x = 2; // 변수 수집
  console.log(x);
}

// ==== 호이스팅 하면 아래와 같은 형태가 될 것이다. ==== //

function a() {
  var x;
  var x; // 여기랑 아래 x는 이미 존재하므로 무시됨.
  var x;

  x = 1; // 메모리에 1을 할당하고 x는 그 주소를 본다
  console.log(x);
  console.log(x);
  x = 2; // 다른 메모리에 2을 할당하고 x는 그 주소를 보고 1은 제거
  console.log(x);
}
```
<br>

#### 함수 선언 호이스팅
```js
function a(){
  console.log(b);
  var b = 'asd';
  console.log(b);
  function b() {
  }
  console.log(b);
}
a();

// ============== 호이스팅 ============== //
function a(){
  var b;
  function b() {} // var b = functionb() {}

  console.log(b); // f b() {}
  b = 'asd';
  console.log(b); // asd
  console.log(b); // asd
}
```
#### 함수 선언문과 함수 표현식
```js
function a(){} // 함수 선언 문, 함수명 a가 곧 변수명이된다.
a();

var b = function (){} // 익명 함수 표현식, 변수명 b가 곧  함수명
b();

var c = function d(){} // 기명 함수 표현식, 변수명 c는 함수명은 d
// 기명은 옛날에 함수 추적시 디버깅에 유리했다.
// 왜냐하면 익명은 함수명이 나오지 않아서이다.
// 하지만 현재는 익명도 알려주므로 굳이 사용할 필요가 없다.

c(); // 실행 가능
d(); // 에러
```
```js
console.log(sum(1,2));
console.log(multiply(3,4));

function sum(a, b){
  return a + b;
}

var multiply = function (a, b){
  return a * b;
}

// ============================== 호이스팅 ============================== //

var sum = function sum(a,b){
  return a + b;
};
var multiply;

console.log(sum(1,2));
console.log(multiply(3,4));

multiply = function(a,b){
  return a * b;
}
// 함수 선언식은 호이스팅 시 함수도 같이 올라가나 함수 표현식은 그렇지 않다.
```
함수 선언식이 더 유연해 보이지만 실무에선 위험하다. 만약 sum을 함수 표현식으로 한번 더 선언하면 sum을 호출한 모든 값이 새로 선언한 sum을 바라보게 될것이다.


#### 스코프, 스코프 체인, outerEnvironmentReference
스코프란 식별자에 대한 유효 범위이다.
ES5 까지는 특이하게 전역공간을 제외하면 오직 함수에 의해서만 스코프가 생성되었다.

ES6는 블록에 의해서도 스코프 경계가 생겨날 수 있다. 단 let, const, class 등에서만 가능하다.

이로서 함수 스코프와, 블록 스코프라는 용어가 구분되었다.

식별자가 정해진 후 식별자의 유효범위를 안에서부터 바깥으로 차례로 검색해 나가는 것을 **스코프 체인** 이라고 한다.

이를 가능하게 하는 것이 LexicalEnvironment의 두번째 수집 자료인 outerEnvironmentReference이다.

#### 스코프 체인
outerEnvironmentReference는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조한다.

즉 A 함수 내부에 B 함수를 선언하고 B함수 내부에 C를 선언했을 때 C의 outerEnvironmentReference는 B의 LexicalEnvironment를 참조하게 될 것이다. B의 outerEnvironmentReference는 A의 LexicalEnvironment를 참조하게 될것이고 A의 outerEnvironmentReference는 전역 컨텍스트의 LexicalEnvironment를 참조하게 될 것이다.

이러한 구조적 특징 때문에 **스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근이 가능하다**

```js
1 var a = 1;
2 var outer = function() {
3  var inner = function() {
4     console.log(a);
5     var a = 3;
6   };
7   inner();
8  console.log(a);
9 }
10  outer();
11 console.log(a);
```
시작: 전역 컨텍스트 활성화, 전역 컨텍스트의 environmentRecord={a, outer}와 같이 식별자 지정. 전역 컨텍스트의 outerEnvironmentReference에는 아무것도 없음.(this : 전역객체)

1, 2 : 전역 스코프에 있는 변수 a, outer에 각각 할당

10 : outer 함수 호출, outer의 함수로 이동, 전역 실행 컨텍스트 일시 정지

2 : outer의 실행 컨텍스트의 environmentRecord={inner} 식별자 저장, outerEnvironmentReference에는 outer가 선언될 당시의 전역 컨텍스트의 LexicalEnvironment가 담긴다. [GROBAL, {a, outer}] 이런식으로 표기됨

3 : outer 스코프에 있는 변수 inner에 함수를 할당

7 : inner 함수 호출, inner 함수로 이동, outer 실행 컨텍스트 일시 정지

3 : inner의 environmentRecord={a} 식별자 저장, outerEnvironmentReference에는 inner가 선언될 당시의 outer의 LexicalEnvironment, { outer, { inner }}를 복사한다.

4 : a에 접근하기 위해 environmentRecord 검색, a가 발견 했지만 값이 없으므로 undefined

5 : inner 스코프 a에 3을 할당

6 : inner 종료, inner의 실행 컨텍스트가 콜 스택에서 제거된 후 바로 아래에 있는 outer 실행 컨텍스트가 다시 활성화

8 : outer의 a식별자에 접근하려고 한다. outer의 environmentRecord에서 a를 찾음, a가 없으므로 outerEnvironmentReference에서 찾는다. outerEnvironmentReference에 a가 있으니 그값을 출력

9 : outer 함수 종료, outer 실행 컨텍스트가 콜 스택에서 제거 된 후 전역 컨텍스트 활성화

11 : 전역 컨텍스트의 environmentRecord에서 a를 찾은 후 출력 후 콜스택에서 제거 된다.

inner 내부에서 변수 a를 선언했기 때문에 외부의 변수에 접근이 불가능하다.
이것을 **변수 은닉화** 라고 한다.

### ThisBinding
실행 컨텍스트의 ThisBinding에는 this로 지정된 객체가 저장된다. 실행 컨텍스트가 활성화 당시에 this가 지정되지 않으면 this는 전역 객체가 된다. Chapter3에서 자세히 다룬다.
