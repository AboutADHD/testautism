// Question definitions with categories
const questions = [
    { id:  1, text: 'Atunci când interacționez cu cineva, îmi copiez în mod deliberat limbajul corporal sau expresiile faciale.', category: "Compensare" },
    { id:  2, text: 'Îmi monitorizez limbajul corporal sau expresiile faciale pentru a părea relaxat(ă).', category: "Mascare" },
    { id:  3, text: 'Rar simt nevoia de a mă preface pentru a trece printr-o situație socială.', category: "Asimilare", reverse: true },
    { id:  4, text: 'Am dezvoltat un scenariu pe care îl urmez în situațiile sociale.', category: "Compensare" },
    { id:  5, text: 'Repet fraze pe care le-am auzit de la alții exact în același mod în care le-am auzit prima dată.', category: "Compensare" },
    { id:  6, text: 'Îmi ajustez limbajul corporal sau expresiile faciale pentru a părea interesat(ă) de persoana cu care interacționez.', category: "Mascare" },
    { id:  7, text: 'În situațiile sociale, simt că „interpretez" un rol mai degrabă decât că sunt eu însumi/însămi.', category: "Asimilare" },
    { id:  8, text: 'În propriile mele interacțiuni sociale, folosesc comportamente pe care le-am învățat observându-i pe alții.', category: "Compensare" },
    { id:  9, text: 'Mă gândesc întotdeauna la impresia pe care o las asupra altor persoane.', category: "Mascare" },
    { id: 10, text: 'Am nevoie de sprijinul altor persoane pentru a socializa.', category: "Asimilare" },
    { id: 11, text: 'Exersez expresiile faciale și limbajul corporal pentru a mă asigura că arată natural.', category: "Compensare" },
    { id: 12, text: 'Nu simt nevoia de a face contact vizual cu alte persoane dacă nu vreau.', category: "Mascare", reverse: true },
    { id: 13, text: 'Trebuie să mă forțez să interacționez cu oamenii atunci când sunt în situații sociale.', category: "Asimilare" },
    { id: 14, text: 'Am încercat să îmi îmbunătățesc înțelegerea abilităților sociale observându-i pe alții.', category: "Compensare" },
    { id: 15, text: 'Îmi monitorizez limbajul corporal sau expresiile faciale pentru a părea interesat(ă) de persoana cu care interacționez.', category: "Mascare" },
    { id: 16, text: 'În situațiile sociale, încerc să găsesc modalități de a evita interacțiunea cu ceilalți.', category: "Asimilare" },
    { id: 17, text: 'Am cercetat regulile interacțiunilor sociale pentru a-mi îmbunătăți propriile abilități sociale.', category: "Compensare" },
    { id: 18, text: 'Sunt întotdeauna conștient(ă) de impresia pe care o las asupra altor persoane.', category: "Mascare" },
    { id: 19, text: 'Mă simt liber(ă) să fiu eu însumi/însămi atunci când sunt cu alte persoane.', category: "Asimilare", reverse: true },
    { id: 20, text: 'Învăț cum folosesc oamenii corpul și fața pentru a interacționa urmărind emisiuni TV sau filme, sau citind ficțiune.', category: "Compensare" },
    { id: 21, text: 'Îmi ajustez limbajul corporal sau expresiile faciale pentru a părea relaxat(ă).', category: "Mascare" },
    { id: 22, text: 'Atunci când vorbesc cu alte persoane, simt că conversația curge în mod natural.', category: "Asimilare", reverse: true },
    { id: 23, text: 'Am petrecut timp învățând abilități sociale din emisiuni TV și filme și încerc să le folosesc în interacțiunile mele.', category: "Compensare" },
    { id: 24, text: 'În interacțiunile sociale, nu acord atenție la ceea ce face fața sau corpul meu.', category: "Mascare", reverse: true },
    { id: 25, text: 'În situațiile sociale, simt că mă prefac că sunt „normal(ă)".', category: "Asimilare" }
];

// Cache form elements
const form = document.getElementById('catqForm');
const questionsContainer = document.getElementById('questions');
const errorDiv = document.getElementById('error');
const errorBelowDiv = document.getElementById('errorBelow');
const submitBtn = document.getElementById('submitBtn');

// Helper Functions
function getHelpText(category) {
    const helpTexts = {
        "Compensare": "Strategii folosite pentru a compensa activ dificultățile în situații sociale.",
        "Mascare": "Strategii folosite pentru a ascunde caracteristicile autiste.",
        "Asimilare": "Strategii folosite pentru a încerca să se potrivească cu ceilalți în situații sociale."
    };
    return helpTexts[category] || "";
}

function getInterpretation(score) {
    if (score < 50) {
        return 'Nivel scăzut de camuflare a trăsăturilor autiste.';
    } else if (score < 100) {
        return 'Nivel moderat de camuflare a trăsăturilor autiste.';
    } else if (score < 150) {
        return 'Nivel ridicat de camuflare a trăsăturilor autiste.';
    } else {
        return 'Nivel foarte ridicat de camuflare a trăsăturilor autiste.';
    }
}

function getProgressMessage(percentage, answered) {
    if (percentage === 0) return '🚀 Hai să începem! Primul pas este cel mai important! 💫';
    if (percentage <= 25) return '🌟 Minunat început! Continuă tot așa! 💪';
    if (percentage <= 50) return '🎯 La jumătatea drumului! Ești pe drumul cel bun! ⭐';
    if (percentage <= 75) return '💫 Excelent progres! Mai puțin de un sfert rămas! 🎈';
    if (percentage < 100) return '🎊 Aproape gata! Încă puțin! 🌟';
    return '🎉 FELICITĂRI! Ai completat tot testul! 🎯 Clic pe butonul CALCULEAZĂ SCOR pentru a vedea rezultatele!';
}

