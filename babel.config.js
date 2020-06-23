// babel.config.js
module.exports ={
    preset: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript"
    ],
    plugins: [
       "@babel/plugin-transform-runtime",
       "@babel/proposal-class-properties",
      ["import", {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
    }]
    ]
  }
  