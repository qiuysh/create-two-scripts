module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // 运行测试前可执行的脚本(包含enzyme的注册)
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['jsx', 'js', 'json'],
  transform: {
    "^.+\\.jsx?$": "js-jest",
  },
  transformIgnorePatterns: [
    '<rootDir>/dist/', 
    '<rootDir>/.vscode/',
    '<rootDir>/node_modules/(?!(lodash-es|other-es-lib|@ant-design))',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    'iconfont.js': 'identity-obj-proxy',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@public(.*)$': [
      '<rootDir>/public/images/$1',
      '<rootDir>/public/styles/$1',
    ],
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
  },
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/.vscode/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{jsx,js}'], 
  coverageDirectory: '<rootDir>/.coverage', 
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/.vscode/'],
  testMatch: [ 
    '<rootDir>/src/__tests__/**/?(*.)(spec|test).{js,jsx}',
  ]
}