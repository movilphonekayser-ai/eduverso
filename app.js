let points = 0;

const chatInput = document.getElementById('chatInput');
const chatOutput = document.getElementById('chatOutput');
const sendBtn = document.getElementById('sendBtn');
const pointsDisplay = document.getElementById('points');

const respuestasSimuladas = {
  "hola": "¡Hola! Soy Edu, tu tutor. ¿En qué puedo ayudarte hoy?",
  "¿cuánto es 2+2?": "2 + 2 = 4 😄 ¡Correcto!",
  "¿qué es una suma?": "Una suma es cuando juntamos dos números para obtener un total."
};

sendBtn.addEventListener('click', () => {
  const pregunta = chatInput.value.trim().toLowerCase();
  if (!pregunta) return;

  const respuesta = respuestasSimuladas[pregunta] || "Lo siento, no sé la respuesta todavía. ¡Intenta otra pregunta!";
  
  // Mostrar pregunta y respuesta
  chatOutput.innerHTML += `<p><strong>Tú:</strong> ${chatInput.value}</p>`;
  chatOutput.innerHTML += `<p><strong>Edu:</strong> ${respuesta}</p>`;
  chatOutput.scrollTop = chatOutput.scrollHeight;

  // Aumentar puntos si la respuesta es correcta (simulada)
  if (respuesta.includes("¡Correcto!") || respuesta.includes("😊")) {
    points += 10;
    pointsDisplay.textContent = points;
  }

  chatInput.value = '';
  chatInput.focus();
});

// Enter para enviar
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

