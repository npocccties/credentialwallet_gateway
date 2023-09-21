## 動作環境
- OS: Unix 系（Windows では WSL 等をお使いください）
- Node.js: v16.20.1
- Docker

## 開発
動作環境を用意し、当リポジトリ下で以下のコマンドを実行すると、PosgreSQLコンテナが起動します。
```
make up-local
```

Next.jsアプリケーションを立ち上げ (yarn等を使用する場合は適宜読み替えてください)
```
npm run dev
```

### Visual Studio CodeでdevContainerを使用する場合
1. Docker および Docker Compose をインストール
2. Visual Studio Code に拡張機能「Dev - Containers」をインストール
3. .devcontainerフォルダ内にある.env.local.sampleを複製し、複製したファイルを.envにリネーム
4. 表示 ⇒ コマンドパレット で「Remote-Containers: Open Folder in Container...」を選択し、chilowalletディレクトリを選択
5. コンテナ起動後、ルート(app)直下にある.env のホスト名を `db` に変更してください（例: localhost:5432 → db:5432）

### アプリケーションとDBとの連携
以下に記載している「prismaの使用方法」より、コマンドを実行してDBとの連携を行います。

## prismaの使用方法
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


