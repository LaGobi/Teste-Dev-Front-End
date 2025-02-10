// Função para verificar a resposta e navegar para a próxima pergunta
function checkAnswer(questionNumber) {
    const question = document.getElementById('question' + questionNumber);
    const selectedOption = question.querySelector('input[type="radio"]:checked');

    if (selectedOption) {
        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
        if (isCorrect) {
            // Marca a resposta correta com fundo verde
            question.querySelectorAll('label').forEach(label => {
                if (label.querySelector('input').checked) {
                    label.classList.add('correct');
                }
            });

            // Habilita a navegação para a próxima questão
            enableNavigation(questionNumber);

            // Exibe a próxima questão com um delay (apenas se não for a última questão)
            if (questionNumber < 3) {
                setTimeout(() => {
                    showNextQuestion(questionNumber);
                }, 1000);
            } else {
                document.querySelector('.finalizar-container').style.display = 'block';
            }
        } else {
            alert('Resposta incorreta! Tente novamente.');
        }
    } else {
        alert('Por favor, selecione uma resposta!');
    }
}

// Função para habilitar a navegação para a próxima questão
function enableNavigation(questionNumber) {
    // Habilita o botão da próxima questão apenas se a anterior foi respondida corretamente
    if (questionNumber < 3) {
        const nextButton = document.querySelector('.navigation button:nth-child(' + (questionNumber + 1) + ')');
        nextButton.disabled = false;
        nextButton.classList.add('active');
    }

    // Garante que as questões anteriores continuem navegáveis
    for (let i = 1; i <= questionNumber; i++) {
        const prevButton = document.querySelector('.navigation button:nth-child(' + (i + 1) + ')');
        prevButton.disabled = false;
        prevButton.classList.add('active');
    }

    checkIfAllAnsweredCorrectly();
}

// Função para exibir a próxima questão
function showNextQuestion(questionNumber) {
    document.getElementById('question' + questionNumber).style.display = 'none';
    document.getElementById('question' + (questionNumber + 1)).style.display = 'block';
}

// Função para navegar até uma questão específica
function goToQuestion(questionNumber) {
    if (!document.querySelector('.navigation button:nth-child(' + (questionNumber + 1) + ')').disabled) {
        document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
        document.getElementById('question' + questionNumber).style.display = 'block';
    }
}

// Função para verificar se todas as questões foram respondidas corretamente
function checkIfAllAnsweredCorrectly() {
    const totalQuestions = document.querySelectorAll('.question').length;
    let correctlyAnswered = 0;

    document.querySelectorAll('.question').forEach((question) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption && selectedOption.getAttribute('data-correct') === 'true') {
            correctlyAnswered++;
        }
    });

    if (correctlyAnswered === totalQuestions) {
        document.querySelector('.finalizar-container').style.display = 'block';
    }
}

// Função para finalizar o quiz
function finalizarQuiz() {
    alert('Parabéns, você concluiu o quiz 😄!');
}
