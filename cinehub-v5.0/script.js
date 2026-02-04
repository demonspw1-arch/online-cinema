// Фиктивные фильмы (в реальности — из базы)
const movies = [
  { id: 119647, title: "Интерстеллар", poster: "https://via.placeholder.com/200x300?text=Interstellar", trailer: "https://www.youtube.com/watch?v=2LqzF5WauAw" },
  { id: 1399, title: "Гравитация", poster: "https://via.placeholder.com/200x300?text=Gravity", trailer: "https://www.youtube.com/watch?v=OiTiKOy59o4" },
  { id: 278, title: "Побег из Нью-Йорка", poster: "https://via.placeholder.com/200x300?text=Escape+NY", trailer: "https://www.youtube.com/watch?v=3230Y4j6q3Y" },
  { id: 338944, title: "Любовь в большом городе", poster: "https://via.placeholder.com/200x300?text=Love+in+Big+City", trailer: "https://www.youtube.com/watch?v=9m9Q9bX2jWg" },
  { id: 527781, title: "Этого не было в твоей жизни", poster: "https://via.placeholder.com/200x300?text=Not+In+Your+Life", trailer: "https://www.youtube.com/watch?v=abc123" },
  { id: 49026, title: "Девушка с татуировкой дракона", poster: "https://via.placeholder.com/200x300?text=Girl+with+Dragon+Tattoo", trailer: "https://www.youtube.com/watch?v=def456" }
];

// Отображение трейлеров
function renderTrailers() {
  const grid = document.getElementById('trailer-grid');
  movies.forEach(movie => {
    const item = document.createElement('div');
    item.className = 'trailer-item';
    item.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
    `;
    item.onclick = () => openTrailer(movie.trailer);
    grid.appendChild(item);
  });
}

// Открыть трейлер
function openTrailer(url) {
  if (localStorage.getItem('adDismissed')) {
    window.open(url, '_blank');
    return;
  }

  // Преролл-реклама
  const ad = document.createElement('video');
  ad.src = '/ads/preroll.mp4';
  ad.autoplay = true;
  ad.muted = true;
  ad.style.cssText = `
    position: fixed; top:0; left:0; width:100%; height:100%;
    z-index:9999; object-fit:cover;
  `;
  document.body.appendChild(ad);

  ad.addEventListener('ended', () => {
    document.body.removeChild(ad);
    window.open(url, '_blank');
  });
}

// Проверка подписки
function checkSubscription() {
  const user = localStorage.getItem('user');
  if (!user) return false;
  const data = JSON.parse(user);
  return data.subscription && Date.now() < new Date(data.subscription.expires).getTime();
}

// Блокировка эксклюзивов
function lockExclusiveContent() {
  document.querySelectorAll('[data-exclusive]').forEach(el => {
    el.style.opacity = '0.5';
    el.style.pointerEvents = 'none';
    const lockIcon = document.createElement('div');
    lockIcon.textContent = '🔒 Подпишитесь, чтобы открыть';
    lockIcon.style.cssText = `
      position: absolute; top:50%; left:50%;
      transform: translate(-50%, -50%);
      color: white; background: rgba(0,0,0,0.7);
      padding: 10px; border-radius: 8px; font-size:14px;
    `;
    el.appendChild(lockIcon);
  });
}

// Кнопка покупки
function showUnlockButton() {
  const btn = document.createElement('button');
  btn.textContent = '🔓 Разблокировать за 99₽';
  btn.style.cssText = `
    background: #ff4d4d; color: white; border: none;
    padding: 10px 20px; border-radius: 20px; cursor: pointer;
    margin-top: 10px;
  `;
  btn.onclick = () => window.open('/payments/checkout.html', '_blank');
  document.querySelector('.exclusive-section').appendChild(btn);
}

// Показать баннер
function showBanner() {
  if (localStorage.getItem('adDismissed')) return;
  const banner = document.createElement('div');
  banner.className = 'ad-banner';
  banner.innerHTML = `<img src="/ads/banner.png" alt="Реклама" />`;
  banner.onclick = () => {
    window.open('https://partner.cinehub.ru', '_blank');
    localStorage.setItem('adDismissed', 'true');
    banner.remove();
  };
  document.body.appendChild(banner);
}

// Авторизация
document.getElementById('login-btn').onclick = () => {
  const email = prompt('Введите ваш email:');
  if (email) {
    localStorage.setItem('user', JSON.stringify({ email }));
    alert('Вы вошли!');
  }
};

// Запуск
document.addEventListener('DOMContentLoaded', () => {
  renderTrailers();
  if (!checkSubscription()) {
    lockExclusiveContent();
    showUnlockButton();
  }
  setTimeout(showBanner, 5000);
});
