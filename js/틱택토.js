var body = document.body;
var table = document.createElement('table');
var lines = [];
var cells = [];
var turn = 'X';
/*
    tag들도 배열에 넣어서 사용할 수 있다.
    cells들은 tr, td의 2차원 배열로 이루어져 있다.
 */
var isWinner = function (lineNum, cellNum) {
    // 가로줄 검사
    if (cells[lineNum][0].textContent === turn &&
        cells[lineNum][1].textContent === turn &&
        cells[lineNum][2].textContent === turn) {
        return true;
    }
    //세로줄 검사
    if (cells[0][cellNum].textContent === turn &&
        cells[1][cellNum].textContent === turn &&
        cells[2][cellNum].textContent === turn) {
        return true;
    }
    //대각선 검사
    if (lineNum === cellNum) {
        if (cells[0][0].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][2].textContent === turn
        ) {
            return true;
        }
    }
    if (lineNum + cellNum === 2) {
        if (cells[2][0].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[0][2].textContent === turn
        ) {
            return true;
        }
    }

    return false;
};

var clickListener = function (event) {

    // console.log(event.target); 현재 자신의 태그
    // console.log(event.target.parentNode); 부모 태그
    // console.log(event.target.parentNode.parentNode);

    /**
     * indexOf로 cells(tr, td)의 번호를 알아올 수 있다.
     */
    var lineNum = lines.indexOf(event.target.parentNode);
    var cellNum = cells[lineNum].indexOf(event.target);
    console.log(lineNum + "번째 줄" + cellNum + "번째 칸");

    //.value는 주로 input에서 사용한다.
    if (cells[lineNum][cellNum].textContent === '') { // 칸이 있을 경우
        cells[lineNum][cellNum].textContent = turn;

        //세칸이 다 채워졌을까?
        var isFull = isWinner(lineNum, cellNum);

        if (isFull) {
            console.log(turn, "님이 승리");
            var word = document.createElement('h1');
            word.textContent = turn + " 님이 승리";
            body.appendChild(word);
            turn = 'X';
            cells.forEach(function (line) {
                line.forEach(function (cell) {
                    cell.textContent = '';
                });
            });
        } else {
            if (turn === 'X') {
                turn = 'O';
            } else {
                turn = 'X';
            }
        }
    }


};
for (var i = 0; i < 3; i++) {
    var line = document.createElement('tr');
    lines.push(line);
    cells.push([]); // 2차원 배열
    for (var j = 0; j < 3; j++) {
        var cell = document.createElement('td');
        cell.addEventListener('click', clickListener);
        cells[i].push(cell); // cell을 넣어줘야함.
        line.appendChild(cell);
    }
    table.appendChild(line);
}
body.appendChild(table);
console.log(cells);
