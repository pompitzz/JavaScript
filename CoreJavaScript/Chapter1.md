# 데이터 타입
기본형은 값이 담긴 주솟값을 복제하고,
참조형은 값이 담긴 주솟값들로 이루어진 묶음을 가리키는 주솟값을 복제한다.
| Primitive type | Reference type |
| :-- | :-- |
| Numver, String, Boolean, null, <br> undefined, Symbol | Array, Function, Date, RegExp, <br> Map, WeakMap, Set, WeakSet  |

### 변수와 식별자
변수는 변할수 있는 무언가로 데이터를 말한다. 숫자, 문자열, 객체, 배열 모두 데이터이다.
식별자는 어떤 데이터를 식별하는데 사용하는 이름, 즉 **변수명** 이다.
JS는 숫자형 데이터 모두에대해 8바이트(64비트)를 부여한다

#### 불변값
```js
var x = 'qwe';
// 이렇게 하면 예를들어 주소 10에 이름 : a, 값 : @303 이 있고
// 주소 303에 값: 'qwe'가 있다.

// 이렇게 변수 영역에 값을 직접 저장하지 않고 그 값의 주소를
// 저장하는 이유는 문자열의 데이터는 바이트가 가변적이므로
// 중간에 메모리 영역을 늘리기가 힘들기 때문에 따로 데이터 영역을 둔 것이다.

x = 'asd';
// 이렇게 값을 바꾸면 304 주소에 'asd'를 넣고 변수는 그 주소를 바라본다.
// 'qwe'는 가비지 컬렉터에의해 수거 된다.
```
만약 3을 값으로 가지는 변수가 500개 있다고 하자. 이럴 때 변수와 데이터를 분리하지 않으면 8 * 500 바이트를 써야할 것이다. 하지만 변수와 데이터를 분리하면 변수사이즈 * 500 바이트만 쓰면 된다.

기본형이 불변성을 가진다. 위에서 처럼 'qwe' => 'asd'를 바꿀 때 새로운 주소에 'asd' 값을 넣고 그 곳을 바라보는 것이지 'qwe' 값을 직접 바꾸는게 아니고 그 값은 항상 그 주소에 존재하고 사용하지 않으면 삭제된다.

#### 가변값

```js
var obj = {
  a: 1,
  b: 'asd'
};
```
변수영역: 주소: 102, 데이터{이름: obj, 값: 503}

데이터 영역: 주소 503, 데이터{701 ~ ?} // 동적으로 할당하므로 ? 이다.

객체 503의 변수 영역:
---> 주소: 701, 데이터:{이름: a, 값: 505}
---> 주소: 702, 데이터:{이름: b, 값: 506}

데이터 영역
---> 주소: 505, 데이터: 1
---> 주소: 506, 데이터: 'asd'

이렇게 가변값은 참조되므로 객체 503의 변수영역은 그 값이 변화면 주소 값을 바꾸면 되므로 변적이다.

```js
var obj = {
  a: 1,
  arr: [ 3, 4, 5]
};
obj.arr = 'asd';
```
이렇게 배열을 String으로 재할당하면 arr의 값은 'asd'의 주소를 가지게 될것이고 이전의 arr 배열의 인덱스 주소와 데이터들은 삭제된다.

#### 변수 복사
```js
var a = 10;
var b = a;

var objA = { c; 30, d:'asd'};
var objB = objB;
```
기본형, 참조형 둘 다 같은 주소를 바라본다. 하지만 기본형은 그 값이 변경될 때 변수의 값이 다른 주소를 바라보게 되므로 서로다른 값을 가질 수 있다.
하지만 참조형은 값이 변경되면 변수의 주소값은 그대로 있고 그 변수의 주소값의 데이터 주소값이 변경되므로 서로 같은 값을 가지게 될 것이다.

JS의 모든 데이터 타입은 참조형이다. 하지만 기본형은 한번의 참조만 이루어지고 참조형은 한 단계 더 거치게 된다.

#### 불변 객체
불변 객체는 JS에서 매우 중요한 개념이다.
```js
var user = {
  name : 'james',
  age : 3,
};

var changeName = function(user, newName) {
  var newUser = user;
  newUser.name = newName;
  return newUser;
}

var user2 = changeName('dexter');
// user2의 name이 변경될 때 user의 name도 변경된다.
// 이럴 때 불변 객체가 필요하다!!

// ================================ 불변 객체 만들기 1 ================================ //
var user = {
  name : 'james',
  age : 3,
};

var changeName = function(user, newName) {
  return {
    name: newName,
    age: user.age;
  }
};

var user2 = changeName('dexter');

// 이렇게 하면 불변 객체가 된다. 하지만 프로퍼티 하나하나를 하드코딩 해야 한다.

// ================================ 불변 객체 만들기 2 ================================ //
var copyObject = function (target) {
  var ret = {};
  for(var prop in target){
    ret[props] = targer[props];
  }
  return ret;
}
// for문을 이용하여 불변 객체를 만들 수 있다. 하지만 이런 방법은 user의 프로퍼티가 객체라면 그 값은 중복된다.
var user = {
  name: 'james',
  urls: {blog: 'asdasdasd'}
};

var user2 = copyObject(user);

user2.urls.blog = 'qwdqwd';
// user1.urls.blog도 값이 같이 변경된다.

var user2 = copyObject(user);
user2.urls = copyObject(user.urls);
// 이렇게 하면 됨. 이 것을 활용하여 새로운 함수를 만들어보자


// ================================ 불변 객체 만들기 3 ================================ //
var copyObjectDeep = function (target) {
  var ret = {};
  if (typeof target == 'object' && target !== null) {
    for (var prop in target){
      ret[prop] =  copyObjectDeep(arget[prop]);
    }
  }else {
    return target;
  }

  return ret;
}

// target !== null을 붙인 이유는 JS는 null의 typeof를 object로 반환한다.

// ================================ 불변 객체 만들기 4 ================================ //
var copyObjectViaJSON = function (target){
  return JSON.parse(JSON.stringify(target));
}
// 객체를 JSON으로 바꾸고 다시 객체로 바꾸면 불볍 객체를 간단하게
// 만들수 있지만 메서드의 함수나, 숨겨진 프로퍼티 getter, setter 등은 안됨
// httpRequest로 받은 데이터를 저장한 객체를 복사할 떄와 같이 순수한 정보만 다룰 떄 유용
```
<br>
#### undefined와 null
undefiend의 해당사항 3가지
- 값을 대입하지 않은 변수, 즉 데이터 영역의 메모리 주소를 지정하지 않은 **식별자에 접근할 때**
- 객체 내부의 존재하지 않는 프로퍼티에 접근할 때
- return 문이 없거나 호출되지 않은 함수의 실행 결과
```js
var a;
console.log(a); // 값을 대입하지 않은 변수에 접근 했으므로 undefined

var obj = {a: 1};
console.log(obj.c); // 존재하지 않은 프로퍼티에 접근 했으므로 undefined

var func = function() {};
console.log(func()); // return 없는 함수에 접근했으므로 undefined
```

직접 할당한 undefined는 순회를 하지만 js에서 만들어주는 undefined는 순회를 하지 않는다.
그냥 직접 undefined를 할당할 떄는 null을 쓰자..
```js
var arr1 = [];
arr1.length = 3; // [empty * 3] 이 된다. 순회 적용
var arr2 = new Array(3); // 위와 동일


var a; // 이때는 undefined가 아니다. 이 값에 접근할 때 undefined를 할당한다.
```
