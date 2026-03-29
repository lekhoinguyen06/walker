declare const nextConfig: () => Promise<{
  transform?:
    | {
        [x: string]: string | [string, unknown];
      }
    | undefined;
  filter?: string | undefined;
  id?: string | undefined;
  displayName?:
    | string
    | {
        color:
          | 'red'
          | 'black'
          | 'green'
          | 'yellow'
          | 'blue'
          | 'magenta'
          | 'cyan'
          | 'white'
          | 'gray'
          | 'grey'
          | 'blackBright'
          | 'redBright'
          | 'greenBright'
          | 'yellowBright'
          | 'blueBright'
          | 'magentaBright'
          | 'cyanBright'
          | 'whiteBright';
        name: string;
      }
    | undefined;
  automock?: boolean | undefined;
  cache?: boolean | undefined;
  cacheDirectory?: string | undefined;
  clearMocks?: boolean | undefined;
  collectCoverageFrom?: string[] | undefined;
  coverageDirectory?: string | undefined;
  coveragePathIgnorePatterns?: string[] | undefined;
  coverageReporters?:
    | (
        | 'html'
        | 'text'
        | 'none'
        | 'json'
        | 'clover'
        | 'cobertura'
        | 'html-spa'
        | 'json-summary'
        | 'lcov'
        | 'lcovonly'
        | 'teamcity'
        | 'text-lcov'
        | 'text-summary'
        | [
            (
              | 'html'
              | 'text'
              | 'none'
              | 'json'
              | 'clover'
              | 'cobertura'
              | 'html-spa'
              | 'json-summary'
              | 'lcov'
              | 'lcovonly'
              | 'teamcity'
              | 'text-lcov'
              | 'text-summary'
            ),
            {
              [x: string]: unknown;
            },
          ]
      )[]
    | undefined;
  dependencyExtractor?: string | undefined;
  detectLeaks?: boolean | undefined;
  detectOpenHandles?: boolean | undefined;
  extensionsToTreatAsEsm?: string[] | undefined;
  fakeTimers?:
    | ({
        enableGlobally?: boolean | undefined;
      } & (
        | {
            advanceTimers?: number | boolean | undefined;
            doNotFake?:
              | (
                  | 'Date'
                  | 'hrtime'
                  | 'nextTick'
                  | 'performance'
                  | 'queueMicrotask'
                  | 'requestAnimationFrame'
                  | 'cancelAnimationFrame'
                  | 'requestIdleCallback'
                  | 'cancelIdleCallback'
                  | 'setImmediate'
                  | 'clearImmediate'
                  | 'setInterval'
                  | 'clearInterval'
                  | 'setTimeout'
                  | 'clearTimeout'
                )[]
              | undefined;
            now?: number | undefined;
            timerLimit?: number | undefined;
            legacyFakeTimers?: false | undefined;
          }
        | {
            legacyFakeTimers?: true | undefined;
          }
      ))
    | undefined;
  forceCoverageMatch?: string[] | undefined;
  globals?:
    | {
        [x: string]: unknown;
      }
    | undefined;
  globalSetup?: string | null | undefined;
  globalTeardown?: string | null | undefined;
  haste?:
    | {
        computeSha1?: boolean | undefined;
        defaultPlatform?: string | null | undefined;
        forceNodeFilesystemAPI?: boolean | undefined;
        enableSymlinks?: boolean | undefined;
        hasteImplModulePath?: string | undefined;
        platforms?: string[] | undefined;
        throwOnModuleCollision?: boolean | undefined;
        hasteMapModulePath?: string | undefined;
        retainAllFiles?: boolean | undefined;
      }
    | undefined;
  injectGlobals?: boolean | undefined;
  reporters?:
    | (
        | string
        | [
            string,
            {
              [x: string]: unknown;
            },
          ]
      )[]
    | undefined;
  moduleDirectories?: string[] | undefined;
  moduleFileExtensions?: string[] | undefined;
  moduleNameMapper?:
    | {
        [x: string]: string | string[];
      }
    | undefined;
  modulePathIgnorePatterns?: string[] | undefined;
  modulePaths?: string[] | undefined;
  openHandlesTimeout?: number | undefined;
  preset?: string | null | undefined;
  prettierPath?: string | null | undefined;
  resetMocks?: boolean | undefined;
  resetModules?: boolean | undefined;
  resolver?: string | null | undefined;
  restoreMocks?: boolean | undefined;
  rootDir?: string | undefined;
  roots?: string[] | undefined;
  runner?: string | undefined;
  runtime?: string | undefined;
  sandboxInjectedGlobals?: string[] | undefined;
  setupFiles?: string[] | undefined;
  setupFilesAfterEnv?: string[] | undefined;
  skipFilter?: boolean | undefined;
  skipNodeResolution?: boolean | undefined;
  slowTestThreshold?: number | undefined;
  snapshotResolver?: string | undefined;
  snapshotSerializers?: string[] | undefined;
  snapshotFormat?:
    | {
        min?: boolean | undefined;
        theme?:
          | {
              value?: string | undefined;
              content?: string | undefined;
              comment?: string | undefined;
              prop?: string | undefined;
              tag?: string | undefined;
            }
          | undefined;
        callToJSON?: boolean | undefined;
        compareKeys?: null | undefined;
        escapeRegex?: boolean | undefined;
        escapeString?: boolean | undefined;
        highlight?: boolean | undefined;
        indent?: number | undefined;
        maxDepth?: number | undefined;
        maxWidth?: number | undefined;
        printBasicPrototype?: boolean | undefined;
        printFunctionName?: boolean | undefined;
      }
    | undefined;
  errorOnDeprecated?: boolean | undefined;
  testEnvironment?: string | undefined;
  testEnvironmentOptions?:
    | {
        [x: string]: unknown;
      }
    | undefined;
  testLocationInResults?: boolean | undefined;
  testMatch?: string | string[] | undefined;
  testPathIgnorePatterns?: string[] | undefined;
  testRegex?: string | string[] | undefined;
  testRunner?: string | undefined;
  testTimeout?: number | undefined;
  transformIgnorePatterns?: string[] | undefined;
  watchPathIgnorePatterns?: string[] | undefined;
  unmockedModulePathPatterns?: string[] | undefined;
  waitForUnhandledRejections?: boolean | undefined;
  workerIdleMemoryLimit?: string | number | undefined;
  cwd?: string | undefined;
}>;
export default nextConfig;
//# sourceMappingURL=next.d.ts.map
