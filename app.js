let isGameRunning = true;
let currentPlayer = "X";

const switchPlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const clickHandler = ({ target }) => {
  if (!target.innerHTML && isGameRunning) {
    target.innerHTML = currentPlayer;
    switchPlayer();
    const res = checkWin();
    if (res) {
      let i = res[1];
      if (res[0] === "r") {
        document
          .querySelectorAll(
            `.square:nth-child(-n+${i * 3 + 3}):nth-child(n+${i * 3 + 1})`
          )
          .forEach((square) => square.classList.add("green"));
      }
      if (res[0] === "c") {
        document.querySelectorAll(`.square`).forEach((square, index) => {
          if (index === i || index === i + 3 || index === i + 6)
            square.classList.add("green");
        });
      }
      if (res[0] === "d") {
        if (i === 1) {
          document.querySelectorAll(`.square`).forEach((square, index) => {
            if (index === 0 || index === 4 || index === 8)
              square.classList.add("green");
          });
        }
        if (i === 2) {
          document.querySelectorAll(`.square`).forEach((square, index) => {
            if (index === 2 || index === 4 || index === 6)
              square.classList.add("green");
          });
        }
      }
      isGameRunning = false;
      switchPlayer();
      alert(`${currentPlayer} Won`);
    }
    document.getElementById("player").innerHTML = currentPlayer.toUpperCase();
  }
};

const checkWin = () => {
  const chunks = chunkArray(
    Array.from(document.querySelectorAll(".square")),
    3
  );
  for (let i = 0; i < 3; i++) {
    // Row wise
    if (
      chunks[i][0].innerHTML &&
      chunks[i][0].innerHTML === chunks[i][1].innerHTML &&
      chunks[i][1].innerHTML == chunks[i][2].innerHTML
    ) {
      //   console.log(`Row ${i} done`);
      return ["r", i];
    }
    // Column wise
    if (
      chunks[0][i].innerHTML &&
      chunks[0][i].innerHTML === chunks[1][i].innerHTML &&
      chunks[1][i].innerHTML == chunks[2][i].innerHTML
    ) {
      //   console.log(`Column ${i} done`);
      return ["c", i];
    }

    // Diagonally
    if (
      chunks[0][0].innerHTML &&
      chunks[0][0].innerHTML === chunks[1][1].innerHTML &&
      chunks[1][1].innerHTML === chunks[2][2].innerHTML
    ) {
      //   console.log(`diagonal 1 done`);
      return ["d", 1];
    }

    if (
      chunks[0][2].innerHTML &&
      chunks[0][2].innerHTML === chunks[1][1].innerHTML &&
      chunks[1][1].innerHTML === chunks[2][0].innerHTML
    ) {
      //   console.log(`diagonal 2 done`);
      return ["d", 2];
    }
  }
  return null;
};

document
  .querySelectorAll(".square")
  .forEach((square) => (square.onclick = clickHandler));

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const resetGame = () => {
  isGameRunning = true;
  currentPlayer = "X";
  document.querySelectorAll(".square").forEach((square) => {
    square.innerHTML = "";
    square.classList = ["square"];
  });
};
