import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/forkJoinDeep.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/forkJoinDeep.umd.js',
      format: 'umd',
      name: 'forkJoinDeep',
      globals: {
        rxjs: 'RxJS',
      },
      sourcemap: true,
    },
    {
      file: 'dist/forkJoinDeep.cjs.js',
      format: 'cjs',
      exports: 'default',
      sourcemap: true,
    },
  ],
  external: ['rxjs'],
  plugins: [
    babel(),
    typescript(),
  ],
};

export default config;
