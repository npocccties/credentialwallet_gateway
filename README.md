# 動作環境
- OS: Unix 系（Windows では WSL 等をお使いください）
- Node.js: v16.20.1
- Docker
- Docker Compose (v2)

# setup
git clone実行後、ルートディレクトリで以下のコマンドを実行します。
```
script/setup.sh
```

# 開発
makeコマンドがインストールされていない場合は、適宜インストールしてください。

コンテナのビルド
```
make build-local
```

コンテナ起動
```
make up-local
# make up-d-localの場合はdaemonで起動
```

appコンテナ内に移動
```
script/inapp.sh
```

コンテナのdown
```
make down-local
```

アプリケーションの移動（appコンテナ内）
```
npm run dev
```

### アプリケーションとDBとの連携
appコンテナ内に移動した後、以下に記載している「prismaの使用方法」より、コマンドを実行してDBとの連携を行います。

## Visual Studio CodeでdevContainerを使用する場合
1. Docker および Docker Compose をインストール
2. Visual Studio Code に拡張機能「Dev - Containers」をインストール
3. 当READMEのsetupを実行
4. コマンドパレット で「Remote-Containers: Open Folder in Container...」を選択し、chilowalletディレクトリを選択

## デバッグ方法
上記のdevContainerを起動し、VSCodeの左側にあるデバッグから起動ボタンを押して実行してください。

