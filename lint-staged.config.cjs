module.exports = {
  './src/**/*': [() => 'npm run ci.typecheck'],
  '**/*': ['npm run ci.prettier -- --write'],
};
