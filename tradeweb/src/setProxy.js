const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://43.202.180.138:8080',
      changeOrigin: true,
      secure: false, // https 환경에서 사용 시 false로 설정
      pathRewrite: { '^/api': '' }, // 경로 재작성
    })
  );
};
