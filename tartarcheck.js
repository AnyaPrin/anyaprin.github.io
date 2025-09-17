document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tartar-check-container");
    // タルタルが写っている画像のインデックス（例: 1, 4, 7）
    const tartarIndexes = [1, 4, 7];
    // 画像ファイル名（img/tartar1.jpg などを用意してください）
    const images = [
        "../img/lalafel.jpg", // 0
        "../img/tartar1.jpg", // 1 ←タルタル
        "../img/others1.jpg", // 2
        "../img/others2.jpg", // 3
        "../img/tartar2.jpg", // 4 ←タルタル
        "../img/others3.jpg", // 5
        "../img/others4.jpg", // 6
        "../img/tartar3.jpg", // 7 ←タルタル
        "../img/others5.jpg"  // 8
    ];

    container.innerHTML = `
      <div id="tartar-check" style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.7);
        z-index: 1000;">
        <div style="color: white; font-size: 1.2rem; margin-bottom: 16px;">
          タルタルが写っている画像をすべて選んでください
        </div>
        <div id="tartar-grid" style="
          display: grid;
          grid-template-columns: repeat(3, 80px);
          grid-gap: 12px;
          margin-bottom: 20px;">
          ${images.map((src, i) => `
            <div class="tartar-cell" data-idx="${i}" style="
              width: 80px; height: 80px; border: 3px solid #fff; border-radius: 8px;
              overflow: hidden; cursor: pointer; box-sizing: border-box;
              background: #222;">
              <img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover;pointer-events:none;">
            </div>
          `).join('')}
        </div>
        <button id="tartar-submit" style="
          padding: 8px 24px; font-size: 1rem; border-radius: 6px; border: none;
          background: #4ad; color: #fff; cursor: pointer;">認証</button>
        <div id="tartar-message" style="color: #ffb; margin-top: 12px; min-height: 1.5em;"></div>
      </div>
    `;

    const tartarCheck = document.getElementById("tartar-check");
    const toggleButton = document.getElementById("toggle-door-button");
    const cells = Array.from(document.querySelectorAll(".tartar-cell"));
    const submit = document.getElementById("tartar-submit");
    const message = document.getElementById("tartar-message");

    let selected = new Set();

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const idx = Number(cell.dataset.idx);
            if (selected.has(idx)) {
                selected.delete(idx);
                cell.style.borderColor = "#fff";
            } else {
                selected.add(idx);
                cell.style.borderColor = "#4ad";
            }
        });
    });

    submit.addEventListener("click", () => {
        // 正解判定
        const selectedArr = Array.from(selected).sort();
        const answerArr = tartarIndexes.slice().sort();
        if (
            selectedArr.length === answerArr.length &&
            selectedArr.every((v, i) => v === answerArr[i])
        ) {
            tartarCheck.style.display = "none";
            toggleButton.style.display = "";
        } else {
            message.textContent = "認証失敗！もう一度お試しください。";
            // 選択リセット
            selected.clear();
            cells.forEach(cell => cell.style.borderColor = "#fff");
        }
    });

    // 初期状態でドアボタン非表示
    toggleButton.style.display = "none";
});