// DOM Initialization - Create the form
questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question', 'mb-4');
    questionDiv.setAttribute('role', 'group');
    questionDiv.setAttribute('aria-labelledby', `question-${index}-label`);
    questionDiv.setAttribute('data-question-number', index + 1);

    // Question label container
    const questionLabel = document.createElement('div');
    questionLabel.id = `question-${index}-label`;
    questionLabel.classList.add('question-text');
    questionLabel.innerHTML = `${index + 1}. ${question.text}`;

    // Add category indicator for screen readers
    const categoryNote = document.createElement('span');
    categoryNote.classList.add('sr-only');
    categoryNote.innerHTML = ` (${question.category})`;
    questionLabel.appendChild(categoryNote);

    questionDiv.appendChild(questionLabel);

    // Create fieldset for radio buttons
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('options');

    // Add legend for screen readers
    const legend = document.createElement('legend');
    legend.classList.add('sr-only');
    legend.innerHTML = `Opțiuni pentru întrebarea ${index + 1}`;
    fieldset.appendChild(legend);

    const options = [
        {
            label: "Dezacord puternic",
            value: question.reverse ? "7" : "1",
            description: "Dezacord total sau puternic cu afirmația"
        },
        {
            label: "Dezacord",
            value: question.reverse ? "6" : "2",
            description: "Dezacord sau respingere a afirmației"
        },
        {
            label: "Ușor dezacord",
            value: question.reverse ? "5" : "3",
            description: "Ușoară dezaprobare sau respingere a afirmației"
        },
        {
            label: "Neutru",
            value: "4",
            description: "Nici acord, nici dezacord cu afirmația"
        },
        {
            label: "Ușor acord",
            value: question.reverse ? "3" : "5",
            description: "Ușoară aprobare sau acceptare a afirmației"
        },
        {
            label: "Acord",
            value: question.reverse ? "2" : "6",
            description: "Acord sau acceptare a afirmației"
        },
        {
            label: "Acord puternic",
            value: question.reverse ? "1" : "7",
            description: "Acord total sau puternic cu afirmația"
        }
    ];

    options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        label.classList.add('form-check');
        label.setAttribute('for', `q${index}o${optionIndex}`);

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `q${index}o${optionIndex}`;
        input.name = `q${index}`;
        input.value = option.value;
        input.classList.add('form-check-input');
        input.setAttribute('aria-describedby', `q${index}o${optionIndex}-desc`);

        const span = document.createElement('span');
        span.classList.add('form-check-label');
        span.innerHTML = option.label;

        // Add description for screen readers
        const description = document.createElement('span');
        description.id = `q${index}o${optionIndex}-desc`;
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
    helpButton.setAttribute('aria-controls', `help-${index}`);

    const helpContent = document.createElement('div');
    helpContent.id = `help-${index}`;
    helpContent.classList.add('help-content');
    helpContent.setAttribute('hidden', '');
    helpContent.innerHTML = `
        <div class="alert alert-info mt-2">
            <p>Această întrebare face parte din categoria: <strong>${question.category}</strong></p>
            <p>${getHelpText(question.category)}</p>
            <p>Selectați opțiunea care descrie cel mai bine experiența dumneavoastră.</p>
        </div>
    `;

    questionDiv.appendChild(helpButton);
    questionDiv.appendChild(helpContent);

    questionsContainer.appendChild(questionDiv);
});

// Progress Tracking
const progressContainer = document.querySelector('.progress-container');
const progressFill = document.querySelector('.progress-fill');
const questionsCompleted = document.querySelector('.questions-completed');
const timeEstimate = document.querySelector('.time-estimate');
const progressMessage = document.querySelector('.progress-message');

// Update progress function
function updateProgress() {
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const total = questions.length;
    const percentage = (answered / total) * 100;

    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (questionsCompleted) questionsCompleted.innerHTML = `<b>${answered}</b> din <b>${total}</b> întrebări`;

    const remainingQuestions = total - answered;
    const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.4), 1);
    if (timeEstimate) timeEstimate.innerHTML = `Timp rămas estimat: <b>${estimatedMinutes} minute</b>`;

    if (progressMessage) progressMessage.innerHTML = getProgressMessage(percentage, answered);
}

// Initial progress update
updateProgress();

// Score Calculation
function calculateScores() {
    let totalScore = 0;
    let compensationScore = 0;
    let maskingScore = 0;
    let assimilationScore = 0;

    questions.forEach((question, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            const score = parseInt(selected.value);
            totalScore += score;

            switch(question.category) {
                case "Compensare": compensationScore += score; break;
                case "Mascare": maskingScore += score; break;
                case "Asimilare": assimilationScore += score; break;
            }
        }
    });

    return {
        totalScore,
        compensationScore,
        maskingScore,
        assimilationScore
    };
}

// Results Display
function displayResults({ totalScore, compensationScore, maskingScore, assimilationScore }) {
    const resultDiv = document.getElementById('section-results');

    if (!resultDiv || !submitBtn) return;

    const interpretation = getInterpretation(totalScore);

    resultDiv.innerHTML = `
        <div class="result-card">
            <div class="card-header bg-white py-3">
                <h2 class="card-title text-center mb-0 fw-bold">Rezultatele testului CAT-Q</h2>
            </div>

            <div class="card-body p-4">
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="total-score-section text-center p-4 mb-4"
                             style="background-color: #f8f9fa; border-radius: 8px;">
                            <h3 class="h4 mb-3">Scor Total</h3>
                            <div class="display-4 mb-2 total-score"
                                 data-value="${totalScore}">
                                ${totalScore}
                            </div>
                            <p class="mb-0 text-muted interpretation-text">
                                ${interpretation}
                            </p>
                        </div>
                    </div>
                </div>

                <h4 class="mb-4 fw-bold">Scoruri pe categorii</h4>

                ${createScoreSection(
                    "Compensare",
                    compensationScore,
                    63,
                    31,
                    "Strategii folosite pentru a compensa activ dificultățile în situații sociale.",
                    "compensation"
                )}

                ${createScoreSection(
                    "Mascare",
                    maskingScore,
                    56,
                    28,
                    "Strategii folosite pentru a ascunde caracteristicile autiste.",
                    "masking"
                )}

                ${createScoreSection(
                    "Asimilare",
                    assimilationScore,
                    56,
                    28,
                    "Strategii folosite pentru a încerca să se potrivească cu ceilalți în situații sociale.",
                    "assimilation"
                )}

                <!-- Color Legend -->
                <div class="score-legend">
                    <div class="legend-item">
                        <div class="legend-color legend-green"></div>
                        <span>Sub prag</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color legend-yellow"></div>
                        <span>Aproape de prag</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color legend-red"></div>
                        <span>Peste prag</span>
                    </div>
                </div>

                <div class="action-buttons mt-4">
                    <button onclick="shareToFacebook()" class="btn btn-primary action-btn mb-3">
                        <i class="fab fa-facebook-f"></i> Distribuie pe Facebook
                    </button>
                    <button onclick="exportToPDF()" class="btn btn-success action-btn mb-3">
                        <i class="fas fa-file-pdf"></i> Exportă ca PDF
                    </button>
                    <button onclick="showRestartWarning()" class="btn btn-danger action-btn">
                        <i class="fas fa-redo"></i> Începe un nou test
                    </button>
                </div>
            </div>
        </div>
    `;

    resultDiv.style.display = 'block';
    submitBtn.style.display = 'none';

    // Store scores in data attributes
    resultDiv.dataset.totalScore = totalScore;
    resultDiv.dataset.compensationScore = compensationScore;
    resultDiv.dataset.maskingScore = maskingScore;
    resultDiv.dataset.assimilationScore = assimilationScore;

    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Hide progress bar
    if (progressContainer) {
        progressContainer.classList.remove('visible');
    }
}

