import os
import json

def update_image_list():
    base_path = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(base_path, "images")
    output_js = os.path.join(base_path, "file_list.js")
    
    if not os.path.isdir(images_dir):
        print("エラー: 'images' フォルダが見つかりません。")
        return
        
    # imagesフォルダ内の画像ファイルを取得
    files = os.listdir(images_dir)
    image_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg'))]
    
    # 新しい順（降順）に並べ替え
    image_files.sort(reverse=True)
    
    # file_list.js として書き出し
    js_content = f"const imageFiles = {json.dumps(image_files, indent=2)};\n"
    
    with open(output_js, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"成功: images フォルダから {len(image_files)} 件のファイルを読み込み、file_list.js を更新しました！")

if __name__ == "__main__":
    update_image_list()