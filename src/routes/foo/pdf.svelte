<script>
    // this needs to be pdf.Server.svelte
    import { execSync } from 'child_process';

    function pdfToPng(pdfPath, pageNum) {
        const pngPath = `${pdfPath}-page-${pageNum}.png`;
        const command = `convert -density 150 "${pdfPath}[${pageNum - 1}]" "static/${pngPath}"`;
        execSync(command);
        return pngPath;
    }
</script>
<h2>pdf<img src={pdfToPng('abop.pdf', 87)} alt="Page 87 of my PDF file" /></h2>