// Function to get appropriate color class based on score and threshold
function getColorClass(score, threshold) {
    if (score >= threshold) {
        return 'danger';  // Red for scores at or above threshold
    } else if (score >= threshold * 0.8) {
        return 'warning'; // Yellow/Amber for scores close to threshold (80-99%)
    } else {
        return 'success'; // Green for scores well below threshold
    }
}

// Create Score Section Helper
function createScoreSection(title, score, maxScore, threshold, description, category) {
    const percentage = (score / maxScore) * 100;
    const color = getColorClass(score, threshold);

    return `
        <div class="score-section" data-category="${category}">
            <div class="score-label">${title}</div>
            <div class="score-value" data-score="${score}" data-max="${maxScore}" data-threshold="${threshold}">
                ${score} / ${maxScore}
            </div>
            <div class="score-bar">
                <div class="score-fill bg-${color}" style="width: ${percentage}%"></div>
                <div class="threshold-marker" style="left: ${(threshold/maxScore)*100}%"></div>
            </div>
            <div class="score-description mt-2">${description}</div>
        </div>
    `;
}

// Optimized PDF Generation with better error handling
async function generateRomanianPDF() {
    try {
        // Calculate scores
        const scores = calculateScores();
        const { totalScore, compensationScore, maskingScore, assimilationScore } = scores;

        // Create PDF document with optimal settings
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true
        });

        // Try to add Open Sans font (good diacritics support)
        try {
            // Check if font is already available
            if (!doc.getFontList().hasOwnProperty('open-sans-regular')) {
                // Load OpenSans font from CDN
                const openSansBold = "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf";
                const openSansRegular = "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf";

                // Add font if supported
                if (typeof doc.addFont === 'function') {
                    doc.addFont(openSansRegular, "OpenSans", "normal");
                    doc.addFont(openSansBold, "OpenSans", "bold");
                }
            }

            // Set font
            try {
                doc.setFont("OpenSans", "normal");
            } catch (e) {
                console.log("Using default font as OpenSans couldn't be set:", e);
            }
        } catch (fontError) {
            console.log("Couldn't load font, using default:", fontError);
        }

        // Helper function for text with proper Romanian diacritics support
        const addSafeText = (text, x, y, options = {}) => {
            const {
                fontSize = 11,
                fontStyle = 'normal',
                color = [0, 0, 0],
                align = 'left',
                maxWidth = 170
            } = options;

            // Set font and color
            doc.setFontSize(fontSize);
            try {
                doc.setFont("OpenSans", fontStyle);
            } catch (e) {
                doc.setFont("helvetica", fontStyle);
            }
            doc.setTextColor(...color);

            // Preprocess text for better diacritics handling
            const processedText = text ? text.replace(/ț/g, "ţ").replace(/Ț/g, "Ţ") : "";

            // Split text into lines with automatic wrapping
            const textLines = doc.splitTextToSize(processedText, maxWidth);

            // Determine X coordinate based on alignment and render
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
                // Left alignment (default)
                textLines.forEach(line => {
                    doc.text(line, x, y);
                    y += fontSize * 0.5;
                });
            }

            return y + fontSize * 0.25; // Return new Y position
        };

        // Helper function to draw progress bar with threshold indicator
        const drawProgressBar = (x, y, width, height, percentage, thresholdPercentage, color) => {
            // Draw background
            doc.setFillColor(238, 238, 238);
            doc.roundedRect(x, y, width, height, 1, 1, 'F');

            // Draw progress bar
            if (percentage > 0) {
                doc.setFillColor(...color);
                const fillWidth = (percentage / 100) * width;
                doc.roundedRect(x, y, fillWidth, height, 1, 1, 'F');
            }

            // Draw threshold indicator
            doc.setFillColor(0, 0, 0);
            const thresholdX = x + (width * thresholdPercentage / 100);
            doc.rect(thresholdX, y - 1, 0.7, height + 2, 'F');

            return y + height; // Return new Y position
        };

        // Helper for score color
        function getScoreColor(score, threshold) {
            if (score >= threshold) {
                return [244, 67, 54]; // Red (danger)
            } else if (score >= threshold * 0.8) {
                return [255, 193, 7]; // Yellow/Amber (warning)
            } else {
                return [76, 175, 80]; // Green (success)
            }
        }

        // Generate PDF content
        let y = 20; // Initial Y position

        // Add title
        addSafeText("Rezultate Test CAT-Q", 105, y, {
            fontSize: 18,
            align: 'center'
        });

        // Add source
        y += 10;
        addSafeText("Rezultate generate de www.testautism.ro", 105, y, {
            fontSize: 10,
            align: 'center'
        });

        // Add disclaimer
        y += 10;
        addSafeText("IMPORTANT: Acest test este destinat EXCLUSIV în scop informativ și NU trebuie utilizat ca un instrument de diagnostic. Pentru evaluări profesionale, vă recomandăm să vizitați www.doctoradhd.com", 105, y, {
            fontSize: 9,
            fontStyle: 'bold',
            color: [221, 44, 0],
            align: 'center',
            maxWidth: 170
        });

        // Add total score
        y += 20;
        addSafeText(`Scor Total: ${totalScore}`, 105, y, {
            fontSize: 16,
            align: 'center'
        });

        // Add interpretation
        y += 8;
        const interpretation = getInterpretation(totalScore);
        y = addSafeText(`Interpretare: ${interpretation}`, 105, y, {
            fontSize: 12,
            align: 'center',
            maxWidth: 170
        });

        // Add category scores title
        y += 10;
        addSafeText("Scoruri pe categorii:", 20, y, {
            fontSize: 14
        });

        // Add category scores
        y += 10;
        const categories = [
            { name: 'Compensare', score: compensationScore, threshold: 31, max: 63 },
            { name: 'Mascare', score: maskingScore, threshold: 28, max: 56 },
            { name: 'Asimilare', score: assimilationScore, threshold: 28, max: 56 }
        ];

        categories.forEach(category => {
            // Add category information
            addSafeText(`${category.name}: ${category.score} / ${category.max} (Prag: ${category.threshold})`, 25, y, {
                fontSize: 12
            });
            y += 6;

            // Calculate percentages and color
            const percentage = (category.score / category.max) * 100;
            const thresholdPercentage = (category.threshold / category.max) * 100;
            const color = getScoreColor(category.score, category.threshold);

            // Draw progress bar
            y = drawProgressBar(25, y, 150, 4, percentage, thresholdPercentage, color) + 2;
            y += 5;
        });

        // Add legend
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

        // Add questions and answers
        y += 15;
        addSafeText("Răspunsuri la întrebări:", 20, y, { fontSize: 14 });
        y += 8;

        let pageCount = 1;

        // Prepare questions and answers list
        const questionAnswers = [];
        questions.forEach((question, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected) {
                questionAnswers.push({
                    id: index + 1,
                    text: question.text,
                    category: question.category,
                    answer: selected.closest('.form-check').querySelector('.form-check-label').textContent.trim()
                });
            }
        });

        // Add answers
        questionAnswers.forEach((qa, index) => {
            // Check if we need a new page (conservative estimate)
            if (y > 270) {
                doc.addPage();
                pageCount++;
                y = 20;

                // Add page header
                addSafeText(`Rezultate Test CAT-Q - Pagina ${pageCount}`, 105, 10, {
                    fontSize: 10,
                    align: 'center'
                });
            }

            // Add question
            const questionText = `${qa.id}. ${qa.text}`;
            y = addSafeText(questionText, 20, y, {
                fontSize: 11,
                fontStyle: 'bold',
                maxWidth: 170
            });

            // Add category
            const categoryText = `Categorie: ${qa.category}`;
            y = addSafeText(categoryText, 25, y, {
                fontSize: 10,
                fontStyle: 'italic',
                maxWidth: 165
            });

            // Add answer
            const answerText = `Răspuns: ${qa.answer}`;
            y = addSafeText(answerText, 25, y, {
                fontSize: 10,
                maxWidth: 165
            });

            y += 3; // Space after each answer
        });

        // Add test date on last page
        addSafeText(`Data testului: ${new Date().toLocaleDateString('ro-RO')}`, 20, 280, {
            fontSize: 9
        });

        return doc.output('blob');
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

