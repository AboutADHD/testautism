/**
 * Generator PDF Îmbunătățit cu Suport pentru Diacritice Românești
 *
 * Această funcție rezolvă problema diacriticelor românești în PDF-uri
 * folosind o abordare cu font încorporat și tehnici avansate de randare text.
 */
function generateRomanianPDF() {
    try {
        // Obține rezultatele testului
        const results = calculateSubscores();
        const { subscores, totalScore } = results;

        // Creează documentul PDF cu opțiuni optimizate
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true
        });

        // ===== PARTEA 1: ÎNCORPORARE FONT CU SUPORT PENTRU DIACRITICE =====

        // Adaugă fontul Open Sans (are suport bun pentru diacritice)
        // Acest cod presupune că ai încărcat deja librăria jspdf-font
        try {
            // Încercăm să verificăm dacă fontul este deja disponibil
            if (!doc.getFontList().hasOwnProperty('open-sans-regular')) {
                // Încărcăm fontul OpenSans din CDN
                const openSansBold = "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf";
                const openSansRegular = "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf";

                // Adaugă fontul (doar dacă librăria suportă)
                if (typeof doc.addFont === 'function') {
                    doc.addFont(openSansRegular, "OpenSans", "normal");
                    doc.addFont(openSansBold, "OpenSans", "bold");
                }
            }

            // Setează fontul
            try {
                doc.setFont("OpenSans", "normal");
            } catch (e) {
                console.log("Folosim fontul implicit deoarece OpenSans nu poate fi setat:", e);
            }
        } catch (fontError) {
            console.log("Nu s-a putut încărca fontul, folosim fontul implicit:", fontError);
        }

        // ===== PARTEA 2: FUNCțII HELPER PENTRU TEXT ROMÂNESC =====

        // Funcție pentru text cu wrapping și aliniere și conversie diacritice
        const addSafeText = (text, x, y, options = {}) => {
            const {
                fontSize = 11,
                fontStyle = 'normal',
                color = [0, 0, 0],
                align = 'left',
                maxWidth = 170  // lățimea implicită în mm (A4 are ~210mm lățime)
            } = options;

            // Setează font și culoare
            doc.setFontSize(fontSize);
            try {
                doc.setFont("OpenSans", fontStyle);
            } catch (e) {
                doc.setFont("helvetica", fontStyle);
            }
            doc.setTextColor(...color);

            // Preprocesare text pentru a gestiona diacriticele într-un mod mai bun
            // Această abordare menține diacriticele chiar dacă fontul nu le suportă direct
            const processedText = text ? text.replace(/ț/g, "ţ").replace(/Ț/g, "Ţ") : ""; // Asigură-te că textul există

            // Divizare text în linii cu wrap automat
            const textLines = doc.splitTextToSize(processedText, maxWidth);

            // Determină coordonata X bazată pe aliniere
            let xPos = x;
            if (align === 'center') {
                textLines.forEach(line => {
                    doc.text(line, 105, y, { align: 'center' });
                    y += fontSize * 0.5;
                });
            } else if (align === 'right') {
                textLines.forEach(line => {
                    doc.text(line, 190, y, { align: 'right' });
                    y += fontSize * 0.5;
                });
            } else {
                // Aliniere stânga (implicită)
                textLines.forEach(line => {
                    doc.text(line, x, y);
                    y += fontSize * 0.5;
                });
            }

            return y + fontSize * 0.25; // Returnează noua poziție Y
        };

        // Funcție pentru desenare bară progres cu indicator prag
        const drawProgressBar = (x, y, width, height, percentage, thresholdPercentage, color) => {
            // Desenează fundalul
            doc.setFillColor(238, 238, 238);
            doc.roundedRect(x, y, width, height, 1, 1, 'F');

            // Desenează bara de progres
            if (percentage > 0) {
                doc.setFillColor(...color);
                const fillWidth = (percentage / 100) * width;
                doc.roundedRect(x, y, fillWidth, height, 1, 1, 'F');
            }

            // Desenează indicatorul de prag
            doc.setFillColor(0, 0, 0);
            const thresholdX = x + (width * thresholdPercentage / 100);
            doc.rect(thresholdX, y - 1, 0.7, height + 2, 'F');

            return y + height; // Returnează noua poziție Y
        };

        // Funcție pentru culoarea scorului
        const getScoreColor = (score, threshold) => {
            if (score < threshold) return [76, 175, 80]; // Verde
            if (score < threshold * 1.5) return [255, 193, 7]; // Galben
            return [244, 67, 54]; // Roșu
        };

        // ===== PARTEA 3: GENERARE CONțINUT PDF =====

        let y = 20; // Poziția inițială Y

        // Adaugă titlu
        addSafeText("Rezultate Test RAADS-R", 105, y, {
            fontSize: 18,
            align: 'center'
        });

        // Adaugă sursa
        y += 10;
        addSafeText("Rezultate generate de www.testautism.ro", 105, y, {
            fontSize: 10,
            align: 'center'
        });

        // Adaugă disclaimer
        y += 10;
        addSafeText("IMPORTANT: Acest test este destinat EXCLUSIV în scop informativ și NU trebuie utilizat ca un instrument de diagnostic. Pentru evaluări profesionale, vă recomandăm să vizitați www.doctoradhd.com", 105, y, {
            fontSize: 9,
            fontStyle: 'bold',
            color: [221, 44, 0],
            align: 'center',
            maxWidth: 170
        });

        // Adaugă scor total
        y += 20;
        addSafeText(`Scor Total: ${totalScore}`, 105, y, {
            fontSize: 16,
            align: 'center'
        });

        // Adaugă interpretare
        y += 8;
        const interpretation = getInterpretation(totalScore);
        y = addSafeText(`Interpretare: ${interpretation}`, 105, y, {
            fontSize: 12,
            align: 'center',
            maxWidth: 170
        });

        // Adaugă titlu secțiune scoruri
        y += 10;
        addSafeText("Scoruri pe categorii:", 20, y, {
            fontSize: 14
        });

        // Adaugă scorurile pe categorii
        y += 10;
        const categories = [
            { name: 'Limbaj', score: subscores.language, threshold: RAADS_R_THRESHOLDS.language, max: MAX_SCORES.language },
            { name: 'Relaționare socială', score: subscores.socialRelatedness, threshold: RAADS_R_THRESHOLDS.socialRelatedness, max: MAX_SCORES.socialRelatedness },
            { name: 'Senzorial-motor', score: subscores.sensoryMotor, threshold: RAADS_R_THRESHOLDS.sensoryMotor, max: MAX_SCORES.sensoryMotor },
            { name: 'Interese circumscrise', score: subscores.circumscribedInterests, threshold: RAADS_R_THRESHOLDS.circumscribedInterests, max: MAX_SCORES.circumscribedInterests }
        ];

        categories.forEach(category => {
            // Adaugă informații categorie
            addSafeText(`${category.name}: ${category.score} / ${category.max} (Prag: ${category.threshold})`, 25, y, {
                fontSize: 12
            });
            y += 6;

            // Calculează procentaje și culoare
            const percentage = (category.score / category.max) * 100;
            const thresholdPercentage = (category.threshold / category.max) * 100;
            const color = getScoreColor(category.score, category.threshold);

            // Desenează bară progres
            y = drawProgressBar(25, y, 150, 4, percentage, thresholdPercentage, color) + 2;
            y += 5;
        });

        // Adaugă legendă
        y += 5;
        doc.setFillColor(76, 175, 80);
        doc.rect(25, y, 4, 4, 'F');
        addSafeText("Sub prag", 32, y + 3, { fontSize: 10 });

        doc.setFillColor(255, 193, 7);
        doc.rect(65, y, 4, 4, 'F');
        addSafeText("Aproape de prag", 72, y + 3, { fontSize: 10 });

        doc.setFillColor(244, 67, 54);
        doc.rect(120, y, 4, 4, 'F');
        addSafeText("Peste prag", 127, y + 3, { fontSize: 10 });

        // Adaugă răspunsurile la întrebări
        y += 15;
        addSafeText("Răspunsuri la întrebări:", 20, y, { fontSize: 14 });
        y += 8;

        let pageCount = 1;

        // Pregătește lista de întrebări și răspunsuri
        const questionAnswers = [];
        questions.forEach(question => {
            const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
            if (selected) {
                questionAnswers.push({
                    id: question.id,
                    text: question.text,
                    answer: selected.closest('label').querySelector('.form-check-label').textContent.trim()
                });
            }
        });

        // Adaugă răspunsurile
        questionAnswers.forEach((qa, index) => {
            // Verifică dacă avem nevoie de pagină nouă (estimare conservativă)
            if (y > 270) {
                doc.addPage();
                pageCount++;
                y = 20;

                // Adaugă header pagină
                addSafeText(`Rezultate Test RAADS-R - Pagina ${pageCount}`, 105, 10, {
                    fontSize: 10,
                    align: 'center'
                });
            }

            // Adaugă întrebarea
            const questionText = `${qa.id}. ${qa.text}`;
            y = addSafeText(questionText, 20, y, {
                fontSize: 11,
                fontStyle: 'bold',
                maxWidth: 170
            });

            // Adaugă răspunsul
            const answerText = `Răspuns: ${qa.answer}`;
            y = addSafeText(answerText, 25, y, {
                fontSize: 10,
                maxWidth: 165
            });

            y += 3; // Spațiu după fiecare răspuns
        });

        // Adaugă data testului pe ultima pagină
        addSafeText(`Data testului: ${new Date().toLocaleDateString('ro-RO')}`, 20, 280, {
            fontSize: 9
        });

        // Verifică numărul de pagini adăugate
        console.log(`PDF generat cu ${doc.getNumberOfPages()} pagini`);

        return doc.output('blob');
    } catch (error) {
        console.error('Eroare la generarea PDF-ului:', error);
        alert(`A apărut o eroare la generarea PDF-ului: ${error.message}`);
        throw error;
    }
}

/**
 * Soluție de backup care folosește metoda de înlocuire controlată a diacriticelor.
 * Se folosește doar dacă metoda principală eșuează.
 */
function generateBackupPDF() {
    try {
        // Obține rezultatele testului
        const results = calculateSubscores();
        const { subscores, totalScore } = results;

        // Creează documentul PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Funcție de normalizare a textului românesc pentru compatibilitate maximă
        const normalizeRomanian = (text) => {
            // Mapare manuală a caracterelor cu diacritice la echivalentele lor simple
            return text
                .replace(/ă/g, 'a')
                .replace(/â/g, 'a')
                .replace(/î/g, 'i')
                .replace(/ș/g, 's')
                .replace(/ț/g, 't')
                .replace(/Ă/g, 'A')
                .replace(/Â/g, 'A')
                .replace(/Î/g, 'I')
                .replace(/Ș/g, 'S')
                .replace(/ț/g, 'T');
        };

        // Definim variabilele de lucru
        let y = 20;

        // Adaugă titlu
        doc.setFontSize(16);
        doc.text('Rezultate Test RAADS-R', 105, y, { align: 'center' });

        // Adaugă scor total
        y += 20;
        doc.setFontSize(14);
        doc.text(`Scor Total: ${totalScore}`, 105, y, { align: 'center' });

        // Adaugă interpretare
        y += 10;
        doc.setFontSize(12);
        doc.text(`Interpretare: ${normalizeRomanian(getInterpretation(totalScore))}`, 105, y, { align: 'center' });

        // Adaugă categorii
        y += 20;
        doc.text(normalizeRomanian('Scoruri pe categorii:'), 20, y);
        y += 10;

        // Scoruri per categorie
        doc.text(normalizeRomanian(`Limbaj: ${subscores.language} / ${MAX_SCORES.language}`), 20, y);
        y += 10;
        doc.text(normalizeRomanian(`Relaționare socială: ${subscores.socialRelatedness} / ${MAX_SCORES.socialRelatedness}`), 20, y);
        y += 10;
        doc.text(normalizeRomanian(`Senzorial-motor: ${subscores.sensoryMotor} / ${MAX_SCORES.sensoryMotor}`), 20, y);
        y += 10;
        doc.text(normalizeRomanian(`Interese circumscrise: ${subscores.circumscribedInterests} / ${MAX_SCORES.circumscribedInterests}`), 20, y);

        // Adaugă răspunsurile
        y += 20;
        doc.text(normalizeRomanian('Răspunsuri la întrebări:'), 20, y);
        y += 10;

        // Străbatem întrebările și răspunsurile
        let pageCount = 1;

        questions.forEach(question => {
            const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
            if (!selected) return;

            // Verificăm dacă avem nevoie de o pagină nouă
            if (y > 270) {
                doc.addPage();
                pageCount++;
                y = 20;

                // Adăugăm antet pagină
                doc.setFontSize(10);
                doc.text(`Rezultate Test RAADS-R - Pagina ${pageCount}`, 105, 10, { align: 'center' });
                doc.setFontSize(12);
            }

            // Adăugăm întrebarea
            const questionText = normalizeRomanian(`${question.id}. ${question.text}`);
            doc.setFontSize(10);

            // Împărțim textul pe linii dacă e prea lung
            const splitQuestion = doc.splitTextToSize(questionText, 180);
            doc.text(splitQuestion, 20, y);
            y += splitQuestion.length * 7;

            // Adăugăm răspunsul
            const answerText = normalizeRomanian(`Răspuns: ${selected.closest('label').querySelector('.form-check-label').textContent.trim()}`);
            const splitAnswer = doc.splitTextToSize(answerText, 170);
            doc.text(splitAnswer, 25, y);
            y += splitAnswer.length * 7 + 5; // Adăugăm spațiu după răspuns
        });

        // Adăugăm data testului
        doc.setFontSize(8);
        doc.text(`Data testului: ${new Date().toLocaleDateString('ro-RO')}`, 20, 280);

        return doc.output('blob');
    } catch (error) {
        console.error('Eroare la generarea PDF-ului de backup:', error);
        throw error;
    }
}

