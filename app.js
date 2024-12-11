// Informações do usuário
let userInfo = {
  id: '',
  name: '',
  profession: ''
};

// Perguntas organizadas por categoria
let questionsByCategory = {
  autoconhecimento: [
    "Quais são as suas principais motivações na vida?",
    "Quais habilidades você gostaria de desenvolver nos próximos meses?",
    "Qual foi o maior aprendizado que você teve até agora?",
    "O que você considera seu maior ponto forte e ponto a melhorar?"
  ],
  objetivos: [
    "Quais são seus objetivos para o próximo ano?",
    "Como você define sucesso para si mesmo?",
    "Quais são os principais passos que você está tomando para alcançar seus sonhos?",
    "Qual é a realização para seus objetivos"
  ],
  carreira: [
    "Qual é o seu maior desafio atual na carreira?",
    "Como você lida com situações de conflito no trabalho?",
    "Que competências técnicas e comportamentais você considera essenciais na sua área de atuação?",
    "Como você se vê na carreira escolhida?"
  ],
  relacionamentos: [
    "Como você mantém contato com amigos e familiares?",
    "Qual é a qualidade mais importante que você busca em uma amizade ou amor?",
    "O que você considera essencial para construir uma boa relação com alguém?",
    "Você acredita em ser essencial para um relacionamento duravel?"
  ],
  estiloDeVida: [
    "Quais práticas você adota para manter seu bem-estar mental?",
    "Como você lida com situações de estresse no dia a dia?",
    "Quais atividades você gosta de fazer para relaxar e se divertir?",
    "Como fazer uma boa escolha de vida atualmente?"
  ],
  interesses: [
    "Quais tópicos você gosta de aprender e explorar nas horas livres?",
    "Qual foi o último livro ou curso que mais te impactou?",
    "Se pudesse ensinar algo para alguém, o que seria?",
    "Você tem interesse em aprender ou ensinar?"
  ],
  futuro: [
    "Você imagina o mundo daqui a 20 anos?",
    "Quais são suas maiores esperanças para o futuro?",
    "O que você acredita ser necessário para um mundo melhor?",
    "O que você imagina em um futuro emprego do seus sonhos?"
  ],
  tecnologia: [
    "Você acha que a tecnologia pode melhorar a vida das pessoas?",
    "Você tem uma tecnologia específica para atuar?",
    "A tecnologia influencia sua rotina diária?",
    "Se você pudesse mudar alguma tecnologia, qual você mudaria e o porque?"
  ]
  // Adicione as outras categorias aqui
};

// Variáveis de controle
let currentCategory = '';  // Categoria selecionada
let currentQuestionIndex = 0;  // Índice da pergunta atual
let answers = [];  // Array para armazenar as respostas