// Simpler backup PDF generation method using normalized diacritics
function generateBackupPDF() {
    try {
        // Calculate scores
        const scores = calculateScores();
        const { totalScore, compensationScore, maskingScore, assimilationScore } = scores;

        // Create PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Function to normalize Romanian text for maximum compatibility
        const normalizeRomanian = (text) => {
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
                .replace(/Ț/g, 'T');
        };

        // Define working variables
        let y = 20;

        // Add title
        doc.setFontSize(16);
        doc.text('Rezultate Test CAT-Q', 105, y, { align: 'center' });

        // Add total score
        y += 20;
        doc.setFontSize(14);
        doc.text(`Scor Total: ${totalScore}`, 105, y, { align: 'center' });

        // Add interpretation
        y += 10;
        doc.setFontSize(12);
        doc.text(`Interpretare: ${normalizeRomanian(getInterpretation(totalScore))}`, 105, y, { align: 'center' });

        // Add categories
        y += 20;
        doc.text(normalizeRomanian('Scoruri pe categorii:'), 20, y);
        y += 10;

        // Category scores
        doc.text(normalizeRomanian(`Compensare: ${compensationScore} / 63`), 20, y);
        y += 10;
        doc.text(normalizeRomanian(`Mascare: ${maskingScore} / 56`), 20, y);
        y += 10;
        doc.text(normalizeRomanian(`Asimilare: ${assimilationScore} / 56`), 20, y);

        // Add answers
        y += 20;
        doc.text(normalizeRomanian('Răspunsuri la întrebări:'), 20, y);
        y += 10;

        // Iterate through questions and answers
        let pageCount = 1;

        questions.forEach((question, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (!selected) return;

            // Check if we need a new page
            if (y > 270) {
                doc.addPage();
                pageCount++;
                y = 20;

                // Add page header
                doc.setFontSize(10);
                doc.text(`Rezultate Test CAT-Q - Pagina ${pageCount}`, 105, 10, { align: 'center' });
                doc.setFontSize(12);
            }

            // Add question
            const questionText = normalizeRomanian(`${index + 1}. ${question.text}`);
            doc.setFontSize(10);

            // Split text if too long
            const splitQuestion = doc.splitTextToSize(questionText, 180);
            doc.text(splitQuestion, 20, y);
            y += splitQuestion.length * 7;

            // Add category
            const categoryText = normalizeRomanian(`Categorie: ${question.category}`);
            const splitCategory = doc.splitTextToSize(categoryText, 170);
            doc.text(splitCategory, 25, y);
            y += splitCategory.length * 7;

            // Add answer
            const answerText = normalizeRomanian(`Răspuns: ${selected.closest('.form-check').querySelector('.form-check-label').textContent.trim()}`);
            const splitAnswer = doc.splitTextToSize(answerText, 170);
            doc.text(splitAnswer, 25, y);
            y += splitAnswer.length * 7 + 5; // Add space after answer
        });

        // Add test date
        doc.setFontSize(8);
        doc.text(`Data testului: ${new Date().toLocaleDateString('ro-RO')}`, 20, 280);

        return doc.output('blob');
    } catch (error) {
        console.error('Backup PDF generation error:', error);
        throw error;
    }
}

