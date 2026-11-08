

document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("artwork-grid");
  const datePicker = document.getElementById("date-picker");

  // ファイル名 (例: 000001_20200801.jpg) から番号と日付を分解する関数
  function parseFilename(filename) {
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    const parts = nameWithoutExt.split('_');
    
    const numStr = parts[0];  // "000001"
    const dateStr = parts[1]; // "20200801"

    // 表示用: 2020.08.01
    const formattedDate = `${dateStr.substring(0, 4)}.${dateStr.substring(4, 6)}.${dateStr.substring(6, 8)}`;
    // カレンダー用: 2020-08-01
    const isoDate = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;

    return {
      number: `#${numStr}`,
      dateDisplay: formattedDate,
      isoDate: isoDate
    };
  }

  // 配列をファイル名順（新しいものが上＝左上、古いものが下＝右下）に配置
  imageFiles.forEach(filename => {
    const info = parseFilename(filename);

    const card = document.createElement("div");
    card.className = "work-card";
    card.dataset.date = info.isoDate; // 日付ジャンプ用の目印

    card.innerHTML = `
      <img src="images/${filename}" alt="Artwork ${info.number}" class="work-thumbnail" loading="lazy">
      <div class="work-info">
        <span class="work-number">${info.number}</span>
        <span class="work-date">${info.dateDisplay}</span>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  // カレンダーの日付変更時にその作品へジャンプする機能
  datePicker.addEventListener("change", (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;

    const cards = Array.from(document.querySelectorAll(".work-card"));
    
    // 一致する日付、または見つからない場合はその日より前の最も近い作品を検索
    let targetCard = cards.find(card => card.dataset.date === selectedDate);
    if (!targetCard) {
      targetCard = cards.find(card => card.dataset.date < selectedDate);
    }

    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      
      cards.forEach(c => c.classList.remove("highlight"));
      targetCard.classList.add("highlight");
      setTimeout(() => targetCard.classList.remove("highlight"), 2000);
    } else {
      alert("該当する日付の作品が見つかりませんでした。");
    }
  });
});


// === 画像クリック時の拡大表示（モーダル）機能 ===
document.addEventListener("DOMContentLoaded", () => {
  // 1. モーダル用のHTML要素を動的に作成してページに追加（情報表示エリアを内蔵）
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
    <span class="close-hint">&times;</span>
    <img src="" alt="Expanded View">
    <div class="modal-info">
      <span class="modal-number"></span>
      <span class="modal-date"></span>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const modalNumber = modal.querySelector(".modal-number");
  const modalDate = modal.querySelector(".modal-date");

  // 2. グリッド内のカードがクリックされたとき
  const gridContainer = document.getElementById("artwork-grid");
  gridContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".work-card");
    if (!card) return;

    const img = card.querySelector(".work-thumbnail");
    const numberText = card.querySelector(".work-number").textContent;
    const dateText = card.querySelector(".work-date").textContent;

    if (img) {
      modalImg.src = img.src;               // 画像のパスを渡す
      modalNumber.textContent = numberText; // 連番を渡す (#000001 など)
      modalDate.textContent = dateText;     // 日付を渡す (2024.08.24 など)
      modal.style.display = "flex";         // モーダルを表示
    }
  });

  // 3. モーダル（背景や画像）をクリックしたら閉じる
  modal.addEventListener("click", () => {
    modal.style.display = "none";
    modalImg.src = "";
    modalNumber.textContent = "";
    modalDate.textContent = "";
  });
});