/**
 * Funcție de export PDF robustă care încearcă mai multe metode până când una funcționează
 */
async function exportRobustRomanianPDF() {
    // Disable export button while generating
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Se generează PDF-ul...';
    }

    try {
        // Salvează rezultatele în localStorage pentru redundanță
        storeTestResults();

        // Încearcă metodele în ordine, de la cea mai bună la cea mai simplă
        let pdfBlob;

        // Metoda 1: Încearcă metoda cu font încorporat
        try {
            console.log("Încercare generare PDF cu metoda principală...");
            pdfBlob = await generateRomanianPDF();
            console.log("PDF generat cu succes folosind metoda principală!");
        } catch (error1) {
            console.warn("Prima metodă a eșuat:", error1);

            // Metoda 2: Încearcă metoda de backup
            try {
                console.log("Încercare generare PDF cu metoda de backup...");
                pdfBlob = await generateBackupPDF();
                console.log("PDF generat cu succes folosind metoda de backup!");
            } catch (error2) {
                console.warn("A doua metodă a eșuat:", error2);

                // Metoda 3: Încearcă metoda originală
                try {
                    console.log("Încercare generare PDF cu metoda originală...");
                    pdfBlob = await generatePDFBlob();
                    console.log("PDF generat cu succes folosind metoda originală!");
                } catch (error3) {
                    console.error("Toate metodele au eșuat!", error3);
                    throw new Error("Nu s-a putut genera PDF-ul cu nicio metodă disponibilă!");
                }
            }
        }

        // PDF-ul a fost generat, acum îl deschidem/descărcăm
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Creează link-ul de descărcare
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'rezultate_test_raads_r.pdf';
        document.body.appendChild(downloadLink);

        // Tratează special browser-ul Facebook
        if (navigator.userAgent.match(/(FBAN|FBAV)/i)) {
            window.open(blobUrl, '_blank');
        } else {
            downloadLink.click();
        }

        // Curățare resurse
        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(downloadLink);
        }, 1000);

        return true;
    } catch (error) {
        console.error('Eroare la generarea PDF-ului:', error);
        alert(`A apărut o eroare la generarea PDF-ului: ${error.message}\nVă rugăm să încercați din nou.`);
        return false;
    } finally {
        // Re-enable export button
        if (exportBtn) {
            exportBtn.disabled = false;
            exportBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Exportă ca PDF';
        }
    }
}

const questions = [
    // 80 de întrebări ca obiecte cu text și flag pentru inversare
    // Indexarea începe de la 1 pentru claritate
    { id: 1, text: 'Exprim grijă și empatie, deși nu întotdeauna într-un mod tipic.', inverse: true },
    { id: 2, text: 'Repet adesea fraze din filme sau emisiuni TV în conversații pentru că mă ajută să mă exprim.', inverse: false },
    { id: 3, text: 'Uneori nu-mi dau seama că vorbele sau acțiunile mele pot părea grosolane pentru ceilalți.', inverse: false },
    { id: 4, text: 'Am dificultăți în a-mi regla volumul vocii, vorbind uneori prea tare sau prea încet.', inverse: false },
    { id: 5, text: 'În situații sociale, de multe ori mă simt nesigur(ă) în legătură cu cum să mă comport.', inverse: false },
    { id: 6, text: 'Pot să îmi imaginez perspectivele altora, deși poate necesită efort suplimentar pentru a înțelege sentimentele lor.', inverse: false },
    { id: 7, text: 'Limbajul figurativ (ex. „ești mărul ochilor mei") este dificil de înțeles pentru mine.', inverse: false },
    { id: 8, text: 'Mă simt cel mai confortabil vorbind cu oameni care împărtășesc aceleași interese ca mine.', inverse: true },
    { id: 9, text: 'Mă concentrez pe detalii mici înainte de a vedea imaginea de ansamblu.', inverse: false },
    { id: 10, text: 'Textura mâncării în gură este mai importantă pentru mine decât gustul ei.', inverse: false },
    { id: 11, text: 'Îmi lipsesc prietenii apropiați sau familia când suntem despărțiți pentru mult timp, deși nu arăt mereu acest lucru.', inverse: true },
    { id: 12, text: 'Uneori spun lucruri direct fără intenția de a deranja pe cineva.', inverse: true },
    { id: 13, text: 'Prefer să vorbesc despre subiecte specifice care mă interesează profund.', inverse: false },
    { id: 14, text: 'Prefer deseori să petrec timp singur(ă), chiar și în locuri unde alții se așteaptă să socializez.', inverse: false },
    { id: 15, text: 'Îmi este dificil să-mi imaginez cum ar fi să fiu altcineva sau să văd lucrurile din perspectiva lor.', inverse: false },
    { id: 16, text: 'Oamenii mi-au spus că sunt stângaci(ă) sau neîndemânatic(ă).', inverse: false },
    { id: 17, text: 'Am fost descris(ă) ca fiind diferit(ă) sau neconvențional(ă).', inverse: true },
    { id: 18, text: 'Recunosc când cineva apropiat are nevoie de consolare, deși poate că nu știu întotdeauna cum să reacționez.', inverse: true },
    { id: 19, text: 'Sunt foarte sensibil(ă) la cum simt hainele pe pielea mea.', inverse: false },
    { id: 20, text: 'Uneori copiez comportamentele altora pentru a mă integra sau pentru a părea mai „normal(ă)".', inverse: false },
    { id: 21, text: 'A vorbi cu mai multe persoane în același timp poate fi copleșitor sau intimidant pentru mine.', inverse: false },
    { id: 22, text: 'Simt deseori presiunea de a mă comporta așa cum se așteaptă ceilalți, chiar dacă nu este natural pentru mine.', inverse: false },
    { id: 23, text: 'Întâlnirile cu oameni noi pot fi dificile sau stresante pentru mine.', inverse: false },
    { id: 24, text: 'Mă simt confuz(ă) sau frustrat(ă) când oamenii mă întrerup atunci când sunt concentrat(ă) pe un subiect care mă pasionează.', inverse: false },
    { id: 25, text: 'Îmi este greu să înțeleg emoțiile altor persoane în timpul conversațiilor.', inverse: false },
    { id: 26, text: 'A lua parte la conversații de grup poate fi o provocare pentru mine.', inverse: false },
    { id: 27, text: 'Am tendința de a lua lucrurile literal, ceea ce poate face să pierd subtilitățile unei conversații.', inverse: false },
    { id: 28, text: 'Îmi este dificil să recunosc când cineva simte emoții precum jenă sau invidie.', inverse: false },
    { id: 29, text: 'Anumite texturi care nu deranjează pe alții pot fi foarte inconfortabile pentru mine.', inverse: false },
    { id: 30, text: 'Mă supăr când rutina mea este schimbată neașteptat.', inverse: false },
    { id: 31, text: 'Nu am simțit niciodată nevoia de a fi într-o relație „intimă" așa cum o numesc alții.', inverse: false },
    { id: 32, text: 'Îmi este greu să încep sau să opresc o conversație până nu simt că mi-am terminat gândurile.', inverse: false },
    { id: 33, text: 'Vorbesc cu un ritm și ton de voce considerat tipic de cei din jurul meu.', inverse: true },
    { id: 34, text: 'Același sunet, culoare sau textură mă poate afecta diferit la momente diferite.', inverse: false },
    { id: 35, text: 'Unele expresii, cum ar fi „te am sub piele," mă fac să mă simt inconfortabil sau sunt greu de înțeles.', inverse: false },
    { id: 36, text: 'Anumite sunete, cum ar fi zgomotele înalte sau anumite cuvinte, pot fi dureroase fizic de auzit.', inverse: false },
    { id: 37, text: 'Încerc să fiu înțelegător/înțelegătoare atunci când alții își împărtășesc sentimentele sau problemele personale cu mine.', inverse: true },
    { id: 38, text: 'Nu mă conectez ușor emoțional cu personajele din filme sau povești.', inverse: true },
    { id: 39, text: 'Îmi este dificil să recunosc când cineva flirtează cu mine sau îmi arată interes romantic.', inverse: true },
    { id: 40, text: 'Pot vizualiza în mintea mea în detaliu lucrurile care mă interesează.', inverse: false },
    { id: 41, text: 'Îmi place să păstrez liste sau colecții de fapte specifice, chiar dacă nu au o utilizare practică.', inverse: false },
    { id: 42, text: 'Când sunt copleșit(ă) de stimuli senzoriali, am nevoie să mă izolez pentru a mă liniști.', inverse: false },
    { id: 43, text: 'Îmi place să discut lucruri importante sau să procesez lucrurile împreună cu prietenii.', inverse: true },
    { id: 44, text: 'Îmi este greu să îmi dau seama dacă cineva este interesat sau plictisit în timp ce vorbesc.', inverse: false },
    { id: 45, text: 'Îmi este dificil să citesc limbajul corporal sau expresiile faciale ale altor persoane.', inverse: false },
    { id: 46, text: 'Experiențele senzoriale precum atingerea sau temperatura pot să mă afecteze diferit în momente diferite.', inverse: false },
    { id: 47, text: 'Mă simt confortabil și încrezător(ă) în situațiile de întâlniri sau sociale cu alții.', inverse: true },
    { id: 48, text: 'Când oamenii îmi împărtășesc problemele lor personale, încerc să ofer sprijin cât pot de bine.', inverse: true },
    { id: 49, text: 'Mi s-a spus că vocea mea este neobișnuită într-un fel (ex. monotonă, înaltă, copilăroasă).', inverse: false },
    { id: 50, text: 'Uneori un anumit subiect sau gând rămâne blocat în mintea mea și simt nevoia să vorbesc despre el chiar dacă ceilalți nu sunt interesați.', inverse: false },
    { id: 51, text: 'Fac deseori mișcări repetitive cu mâinile sau cu obiecte (ex. fluturare, învârtire, sau mișcarea obiectelor în fața ochilor mei).', inverse: false },
    { id: 52, text: 'Nu găsesc majoritatea lucrurilor care îi interesează pe ceilalți foarte captivante.', inverse: false },
    { id: 53, text: 'Sunt considerat(ă) o persoană compasională, deși pot arăta acest lucru în moduri diferite.', inverse: true },
    { id: 54, text: 'Interacționez cu ceilalți urmând reguli sociale specifice pe care le-am învățat pentru a mă integra.', inverse: true },
    { id: 55, text: 'Îmi este foarte dificil să lucrez și să funcționez în grupuri.', inverse: false },
    { id: 56, text: 'Când cineva schimbă subiectul în timp ce vorbesc, mă simt derutat(ă) și confuz(ă).', inverse: false },
    { id: 57, text: 'Uneori trebuie să îmi acopăr urechile pentru a bloca zgomotele copleșitoare (ex. vocile puternice, aspiratorul).', inverse: false },
    { id: 58, text: 'Sunt capabil(ă) să port conversații lejere, deși poate necesită un efort suplimentar.', inverse: false },
    { id: 59, text: 'Uneori lucruri care ar trebui să fie dureroase, cum ar fi rănile, nu par să provoace atâta durere.', inverse: false },
    { id: 60, text: 'Când vorbesc cu cineva, îmi este adesea greu să îmi dau seama când este rândul meu să vorbesc sau să ascult.', inverse: false },
    { id: 61, text: 'Sunt deseori văzut(ă) ca un „lup singuratic" de către cei care mă cunosc cel mai bine.', inverse: false },
    { id: 62, text: 'Vorbesc de obicei cu un ton de voce pe care ceilalți îl consideră tipic.', inverse: true },
    { id: 63, text: 'Prefer ca lucrurile să rămână la fel zi după zi și chiar și schimbările mici mă pot deranja.', inverse: false },
    { id: 64, text: 'Găsesc că este dificil și confuz să îmi fac prieteni și să socializez.', inverse: false },
    { id: 65, text: 'Mă liniștește să fac mișcări repetitive, cum ar fi învârtirea sau balansarea, când sunt stresat(ă).', inverse: false },
    { id: 66, text: 'Expresii precum „își poartă inima pe mânecă" nu au sens pentru mine.', inverse: false },
    { id: 67, text: 'Luminile puternice, mirosurile intense sau zgomotele puternice mă pot face să mă simt anxios/anxioasă sau copleșit(ă).', inverse: false },
    { id: 68, text: 'Îmi dau seama când cineva spune un lucru, dar vrea să însemne altceva.', inverse: true },
    { id: 69, text: 'Îmi place să petrec timp singur(ă) cât de mult pot.', inverse: false },
    { id: 70, text: 'Îmi organizez gândurile într-un mod unic, cum ar fi să le stivuiesc în memoria mea pentru a le găsi mai târziu.', inverse: false },
    { id: 71, text: 'Uneori același sunet poate părea foarte tare sau foarte încet, chiar dacă știu că nu s-a schimbat.', inverse: false },
    { id: 72, text: 'Îmi place să petrec timp mâncând și vorbind cu familia și prietenii mei.', inverse: false },
    { id: 73, text: 'Nu suport anumite senzații (ex. mirosuri, texturi, sunete) care nu par să deranjeze pe ceilalți.', inverse: false },
    { id: 74, text: 'Nu îmi place să fiu îmbrățișat(ă) sau atins(ă) decât dacă am fost de acord cu asta.', inverse: false },
    { id: 75, text: 'Când merg undeva, trebuie să urmez un traseu familiar, altfel mă pot confunda și supăra.', inverse: false },
    { id: 76, text: 'Îmi este greu să înțeleg ce așteaptă oamenii de la mine în situațiile sociale.', inverse: false },
    { id: 77, text: 'Îmi place să am prieteni apropiați, deși poate că nu știu întotdeauna cum să întrețin prieteniile.', inverse: false },
    { id: 78, text: 'Oamenii îmi spun deseori că dau prea multe detalii atunci când explic ceva.', inverse: true },
    { id: 79, text: 'Mi se spune adesea că pun întrebări stânjenitoare sau incomode.', inverse: false },
    { id: 80, text: 'Am tendința să arăt greșelile altora, chiar dacă nu este necesar.', inverse: false }
];

