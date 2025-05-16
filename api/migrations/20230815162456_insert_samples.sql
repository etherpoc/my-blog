-- Add migration script here
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title1', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test1", "sample"}', '
# Pythonで始める簡単Webスクレイピング入門

Webスクレイピングは、Webサイトからデータを自動で収集する技術です。本記事では、Pythonと人気ライブラリ`requests`と`BeautifulSoup`を使って、基本的なスクレイピングの手順を紹介します。

## 必要なライブラリのインストール

以下のコマンドで必要なライブラリをインストールします。

```bash
pip install requests beautifulsoup4
```
スクレイピングの基本コード
以下は、Pythonでニュースサイトのタイトルを取得する簡単なコードです。

```python
import requests
from bs4 import BeautifulSoup

# 対象のURL
url = "https://example.com"

# Webページを取得
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# タイトルを取得
title = soup.title.string
print("ページタイトル:", title)
```

注意点
Webスクレイピングを行う際は、対象サイトの利用規約やrobots.txtを確認しましょう。

大量アクセスはサーバーに負担をかけるため、適切な間隔（例：time.sleep(1)）を設けることが推奨されます。

まとめ
Webスクレイピングは情報収集やデータ分析の第一歩として非常に有用です。Pythonを使えばシンプルなコードで強力な処理が可能です。まずは小さなところから始めて、ぜひ自分なりのツールを作ってみてください。

', 2);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title2', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test2", "sample"}', '# test2', 3);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title3', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test3", "sample"}', '# test3', 1);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title4', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test4", "sample"}', '# test4', 0);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title5', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test5", "sample"}', '# test5', 2);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title6', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test1", "sample"}', '# test6', 5);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title7', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test1", "sample"}', '# test7', 100);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title8', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test1", "sample"}', '# test8', 0);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title9', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test2", "sample"}', '# test9', 2);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title10', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test2", "sample"}', '# test10', 3);
INSERT INTO articles ("title", "img_url", "tags", "content", "pv") VALUES ('Title11', 'http://drive.google.com/uc?export=view&id=14KE4M7xVz_494gEttrIK6uFsSfvPbAeu', '{"test2", "sample"}', '

# はじめてのDocker × Python入門

〜 FlaskアプリをDockerで動かしてみよう 〜

## はじめに

このチュートリアルでは、PythonのマイクロWebフレームワーク「Flask」で作成したシンプルなアプリケーションを、Docker上で動かす方法を解説します。PythonとDockerの基本を理解しながら、環境構築から実行までを一通り体験できます。

## 前提条件

* Pythonの基本的な文法を理解していること
* Dockerがインストールされていること（Docker Desktop または CLI）

## プロジェクト構成

以下のようなディレクトリ構成で進めていきます。

```
myapp/
├── app.py
├── requirements.txt
└── Dockerfile
```

## Flaskアプリの作成

まずはFlaskを使って簡単なWebアプリケーションを作成します。

### app.py

```
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello from Docker!"
```

## 依存関係の定義

次に、このアプリに必要なPythonパッケージを定義します。

### requirements.txt

```
flask
```

## Dockerfileの作成

DockerfileはアプリケーションのDockerイメージをビルドする手順を書いたファイルです。

### Dockerfile

```
FROM python:3.10-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "app.py"]
```

## Dockerイメージのビルドと実行

### 1. イメージのビルド

ターミナルで以下のコマンドを実行し、Dockerイメージをビルドします。

```
docker build -t python-docker-app .
```

* `-t` はタグ（名前）を指定するオプションで、ここでは `python-docker-app` という名前を付けています。
* `.` はカレントディレクトリをビルドコンテキストとして指定します。

### 2. コンテナの起動

ビルドしたイメージを使ってコンテナを起動します。

```
docker run -p 5000:5000 python-docker-app
```

* `-p 5000:5000` はホストの5000番ポートをコンテナの5000番ポートにマッピングする設定です。
* `python-docker-app` は先ほど作成したDockerイメージの名前です。

### 3. 動作確認

ブラウザで `http://localhost:5000` にアクセスすると、「Hello from Docker!」と表示されます。
これでDocker上でFlaskアプリが正常に動いていることが確認できます。

## よくあるエラーと対処法

| エラー内容                           | 対処方法                                        |
| ------------------------------- | ------------------------------------------- |
| Address already in use          | ポート5000が他のアプリで使用中。別のポートを指定するか、使用中アプリを停止する。  |
| ModuleNotFoundError             | requirements.txtに必要なパッケージが不足している。再確認し追加。    |
| Cannot connect to Docker daemon | Dockerが起動していないか権限不足。Dockerを起動し、必要ならsudoを使う。 |

## まとめ

Dockerを使うことで、環境に依存せずPythonアプリをどこでも同じように動かせます。
本記事ではFlaskアプリのDocker化の基本を紹介しました。

今後は以下の応用も検討すると良いでしょう。

* Docker Composeで複数コンテナの連携
* 本番環境向けのイメージ最適化
* CI/CDパイプラインの構築


', 4);