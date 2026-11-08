// 本番用の画像ファイル名リスト（新しい画像を追加したらここに追加していきます）
const imageFiles = [
  "000005_20200805.jpg",
  "000004_20200804.jpg",
  "000003_20200803.jpg",
  "000002_20200802.jpg",
  "000001_20200801.jpg"
  // 新しいものが上、古いものが下になるように並べます（これで左上＝新、右下＝古になります）
];

document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("artwork-grid");
  const datePicker = document.getElementById("date-picker");

  // ファイル名から日付（YYYYMMDD）と連番を抽出する関数
  function parseFilename(filename) {
    // 例: "000001_20200801.jpg" -> numStr: "000001", dateStr: "20200801"
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    const parts = nameWithoutExt.split('_');
    
    const numStr = parts[0];
    const dateStr = parts[1];

    // 表示用日付フォーマット (2020.08.01)
    const formattedDate = `${dateStr.substring(0, 4)}.${dateStr.substring(4, 6)}.${dateStr.substring(6, 8)}`;
    // カレンダー照合用ハイフン区切り (2020-08-01)
    const isoDate = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;

    return {
      number: `#${numStr}`,
      dateDisplay: formattedDate,
      isoDate: isoDate,
      rawDate: dateStr
    };
  }

  // 1. 画像カードの動的生成
  imageFiles.forEach(filename => {
    const info = parseFilename(filename);

    const card = document.createElement("div");
    card.className = "work-card";
    card.dataset.date = info.isoDate; // カレンダー検索用にデータ保持

    card.innerHTML = `
      <img src="images/${filename}" alt="Artwork ${info.number}" class="work-thumbnail" loading="lazy">
      <div class="work-info">
        <span class="work-number">${info.number}</span>
        <span class="work-date">${info.dateDisplay}</span>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  // 2. カレンダー日付ジャンプ機能
  datePicker.addEventListener("change", (e) => {
    const selectedDate = e.target.value; // 例: "2020-08-01"
    if (!selectedDate) return;

    // 選択された日付に最も近い作品カードを探す
    const cards = Array.from(document.querySelectorAll(".work-card"));
    
    // 一致する日付、または指定日付より過去で最も近いカードを検索
    let targetCard = cards.find(card => card.dataset.date === selectedDate);

    if (!targetCard) {
      // ぴったり同じ日がない場合、指定日より前の最も近い作品を探す
      targetCard = cards.find(card => card.dataset.date < selectedDate);
    }

    if (targetCard) {
      // スムーズスクロール移動
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

      // 一時的にハイライト表示
      cards.forEach(c => c.classList.remove("highlight"));
      targetCard.classList.add("highlight");
      setTimeout(() => targetCard.classList.remove("highlight"), 2000);
    } else {
      alert("指定された日付の作品が見つかりませんでした。");
    }
  });
});