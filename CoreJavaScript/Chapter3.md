# this
보통 대부분의 객체지향 언어에서는 this는 클래스로 생성한 인스턴스 객체를 의미한다. 클래스에서만 사용하기 때문에 혼란이 적다

하지만 JS에서는 this를 어디서든 사용할 수 있다.

함수와 객체(메서드)의 구분이 느슨한 JS에서 this는 실질적으로 이 둘을 구분하는 거의 유일한 기능이다.

### 상황에 따라 달라지는 this
JS에서 this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정됩니다.

실행 컨텍스트는 함수를 호출할 때 생성되므로 즉 this는 함수를 호출할 때 결정 된다.

#### 1. 전역 공간에서의 this
전역공간에서 this는 전역 객체를 가르킨다.
전역 객체는 JS 런타임 환경에 따라 다른 이름과 정보를 가지고 있다.

브라우저환경에서는 window이고 Node.js 환경에서는 global이다.

```js
console.log(this);
console.log(window);
console.log(this == window); // true

// 전역변수를 선언하면 자바스크립트 엔진은 이를 전역 객체의 프로퍼티로 할당한다.
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); // 1
```
왜냐하면 JS의 모든 변수는 실은 **특정 객체의 프로퍼티** 로서 동작하기 떄문이다.
<br>

```js
var a = 1;
delete window.a; // false

window.c = 3;
delete window.c; // true

// delete 연산을 할때 var로 선언하면 삭제가 안된다.
// 사용자가 의도치않게 삭제하는 것을 방지
```

#### 2. 메서드로서 호출할 때 그 메서드 내부에서의 this
**함수 vs 메서드**
어떤 함수를 실행하는 방법은 함수로서 호출, 메서드로서 호출하는 방법이 있다.
함수와 메서드를 구분하는 차이는 **독립성** 이다.

함수는 그 자체로 독립적인 기능을 수행하나, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다.

```js
// 함수로서, 메서드로서 호출

var func = function(x) {
  console.log(this, x);
};
func(1); // Window { ... } 1
// 함수로서 호출

var obj = {
  method: func
};

obj.method(1); // { method:f } 1
// 메서드로서 호출
```
여기에서 볼수 있듯이 함수호출은 그 자체로 호출한거고 메서드 호출은 obj.method 형태로 호출하는 것이다.

<br>

**메서드 내부에서의 this**
this에는 호출한 주체의 정보가 담긴다. 그러므로 메서드로 호출하면 호출한 객체가 this에 담긴다.
```js
// 메서드 내부에서의 this
var obj = {
  methodA: function() {console.log(this);}
  inner: {
    methodB: function() {console.log(this);}
  }
};

obj.methodA(); // { methodA: f, inner: { ... }} === obj
obj['methodA'](); // 이렇게도 호출 가능

obj.inner.methodB();  // { methodB: f} === inner
obj['inner'].methodB();
obj['inner'].['methodB']();

```
#### 3. 함수로서 호출할 때 그 함수 내부에서의 this
**함수 내부에서의 this**
어떤 함수를 호출할 경우 this가 지정되지 않는다. this에는 호출한 주체가 담기는데 함수는 주체를 명시하지 않기 때문이다.

this가 지정되지 않은 경우 전역 객체를 바라본다.
더글라스 크락포드는 이를 명백한 오류라고 지적한다.

**메서드 내부에서의 this**
```js
var obj1 = {
  outer: function(){
    console.log(this);
    var innerFunc = function(){
      console.log(this);
    }
    innerFunc(); // window
  }

  var obj2 = {
    innerMethod: innerFunc
  };
  obj2.innerMethod(); // obj2
}
obj1.outer(); // obj1
```
innerFunc(), obj2.innerMethod()는 같은 함수를 호출하지만 결과는 다르다.

this는 함수를 실행하는 당시의 주변환경이 아닌 오직 해당 함수를 호출하는 구문에 따라 달라진다.

