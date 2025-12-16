const { jsPDF } = window.jspdf;

function gerarPDF() {
  const doc = new jsPDF("p", "mm", "a4");

  const nome = document.getElementById("nome").value.toUpperCase();
  const tituloTrabalho = document.getElementById("tituloTrabalho").value.toUpperCase();
  const tipo = document.getElementById("tipo").value;
  const apresentada = document.getElementById("apresentada").value;
  const campus = document.getElementById("campus").value;
  const titulo = document.getElementById("titulo").value;
  const curso = document.getElementById("curso").value;
  const orientador = document.getElementById("orientador").value;
  const ex1 = document.getElementById("ex1").value;
  const ex2 = document.getElementById("ex2").value;
  const data = document.getElementById("data").value.split("-").reverse().join("/");

  doc.setFont("Times", "normal");
  doc.setFontSize(12);

  doc.text(nome, 105, 40, { align: "center" });
  doc.text(tituloTrabalho, 105, 60, { align: "center" });

  const texto =
`${tipo} apresentada ao ${apresentada}, do
${campus} da Universidade do Estado do Rio Grande do Norte,
como requisito parcial para obtenção do título de
${titulo} em ${curso}.`;

  doc.text(texto, 105, 90, { align: "center", maxWidth: 120 });

  doc.text(`Aprovada em: ${data}`, 20, 140);

  doc.text("Banca Examinadora", 105, 160, { align: "center" });

  doc.text(orientador + " (Orientador)", 20, 180);
  doc.text(ex1 + " (Examinador)", 20, 195);
  doc.text(ex2 + " (Examinador)", 20, 210);

  doc.save("folha-de-aprovacao.pdf");
}
