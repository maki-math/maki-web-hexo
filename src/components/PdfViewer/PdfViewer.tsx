import React from 'react';

export function PdfViewer({ src }) {
	src = 'statics/pdf-js/web/viewer.html?' + src;
	return (
		<iframe src={src} style={{ width: '100%', height: '100%', marginBottom: '20px', frameborder: 0 }}></iframe>
	);
}
