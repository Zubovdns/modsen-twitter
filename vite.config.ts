import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production';

	return {
		plugins: [react(), babel(), svgr()],
		resolve: {
			alias: {
				'@src': path.resolve(__dirname, 'src'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@constants': path.resolve(__dirname, 'src/constants'),
				'@hooks': path.resolve(__dirname, 'src/hooks'),
				'@interface': path.resolve(__dirname, 'src/interface'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@routes': path.resolve(__dirname, 'src/routes'),
				'@store': path.resolve(__dirname, 'src/store'),
				'@styles': path.resolve(__dirname, 'src/styles'),
				'@types': path.resolve(__dirname, 'src/types'),
				'@utils': path.resolve(__dirname, 'src/utils'),
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
