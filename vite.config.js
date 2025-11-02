export default {
  server: {
    proxy: {
      '/frankfurter': {
        target: 'https://api.frankfurter.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\/frankfurter/, ''),
      },
    },
  },
};
