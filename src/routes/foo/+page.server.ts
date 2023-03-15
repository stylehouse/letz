import { execSync } from 'child_process';

let page = 99
function pdfToPng(pdfPath, pageNum) {
    const pngPath = `${pdfPath}-page-${pageNum}.png`;
    const command = `convert -density 150 "${pdfPath}[${pageNum - 1}]" "static/${pngPath}"`;
    execSync(command);
    return pngPath;
}

export function load() {
	return {
        png: pdfToPng('abop.pdf', page),
        page
    }
}
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		page = data.get('page')
	}
};