// Unified export function with fallback mechanisms
async function exportToPDF() {
    // Disable export button while generating
    const exportBtn = document.querySelector('.btn-success');
    if (exportBtn) {
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Se generează PDF-ul...';
    }

    try {
        // Try methods in order, from best to simplest
        let pdfBlob;

        // Method 1: Try the embedded font method
        try {
            console.log("Trying primary PDF generation method...");
            pdfBlob = await generateRomanianPDF();
            console.log("PDF successfully generated using the primary method!");
        } catch (error1) {
            console.warn("First method failed:", error1);

            // Method 2: Try the backup method
            try {
                console.log("Trying backup PDF generation method...");
                pdfBlob = await generateBackupPDF();
                console.log("PDF successfully generated using the backup method!");
            } catch (error2) {
                console.warn("Second method failed:", error2);
                throw new Error("Could not generate PDF with any available method!");
            }
        }

        // PDF was generated, now open/download it
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'rezultate_test_cat_q.pdf';
        document.body.appendChild(downloadLink);

        // Special handling for Facebook browser
        if (navigator.userAgent.match(/(FBAN|FBAV)/i)) {
            window.open(blobUrl, '_blank');
        } else {
            downloadLink.click();
        }

        // Clean up resources
        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(downloadLink);
        }, 1000);

        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
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

// Facebook Share functionality
function shareToFacebook() {
    const scores = calculateScores();
    const shareText = `Am obținut un scor de ${scores.totalScore} la testul CAT-Q de evaluare a tendințelor de camuflare a trăsăturilor autiste. Află mai multe despre camuflarea autistă pe testautism.ro`;

    const shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' +
                    encodeURIComponent(window.location.href) +
                    '&quote=' + encodeURIComponent(shareText);

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Restart Functionality
function showRestartWarning() {
    const modal = new bootstrap.Modal(document.getElementById('restartWarningModal'));
    modal.show();
}

function restartTest() {
    // Reset progress container
    if (progressContainer) {
        progressContainer.style.display = '';
        setTimeout(() => progressContainer.classList.add('visible'), 10);
    }

    // Reset form elements
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
        radio.disabled = false;
    });

    // Reset question states
    document.querySelectorAll('.question').forEach(question => {
        question.classList.remove('completed', 'current', 'highlight-unanswered');
    });

    // Add current class to first question
    const firstQuestion = document.querySelector('.question');
    if (firstQuestion) {
        firstQuestion.classList.add('current');
    }

    // Reset UI elements
    const resultDiv = document.getElementById('section-results');
    const submitBtn = document.getElementById('submitBtn');
    const errorDiv = document.getElementById('error');
    const errorBelowDiv = document.getElementById('errorBelow');

    if (resultDiv) resultDiv.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'block';
    if (errorDiv) errorDiv.style.display = 'none';
    if (errorBelowDiv) errorBelowDiv.style.display = 'none';

    // Hide modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('restartWarningModal'));
    if (modal) modal.hide();

    // Reset progress
    updateProgress();

    // Scroll to first question
    if (firstQuestion) {
        scrollToQuestion(firstQuestion);
    }
}

// Helper function for scrolling
function scrollToQuestion(questionElement) {
    const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

    window.scrollTo({
        top: questionElement.offsetTop - offset,
        behavior: 'smooth'
    });
}

// Setup Event Listeners
document.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
        const currentQuestion = e.target.closest('.question');
        if (currentQuestion) {
            currentQuestion.classList.add('completed');
            updateProgress();

            currentQuestion.classList.remove('highlight-unanswered');

            // Also clear any error messages when a question is answered
            if (errorDiv) {
                errorDiv.style.display = 'none';
                errorDiv.innerHTML = '';
            }
            if (errorBelowDiv) {
                errorBelowDiv.style.display = 'none';
                errorBelowDiv.innerHTML = '';
            }

            // Find next unanswered question
            const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                .find(q => !q.querySelector('input[type="radio"]:checked'));

            if (nextUnanswered) {
                document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                nextUnanswered.classList.add('current');
                scrollToQuestion(nextUnanswered);
            }
        }
    }
});

// Monitor scroll for progress bar visibility
window.addEventListener('scroll', () => {
    const testContainer = document.getElementById('questions');
    if (testContainer) {
        const rect = testContainer.getBoundingClientRect();
        const hasAnswers = document.querySelector('input[type="radio"]:checked') !== null;

        if (rect.top <= 0 && rect.bottom >= 0 && hasAnswers) {
            progressContainer.classList.add('visible');
        } else {
            progressContainer.classList.remove('visible');
        }
    }
});

// Add event listener for restart confirmation
document.getElementById('confirmRestartBtn').addEventListener('click', restartTest);

