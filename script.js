// 模块数据存储
// 只使用script.js中的默认数据，不依赖localStorage
let modules = [
    {
        "id": 1,
        "name": "Img Upscaler",
        "image": "images/Img Upscaler.jpg",
        "link": "https://imgupscaler.ai/zh/",
        "guide": "suomin/Img Upscaler.html",
        "description": "无需登入-免费放大"
    },
    {
        "id": 2,
        "name": "魔法人偶",
        "image": "images/魔法人偶.jpg",
        "link": "https://www.anyposes.com/",
        "guide": "suomin/魔法人偶.html",
        "description": "摆放动作用于Ai生图参考"
    },
    {
        "id": 1773802895710,
        "name": "Krea",
        "description": "Ai重绘放大",
        "image": "images/Krea.jpg",
        "link": "https://www.krea.ai/enhancer",
        "guide": "suomin/Krea.html"
    },
    {
        "id": 1773803119578,
        "name": "动作迁移",
        "description": "根据参考做出相同的动作",
        "image": "images/动作迁移.jpg",
        "link": "https://huggingface.co/spaces/linoyts/Qwen-Image-Edit-2511-AnyPose",
        "guide": "suomin/动作迁移.html"
    },
    {
        "id": 1773803156434,
        "name": "光影迁移",
        "description": "复刻图片的光影效果",
        "image": "images/光影迁移.jpg",
        "link": "https://huggingface.co/spaces/multimodalart/Qwen-Image-Light-Migration",
        "guide": "suomin/光影迁移.html"
    },
    {
        "id": 1773803172005,
        "name": "多角度生成",
        "description": "图片生成其它9个角度",
        "image": "images/多角度生成.jpg",
        "link": "https://www.liblib.art/modelinfo/236a739d12ab4b4783201e55369d8413?from=search&versionUuid=9b2dd06aefd44ae9bc6309a07625cf57",
        "guide": "suomin/多角度生成.html"
    },
    {
        "id": 1773806351383,
        "name": "玻璃柜烟雾机械手",
        "description": "上传白底自动生成类似效果",
        "image": "images/玻璃柜烟雾机械手.jpg",
        "link": "https://www.liblib.art/modelinfo/538acb0d9659465e88b645934a912912?versionUuid=fdc1d9f7a8764092acf5c1edf8d5d6e3",
        "guide": "suomin/玻璃柜烟雾机械手.html"
    },
    {
        "id": 1773806373427,
        "name": "冲水效果",
        "description": "上传白底生成类似效果",
        "image": "images/冲水效果.jpg",
        "link": "https://www.liblib.art/modelinfo/2af8b8560e7e4c60acfa186999fe6966?from=feed&versionUuid=b394bab1a40a41dfa5cc2caeeb7d3053&rankExpId=RVIyX0wyI0VHMTEjRTE3X0wzI0VHMjUjRTM4",
        "guide": "suomin/冲水效果.html"
    },
    {
        "id": 1773806424001,
        "name": "内部结构特效",
        "description": "自动生成透明内部结构",
        "image": "images/内部结构特效.jpg",
        "link": "https://www.liblib.art/modelinfo/502fbac3644842d7838d69851f51a149?from=feed&versionUuid=40be741705d1420fa13385e9dbf0751e&rankExpId=RVIyX0wyI0VHMTEjRTE3X0wzI0VHMjUjRTM4",
        "guide": "suomin/内部结构特效.html"
    },
    {
        "id": 1773806468148,
        "name": "逆向PSD",
        "description": "图片自动拆分带图层源文件",
        "image": "images/逆向PSD.jpg",
        "link": "https://huggingface.co/spaces/Qwen/Qwen-Image-Layered",
        "guide": "suomin/逆向PSD.html"
    },
    {
        "id": 1773812038392,
        "name": "烟雾照明效果",
        "description": "白底图生成类似效果",
        "image": "images/烟雾照明效果.jpg",
        "link": "https://www.liblib.art/modelinfo/c1b07e74f98d430584acac7d4618f21a?from=feed&versionUuid=315d6a352ca542a194ec6116a0a18f21&rankExpId=RVIyX0wyI0VHMTEjRTE3X0wzI0VHMjUjRTM4",
        "guide": "suomin/烟雾照明效果.html"
    }
];

// 保存模块数据到本地存储
function saveModules() {
    localStorage.setItem('modules', JSON.stringify(modules));
}

// 编辑模式状态
let isEditMode = false;

