drop table if exists mywallets cascade;
drop table if exists badge_vcs cascade;
drop table if exists badge_customers cascade;
drop table if exists submissions cascade;
drop table if exists badge_issuer_selectors cascade;
-- ----------------------------------------------------------------------------------------------------

-- マイウォレット
create table mywallets (
    mywallet_id serial not null,    -- ウォレットID
    orthros_id text not null,       -- オルトロスID
    created_at timestamp not null,  -- 作成日時
    primary key (mywallet_id)
);

create unique index on mywallets (
    orthros_id
);

-- バッジVCテーブル
create table badge_vcs (
    badge_vc_id serial not null,                      -- バッジVC ID
    mywallet_id integer not null,                     -- マイウォレットID
    badge_issuer_selector_id varchar(256) not null,   -- バッジ発行者選択ID
    badge_issuer_selector_name varchar(256)not  null, -- バッジ発行者選択名
    badge_name varchar(256) not null,                 -- バッジ名
    badge_owner_email text not null,                  -- バッジ所有者EMail
    badge_class_id text not null,                     -- バッジクラスID
    badge_issuer_name varchar(256) not null,          -- バッジ発行者名
    badge_issuedon timestamp not null,                -- バッジ発行日時
    badge_expires timestamp not null,                 -- バッジ有効期限
    vc_data_header text not null,                     -- VCデータヘッダ
    vc_data_payload text not null,                    -- VCデータペイロード
    vc_data_signature text not null,                  -- VCデータ署名
    created_at timestamp not null,                    -- 作成日時
    deleted_at timestamp null,                        -- 削除日時
    primary key (badge_vc_id),
    foreign key (mywallet_id) references mywallets (mywallet_id)
);

create index on badge_vcs (
    mywallet_id
);

-- 提出先
create table badge_customers (
    customer_id serial not null,                  -- バッジ提出先ID
    customer_name varchar(256) not null,          -- バッジ提出先名
    cabinet_url text not null,                    -- キャビネットURL
    primary key (customer_id)
);

-- 提出履歴
create table submissions (
    badge_vc_id integer not null,                 -- バッジVC ID
    mywallet_id integer not null,                 -- マイウォレットID
    submited_at timestamp not null,               -- 提出日時
    submission_email text not null,               -- 提出EMAILアドレス
    customer_id integer not null,                 -- バッジ提出先ID
    customer_name varchar(256) not null,          -- バッジ提出先名
    primary key (badge_vc_id, submited_at),
    foreign key (badge_vc_id) references badge_vcs (badge_vc_id)
);

create index on submissions (
    mywallet_id
);

-- バッジ発行者選択
create table badge_issuer_selectors (
    badge_issuer_selector_id serial not null,            -- バッジ発行者選択ID
    badge_issuer_selector_name varchar(256) not null,    -- バッジ発行者選択名
    badge_issue_url text not null,                       -- バッジ発行URL
    sso_enable boolean not null,                         -- SSO可否
    primary key (badge_issuer_selector_id)
);
