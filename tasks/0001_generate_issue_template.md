Github issue のテンプレートを作成したい。

テンプレートの種類としては「bugfix」「new task」の2つを用意したい
テンプレート内にセクションやタイトルを設ける場合は日本語/英語を記載してください・

ただ、このタスクでは計画するだけです。
このファイルの下部に計画をよく考えて記入してください。必要なファイルの読み込みなど調査を行い、できるだけ具体的に計画してください。

チャットではなく、このファイル
tasks/0001_generate_issue_template.md
を編集して、下に現在の設計を書いてください。
+++++++++++以下に計画を書く+++++++++++

# GitHub Issue Template 作成計画

## 1. ファイル構造
```
.github/
└── ISSUE_TEMPLATE/
    ├── bugfix.yml
    └── new_task.yml
```

## 2. テンプレート詳細

### 2.1 Bugfix Template (bugfix.yml)

```yaml
name: バグ報告 / Bug Report
description: バグの報告用テンプレート / Template for bug reports
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        バグ報告ありがとうございます。以下の項目を記入してください。
        Thank you for reporting a bug. Please fill out the following items.

  - type: input
    attributes:
      label: 発生環境 / Environment
      description: |
        バグが発生した環境を記載してください
        Please describe the environment where the bug occurred
      placeholder: "例: Production / Sandbox / Developer Edition"
    validations:
      required: true

  - type: textarea
    attributes:
      label: バグの内容 / Bug Description
      description: |
        バグの内容を具体的に記載してください
        Please describe the bug in detail
      placeholder: |
        例:
        1. どのような操作を行ったか
        2. 何が起きたか
        3. 期待する動作

        Example:
        1. What actions were taken
        2. What happened
        3. Expected behavior
    validations:
      required: true

  - type: textarea
    attributes:
      label: 再現手順 / Steps to Reproduce
      description: |
        バグを再現するための手順を記載してください
        Please provide steps to reproduce the bug
      placeholder: |
        1. '...' へ移動
        2. '...' をクリック
        3. '...' を入力
        4. エラーが発生

        1. Go to '...'
        2. Click on '...'
        3. Enter '...'
        4. See error
    validations:
      required: true

  - type: textarea
    attributes:
      label: スクリーンショット / Screenshots
      description: |
        可能であれば、スクリーンショットを添付してください
        If possible, please attach screenshots
      placeholder: |
        スクリーンショットをここにドラッグ&ドロップ
        Drag and drop screenshots here
    validations:
      required: false

  - type: textarea
    attributes:
      label: 追加情報 / Additional Information
      description: |
        その他、関連する情報があれば記載してください
        Please provide any additional relevant information
    validations:
      required: false
```

### 2.2 New Task Template (new_task.yml)

```yaml
name: 新規タスク / New Task
description: 新規タスクの作成用テンプレート / Template for new tasks
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        新規タスクの作成ありがとうございます。以下の項目を記入してください。
        Thank you for creating a new task. Please fill out the following items.

  - type: input
    attributes:
      label: タスクの概要 / Task Summary
      description: |
        タスクの概要を簡潔に記載してください
        Please provide a brief summary of the task
      placeholder: "例: ユーザー認証機能の実装 / Example: Implement user authentication"
    validations:
      required: true

  - type: textarea
    attributes:
      label: 詳細な説明 / Detailed Description
      description: |
        タスクの詳細な説明を記載してください
        Please provide a detailed description of the task
      placeholder: |
        - 目的 / Purpose
        - 要件 / Requirements
        - 制約条件 / Constraints
    validations:
      required: true

  - type: textarea
    attributes:
      label: 受け入れ基準 / Acceptance Criteria
      description: |
        タスクが完了したと判断するための基準を記載してください
        Please list the criteria that must be met for this task to be considered complete
      placeholder: |
        - [ ] 基準1 / Criteria 1
        - [ ] 基準2 / Criteria 2
        - [ ] 基準3 / Criteria 3
    validations:
      required: true

  - type: textarea
    attributes:
      label: 技術的な考慮事項 / Technical Considerations
      description: |
        実装時に考慮すべき技術的な事項を記載してください
        Please list any technical considerations for implementation
      placeholder: |
        - 使用する技術 / Technologies to use
        - 影響範囲 / Scope of impact
        - 注意点 / Points to note
    validations:
      required: false

  - type: textarea
    attributes:
      label: 関連リソース / Related Resources
      description: |
        関連するドキュメントやリソースへのリンクを記載してください
        Please provide links to related documents or resources
      placeholder: |
        - 関連ドキュメント / Related documents
        - 参考URL / Reference URLs
    validations:
      required: false
```

## 3. 実装手順

1. `.github/ISSUE_TEMPLATE/` ディレクトリの作成
2. `bugfix.yml` テンプレートの作成と実装
3. `new_task.yml` テンプレートの作成と実装
4. テンプレートの動作確認
   - 実際にIssueを作成して各フィールドが正しく表示されることを確認
   - 必須項目が適切に機能することを確認
   - 日本語/英語の表示が適切であることを確認

## 4. 期待される結果

- 2種類のIssueテンプレート（バグ報告と新規タスク）が利用可能になる
- 各テンプレートは日本語と英語の両方でユーザーをガイドする
- 必要な情報が漏れなく収集できる構造化されたフォーマット
- GitHubのIssue作成画面で適切にフォームが表示される
