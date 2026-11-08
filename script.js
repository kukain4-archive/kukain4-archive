// images フォルダに入っている実際のファイル名をここに並べます
// （ファイル名に含まれている日付や連番を、プログラムが自動で読み取ります）
const imageFiles = [
  "000003_20240826.jpg",
  "000002_20240825.jpg",
  "000001_20240824.jpg"
  // 新しい作品が上（左上）、古い作品が下（右下）になるように並べます
];

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