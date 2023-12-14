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
session_cookieというNameのeppn, displayNameをPayloadに含んだ署名付きJWTを用意します。

1. 秘密鍵、公開鍵のペアを用意する
1. [jwt.io](https://jwt.io/)等で鍵を作成したアルゴリズムを選択し、Payloadにeppn, displayNameプロパティを入力する。
1. 用意した秘密鍵、公開鍵を入力し、JWTを作成する
1. 環境変数の orthros_login_key_base64 に作成した公開鍵のbase64エンコードしたものを設定する
1. 立ち上がったアプリケーションのブラウザで開発者ツールを開き、Application > Cookiesで作成したJWTをValueに手打ちで入れる

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
| 変数名                               | 説明                                        | デフォルト値         | 必須/任意|
| :----------------------------------- | :------------------------------------------ | :------------------- | :---- |
|DB_HOST|DBのホスト名|docker-compose.*.yml に記載されている`db`がホスト名|必須|
|DB_NAME|DB名|-|必須|
|DB_USER|DBのユーザ名|-|必須|
|DB_PASS|DBのパスワード|-|必須|
|DATABASE_URL|接続先データベースのURL|-|必須|
|LOG_LEVEL|ログレベル<br>'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'|-|必須|
|LOG_MAX_SIZE|ログファイルサイズ<br>単位には k / m / g のいずれか指定|100m|必須|
|LOG_MAX_FILE|ログファイルの世代数|7|必須|

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

| 変数名                               | 説明                                        | デフォルト値         |必須/任意|
| :----------------------------------- | :------------------------------------------ | :------------------- | :---- |
|NEXT_PUBLIC_SERVICE_NAME|サービス名|バッジウォレット|必須|
|NEXT_PUBLIC_SERVICE_DESCRIPTION|サービスの説明<br>metaタグに設定される説明です。|バッジウォレットは、取得したOpen Badgeを格納、提出ができるアプリケーションです。|必須|
|NEXT_PUBLIC_COPYRIGHT|フッターに表示するコピーライト|-|必須|
|NEXT_PUBLIC_COPYRIGHT_LINK|フッターに表示するコピーライトのリンク|-|必須|
|NEXT_PUBLIC_E_PORTFOLIO_URL|e-ポートフォリオシステムへのリンク<br>末尾にはスラッシュは付与しないこと|-|必須|
|NEXT_PUBLIC_LOGIN_PAGE_URL|ログインページのURL|-|必須|
|NEXT_PUBLIC_LOGOUT_LINK|オルトロスのログアウトのリンク|-|必須|
|NEXT_PUBLIC_HELP_LINK|ヘルプのリンク|-|必須|
|baseURL|アプリケーション起動時のURL|http://localhost:3000|必須|
|clientName|アプリケーションの名称|chilowallet|必須|
|did_authority|VC発行者のDID|-|必須|
|vcApp_client_id|AzureクライアントID|-|必須|
|vcApp_azTenantId|AzureテナントID|-|必須|
|vcApp_client_secret|Azureクライアントシークレット|-|必須|
|vc_manifest_url|Entra Verified Idで発行者として登録しているmanifest url|-|必須|
|private_key_jwk|Walletの鍵情報（秘密鍵、公開鍵のペア）。詳細は「鍵の作成」項目に記載|-|必須|
|orthros_login_key_base64|Orthrosから発行されるJWTの署名に対応した公開鍵のbase64エンコード形式|-|必須|
|smtp_mail_server_host|メール送信サーバーのhost|-|必須|
|smtp_mail_server_port|メール送信サーバーのpost|-|必須|

### vc* に設定する環境変数について
Microsoft Entra Verified ID関連の環境構築は、wikiにある「1.0 Microsoft Entra Verified ID環境」項目に記載しています。
環境構築にあたって生成された値を設定してください。

did_authorityにはEntra Verified IDでの環境構築にあたって作成されたdidを設定してください。

### 鍵の作成
「バッジウォレット」アプリケーションとしてDIDを発行するための秘密鍵、公開鍵を作成し環境変数 private_key_jwk に設定する必要があります。

node環境上で、下記を実行
```
node script/keypair.ts
```
プロジェクトの直下にkey.txtというファイルで秘密鍵と公開鍵のキーペア (JWK) が作成されるので、出力された内容を環境変数に設定してください。

※ 鍵の情報は外部に漏れないよう大切に保管してください。

## Moodleとの連携
DBに入り、「lms_list」テーブルに任意のMoodleを登録してください。

ssoEnabledは対象のMoodleがOrthrosによってSSOされるかを判定します。SSOを行う場合はtrueを設定してください。

上記のssoEnabledをtrueにした場合、lmsAccessTokenの設定が必須になります。

設定方法
1. Moodle側で token generator プラグインをインストール
1. サイト管理 > プラグイン > 管理ツール > token generator より、Enabled servicesで任意のserviceにチェックを入れる
1. 管理 > サーバ > ウェブサービス > トークンを管理する より、「トークンを作成する」を選択し、先ほど選択したserviceのTokenを作成
1. 発行したtokenをlms_access_tokenカラムに登録する
1. token発行時に選択したserviceをlms_serviceカラムに登録する

## configの設定値
/config/index.ts に設定されている固定値

基本的に設定の変更は不要です。

```
export const SERVICE_NAME = process.env.NEXT_PUBLIC_SERVICE_NAME;
export const SERVICE_DESCRITION = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION;
export const CUSTOME_SCHEMA = "openid-vc://";
export const REQUEST_URI_KEY = `${CUSTOME_SCHEMA}?request_uri`;
export const DID_ION_KEY_ID = "signingKey";
export const SIOP_VALIDITY_IN_MINUTES = 30;
```

| 変数名                               | 説明                                        | 
| :----------------------------------- | :------------------------------------------ | 
|SERVICE_NAME|サービス名 環境変数で設定された値が代入されます|
|SERVICE_DESCRITION|サービスの説明<br>metaタグに設定される説明です。 環境変数で設定された値が代入されます|
|CUSTOME_SCHEMA|VCリクエスト時に使用するschema|
|REQUEST_URI_KEY|VCリクエストで返却されたurlを取得するためのkey|
|DID_ION_KEY_ID|VC発行リクエスト時の署名のDIDに付与するkey|
|SIOP_VALIDITY_IN_MINUTES|VC発行リクエスト時の署名の有効期限設定値|