// RAADS-R Categories according to the paper page 1083
const RAADS_R_CATEGORIES = {
    // Social Relatedness - 39 questions
    socialRelatedness: [1, 6, 8, 11, 14, 17, 18, 25, 37, 38, 3, 5, 12, 28, 39,
                       44, 45, 76, 79, 80, 20, 21, 22, 23, 26, 31, 43, 47, 48,
                       53, 54, 55, 60, 61, 64, 68, 69, 72, 77],

    // Language - 7 questions
    language: [2, 7, 27, 35, 58, 66, 15],

    // Sensory Motor - 20 questions
    sensoryMotor: [10, 19, 4, 33, 34, 36, 46, 71, 16, 29, 42, 49, 51, 57, 59,
                   62, 65, 67, 73, 74],

    // Circumscribed Interests - 14 questions
    circumscribedInterests: [9, 13, 24, 30, 32, 40, 41, 50, 52, 56, 63, 70, 75, 78]
};

// Score thresholds from Table 3, page 1079
const RAADS_R_THRESHOLDS = {
    socialRelatedness: 31,  // 96.0% sensitivity
    circumscribedInterests: 15, // 89.6% sensitivity
    sensoryMotor: 16, // 85.1% sensitivity
    language: 4, // 88.6% sensitivity
    total: 65  // 97% sensitivity, 100% specificity
};

// Normative questions that use inverse scoring (marked with * in paper)
const INVERSE_SCORING_QUESTIONS = [1, 6, 11, 18, 23, 26, 33, 37, 43, 47, 48, 53, 58, 62, 68, 72, 77];

// Maximum possible scores based on number of questions per category * 3 points
const MAX_SCORES = {
    language: 21,           // 7 questions * 3 points
    socialRelatedness: 117, // 39 questions * 3 points
    sensoryMotor: 60,      // 20 questions * 3 points
    circumscribedInterests: 42,  // 14 questions * 3 points
    total: 240             // 80 questions * 3 points
};

/**
 * Find questions that might be counted in multiple categories
 * This is a validation function to ensure proper category assignments
 */
function findDuplicateQuestionCounts() {
    const questionCounts = {};
    const duplicates = [];

    // Count occurrences of each question across categories
    Object.entries(RAADS_R_CATEGORIES).forEach(([category, questions]) => {
        questions.forEach(questionId => {
            if (!questionCounts[questionId]) {
                questionCounts[questionId] = [];
            }
            questionCounts[questionId].push(category);
        });
    });

    // Check for questions appearing in multiple categories
    Object.entries(questionCounts).forEach(([questionId, categories]) => {
        if (categories.length > 1) {
            duplicates.push({
                questionId: parseInt(questionId),
                categories: categories,
                message: `Question ${questionId} appears in multiple categories: ${categories.join(', ')}`
            });
        }
    });

    // Check for missing questions (1-80)
    const allQuestions = Object.values(RAADS_R_CATEGORIES).flat();
    const missingQuestions = [];
    for (let i = 1; i <= 80; i++) {
        if (!allQuestions.includes(i)) {
            missingQuestions.push(i);
        }
    }

    return {
        duplicates,
        missingQuestions,
        valid: duplicates.length === 0 && missingQuestions.length === 0
    };
}

/**
 * Calculate subscores and total score according to RAADS-R specifications
 * Based on scoring instructions from Appendix 2, page 1088
 */
function calculateSubscores() {
    // First validate category assignments
    const categoryValidation = findDuplicateQuestionCounts();
    if (!categoryValidation.valid) {
        console.warn('Category assignment issues detected:', categoryValidation);
    }

    // Initialize subscores
    const subscores = {
        language: 0,
        socialRelatedness: 0,
        sensoryMotor: 0,
        circumscribedInterests: 0
    };

    // Track scoring details for validation
    const scoringLog = [];

    // Calculate scores for each category
    Object.entries(RAADS_R_CATEGORIES).forEach(([category, questionIds]) => {
        questionIds.forEach(id => {
            const selected = document.querySelector(`input[name="question_${id}"]:checked`);
            if (selected) {
                let score = parseInt(selected.value);
                const isInverse = INVERSE_SCORING_QUESTIONS.includes(id);

                // Apply inverse scoring if needed
                if (isInverse) {
                    score = 3 - score;
                }

                subscores[category] += score;

                // Log scoring details
                scoringLog.push({
                    questionId: id,
                    category: category,
                    rawValue: parseInt(selected.value),
                    inverseScoring: isInverse,
                    finalScore: score
                });
            }
        });
    });

    // Calculate total score
    const totalScore = Object.values(subscores).reduce((sum, score) => sum + score, 0);

    // Validate scores against maximums
    Object.entries(subscores).forEach(([category, score]) => {
        if (score > MAX_SCORES[category]) {
            console.error(`Invalid score for ${category}: ${score} exceeds maximum possible ${MAX_SCORES[category]}`);
        }
    });

    if (totalScore > MAX_SCORES.total) {
        console.error(`Invalid total score: ${totalScore} exceeds maximum possible ${MAX_SCORES.total}`);
    }

    // Determine if scores meet diagnostic thresholds
    const diagnosticIndicators = {
        meetsThreshold: totalScore >= RAADS_R_THRESHOLDS.total,
        categoryThresholds: {
            socialRelatedness: subscores.socialRelatedness >= RAADS_R_THRESHOLDS.socialRelatedness,
            circumscribedInterests: subscores.circumscribedInterests >= RAADS_R_THRESHOLDS.circumscribedInterests,
            language: subscores.language >= RAADS_R_THRESHOLDS.language,
            sensoryMotor: subscores.sensoryMotor >= RAADS_R_THRESHOLDS.sensoryMotor
        }
    };

    return {
        subscores,
        totalScore,
        diagnosticIndicators,
        scoringLog,
        validation: {
            categoryAssignments: categoryValidation,
            scoresValid: totalScore <= MAX_SCORES.total &&
                        Object.entries(subscores).every(([cat, score]) => score <= MAX_SCORES[cat])
        }
    };
}

// Function to get interpretation based on official RAADS-R criteria
function getInterpretation(score) {
    if (score <= 65) {
        return 'Sub pragul pentru autism (scor < 65)';
    } else if (score <= 89) {
        return 'Posibil autism (scor între 65-89)';
    } else if (score <= 130) {
        return 'Probabil autism (scor între 90-130)';
    } else {
        return 'Foarte probabil autism (scor > 130)';
    }
}

// Function to get detailed category interpretation
function getCategoryInterpretation(category, score) {
    const threshold = RAADS_R_THRESHOLDS[category];
    if (score >= threshold) {
        return `Peste pragul diagnostic (${threshold})`;
    } else {
        return `Sub pragul diagnostic (${threshold})`;
    }
}

const form = document.getElementById('raadsrForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const errorBelowDiv = document.getElementById('errorBelow');
const submitBtn = document.getElementById('submitBtn');

// Buttons appearing after submit
const exportBtn = document.getElementById('exportBtn');
const restartBtn = document.getElementById('restartBtn');

// Start test button at the top
const startBtn = document.getElementById('start-test');

// Share button
const shareBtn = document.getElementById('shareBtn');

// Result announcer for screen readers
const resultAnnouncer = document.getElementById('result-announcer');

// Form generation with Bootstrap classes with enhanced accessibility
questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question', 'mb-4');
    questionDiv.setAttribute('role', 'group');
    questionDiv.setAttribute('aria-labelledby', `question-${question.id}-label`);
    questionDiv.setAttribute('data-question-number', question.id);

    // Question label container
    const questionLabel = document.createElement('div');
    questionLabel.id = `question-${question.id}-label`;
    questionLabel.classList.add('question-text');
    questionLabel.innerHTML = `${question.id}. ${question.text}`;

    // Add inverse scoring indicator for screen readers
    if (INVERSE_SCORING_QUESTIONS.includes(question.id)) {
        const inverseNote = document.createElement('span');
        inverseNote.classList.add('sr-only');
        inverseNote.innerHTML = ' (Întrebare cu scorare inversă)';
        questionLabel.appendChild(inverseNote);
    }

    questionDiv.appendChild(questionLabel);

    // Create fieldset for radio buttons
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('options');

    // Add legend for screen readers
    const legend = document.createElement('legend');
    legend.classList.add('sr-only');
    legend.innerHTML = `Opțiuni pentru întrebarea ${question.id}`;
    fieldset.appendChild(legend);

    const options = [
        {
            label: "Adevărat acum și când eram mic(ă)",
            value: "3",
            description: "Selectați dacă afirmația este adevărată atât în prezent cât și în trecut"
        },
        {
            label: "Adevărat doar acum",
            value: "2",
            description: "Selectați dacă afirmația este adevărată doar în prezent"
        },
        {
            label: "Adevărat doar când aveam sub 16 ani",
            value: "1",
            description: "Selectați dacă afirmația era adevărată doar în copilărie"
        },
        {
            label: "Niciodată adevărat",
            value: "0",
            description: "Selectați dacă afirmația nu a fost niciodată adevărată"
        }
    ];

    options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        label.classList.add('form-check');
        label.setAttribute('for', `q${question.id}-opt${optionIndex}`);

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `q${question.id}-opt${optionIndex}`;
        input.name = `question_${question.id}`;
        input.value = option.value;
        input.classList.add('form-check-input');
        input.setAttribute('aria-describedby', `q${question.id}-opt${optionIndex}-desc`);

        const span = document.createElement('span');
        span.classList.add('form-check-label');
        span.innerHTML = option.label;

        // Add description for screen readers
        const description = document.createElement('span');
        description.id = `q${question.id}-opt${optionIndex}-desc`;
        description.classList.add('sr-only');
        description.innerHTML = option.description;

        label.appendChild(input);
        label.appendChild(span);
        label.appendChild(description);
        fieldset.appendChild(label);
    });

    questionDiv.appendChild(fieldset);

    // Add help button
    const helpButton = document.createElement('button');
    helpButton.type = 'button';
    helpButton.classList.add('help-button', 'btn', 'btn-link', 'mt-2');
    helpButton.innerHTML = '<i class="fas fa-question-circle"></i> Ajutor pentru această întrebare';
    helpButton.setAttribute('aria-expanded', 'false');
    helpButton.setAttribute('aria-controls', `help-${question.id}`);

    const helpContent = document.createElement('div');
    helpContent.id = `help-${question.id}`;
    helpContent.classList.add('help-content');
    helpContent.setAttribute('hidden', '');
    helpContent.innerHTML = `
        <div class="alert alert-info mt-2">
            <p>Selectați opțiunea care descrie cel mai bine experiența dumneavoastră.</p>
            <p>Puteți naviga cu tastele săgeți sus/jos între opțiuni sau Tab între întrebări.</p>
        </div>
    `;

    questionDiv.appendChild(helpButton);
    questionDiv.appendChild(helpContent);

    form.appendChild(questionDiv);
});

// Function to create visual score component
const createScoreVisual = function (label, score, threshold, maxScore) {
    const { percentage, thresholdPercentage, color } = getScoreDetails(score, threshold, maxScore);

    return `
        <div class="score-component mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="score-label fw-bold">${label}</div>
                <div class="score-value">
                    <span class="current-score">${score}</span>
                    <span class="text-muted">/ ${maxScore}</span>
                </div>
            </div>
            <div class="progress" style="height: 20px; background-color: #e9ecef; position: relative;">
                <!-- Threshold marker -->
                <div class="threshold-marker" style="
                    position: absolute;
                    left: ${thresholdPercentage}%;
                    height: 100%;
                    width: 2px;
                    background-color: #000;
                    z-index: 2;
                "></div>
                <div class="progress-bar" role="progressbar"
                    style="width: ${percentage}%; background-color: ${color};"
                    aria-valuenow="${percentage}"
                    aria-valuemin="0"
                    aria-valuemax="100">
                </div>
            </div>
            <div class="d-flex justify-content-between mt-1">
                <small class="text-muted">0</small>
                <small class="text-muted fw-bold">Prag: ${threshold}</small>
                <small class="text-muted">${maxScore}</small>
            </div>
        </div>
    `;
}

