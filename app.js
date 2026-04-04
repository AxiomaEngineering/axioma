// ==================== APP ARCHITECTURE ====================
const App = {
    // Данные
    catalogData: [
        { name: "НКУ шкафы: УКРМ", desc: "Установка компенсации реактивной мощности" },
        { name: "ЩР (Щит распределительный)", desc: "Распределение электроэнергии, модульные автоматы" },
        { name: "ГЗШ (Главный заземляющий шкаф)", desc: "Узлы заземления и уравнивания потенциалов" },
        { name: "ВРУ-0,4 кВ", desc: "Вводно-распределительное устройство до 1000А" },
        { name: "ГРЩ", desc: "Главный распределительный щит, учёт, секции" },
        { name: "Шкаф автоматики и управления", desc: "На базе PLC, релейная автоматика, контроллеры" },
        { name: "Шкаф АВР", desc: "Автоматический ввод резерва 63-630А" },
        { name: "Шкаф частотного регулирования", desc: "Управление двигателями, плавный пуск" }
    ],
    galleryData: [
        { name: "Жилой комплекс 'Золотой ключ'", year: "2024", desc: "Полная сборка 12 ВРУ", imgFile: "proj1.jpg" },
        { name: "Ставропольский радиозавод 'Сигнал'", year: "2022", desc: "Сборка и автоматизация производства", imgFile: "proj2.jpg" },
        { name: "Завод 'Металлист'", year: "2020", desc: "Автоматизация производства", imgFile: "proj3.jpg" },
        { name: "Бизнес-центр 'Парк Легенд'", year: "2023", desc: "Электромонтажные работы", imgFile: "proj4.jpg" },
        { name: "Коттеджный поселок 'Лесной'", year: "2024", desc: "Сборка и установка щитов ЩО", imgFile: "proj5.jpg" },
        { name: "Очистные сооружения", year: "2024", desc: "ГРЩ, шкафы управления", imgFile: "proj6.jpg" }
    ],
    partnersData: [
        { name: "ООО ЭНЕРГОИНТЕНСИВ", cert: "Аккредитованная эл.лаборатория" },
        { name: "ООО Электрощит", cert: "сертификат соответствия ЕАС" }
    
    ],
    contactsData: [
        { icon: "📞", title: "Телефон", value: "+79851286961", link: "tel:+79851286961" },
        { icon: "✉️", title: "Email", value: "axioma.engineering@mail.ru", link: "axioma.engineering@mail.ru" },
        { icon: "💬", title: "Telegram", value: "https://t.me/+mPXdtGjHdd8xZTRi", link: "https://t.me/+mPXdtGjHdd8xZTRi" }
    ],

    // Инициализация
    init() {
        this.loadCatalog();
        this.loadGallery();
        this.loadPartners();
        this.loadContacts();
        this.initBackgroundEffects();
        this.initEventListeners();
        this.initLogo();
        this.initYandexMap();
        this.initPageVisibility();
    },

    loadCatalog() {
        const grid = document.getElementById("catalogGrid");
        if (!grid) return;
        grid.innerHTML = "";
        this.catalogData.forEach(item => {
            const div = document.createElement("div");
            div.className = "catalog-item";
            div.onclick = () => this.showDetail(item);
            
            const h3 = document.createElement("h3");
            h3.textContent = item.name;
            const p = document.createElement("p");
            p.textContent = item.desc;
            
            div.appendChild(h3);
            div.appendChild(p);
            grid.appendChild(div);
        });
    },

    loadGallery() {
        const grid = document.getElementById("galleryGrid");
        if (!grid) return;
        grid.innerHTML = "";
        this.galleryData.forEach(item => {
            const div = document.createElement("div");
            div.className = "gallery-item";
            div.onclick = () => this.openProjectImage(item.imgFile);
            
            const imgDiv = document.createElement("div");
            imgDiv.className = "gallery-img";
            const img = document.createElement("img");
            img.src = `images/${item.imgFile}`;
            img.alt = item.name;
            img.onerror = () => {
                img.style.display = "none";
                imgDiv.innerHTML = "🔌";
            };
            imgDiv.appendChild(img);
            
            const infoDiv = document.createElement("div");
            infoDiv.className = "gallery-info";
            const h4 = document.createElement("h4");
            h4.textContent = item.name;
            const p = document.createElement("p");
            p.textContent = item.desc;
            const small = document.createElement("small");
            small.textContent = item.year;
            
            infoDiv.appendChild(h4);
            infoDiv.appendChild(p);
            infoDiv.appendChild(small);
            div.appendChild(imgDiv);
            div.appendChild(infoDiv);
            grid.appendChild(div);
        });
    },

    loadPartners() {
        const grid = document.getElementById("partnersGrid");
        if (!grid) return;
        grid.innerHTML = "";
        this.partnersData.forEach(p => {
            const div = document.createElement("div");
            div.className = "partner-card";
            const h4 = document.createElement("h4");
            h4.textContent = p.name;
            const certDiv = document.createElement("div");
            certDiv.className = "cert";
            certDiv.textContent = `✅ ${p.cert}`;
            div.appendChild(h4);
            div.appendChild(certDiv);
            grid.appendChild(div);
        });
    },

    loadContacts() {
        const grid = document.getElementById("contactsGrid");
        if (!grid) return;
        grid.innerHTML = "";
        this.contactsData.forEach(c => {
            const div = document.createElement("div");
            div.className = "contact-card";
            const iconDiv = document.createElement("div");
            iconDiv.className = "icon";
            iconDiv.textContent = c.icon;
            const h3 = document.createElement("h3");
            h3.textContent = c.title;
            div.appendChild(iconDiv);
            div.appendChild(h3);
            if (c.link) {
                const a = document.createElement("a");
                a.href = c.link;
                a.textContent = c.value;
                div.appendChild(a);
            } else {
                const p = document.createElement("p");
                p.textContent = c.value;
                div.appendChild(p);
            }
            grid.appendChild(div);
        });
    },

    showDetail(item) {
        const title = document.getElementById("detailTitle");
        const desc = document.getElementById("detailDesc");
        if (title) title.textContent = item.name;
        if (desc) desc.innerHTML = `<strong>Описание:</strong> ${item.desc}`;
        const modal = document.getElementById("detailModal");
        if (modal) modal.style.display = "flex";
    },

    openProjectImage(imgFile) {
        const modalImg = document.getElementById("fullImageView");
        const viewer = document.getElementById("imageViewer");
        if (modalImg && viewer) {
            modalImg.src = `images/${imgFile}`;
            modalImg.onerror = () => { alert('Фото не найдено. Добавьте images/' + imgFile); };
            viewer.style.display = "flex";
        }
    },

    initBackgroundEffects() {
        const electronCanvas = document.getElementById("electronCanvas");
        const circuitCanvas = document.getElementById("circuitCanvas");
        if (!electronCanvas || !circuitCanvas) return;
        
        const electronCtx = electronCanvas.getContext("2d");
        const circuitCtx = circuitCanvas.getContext("2d");
        let electrons = [];
        let circuitLines = [];
        let circuitPulses = [];
        
        function resizeCanvases() {
            electronCanvas.width = window.innerWidth;
            electronCanvas.height = window.innerHeight;
            circuitCanvas.width = window.innerWidth;
            circuitCanvas.height = window.innerHeight;
        }
        
        function initElectrons() {
            electrons = [];
            const count = Math.min(130, Math.floor(window.innerWidth * window.innerHeight / 16000));
            for(let i = 0; i < count; i++) {
                electrons.push({
                    x: Math.random() * electronCanvas.width,
                    y: Math.random() * electronCanvas.height,
                    baseRadius: Math.random() * 2 + 1.5,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4,
                    pulseSpeed: 0.02 + Math.random() * 0.03,
                    pulsePhase: Math.random() * Math.PI * 2,
                    color: Math.random() > 0.6 ? '#3b82f6' : '#ffd86b'
                });
            }
        }
        
        function drawElectrons() {
            if (!electronCtx) return;
            electronCtx.clearRect(0, 0, electronCanvas.width, electronCanvas.height);
            for(let e of electrons) {
                e.x += e.speedX;
                e.y += e.speedY;
                if(e.x < 0 || e.x > electronCanvas.width) e.speedX *= -1;
                if(e.y < 0 || e.y > electronCanvas.height) e.speedY *= -1;
                e.x = Math.max(0, Math.min(electronCanvas.width, e.x));
                e.y = Math.max(0, Math.min(electronCanvas.height, e.y));
                e.pulsePhase += e.pulseSpeed;
                const pulse = Math.sin(e.pulsePhase) * 0.5 + 0.5;
                const rad = e.baseRadius + pulse * 1.5;
                electronCtx.beginPath();
                electronCtx.arc(e.x, e.y, rad, 0, Math.PI * 2);
                const grad = electronCtx.createRadialGradient(e.x, e.y, 0, e.x, e.y, rad * 2);
                grad.addColorStop(0, e.color === '#3b82f6' ? `rgba(59,130,246,${0.4 + pulse * 0.5})` : `rgba(255,216,107,${0.4 + pulse * 0.5})`);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                electronCtx.fillStyle = grad;
                electronCtx.fill();
            }
            requestAnimationFrame(drawElectrons);
        }
        
        function initCircuit() {
            circuitLines = [];
            circuitPulses = [];
            for(let i = 0; i < 50; i++) {
                const isHor = Math.random() > 0.5;
                const x = Math.random() * circuitCanvas.width;
                const y = Math.random() * circuitCanvas.height;
                const len = Math.random() * 150 + 60;
                circuitLines.push({ x, y, length: len, isHorizontal: isHor, hasNode: Math.random() > 0.7, nodePos: Math.random() });
                circuitPulses.push({ lineIndex: i, pos: Math.random(), speed: 0.004 + Math.random() * 0.006, size: 2 + Math.random() * 2 });
            }
        }
        
        function drawCircuit() {
            if (!circuitCtx) return;
            circuitCtx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
            for(let l of circuitLines) {
                circuitCtx.beginPath();
                circuitCtx.strokeStyle = "rgba(59,130,246,0.4)";
                circuitCtx.lineWidth = 1.2;
                if(l.isHorizontal) {
                    circuitCtx.moveTo(l.x, l.y);
                    circuitCtx.lineTo(l.x + l.length, l.y);
                } else {
                    circuitCtx.moveTo(l.x, l.y);
                    circuitCtx.lineTo(l.x, l.y + l.length);
                }
                circuitCtx.stroke();
                if(l.hasNode) {
                    let nx = l.isHorizontal ? l.x + l.length * l.nodePos : l.x;
                    let ny = l.isHorizontal ? l.y : l.y + l.length * l.nodePos;
                    circuitCtx.beginPath();
                    circuitCtx.arc(nx, ny, 2.5, 0, Math.PI * 2);
                    circuitCtx.fillStyle = "#3b82f6";
                    circuitCtx.fill();
                }
            }
            for(let p of circuitPulses) {
                const l = circuitLines[p.lineIndex];
                if(l) {
                    p.pos += p.speed;
                    if(p.pos > 1) p.pos = 0;
                    let x = l.isHorizontal ? l.x + l.length * p.pos : l.x;
                    let y = l.isHorizontal ? l.y : l.y + l.length * p.pos;
                    circuitCtx.beginPath();
                    circuitCtx.arc(x, y, p.size, 0, Math.PI * 2);
                    circuitCtx.fillStyle = "#ffd86b";
                    circuitCtx.fill();
                }
            }
            requestAnimationFrame(drawCircuit);
        }
        
        resizeCanvases();
        initElectrons();
        initCircuit();
        drawElectrons();
        drawCircuit();
        
        window.addEventListener("resize", () => {
            resizeCanvases();
            initElectrons();
            initCircuit();
        });
    },

    initLogo() {
        const logoImg = document.getElementById("logoImage");
        const fallback = document.getElementById("fallbackLogo");
        if (!logoImg) return;
        
        let logoAttempts = 0;
        function tryLogo(path) {
            logoImg.src = path + "?" + Date.now();
        }
        logoImg.onload = () => {
            logoImg.style.display = "block";
            if (fallback) fallback.style.display = "none";
        };
        logoImg.onerror = () => {
            if (logoAttempts === 0) {
                logoAttempts++;
                tryLogo('images/logo.png');
            } else if (fallback) {
                logoImg.style.display = "none";
                fallback.style.display = "inline-block";
            }
        };
        tryLogo('logo.png');
    },

    initYandexMap() {
        if (typeof ymaps === 'undefined') return;
        ymaps.ready(() => {
            const map = new ymaps.Map("yandexMap", {
                center: [55.720942, 37.753699],
                zoom: 14,
                controls: ['zoomControl', 'fullscreenControl']
            });
            const placemark = new ymaps.Placemark([55.720942, 37.753699], {
                balloonContent: "<strong>АКСИОМА</strong><br/>Промзона, складской комплекс<br/>Москва"
            }, {
                preset: 'islands#blueIndustrialIcon',
                iconColor: '#3b82f6'
            });
            map.geoObjects.add(placemark);
        });
    },

    initPageVisibility() {
        document.addEventListener("visibilitychange", () => {
            const isHidden = document.hidden;
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                if (isHidden) {
                    canvas.style.opacity = '0.1';
                } else {
                    canvas.style.opacity = '';
                }
            });
        });
    },

    initEventListeners() {
        // Навигация по вкладкам
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const sectionId = tab.dataset.section;
                this.switchSection(sectionId);
            });
        });
        
        // Кликабельные карточки
        document.querySelectorAll('.card.clickable').forEach(card => {
            card.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
            });
        });
        
        // Модалка заявки
        const modal = document.getElementById("modal");
        const ctaBtn = document.querySelector(".cta");
        const closeBtn = document.querySelector(".modal .close");
        
        if (ctaBtn) {
            ctaBtn.addEventListener("click", () => {
                if (modal) modal.style.display = "flex";
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                if (modal) modal.style.display = "none";
            });
        }
        if (modal) {
            window.addEventListener("click", (e) => {
                if (e.target === modal) modal.style.display = "none";
            });
        }
        
        // Закрытие модалки с картинкой
        const closeImageViewer = document.getElementById("closeImageViewer");
        const imageViewer = document.getElementById("imageViewer");
        if (closeImageViewer) {
            closeImageViewer.addEventListener("click", () => {
                if (imageViewer) imageViewer.style.display = "none";
            });
        }
        if (imageViewer) {
            imageViewer.addEventListener("click", (e) => {
                if (e.target === imageViewer) imageViewer.style.display = "none";
            });
        }
        
        // Закрытие детальной модалки
        const detailModal = document.getElementById("detailModal");
        const detailClose = document.querySelector("#detailModal .close");
        if (detailClose) {
            detailClose.addEventListener("click", () => {
                if (detailModal) detailModal.style.display = "none";
            });
        }
        
        // Отправка формы
        const form = document.getElementById("applicationForm");
        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const btn = e.target.querySelector(".submit-btn");
                const originalText = btn.innerText;
                btn.innerText = "Отправка...";
                btn.disabled = true;
                
                const name = document.getElementById("userName").value.trim();
                const email = document.getElementById("userEmail").value.trim();
                if (!name || !email || !email.includes('@')) {
                    alert("Имя и корректный email обязательны");
                    btn.innerText = originalText;
                    btn.disabled = false;
                    return;
                }
                
                const YOUR_EMAIL = "al.krasilnikov18@gmail.com";
                const formData = new FormData();
                formData.append("name", name);
                formData.append("phone", document.getElementById("userPhone").value);
                formData.append("email", email);
                formData.append("message", document.getElementById("userMessage").value);
                formData.append("_subject", "Новая заявка с сайта АКСИОМА");
                
                try {
                    const response = await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
                        method: "POST",
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        alert(`✅ Спасибо, ${name}! Ваша заявка отправлена.\nМы свяжемся с вами по email: ${email}`);
                        if (modal) modal.style.display = "none";
                        form.reset();
                    } else {
                        alert("Ошибка отправки. Попробуйте позже.");
                    }
                } catch(err) {
                    alert("Ошибка отправки. Проверьте интернет.");
                } finally {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            });
        }
    },

    switchSection(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
        const activeSection = document.getElementById(`${sectionId}-section`);
        if (activeSection) activeSection.classList.add('active-section');
        
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.nav-tab[data-section="${sectionId}"]`);
        if (activeTab) activeTab.classList.add('active');
        
        if (sectionId === 'contacts' && typeof ymaps !== 'undefined') {
            setTimeout(() => this.initYandexMap(), 100);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Глобальные функции для HTML-вызовов
window.showDetail = (item) => App.showDetail(item);
window.closeDetailModal = () => {
    const modal = document.getElementById("detailModal");
    if (modal) modal.style.display = "none";
};
window.askFromDetail = () => {
    window.closeDetailModal();
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "flex";
};
window.openProjectImage = (imgFile) => App.openProjectImage(imgFile);

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});