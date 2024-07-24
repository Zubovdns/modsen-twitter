import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production';

	return {
		plugins: [react(), babel()],
		resolve: {
			alias: {
				'@src': path.resolve(__dirname, 'src'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@stories': path.resolve(__dirname, 'src/stories'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@constants': path.resolve(__dirname, 'src/constants'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@icons': path.resolve(__dirname, 'src/assets/icons'),
				'@styles': path.resolve(__dirname, 'src/styles'),
			},
		},
		server: {
			open: true,
			port: 3001,
		},
		build: {
			outDir: 'dist',
			rollupOptions: {
				input: path.resolve(__dirname, 'index.html'),
				output: {
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id
								.toString()
								.split('node_modules/')[1]
								.split('/')[0]
								.toString();
						}
					},
				},
			},
			terserOptions: isProduction
				? { compress: { drop_console: true, drop_debugger: true } }
				: {},
			assetsInlineLimit: 4096,
			chunkSizeWarningLimit: 500,
		},
		optimizeDeps: isProduction
			? { include: ['react', 'react-dom', 'styled-components'] }
			: {},
	};
});
