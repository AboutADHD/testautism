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

const form = document.getElementById('catqForm');
const questionsContainer = document.getElementById('questions');

// Initialize form with questions
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

// Progress Tracking
const progressContainer = document.querySelector('.progress-container');
const progressFill = document.querySelector('.progress-fill');
const questionsCompleted = document.querySelector('.questions-completed');
const timeEstimate = document.querySelector('.time-estimate');
const progressMessage = document.querySelector('.progress-message');

// Monitor radio changes for progress updates
document.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
        const currentQuestion = e.target.closest('.question');
        if (currentQuestion) {
            currentQuestion.classList.add('completed');
            updateProgress();

            currentQuestion.classList.remove('highlight-unanswered');

            // Also clear any error messages when a question is answered
            const errorDiv = document.getElementById('error');
            const errorBelowDiv = document.getElementById('errorBelow');

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

// Initial progress update
updateProgress();

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const questionsCompleted = document.querySelector('.questions-completed');
    const timeEstimate = document.querySelector('.time-estimate');
    const progressMessage = document.querySelector('.progress-message');

    if (!progressFill || !questionsCompleted || !timeEstimate || !progressMessage) {
        return;
    }

    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const total = questions.length;
    const percentage = (answered / total) * 100;

    progressFill.style.width = `${percentage}%`;
    questionsCompleted.innerHTML = `<b>${answered}</b> din <b>${total}</b> întrebări`;

    const remainingQuestions = total - answered;
    const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.4), 1);
    timeEstimate.innerHTML = `Timp rămas estimat: <b>${estimatedMinutes} minute</b>`;

    progressMessage.innerHTML = getProgressMessage(percentage, answered);
}

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
    const submitBtn = document.getElementById('submitBtn');

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
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.classList.remove('visible');
    }
}

// Create Score Section Helper
function createScoreSection(title, score, maxScore, threshold, description, category) {
    const percentage = (score / maxScore) * 100;
    const color = score >= threshold ? 'danger' : 'success';

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

// PDF Export Functionality
async function exportToPDF() {
    // Calculate scores directly
    const results = calculateScores();
    const { totalScore, compensationScore, maskingScore, assimilationScore } = results;

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

    const contentHtml = `
        <div style="background: white; color: black; max-width: 515px;">
            <h1 style="font-size: 16px; text-align: center; margin-bottom: 12px; color: black;">
                Rezultate Test CAT-Q
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
                    <strong>NU</strong> trebuie utilizat ca instrument de diagnostic. Pentru evaluări profesionale,
                    vă recomandăm să vizitați <a href="https://www.doctoradhd.com" style="color: #856404; font-weight: bold;">www.doctoradhd.com</a>
                </p>
            </div>

            <div style="text-align: center; background-color: #f8f9fa; padding: 12px; margin: 12px 0; border-radius: 4px;">
                <h2 style="font-size: 14px; margin-bottom: 8px; color: black;">Scor Total: ${totalScore}</h2>
                <p style="color: #666; font-size: 11px; line-height: 1.4;">${getInterpretation(totalScore)}</p>
            </div>

            <h3 style="font-size: 13px; margin: 12px 0; color: black;">Scoruri pe categorii:</h3>

            <div style="margin-bottom: 20px;">
                ${[
                    {
                        name: 'Compensare',
                        score: compensationScore,
                        max: 63,
                        threshold: 31
                    },
                    {
                        name: 'Mascare',
                        score: maskingScore,
                        max: 56,
                        threshold: 28
                    },
                    {
                        name: 'Asimilare',
                        score: assimilationScore,
                        max: 56,
                        threshold: 28
                    }
                ].map(category => {
                    const percentage = (category.score / category.max) * 100;
                    const color = getScoreColor(category.score, category.threshold);
                    return `
                        <div style="margin-bottom: 16px; background: white;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                <strong style="color: black; font-size: 11px;">${category.name}</strong>
                                <span style="color: black; font-size: 11px;">${category.score} / ${category.max}</span>
                            </div>
                            <div style="position: relative; height: 16px; background-color: #e9ecef; border-radius: 3px; overflow: hidden;">
                                <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${percentage}%; background-color: ${color};"></div>
                                <div style="position: absolute; left: ${(category.threshold/category.max)*100}%; top: 0; height: 100%; width: 2px; background-color: black;"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-top: 2px; font-size: 9px; color: #666;">
                                <span>0</span>
                                <span>Prag: ${category.threshold}</span>
                                <span>${category.max}</span>
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

    // Add questions and answers
    let questionIndex = 0;
    questions.forEach((question, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            const questionDiv = document.createElement('div');
            questionDiv.style.cssText = `margin-bottom: 30px; color: black;`;

            if ((questionIndex + 1) % 9 === 0) {
                questionDiv.style.pageBreakAfter = 'always';
            }

            questionDiv.innerHTML = `
                <p style="margin-bottom: 5px; font-weight: bold; color: black;">
                    ${index + 1}. ${question.text}
                </p>
                <p style="margin-left: 15px; margin-bottom: 20px; color: black;">
                    Răspuns: ${selected.closest('.form-check').querySelector('.form-check-label').textContent.trim()}
                </p>
            `;

            container.appendChild(questionDiv);
            questionIndex++;
        }
    });

    // PDF generation options
    const opt = {
        margin: [25, 20, 25, 20], // [top, right, bottom, left]
        filename: 'rezultate_test_cat_q.pdf',
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
        // Wait for content to render
        await new Promise(resolve => setTimeout(resolve, 300));

        // Generate PDF
        await html2pdf().set(opt).from(container).save();

        console.log('PDF generated successfully');
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('A apărut o eroare la generarea PDF-ului. Vă rugăm să încercați din nou.');
    } finally {
        // Clean up
        document.body.removeChild(container);
    }
}

// Facebook Share Functionality
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
    const progressContainer = document.querySelector('.progress-container');
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
    const progressContainer = document.querySelector('.progress-container');
    const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

    window.scrollTo({
        top: questionElement.offsetTop - offset,
        behavior: 'smooth'
    });
}

// Add event listener for restart confirmation
document.getElementById('confirmRestartBtn').addEventListener('click', restartTest);

// Submit button event handler
document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();

    // Reset error states
    const errorDiv = document.getElementById('error');
    const errorBelowDiv = document.getElementById('errorBelow');

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
            const progressContainer = document.querySelector('.progress-container');
            const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

            window.scrollTo({
                top: firstUnanswered.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        }
        return;
    }

    // If all questions are answered, proceed with scoring
    const scores = calculateScores();
    displayResults(scores);

    // Hide progress bar and error messages after completion
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.classList.remove('visible');
    }

    // Disable all radio inputs
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });
});