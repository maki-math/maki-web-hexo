import React from 'react';

export function PdfViewer({ src }) {
	// src = 'path/viewer.html?' + src; 
	src = 'https://jiandandaoxingfu.github.io/pdfviewer/index.html';
	return (
		<iframe src={src} style={{ width: '100%', height: '100%', marginBottom: '20px', frameborder: 0 }}></iframe>
	);
}
