// 記事のデータ形式
export type Article = {
  // 記事ID (連番/作成順)
  id: number;
  // タイトル
  title: string;
  // タグ
  tags: string[];
  // 記事の内容(markdown形式)
  content: string;
  // サムネイルの画像URL
  img_url: string;
  // 可視性
  visibility: boolean
  // 投稿時刻
  created_at: Date;
  // 最終更新時刻
  updated_at: Date;
}