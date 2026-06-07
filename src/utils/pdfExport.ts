import { jsPDF } from 'jspdf';
import { OSInfo } from '../types';

export function exportOSToPDF(os: OSInfo) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Margins & Dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(24, 24, 27); // Dark Slate zinc-900
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Decorative blue line
  doc.setFillColor(99, 102, 241); // Indigo-500
  doc.rect(0, 42, pageWidth, 2, 'F');

  // Decorative border details
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('CHRONOS OS EXPLORER', margin, 18);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(191, 196, 210);
  doc.text(`CAHIER PÉDAGOGIQUE HISTORIQUE • EXPÉDITION DU SOUFFLE BINAIRE`, margin, 24);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} de façon éco-responsable`, margin, 29);

  // Badge Top Right
  doc.setFillColor(39, 39, 42); // zinc-800
  doc.rect(pageWidth - margin - 55, 12, 55, 20, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(165, 180, 252); // Indigo-100
  doc.text(`FICHE : ${os.name.toUpperCase()}`, pageWidth - margin - 51, 18);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175); // gray-400
  doc.text(`Lancement : Année ${os.launchYear}`, pageWidth - margin - 51, 23);
  doc.text(`Basse : ${os.architectureBasis.split(',')[0]}`, pageWidth - margin - 51, 27);

  let y = 54;

  // OS Main details title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(os.fullName || os.name, margin, y);
  y += 6;

  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(99, 102, 241);
  const summaryLines = doc.splitTextToSize(os.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += (summaryLines.length * 5) + 6;

  // Speck Quad Tables Grid
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(margin, y, contentWidth, 36, 'F');
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(margin, y, contentWidth, 36, 'S');

  // Grid line axis divider
  doc.line(margin + contentWidth / 2, y, margin + contentWidth / 2, y + 36);
  doc.line(margin, y + 18, margin + contentWidth, y + 18);

  // Grid Top Left quadrant
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('DÉVELOPPEUR & AUTEURS', margin + 4, y + 5);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(os.developer.substring(0, 42), margin + 4, y + 10);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Architectes : ${os.architects.join(', ').substring(0, 40)}`, margin + 4, y + 14);

  // Grid Top Right quadrant
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ARCHITECTURE DE NOYAU', margin + contentWidth/2 + 4, y + 5);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Noyau : ${os.kernel}`, margin + contentWidth/2 + 4, y + 10);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const coreDetails = doc.splitTextToSize(os.kernelDetails, (contentWidth/2) - 8);
  doc.text(coreDetails, margin + contentWidth/2 + 4, y + 13.5);

  // Grid Bottom Left quadrant
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('SYSTÈMES DE FICHIERS', margin + 4, y + 23);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(os.fileSystems.join(', ').substring(0, 45), margin + 4, y + 28);
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Structure organisée d\'adressage sur cylindres physiques.', margin + 4, y + 32);

  // Grid Bottom Right quadrant
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('LICENCE ET FONDATIONS', margin + contentWidth/2 + 4, y + 23);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(os.license.substring(0, 45), margin + contentWidth/2 + 4, y + 28);
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Inspirations : ${os.architectureBasis.split(',')[0]}`, margin + contentWidth/2 + 4, y + 32);

  y += 42;

  // Title of narrative section
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(99, 102, 241);
  doc.text("RÉCIT DE L'HISTORIEN D'AVANT-GARDE", margin, y);
  
  doc.setDrawColor(99, 102, 241, 0.4);
  doc.line(margin, y + 2, margin + 60, y + 2);
  y += 8;

  // Narrative Text Block
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85); // charcoal text
  const cleanDescription = os.description.replace(/\n\n/g, "\n");
  const descriptionLines = doc.splitTextToSize(cleanDescription, contentWidth);
  doc.text(descriptionLines, margin, y);
  y += (descriptionLines.length * 4.5) + 6;

  // Key innovations highlight box
  doc.setFillColor(243, 244, 246);
  doc.rect(margin, y, contentWidth, 31, 'F');
  
  doc.setDrawColor(99, 102, 241, 0.4);
  doc.line(margin, y, margin, y + 31); // blue vertical bar

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(99, 102, 241);
  doc.text("APPORTS TECHNIQUES ET RECHERCHES MAJEURES", margin + 4, y + 5);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  let innovationY = y + 10;
  os.keyInnovations.forEach((inn, i) => {
    if (i < 3) {
      doc.text(`• ${inn}`, margin + 5, innovationY);
      innovationY += 4.5;
    }
  });

  // Page 1 Footer
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Chronos OS Explorer • Document Pédagogique généré pour l'enseignement et le partage universitaire.", margin, pageHeight - 12);
  doc.text("Page 1/2", pageWidth - margin - 15, pageHeight - 12);

  // ***************** PAGE 2 CONTENT *****************
  doc.addPage();

  // Mini Banner Page 2
  doc.setFillColor(24, 24, 27);
  doc.rect(0, 0, pageWidth, 12, 'F');
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 12, pageWidth, 1, 'F');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`COMPLÉMENTS CHRONOLOGIQUES ET SPÉCIFICATIONS : ${os.name.toUpperCase()}`, margin, 8);

  let y2 = 22;

  // Anecdote Section Box
  doc.setFillColor(254, 251, 236); // Amber light background
  doc.rect(margin, y2, contentWidth, 24, 'F');
  doc.setDrawColor(245, 158, 11, 0.3);
  doc.rect(margin, y2, contentWidth, 24, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9);
  doc.text("L'ANECDOTE INSOLITE DE L'ARCHÉORECHERCHE", margin + 4, y2 + 5);

  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const anecdoteLines = doc.splitTextToSize(`"${os.anecdote}"`, contentWidth - 8);
  doc.text(anecdoteLines, margin + 4, y2 + 10);
  
  y2 += 30;

  // Survival Factor Box if present
  if (os.survivalExplanation) {
    doc.setFillColor(240, 253, 244); // light green
    doc.rect(margin, y2, contentWidth, 24, 'F');
    doc.setDrawColor(34, 197, 94, 0.3);
    doc.rect(margin, y2, contentWidth, 24, 'S');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(21, 128, 61);
    doc.text("FACTEURS DE SURVIE ET INTÉRÊT DANS L'INFORMATIQUE DE 2026", margin + 4, y2 + 5);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(71, 85, 105);
    const survivalLines = doc.splitTextToSize(os.survivalExplanation, contentWidth - 8);
    doc.text(survivalLines, margin + 4, y2 + 10);
    
    y2 += 30;
  }

  // Version historical milestones List
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text("CHRONOLOGIE DES VERSIONS ET JALONS HISTORIQUES", margin, y2);

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y2 + 2, margin + contentWidth, y2 + 2);
  y2 += 8;

  os.versions.forEach((ver) => {
    if (y2 < pageHeight - 30) {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y2, contentWidth, 14, 'F');
      doc.setDrawColor(243, 244, 246);
      doc.rect(margin, y2, contentWidth, 14, 'S');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(99, 102, 241);
      doc.text(ver.year, margin + 4, y2 + 6);

      doc.setTextColor(17, 24, 39);
      doc.text(ver.name, margin + 18, y2 + 6);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(107, 114, 128);
      doc.text(ver.significance.substring(0, 105), margin + 18, y2 + 10);

      y2 += 16;
    }
  });

  // Page 2 Footer
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Chronos OS Explorer • Document Pédagogique généré pour l'enseignement et le partage universitaire.", margin, pageHeight - 12);
  doc.text("Page 2/2", pageWidth - margin - 15, pageHeight - 12);

  doc.save(`chronos_pedago_${os.id}.pdf`);
}

export function exportTimelineToPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(24, 24, 27); // Dark zinc-900
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Amber gold indicator bar
  doc.setFillColor(245, 158, 11); // Amber
  doc.rect(0, 42, pageWidth, 2, 'F');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('FRISE CHRONOLOGIQUE DES SYSTÈMES', margin, 18);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(191, 196, 210);
  doc.text('GUIDE CHRONOLOGIQUE DES GRANDES RUPTURES ARCHITECTURALES', margin, 24);
  doc.text(`Document pédagogique officiel généré le ${new Date().toLocaleDateString('fr-FR')}`, margin, 29);

  let y = 56;

  // Timeline introductory description
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text('Analyse d\'Évolution des Idées et du Hack Informatique :', margin, y);
  y += 6;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const introBlock = "Cette frise retrace les points critiques où la technologie a changé de main de manière spectaculaire, passant de architectures de salon et de bureautique mono-tâches dépendantes de la bonne foi des développeurs, à des forteresses réseaux et des noyaux hybrides de haute volée.";
  const introLines = doc.splitTextToSize(introBlock, contentWidth);
  doc.text(introLines, margin, y);
  y += (introLines.length * 4.5) + 8;

  // Milestones timeline items list
  const timelineMilestones = [
    {
      year: '1981',
      title: 'Démocratisation et Standard MS-DOS',
      details: "Après la sortie du PC IBM, MS-DOS forge le destin de l'informatique de salon. C'est un système textuel monocarte fonctionnant sans aucune protection de la mémoire."
    },
    {
      year: '1984/1985',
      title: 'Introduction des Écrans Graphiques (Macintosh, Atari ST, Amiga)',
      details: "Le bureau graphique foudroie les lignes de commande. Premier multitâche préemptif grand public pour l'Amiga, et introduction native du réseau MIDI par l'Atari ST."
    },
    {
      year: '1991',
      title: 'Révolution du Code Libre Collaboratif (Linux)',
      details: "Linus Torvalds publie le noyau Linux. Les développeurs s'affranchissent des licences commerciales exorbitantes et développent la base des infrastructures du Web actuel."
    },
    {
      year: '1993',
      title: 'Sûreté Industrielle et Noyau Hybride (Windows NT)',
      details: "Microsoft enterre MS-DOS au profit de NT. La mémoire protégée, l'ordre des privilèges utilisateur et la stabilité multiprocesseur mettent fin aux crashs en cascade."
    },
    {
      year: '2001',
      title: 'Synthèse Artistique et Base de Certification UNIX (Mac OS X)',
      details: "Apple fusionne l'élégance graphique de son OS avec l'étanchéité de NeXTSTEP et de BSD. Naissance de macOS, garantissant robustesse logique et design de classe mondiale."
    }
  ];

  timelineMilestones.forEach((item, index) => {
    // Left vertical timeline line connector
    if (index < timelineMilestones.length - 1) {
      doc.setDrawColor(245, 158, 11, 0.4);
      doc.setLineWidth(1.0);
      doc.line(margin + 4, y + 2, margin + 4, y + 30);
    }

    // Interactive circular dot representation
    doc.setFillColor(245, 158, 11);
    doc.circle(margin + 4, y + 2, 2.5, 'FD');

    // Year Label
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(245, 158, 11);
    doc.text(item.year, margin + 11, y + 3.5);

    // Title label
    doc.setTextColor(17, 24, 39);
    doc.text(item.title, margin + 26, y + 3.5);

    // Details text
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const detailLines = doc.splitTextToSize(item.details, contentWidth - 30);
    doc.text(detailLines, margin + 26, y + 8);

    y += 24;
  });

  // Footer for Frise
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Chronos OS Explorer • Document Frise Chronologique d'Histoire Informatique.", margin, pageHeight - 12);
  doc.text("Page 1/1", pageWidth - margin - 15, pageHeight - 12);

  doc.save('chronologie_chronos_os.pdf');
}
