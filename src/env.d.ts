/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * API 地址
   */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
