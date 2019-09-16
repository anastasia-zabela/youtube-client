module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
  ],
  moduleNameMapper: {
    '.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
};
