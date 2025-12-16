// ===== CAPTURA DOS INPUTS =====
const nomeInput = document.getElementById("nome");
const tituloTrabalhoInput = document.getElementById("tituloTrabalho");
const tipoSelect = document.getElementById("tipo");
const apresentadaSelect = document.getElementById("apresentada");
const campusSelect = document.getElementById("campus");
const tituloSelect = document.getElementById("titulo");
const cursoInput = document.getElementById("curso");
const orientadorInput = document.getElementById("orientador");
const ex1Input = document.getElementById("ex1");
const ex2Input = document.getElementById("ex2");
const dataInput = document.getElementById("data");

// ===== ELEMENTOS DO PREVIEW =====
const pNome = document.getElementById("pNome");
const pTitulo = document.getElementById("pTitulo");
const pTexto = document.getElementById("pTexto");
const pData = document.getElementById("pData");
const pOrientador = document.getElementById("pOrientador");
const pEx1 = document.getElementById("pEx1");
const pEx2 = document.getElementById("pEx2");

// ===== ATUALIZAÇÃO EM TEMPO REAL =====
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", atualizarPreview);
});

function atualizarPreview() {
  pNome.textContent =
    nomeInput.value.toUpperCase() || "NOME DO ALUNO";

  pTitulo.textContent =
    tituloTrabalhoInput.value.toUpperCase() || "TÍTULO DO TRABALHO";

  pTexto.textContent =
`${tipoSelect.value} apresentada ao ${apresentadaSelect.value}, do
${campusSelect.value} da Universidade do Estado do Rio Grande do Norte,
como requisito parcial para obtenção do título de
${tituloSelect.value} em ${cursoInput.value || "CURSO"}.`;

  pData.textContent =
    dataInput.value
      ? "Aprovada em: " + dataInput.value.split("-").reverse().join("/")
      : "Aprovada em: ___ / ___ / _____";

  pOrientador.textContent =
    orientadorInput.value
      ? orientadorInput.value + " (Orientador)"
      : "Orientador";

  pEx1.textContent =
    ex1Input.value
      ? ex1Input.value + " (Examinador)"
      : "Examinador 1";

  pEx2.textContent =
    ex2Input.value
      ? ex2Input.value + " (Examinador)"
      : "Examinador 2";
}

// ===== GERAR PDF A PARTIR DO PREVIEW =====
async function gerarPDF() {
  const pagina = document.querySelector(".pagina");

  const canvas = await html2canvas(pagina, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jspdf.jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  pdf.save("folha-de-aprovacao.pdf");
}