<br>

**메서드 내부 함수에서의 this를 우회하는 방법**
this를 변수명으로 지정해서 사용하면 된다.
```js
var obj = {
  outer: function(){
    console.log(this);
    var innerFunc1 = function(){
      console.log(this);
    };
    innerFunc1();

    var self = this;
    var innerFunc2 = function(){
      console.log(self);
    }
    innserFunc();
  }
};
obj.outer();
```

**this를 바인딩하지 않는 함수**
ES6에서는 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 화살표 함수를 새로 도입했다. 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 사용할수 있다.
```js
var obj = {
  outer: function(){
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    }
    innerFunc();
  }
};
obj.outer();
```

#### 4. 콜백 함수 호출시 그 함수 내부에서의 this
함수 A의 제어권을 다른 함수 B에게 넘겨주는 경우 함수 A를 콜백함수라고 한다.

이때 함수 A는 함수 B의 내부 로직에 따라 실해되며 this 역시 함수 B 내부로직에서 정한 규칙에 따라 결정된다.

콜백 함수도 함수이기 때문에 this 전역 객체를 참조하지만 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우는 아니다.

```js
setTimeout(function () {console.log(this);}, 300); // 전역객체

[1, 2, 3].forEach(function (x) { // 전역객체
  console.log(this, x);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a')
  .addEventListener('click', function(e) { // this = querySelector
    console.log(this, e);
  })

//setTimeout, forEach는 내부에서 콜백함수를 호출할 때
// 대상이 될 this를 지정하지 않으므로 전역객체를 바라본다.

//addEventListener는 호출할 때 자신의 this를 상속하도록 되어있다.
```
콜백함수는 위와같이 this를 명확하게 정의할 수 없다. 콜백 함수의 제어권을 가지는 함수(메서드)가 콜백 함수의 this를 결정한다.

#### 5. 생성자 함수 내부에서의 this
Js는 함수에 생성자로서의 역할을 함께 부여하였기 때문에 new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작한다.

생성자 함수로서 호출이 되면 내부에서의 this는 새로만들어진 인스턴스가 된다.
```js

var Cat = function(name, age){
  this.bark = "야옹",
  this.name = name;
  thos.age = age;
}
// new로 생성했기 때문에 내부 this가 자기자신을 바라보게 됨
var choco = new Cat('초코', 1);
var nabi = new Cat('나비', 3);

console.log(choco, nabi);
```

### 명시적으로 this를 바인딩 하는방법
#### 1. call 메서드
메서드의 호출 주체인 함수를 즉시 실행하도록하는 명령어.
call 메서드의 첫번째 인자를 this, 이후 인자를 호출함수의 매개변수로 둔다.
```js
Function.prototype.call(thisArg[, arg1[, arg2[...]]]);
```
```js
var func = function(a, b, c){
  console.log(this, a, b, c);
};

func(1, 2, 3); // window, 1, 2 ,3
func.call({x:1}, 2, 3, 4); // {x:1}, 2 ,3 ,4
```

```js
// 객체의 메서드에 call하면 객체를 참조하지 않고 call을 참조
var obj = {
  a: 1,
  method: function(b, c){
    console.log(this.a, b, c);
  };

  obj.method(2,3); // 1, 2, 3
  obj.method.call({x:3}, 1, 2) // 3, 1, 2
}
```

<br>

#### 2. apply 메서드
apply 메서드는 call 메서드와 기능적으로 동일하다.
apply는 두번째 인자를 배열로 받아서 사용하는 것일 뿐이다.
```js
Function.prototype.apply(thisArg[, argsArray]);
```
```js
var func = function(a, b){
  console.log(this, a, b);
};
func.apply({x: 2}, [3, 4]); // {x : 2}  3 4
```

<br>

