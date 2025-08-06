Task
The project implements a calculator with basic arithmetic operations (addition, subtraction, multiplication, division) and additional functions like percentage calculation.
Link to Task Description: https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0

How to run the app
1. Prerequisites:
  Node.js (v14+ recommended)
  npm (comes with Node.js)

3. Installation:
npm install

3. Production Build:
npm run build
Creates optimized build in /dist folder
Files are minified and ready for deployment

Project Structure
/dist	- Production-ready built files
/src/js -	Calculator logic and main application script, JavaScript
/src/scss - All styles divided into components, using SCSS
/src/scss/base - Variables and mixins
/src/scss/blocks - Component-specific styles
webpack.config.js - Build configuration
eslint.config.js - Code quality rules
.prettierrc - Prettier config file
index.html - The main HTML file
