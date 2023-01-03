#/bin/bash
sed -e '$s/$/\n/' fe-question-full-*.js script.js > concat.js
npx webpack --config webpack.config.js 2> /dev/null