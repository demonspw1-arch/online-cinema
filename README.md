<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CineHub — AI Кинотеатр</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>🎬 CineHub</h1>
    <button id="login-btn">Войти</button>
  </header>

  <section class="hero">
    <h2>Фильмы, которые меняют жизнь</h2>
    <p>Выбирайте. Смотрите. Платите. Получайте.</p>
  </section>

  <section class="trailer-grid" id="trailer-grid">
    <!-- Трейлеры подгружаются через script.js -->
  </section>

  <section class="exclusive-section" data-exclusive>
    <h2>🔥 Эксклюзив: Космос в 4K</h2>
    <p>Только для подписчиков</p>
  </section>

  <script src="script.js"></script>
</body>
</html>
