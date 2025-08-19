/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GOOGLE_CLIENT_ID: string;
  // Add other env variables here if you have them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}