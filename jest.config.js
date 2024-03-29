const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Configuración adicional de Jest
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
  },
};

module.exports = createJestConfig(customJestConfig);