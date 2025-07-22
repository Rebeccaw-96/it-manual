// PDF文件列表 - 这里需要你根据自己的文件名称进行修改
const pdfFiles = [
    { name: '中文使用说明书', path: 'pdfs/it-manual-cn-v1.2.pdf' },
    { name: '英文使用说明书', path: 'pdfs/it-manual-en-v1.2.pdf' },
    { name: '中文并机使用说明书', path: 'pdfs/it_et_parallel_connection-manual-cn-v1.0.pdf' },
    { name: '英文并机使用说明书', path: 'pdfs/it_et_parallel_connection-manual-en-v1.0.pdf' }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 生成PDF文件列表
    generatePdfList();
    
    // 设置最后更新日期
    document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // 生成二维码按钮事件
    document.getElementById('generateQrBtn').addEventListener('click', generateQrCode);
});

// 生成PDF文件列表
function generatePdfList() {
    const pdfListElement = document.getElementById('pdfList');
    
    if (pdfFiles.length === 0) {
        pdfListElement.innerHTML = '<p class="text-gray-500 italic">暂无可用PDF文件</p>';
        return;
    }
    
    pdfListElement.innerHTML = '';
    
    pdfFiles.forEach(pdf => {
        const fileSizePromise = getFileSize(pdf.path);
        
        const listItem = document.createElement('div');
        listItem.className = 'pdf-card';
        
        fileSizePromise.then(fileSize => {
            listItem.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="bg-red-100 text-red-600 w-10 h-10 rounded-lg flex items-center justify-center">
                        <i class="fa fa-file-pdf-o text-xl"></i>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800">${pdf.name}</h3>
                        <p class="text-sm text-gray-500">${fileSize || '未知大小'} · PDF文件</p>
                    </div>
                </div>
                <a href="${pdf.path}" class="download-btn" download>
                    <i class="fa fa-download"></i>
                    <span>下载</span>
                </a>
            `;
        }).catch(() => {
            // 如果获取文件大小失败，显示默认样式
            listItem.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="bg-red-100 text-red-600 w-10 h-10 rounded-lg flex items-center justify-center">
                        <i class="fa fa-file-pdf-o text-xl"></i>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800">${pdf.name}</h3>
                        <p class="text-sm text-gray-500">未知大小 · PDF文件</p>
                    </div>
                </div>
                <a href="${pdf.path}" class="download-btn" download>
                    <i class="fa fa-download"></i>
                    <span>下载</span>
                </a>
            `;
        });
        
        pdfListElement.appendChild(listItem);
    });
}

// 获取文件大小
function getFileSize(filePath) {
    return new Promise((resolve, reject) => {
        fetch(filePath, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) throw new Error('无法获取文件信息');
                const contentLength = response.headers.get('content-length');
                if (!contentLength) throw new Error('文件大小信息不可用');
                const sizeInKB = (parseInt(contentLength) / 1024).toFixed(1);
                resolve(`${sizeInKB} KB`);
            })
            .catch(error => {
                console.error('获取文件大小失败:', error);
                reject(error);
            });
    });
}

// 生成二维码
function generateQrCode() {
    const qrcodeContainer = document.getElementById('qrcodeContainer');
    qrcodeContainer.innerHTML = '';
    
    // 获取当前页面URL
    const currentUrl = window.location.href;
    
    // 生成二维码
    new QRCode(qrcodeContainer, {
        text: currentUrl,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // 添加提示信息
    const qrCodeElement = qrcodeContainer.querySelector('canvas');
    if (qrCodeElement) {
        qrCodeElement.classList.add('qrcode');
        
        const hint = document.createElement('p');
        hint.className = 'mt-3 text-sm text-gray-600 text-center';
        hint.textContent = '扫描二维码在手机上访问';
        qrcodeContainer.appendChild(hint);
    }
}