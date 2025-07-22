// PDF文件配置 - 需要修改的部分！
const pdfFiles = [
    { 
        name: "用户手册v1.2.pdf", 
        path: "/it-manual/pdfs/it-manual-cn-v1.2.pdf",
        description: "it系列中文产品使用手册" 
    },
    { 
        name: "并机手册v1.0.pdf", 
        path: "/it-manual/pdfs/it_et_parallel_connection-manual-cn-v1.0.pdf",
        description: "it和et系列控制器并机手册" 
    }
    // 可以继续添加更多文件...
];

// 生成PDF列表
function generatePDFList() {
    const container = document.getElementById('pdfList');
    container.innerHTML = '';

    pdfFiles.forEach(file => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-4 border border-gray-200 rounded-lg';
        item.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fa ${file.icon} text-red-500 text-xl"></i>
                <span>${file.name}</span>
            </div>
            <a href="${file.path}" download 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
               下载
            </a>
        `;
        container.appendChild(item);
    });
}
// 生成二维码
document.getElementById('generateQrBtn').addEventListener('click', () => {
    const qrContainer = document.getElementById('qrcodeContainer');
    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
        text: window.location.href,
        width: 180,
        height: 180,
        colorDark: "#2c3e50"
    });
});

// 初始化
window.onload = function() {
    generatePDFList();
    document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('zh-CN');
};