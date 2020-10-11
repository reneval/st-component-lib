module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/init.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/stubMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/stubMock.js',
  },
};
