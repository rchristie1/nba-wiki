const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    [
      '/playercareerstats',
      '/commonplayerinfo',
      '/teaminfocommon',
      '/commonteamroster',
      '/teamgamelog',
      '/commonallplayers',
      '/leagueleaders',
      '/playergamelog'
    ],
    proxy({ target: 'https://stats.nba.com/stats', changeOrigin: true })
  );
};
