// 'use strict'
const path = require('path');

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/')
            }
        }
    },
    devServer: {
        disableHostCheck: true,
        transportMode: 'ws',
    },
    
    /*
    devServer: {
     host: 'localhost',
     port: 8080, // CHANGE YOUR PORT HERE!
     https: true,
     hotOnly: false,
     disableHostCheck: true
   },
   
   devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8080
    }

   */
   /*
     configureWebpack: {
       devServer: {
           host: 'localhost',
           port: '8080',
       }
     }
     */
}

// module.exports = {
//   publicPath: '/'
// }

// module.exports = { 
//   "transpileDependencies": [
//     "vuetify"
//   ],
//   configureWebpack: {
//       devServer: {
//           host: 'ec2-13-125-252-79.ap-northeast-2.compute.amazonaws.com',
//           port: '8080',
//           /*proxy: {
//             '/api': {
//                 target: 'http://ec2-13-125-252-79.ap-northeast-2.compute.amazonaws.com:3000',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }*/
//       }
//     }
// }


