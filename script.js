// ===== CAPTURA DOS INPUTS =====
const nomeInput = document.getElementById("nome");
const tituloTrabalhoInput = document.getElementById("tituloTrabalho");
const tipoSelect = document.getElementById("tipo");
const apresentadaSelect = document.getElementById("apresentada");
const campusSelect = document.getElementById("campus");
const tituloSelect = document.getElementById("titulo");
const cursoInput = document.getElementById("curso");
const dataInput = document.getElementById("data");

const orientadorInput = document.getElementById("orientador");
const ex1Input = document.getElementById("ex1");
const ex2Input = document.getElementById("ex2");

const assinaturaOrientador = document.getElementById("assinaturaOrientador");
const assinaturaEx1 = document.getElementById("assinaturaEx1");
const assinaturaEx2 = document.getElementById("assinaturaEx2");

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

  // ORIENTADOR
    if (orientadorInput.value) {
      pOrientador.textContent = orientadorInput.value + " (Orientador)";
      assinaturaOrientador.style.display = "block";
    } else {
      assinaturaOrientador.style.display = "none";
    }
    
    // EXAMINADOR 1
    if (ex1Input.value) {
      pEx1.textContent = ex1Input.value + " (Examinador)";
      assinaturaEx1.style.display = "block";
    } else {
      assinaturaEx1.style.display = "none";
    }
    
    // EXAMINADOR 2
    if (ex2Input.value) {
      pEx2.textContent = ex2Input.value + " (Examinador)";
      assinaturaEx2.style.display = "block";
    } else {
      assinaturaEx2.style.display = "none";
    }
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
