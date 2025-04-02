import writeYamlFile from 'write-yaml-file'
import * as pkg from "./package.json" with { type: "json" };
import fs from 'fs';

const filename =  pkg.default.name + ".yml"

// Only import the entry file. If you there are multiple entrypoints, you'll
// need to list them all here. 
const jsFiles = [pkg.default.name + ".js"]

// Check if CSS has been generated
const cssFiles = []

fs.readdir('dist/', (err, files) => {
  files.forEach(file => {
    const isCss = file.split(".")[file.split(".").length -1] === "css"
    if (isCss) cssFiles.push(file)
  });
});

const json = {
  name: "Stash Mergers",
  description: pkg.default.description,
  url: pkg.default.homepage,
  version: pkg.default.version,
  ui: {
    assets: {
      "/": "."
    },
    javascript: jsFiles,
    css: cssFiles
  }
}

writeYamlFile('dist/' + filename, json).then(() => {
  console.log('Generated source file "' + filename + '".')
})