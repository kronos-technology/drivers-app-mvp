import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  modulePathIgnorePatterns: ['./cdk.out/', './dist/', './node_modules/'],
  automock: false,
  collectCoverage: true
};
export default config;
