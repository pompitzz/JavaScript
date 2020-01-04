// 지뢰 위치 정하기
const tbody = document.querySelector('#table tbody');
const dataset = [];

document.querySelector('#exec').addEventListener('click', () => {
    tbody.innerHTML = '';
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);


    console.log(hor, ver, mine);

    const game = Array(hor * ver)
        .fill() // undefiend로 채우고 map으로 값을 넣어줌
        .map((value, index) => index);

    const shuffle = [];

    while (game.length > (hor * ver) - mine) {
        /* splice와 slice
            - splice: 기존배열을 자르고, 잘려진 배열 반환
            - slice: 기존배열을 그대로 두고, 잘려진 배열 반환
        */
        const randomValue = game.splice(Math.floor(Math.random() * game.length), 1)[0];
        shuffle.push(randomValue);

    }


    // 테이블 세팅
    for (let i = 0; i < ver; i++) {
        const arr = [];
        const tr = document.createElement('tr');
        dataset.push(arr);
        for (let j = 0; j < hor; j++) {
            arr.push(j);
            const td = document.createElement('td');

            /* 오른쪽 클릭시 그 위치를 알아낸다.
               - 그 위치의 textContent의 값을 바꾸고 dataset도 세팅한다.
            */
            td.addEventListener('contextmenu', e => {
                e.preventDefault();
                const parentNodeTr = e.target.parentNode;
                const parentNodeBody = e.target.parentNode.parentNode;
                const col = Array.prototype.indexOf.call(parentNodeTr.children, td);
                const row = Array.prototype.indexOf.call(parentNodeBody.children, tr);
                console.log(row, col);


                if (e.target.textContent === '' || e.target.textContent === 'X') {
                    e.target.textContent = '!';
                } else if (e.target.textContent === '!') {
                    e.target.textContent = '?';
                } else if (e.target.textContent === '?') {
                    e.target.textContent = '';
                    if (dataset[row][col] === 'X') {
                        e.target.textContent = 'X';
                    } else {
                        e.target.textContent = '';
                    }
                }

            });

            // 클릭시 동작구현
            td.addEventListener('click', e => {
                const parentNodeTr = e.target.parentNode;
                const parentNodeBody = e.target.parentNode.parentNode;
                const col = Array.prototype.indexOf.call(parentNodeTr.children, td);
                const row = Array.prototype.indexOf.call(parentNodeBody.children, tr);
                if (dataset[row][col] === 'X') {
                    e.target.textContent = '펑';
                } else {
                    // 지뢰가 아닐 경우 지뢰의 개수를 반환한다.
                    // col - 1은 값이 없어도 에러가 나지 않으므로 무시했다.
                    let adjacent = [dataset[row][col - 1], dataset[row][col + 1]];
                    if (dataset[row - 1]) {
                        adjacent = adjacent.concat(dataset[row - 1][col - 1], dataset[row - 1][col], dataset[row - 1][col + 1]);
                    }
                    if (dataset[row + 1]) {
                        adjacent = adjacent.concat(dataset[row + 1][col - 1], dataset[row + 1][col], dataset[row + 1][col + 1]);
                    }
                    e.target.textContent = adjacent.filter(v => v === 'X').length;
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰 심기
    for (let i = 0; i < shuffle.length; i++) {
        const row = Math.floor(shuffle[i] / 10);
        const col = shuffle[i] % 10;
        tbody.children[row].children[col].textContent = 'X';
        dataset[row][col] = 'X';
    }

});

tbody.addEventListener('contextmenu', e => {
    // e.target; <td></td> -> 실제로 발생하는 타겟
    // e.currentTarget: <tbody></tbody> -> 이벤트 리스너를 단 대상

});