-- Add migration script here
CREATE TABLE IF NOT EXISTS articles (
  id          SMALLSERIAL,                                    -- ID
  title       TEXT        NOT NULL,                           -- タイトル
  img_url     TEXT        NOT NULL,                           -- サムネイル
  tags        TEXT[],                                         -- タグ
  content     TEXT        NOT NULL,                           -- 内容
  visibility  BOOLEAN     NOT NULL DEFAULT TRUE,              -- 公開・非公開
  created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 作成日
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 更新日
  pv          INTEGER     NOT NULL DEFAULT 0,                 -- PV数
  PRIMARY KEY (id)
);