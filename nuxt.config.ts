export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/_vars.scss" as *;',
        },
      },
    },
  },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    '@fortawesome/fontawesome-svg-core/styles.css',
    "@/assets/style/index.scss"
  ],
});
