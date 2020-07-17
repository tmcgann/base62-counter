// rollup main.js --file bundle.js --format umd --name "myBundle"
export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/csv.js',
    output: {
      file: 'dist/csv.js',
      format: 'cjs',
    },
  },
]
