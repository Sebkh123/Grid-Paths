const board = document.getElementById("board");
const rows = 5;
const cols = 12;

let dp = Array.from({ length: rows }, () => Array(cols).fill(0));

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {

        let div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.r = r;
        div.dataset.c = c;

        board.appendChild(div);
    }


}

getCell(0,0).classList.add("start");
getCell(4,11).classList.add("end");

    
const walls = [
    [0,3], [0,9],
    [1,1], [1,5],
    [2,2], [2,7], [2,11],
    [3,4]
];


walls.forEach(([r,c])=>{
    getCell(r,c).classList.add("wall")
});



async function runDp() {

    // reset 
    dp = Array.from({ length: rows }, () => Array(cols).fill(0));

    // clear
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");


    document.querySelectorAll(".highlight").forEach(el => el.classList.remove("highlight"));



    // 2. Bottom-up loops
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {

            const cell = getCell(r, c);  
              cell.classList.add("active");

            
            if (cell.classList.contains("wall")) {
                dp[r][c] = 0;
                await sleep(50)
                cell.classList.remove("active");
                continue;
            }

            
            if (cell.classList.contains("end")) {
                dp[r][c] = 1;
                cell.textContent = 1;
                await sleep(50)
                cell.classList.remove("active");
                continue;
            }

           //normal cell
            let down = dp[r + 1]?.[c] ?? 0;
            let right = dp[r]?.[c + 1] ?? 0;

            dp[r][c] = down + right;

            // add value to cell
            cell.textContent = dp[r][c];

            await sleep(50)
            cell.classList.remove("active");
        }
    }

    // Highlight start cell
    getCell(0, 0).classList.add("highlight");
}




function getCell(r, c) {
    return document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
}

function isWall(r, c) {
    return getCell(r, c).classList.contains("wall");
}

function isEnd(r, c) {
    return getCell(r, c).classList.contains("end");
}

document.getElementById("calculateButton").addEventListener("click", runDp)


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}