# Maktab Boshqaruv Tizimi - Til Tarjima Qo'llanmasi

Bu qo'llanma maktab boshqaruv tizimida til tarjima tizimini qo'llash haqida.

## Til tarjima tizimi haqida

Tizim quyidagi tillarda ishlaydi:
- O'zbek (uz)
- Rus (ru)
- Ingliz (en)

Foydalanuvchi tanlagan til localStorage'da saqlanadi va saytning barcha sahifalarida qo'llaniladi.

## Yangi sahifaga til tarjima tizimini qo'shish

1. `data.js` faylini sahifaga ulash:
```html
<script src="data.js"></script>
<!-- yoki nisbiy manzil bo'lsa -->
<script src="../data.js"></script>
```

2. Til tanlash elementini qo'shish:
```html
<div class="language-selector">
    <span data-translate="languageLabel">Til:</span>
    <select id="language-select" onchange="changeLanguage(this.value)">
        <option value="uz">O'zbekcha</option>
        <option value="ru">Русский</option>
        <option value="en">English</option>
    </select>
</div>
```

3. CSS uslublarini qo'shish:
```css
.language-selector {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
    align-items: center;
}

.language-selector select {
    width: auto;
    padding: 5px;
    height: auto;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
}
```

4. Tarjima qilinadigan elementlarni belgilash:
   - Text elementi uchun: `data-translate="keyName"`
   - Placeholder uchun: `data-translate-placeholder="keyName"`

5. Sahifa yuklanganda tarjimalarni qo'llash:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
});
```

## Yangi tarjimalar qo'shish

`data.js` faylidagi `allTranslations` obyektiga yangi kalit-qiymat juftliklarini qo'shing:

```javascript
// O'zbek tilidagi tarjimalar
allTranslations.uz.newKey = "O'zbekcha tarjima";

// Rus tilidagi tarjimalar
allTranslations.ru.newKey = "Русский перевод";
```

## Tarjimalarni dasturda ishlatish

Element tarkibini tarjima qilish:
```html
<h1 data-translate="systemTitle">Maktab Boshqaruv Tizimi</h1>
```

Input placeholder'ni tarjima qilish:
```html
<input type="text" data-translate-placeholder="searchPlaceholder" placeholder="Qidirish...">
```

JavaScript ichida tarjimani olish:
```javascript
const message = getTranslation('welcomeMessage');
alert(message);
```

## Namuna

Namuna sifatida `language-template.html` faylini ko'rishingiz mumkin.

## Til tanlovini saqlash

Foydalanuvchi tanlagan til localStorage'da saqlanadi va saytning barcha sahifalarida avtomatik qo'llaniladi.

---

# Руководство по использованию системы перевода

Это руководство о том, как использовать систему перевода в системе управления школой.

## О системе перевода

Система работает на следующих языках:
- Узбекский (uz)
- Русский (ru)
- Английский (en)

Выбранный пользователем язык сохраняется в localStorage и применяется на всех страницах сайта.

## Добавление системы перевода на новую страницу

1. Подключите файл `data.js` к странице:
```html
<script src="data.js"></script>
<!-- или относительный путь, если нужно -->
<script src="../data.js"></script>
```

2. Добавьте элемент выбора языка:
```html
<div class="language-selector">
    <span data-translate="languageLabel">Язык:</span>
    <select id="language-select" onchange="changeLanguage(this.value)">
        <option value="uz">O'zbekcha</option>
        <option value="ru">Русский</option>
        <option value="en">English</option>
    </select>
</div>
```

3. Добавьте CSS стили:
```css
.language-selector {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
    align-items: center;
}

.language-selector select {
    width: auto;
    padding: 5px;
    height: auto;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
}
```

4. Отметьте элементы для перевода:
   - Для текстового элемента: `data-translate="keyName"`
   - Для placeholder: `data-translate-placeholder="keyName"`

5. Примените переводы при загрузке страницы:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
});
```

## Добавление новых переводов

Добавьте новые пары ключ-значение в объект `allTranslations` в файле `data.js`:

```javascript
// Перевод на узбекский
allTranslations.uz.newKey = "O'zbekcha tarjima";

// Перевод на русский
allTranslations.ru.newKey = "Русский перевод";
```

## Использование переводов в программе

Перевод содержимого элемента:
```html
<h1 data-translate="systemTitle">Система управления школой</h1>
```

Перевод placeholder для input:
```html
<input type="text" data-translate-placeholder="searchPlaceholder" placeholder="Поиск...">
```

Получение перевода в JavaScript:
```javascript
const message = getTranslation('welcomeMessage');
alert(message);
```

## Пример

В качестве примера вы можете посмотреть файл `language-template.html`.

## Сохранение выбора языка

Выбранный пользователем язык сохраняется в localStorage и автоматически применяется на всех страницах сайта. 