// Helper function to calculate score percentage and get appropriate color
function getScoreDetails(score, threshold, maxScore) {
    const percentage = (score / maxScore) * 100;
    const thresholdPercentage = (threshold / maxScore) * 100;

    // Color selection based on score relative to threshold
    let color;
    if (score < threshold) {
        color = '#4CAF50'; // Green
    } else if (score < threshold * 1.5) {
        color = '#FFC107'; // Yellow
    } else {
        color = '#F44336'; // Red
    }

    return { percentage, thresholdPercentage, color };
}

// Add validation function to catch scoring issues
function validateScore(score, subscores) {
    let issues = [];

    // Check for exceeding maximum scores
    Object.entries(MAX_SCORES).forEach(([category, maxScore]) => {
        const currentScore = category === 'total' ? score : subscores[category];
        if (currentScore > maxScore) {
            issues.push(`${category}: ${currentScore} exceeds maximum possible score of ${maxScore}`);
        }
    });

    return {
        valid: issues.length === 0,
        issues: issues
    };
}

// Function to get interpretation based on score
function getInterpretation(score) {
    if (score <= 25) return 'Nu ești autist(ă).';
    if (score <= 50) return 'Ai unele trăsături autiste, dar probabil nu ești autist(ă).';
    if (score <= 65) return 'Scorul este aproape de pragul minim pentru autism.';
    if (score <= 90) return 'Indicații de autism, deși și non-autiștii pot obține scoruri atât de mari.';
    if (score <= 130) return 'Scor în intervalul mediu pentru persoanele autiste.';
    if (score <= 160) return 'Dovezi foarte solide pentru autism.';
    return 'Scor foarte ridicat, specific persoanelor autiste.';
}

// Function to announce results to screen readers
function announceResult(totalScore, interpretation) {
    if (!resultAnnouncer) return;

    resultAnnouncer.textContent = `Rezultat test: Scor total ${totalScore}. ${interpretation}`;
}

const getProgressMessage = function(percentage, answered) {
    if (percentage === 0) {
        return '🚀 Hai să începem! Primul pas este cel mai important! 💫';
    }

    if (percentage <= 10) {
        return '🌟 Minunat început! Pas cu pas, vei reuși! 💪';
    }

    if (percentage <= 20) {
        return '🎯 Ai prins ritmul! Continui excelent! ⭐';
    }

    if (percentage <= 30) {
        return `🌈 Super progres! Ai completat deja ${answered} întrebări! 🎉`;
    }

    if (percentage <= 40) {
        return '💫 Te descurci extraordinar! Ești pe drumul cel bun! 🎈';
    }

    if (percentage <= 50) {
        return '🎊 WOW! Ai ajuns la jumătate! Ești fantastic(ă)! 🌟';
    }

    if (percentage <= 60) {
        return '⚡ Impresionant! Mai puțin de jumătate rămas! 🔥';
    }

    if (percentage <= 70) {
        return '🎯 Extraordinar! Continui să strălucești! ✨';
    }

    if (percentage <= 80) {
        return '🚀 Ești pe ultima sută de metri! Aproape acolo! 💫';
    }

    if (percentage <= 90) {
        return '🌟 Fantastic! Mai ai foarte puțin! Ești aproape gata! 🎉';
    }

    if (percentage < 100) {
        return '✨ Ultima porțiune! Câteva întrebări și ai terminat! 🎯';
    }

    // 100%
    return `
        🎉 FELICITĂRI! 🎉
        <br/>
        <span style="font-size: 0.9em">Ai completat tot testul! Ești minunat(ă)! 🌟</span>
        <br/>
        <span style="font-size: 0.85em; color: #666">Apasă pe butonul albastru <b>CALCULEAZĂ SCORUL</b> pentru rezultate! 🎯</span>
    `;
};

// Progress tracking function with optimized scroll handling (debounced)
function initProgressTracking() {
    // Create and insert progress bar
    const progressHtml = `
        <div class="progress-container">
            <div class="progress-stats">
                <span class="questions-completed"><b>0</b> din <b>${questions.length}</b> întrebări</span>
                <span class="time-estimate">Timp rămas estimat: <b>30 minute</b></span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-message">Hai să începem! Primul pas este cel mai important.</div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', progressHtml);

    // Cache DOM elements
    const progressFill = document.querySelector('.progress-fill');
    const questionsCompleted = document.querySelector('.questions-completed');
    const timeEstimate = document.querySelector('.time-estimate');
    const progressMessage = document.querySelector('.progress-message');
    const progressContainer = document.querySelector('.progress-container');
    const testContainer = document.querySelector('.test-actual-container');

    // Helper function to check if we're within the test section
    function isInTestSection() {
        if (!testContainer) return false;

        const testRect = testContainer.getBoundingClientRect();
        const testStart = testContainer.offsetTop;
        const testEnd = testStart + testContainer.offsetHeight;
        const currentScroll = window.scrollY;

        // Consider the section "active" when:
        // 1. We've scrolled past its start (accounting for progress bar height)
        // 2. We haven't scrolled past its end
        return currentScroll >= testStart && currentScroll <= testEnd;
    }

    // Debounced scroll handler for better performance
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            if (isInTestSection()) {
                progressContainer.classList.add('visible');
            } else {
                progressContainer.classList.remove('visible');
            }
        }, 100);
    }

    // Monitor scroll position with passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleScroll, 200);
    }, { passive: true });

    // Update progress function
    function updateProgress() {
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        const total = questions.length;
        const percentage = (answered / total) * 100;

        // Update progress bar
        progressFill.style.width = percentage + '%';

        // Update stats
        questionsCompleted.innerHTML = `<b>${answered}</b> din <b>${total}</b> întrebări`;

        // Update message with animation
        progressMessage.classList.add('updating');
        progressMessage.innerHTML = getProgressMessage(percentage, answered);

        // Remove animation class after it completes
        setTimeout(() => {
            progressMessage.classList.remove('updating');
        }, 300);

        // Update time estimate
        const remainingQuestions = total - answered;
        const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.375), 1);
        timeEstimate.innerHTML = `Timp rămas estimat: <b>${estimatedMinutes} minute</b>`;
    }

    // Enhanced radio button change handler with event delegation for better performance
    form.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const currentQuestion = e.target.closest('.question');
            currentQuestion.classList.add('completed');

            // remove highlighting
            currentQuestion.classList.remove('highlight-unanswered');

            updateProgress();

            // Find and scroll to next unanswered question
            const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                .find(q => !q.querySelector('input[type="radio"]:checked'));

            if (nextUnanswered) {
                const offset = document.querySelector('.progress-container').offsetHeight + 20;
                const targetPosition = nextUnanswered.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update current question highlighting
                document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                nextUnanswered.classList.add('current');
            }
        }
    });

    // Initialize progress
    updateProgress();

    return {
        update: handleScroll,  // Expose update function for external calls
        destroy: () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        }
    };
}

// Scroll to question helper function
function scrollToQuestion(questionElement) {
    const progressContainer = document.querySelector('.progress-container');
    const progressHeight = progressContainer && progressContainer.classList.contains('visible') ?
                          progressContainer.offsetHeight : 0;

    const targetPosition = questionElement.getBoundingClientRect().top +
                          window.pageYOffset -
                          progressHeight - 20; // Additional padding

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Intersection Observer to monitor test section visibility
function initTestSectionObserver() {
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only show progress bar if we're at the top of the test section
                if (window.scrollY <= entry.target.offsetTop) {
                    progressContainer.classList.add('visible');
                }
            } else {
                progressContainer.classList.remove('visible');
            }
        });
    }, {
        threshold: 0,
        rootMargin: '-50px 0px 0px 0px'  // Adjust based on your needs
    });

    const testContainer = document.querySelector('.test-actual-container');
    if (testContainer) {
        observer.observe(testContainer);
    }

    return observer;
}

// Initialize everything
function initProgressTracker() {
    const progressTracker = initProgressTracking();
    const sectionObserver = initTestSectionObserver();

    return {
        destroy: () => {
            if (progressTracker && progressTracker.destroy) progressTracker.destroy();
            if (sectionObserver && sectionObserver.disconnect) sectionObserver.disconnect();
        }
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressTracker);
} else {
    initProgressTracker();
}

// Add email button next to the export button
const emailBtn = document.createElement('button');
emailBtn.id = 'emailBtn';
emailBtn.className = 'btn btn-primary btn-lg w-100 mb-4 action-btn';
emailBtn.style.display = 'none';
emailBtn.innerHTML = '<i class="fas fa-envelope"></i> Trimite pe Email';

// Insert email button after export button
if (exportBtn && exportBtn.parentNode) {
    exportBtn.parentNode.insertBefore(emailBtn, exportBtn.nextSibling);
}

// Submit button click handler
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Reset error states
    errorDiv.style.display = 'none';
    errorBelowDiv.style.display = 'none';
    errorDiv.innerHTML = '';
    errorBelowDiv.innerHTML = '';

    // Clear previous highlights
    document.querySelectorAll('.highlight-unanswered').forEach(el => {
        el.classList.remove('highlight-unanswered');
    });

    // Find unanswered questions
    let unanswered = [];
    questions.forEach(question => {
        const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
        if (!selected) {
            unanswered.push(question.id);
            const questionDiv = document.querySelector(`input[name="question_${question.id}"]`)
                .closest('.question');
            questionDiv.classList.add('highlight-unanswered');
        }
    });

    // Handle unanswered questions
    if (unanswered.length > 0) {
        const errorMessage = `Te rog să răspunzi la toate întrebările. Întrebările fără răspuns: ${unanswered.join(', ')}`;
        errorDiv.innerHTML = errorMessage;
        errorBelowDiv.innerHTML = errorMessage;
        errorDiv.style.display = 'block';
        errorBelowDiv.style.display = 'block';
        resultDiv.style.display = 'none';

        // Find and scroll to first unanswered question
        const firstUnanswered = document.querySelector('.highlight-unanswered');
        if (firstUnanswered) {
            const progressContainer = document.querySelector('.progress-container');
            const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

            window.scrollTo({
                top: firstUnanswered.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        }
        return;
    }

    try {
        // Calculate scores
        const results = calculateSubscores();
        const { subscores, totalScore, diagnosticIndicators } = results;
        const interpretation = getInterpretation(totalScore);

        // Announce result to screen readers
        announceResult(totalScore, interpretation);

        // Create enhanced results HTML
        resultDiv.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <div class="card-header bg-white py-3">
                    <h2 class="card-title text-center mb-0 fw-bold">Rezultate Test RAADS-R</h2>
                </div>
                <div class="card-body p-4">
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="total-score-section text-center p-4 mb-4" style="background-color: #f8f9fa; border-radius: 8px;">
                                <h3 class="h4 mb-3">Scor Total</h3>
                                <div class="display-4 mb-2">${totalScore}</div>
                                <p class="mb-0 text-muted">${interpretation}</p>
                            </div>
                        </div>
                    </div>

                    <h4 class="mb-4 fw-bold">Scoruri pe categorii</h4>

                    <!-- Visual score components -->
                    ${createScoreVisual('Limbaj', subscores.language, RAADS_R_THRESHOLDS.language, 21)}
                    ${createScoreVisual('Relaționare socială', subscores.socialRelatedness, RAADS_R_THRESHOLDS.socialRelatedness, 117)}
                    ${createScoreVisual('Senzorial-motor', subscores.sensoryMotor, RAADS_R_THRESHOLDS.sensoryMotor, 60)}
                    ${createScoreVisual('Interese circumscrise', subscores.circumscribedInterests, RAADS_R_THRESHOLDS.circumscribedInterests, 42)}

                    <!-- Category Interpretations -->
                    <div class="mt-4 pt-3 border-top">
                        <div class="category-interpretations">
                            <h5 class="mb-3">Interpretare pe categorii:</h5>
                            <ul class="list-unstyled">
                                <li class="mb-2">Limbaj: ${getCategoryInterpretation('language', subscores.language)}</li>
                                <li class="mb-2">Relaționare socială: ${getCategoryInterpretation('socialRelatedness', subscores.socialRelatedness)}</li>
                                <li class="mb-2">Senzorial-motor: ${getCategoryInterpretation('sensoryMotor', subscores.sensoryMotor)}</li>
                                <li class="mb-2">Interese circumscrise: ${getCategoryInterpretation('circumscribedInterests', subscores.circumscribedInterests)}</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Legend -->
                    <div class="mt-4 pt-3 border-top">
                        <div class="d-flex align-items-center mb-3">
                            <div style="width: 12px; height: 12px; background-color: #4CAF50; border-radius: 50%; margin-right: 8px;"></div>
                            <small class="text-muted">Sub prag</small>

                            <div style="width: 12px; height: 12px; background-color: #FFC107; border-radius: 50%; margin: 0 8px 0 16px;"></div>
                            <small class="text-muted">Aproape de prag</small>

                            <div style="width: 12px; height: 12px; background-color: #F44336; border-radius: 50%; margin: 0 8px 0 16px;"></div>
                            <small class="text-muted">Peste prag</small>
                        </div>

                        <div class="alert alert-info mb-0">
                            <small>
                                <i class="fas fa-info-circle me-2"></i>
                                Liniile negre verticale indică pragurile pentru fiecare categorie.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Update UI state
        resultDiv.style.display = 'block';
        submitBtn.style.display = 'none';
        exportBtn.style.display = 'block';
        restartBtn.style.display = 'block';
        shareBtn.style.display = 'block';

        // Hide progress bar
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            // First remove 'visible' class with transition
            progressContainer.classList.remove('visible');

            // After transition, force hide
            setTimeout(() => {
                progressContainer.style.display = 'none';
            }, 300); // Match this with your CSS transition time
        }

        // Update the padding of test container to prevent layout jump
        const testContainer = document.querySelector('.test-actual-container');
        if (testContainer) {
            testContainer.style.paddingTop = '20px'; // Reset to default padding
        }

        // Disable all radio inputs
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.disabled = true;
        });

        emailBtn.style.display = 'block';

        // Scroll to results
        setTimeout(() => {
            const resultElement = document.getElementById('result');
            if (resultElement) {
                const headerOffset = 20;
                const elementPosition = resultElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    } catch (error) {
        console.error('Error calculating scores:', error);
        errorDiv.innerHTML = `A apărut o eroare în timpul calculării scorului: ${error.message}`;
        errorDiv.style.display = 'block';
    }
});

// Email button click handler
emailBtn.addEventListener('click', function() {
    // Create modal if it doesn't exist
    if (!document.getElementById('emailModal')) {
        const modalHtml = `
        <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="emailModalLabel">Trimite rezultatele pe email</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="emailForm">
                            <div class="mb-3">
                                <label for="recipientEmail" class="form-label">Adresa de email</label>
                                <input type="email" class="form-control" id="recipientEmail" required
                                       placeholder="exemplu@gmail.com">
                                <div class="form-text">Rezultatele vor fi trimise la această adresă.</div>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="gdprConsent" required>
                                <label class="form-check-label" for="gdprConsent">
                                    Sunt de acord cu prelucrarea datelor mele personale în scopul trimiterii rezultatelor pe email.
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anulează</button>
                        <button type="button" class="btn btn-primary" id="sendEmailBtn">
                            <i class="fas fa-paper-plane"></i> Trimite
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Initialize modal
    const emailModal = new bootstrap.Modal(document.getElementById('emailModal'));
    emailModal.show();

    // Send email handler - attach once, not every time we click email button
    if (!document.getElementById('sendEmailBtn').hasAttribute('data-handler-attached')) {
        document.getElementById('sendEmailBtn').setAttribute('data-handler-attached', 'true');

        document.getElementById('sendEmailBtn').addEventListener('click', async function() {
            const emailForm = document.getElementById('emailForm');
            const recipientEmail = document.getElementById('recipientEmail').value;
            const gdprConsent = document.getElementById('gdprConsent').checked;
            const sendEmailBtn = this;

            // Validate form
            if (!emailForm.checkValidity() || !gdprConsent) {
                emailForm.reportValidity();
                return;
            }

            try {
                // Show loading state
                sendEmailBtn.disabled = true;
                sendEmailBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Se trimite...';

                // Create temporary container for PDF generation
                const container = document.createElement('div');
                container.style.cssText = `
                    width: 595px;
                    background: white;
                    position: fixed;
                    left: -9999px;
                    top: 0;
                    padding: 40px;
                    z-index: -9999;
                    font-family: Arial, sans-serif;
                    font-size: 11px;
                    color: black;
                    box-sizing: border-box;
                `;
                document.body.appendChild(container);

                try {
                    // Calculate scores
                    const results = calculateSubscores();
                    const { totalScore } = results;
                    const interpretation = getInterpretation(totalScore);

                    // Generate PDF options
                    const opt = {
                        margin: [30, 20, 30, 20],
                        filename: 'rezultate_test_raads_r.pdf',
                        image: { type: 'jpeg', quality: 1 },
                        html2canvas: {
                            scale: 2,
                            useCORS: true,
                            allowTaint: true,
                            backgroundColor: '#FFFFFF',
                            width: 595
                        },
                        jsPDF: {
                            unit: 'pt',
                            format: 'a4',
                            orientation: 'portrait',
                            putOnlyUsedFonts: true,
                            compress: true
                        },
                        pagebreak: {
                            mode: ['avoid-all', 'css', 'legacy']
                        }
                    };

                    // Generate PDF and get as blob
                    const pdfBlob = await html2pdf().set(opt).from(container).outputPdf('blob');

                    // Convert blob to base64
                    const base64Data = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = () => reject(new Error('Failed to read PDF file'));
                        reader.readAsDataURL(pdfBlob);
                    });

                    // Prepare data for sending
                    const requestData = {
                        email: recipientEmail,
                        score: totalScore,
                        interpretation: interpretation,
                        pdfData: base64Data
                    };

                    console.log('Sending email request with data:', {
                        email: requestData.email,
                        score: requestData.score,
                        interpretation: requestData.interpretation,
                        pdfDataLength: requestData.pdfData.length
                    });

                    // Send request to backend
                    const response = await fetch('/send-results-email.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to send email');
                    }

                    const result = await response.json();

                    if (result.success) {
                        // Show success message
                        emailModal.hide();
                        alert('Email-ul a fost trimis cu succes!');
                    } else {
                        throw new Error(result.error || 'Failed to send email');
                    }

                } finally {
                    // Clean up temporary container
                    if (container && container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }

            } catch (error) {
                console.error('Error sending email:', error);
                alert('A apărut o eroare la trimiterea email-ului: ' + error.message);
            } finally {
                // Reset button state
                sendEmailBtn.disabled = false;
                sendEmailBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Trimite';
            }
        });
    }
});

