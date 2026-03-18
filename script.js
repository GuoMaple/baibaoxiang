// 模块数据存储
let modules = JSON.parse(localStorage.getItem('modules')) || [
    {
        id: 1,
        name: '模块1',
        description: '这是模块1的描述',
        image: 'images/模块1.jpg',
        link: '#',
        guide: '#'
    },
    {
        id: 2,
        name: '模块2',
        description: '这是模块2的描述',
        image: 'images/模块2.jpg',
        link: '#',
        guide: '#'
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
                <a href="${module.guide}" target="_blank" class="btn btn-secondary">使用说明</a>
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
        document.getElementById('module-guide').value = module.guide;
        
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
    // 加载模块数据，优先使用本地存储的数据
    modules = JSON.parse(localStorage.getItem('modules')) || [
        {
            id: 1,
            name: '模块1',
            image: 'images/模块1.jpg',
            link: '#',
            guide: '#'
        },
        {
            id: 2,
            name: '模块2',
            image: 'images/模块2.jpg',
            link: '#',
            guide: '#'
        }
    ];
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
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        const accessModal = document.getElementById('access-modal');
        const passwordModal = document.getElementById('password-modal');
        const addModuleModal = document.getElementById('add-module-modal');
        
        if (e.target === accessModal) {
            accessModal.style.display = 'none';
        }
        
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
            document.getElementById('password-input').value = '';
        }
        
        if (e.target === addModuleModal) {
            addModuleModal.style.display = 'none';
            resetAddModuleForm();
        }
    });
}

// 重置新建模块表单
function resetAddModuleForm() {
    document.getElementById('module-name').value = '';
    document.getElementById('module-description').value = '';
    document.getElementById('module-link').value = '';
    document.getElementById('module-guide').value = '';
}

// 新增或编辑模块
function addModule() {
    const name = document.getElementById('module-name').value;
    const description = document.getElementById('module-description').value;
    const link = document.getElementById('module-link').value;
    const guide = document.getElementById('module-guide').value;
    const addModuleModal = document.getElementById('add-module-modal');
    const moduleId = addModuleModal.dataset.moduleId;
    
    if (!name || !link || !guide) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 生成图片路径，使用模块名称作为文件名
    const imageUrl = 'images/' + name + '.jpg';
    
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
                guide: guide
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
            guide: guide
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