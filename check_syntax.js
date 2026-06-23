const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/App.jsx'],
  bundle: true,
  write: false,
  logLevel: 'silent',
}).then(result => {
  console.log("SUCCESS: Src compiles perfectly!");
}).catch(err => {
  console.error("COMPILE ERROR DETECTED:");
  if (err.errors) {
    err.errors.forEach(e => {
      console.error(`File: ${e.location.file}:${e.location.line}:${e.location.column}`);
      console.error(`Error: ${e.text}`);
      console.error(`Line: ${e.location.lineText}`);
    });
  } else {
    console.error(err);
  }
});
