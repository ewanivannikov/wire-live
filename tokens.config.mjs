import pluginCSS from '@cobalt-ui/plugin-css';

/** @type {import("@cobalt-ui/core").Config} */
export default {
  tokens: './src/tokens.json',
  outDir: './src/modules/layout/',
  plugins: [pluginCSS({
    transform(token, mode) {
        switch (token.$type) {
          case "elevation": {
            return String(token.$value);
            break;
          }
        }
      },
  })],
};
