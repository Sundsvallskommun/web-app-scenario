module.exports = function (api) {
  const callerName = api.caller((caller) => caller?.name) ?? 'unknown';
  api.cache.using(
    () =>
      `${process.env.NODE_ENV ?? 'development'}:${callerName}:${process.env.CYPRESS_COVERAGE ?? 'false'}:${process.env.COVERAGE ?? 'false'}`
  );

  const isJest = callerName === 'babel-jest';
  const useIstanbul = !isJest && (process.env.CYPRESS_COVERAGE === 'true' || process.env.COVERAGE === 'true');

  return {
    presets: ['@babel/preset-env', '@babel/preset-react', 'next/babel'],
    plugins: useIstanbul ? ['istanbul'] : [],
  };
};