// Submit button event handler
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Reset error states
    if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.innerHTML = '';
    }
    if (errorBelowDiv) {
        errorBelowDiv.style.display = 'none';
        errorBelowDiv.innerHTML = '';
    }

    // Clear previous highlights
    document.querySelectorAll('.highlight-unanswered').forEach(el => {
        el.classList.remove('highlight-unanswered');
    });

    // Check for unanswered questions
    let unanswered = [];
    questions.forEach((_, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (!selected) {
            unanswered.push(index + 1);
            const questionDiv = document.querySelector(`[data-question-number="${index + 1}"]`);
            if (questionDiv) {
                questionDiv.classList.add('highlight-unanswered');
            }
        }
    });

    // Handle unanswered questions with more detailed error message
    if (unanswered.length > 0) {
        const errorMessage = `
            <div class="alert-heading mb-2">
                <i class="fas fa-exclamation-circle"></i>
                Te rog să răspunzi la toate întrebările
            </div>
            <p class="mb-2">Întrebări fără răspuns: ${unanswered.join(', ')}</p>
            <small class="text-muted">
                Click pe numere pentru a naviga la întrebările respective
            </small>
        `;

        if (errorDiv) {
            errorDiv.innerHTML = errorMessage;
            errorDiv.style.display = 'block';
        }
        if (errorBelowDiv) {
            errorBelowDiv.innerHTML = errorMessage;
            errorBelowDiv.style.display = 'block';
        }

        // Add click handlers to question numbers in error message
        const numberLinks = document.querySelectorAll('.alert-danger');
        numberLinks.forEach(alert => {
            alert.addEventListener('click', (e) => {
                const number = e.target.textContent;
                if (!isNaN(number)) {
                    const questionDiv = document.querySelector(`[data-question-number="${number}"]`);
                    if (questionDiv) {
                        scrollToQuestion(questionDiv);
                    }
                }
            });
        });

        // Find and scroll to first unanswered with proper offset
        const firstUnanswered = document.querySelector('.highlight-unanswered');
        if (firstUnanswered) {
            scrollToQuestion(firstUnanswered);
        }
        return;
    }

    // If all questions are answered, proceed with scoring
    const scores = calculateScores();
    displayResults(scores);

    // Hide progress bar and error messages after completion
    if (progressContainer) {
        progressContainer.classList.remove('visible');
    }

    // Disable all radio inputs
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });
});

// Navigation highlighting for CAT-Q page
function updateQuickNav() {
    // Get current scroll position
    const scrollPosition = window.scrollY;

    // Get all sections that can be navigated to
    const sections = document.querySelectorAll('div[id^="section-"], #first-disclaimer');

    // Remove active class from all navigation items
    document.querySelectorAll('.quick-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Find which section is currently in view
    let currentSection = '';
    sections.forEach(section => {
        // Get section position and dimensions
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if this section is in view (with 200px offset for better UX)
        if (scrollPosition >= (sectionTop - 200) &&
            scrollPosition < (sectionTop + sectionHeight - 200)) {

            // Handle special case for the disclaimer which should highlight the quiz nav item
            if (section.id === 'first-disclaimer') {
                currentSection = '#section-quiz';
            } else {
                currentSection = '#' + section.id;
            }
        }
    });

    // If a section is in view, highlight its navigation item
    if (currentSection) {
        const activeNavItem = document.querySelector(`.quick-nav-item[href="${currentSection}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }
}

// Help buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update navigation immediately
    updateQuickNav();

    // Update navigation on scroll
    window.addEventListener('scroll', updateQuickNav);

    // Find all help buttons and add click event listeners
    document.querySelectorAll('.help-button').forEach(button => {
        button.addEventListener('click', function() {
            // Get the target help content ID from aria-controls attribute
            const targetId = this.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);

            // Toggle aria-expanded state
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            // Toggle the hidden attribute on the help content
            if (isExpanded) {
                targetContent.hidden = true;
            } else {
                targetContent.hidden = false;
            }
        });
    });
});

/**
 * Advanced Storage Mechanism with Fallbacks
 * Provides a unified API for persistent data storage across browsers and devices
 */
class StorageManager {
    constructor(prefix = 'cat_q_') {
        this.prefix = prefix;
        this.mechanism = this._detectBestMechanism();
        this.debounceTimers = {};
    }

    /**
     * Detects the best available storage mechanism
     * @returns {string} The name of the available mechanism
     */
    _detectBestMechanism() {
        // Check for localStorage availability
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return 'localStorage';
        } catch (e) {
            // Check for sessionStorage availability
            try {
                sessionStorage.setItem('test', 'test');
                sessionStorage.removeItem('test');
                return 'sessionStorage';
            } catch (e) {
                // Last resort: cookies
                return 'cookies';
            }
        }
    }

    /**
     * Builds a prefixed key
     * @param {string} key Base key
     * @returns {string} Prefixed key
     */
    _buildKey(key) {
        return `${this.prefix}${key}`;
    }

    /**
     * Set a value with optional debouncing
     * @param {string} key The key to store under
     * @param {any} value The value to store
     * @param {number} debounceMs Debounce time in milliseconds (0 for immediate)
     */
    set(key, value, debounceMs = 0) {
        const prefixedKey = this._buildKey(key);

        // Clear existing debounce timer if any
        if (this.debounceTimers[prefixedKey]) {
            clearTimeout(this.debounceTimers[prefixedKey]);
        }

        // Set value immediately or with debounce
        if (debounceMs <= 0) {
            this._setValue(prefixedKey, value);
        } else {
            this.debounceTimers[prefixedKey] = setTimeout(() => {
                this._setValue(prefixedKey, value);
                delete this.debounceTimers[prefixedKey];
            }, debounceMs);
        }
    }

    /**
     * Internal method to set value based on available mechanism
     * @param {string} key Prefixed key
     * @param {any} value Value to store
     */
    _setValue(key, value) {
        // Serialize complex values
        const serialized = JSON.stringify(value);

        try {
            switch (this.mechanism) {
                case 'localStorage':
                    localStorage.setItem(key, serialized);
                    break;
                case 'sessionStorage':
                    sessionStorage.setItem(key, serialized);
                    break;
                case 'cookies':
                    // Set cookie with 30-day expiration
                    const expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 30);
                    document.cookie = `${key}=${encodeURIComponent(serialized)};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
                    break;
            }
        } catch (e) {
            console.warn(`Failed to store value for ${key}:`, e);
        }
    }

    /**
     * Get a stored value
     * @param {string} key The key to retrieve
     * @param {any} defaultValue Default value if key doesn't exist
     * @returns {any} The stored value or default
     */
    get(key, defaultValue = null) {
        const prefixedKey = this._buildKey(key);
        let rawValue = null;

        try {
            switch (this.mechanism) {
                case 'localStorage':
                    rawValue = localStorage.getItem(prefixedKey);
                    break;
                case 'sessionStorage':
                    rawValue = sessionStorage.getItem(prefixedKey);
                    break;
                case 'cookies':
                    const cookies = document.cookie.split(';');
                    for (let cookie of cookies) {
                        const [cookieKey, cookieValue] = cookie.trim().split('=');
                        if (cookieKey === prefixedKey) {
                            rawValue = decodeURIComponent(cookieValue);
                            break;
                        }
                    }
                    break;
            }

            if (rawValue === null) {
                return defaultValue;
            }

            return JSON.parse(rawValue);
        } catch (e) {
            console.warn(`Failed to retrieve value for ${key}:`, e);
            return defaultValue;
        }
    }

    /**
     * Remove a stored value
     * @param {string} key The key to remove
     */
    remove(key) {
        const prefixedKey = this._buildKey(key);

        try {
            switch (this.mechanism) {
                case 'localStorage':
                    localStorage.removeItem(prefixedKey);
                    break;
                case 'sessionStorage':
                    sessionStorage.removeItem(prefixedKey);
                    break;
                case 'cookies':
                    document.cookie = `${prefixedKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
                    break;
            }
        } catch (e) {
            console.warn(`Failed to remove value for ${key}:`, e);
        }
    }

    /**
     * Clear all stored values with this prefix
     */
    clearAll() {
        try {
            switch (this.mechanism) {
                case 'localStorage':
                case 'sessionStorage':
                    const storage = this.mechanism === 'localStorage' ? localStorage : sessionStorage;
                    Object.keys(storage).forEach(key => {
                        if (key.startsWith(this.prefix)) {
                            storage.removeItem(key);
                        }
                    });
                    break;
                case 'cookies':
                    const cookies = document.cookie.split(';');
                    for (let cookie of cookies) {
                        const cookieKey = cookie.trim().split('=')[0];
                        if (cookieKey.startsWith(this.prefix)) {
                            document.cookie = `${cookieKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
                        }
                    }
                    break;
            }
        } catch (e) {
            console.warn('Failed to clear all stored values:', e);
        }
    }
}

