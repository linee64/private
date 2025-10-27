// Получаем элементы
const sochMaxInput = document.getElementById('soch-max');
const sochPointsInput = document.getElementById('soch-points');
const resultElement = document.getElementById('result');
const gradeElement = document.getElementById('grade');

// Добавляем обработчики событий на все поля ввода
sochMaxInput.addEventListener('input', calculateResult);
sochPointsInput.addEventListener('input', calculateResult);

// СОР
for (let i = 1; i <= 3; i++) {
    document.getElementById('sor' + i + '-max').addEventListener('input', calculateResult);
    document.getElementById('sor' + i + '-points').addEventListener('input', calculateResult);
}

// ФО
const foInputs = document.querySelectorAll('.fo-input');
foInputs.forEach(input => {
    input.addEventListener('input', calculateResult);
});

// Функция для расчета итогового результата
function calculateResult() {
    // Получаем значения СОЧ
    const sochMax = parseFloat(sochMaxInput.value) || 0;
    const sochPoints = parseFloat(sochPointsInput.value) || 0;
    
    // Рассчитываем процент для СОЧ (избегаем деления на 0)
    let sochPercentage = 0;
    if (sochMax > 0) {
        sochPercentage = (sochPoints / sochMax) * 100;
    }
    
    // Получаем значения СОР (3 работы)
    const sor1Max = parseFloat(document.getElementById('sor1-max').value) || 0;
    const sor1Points = parseFloat(document.getElementById('sor1-points').value) || 0;
    const sor2Max = parseFloat(document.getElementById('sor2-max').value) || 0;
    const sor2Points = parseFloat(document.getElementById('sor2-points').value) || 0;
    const sor3Max = parseFloat(document.getElementById('sor3-max').value) || 0;
    const sor3Points = parseFloat(document.getElementById('sor3-points').value) || 0;
    
    // Рассчитываем общий процент для СОР (среднее арифметическое трех работ)
    let sorTotalMax = sor1Max + sor2Max + sor3Max;
    let sorTotalPoints = sor1Points + sor2Points + sor3Points;
    let sorPercentage = 0;
    if (sorTotalMax > 0) {
        sorPercentage = (sorTotalPoints / sorTotalMax) * 100;
    }
    
    // Получаем значения ФО (количество оценок 1-10)
    const foInputs = document.querySelectorAll('.fo-input');
    let foTotalGrades = 0;
    let foTotalCount = 0;
    
    foInputs.forEach((input, index) => {
        const value = parseFloat(input.value) || 0;
        const grade = index + 1; // ФО 1 = оценка 1, ФО 2 = оценка 2, и т.д.
        foTotalGrades += (value * grade);
        foTotalCount += value;
    });
    
    // Рассчитываем процент ФО
    // Сумма оценок / (количество * 10) * 100%
    let foPercentage = 0;
    if (foTotalCount > 0) {
        const maxPossibleSum = foTotalCount * 10;
        foPercentage = (foTotalGrades / maxPossibleSum) * 100;
    }
    
    // Рассчитываем итоговую оценку: СОЧ 50% + СОР 25% + ФО 25%
    const total = (sochPercentage * 0.50) + (sorPercentage * 0.25) + (foPercentage * 0.25);
    
    // Округляем до целых
    const roundedTotal = Math.round(total);
    
    // Определяем оценку
    let grade = 2;
    if (roundedTotal >= 0 && roundedTotal <= 40) {
        grade = 2;
    } else if (roundedTotal >= 41 && roundedTotal <= 64) {
        grade = 3;
    } else if (roundedTotal >= 65 && roundedTotal <= 84) {
        grade = 4;
    } else if (roundedTotal >= 85 && roundedTotal <= 100) {
        grade = 5;
    }
    
    // Обновляем отображение результата и оценку
    resultElement.textContent = roundedTotal + '%';
    gradeElement.textContent = grade;
    
    // Удаляем все классы цветов
    gradeElement.classList.remove('result-red', 'result-yellow', 'result-dark-green', 'result-green');
    
    // Добавляем соответствующий класс цвета к оценке
    if (roundedTotal >= 0 && roundedTotal <= 40) {
        gradeElement.classList.add('result-red');
    } else if (roundedTotal >= 41 && roundedTotal <= 64) {
        gradeElement.classList.add('result-yellow');
    } else if (roundedTotal >= 65 && roundedTotal <= 84) {
        gradeElement.classList.add('result-dark-green');
    } else if (roundedTotal >= 85 && roundedTotal <= 100) {
        gradeElement.classList.add('result-green');
    }
}
