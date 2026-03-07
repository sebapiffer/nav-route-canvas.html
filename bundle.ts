import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const assetsDir = path.resolve(distDir, 'assets');
const outputFile = path.resolve(process.cwd(), 'single_file_app.html');

function bundle() {
  console.log('Starting bundle...');

  // Read index.html
  let html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // Find CSS and JS files
  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find(f => f.endsWith('.css'));
  const jsFile = files.find(f => f.endsWith('.js'));

  if (!cssFile || !jsFile) {
    console.error('CSS or JS file not found');
    process.exit(1);
  }

  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');

  // Escape closing script tags in JS to prevent premature termination
  const escapedJsContent = jsContent.replace(/<\/script>/g, '<\\/script>');

  // Replace CSS link
  const cssRegex = /<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+"[^>]*>/;
  html = html.replace(cssRegex, () => `<style>\n${cssContent}\n</style>`);

  // Replace JS script
  const jsRegex = /<script[^>]+src="\/assets\/[^"]+"[^>]*><\/script>/;
  html = html.replace(jsRegex, () => `<script type="module">\n${escapedJsContent}\n</script>`);

  // Write output
  fs.writeFileSync(outputFile, html);
  console.log(`Bundled app written to ${outputFile}`);
}

bundle();
