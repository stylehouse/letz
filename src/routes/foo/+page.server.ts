import { execSync } from 'child_process';
import { invalid } from '@sveltejs/kit';

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
        let p = data.get('page')
        if (1*p != p && p) {
            return invalid(422,{error:"BADPAGE"})
        }
        page = p
	}
};
