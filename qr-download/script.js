// PDF文件配置 - 需要修改的部分！
const pdfFiles = [
    { 
        name: "用户手册v1.2.pdf", 
        path: "pdfs/it-manual-cn-v1.2.pdf",
        description: "it系列中文产品使用手册" 
    },
    { 
        name: "并机手册v1.0.pdf", 
        path: "pdfs/it_et_parallel_connection-manual-cn-v1.0.pdf",
        description: "it和et系列控制器并机手册" 
    }
    // 可以继续添加更多文件...
];

// 生成PDF列表
function generatePDFList() {
    const container = document.getElementById('pdf-list');
    
    pdfFiles.forEach(file => {
        const item = document.createElement('div');
        item.className = 'pdf-item';
        item.innerHTML = `
            <div>
                <strong>${file.name}</strong>
                ${file.description ? `<p class="file-desc">${file.description}</p>` : ''}
            </div>
            <a href="${file.path}" download="${file.name}" class="download-btn">
                下载
            </a>
        `;
        container.appendChild(item);
    });
}

// 生成二维码
function generateQRCode() {
    const currentUrl = window.location.href;
    new QRCode(document.getElementById("qrcode"), {
        text: currentUrl,
        width: 180,
        height: 180,
        colorDark: "#2c3e50",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 页面加载时执行
window.onload = function() {
    generatePDFList();
    generateQRCode();
};