import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',

  output: {
    file: './dist/form-validator-utils.js',
    format: 'umd',
    name: 'Validator'
  },
  
  plugins: [
    babel({
      exclude: './node_modules/**'
    }),
  ]
}