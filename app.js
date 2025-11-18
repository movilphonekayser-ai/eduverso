let points = 0;

const chatInput = document.getElementById('chatInput');
const chatOutput = document.getElementById('chatOutput');
const sendBtn = document.getElementById('sendBtn');
const pointsDisplay = document.getElementById('points');

// Preguntas y respuestas para 7-10 años
const respuestasSimuladas = {
  // Saludos
  "hola": "¡Hola! Soy Edu, tu tutor. ¿Listo para aprender jugando?",
  "adiós": "¡Hasta luego! Vuelve pronto a jugar y aprender con Edu 👋",

  // Matemáticas
  "¿cuánto es 2+2?": "2 + 2 = 4 😄 ¡Correcto!",
  "¿cuánto es 5+3?": "5 + 3 = 8 🎉 ¡Bien hecho!",
  "si tengo 10 caramelos y como 4, ¿cuántos me quedan?": "10 - 4 = 6 caramelos 🍬",
  "si tengo 3 bolsas con 5 canicas cada una, ¿cuántas canicas hay?": "3 x 5 = 15 canicas 🔵",
  "si tengo 20 galletas y las reparto entre 4 amigos, ¿cuántas recibe cada uno?": "20 ÷ 4 = 5 galletas 🍪",
  "¿qué es una suma?": "Una suma es cuando juntamos dos números para obtener un total.",
  "¿qué es una resta?": "Una resta es cuando quitamos una cantidad de otra para saber cuánto queda.",
  "¿qué es multiplicar?": "Multiplicar es sumar un número varias veces. Por ejemplo, 3 x 2 = 3 + 3 = 6",
  "¿qué es dividir?": "Dividir es repartir en partes iguales. Por ejemplo, 6 ÷ 2 = 3",

  // Lenguaje
  "escribe una palabra con la letra a": "Casa, araña, amigo... ¿Se te ocurre alguna otra?",
  "qué significa la palabra 'feliz'?": "Feliz significa estar contento o alegre 😊",
  "forma una oración con la palabra 'sol'": "El sol brilla en el cielo ☀️",
  "cuál es la primera letra de 'elefante'?": "La primera letra es E",

  // Ciencias
  "nombre de un animal que vive en el agua": "Pez, delfín, tortuga... 🐠",
  "nombre de un animal que vuela": "Pájaro, murciélago, mariposa... 🦋",
  "cuántas patas tiene una araña?": "8 patas 🕷️",
  "qué necesitamos para vivir?": "Agua, comida, aire y cariño ❤️",
  "qué hace la planta para crecer?": "La planta usa agua, luz del sol y tierra 🌱",

  // Cultura general
  "qué día viene después del lunes?": "Martes 🗓️",
  "cuántos días tiene la semana?": "7 días",
  "nombra los colores del arcoíris": "Rojo, naranja, amarillo, verde, azul, índigo y violeta 🌈",
  "cuántos lados tiene un triángulo?": "3 lados 🔺",
  "cuántos lados tiene un cuadrado?": "4 lados ⬜"
};

// Mensajes motivadores aleatorios
const motivaciones = [
  "¡Genial! Sigamos aprendiendo 😊",
  "¡Eres muy bueno resolviendo esto! 🎉",
  "¡Excelente trabajo! 🌟",
  "¡Sigue así, lo estás haciendo muy bien! 😄",
  "¡Qué rápido aprendes! 🚀"
];

// Normalizar texto
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// Verificar respuestas aproximadas
function verificarRespuestaAprox(pregunta, respuestaUsuario) {
  const respuestaNormal = normalizar(respuestaUsuario);

  const respuestasAproximadas = {
    "2+2": ["4", "cuatro"],
    "5+3": ["8", "ocho"],
    "10-4": ["6", "seis"],
    "3x5": ["15", "quince"],
    "20÷4": ["5", "cinco"],
    "cuántos lados tiene un triángulo": ["3", "tres"],
    "cuántos lados tiene un cuadrado": ["4", "cuatro"]
  };

  for (let clave in respuestasAproximadas) {
    if (pregunta.toLowerCase().includes(clave)) {
      return respuestasAproximadas[clave].includes(respuestaNormal);
    }
  }
  return null;
}

// Obtener respuesta
function obtenerRespuesta(pregunta) {
  const preguntaNormal = normalizar(pregunta);
  for (let clave in respuestasSimuladas) {
    if (preguntaNormal === normalizar(clave)) {
      return respuestasSimuladas[clave];
    }
  }
  return "¡Mmm! No sé eso todavía 😅 ¿Quieres intentar otra pregunta?";
}

// Enviar mensaje
sendBtn.addEventListener('click', () => {
  const preguntaUsuario = chatInput.value;
  if (!preguntaUsuario.trim()) return;

  const respuestaAprox = verificarRespuestaAprox(preguntaUsuario, preguntaUsuario);
  let respuesta;

  if (respuestaAprox === true) {
    const motivacion = motivaciones[Math.floor(Math.random() * motivaciones.length)];
    respuesta = `¡Correcto! 😄 ${motivacion}`;
    points += 10;
  } else if (respuestaAprox === false) {
    respuesta = "Casi 😅, inténtalo de nuevo!";
  } else {
    respuesta = obtenerRespuesta(preguntaUsuario);
  }

  chatOutput.innerHTML += `<p><strong>Tú:</strong> ${preguntaUsuario}</p>`;
  chatOutput.innerHTML += `<p><strong>Edu:</strong> ${respuesta}</p>`;
  chatOutput.scrollTop = chatOutput.scrollHeight;

  pointsDisplay.textContent = points;
  chatInput.value = '';
  chatInput.focus();
});

// Enter para enviar
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

