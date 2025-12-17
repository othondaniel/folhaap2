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

const instOrientadorInput = document.getElementById("instOrientador");
const instEx1Input = document.getElementById("instEx1");
const instEx2Input = document.getElementById("instEx2");

const pInstOrientador = document.getElementById("pInstOrientador");
const pInstEx1 = document.getElementById("pInstEx1");
const pInstEx2 = document.getElementById("pInstEx2");

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
      if (orientadorInput.value.trim()) {
        pOrientador.textContent = orientadorInput.value + " (Orientador)";
        pInstOrientador.textContent =
          instOrientadorInput.value || "Universidade do Estado do Rio Grande do Norte";
        assinaturaOrientador.style.display = "block";
      } else {
        assinaturaOrientador.style.display = "none";
      }
      
      // EXAMINADOR 1
      if (ex1Input.value.trim()) {
        pEx1.textContent = ex1Input.value + " (Examinador)";
        pInstEx1.textContent =
          instEx1Input.value || "Universidade do Estado do Rio Grande do Norte";
        assinaturaEx1.style.display = "block";
      } else {
        assinaturaEx1.style.display = "none";
      }
      
      // EXAMINADOR 2
      if (ex2Input.value.trim()) {
        pEx2.textContent = ex2Input.value + " (Examinador)";
        pInstEx2.textContent =
          instEx2Input.value || "Universidade do Estado do Rio Grande do Norte";
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