## prismaの使用方法
詳細に関しては[ドキュメント](https://www.prisma.io/docs/reference/api-reference/command-reference)を参照してください。

1. コンテナ起動後、以下のコマンドでDBのテーブル定義をschema.prismaに反映します。
```
npx prisma db pull
```

2. 立ち上げたDBコンテナへダミーデータを反映する場合は、以下のコマンドを使用してください。
```
npx prisma db seed
```

3. [Prisma Studio](https://www.prisma.io/docs/concepts/components/prisma-studio)を起動します。（localhost:5555が起動する）
```
npx prisma studio
```

## ローカルで動かす場合
jwtというkey名のeppn, displayNameをPayloadに含んだ署名付きJWTを用意します。
（jwtという名称は現時点での仮であり、どのような名称になるかは未定）

1. 秘密鍵、公開鍵のペアを用意する
1. [jwt.io](https://jwt.io/)等で鍵を作成したアルゴリズムを選択し、Payloadにeppn, displayNameプロパティを入力する。
1. 用意した秘密鍵、公開鍵を入力し、JWTを作成する
1. 環境変数の orthros_login_key_base64 に作成した公開鍵のbase64エンコードしたものを設定する
1. 立ち上がったアプリケーションのブラウザで開発者ツールを開き、Application > Cookiesで作成したJWTを手打ちで入れる

上記の手順でアプリケーションが動作するようになります。

# 開発サーバー（または本番サーバー）

1. 下記をインストール
   * Docker
   * Docker Compose (v2)
   * Git  
1. 適当なディレクトリへ移動
   ```
   cd /work
   ```
1. chilowallet のソースを取得
   ```
   git clone https://github.com/npocccties/chilowallet.git
   ```
   * 既にディレクトリが存在するならば `sudo rm -rf chilowallet` にて削除してください
1. chilowallet へ移動
   ```
   cd chilowallet
   ```
1. `*.sh` に権限付与
   ```
   sudo chmod 755 *.sh
   ```
1. 環境変数を定義した `.env` をルートディレクトリに配置
   * 開発サーバー：
      * ルートディレクトリで、`script/setup.sh` を実行する
      * .envの`ALLOWED_HOSTS`に記載されているドメインを、デプロイ先のドメインに設定する

1. デプロイ
  - 開発サーバー
    ```
    make build-dev
    ```
  - 停止（開発サーバー）
    ```
    make down-dev
    ```

## テストデータ作成
コンテナ起動後、chilowallet-appに入り、下記を実行
```
npx prisma db seed
```

もしType Error等で失敗する場合は、`npx prisma generate`を実行してから再度上記のコマンドを実行してください。
※ ビルドキャッシュなどの影響で、稀にschema.prismaの中身がローカルのファイルと異なった状態でコピーされていることがあります。その場合はdockerのキャッシュを適宜削除して再度コンテナを起動してください。


# 環境変数

## DB, ビルド時用
.env
| 変数名                               | 説明                                        | デフォルト値         |
| :----------------------------------- | :------------------------------------------ | :------------------- |
|SSL_CERTS_DIR|サーバー証明書の配置ディレクトリ|・ディレクトリの末尾には `/` は付与しないこと<br>・本番環境では下記の命名でファイルを配置しておくこと<br>　`signed.crt`: サーバー証明書（バッジウォレット用）<br>　`domain.key`: サーバー証明書の秘密鍵（バッジウォレット用）<br>　`signed_ep.crt`: サーバー証明書（e-ポートフォリオ用）<br>　`domain_ep.key`: サーバー証明書の秘密鍵（e-ポートフォリオ用）|
|ALLOWED_HOSTS|公開ホスト名|本番リリースする際は本番サーバーのホスト名を設定してください<br>複数指定時はカンマ区切り指定|
|DB_HOST|DBのホスト名|docker-compose.*.yml に記載されている`db`がホスト名|
|DB_NAME|DB名|-|
|DB_USER|DBのユーザ名|-|
|DB_PASS|DBのパスワード|-|
|DATABASE_URL|接続先データベースのURL|-|
|LOG_LEVEL|ログレベルの設定|-|
|LOG_MAX_SIZE|ログの最大サイズ|-|
|LOG_MAX_FILE|ログの世代数|-|

## Next.jsアプリケーション用
Next.jsアプリケーションでは、環境毎に以下のパターンで.envファイルを参照します。

| ファイル名 |	読み込まれるタイミング
| :--------- | :--------- | 
|.env.local |	毎回
|.env.development |	next dev 時のみ
|.env.production	| next start 時のみ

https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

以下の2つの環境変数の値を記述します。

.env.development

.env.production

| 変数名                               | 説明                                        | デフォルト値         |
| :----------------------------------- | :------------------------------------------ | :------------------- |
|baseURL|アプリケーション起動時のURL|http://localhost:3000|
|clientName|アプリケーションの名称|chilowallet|
|did_authority|VC発行者のDID|-|
|vcApp_client_id|AzureクライアントID|-|
|vcApp_azTenantId|AzureテナントID|-|
|vcApp_client_secret|Azureクライアントシークレット|-|
|vcApp_scope|AzureへVC発行要求するためのスコープ配列|-|
|vc_manifest_url|Entra Verified Idで発行者として登録しているmanifest url|-|
|private_key_jwk|Walletの鍵情報（秘密鍵、公開鍵のペア）|-|
|orthros_login_key_base64|Orthrosから発行されるJWTの署名に対応した公開鍵のbase64エンコード形式|-|
|smtp_mail_server_host|メール送信サーバーのhost|-|
|smtp_mail_server_port|メール送信サーバーのpost|-|
|NEXT_PUBLIC_COPYRIGHT|フッターに表示するcopyright|-|
|NEXT_PUBLIC_COPYRIGHT_LINK|フッターに表示するcopyrightのリンク|-|
|NEXT_PUBLIC_E_PORTFOLIO_URL|e-ポートフォリオシステムへのリンク<br>末尾にはスラッシュは付与しないこと|-|
|NEXT_PUBLIC_LOGIN_PAGE_URL|ログインページのURL|-|

### 鍵の作成
node環境上で、下記を実行
```
node script/keypair.ts
```
プロジェクトの直下に秘密鍵と公開鍵のキーペア (JWK) が作成されるので、出力された内容を環境変数に設定してください。
※ 鍵の情報は外部に漏れないよう大切に保管してください。