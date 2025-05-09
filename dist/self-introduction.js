var _a;
let addButton = document.getElementById('addButton');
const todoTable = (_a = document.getElementById("todo-table")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("tbody")[0];
const searchButton = document.getElementById("search-button");
const filterResetButton = document.getElementById("filter-reset-button");
let originalRows = [];
function isValidInput(text) {
    return /^[\w\sぁ-んァ-ヶー一-龥]+$/.test(text);
}
if (addButton !== null) {
    addButton.addEventListener("click", function () {
        createRow();
    });
}
else {
    console.log("addButtonが見つかりませんでした");
}
function createRow() {
    const todoInput = document.getElementById("todo-input");
    const errorMessage = document.getElementById("error-message");
    if (todoInput === null) {
        console.error('todoInput 要素が見つかりません');
        return;
    }
    const text = todoInput.value.trim();
    console.log(text);
    errorMessage.textContent = "";
    if (text === "") {
        errorMessage.textContent = "必須入力欄です";
        return;
    }
    if (!isValidInput(text)) {
        errorMessage.textContent = "記号（？！など）は使用できません";
        return;
    }
    const row = todoTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = text;
    todoInput.value = "";
    createDeleteEvent(row, cell2);
}
const createDeleteEvent = (row, cell2) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", function () {
        todoTable.deleteRow(row.rowIndex - 1);
    });
    cell2.appendChild(deleteBtn);
};
const normalize = (str) => {
    return str.replace(/\s/g, "").toLowerCase();
};
if (searchButton !== null) {
    searchButton.addEventListener("click", function () {
        const searchInput = document.getElementById("search-input");
        const searchError = document.getElementById("search-error");
        const keyword = searchInput.value.trim();
        searchError.textContent = "";
        if (keyword === "") {
            searchError.textContent = "必須入力欄です";
            return;
        }
        if (!isValidInput(keyword)) {
            searchError.textContent = "記号（？！など）は使用できません";
            return;
        }
        originalRows = [];
        const allRowsArray = Array.from(todoTable.getElementsByTagName("tr"));
        for (let row of allRowsArray) {
            originalRows.push(row);
        }
        const rowsArray = Array.from(todoTable.getElementsByTagName("tr"));
        rowsArray.forEach(row => {
            const cellText = row.cells[0].textContent || "";
            const isMatch = normalize(cellText).includes(normalize(keyword));
            row.style.display = isMatch ? "" : "none";
        });
    });
}
if (filterResetButton !== null) {
    filterResetButton.addEventListener("click", function () {
        const rows = todoTable.getElementsByTagName("tr");
        for (let row of originalRows) {
            row.style.display = "";
        }
        const searchInput = document.getElementById("search-input");
        const searchError = document.getElementById("search-error");
        searchInput.value = "";
        searchError.textContent = "";
    });
}
const today = new Date();
const day = today.getDay();
const days = ["日", "月", "火", "水", "木", "金", "土"];
console.log("今日は" + days[day] + "曜日です");
const body = document.body;
const messageDiv = document.createElement("div");
messageDiv.style.padding = "20px";
messageDiv.style.fontSize = "1.2em";
messageDiv.style.textAlign = "center";
messageDiv.style.fontWeight = "bold";
messageDiv.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
messageDiv.style.marginTop = "20px";
document.body.appendChild(messageDiv);
switch (day) {
    case 0:
        body.style.backgroundColor = "pink";
        messageDiv.textContent = "休日は何をしますか？";
        break;
    case 1:
        body.style.backgroundColor = "lightblue";
        messageDiv.textContent = "今週も頑張ろう！";
        break;
    case 2:
        body.style.backgroundColor = "yellow";
        messageDiv.textContent = "今日はどんな天気ですか？";
        break;
    case 3:
        body.style.backgroundColor = "lightgreen";
        messageDiv.textContent = "週の真ん中水曜日！";
        break;
    case 4:
        body.style.backgroundColor = "purple";
        messageDiv.textContent = "まだ木曜日だからって落ち込まないで！がんばろう！";
        break;
    case 5:
        body.style.backgroundColor = "gold";
        messageDiv.textContent = "一週間おつかれさま！自分にご褒美あげてね！";
        break;
    default:
        body.style.backgroundColor = "white";
        messageDiv.textContent = `${days[day]}曜日です今日も楽しもうね！`;
}
export {};
