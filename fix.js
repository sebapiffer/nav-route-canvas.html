const fs = require('fs');

const html = fs.readFileSync('single_file_app.html', 'utf-8');

// Extract CSS base64
const cssMatch = html.match(/const css = atob\("([^"]+)"\);/);
const cssBase64 = cssMatch[1];
const cssContent = Buffer.from(cssBase64, 'base64').toString('utf-8');

// Extract JS base64
const jsMatch = html.match(/const js = atob\("([^"]+)"\);/);
const jsBase64 = jsMatch[1];
const jsContent = Buffer.from(jsBase64, 'base64').toString('utf-8');

// Escape closing script tags in JS
const escapedJsContent = jsContent.replace(/<\/script>/g, '<\\/script>');

const newHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AeroCAD</title>
    <style>
${cssContent}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
${escapedJsContent}
    </script>
  </body>
</html>`;

fs.writeFileSync('single_file_app_fixed.html', newHtml);
console.log('Successfully created single_file_app_fixed.html');
