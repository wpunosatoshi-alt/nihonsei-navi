# 日本製ナビ

**日本製をもっと多くの人へ。**

Amazonで購入できる日本製品を、メーカー別に整理して紹介するサイトです。

## サイトURL

https://wpunosatoshi-alt.github.io/nihonsei-navi/

## 特徴

- 📦 **メーカー別整理**: 日本製品をメーカーごとに分類
- ✨ **コメント付き製品**: 人が書いたリアルな感想
- 🔍 **カテゴリー検索**: キッチン家電、刃物、調理器具、文房具、工具など
- 📊 **ソート機能**: 製品名、メーカー、カテゴリーで並び替え
- 📱 **レスポンシブ対応**: スマホ、タブレット、PCすべてに対応
- 🔗 **Amazon連携**: Amazonへ直接アクセス可能

## 掲載カテゴリー

- 🍳 キッチン家電
- 🔪 刃物・包丁
- 🍲 調理器具
- ✏️ 文房具
- 🔧 工具・DIY用品

## 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (Vanilla)
- **ホスティング**: GitHub Pages
- **データ管理**: JSON形式

## ファイル構成

```
nihonsei-navi/
├── index.html              # トップページ (製品一覧統合)
├── about.html              # このサイトについて
├── submit.html             # 製品投稿フォーム
├── css/
│   └── style.css           # スタイルシート
├── js/
│   └── main.js             # JavaScript (ソート・フィルター機能)
├── data/
│   └── products.json       # 製品データ
└── README.md               # このファイル
```

## ローカル環境での実行

1. リポジトリをクローン:
```bash
git clone https://github.com/wpunosatoshi-alt/nihonsei-navi.git
cd nihonsei-navi
```

2. ローカルサーバーを起動:
```bash
# Pythonがインストールされている場合
python -m http.server 8000

# または、VS Code Live Serverなどを使用
```

3. ブラウザで開く:
```
http://localhost:8000
```

## GitHub Pagesへのデプロイ

1. ファイルをプッシュ:
```bash
git add .
git commit -m "サイト更新"
git push origin main
```

2. 数分後、自動的にサイトが更新されます

## 製品データの追加方法

`data/products.json` に以下の形式で製品を追加:

```json
{
  "asin": "B0XXXXXXXXX",
  "name": "製品名",
  "manufacturer": "メーカー名",
  "category": "カテゴリー",
  "amazonUrl": "https://www.amazon.co.jp/dp/B0XXXXXXXXX",
  "comment": "コメント（任意）",
  "hasComment": true
}
```

追加後、GitHubにpushすれば自動的にサイトに反映されます。

## 収益化計画

- **AdSense**: 1日100PV達成後に申請予定
- **Amazon Associates**: 売上実績後に申請予定

## 免責事項

- 当サイトは各企業とは一切関係なく、情報提供を目的として個人で運営しています
- 製品の品質や性能について、当サイトは一切の責任を負いません

## お問い合わせ

製品情報の誤りや、掲載していない日本製品がありましたら、サイト内の「製品を投稿」フォームからお知らせください。

---

Made with ❤️ for Japan
