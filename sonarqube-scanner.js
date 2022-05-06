const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://192.168.66.30:9002",
    token: "adee09421bd3f0035e07b3df892b369f1a5f702e",
    options: {
      "sonar.sources": "./src",
      "sonar.javascript.file.suffixes": ".js,.jsx",
    },
  },
  () => process.exit()
);