// 渲染模块
function renderModules() {
    const container = document.getElementById('modules-container');
    container.innerHTML = '';
    
    modules.forEach(module => {
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module';
        
        // 编辑按钮（仅在编辑模式下显示）
        const editButton = isEditMode ? `
            <button class="edit-btn" onclick="editModule(${module.id})">编辑</button>
        ` : '';
        
        moduleElement.innerHTML = `
            <div class="module-header">
                <h2>${module.name}</h2>
                ${editButton}
            </div>
            <p class="module-description">${module.description || ''}</p>
            <img src="${module.image}" alt="${module.name}" class="module-image">
            <div class="module-buttons">
                <a href="${module.link}" target="_blank" class="btn btn-primary">跳转连接</a>
                <button class="btn btn-secondary" onclick="showGuide('${module.name}', '${module.guide}')">使用说明</button>
            </div>
        `;
        container.appendChild(moduleElement);
    });
}

// 启用编辑模式
function enableEditMode() {
    isEditMode = true;
    renderModules();
    
    // 添加取消编辑模式的按钮
    const cancelEditBtn = document.createElement('button');
    cancelEditBtn.id = 'cancel-edit-btn';
    cancelEditBtn.className = 'admin-btn';
    cancelEditBtn.textContent = '取消编辑';
    cancelEditBtn.style.bottom = '90px';
    document.body.appendChild(cancelEditBtn);
    
    // 取消编辑模式
    cancelEditBtn.addEventListener('click', () => {
        isEditMode = false;
        saveModules();
        renderModules();
        cancelEditBtn.remove();
    });
    
    // 初始化拖动功能
    initDragAndDrop();
}

// 初始化拖动功能
function initDragAndDrop() {
    const moduleElements = document.querySelectorAll('.module');
    let draggedElement = null;
    
    moduleElements.forEach((element, index) => {
        element.setAttribute('draggable', 'true');
        element.dataset.index = index;
        
        element.addEventListener('dragstart', (e) => {
            draggedElement = element;
            setTimeout(() => {
                element.style.opacity = '0.5';
            }, 0);
        });
        
        element.addEventListener('dragend', (e) => {
            draggedElement = null;
            element.style.opacity = '1';
        });
        
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        element.addEventListener('dragenter', (e) => {
            e.preventDefault();
            element.style.border = '2px dashed #1a73e8';
        });
        
        element.addEventListener('dragleave', (e) => {
            element.style.border = 'none';
        });
        
        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.style.border = 'none';
            
            if (draggedElement !== element) {
                const draggedIndex = parseInt(draggedElement.dataset.index);
                const targetIndex = parseInt(element.dataset.index);
                
                // 调整模块顺序
                const draggedModule = modules[draggedIndex];
                modules.splice(draggedIndex, 1);
                modules.splice(targetIndex, 0, draggedModule);
                
                // 重新渲染模块
                renderModules();
                // 重新初始化拖动功能
                initDragAndDrop();
            }
        });
    });
}

// 编辑模块
function editModule(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
        // 填充编辑表单
        document.getElementById('module-name').value = module.name;
        document.getElementById('module-description').value = module.description || '';
        document.getElementById('module-link').value = module.link;
        
        // 保存模块ID到表单
        document.getElementById('add-module-modal').dataset.moduleId = moduleId;
        
        // 显示编辑表单
        document.getElementById('add-module-modal').style.display = 'block';
        
        // 修改按钮文本
        document.getElementById('add-module-submit').textContent = '保存修改';
    }
}

// 初始化页面
function init() {
    // 加载模块数据，只使用script.js中的默认数据
    // 忽略localStorage中的数据，确保优先使用script.js中的数据
    renderModules();
    setupEventListeners();
}

