import pluginCSS from '@cobalt-ui/plugin-css';

/** @type {import("@cobalt-ui/core").Config} */
export default {
  tokens: './src/tokens/light.json',
  outDir: './public/',
  plugins: [
    pluginCSS({
      filename: "./light.variables.css",
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
