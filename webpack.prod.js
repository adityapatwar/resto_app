import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import { InjectManifest } from 'workbox-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'), // Lokasi file sumber Service Worker
      swDest: 'sw.js', // Output file di dist
    }),
  ],
});
