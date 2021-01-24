import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/fork-join-deep.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/fork-join-deep.umd.js',
      format: 'umd',
      name: 'fork-join-deep',
      globals: {
        rxjs: 'RxJS',
      },
      sourcemap: true,
    },
    {
      file: 'dist/fork-join-deep.cjs.js',
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
