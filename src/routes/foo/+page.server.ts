import { execSync } from 'child_process';

function pdfToPng(pdfPath, pageNum) {
    const pngPath = `${pdfPath}-page-${pageNum}.png`;
    const command = `convert -density 150 "${pdfPath}[${pageNum - 1}]" "static/${pngPath}"`;
    execSync(command);
    return pngPath;
}

export function load() {
	return {
        png: pdfToPng('abop.pdf', 99)
    }
}