#### 3. call / apply 메서드 활용
**유사배열 객체에 배열 메서드 적용**
키가 0 또는 양의 정수인 프로퍼티가 존재하고 length 프로퍼티 값이 0또는 양의정수인 객체를 유사배열 객체라고 한다.
```js
var obj = {
  0: 'a',
  1: 'b',
  length: 2
};
Array.prototype.push.call(obj, 'c');
console.log(obj); // {0: 'a', 1: 'b', 2:'c', length: 3}

var arr = Array.prototype.slice.call(obj);
// slice는 배열을 받는데 아무것도 넘기지 않으면 원본 배열의 얇은 복사본을 반환한다.

console.log(arr); // {'a', 'b', 'c'}
```
```js
function a(){
  var argv = Array.prototype.slice.call(arguments);
  // 함수 내부에서 접근 가능한arguments도 유사배열 객체이다.
  argv.forEach(function (arg){
    console.log(arg);
  })
}
a(1, 2, 3);

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
var nodeList = document.querySelectorAll('div');

var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function(node){
  console.log(node);
})
```

<br>

문자열도 가능하지만 문자열의 길이는 프로퍼티가 읽기 전용이므로 길이를 변경하는 push, pop, shift, unshift, splice등은 에러를 던진다.
```js
var str = 'ab d';

Array.prototype.push.call(str, ' push');
// Cannot assign to read only property 'length' of object '[object String]'

Array.prototype.concat.call(str, 'st'); // [String{"ab d"}, "st"]

Array.prototype.every.call(str, function (c) {return char !== '';}); // false

Array.prototype.some.call(str, function (c) {return char !== '';}); // true

var newArr = Array.prototype.map.call(str, function(c){return char + '!';})
console.log(newArr); // {'a!', 'b!', '!', 'd!'}
```
call/apply로 형변환하는 것은 본래의 의도와는 다소 동떨어진 방법이다. slice는 배열 형태로 복사하기 위해 차용된것이다.

이에 ES6은 유사배열객체 또는 순회가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.form메서드를 새로 도입했다.

```js
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
var arr = Array.form(obj);
console.log(arr); // [a, b, c]
```

**생성자 내부에서 다른 생성자를 호출**
call, apply를 이용하면 다른 생성자를 간단하게 호출할 수 있다.
```js
function Person(name, gender){
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school){
  Person.call(this, name, gender);
  this.school = school;
};

function Employee(name, gender, company){
  Person.apply(this, [name, gender]);
  this.company = company;
};

var by = new Student('aaa', 'bbb', 'ccc');
var by = new Employee('aaa', 'bbb', 'ccc');
```

**여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply**
```js
var numbers = [10, 20, 3, 16, 45];
var max = min = numbers[0];
numbers.forEach(function(n){
  if(n > max){
    max = n;
  }
  if (n < min) {
    min = n;
  }
});
console.log(max, min);

// =============================== 위를 아래와 같이 간단하게 구현 가능  ================================ //

var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);
console.log(max, min);

// ============ ES6 펼치기 연산자(spread operator)를 사용하면 더 간단  ============ //

const numbers = [10, 20, 3, 16, 45];
const max = Math.max(...numbers);
const min = Math.min(...numbers);
console.log(max, min);
```
call/apply 메서드는 명시적으로 별도의 this를 바인딩하면서 함수 또는 메서드를 실행하는 훌륭한 방법이지만 this를 예측하기 어렵게 한다.
그러나 ES5 이하의 환경에서는 마땅한 대안이 없기때문에 실무에서 많이 활용된다.

#### 4. bind 메서드
ES5의 기능으로 call과 비슷하지만 즉시 호출하지는 않고 넘겨받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드이다.
```js
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]]);
```
```js
var func = function(a, b,c){
  console.log(this, a, b, c);
};
func(1, 2, 3); // window, 1, 2 ,3

var bind = func.bind({x:1});
bind(1, 2, 3); // {x:1}, 1, 2, 3

var bind2 = func.bind({x:1}, 2, 3);
bind2(4); // {x:1}, 2, 3, 4
```