// Função para salvar informações do usuário e selecionar uma categoria
function saveUserInfo(event) {
  event.preventDefault(); // Impede o envio do formulário e o recarregamento da página

  // Captura os valores dos campos de entrada
  const userId = document.getElementById('user-id').value;
  const userName = document.getElementById('user-name').value;
  const userProfession = document.getElementById('user-profession').value;

  // Confirma que todos os campos foram preenchidos
  if (userId && userName && userProfession) {
    // Exibe no console (opcionalmente para testes)
    console.log("Dados do usuário:", { userId, userName, userProfession });

    // Altera a visibilidade das seções
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('category-selection').style.display = 'block';
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Função para iniciar a avaliação com a categoria selecionada
function startAssessment(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  answers = [];  // Limpa as respostas

  document.getElementById('category-selection').style.display = 'none';
  document.getElementById('assessment').style.display = 'block';

  loadNextQuestion();  // Carregar a primeira pergunta
}

// Função para carregar a próxima pergunta
function loadNextQuestion() {
  const questions = questionsByCategory[currentCategory];
  
  if (currentQuestionIndex < questions.length) {
    document.getElementById('question').innerText = questions[currentQuestionIndex];
  } else {
    document.getElementById('assessment').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    displayResults();  // Exibe os resultados
  }
}

// Função para registrar a resposta
function recordAnswer(answer) {
  answers.push({
    question: questionsByCategory[currentCategory][currentQuestionIndex],
    answer: answer
  });

  // Exibe a pergunta e a resposta na mesma linha
  const answerDiv = document.createElement('div');
  answerDiv.innerHTML = `<strong>Pergunta:</strong> ${questionsByCategory[currentCategory][currentQuestionIndex]} <br><strong>Resposta:</strong> ${answer}`;
  document.getElementById('answers').appendChild(answerDiv);

  currentQuestionIndex++;  // Avança para a próxima pergunta
  loadNextQuestion();  // Carregar a próxima pergunta
}

// Função para registrar a resposta aberta
function recordOpenAnswer() {
  const openAnswer = document.getElementById('open-answer').value;
  
  if (openAnswer) {
    // Armazena a resposta aberta
    answers.push({
      question: questionsByCategory[currentCategory][currentQuestionIndex],
      answer: openAnswer
    });

   
    // Exibe a pergunta e a resposta aberta
    const answerDiv = document.createElement('div');
    answerDiv.innerHTML = `<strong>Pergunta:</strong> ${questionsByCategory[currentCategory][currentQuestionIndex]} <br><strong>Resposta:</strong> ${openAnswer}`;
    document.getElementById('answers').appendChild(answerDiv);

    document.getElementById('open-answer').value = '';  // Limpa o campo de resposta aberta
    currentQuestionIndex++;  // Avança para a próxima pergunta
    loadNextQuestion();  // Carregar a próxima pergunta
  } else {
    alert("Por favor, insira uma resposta.");
  }
}

// Exibir os resultados finais
function displayResults() {
  document.getElementById('results').innerHTML = "<h2>Resultados Finais</h2>";
  answers.forEach(answer => {
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `<strong>Pergunta:</strong> ${answer.question} <br><strong>Resposta:</strong> ${answer.answer}<br><br>`;
    document.getElementById('results').appendChild(resultDiv);
  });

  // Adiciona o botão para retornar ao início
  const returnButton = document.createElement('button');
  returnButton.innerText = "Retornar ao Início";
  returnButton.onclick = goToHomePage;
  document.getElementById('results').appendChild(returnButton);
}

// Função para voltar à página inicial
function goToHomePage() {
  document.getElementById('user-info').style.display = 'block';
  document.getElementById('category-selection').style.display = 'none';
  document.getElementById('assessment').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('answers').innerHTML = '';  // Limpa as respostas
  document.getElementById('results').innerHTML = '';  // Limpa os resultados finais

  // Limpa os campos de entrada de informações do usuário
  document.getElementById('user-id').value = '';
  document.getElementById('user-name').value = '';
  document.getElementById('user-profession').value = '';

  // Redefine variáveis de controle
  userInfo = { id: '', name: '', profession: '' };
  currentCategory = '';
  currentQuestionIndex = 0;
  answers = [];
}

// Função para registrar a resposta aberta
function recordOpenAnswer() {
  const openAnswer = document.getElementById("open-answer").value.trim();
  
  if (openAnswer) {
    // Armazena a resposta aberta
    answers.push({
      question: questionsByCategory[currentCategory][currentQuestionIndex],
      answer: openAnswer
    });

    // Exibe a pergunta e a resposta aberta
    const answerDiv = document.createElement('div');
    answerDiv.innerHTML = `<strong>Pergunta:</strong> ${questionsByCategory[currentCategory][currentQuestionIndex]} <br><strong>Resposta:</strong> ${openAnswer}`;
    document.getElementById('answers').appendChild(answerDiv);

    document.getElementById("open-answer").value = '';  // Limpa o campo de resposta aberta
    currentQuestionIndex++;  // Avança para a próxima pergunta
    loadNextQuestion();  // Carregar a próxima pergunta
  } else {
    alert("Por favor, insira uma resposta.");
  }
}

// Adicionar evento ao pressionar Enter no campo de resposta aberta
document.getElementById("open-answer").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    recordOpenAnswer();
  }
});

function saveUserInfo(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  // Captura os valores do formulário
  const userId = document.getElementById("user-id").value;
  const userName = document.getElementById("user-name").value;
  const userProfession = document.getElementById("user-profession").value;

  // Exibe os valores na seção de respostas
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = `
    <p><strong>ID:</strong> ${userId}</p>
    <p><strong>Nome:</strong> ${userName}</p>
    <p><strong>Profissão:</strong> ${userProfession}</p>
  `;

  // Esconde a seção de identificação e exibe a próxima seção
  document.getElementById("user-info").style.display = "none";
  document.getElementById("category-selection").style.display = "block";
}
