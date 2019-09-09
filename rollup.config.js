export default {
    input: 'src/pd.js',
    output: [
        {
            file: 'dist/pd.js',
            format: 'esm'
        },
        {
            file: 'dist/demo/admin/pd.js',
            format: 'esm'
        },
        {
            file: 'dist/demo/cv/pd.js',
            format: 'esm'
        }
    ]
}