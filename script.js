const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex;
let answers = [];
let shuffledQuestions = [];

const questions = [
    {
        question: 'What is your skin type?',
        answers: [
            { text: 'Oily', value: 'oily' },
            { text: 'Dry', value: 'dry' },
            { text: 'Combination', value: 'combination' },
            { text: 'Normal', value: 'normal' }
        ]
    },
    {
        question: 'How often do you breakout?',
        answers: [
            { text: 'Never', value: 'never' },
            { text: 'Daily', value: 'daily' },
            { text: 'Weekly', value: 'weekly' },
            { text: 'Monthly', value: 'monthly' }
        ]
    },
    {
        question: 'What is your biggest skin concern?',
        answers: [
            { text: 'Acne', value: 'acne' },
            { text: 'Discoloration', value: 'discoloration' },
            { text: 'Dull', value: 'dull' },
            { text: 'Clogged Pores', value: 'clogged_pores' }
        ]
    }, // <-- Missing comma added here
    {
        question: 'What is your desired price range?',
        answers: [
            { text: '$5 - $20', value: 'cheap' },
            { text: '$20 - $35', value: 'moderate' },
            { text: '$35 - $50', value: 'pricey' },
            { text: '$50+', value: 'expensive' }
        ]
    }
];

startButton.addEventListener('click', startSurvey);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartSurvey);

function startSurvey() {
    startButton.classList.add('hide');
    shuffledQuestions = questions; 
    currentQuestionIndex = 0;
    answers = [];
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.value = answer.value;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const value = selectedButton.dataset.value;
    answers.push(value);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    const advice = getAdvice(answers);
    resultElement.innerText = advice;
}

function getAdvice(answers) {
    let advice = "Based on your answers:\n";

    if (answers[0] === 'oily') {
        advice += "\nYou have oily skin. Consider using oil-free moisturizers and cleansers such as ";
        if (answers[3] === 'cheap') {
            advice += "the BYOMA Moisturizing Gel Cream.\n";
        }
        if (answers[3] === 'moderate') {
            advice += "the First Aid Beauty Ultra Repair Oil-Control Moisturizer.\n";
        }
        if (answers[3] === 'pricey') {
            advice += "the Peach & Lily Glass Skin Water Gel Moisturizer.\n";
        }
        if (answers[3] === 'expensive') {
            advice += "the Tatcha Water Cream.\n";
        }
    } else if (answers[0] === 'dry') {
        advice += "\nYou have dry skin. Use hydrating products and avoid harsh cleansers. ";
        if (answers[3] === 'cheap') {
            advice += "I would recommend the Byoma Moisturizing Rich Cream.\n";
        }
        if (answers[3] === 'moderate') {
            advice += "I would recommend the Glow Recipe Plum Plump Hyaluronic Cream.\n";
        }
        if (answers[3] === 'pricey') {
            advice += "I would recommend the Farmacy Honey Halo Ultra-Hydrating Ceramide Moisturizer.\n";
        }
        if (answers[3] === 'expensive') {
            advice += "I would recommend the La Mer Crème de la Mer.\n";
        }
    } else if (answers[0] === 'combination') {
        advice += "\nYou have combination skin. Balance your skincare routine with products for both oily and dry areas such as ";
        if (answers[3] === 'cheap') {
            advice += "the Byoma Moisturizing Rich Cream.\n";
        }
        if (answers[3] === 'moderate') {
            advice += "the Glow Recipe Plum Plump Hyaluronic Cream.\n";
        }
        if (answers[3] === 'pricey') {
            advice += "the REN Clean Skincare Evercalm Global Protection Day Cream.\n";
        }
        if (answers[3] === 'expensive') {
            advice += "the Estee Lauder Soft Creme/Mask Moisturizer.\n";
        }
    } else if (answers[0] === 'normal') {
        advice += "\nYou have normal skin. Maintain a balanced skincare routine.\n";
    }

    if (answers[1] === 'daily' || answers[1] === 'weekly') {
        advice += "You frequently experience breakouts. Incorporate acne treatments into your routine such as ";
        if (answers[3] === 'cheap') {
            advice += "the Acne Set from The Ordinary.\n";
        }
        if (answers[3] === 'moderate') {
            advice += "the La Roche-Posay Effaclar.\n";
        }
        if (answers[3] === 'pricey') {
            advice += "the La Roche-Posay Effaclar.\n";
        }
        if (answers[3] === 'expensive') {
            advice += "the Skinfix Acne+ Adapinoid Gel.\n";
        }
    }

    if (answers[2] === 'acne') {
        advice += "Focus on acne treatments and avoid pore-clogging products.\n";
    } else if (answers[2] === 'discoloration') {
        advice += "Use products with ingredients like Vitamin C to address discoloration. ";
        if (answers[3] === 'cheap') {
            advice += "I would recommend the Topicals Faded Serum.\n";
        }
        if (answers[3] === 'moderate') {
            advice += "I would recommend the cocokind Chlorophyll Discoloration Serum.\n";
        }
        if (answers[3] === 'pricey') {
            advice += "I would recommend the Murad Brighten Trial Kit.\n";
        }
        if (answers[3] === 'expensive') {
            advice += "I would recommend the Paula’s Choice CLINICAL Discoloration Repair Serum.\n";
        }
    } else if (answers[2] === 'dull') {
        advice += "Exfoliate regularly and use brightening products. ";
        if (answers[3] === 'cheap') {
            advice += "I would recommend the The Inkey List PHA Gentle Exfoliating Toner.\n";
        }
        if (answers[3] === 'moderate') {
            advice += "I would recommend the L'Oreal Paris Revitalift 1.5% Hyaluronic Acid Serum.\n";
        }
        if (answers[3] === 'pricey') {
            advice += "I would recommend the Sunday Riley C.E.O 15% Vitamin C Brightening Serum.\n";
        }
        if (answers[3] === 'expensive') {
            advice += "I would recommend the Skinceuticals C E Ferulic.\n";
        }
    } else if (answers[2] === 'clogged_pores') {
        advice += "Use products that help unclog pores, like ";
        if (answers[3] === 'cheap') {
            advice += "the The Ordinary Salicylic Acid 2% Anhydrous Solution 30ml.\n";
        }
        if (answers[3] === 'moderate') {
            advice += "the Benefit Cosmetics The POREfessional Deep Retreat Pore-Clearing Clay Mask.\n";
        }
        if (answers[3] === 'pricey') {
            advice += "the Caudalie Vinopure Salicylic Toner.\n";
        }
        if (answers[3] === 'expensive') {
            advice += "the La Roche-Posay Effaclar.\n";
        }
    }

    return advice;
}

function restartSurvey() {
    resultContainerElement.classList.add('hide');
    startButton.innerText = 'Start Skin Survey!';
    startButton.classList.remove('hide');
}