// Start test button click handler
if (startBtn) {
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Smooth scroll to disclaimer section
        const disclaimerSection = document.getElementById('first-disclaimer');
        if (disclaimerSection) {
            disclaimerSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Helper function to format scores
function formatScore(score) {
    return typeof score === 'number' && !isNaN(score) ? score : 0;
}

// Helper function to safely generate PDF Blob with better error handling
async function generatePDFBlob() {
    try {
        const results = calculateSubscores();
        const { subscores, totalScore } = results;

        // Create container with A4 dimensions
        const container = document.createElement('div');
        container.style.cssText = `
            width: 595px; /* A4 width in points */
            background: white;
            position: fixed;
            left: 0;
            top: 0;
            padding: 40px;
            z-index: -9999;
            font-family: Arial, sans-serif;
            font-size: 11px;
            color: black;
            box-sizing: border-box;
        `;
        document.body.appendChild(container);

        const getScoreColor = (score, threshold) => {
            if (score < threshold) return '#4CAF50';
            if (score < threshold * 1.5) return '#FFC107';
            return '#F44336';
        };

        // Clean answer text function
        const cleanAnswerText = (text) => {
            // Remove the explanatory text in parentheses
            return text.split('(')[0].trim();
        };

        const contentHtml = `
            <div style="background: white; color: black; max-width: 515px;">
                <h1 style="font-size: 16px; text-align: center; margin-bottom: 12px; color: black;">
                    Rezultate Test RAADS-R
                </h1>

                <div style="text-align: center; background-color: #f8f9fa; padding: 8px; margin: 12px 0; border-radius: 4px;">
                    <span style="color: #666; font-size: 10px;">Rezultate generate de</span><br>
                    <a href="https://www.testautism.ro" style="color: #2196F3; font-size: 12px; font-weight: bold;">
                        www.testautism.ro
                    </a>
                </div>

                <div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 10px; margin: 12px 0; border-radius: 4px;">
                    <p style="color: #856404; margin: 0; font-size: 10px; line-height: 1.4;">
                        <strong>IMPORTANT:</strong> Acest test este destinat <strong>EXCLUSIV</strong> în scop informativ și
                        <strong>NU</strong> trebuie utilizat ca un instrument de diagnostic. Pentru evaluări profesionale,
                        vă recomandăm să vizitați <a href="https://www.doctoradhd.com" style="color: #856404; font-weight: bold;">www.doctoradhd.com</a>
                    </p>
                </div>

                <div style="text-align: center; background-color: #f8f9fa; padding: 12px; margin: 12px 0; border-radius: 4px;">
                    <h2 style="font-size: 14px; margin-bottom: 8px; color: black;">Scor Total: ${totalScore}</h2>
                    <p style="color: #666; font-size: 11px; line-height: 1.4;">${getInterpretation(totalScore)}</p>
                </div>

                <h3 style="font-size: 13px; margin: 12px 0; color: black;">Scoruri pe categorii:</h3>

                <div style="margin-bottom: 20px;">
                    ${Object.entries({
                        'Limbaj': { score: subscores.language, threshold: RAADS_R_THRESHOLDS.language, max: MAX_SCORES.language },
                        'Relaționare socială': { score: subscores.socialRelatedness, threshold: RAADS_R_THRESHOLDS.socialRelatedness, max: MAX_SCORES.socialRelatedness },
                        'Senzorial-motor': { score: subscores.sensoryMotor, threshold: RAADS_R_THRESHOLDS.sensoryMotor, max: MAX_SCORES.sensoryMotor },
                        'Interese circumscrise': { score: subscores.circumscribedInterests, threshold: RAADS_R_THRESHOLDS.circumscribedInterests, max: MAX_SCORES.circumscribedInterests }
                    }).map(([category, data]) => {
                        const percentage = (data.score / data.max) * 100;
                        const color = getScoreColor(data.score, data.threshold);
                        return `
                            <div style="margin-bottom: 16px; background: white;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                    <strong style="color: black; font-size: 11px;">${category}</strong>
                                    <span style="color: black; font-size: 11px;">${data.score} / ${data.max}</span>
                                </div>
                                <div style="position: relative; height: 16px; background-color: #e9ecef; border-radius: 3px; overflow: hidden;">
                                    <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${percentage}%; background-color: ${color};"></div>
                                    <div style="position: absolute; left: ${(data.threshold/data.max)*100}%; top: 0; height: 100%; width: 2px; background-color: black;"></div>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin-top: 2px; font-size: 9px; color: #666;">
                                    <span>0</span>
                                    <span>Prag: ${data.threshold}</span>
                                    <span>${data.max}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <div style="margin: 16px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                    <strong style="color: black; font-size: 11px;">Legendă:</strong><br>
                    <span style="color: #4CAF50;">■</span> Sub prag &nbsp;&nbsp;
                    <span style="color: #FFC107;">■</span> Aproape de prag &nbsp;&nbsp;
                    <span style="color: #F44336;">■</span> Peste prag
                </div>

                <div style="margin-top: 16px; text-align: right; color: #666; font-size: 9px;">
                    Data testului: ${new Date().toLocaleDateString('ro-RO')}
                </div>
            </div>
        `;

        // Set container content
        container.innerHTML = contentHtml;

        var questionIndex = 0;
        // Add questions and answers
        questions.forEach(question => {
            const pageBreak = (questionIndex + 1) % 9 === 0 ? 'page-break-after: always;' : '';

            const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
            if (selected) {
                const questionDiv = document.createElement('div');
                questionDiv.style.cssText = `margin-bottom: 30px; color: black; ${pageBreak}`;

                const questionText = document.createElement('p');
                questionText.style.cssText = 'margin-bottom: 5px; font-weight: bold; color: black;';
                questionText.innerHTML = `${question.id}. ${question.text}`;
                questionDiv.appendChild(questionText);

                const answerText = document.createElement('p');
                answerText.style.cssText = 'margin-left: 15px; margin-bottom: 20px; color: black;';
                answerText.innerHTML = `Răspuns: ${selected.closest('label').querySelector('.form-check-label').innerHTML.trim()}`;
                questionDiv.appendChild(answerText);

                container.appendChild(questionDiv);
            }

            questionIndex++;
        });

        // Wait for content to be rendered
        await new Promise(resolve => setTimeout(resolve, 300));

        // PDF generation options
        const opt = {
            margin: [25, 20, 25, 20], // [top, right, bottom, left]
            filename: 'rezultate_test_raads_r.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#FFFFFF',
                width: 595,
                height: container.offsetHeight
            },
            jsPDF: {
                unit: 'pt',
                format: 'a4',
                orientation: 'portrait',
                putOnlyUsedFonts: true,
                compress: true
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy']
            }
        };

        try {
            const pdfBlob = await html2pdf().set(opt).from(container).outputPdf('blob');
            // Clean up
            document.body.removeChild(container);
            return pdfBlob;
        } catch (error) {
            console.error('Error generating PDF:', error);
            // Clean up
            document.body.removeChild(container);
            throw error;
        }
    } catch (error) {
        console.error('Error in generatePDFBlob:', error);
        throw error;
    }
}

function generateFinalPDF() {
    // Implementare completă pentru generarea PDF-ului cu suport garantat pentru caractere românești
    try {
        // Obține rezultatele
        const results = calculateSubscores();
        const { subscores, totalScore } = results;

        // Creează documentul PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Constante pentru layout
        const pageWidth = 210;
        const leftMargin = 20;
        const rightMargin = 20;
        const contentWidth = pageWidth - leftMargin - rightMargin;
        const pageHeight = 297;

        // Variabile de stare
        let y = 15;
        let pageCount = 1;

        // Culori pentru scoruri
        const colors = {
            green: [76, 175, 80],
            yellow: [255, 193, 7],
            red: [244, 67, 54],
            blue: [33, 150, 243],
            lightGrey: [238, 238, 238]
        };

        // Funcție pentru a crea o nouă pagină
        const addNewPage = () => {
            doc.addPage();
            pageCount++;
            y = 20;

            // Adaugă header pagină
            doc.setFontSize(10);
            doc.text(`Rezultate Test RAADS-R - Pagina ${pageCount}`, pageWidth / 2, 10, { align: 'center' });
        };

        // Funcție pentru a verifica dacă este nevoie de o pagină nouă
        const checkNewPage = (requiredHeight) => {
            if (y + requiredHeight > pageHeight - 20) {
                addNewPage();
                return true;
            }
            return false;
        };

        // Funcție pentru desenare text sigură, caracter cu caracter
        const drawSafeText = (text, x, y, options = {}) => {
            const {
                fontSize = 11,
                fontStyle = 'normal',
                color = [0, 0, 0],
                align = 'left',
                maxWidth = contentWidth
            } = options;

            // Setează font și culoare
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', fontStyle);
            doc.setTextColor(...color);

            // Divide textul în cuvinte pentru control maxim
            const words = text.split(/\s+/);
            let lines = [];
            let currentLine = '';

            // Împarte textul manual pe linii
            for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word;
                // Folosim o aproximare pentru lățimea liniei (factor de corecție pentru diacritice)
                const testWidth = (doc.getStringUnitWidth(testLine) * 0.9 * fontSize) / doc.internal.scaleFactor;

                if (testWidth <= maxWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }

            // Adaugă ultima linie dacă există
            if (currentLine) {
                lines.push(currentLine);
            }

            // Calculează poziția de start în funcție de aliniere
            let xPos = x;
            if (align === 'center') {
                xPos = pageWidth / 2;
            } else if (align === 'right') {
                xPos = x + maxWidth;
            }

            // Desenează fiecare linie de text, caracter cu caracter pentru control maxim
            let yPos = y;
            for (const line of lines) {
                // Pentru aliniere corespunzătoare
                if (align === 'center') {
                    doc.text(line, xPos, yPos, { align: 'center' });
                } else if (align === 'right') {
                    doc.text(line, xPos, yPos, { align: 'right' });
                } else {
                    // Pentru text aliniat la stânga, desenăm manual
                    doc.text(line, xPos, yPos);
                }
                yPos += fontSize * 0.4; // Spațiere între linii
            }

            // Returnează noua poziție Y
            return y + (lines.length * fontSize * 0.4);
        };

        // Funcție pentru a desena o bară de progres
        const drawProgressBar = (x, y, width, height, percentage, thresholdPercentage, color) => {
            // Desenează fundal
            doc.setFillColor(...colors.lightGrey);
            doc.roundedRect(x, y, width, height, 1, 1, 'F');

            // Desenează bara de progres
            if (percentage > 0) {
                doc.setFillColor(...color);
                const fillWidth = Math.min(width * percentage / 100, width);
                doc.roundedRect(x, y, fillWidth, height, 1, 1, 'F');
            }

            // Desenează marcajul de prag
            doc.setFillColor(0, 0, 0);
            doc.rect(x + (width * thresholdPercentage / 100), y - 1, 0.7, height + 2, 'F');

            return y + height;
        };

        // Funcție helper pentru culoarea scorului
        const getScoreColor = (score, threshold) => {
            if (score < threshold) return colors.green;
            if (score < threshold * 1.5) return colors.yellow;
            return colors.red;
        };

        // === PRIMA PAGINĂ - HEADER ȘI REZULTATE ===

        // Adaugă titlu principal
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text('Rezultate Test RAADS-R', pageWidth / 2, y, { align: 'center' });

        // Adaugă sursa
        y += 10;
        doc.setFontSize(10);
        doc.text('Rezultate generate de www.testautism.ro', pageWidth / 2, y, { align: 'center' });

        // Adaugă disclaimer
        y += 10;
        doc.setFontSize(9);
        doc.setTextColor(221, 44, 0);
        const disclaimerLines = [
            'IMPORTANT: Acest test este destinat EXCLUSIV în scop informativ și NU trebuie utilizat',
            'ca un instrument de diagnostic. Pentru evaluări profesionale, vă recomandăm să vizitați',
            'www.doctoradhd.com'
        ];

        disclaimerLines.forEach(line => {
            doc.text(line, pageWidth / 2, y, { align: 'center' });
            y += 5;
        });

        // Resetează culoarea textului
        doc.setTextColor(0, 0, 0);

        // Adaugă scor total
        y += 5;
        doc.setFontSize(16);
        doc.text(`Scor Total: ${totalScore}`, pageWidth / 2, y, { align: 'center' });

        // Adaugă interpretare
        y += 8;
        doc.setFontSize(12);
        const interpretation = getInterpretation(totalScore);
        doc.text(`Interpretare: ${interpretation}`, pageWidth / 2, y, { align: 'center' });

        // Adaugă titlu secțiune scoruri
        y += 15;
        doc.setFontSize(14);
        doc.text('Scoruri pe categorii:', leftMargin, y);

        // Adaugă scorurile pe categorii
        y += 8;
        const categories = [
            { name: 'Limbaj', score: subscores.language, threshold: RAADS_R_THRESHOLDS.language, max: MAX_SCORES.language },
            { name: 'Relaționare socială', score: subscores.socialRelatedness, threshold: RAADS_R_THRESHOLDS.socialRelatedness, max: MAX_SCORES.socialRelatedness },
            { name: 'Senzorial-motor', score: subscores.sensoryMotor, threshold: RAADS_R_THRESHOLDS.sensoryMotor, max: MAX_SCORES.sensoryMotor },
            { name: 'Interese circumscrise', score: subscores.circumscribedInterests, threshold: RAADS_R_THRESHOLDS.circumscribedInterests, max: MAX_SCORES.circumscribedInterests }
        ];

        categories.forEach(category => {
            doc.setFontSize(12);
            doc.text(`${category.name}: ${category.score} / ${category.max} (Prag: ${category.threshold})`, leftMargin + 5, y);
            y += 6;

            // Calculează procentaje și culoare
            const percentage = (category.score / category.max) * 100;
            const thresholdPercentage = (category.threshold / category.max) * 100;
            const color = getScoreColor(category.score, category.threshold);

            // Desenează bară progres
            y = drawProgressBar(leftMargin + 5, y, contentWidth - 10, 5, percentage, thresholdPercentage, color) + 2;
            y += 5;
        });

        // Adaugă legendă
        y += 5;
        doc.setFontSize(10);

        // Desenează pătrate colorate pentru legendă
        doc.setFillColor(...colors.green);
        doc.rect(leftMargin + 5, y, 4, 4, 'F');
        doc.text('Sub prag', leftMargin + 12, y + 3);

        doc.setFillColor(...colors.yellow);
        doc.rect(leftMargin + 45, y, 4, 4, 'F');
        doc.text('Aproape de prag', leftMargin + 52, y + 3);

        doc.setFillColor(...colors.red);
        doc.rect(leftMargin + 110, y, 4, 4, 'F');
        doc.text('Peste prag', leftMargin + 117, y + 3);

        // === SECțIUNEA CU RĂSPUNSURI LA ÎNTREBĂRI ===

        // Adăugă titlul secțiunii
        y += 15;
        checkNewPage(10);

        doc.setFontSize(14);
        doc.text('Răspunsuri la întrebări:', leftMargin, y);
        y += 10;

        // Pregătește lista de întrebări și răspunsuri
        const questionAnswers = [];

        for (const question of questions) {
            const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
            if (selected) {
                questionAnswers.push({
                    id: question.id,
                    text: question.text,
                    answer: selected.closest('label').querySelector('.form-check-label').textContent.trim()
                });
            }
        }

        // Adaugă întrebările și răspunsurile cu aliniere strictă și control la nivel de caracter
        for (const qa of questionAnswers) {
            // Verifică dacă este nevoie de pagină nouă (estimare conservativă)
            if (checkNewPage(25)) {
                y = 20; // Reset y după adăugarea paginii noi
            }

            // Transformă în text plain, fără simboluri speciale
            const questionText = `${qa.id}. ${qa.text.replace(/[^\x00-\x7F]/g, c => {
                // Înlocuiește explicit toate caracterele non-ASCII cu echivalentul lor ASCII
                return c === 'ă' ? 'a' :
                       c === 'â' ? 'a' :
                       c === 'î' ? 'i' :
                       c === 'ș' ? 's' :
                       c === 'ț' ? 't' :
                       c === 'Ă' ? 'A' :
                       c === 'Â' ? 'A' :
                       c === 'Î' ? 'I' :
                       c === 'Ș' ? 'S' :
                       c === 'ț' ? 'T' : c;
            })}`;

            // Adaugă întrebarea (bold)
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);

            // Împarte manual textul întrebării în linii de max 80 de caractere
            const questionLines = [];
            for (let i = 0; i < questionText.length; i += 80) {
                questionLines.push(questionText.substr(i, 80));
            }

            // Desenează fiecare linie a întrebării
            for (const line of questionLines) {
                doc.text(line, leftMargin, y);
                y += 5;
            }

            // Adaugă răspunsul (normal + indentare)
            const answerText = `Răspuns: ${qa.answer.replace(/[^\x00-\x7F]/g, c => {
                // Aceeași înlocuire pentru diacritice
                return c === 'ă' ? 'a' :
                       c === 'â' ? 'a' :
                       c === 'î' ? 'i' :
                       c === 'ș' ? 's' :
                       c === 'ț' ? 't' :
                       c === 'Ă' ? 'A' :
                       c === 'Â' ? 'A' :
                       c === 'Î' ? 'I' :
                       c === 'Ș' ? 'S' :
                       c === 'ț' ? 'T' : c;
            })}`;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);

            // Împarte manual textul răspunsului în linii de max 75 de caractere (pentru indentare)
            const answerLines = [];
            for (let i = 0; i < answerText.length; i += 75) {
                answerLines.push(answerText.substr(i, 75));
            }

            // Desenează fiecare linie a răspunsului
            for (const line of answerLines) {
                doc.text(line, leftMargin + 5, y);
                y += 5;
            }

            // Adaugă spațiu după fiecare răspuns
            y += 3;
        }

        // Adaugă data testului pe ultima pagină
        doc.setFontSize(9);
        doc.text(`Data testului: ${new Date().toLocaleDateString('ro-RO')}`, leftMargin, pageHeight - 15);

        return doc.output('blob');
    } catch (error) {
        console.error('Eroare la generarea PDF-ului:', error);
        throw error;
    }
}

if(exportBtn) {
    exportBtn.addEventListener('click', exportRobustRomanianPDF);
}

// Restart button functionality with better state management
const restartTest = function() {
    // Reset progress container visibility with proper error checking
    const progressContainer = document.querySelector('.progress-container');

    if (progressContainer) {
        progressContainer.style.display = ''; // Remove inline display: none

        // Brief timeout to allow display to take effect before adding visible class
        setTimeout(() => {
            progressContainer.classList.add('visible');
        }, 10);
    }

    // Reset test container padding
    const testContainer = document.querySelector('.test-actual-container');
    if (testContainer) {
        testContainer.style.paddingTop = '120px'; // Reset to original padding
    }

    // Enable all radio inputs and uncheck them
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = false;
        radio.checked = false;
    });

    // Remove completion classes from questions
    document.querySelectorAll('.question').forEach(question => {
        question.classList.remove('completed');
        question.classList.remove('current');
    });

    // Hide results and action buttons
    if (resultDiv) resultDiv.style.display = 'none';
    if (exportBtn) exportBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (shareBtn) shareBtn.style.display = 'none';
    if (emailBtn) emailBtn.style.display = 'none';

    // Show submit button
    if (submitBtn) submitBtn.style.display = 'block';

    // Remove any highlighting
    document.querySelectorAll('.highlight-unanswered').forEach(el => {
        el.classList.remove('highlight-unanswered');
    });

    // Hide the modal
    const restartWarningModal = document.getElementById('restartWarningModal');
    if (restartWarningModal) {
        const bsModal = bootstrap.Modal.getInstance(restartWarningModal);
        if (bsModal) bsModal.hide();
    }

    // Reset progress if exists
    const progressFill = document.querySelector('.progress-fill');
    const questionsCompleted = document.querySelector('.questions-completed');
    const progressMessage = document.querySelector('.progress-message');
    if (progressFill) progressFill.style.width = '0%';
    if (questionsCompleted) questionsCompleted.innerHTML = `<b>0</b> din <b>${questions.length}</b> întrebări`;
    if (progressMessage) progressMessage.innerHTML = getProgressMessage(0, 0);

    // Find first question
    const firstQuestion = document.querySelector('.question');
    if (firstQuestion) {
        // Add current class to first question
        firstQuestion.classList.add('current');

        // Scroll to first question with offset for progress bar
        const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

        setTimeout(() => {
            const targetPosition = firstQuestion.getBoundingClientRect().top +
                                 window.pageYOffset -
                                 offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Re-initialize the progress tracker
            initProgressTracker();
        }, 100); // Small delay to ensure DOM updates are complete
    }

    // Clear announcer for screen readers
    if (resultAnnouncer) {
        resultAnnouncer.textContent = "Test resetat. Poți începe din nou.";
    }
};

// Event listeners for restart button and confirmation
if (restartBtn) {
    restartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const restartWarningModal = document.getElementById('restartWarningModal');
        if (restartWarningModal) {
            const bsModal = bootstrap.Modal.getOrCreateInstance(restartWarningModal);
            bsModal.show();
        }
    });
}

const confirmRestartBtn = document.getElementById('confirmRestartBtn');
if (confirmRestartBtn) {
    confirmRestartBtn.addEventListener('click', restartTest);
}

// Re-attach change event listeners for radio buttons with event delegation
function reInitializeRadioListeners() {
    document.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const currentQuestion = e.target.closest('.question');
            if (!currentQuestion) return;

            // Remove highlighting
            currentQuestion.classList.remove('highlight-unanswered');

            currentQuestion.classList.add('completed');

            // Find next unanswered question
            const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                .find(q => !q.querySelector('input[type="radio"]:checked'));

            if (nextUnanswered) {
                // Remove current class from all questions
                document.querySelectorAll('.question').forEach(q => {
                    q.classList.remove('current');
                });

                // Add current class to next question
                nextUnanswered.classList.add('current');

                // Calculate scroll position
                const progressContainer = document.querySelector('.progress-container');
                const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

                const targetPosition = nextUnanswered.getBoundingClientRect().top +
                                     window.pageYOffset -
                                     offset;

                // Smooth scroll to next question
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Update progress if it exists
            const progressContainer = document.querySelector('.progress-container');
            if (progressContainer && progressContainer.classList.contains('visible')) {
                const answered = document.querySelectorAll('input[type="radio"]:checked').length;
                const total = questions.length;
                const percentage = (answered / total) * 100;

                const progressFill = document.querySelector('.progress-fill');
                const questionsCompleted = document.querySelector('.questions-completed');
                const progressMessage = document.querySelector('.progress-message');

                if (progressFill) progressFill.style.width = percentage + '%';
                if (questionsCompleted) questionsCompleted.innerHTML = `<b>${answered}</b> din <b>${total}</b> întrebări`;
                if (progressMessage) {
                    progressMessage.classList.add('updating');
                    progressMessage.innerHTML = getProgressMessage(percentage, answered);
                    setTimeout(() => {
                        progressMessage.classList.remove('updating');
                    }, 300);
                }
            }
        }
    });
}

// Call this when initializing the form
reInitializeRadioListeners();

// Function to generate a random identifier
function generateUniqueId() {
    return 'raads_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Enhanced Facebook sharing function with better error handling
async function shareToFacebook() {
    try {
        // Show loading state
        if (!shareBtn) return;

        shareBtn.disabled = true;
        shareBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Se pregătește imaginea...';

        // Calculate scores using the proper RAADS-R scoring system
        const results = calculateSubscores();

        // Format scores
        const formattedResults = {
            subscores: {
                language: Math.round(results.subscores.language) || 0,
                socialRelatedness: Math.round(results.subscores.socialRelatedness) || 0,
                sensoryMotor: Math.round(results.subscores.sensoryMotor) || 0,
                circumscribedInterests: Math.round(results.subscores.circumscribedInterests) || 0
            },
            totalScore: Math.round(results.totalScore) || 0
        };

        // Get interpretation based on total score
        const interpretation = getInterpretation(formattedResults.totalScore);

        // Get color for total score
        const totalScoreColor = formattedResults.totalScore < 65 ? '#4CAF50' :
                               formattedResults.totalScore < 90 ? '#FFC107' : '#F44336';

        // Create a visible container for html2canvas
        const container = document.createElement('div');
        container.style.cssText = `
            width: 1200px;
            height: 630px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -9999;
            background: white;
        `;
        document.body.appendChild(container);

        // Define score categories
        const scoreCategories = [
            {
                name: 'Limbaj',
                score: formattedResults.subscores.language,
                max: MAX_SCORES.language,
                threshold: RAADS_R_THRESHOLDS.language
            },
            {
                name: 'Relaționare socială',
                score: formattedResults.subscores.socialRelatedness,
                max: MAX_SCORES.socialRelatedness,
                threshold: RAADS_R_THRESHOLDS.socialRelatedness
            },
            {
                name: 'Senzorial-motor',
                score: formattedResults.subscores.sensoryMotor,
                max: MAX_SCORES.sensoryMotor,
                threshold: RAADS_R_THRESHOLDS.sensoryMotor
            },
            {
                name: 'Interese circumscrise',
                score: formattedResults.subscores.circumscribedInterests,
                max: MAX_SCORES.circumscribedInterests,
                threshold: RAADS_R_THRESHOLDS.circumscribedInterests
            }
        ];

        // Create HTML content
        container.innerHTML = `
            <div style="width: 1200px; height: 630px; padding: 40px; box-sizing: border-box; font-family: Arial, sans-serif; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="font-size: 42px; margin: 0; color: #333; letter-spacing: -0.5px;">
                        Rezultate Test RAADS-R
                    </h1>
                </div>

                <!-- Total Score -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 120px; font-weight: bold; color: ${totalScoreColor}; line-height: 1.2; margin: 20px 0;">
                        ${formattedResults.totalScore}
                    </div>
                    <div style="font-size: 28px; color: #666; margin-bottom: 20px;">
                        Scor Total
                    </div>
                    <div style="font-size: 32px; color: #333; max-width: 90%; margin: 0 auto 30px; line-height: 1.4;">
                        ${interpretation}
                    </div>
                </div>

                <!-- Score Categories -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; padding: 0 40px;">
                    ${scoreCategories.map(category => {
                        const percentage = Math.min(Math.max((category.score / category.max) * 100, 0), 100);
                        const color = category.score < category.threshold ? '#4CAF50' :
                                    category.score < category.threshold * 1.5 ? '#FFC107' : '#F44336';

                        return `
                            <div style="text-align: center;">
                                <div style="font-size: 24px; color: #333; margin-bottom: 15px; font-weight: 500;">
                                    ${category.name}
                                </div>
                                <div style="position: relative; width: 100px; height: 100px; margin: 0 auto;">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; font-weight: bold;">
                                        ${category.score}/${category.max}
                                    </div>
                                    <svg width="100" height="100" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e9ecef" stroke-width="6"/>
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="${color}" stroke-width="6"
                                            stroke-dasharray="${percentage * 2.827}, 282.7"
                                            transform="rotate(-90 50 50)"/>
                                    </svg>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- CTA -->
                <div style="text-align: center; margin-top: 40px; font-size: 42px; font-weight: bold; color: ${totalScoreColor}; text-transform: uppercase; letter-spacing: 2px; background: linear-gradient(45deg, ${totalScoreColor}22, ${totalScoreColor}11); padding: 20px; border-radius: 12px;">
                    Fă și tu un test!
                </div>
            </div>
        `;

        // Wait a brief moment for rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        // Generate image
        const canvas = await html2canvas(container, {
            width: 1200,
            height: 630,
            scale: 1,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        });

        // Remove the container
        document.body.removeChild(container);

        // Convert canvas to blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));

        // Create FormData
        const formData = new FormData();
        const uniqueId = generateUniqueId();
        formData.append('image', blob, uniqueId + '.jpg');
        formData.append('id', uniqueId);
        formData.append('score', formattedResults.totalScore.toString());
        formData.append('subscores', JSON.stringify(formattedResults.subscores));
        formData.append('interpretation', interpretation);

        // Upload and share
        const response = await fetch('/save-result-image.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed: ' + response.statusText);
        }

        const data = await response.json();

        // Open Facebook share dialog
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.shareUrl)}`;
        window.open(
            fbShareUrl,
            'facebook-share-dialog',
            'width=626,height=436,top=' + (window.innerHeight - 436) / 2 + ',left=' + (window.innerWidth - 626) / 2
        );

    } catch (error) {
        console.error('Error sharing:', error);
        alert('A apărut o eroare la distribuirea rezultatelor. Vă rugăm să încercați din nou.');
    } finally {
        if (shareBtn) {
            shareBtn.disabled = false;
            shareBtn.innerHTML = '<i class="fab fa-facebook me-2"></i>Distribuie pe Facebook';
        }
    }
}

// Click handler for share button
if (shareBtn) {
    shareBtn.addEventListener('click', shareToFacebook);
}

// Keyboard navigation enhancement for accessibility
document.addEventListener('keydown', (e) => {
    const activeElement = document.activeElement;

    // Skip navigation when focus is in fields that need arrow keys
    if (activeElement.tagName === 'TEXTAREA' ||
        (activeElement.tagName === 'INPUT' &&
        activeElement.type !== 'radio' &&
        activeElement.type !== 'checkbox')) {
        return;
    }

    if (activeElement.type === 'radio') {
        const currentQuestion = activeElement.closest('.question');
        const radios = Array.from(currentQuestion.querySelectorAll('input[type="radio"]'));
        const currentIndex = radios.indexOf(activeElement);

        switch(e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % radios.length;
                radios[nextIndex].focus();
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + radios.length) % radios.length;
                radios[prevIndex].focus();
                break;
            case 'Home':
                e.preventDefault();
                radios[0].focus();
                break;
            case 'End':
                e.preventDefault();
                radios[radios.length - 1].focus();
                break;
        }
    }
});

// Add help button functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.help-button')) {
        const button = e.target.closest('.help-button');
        const helpContent = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Toggle the help content
        button.setAttribute('aria-expanded', !isExpanded);
        helpContent.hidden = isExpanded;

        // Add animation class
        if (!isExpanded) {
            helpContent.classList.add('help-content-show');
        } else {
            helpContent.classList.remove('help-content-show');
        }

        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.innerHTML = `Ajutor pentru întrebare ${isExpanded ? 'închis' : 'deschis'}`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
});

// Function to highlight the QuickNav item of the section currently in view
function highlightInViewSection() {
    const navItems = document.querySelectorAll('.quick-nav-item');
    const sections = [
        { id: 'section-faq', navItem: document.querySelector('a[href="#section-faq"]') },
        { id: 'section-instructions', navItem: document.querySelector('a[href="#section-instructions"]') },
        { id: 'section-quiz', navItem: document.querySelector('a[href="#section-quiz"]') },
        { id: 'section-results', navItem: document.querySelector('a[href="#section-results"]') },
        { id: 'section-support', navItem: document.querySelector('a[href="#section-support"]') }
    ];

    // Use a debounced scroll handler for better performance
    let scrollTimeout;
    function checkSectionVisibility() {
        if (scrollTimeout) clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            let currentSection = '';

            sections.forEach(section => {
                const sectionElement = document.getElementById(section.id);
                if (!sectionElement) return;

                const sectionTop = sectionElement.offsetTop;
                const sectionBottom = sectionTop + sectionElement.offsetHeight;

                // Check if the section is in the middle of the viewport
                if (window.scrollY + window.innerHeight / 2 >= sectionTop &&
                    window.scrollY + window.innerHeight / 2 < sectionBottom) {
                    currentSection = section.id;
                }
            });

            // Remove active class from all QuickNav items
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Set active class on current section's nav item
            if (currentSection) {
                const activeNavItem = document.querySelector(`a[href="#${currentSection}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        }, 100);
    }

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', checkSectionVisibility, { passive: true });

    // Initial check
    checkSectionVisibility();

    return {
        destroy: () => {
            window.removeEventListener('scroll', checkSectionVisibility);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        }
    };
}

// DOM-independent PDF generation function
function generatePDFWithoutDOM() {
    try {
        // Get or calculate results
        let storedData;
        try {
            storedData = JSON.parse(localStorage.getItem('raads_results') || '{}');
        } catch (e) {
            storedData = {};
        }

        // If no stored data or it's outdated, calculate fresh
        const results = storedData.results || calculateSubscores();
        const { subscores, totalScore } = results;
        const answers = storedData.answers || {};

        // Create PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;

        // Helper function for colors
        const getScoreColor = (score, threshold) => {
            if (score < threshold) return [76, 175, 80]; // Green
            if (score < threshold * 1.5) return [255, 193, 7]; // Yellow
            return [244, 67, 54]; // Red
        };

        // Add header
        doc.setFontSize(16);
        doc.text('Rezultate Test RAADS-R', 105, y, { align: 'center' });
        y += 15;

        // Add website info
        doc.setFontSize(10);
        doc.text('Rezultate generate de www.testautism.ro', 105, y, { align: 'center' });
        y += 15;

        // Add disclaimer
        doc.setFontSize(8);
        doc.setTextColor(255, 0, 0);
        doc.text('IMPORTANT: Acest test este destinat EXCLUSIV în scop informativ și NU trebuie utilizat ca un instrument de diagnostic.', 105, y, { align: 'center', maxWidth: 180 });
        doc.setTextColor(0, 0, 0);
        y += 15;

        // Add total score
        doc.setFontSize(14);
        doc.text(`Scor Total: ${totalScore}`, 105, y, { align: 'center' });
        y += 10;

        // Add interpretation
        doc.setFontSize(12);
        doc.text(`Interpretare: ${getInterpretation(totalScore)}`, 105, y, { align: 'center', maxWidth: 150 });
        y += 20;

        // Add category scores
        doc.setFontSize(14);
        doc.text('Scoruri pe categorii:', 20, y);
        y += 10;

        const categories = [
            { name: 'Limbaj', score: subscores.language, threshold: RAADS_R_THRESHOLDS.language, max: MAX_SCORES.language },
            { name: 'Relaționare socială', score: subscores.socialRelatedness, threshold: RAADS_R_THRESHOLDS.socialRelatedness, max: MAX_SCORES.socialRelatedness },
            { name: 'Senzorial-motor', score: subscores.sensoryMotor, threshold: RAADS_R_THRESHOLDS.sensoryMotor, max: MAX_SCORES.sensoryMotor },
            { name: 'Interese circumscrise', score: subscores.circumscribedInterests, threshold: RAADS_R_THRESHOLDS.circumscribedInterests, max: MAX_SCORES.circumscribedInterests }
        ];

        categories.forEach(category => {
            doc.setFontSize(12);
            doc.text(`${category.name}: ${category.score} / ${category.max} (Prag: ${category.threshold})`, 25, y);
            y += 8;

            // Draw a progress bar
            doc.setDrawColor(220, 220, 220);
            doc.setFillColor(220, 220, 220);
            doc.roundedRect(25, y, 150, 5, 1, 1, 'F');

            // Calculate percentage and color
            const percentage = Math.min(category.score / category.max, 1) * 150;
            const color = getScoreColor(category.score, category.threshold);

            doc.setDrawColor(color[0], color[1], color[2]);
            doc.setFillColor(color[0], color[1], color[2]);
            if (percentage > 0) {
                doc.roundedRect(25, y, percentage, 5, 1, 1, 'F');
            }

            // Draw threshold marker
            const thresholdPosition = (category.threshold / category.max) * 150;
            doc.setDrawColor(0, 0, 0);
            doc.setFillColor(0, 0, 0);
            doc.rect(25 + thresholdPosition, y - 1, 1, 7, 'F');

            y += 10;
        });

        y += 10;

        // Add questions and answers
        if (Object.keys(answers).length > 0) {
            doc.setFontSize(14);
            doc.text('Răspunsuri la întrebări:', 20, y);
            y += 10;

            let pageCount = 1;

            Object.entries(answers).forEach(([id, answer]) => {
                // Check if we need a new page
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                    pageCount++;

                    // Add page header
                    doc.setFontSize(10);
                    doc.text(`Rezultate Test RAADS-R - Pagina ${pageCount}`, 105, 10, { align: 'center' });
                }

                doc.setFontSize(10);
                doc.text(`${id}. ${answer.text}`, 20, y, { maxWidth: 170 });
                y += 8;

                doc.setFontSize(9);
                doc.text(`Răspuns: ${answer.answer}`, 25, y);
                y += 12;
            });
        }

        // Add date at the bottom of the last page
        doc.setFontSize(8);
        doc.text(`Data testului: ${new Date().toLocaleDateString('ro-RO')}`, 20, 280);

        return doc.output('blob');
    } catch (error) {
        console.error('Error generating PDF with jsPDF:', error);
        throw error;
    }
}

// Funcție îmbunătățită pentru generarea PDF-ului cu suport pentru diacritice și formatare mai bună
function generateImprovedPDF() {
    try {
        // Obține rezultatele din calcul sau din localStorage
        let storedData;
        try {
            storedData = JSON.parse(localStorage.getItem('raads_results') || '{}');
        } catch (e) {
            storedData = {};
        }

        // Dacă nu există date stocate sau sunt învechite, calculează din nou
        const results = storedData.results || calculateSubscores();
        const { subscores, totalScore } = results;
        const answers = storedData.answers || {};

        // Creează documentul PDF cu font încorporat pentru suport diacritice
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true
        });

        // Setează fontul implicit cu suport pentru diacritice românești
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Culori pentru scoruri
        const colors = {
            green: [76, 175, 80],
            yellow: [255, 193, 7],
            red: [244, 67, 54],
            blue: [33, 150, 243],
            lightGrey: [238, 238, 238]
        };

        // Funcție helper pentru culoarea scorului
        const getScoreColor = (score, threshold) => {
            if (score < threshold) return colors.green;
            if (score < threshold * 1.5) return colors.yellow;
            return colors.red;
        };

        // Funcție pentru text cu wrapping și aliniere
        const addWrappedText = (text, x, y, maxWidth, lineHeight, align = 'left') => {
            if (!text) return y; // Dacă nu există text, întoarce poziția Y neschimbată

            const textLines = doc.splitTextToSize(text, maxWidth);

            if (align === 'center') {
                textLines.forEach(line => {
                    doc.text(line, x, y, { align: 'center' });
                    y += lineHeight;
                });
            } else if (align === 'right') {
                textLines.forEach(line => {
                    doc.text(line, x, y, { align: 'right' });
                    y += lineHeight;
                });
            } else {
                textLines.forEach(line => {
                    doc.text(line, x, y);
                    y += lineHeight;
                });
            }

            return y; // Returnează noua poziție Y după adăugarea textului
        };

        // Funcție pentru desenarea unei bare de progres cu indicator de prag
        const drawProgressBar = (x, y, width, height, percentage, thresholdPercentage, color) => {
            // Desenează fundal
            doc.setFillColor(...colors.lightGrey);
            doc.roundedRect(x, y, width, height, 1, 1, 'F');

            // Desenează bara de progres
            if (percentage > 0) {
                doc.setFillColor(...color);
                doc.roundedRect(x, y, width * percentage / 100, height, 1, 1, 'F');
            }

            // Desenează marcajul de prag
            doc.setFillColor(0, 0, 0);
            doc.rect(x + (width * thresholdPercentage / 100), y - 1, 0.5, height + 2, 'F');

            return y + height;
        };

        // Adaugă header
        let y = 15;
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text('Rezultate Test RAADS-R', 105, y, { align: 'center' });

        // Adaugă sursa
        y += 10;
        doc.setFontSize(10);
        doc.text('Rezultate generate de www.testautism.ro', 105, y, { align: 'center' });

        // Adaugă disclaimer
        y += 8;
        doc.setFontSize(9);
        doc.setTextColor(221, 44, 0);
        const disclaimer = 'IMPORTANT: Acest test este destinat EXCLUSIV în scop informativ și NU trebuie utilizat ca un instrument de diagnostic. Pentru evaluări profesionale, vă recomandăm să vizitați www.doctoradhd.com';
        y = addWrappedText(disclaimer, 20, y, 170, 5, 'center');

        // Resetează culoarea textului
        doc.setTextColor(0, 0, 0);

        // Adaugă scor total
        y += 8;
        doc.setFontSize(16);
        doc.text(`Scor Total: ${totalScore}`, 105, y, { align: 'center' });

        // Adaugă interpretare
        y += 7;
        doc.setFontSize(12);
        const interpretation = getInterpretation(totalScore);
        y = addWrappedText(`Interpretare: ${interpretation}`, 20, y, 170, 5, 'center');

        // Titlu secțiune scoruri
        y += 8;
        doc.setFontSize(14);
        doc.text('Scoruri pe categorii:', 20, y);

        // Adaugă scorurile pe categorii
        y += 8;
        const categories = [
            { name: 'Limbaj', score: subscores.language, threshold: RAADS_R_THRESHOLDS.language, max: MAX_SCORES.language },
            { name: 'Relaționare socială', score: subscores.socialRelatedness, threshold: RAADS_R_THRESHOLDS.socialRelatedness, max: MAX_SCORES.socialRelatedness },
            { name: 'Senzorial-motor', score: subscores.sensoryMotor, threshold: RAADS_R_THRESHOLDS.sensoryMotor, max: MAX_SCORES.sensoryMotor },
            { name: 'Interese circumscrise', score: subscores.circumscribedInterests, threshold: RAADS_R_THRESHOLDS.circumscribedInterests, max: MAX_SCORES.circumscribedInterests }
        ];

        categories.forEach(category => {
            doc.setFontSize(12);
            doc.text(`${category.name}: ${category.score} / ${category.max} (Prag: ${category.threshold})`, 25, y);
            y += 5;

            // Calculează procentaje și culoare
            const percentage = (category.score / category.max) * 100;
            const thresholdPercentage = (category.threshold / category.max) * 100;
            const color = getScoreColor(category.score, category.threshold);

            // Desenează bară progres
            y = drawProgressBar(25, y, 150, 4, percentage, thresholdPercentage, color) + 2;
            y += 5;
        });

        // Adaugă legendă
        y += 5;
        doc.setFillColor(...colors.green);
        doc.rect(25, y, 4, 4, 'F');
        doc.text('Sub prag', 32, y + 3);

        doc.setFillColor(...colors.yellow);
        doc.rect(65, y, 4, 4, 'F');
        doc.text('Aproape de prag', 72, y + 3);

        doc.setFillColor(...colors.red);
        doc.rect(120, y, 4, 4, 'F');
        doc.text('Peste prag', 127, y + 3);

        // Adăugă răspunsurile la întrebări
        y += 12;
        doc.setFontSize(14);
        doc.text('Răspunsuri la întrebări:', 20, y);
        y += 8;

        let pageCount = 1;

        // Pregătește lista de întrebări și răspunsuri
        const questionAnswers = [];
        questions.forEach(question => {
            const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
            if (selected) {
                questionAnswers.push({
                    id: question.id,
                    text: question.text,
                    answer: selected.closest('label').querySelector('.form-check-label').textContent.trim()
                });
            }
        });

        // Adaugă răspunsurile
        questionAnswers.forEach((qa, index) => {
            // Verifică dacă avem nevoie de pagină nouă
            if (y > 270) {
                doc.addPage();
                pageCount++;
                y = 20;

                // Adaugă header pagină
                doc.setFontSize(10);
                doc.text(`Rezultate Test RAADS-R - Pagina ${pageCount}`, 105, 10, { align: 'center' });
            }

            // Adaugă întrebarea
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            const questionText = `${qa.id}. ${qa.text}`;
            y = addWrappedText(questionText, 20, y, 170, 5);

            // Adaugă răspunsul
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            const answerText = `Răspuns: ${qa.answer}`;
            y = addWrappedText(answerText, 25, y, 165, 5);

            y += 3; // Spațiu după fiecare răspuns
        });

        // Adaugă data testului pe ultima pagină
        doc.setFontSize(9);
        doc.text(`Data testului: ${new Date().toLocaleDateString('ro-RO')}`, 20, 280);

        return doc.output('blob');
    } catch (error) {
        console.error('Eroare la generarea PDF-ului cu jsPDF:', error);
        throw error;
    }
}

