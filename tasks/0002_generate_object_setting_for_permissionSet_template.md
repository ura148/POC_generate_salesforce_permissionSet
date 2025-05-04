## 目的・やりたいこと

force-app/main/default/permissionsets 配下にある権限セットについて、

- オブジェクト設定に関して設計書を作成してください。
- 設計書はnpmコマンドで作成できるようにしてください。
- また作成した設計書から権限セットの.xmlデータにおいてobjectPermissionsを修正できるようにしてください

## 詳細

### 作成する設計書の詳細

- 設計書はdesign/permissionSet/[権限セットAPI名]/objectSetting.mdに作成する想定です
- 設計書ではobjectPermissionsに関して記載します。
- 権限セットでは何も権限が付与されていないが、manifest/package.xml に記載されているカスタムオブジェクトがある場合、そのオブジェクトに対して何も権限が付与されていないことがわかるようにしてください

### npmコマンド詳細

- スクリプトは「scripts」配下に作成してください。
- npmコマンドは「package.json」に記載してください

### 設計書から権限セットの修正を行う機能について

- 「objectSetting.md」の内容をもとに該当権限セットの.xmlのobjectPermissionsを修正してください
- tableの記載で使用される「|---|---|---|---|---|---|---|---|」はオブジェクトとして認識しないようにする

## Clineへの最終指示

ただ、このタスクでは計画するだけです。
このファイルの下部に計画をよく考えて記入してください。必要なファイルの読み込みなど調査を行い、できるだけ具体的に計画してください。

+++++++++++以下に計画を書く+++++++++++

### 計画

1. **設計書（objectSetting.md）のテンプレート設計**

   - オブジェクト権限の設定項目を定義
     - allowCreate（作成権限）
     - allowDelete（削除権限）
     - allowEdit（編集権限）
     - allowRead（参照権限）
     - modifyAllRecords（すべての変更権限）
     - viewAllFields (すべての項目参照権限)
     - viewAllRecords（すべての参照権限）
   - マークダウン形式での表現方法を定義
     - テーブル形式で各オブジェクトの権限を表示
     - 権限なしの場合は明示的に「権限なし」と表示

2. **設計書生成スクリプトの作成（generateObjectSettingDoc.js）**

   - 実装内容：
     - force-app/main/default/permissionsets配下の権限セットXMLファイルを読み込む
     - manifest/package.xmlからカスタムオブジェクトのリストを取得
     - 各権限セットに対して：
       - objectPermissionsセクションを解析
       - 設計書用のマークダウンを生成
       - design/permissionSet/[権限セットAPI名]/ディレクトリを作成
       - objectSetting.mdファイルを生成
   - package.jsonへのコマンド追加：
     ```json
     {
       "scripts": {
         "generate:permission-doc": "node scripts/generateObjectSettingDoc.js"
       }
     }
     ```

3. **権限セット更新スクリプトの作成（updatePermissionSet.js）**

   - 実装内容：
     - objectSetting.mdファイルを読み込む
     - マークダウンの内容を解析
     - 対応する権限セットXMLファイルを更新
     - 既存のobjectPermissionsセクションを新しい設定で置換
   - package.jsonへのコマンド追加：
     ```json
     {
       "scripts": {
         "update:permission-set": "node scripts/updatePermissionSet.js"
       }
     }
     ```

4. **エラーハンドリングの実装**

   - ファイル存在チェック
   - XML形式の妥当性チェック
   - 必須パラメータの存在チェック
   - 権限の整合性チェック

5. **テスト計画**
   - 設計書生成のテスト
     - 既存の権限がある場合
     - 権限がない場合
     - カスタムオブジェクトが存在する場合
   - 権限セット更新のテスト
     - 新規権限追加
     - 既存権限更新
     - 権限削除

この計画に基づいて、2つの主要なスクリプトを作成し、権限セットの設計と更新を自動化します。設計書のフォーマットは明確で一貫性があり、権限の有無が明確に分かるようにします。また、エラーハンドリングを適切に実装することで、スクリプトの信頼性を確保します。
