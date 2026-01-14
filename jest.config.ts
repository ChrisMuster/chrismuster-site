// jest.config.ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFiles: ['<rootDir>/jest.globals.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node'],
    pretendToBeVisual: false,
  },
  moduleNameMapper: {
    '^@/app/data/(.*)\\.json$': '<rootDir>/app/data/$1.json',
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/page-components/(.*)$': '<rootDir>/app/page-components/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  forceExit: true,
  // detectOpenHandles: true,
};

export default createJestConfig(customJestConfig);
