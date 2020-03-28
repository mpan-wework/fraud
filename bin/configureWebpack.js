const { execSync } = require('child_process');

module.exports = (webpackConfig) => {
  const definePlugin = webpackConfig.plugins.find(
    (plugin) => plugin.__proto__.constructor.name === 'DefinePlugin'
  );
  definePlugin.definitions['process.env'].GIT_COMMIT = JSON.stringify(
    process.env.COMMIT_REF ||
      execSync('git rev-parse HEAD').toString().trim() ||
      ''
  );
  definePlugin.definitions['process.env'].BUILD_DATE = JSON.stringify(
    new Date().toISOString()
  );

  // console.log(webpackConfig);
};
