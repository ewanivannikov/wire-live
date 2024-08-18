import pluginCSS from '@cobalt-ui/plugin-css';

/** @type {import("@cobalt-ui/core").Config} */
export default {
  tokens: ['./src/tokens/cream.json', './src/tokens/dusk.json', './src/tokens/warm.json'],
  outDir: './src/public/',
  plugins: [
    pluginCSS({
      transform(token, mode) {
        switch (token.$type) {
          case 'elevation': {
            return String(token.$value);
            break;
          }
        }
      },
    }),
  ],
};