/**
 * AutoSave Manager for CAT-Q Test
 * Handles saving and restoring test state
 */
class AutoSaveManager {
    constructor() {
        this.storage = new StorageManager('cat_q_');
        this.saveNotificationTimeout = null;
        this.initNotificationSystem();
    }

    /**
     * Initialize notification system for save updates
     */
    initNotificationSystem() {
        // Create notification element if it doesn't exist
        if (!document.getElementById('save-notification')) {
            const notification = document.createElement('div');
            notification.id = 'save-notification';
            notification.className = 'save-notification';
            notification.setAttribute('role', 'status');
            notification.setAttribute('aria-live', 'polite');
            notification.innerHTML = `
                <i class="fas fa-save"></i>
                <span id="save-notification-text">Salvat</span>
            `;
            document.body.appendChild(notification);

            // Add CSS if not already present
            if (!document.getElementById('autosave-styles')) {
                const styleEl = document.createElement('style');
                styleEl.id = 'autosave-styles';
                styleEl.textContent = `
                    .save-notification {
                        position: fixed;
                        bottom: 20px;
                        left: 50%;
                        transform: translateX(-50%) translateY(100px);
                        background: #4CAF50;
                        color: white;
                        padding: 10px 16px;
                        border-radius: 50px;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        opacity: 0;
                        transition: all 0.3s ease;
                        z-index: 1010;
                        font-size: 14px;
                        font-weight: 500;
                        pointer-events: none;
                    }
                    .save-notification.visible {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }

                    @media (max-width: 576px) {
                        .save-notification {
                            bottom: 70px; /* Adjust for bottom nav on mobile */
                        }
                    }

                    .test-restored-banner {
                        background: linear-gradient(45deg, #9C27B0, #673AB7);
                        color: white;
                        padding: 12px 20px;
                        margin-bottom: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        animation: fadeInDown 0.5s ease forwards;
                    }

                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .test-restored-banner .banner-message {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .test-restored-banner .banner-actions {
                        display: flex;
                        gap: 10px;
                    }

                    .test-restored-banner button {
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    }

                    .test-restored-banner button:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }

                    @media (max-width: 768px) {
                        .test-restored-banner {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 10px;
                        }

                        .test-restored-banner .banner-actions {
                            width: 100%;
                            justify-content: space-between;
                        }
                    }
                `;
                document.head.appendChild(styleEl);
            }
        }

        return document.getElementById('save-notification');
    }

    /**
     * Show save notification with custom message
     * @param {string} message Message to display
     * @param {string} type Type of notification (success, info, warning)
     */
    showNotification(message, type = 'success') {
        const notification = document.getElementById('save-notification');
        if (!notification) return;

        // Update notification content
        const textSpan = notification.querySelector('#save-notification-text');
        if (textSpan) textSpan.textContent = message;

        // Update notification appearance based on type
        notification.style.background = type === 'success' ? '#4CAF50' :
                                       type === 'info' ? '#2196F3' :
                                       type === 'warning' ? '#FF9800' : '#4CAF50';

        // Show notification
        notification.classList.add('visible');

        // Clear previous timeout if any
        if (this.saveNotificationTimeout) {
            clearTimeout(this.saveNotificationTimeout);
        }

        // Hide notification after delay
        this.saveNotificationTimeout = setTimeout(() => {
            notification.classList.remove('visible');
        }, 2000);
    }

    /**
     * Save answers and test state
     */
    saveTestState() {
        try {
            // Get current answers
            const answers = {};
            questions.forEach((question, index) => {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                if (selected) {
                    answers[index] = selected.value;
                }
            });

            // Get completion status
            const completed = Object.keys(answers).length === questions.length;

            // Get active question
            const currentQuestionEl = document.querySelector('.question.current');
            let currentQuestionIndex = null;
            if (currentQuestionEl) {
                const questionNumber = currentQuestionEl.getAttribute('data-question-number');
                if (questionNumber) {
                    currentQuestionIndex = parseInt(questionNumber) - 1;
                }
            }

            // Save test state
            const testState = {
                answers,
                timestamp: new Date().toISOString(),
                completed,
                currentQuestionIndex,
                scrollPosition: window.scrollY,
                screenWidth: window.innerWidth, // For responsive adjustments on restore
                lastSaved: new Date().toISOString()
            };

            this.storage.set('test_state', testState, 500); // Debounce by 500ms

            // Save results if test is completed and results are calculated
            if (completed && document.getElementById('section-results').style.display !== 'none') {
                const results = calculateScores();
                this.storage.set('test_results', results);
            }

            return true;
        } catch (error) {
            console.error('Error saving test state:', error);
            return false;
        }
    }

