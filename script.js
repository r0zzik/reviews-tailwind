const readMoreBtns = document.querySelectorAll('.read-more-button');

const sortButtons = document.querySelectorAll('.sort-btn');
const grid = document.querySelector('.reviews-grid');
        
readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.previousElementSibling;
        text.classList.toggle('line-clamp-3');
        btn.textContent = text.classList.contains('line-clamp-3')
        ? 'Читать дальше'
        : 'Свернуть';
    });
});


// Сортировка карточек
function sortCards(sortType, direction) {
    const cards = Array.from(grid.children);
    cards.sort((a, b) => {
        if (sortType === 'date') {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return direction === 'desc' ? dateB - dateA : dateA - dateB;
        }
        if (sortType === 'rating') {
            const ratingA = Number(a.dataset.rating);
            const ratingB = Number(b.dataset.rating);
            return direction === 'desc' ? ratingB - ratingA : ratingA - ratingB;
        }
    });
    // Добавляем карточки в грид
    cards.forEach(card => grid.appendChild(card));
}

sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Для активной кнопки
        sortButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const sortType = btn.dataset.sort;
        let direction = btn.dataset.direction;
        
        // Меняем направление
        direction = direction === 'desc' ? 'asc' : 'desc';
        btn.dataset.direction = direction;
        
        // Меняем текст
        if (sortType === 'date') {
            btn.innerHTML = direction === 'desc' ? `&darr;Сначала новые` : `&uarr;Сначала старые`;
        } else {
            btn.innerHTML = direction === 'desc' ? `&darr;Сначала положительные` : `&uarr;Сначала негативные`;
        }
        // Сортируем карточки
        sortCards(sortType, direction);
    });
});

// При загрузке сортировка по дате новые сверху
sortCards('date', 'desc');
document.querySelector('.sort-btn[data-sort="date"]').classList.add('active');