**name 프로퍼티**
bind된 함수는 name 프로퍼티 앞에 bound가 붙는다.
```js
var func = function(a, b, c, d){
  console.log(this, a, b, c, d);
}

var bind = func.bind({x:1});
console.log(func.name); // func
console.log(bind.name); //bound func
```

**상위 컨텍슽의 this를 내부함수나 콜백 함수에 전달**
var self = this대신 bind, call을 통해 문제를 해결할 수 있다.
```js
// ================ call ================ //
var obj = {
  outer: function(){
    console.log(this);
    var innerFunc = function(){
      console.log(this);
    };
    innerFunc.call(this);
  }
}

// ================ bind ================ //
var obj = {
  outer: function(){
    console.log(this);
    var innerFunc = function(){
      console.log(this);
    }.bind(this);
    innerFunc());
  }
}

// ============ 콜백함수 bind 활용 ============ //
var obj = {
  logThis: function(){
    console.log(this);
  },
  logThisLater1: function(){
    setTimeout(this.logThis, 500);
  },
  logThisLater2: function(){
    setTimeout(this.logThis.bind(this), 1000);
};
}

obj.logThisLater1(); // window { ... }
obj.logThisLater2();// {logThis: ƒ, logThisLater1: ƒ, logThisLater2: ƒ}
```

#### 5.화살표 함수의 예외사항
ES6에서 도입된 화살표 함수는 실행 컨텍스트 생성 시 this를 바인딩하는 과정에 제외되었다. 즉 이 함수 내부에서는 this가 아예없고 접근하고자 하면 스코프체인상 가까운 this에 접근한다.
```js
var obj = {
  outer: function() {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc();
  }
};
obj.outer(); // {outer: f}, {outer: f}
```

#### 6. 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)
콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this로 지정할 객체를 인자로 지정할 수 있는 경우가 있다.

이런형태는 여러 내부 요소에 의해 같은 동작을 반복 수행해야하는 **배열 메서드** 에 많이 포함되어 있다.

ES6의 Set, Map 등의 메서드에도 일부 존재한다.
```js
var report = {
  sum: 0,
  count: 0,
  add: function(){
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry){
      this.sum += entry;
      ++this.count;
    }, this);
  },
  average: function(){
    return this.sum / this.count;
  }
};
report.add(60, 85, 95);
console.log(report.sum, report.count, report.averate()); // 240 3 80
```

<br>

콜백 함수와 함께 thisArg를 인자로 받는 메서드들
```js
Array.prototype.forEach(callback[, thisArg])
Array.prototype.map(callback[, thisArg])
Array.prototype.filter(callback[, thisArg])
Array.prototype.some(callback[, thisArg])
Array.prototype.every(callback[, thisArg])
Array.prototype.find(callback[, thisArg])
Array.prototype.findIndex(callback[, thisArg])
Array.prototype.flatMap(callback[, thisArg])
Array.prototype.from(callback[, thisArg])
Set.prototype.forEach(callback[, thisArg])
Map.prototype.forEach(callback[, thisArg])
```

### 정리
#### this 바인딩이 없는 한 늘 성립하는 것들
전역 공간에서의 this는 전역객체(window or global)를 참조한다.

어떤 함수를 메서드로서 호출한 경우 this는 메서드 호출 주체를 참조한다.

어떤 함수를 함수로서 호출한 경우 this는 전역 객체를 참조한다. 메서드 내부의 함수도 동일하다

콜백 함수 내부에서의 this는 해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따라 다르며, 정의하지 않은 경우엔 전역객체를 바라본다.

생성자 함수에서의 this는 생성될 인스턴스를 참조한다

#### 명시적 this 바인딩, 위 규칙에 부합하지 않으면 이것을 통해 예측해보자
call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드를 호출한다.

bind메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다.

요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 한다.
