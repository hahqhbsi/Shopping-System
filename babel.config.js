module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', 
   // 这一行通常不需要，因为 @vue/cli-service 已经包含了它
  ],
   "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]

};
