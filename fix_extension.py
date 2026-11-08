import os

def fix_jpeg_extensions():
    print("=== JPEG拡張子一括変換ツール（劣化なし） ===")
    
    # スクリプトと同じ場所にある images フォルダのパスを取得
    base_path = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(base_path, "images")
    
    if not os.path.isdir(images_dir):
        print(f"エラー: 'images' フォルダが見つかりません: {images_dir}")
        return
        
    # フォルダ内のファイルを取得
    files = os.listdir(images_dir)
    target_files = [f for f in files if f.lower().endswith('.jpeg')]
    
    if not target_files:
        print("変換対象の '.jpeg' ファイルは見つかりませんでした。すべて '.jpg' の可能性があります。")
        return
        
    print(f"\n合計 {len(target_files)} 個の '.jpeg' ファイルが見つかりました。.jpg に変更します...\n")
    
    count = 0
    for filename in target_files:
        # 古いパスと新しいパスを生成
        old_path = os.path.join(images_dir, filename)
        
        # 拡張子部分だけを .jpg に置き換える（大文字の .JPEG にも対応）
        base_name = os.path.splitext(filename)[0]
        new_filename = f"{base_name}.jpg"
        new_path = os.path.join(images_dir, new_filename)
        
        # ファイル名を変更（中身はそのままで拡張子のみ書き換え）
        os.rename(old_path, new_path)
        print(f"    {filename}  ➔  {new_filename}")
        count += 1
        
    print(f"\n完了しました！ 合計 {count} 件の拡張子を .jpg に変更しました。")

if __name__ == "__main__":
    fix_jpeg_extensions()