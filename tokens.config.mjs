import pluginCSS from '@cobalt-ui/plugin-css';

/** @type {import("@cobalt-ui/core").Config} */
export default {
  tokens: './src/tokens/warm.json',
  outDir: './public/static/',
  plugins: [
    pluginCSS({
      filename: './warm.variables.css',
      transform(token, mode) {
        switch (token.$type) {
          case 'elevation': {
            console.log('elevation', token.$value);
            
            return String(token.$value);
            break;
          }
        }
      },
    }),
  ],
};
