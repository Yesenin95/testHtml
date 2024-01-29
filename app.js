function showCardWithDelay(cardClass, delay) {
   setTimeout(() => {
      const cards = document.querySelectorAll('.card.hide'); (`.${cardClass}`);
      cards.classList.add('show');
   }, delay);
}

// Вызываем функцию для каждой карточки с задержкой
window.addEventListener('load', () => {
   showCardWithDelay('card1', 0); // Первая карточка появится сразу после загрузки страницы
   showCardWithDelay('card2', 2000); // Вторая карточка появится через 2 секунды (2000 миллисекунд)
   showCardWithDelay('card3', 4000); // Третья карточка появится через 4 секунды (4000 миллисекунд)
   // Другие карточки
});


// Находим все элементы валюты на всех карточках
const currencyElements = document.querySelectorAll('.card__text-currency');

// Добавляем обработчик события для каждого элемента валюты на всех карточках
currencyElements.forEach(function (currencyElement) {
   currencyElement.addEventListener('click', function () {
      // Получаем текущий текст элемента валюты
      const currentCurrency = currencyElement.textContent.trim();

      // Определяем новую валюту
      let newCurrency;
      if (currentCurrency === '$') {
         newCurrency = '₽';
      } else if (currentCurrency === '₽') {
         newCurrency = '€';
      } else {
         newCurrency = '$';
      }

      // Обновляем текст элемента с новой валютой для всех карточек
      currencyElements.forEach(function (currencyElement) {
         currencyElement.textContent = newCurrency;
      });

      // Обновляем суммы в соответствии с выбранной валютой для каждой карточки
      document.querySelectorAll('.card').forEach(function (card) {
         const sumElement = card.querySelector('.card__text-sum');
         const originalCurrency = sumElement.dataset.originalCurrency;
         const originalSum = parseFloat(sumElement.dataset.originalSum);

         /* Этот блок кода рассчитывает новое значение суммы на основе выбранной валюты. */
         let newSum;
         if (newCurrency === '₽' && originalCurrency !== '₽') {
            newSum = originalSum * 89.62;
         } else if (newCurrency === '€' && originalCurrency !== '€') {
            newSum = originalSum * 0.921946;
         } else if (newCurrency === '$' && originalCurrency !== '$') {
            newSum = originalSum;
         } else {
            newSum = parseFloat(sumElement.textContent);
         }

         sumElement.textContent = Math.round(newSum); // Округляем до целого числа
         sumElement.dataset.originalCurrency = newCurrency; // Обновляем валюту
      });
   });
});
let isMonthly = true; // Переменная для отслеживания текущего состояния

// Находим все элементы с классом "card__text-month"
const monthElements = document.querySelectorAll('.card__text-month');

// Добавляем обработчик события для каждого элемента
monthElements.forEach(function (monthElement) {
   monthElement.addEventListener('click', function () {
      // Если текущее состояние - месяцы, то переключаем на дни и наоборот
      isMonthly = !isMonthly;

      // Изменяем текст элемента в соответствии с текущим состоянием
      monthElement.textContent = isMonthly ? '/Months' : 'Day';

      // Получаем цены для всех карточек
      const cardPrices = document.querySelectorAll('.card__text-sum');

      // Обновляем цены в соответствии с текущим состоянием
      cardPrices.forEach(function (priceElement) {
         // Получаем текущую цену за месяц и преобразуем ее в число
         const monthlyPrice = parseInt(priceElement.dataset.monthlyPrice);
         // Рассчитываем цену в день (цена за месяц / 30) и округляем до целого числа
         const dailyPrice = Math.round(monthlyPrice / 30);
         // Обновляем текст суммы на цену в месяц или в день в зависимости от текущего состояния
         priceElement.textContent = isMonthly ? monthlyPrice : dailyPrice;
      });
   });
});
function toggleMenu() {
   let nav = document.querySelector('.header__nav');
   nav.classList.toggle('open');
}