// 设置事件监听器
function setupEventListeners() {
    // 进入按钮点击事件
    const enterBtn = document.getElementById('enter-btn');
    console.log('Enter button element:', enterBtn);
    
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            console.log('Enter button clicked!');
            const accessModal = document.getElementById('access-modal');
            console.log('Access modal element:', accessModal);
            if (accessModal) {
                accessModal.style.display = 'block';
                console.log('Modal display set to block');
            } else {
                console.error('Access modal element not found!');
            }
        });
    } else {
        console.error('Enter button element not found!');
    }
    
    // 访问密码验证
    const accessSubmit = document.getElementById('access-submit');
    console.log('Access submit button element:', accessSubmit);
    
    if (accessSubmit) {
        accessSubmit.addEventListener('click', () => {
            const accessPassword = document.getElementById('access-password').value;
            console.log('Access password:', accessPassword);
            if (accessPassword === '11') {
                const accessModal = document.getElementById('access-modal');
                const cover = document.getElementById('cover');
                if (accessModal) accessModal.style.display = 'none';
                if (cover) cover.style.display = 'none';
                console.log('Access granted, cover removed');
            } else {
                alert('密码错误');
                console.log('Invalid password');
            }
        });
    } else {
        console.error('Access submit button element not found!');
    }
    
    // 管理员按钮点击事件
    document.getElementById('admin-btn').addEventListener('click', () => {
        document.getElementById('password-modal').style.display = 'block';
    });
    
    // 密码对话框取消按钮
    document.getElementById('password-cancel').addEventListener('click', () => {
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('password-input').value = '';
    });
    
    // 密码提交按钮
    document.getElementById('password-submit').addEventListener('click', () => {
        const password = document.getElementById('password-input').value;
        if (password === '22') {
            document.getElementById('password-modal').style.display = 'none';
            document.getElementById('admin-actions-modal').style.display = 'block';
            document.getElementById('password-input').value = '';
        } else {
            alert('密码错误');
        }
    });
    
    // 管理员操作选择 - 新建模块
    document.getElementById('admin-action-add').addEventListener('click', () => {
        document.getElementById('admin-actions-modal').style.display = 'none';
        document.getElementById('add-module-modal').style.display = 'block';
    });
    
    // 管理员操作选择 - 编辑模块
    document.getElementById('admin-action-edit').addEventListener('click', () => {
        document.getElementById('admin-actions-modal').style.display = 'none';
        enableEditMode();
    });
    
    // 管理员操作选择 - 取消
    document.getElementById('admin-action-cancel').addEventListener('click', () => {
        document.getElementById('admin-actions-modal').style.display = 'none';
    });
    
    // 新建模块对话框取消按钮
    document.getElementById('add-module-cancel').addEventListener('click', () => {
        document.getElementById('add-module-modal').style.display = 'none';
        resetAddModuleForm();
    });
    
    // 新建模块提交按钮
    document.getElementById('add-module-submit').addEventListener('click', addModule);
    
    // 点击模态框外部关闭（仅适用于访问和密码模态框）
    window.addEventListener('click', (e) => {
        const accessModal = document.getElementById('access-modal');
        const passwordModal = document.getElementById('password-modal');
        
        if (e.target === accessModal) {
            accessModal.style.display = 'none';
        }
        
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
            document.getElementById('password-input').value = '';
        }
    });
    
    // 使用说明对话框关闭按钮
    document.getElementById('guide-close').addEventListener('click', () => {
        document.getElementById('guide-modal').style.display = 'none';
    });
}

// 重置新建模块表单
function resetAddModuleForm() {
    document.getElementById('module-name').value = '';
    document.getElementById('module-description').value = '';
    document.getElementById('module-link').value = '';
}

// 新增或编辑模块
function addModule() {
    const name = document.getElementById('module-name').value;
    const description = document.getElementById('module-description').value;
    const link = document.getElementById('module-link').value;
    const addModuleModal = document.getElementById('add-module-modal');
    const moduleId = addModuleModal.dataset.moduleId;
    
    if (!name || !link) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 生成图片路径，使用模块名称作为文件名
    const imageUrl = 'images/' + name + '.jpg';
    
    // 生成使用说明链接，指向suomin文件夹中对应模块名称的html文件
    const guideUrl = 'suomin/' + name + '.html';
    
    if (moduleId) {
        // 编辑现有模块
        const moduleIndex = modules.findIndex(m => m.id == moduleId);
        if (moduleIndex !== -1) {
            modules[moduleIndex] = {
                ...modules[moduleIndex],
                name: name,
                description: description,
                image: imageUrl,
                link: link,
                guide: guideUrl
            };
        }
    } else {
        // 创建新模块
        const newModule = {
            id: Date.now(),
            name: name,
            description: description,
            image: imageUrl,
            link: link,
            guide: guideUrl
        };
        
        // 添加到模块列表
        modules.push(newModule);
    }
    
    saveModules();
    renderModules();
    
    // 关闭对话框并重置表单
    addModuleModal.style.display = 'none';
    resetAddModuleForm();
    
    // 重置表单数据属性和按钮文本
    delete addModuleModal.dataset.moduleId;
    document.getElementById('add-module-submit').textContent = '完成';
}

// 显示使用说明
function showGuide(moduleName, guideUrl) {
    const guideModal = document.getElementById('guide-modal');
    const guideTitle = document.getElementById('guide-title');
    const guideContent = document.getElementById('guide-content');
    
    if (guideModal && guideTitle && guideContent) {
        guideTitle.textContent = `${moduleName} - 使用说明`;
        
        if (guideUrl && guideUrl !== '#') {
            // 直接尝试加载文件，不进行存在性检查（本地文件系统中XMLHttpRequest可能不可靠）
            guideContent.innerHTML = `<iframe src="${guideUrl}" onload="this.style.display='block'" onerror="this.parentElement.textContent='待补充，请稍后查看'" style="display:none;"></iframe>`;
        } else {
            // 如果没有使用说明链接，显示提示信息
            guideContent.textContent = '待补充，请稍后查看';
        }
        
        guideModal.style.display = 'block';
    }
}

// 全局函数，用于显示访问密码弹窗
function showAccessModal() {
    console.log('showAccessModal called!');
    const accessModal = document.getElementById('access-modal');
    if (accessModal) {
        accessModal.style.display = 'block';
        console.log('Access modal displayed');
    } else {
        console.error('Access modal not found!');
    }
}

// 初始化应用
init();