    /**
     * Restore test state from storage
     * @returns {boolean} True if state was restored, false otherwise
     */
    restoreTestState() {
        try {
            const testState = this.storage.get('test_state');
            if (!testState || !testState.answers || Object.keys(testState.answers).length === 0) {
                return false;
            }

            // Restore answers
            let answeredCount = 0;
            Object.entries(testState.answers).forEach(([index, value]) => {
                const input = document.querySelector(`input[name="q${index}"][value="${value}"]`);
                if (input) {
                    input.checked = true;
                    answeredCount++;

                    // Mark question as completed
                    const questionDiv = input.closest('.question');
                    if (questionDiv) {
                        questionDiv.classList.add('completed');
                    }
                }
            });

            // Handle completed test
            if (testState.completed) {
                const results = this.storage.get('test_results');

                // If results exist, show them
                if (results) {
                    displayResults(results);
                    return true;
                }

                // If no saved results but all questions are answered, calculate results
                if (answeredCount === questions.length) {
                    const scores = calculateScores();
                    displayResults(scores);
                    return true;
                }
            }

            // For incomplete test, set current question
            if (testState.currentQuestionIndex !== null) {
                const currentQuestionEl = document.querySelector(`[data-question-number="${testState.currentQuestionIndex + 1}"]`);
                if (currentQuestionEl) {
                    document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                    currentQuestionEl.classList.add('current');
                }
            }

            // Find next unanswered question if no current question
            if (!document.querySelector('.question.current')) {
                const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                    .find(q => !q.querySelector('input[type="radio"]:checked'));

                if (nextUnanswered) {
                    document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                    nextUnanswered.classList.add('current');
                }
            }

            // Update progress
            if (typeof updateProgress === 'function') {
                updateProgress();
            }

            // Show restoration banner
            this.showRestorationBanner(answeredCount, questions.length);

            return true;
        } catch (error) {
            console.error('Error restoring test state:', error);
            return false;
        }
    }

    /**
     * Show banner informing user that test state was restored
     * @param {number} answered Number of answered questions
     * @param {number} total Total number of questions
     */
    showRestorationBanner(answered, total) {
        // Create banner if not already showing
        if (document.querySelector('.test-restored-banner')) return;

        const testForm = document.getElementById('catqForm');
        if (!testForm) return;

        const banner = document.createElement('div');
        banner.className = 'test-restored-banner';
        banner.innerHTML = `
            <div class="banner-message">
                <i class="fas fa-history"></i>
                <div>
                    <strong>Test restaurat!</strong>
                    <span class="d-block d-md-inline">Progres: ${answered} din ${total} întrebări completate.</span>
                </div>
            </div>
            <div class="banner-actions">
                <button id="continue-test-btn">
                    <i class="fas fa-play"></i> Continuă testul
                </button>
                <button id="restart-restored-test-btn">
                    <i class="fas fa-redo"></i> Începe un nou test
                </button>
            </div>
        `;

        testForm.parentNode.insertBefore(banner, testForm);

        // Add event listeners to buttons
        document.getElementById('continue-test-btn').addEventListener('click', () => {
            banner.remove();

            // Scroll to current question
            const currentQuestion = document.querySelector('.question.current');
            if (currentQuestion) {
                const progressContainer = document.querySelector('.progress-container');
                const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

                window.scrollTo({
                    top: currentQuestion.getBoundingClientRect().top + window.pageYOffset - offset,
                    behavior: 'smooth'
                });
            }
        });

        document.getElementById('restart-restored-test-btn').addEventListener('click', () => {
            // Show modal for confirmation if available
            const restartWarningModal = document.getElementById('restartWarningModal');
            if (restartWarningModal) {
                const bsModal = bootstrap.Modal.getOrCreateInstance(restartWarningModal);
                bsModal.show();
            } else {
                // If no modal, confirm directly
                if (confirm('Ești sigur că vrei să începi un nou test? Progresul actual va fi pierdut.')) {
                    this.clearSavedState();
                    restartTest();
                    banner.remove();
                }
            }
        });
    }

    /**
     * Clear saved state
     */
    clearSavedState() {
        this.storage.remove('test_state');
        this.storage.remove('test_results');
    }
}

// Create global instance of AutoSaveManager
const autoSaveManager = new AutoSaveManager();

// Extend the restartTest function to clear saved state
const originalRestartTest = window.restartTest;
window.restartTest = function() {
    // Clear saved state first
    autoSaveManager.clearSavedState();

    // Then call original function (if available)
    if (typeof originalRestartTest === 'function') {
        originalRestartTest();
    } else {
        // Basic restart functionality if original function is missing
        // Reset form elements
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
            radio.disabled = false;
        });

        // Reset question states
        document.querySelectorAll('.question').forEach(question => {
            question.classList.remove('completed', 'current', 'highlight-unanswered');
        });

        // Reset UI elements
        const resultDiv = document.getElementById('section-results');
        const submitBtn = document.getElementById('submitBtn');

        if (resultDiv) resultDiv.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'block';

        // Update progress
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
    }

    // Remove restoration banner if present
    const banner = document.querySelector('.test-restored-banner');
    if (banner) banner.remove();

    // Show notification
    autoSaveManager.showNotification('Test resetat', 'info');
};

// Add auto-save to form changes
document.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
        autoSaveManager.saveTestState();
        autoSaveManager.showNotification('Progres salvat', 'success');
    }
});

// Save on window focus/blur (user switching apps/tabs)
window.addEventListener('focus', () => {
    autoSaveManager.saveTestState();
});

window.addEventListener('blur', () => {
    autoSaveManager.saveTestState();
});

// Save before unload (user closing page)
window.addEventListener('beforeunload', () => {
    autoSaveManager.saveTestState();
});

// Restore state on page load
document.addEventListener('DOMContentLoaded', () => {
    // Attempt to restore state after a slight delay to ensure form is fully loaded
    setTimeout(() => {
        autoSaveManager.restoreTestState();
    }, 300);
});

// Save periodically (every minute)
setInterval(() => {
    autoSaveManager.saveTestState();
}, 60000);