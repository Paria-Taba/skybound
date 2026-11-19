export default { optimizeDeps: { esbuildOptions: { sourcemap: false } }, build: { rollupOptions: { input: { main: 'index.html', atlas: 'realm-preview.html' } } } };