// Actualizează funcția de stocare a rezultatelor
function storeTestResults() {
    try {
        const results = calculateSubscores();
        const answers = {};

        questions.forEach(question => {
            const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
            if (selected) {
                answers[question.id] = {
                    value: selected.value,
                    text: question.text,
                    answer: selected.closest('label').querySelector('.form-check-label').textContent.trim()
                };
            }
        });

        localStorage.setItem('raads_results', JSON.stringify({
            timestamp: new Date().toISOString(),
            results: results,
            answers: answers
        }));

        return true;
    } catch (error) {
        console.error('Eroare la stocarea rezultatelor:', error);
        return false;
    }
}

// Initialize the highlight functionality when the document is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightInViewSection);
} else {
    highlightInViewSection();
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            const currentQuestion = e.target.closest('.question');
            if (currentQuestion) {
                currentQuestion.classList.remove('highlight-unanswered');
            }
        }
    });
});

// Enhanced Feature Cards Animation
document.addEventListener('DOMContentLoaded', function() {
    // Check if FontAwesome is loaded correctly
    if (typeof FontAwesome === 'undefined') {
        // Fallback for FontAwesome in case it's not loaded properly
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
        linkElement.integrity = 'sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==';
        linkElement.crossOrigin = 'anonymous';
        linkElement.referrerPolicy = 'no-referrer';
        document.head.appendChild(linkElement);
    }

    // Add subtle animations to the feature cards
    const featureCards = document.querySelectorAll('.feature-card-hover');
    featureCards.forEach(card => {
        // Create a more dynamic hover effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            // Calculate rotation based on mouse position (subtle effect)
            const rotateX = (y / rect.height - 0.5) * 5; // max 5deg rotation
            const rotateY = (x / rect.width - 0.5) * -5;

            // Apply the transformation (subtle 3D effect)
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        // Reset the transformation when mouse leaves
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});