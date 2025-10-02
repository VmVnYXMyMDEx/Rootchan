// header-loader.js - Умный загрузчик шапки для Rootchan
class HeaderLoader {
    constructor() {
        this.maxRetries = 2;
        this.retryCount = 0;
    }

    init() {
        this.loadHeader();
    }

    async loadHeader() {
        // === ИЗМЕНЕНИЕ ЗДЕСЬ ===
        const isInBoardsFolder = window.location.pathname.includes('/boards/');
        const basePath = isInBoardsFolder ? '../' : './';
        
        try {
            const response = await fetch(basePath + 'components/header.html');
            // === КОНЕЦ ИЗМЕНЕНИЯ ===
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Создаем контейнер и вставляем шапку ПЕРЕД всем контентом
            const headerContainer = document.createElement('div');
            headerContainer.id = 'rootchan-header';
            headerContainer.innerHTML = html;
            document.body.insertBefore(headerContainer, document.body.firstChild);
            
            console.log('Rootchan header loaded successfully');
            
        } catch (error) {
            console.warn('Failed to load header:', error);
            this.retryLoad();
        }
    }

    retryLoad() {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            console.log(`Retrying header load (${this.retryCount}/${this.maxRetries})...`);
            setTimeout(() => this.loadHeader(), 1000 * this.retryCount);
        } else {
            this.showFallbackHeader();
        }
    }

    showFallbackHeader() {
        console.log('Showing fallback header');
        
        // === ТАКЖЕ ДОБАВЬТЕ СЮДА ===
        const isInBoardsFolder = window.location.pathname.includes('/boards/');
        const basePath = isInBoardsFolder ? '../' : './';
        // === КОНЕЦ ДОБАВЛЕНИЯ ===
        
        const headerContainer = document.createElement('div');
        headerContainer.id = 'rootchan-header';
        headerContainer.innerHTML = this.getFallbackHeader(basePath);
        document.body.insertBefore(headerContainer, document.body.firstChild);
    }

    getFallbackHeader(basePath) {
        return `
<!-- Fallback Header -->
<style>
.rootchan-header {
    background: #0d0d0d;
    border-bottom: 1px solid #00ff00;
    padding: 15px 0;
    font-family: 'Courier New', monospace;
    margin-bottom: 20px;
}
.header-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 15px;
}
.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.logo {
    color: #00ff00;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
}
.main-nav a {
    color: #ccc;
    text-decoration: none;
    margin-left: 20px;
}
.main-nav a:hover {
    color: #00ff00;
}
.boards-nav {
    border-top: 1px solid #333;
    padding-top: 10px;
}
.boards-nav a {
    color: #888;
    text-decoration: none;
    margin-right: 15px;
    font-size: 14px;
}
.boards-nav a:hover {
    color: #00ff00;
}
</style>

<div class="rootchan-header">
    <div class="header-content">
        <div class="header-top">
            <a href="${basePath}index.html" class="logo">Rootchan</a>
            <nav class="main-nav">
                <a href="${basePath}submit.html">Предложить тред</a>
                <a href="${basePath}rules.html">Правила</a>
            </nav>
        </div>
        <nav class="boards-nav">
            <a href="${basePath}boards/b.html">/b/ - Флудилка</a>
            <a href="${basePath}boards/vg.html">/vg/ - Игры</a>
            <a href="${basePath}boards/a.html">/a/ - Аниме</a>
            <a href="${basePath}boards/hw.html">/hw/ - Учеба</a>
        </nav>
    </div>
</div>
        `;
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', () => {
    new HeaderLoader().init();
});
