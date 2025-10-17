import { jsPDF } from 'jspdf';
import type { CoupleResults } from '../../hooks/useCoupleResults';

interface GeneratePdfSummaryOptions {
  filename?: string;
  title?: string;
}

export async function generatePdfSummary(results: CoupleResults, options: GeneratePdfSummaryOptions = {}) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const filename = options.filename ?? 'lecture-numerologie.pdf';
  const title = options.title ?? 'Lecture numérologique de couple';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(title, 40, 60);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Score global : ${Math.round(results.score)} / 100`, 40, 90);
  doc.text(`Nombre couple : ${results.couple.number} – ${results.couple.archetype}`, 40, 110);

  const partnerYOffset = 150;
  doc.setFont('helvetica', 'bold');
  doc.text('Partenaire 1', 40, partnerYOffset);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nombre : ${results.partnerA.number}`, 40, partnerYOffset + 20);
  doc.text(doc.splitTextToSize(results.partnerA.summary, 500), 40, partnerYOffset + 40);

  const partner2YOffset = partnerYOffset + 120;
  doc.setFont('helvetica', 'bold');
  doc.text('Partenaire 2', 40, partner2YOffset);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nombre : ${results.partnerB.number}`, 40, partner2YOffset + 20);
  doc.text(doc.splitTextToSize(results.partnerB.summary, 500), 40, partner2YOffset + 40);

  const coupleYOffset = partner2YOffset + 120;
  doc.setFont('helvetica', 'bold');
  doc.text('Lecture de couple', 40, coupleYOffset);
  doc.setFont('helvetica', 'normal');
  doc.text(doc.splitTextToSize(results.couple.dynamic, 500), 40, coupleYOffset + 20);

  doc.setFontSize(10);
  doc.text('Aa Predictor – expérience numérologique moderne', 40, 780);

  doc.save(filename);
}
