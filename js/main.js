// 製品データを取得
let productsData = [];
let currentSort = { column: null, ascending: true };

// データ読み込み
fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        initPage();
    })
    .catch(error => console.error('Error loading products:', error));

// ページ初期化
function initPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);

    if (filename === 'index.html' || filename === '') {
        initHomePage();
    } else if (filename === 'submit.html') {
        initSubmitPage();
    }
}

// ホームページ
function initHomePage() {
    // メーカーフィルターのオプションを追加
    const manufacturerFilter = document.getElementById('manufacturer-filter');
    const manufacturers = [...new Set(productsData.map(p => p.manufacturer))].sort();
    manufacturers.forEach(m => {
        const option = document.createElement('option');
        option.value = m;
        option.textContent = m;
        manufacturerFilter.appendChild(option);
    });

    // カテゴリーカードのクリックイベント
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            document.getElementById('category-filter').value = category;
            filterProducts();
            // 製品一覧までスクロール
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // フィルター変更時
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('manufacturer-filter').addEventListener('change', filterProducts);
    document.getElementById('comment-filter').addEventListener('change', filterProducts);
    document.getElementById('reset-filter').addEventListener('click', resetFilters);

    // ソート機能
    const sortableHeaders = document.querySelectorAll('.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            sortProducts(column);
        });
    });

    // 初期表示
    displayProducts(productsData);
}

// フィルター処理
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const manufacturerFilter = document.getElementById('manufacturer-filter').value;
    const commentFilter = document.getElementById('comment-filter').checked;

    let filtered = productsData;

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (manufacturerFilter !== 'all') {
        filtered = filtered.filter(p => p.manufacturer === manufacturerFilter);
    }

    if (commentFilter) {
        filtered = filtered.filter(p => p.hasComment);
    }

    displayProducts(filtered);
}

// フィルターリセット
function resetFilters() {
    document.getElementById('category-filter').value = 'all';
    document.getElementById('manufacturer-filter').value = 'all';
    document.getElementById('comment-filter').checked = false;
    currentSort = { column: null, ascending: true };
    
    // ソートアイコンをリセット
    document.querySelectorAll('.sortable').forEach(header => {
        header.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    displayProducts(productsData);
}

// ソート処理
function sortProducts(column) {
    const header = document.querySelector(`[data-column="${column}"]`);
    
    // 同じ列をクリックした場合は昇順/降順を切り替え
    if (currentSort.column === column) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.column = column;
        currentSort.ascending = true;
    }

    // ソートアイコンを更新
    document.querySelectorAll('.sortable').forEach(h => {
        h.classList.remove('sorted-asc', 'sorted-desc');
    });
    header.classList.add(currentSort.ascending ? 'sorted-asc' : 'sorted-desc');

    // 現在表示されている製品を取得
    const tbody = document.getElementById('products-tbody');
    const currentProducts = Array.from(tbody.querySelectorAll('tr')).map(row => {
        const asin = row.dataset.asin;
        return productsData.find(p => p.asin === asin);
    });

    // ソート実行
    currentProducts.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];

        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return currentSort.ascending ? -1 : 1;
        if (aValue > bValue) return currentSort.ascending ? 1 : -1;
        return 0;
    });

    displayProducts(currentProducts);
}

// 製品を表示
function displayProducts(products) {
    const tbody = document.getElementById('products-tbody');
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">製品が見つかりません</td></tr>';
        return;
    }

    const html = products.map(product => `
        <tr data-asin="${product.asin}">
            <td>${product.name}</td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td class="comment-cell">
                ${product.hasComment ? `<span class="comment-badge">✨</span>${product.comment}` : '-'}
            </td>
            <td>
                <a href="${product.amazonUrl}" class="amazon-link" target="_blank" rel="noopener">
                    Amazonで見る
                </a>
            </td>
        </tr>
    `).join('');

    tbody.innerHTML = html;
}

// 投稿フォームページ
function initSubmitPage() {
    const form = document.getElementById('submit-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('form-message');
        formMessage.style.display = 'block';
        formMessage.className = 'form-message success';
        formMessage.textContent = 'ご投稿ありがとうございます！';
        
        form.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}