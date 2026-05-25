// src/assets/scripts/js/data.js

/**
 * ステータス定義の一括管理
 */
export const STATUS_CONFIG = {
  pending: {
    text: "確認待ち",
    class: "bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
  },
  processing: {
    text: "処理中",
    class: "bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-700/10",
  },
  completed: {
    text: "完了",
    class: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20",
  },
  error: {
    text: "エラー",
    class: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-600/10",
  },
};

/**
 * ランダムな日付を生成するヘルパー（直近30日分）
 */
const getRandomDate = () => {
  const now = new Date();
  const pastDate = new Date(
    now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000,
  );

  const y = pastDate.getFullYear();
  const m = String(pastDate.getMonth() + 1).padStart(2, "0");
  const d = String(pastDate.getDate()).padStart(2, "0");
  const hh = String(pastDate.getHours()).padStart(2, "0");
  const mm = String(pastDate.getMinutes()).padStart(2, "0");
  const ss = String(pastDate.getSeconds()).padStart(2, "0");

  return `${y}/${m}/${d} ${hh}:${mm}:${ss}`;
};

// --- 担当者リストを外部から使えるように定数化 ---
export const ASSIGNEE_LIST = [
  "システム運用 Aチーム",
  "SREエンジニア (佐藤)",
  "セキュリティ監査室",
  "DB管理者 (田中)",
  "自動復旧スクリプト",
  "外部監視ベンダー",
];

/**
 * モックデータの生成（300件）
 */
export const mockData = Array.from({ length: 300 }, (_, i) => {
  const id = (i + 1).toString().padStart(4, "0");

  // カテゴリと担当者のバリエーション
  const categories = [
    "API通信",
    "データベース",
    "セキュリティ",
    "バックアップ",
    "リソース監視",
    "ユーザー認証",
  ];
  const category = categories[i % categories.length];

  const assignees = [
    "システム運用 Aチーム",
    "SREエンジニア (佐藤)",
    "セキュリティ監査室",
    "DB管理者 (田中)",
    "自動復旧スクリプト",
    "外部監視ベンダー",
  ];

  // --- 定数化したリストを使用するように変更 ---
  const assignee = ASSIGNEE_LIST[i % ASSIGNEE_LIST.length];

  // ステータスの決定（あえてランダムではなく一定の周期にすることでテストしやすくしています）
  const statusKeys = Object.keys(STATUS_CONFIG);
  const currentStatusKey = statusKeys[i % statusKeys.length];
  const statusInfo = STATUS_CONFIG[currentStatusKey];

  const timestamp = getRandomDate();

  return {
    id: id,
    name: `[${category}] 警告イベント ID-${id}`,
    status: currentStatusKey,
    statusText: statusInfo.text,
    statusClass: statusInfo.class,
    updatedAt: timestamp,
    assignee: assignee,
    description: `${category} カテゴリにおいて、異常な閾値を検知しました。リクエストID: req-${10000 + i}。ソース元: node-${Math.floor(i / 10) + 1}。至急確認が必要です。`,
    rawLog: JSON.stringify(
      {
        event_id: `EV-${id}`,
        timestamp: timestamp.replace(/\//g, "-").replace(" ", "T") + "Z",
        severity: currentStatusKey === "error" ? "CRITICAL" : "WARNING",
        module: category.toLowerCase(),
        metrics: {
          usage_rate: (Math.random() * 100).toFixed(2) + "%",
          response_time: (Math.random() * 1000).toFixed(0) + "ms",
        },
        metadata: {
          server_node: `node-${Math.floor(i / 10) + 1}`,
          region: "ap-northeast-1",
          version: "v4.2.0-stable",
        },
      },
      null,
      2,
    ),
  };
});
