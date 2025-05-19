/**
 * RAADS-R Test Implementation - Optimized Script
 * Handles test scoring, PDF generation, UI interactions and progress tracking
 */

// ===== CONSTANTS AND TEST DATA =====

const questions = [
    // 80 questions as objects with text and inverse flag
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

// ===== UI ELEMENTS =====
const form = document.getElementById('raadsrForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const errorBelowDiv = document.getElementById('errorBelow');
const submitBtn = document.getElementById('submitBtn');
const exportBtn = document.getElementById('exportBtn');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('start-test');
const shareBtn = document.getElementById('shareBtn');
const resultAnnouncer = document.getElementById('result-announcer');

// ===== VALIDATION AND SCORING FUNCTIONS =====

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

/**
 * Get interpretation based on score
 */
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

/**
 * Get detailed category interpretation
 */
function getCategoryInterpretation(category, score) {
    const threshold = RAADS_R_THRESHOLDS[category];
    if (score >= threshold) {
        return `Peste pragul diagnostic (${threshold})`;
    } else {
        return `Sub pragul diagnostic (${threshold})`;
    }
}

/**
 * Helper function to calculate score percentage and get appropriate color
 */
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

/**
 * Create visual score component for the results display
 */
function createScoreVisual(label, score, threshold, maxScore) {
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

/**
 * Store test results in localStorage for redundancy
 */
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

/**
 * Announce result to screen readers
 */
function announceResult(totalScore, interpretation) {
    if (!resultAnnouncer) return;
    resultAnnouncer.textContent = `Rezultat test: Scor total ${totalScore}. ${interpretation}`;
}

// ===== PDF GENERATION FUNCTIONS =====

/**
 * Primary PDF generation function with Romanian diacritics support
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
        throw error;
    }
}

/**
 * Simplified backup PDF generation method
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
 * Robust PDF export function that tries multiple methods until one works
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
                console.error("Toate metodele au eșuat!", error2);
                throw new Error("Nu s-a putut genera PDF-ul cu nicio metodă disponibilă!");
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

// ===== PROGRESS TRACKING =====

/**
 * Get progress message based on completion percentage
 */
function getProgressMessage(percentage, answered) {
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
}

/**
 * Initializes the comprehensive progress tracking system
 * with multidimensional navigation paradigms and cross-platform compatibility
 * 
 * @returns {Object} Public interface with methods for external control
 */
function initProgressBar() {
    // ===== CORE ELEMENT SELECTION =====
    // Main structural elements
    const progressContainer = document.querySelector('.progress-container');
    const progressPrimary = document.querySelector('.progress-primary');
    
    // Progress indicators
    const progressCounter = document.querySelector('.progress-counter');
    const currentQuestionElement = document.querySelector('.current-question');
    const totalQuestionsElement = document.querySelector('.total-questions');
    const progressFill = document.querySelector('.progress-fill');
    const progressMessage = document.querySelector('.progress-message');
    
    // Navigation controls
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const resetBtn = document.querySelector('.reset-btn');
    
    // Temporal indicator elements
    const timeEstimate = document.querySelector('.time-estimate span');
    const saveIndicator = document.querySelector('.save-indicator');
    const saveIndicatorText = document.querySelector('.save-indicator-text');
    
    // ===== INITIALIZATION PROCEDURES =====
    
    // Set total questions from questions array or default to 80
    const totalQuestions = questions?.length || 80;
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = totalQuestions;
    }
    
    // Add milestone markers if not already present
    const milestones = [25, 50, 75];
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
        // Check if milestone markers already exist
        const existingMarkers = progressBar.querySelectorAll('.milestone-marker');
        
        if (existingMarkers.length === 0) {
            milestones.forEach(milestone => {
                const marker = document.createElement('div');
                marker.className = 'milestone-marker';
                marker.style.left = `${milestone}%`;
                marker.setAttribute('title', `${milestone}% completat`);
                marker.setAttribute('aria-hidden', 'true'); // Hide from screen readers as it's decorative
                progressBar.appendChild(marker);
            });
        }
    }
    
    // ===== PROGRESS RESTORATION NOTIFICATION =====
    // Create and show notification for restored progress
    function showProgressRestorationNotification(answered, total) {
        // Remove any existing notification first
        const existingNotification = document.querySelector('.progress-restored-toast');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        if (answered === 0) return; // Don't show for new tests
        
        // Create toast notification
        const notification = document.createElement('div');
        notification.className = 'progress-restored-toast';
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', 'polite');
        
        notification.innerHTML = `
            <div class="toast-icon"><i class="fas fa-history"></i></div>
            <div class="toast-content">
                <strong>Progres restaurat</strong>
                <span>Ai completat ${answered} din ${total} întrebări (${Math.round(answered/total*100)}%)</span>
            </div>
            <button class="toast-close" aria-label="Închide notificarea">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('visible');
        }, 100);
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('visible');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('visible');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // ===== EVENT HANDLERS =====
    
    // Handle navigation buttons with proper tooltip implementation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (window.questionNavigation) {
                window.questionNavigation.navigateToPrevious();
            }
        });
        
        // Add tooltip directly with title attribute and aria-label
        prevBtn.setAttribute('title', 'Întrebarea anterioară (Ctrl/⌘+↑)');
        prevBtn.setAttribute('aria-label', 'Întrebarea anterioară');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (window.questionNavigation) {
                window.questionNavigation.navigateToNext();
            }
        });
        
        // Add tooltip directly with title attribute and aria-label
        nextBtn.setAttribute('title', 'Întrebarea următoare (Ctrl/⌘+↓)');
        nextBtn.setAttribute('aria-label', 'Întrebarea următoare');
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Sigur doriți să resetați testul? Toate răspunsurile vor fi șterse.')) {
                restartTest();
            }
        });
        
        // Add tooltip directly with title attribute and aria-label
        resetBtn.setAttribute('title', 'Resetează testul');
        resetBtn.setAttribute('aria-label', 'Resetează testul');
    }
    
    // Visibility control based on scroll position
    const handleVisibility = () => {
        const testSection = document.getElementById('section-quiz');
        if (testSection) {
            const testRect = testSection.getBoundingClientRect();
            const headerHeight = 60; // Approximate header height
            
            // Show progress bar when top of test section is above viewport top + header
            if (testRect.top <= headerHeight && testRect.bottom > 0) {
                progressContainer.classList.add('visible');
            } else {
                progressContainer.classList.remove('visible');
            }
        }
    };
    
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleVisibility, 100);
    }, { passive: true });
    
    // Apply initial visibility check
    setTimeout(handleVisibility, 300);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleVisibility, 200);
    }, { passive: true });
    
    // ===== CROSS-PLATFORM KEYBOARD NAVIGATION =====
    
    document.addEventListener('keydown', (e) => {
        // Only handle if we're in the test section and progress bar is visible
        if (!progressContainer.classList.contains('visible')) return;
        
        // Support both Ctrl (Windows/Linux) and Command/Meta (macOS)
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (prevBtn) prevBtn.click();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (nextBtn) nextBtn.click();
            }
        }
    });
    
    // ===== PROGRESS TRACKING =====
    
    /**
     * Updates the save indicator with the current time
     * @param {boolean} animate Whether to show animation
     */
    function updateSaveTime(animate = true) {
        if (!saveIndicator || !saveIndicatorText) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('ro-RO', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        saveIndicatorText.textContent = `Salvat ${timeString}`;
        
        if (animate) {
            saveIndicator.classList.add('save-pulse');
            setTimeout(() => {
                saveIndicator.classList.remove('save-pulse');
            }, 2000);
        }
    }
    
    /**
     * Gets the appropriate motivational message based on completion percentage
     * @param {number} percentage Completion percentage (0-100)
     * @param {number} answered Number of answered questions
     * @returns {string} Motivational message
     */
    function getMotivationalMessage(percentage, answered) {
        if (percentage === 0) {
            return '🚀 Hai să începem! Primul pas este cel mai important! 💫';
        } else if (percentage <= 10) {
            return '🌟 Minunat început! Pas cu pas, vei reuși! 💪';
        } else if (percentage <= 20) {
            return '🎯 Ai prins ritmul! Continui excelent! ⭐';
        } else if (percentage <= 30) {
            return `🌈 Super progres! Ai completat deja ${answered} întrebări! 🎉`;
        } else if (percentage <= 40) {
            return '💫 Te descurci extraordinar! Ești pe drumul cel bun! 🎈';
        } else if (percentage <= 50) {
            return '🎊 WOW! Ai ajuns la jumătate! Ești fantastic(ă)! 🌟';
        } else if (percentage <= 60) {
            return '⚡ Impresionant! Mai puțin de jumătate rămas! 🔥';
        } else if (percentage <= 70) {
            return '🎯 Extraordinar! Continui să strălucești! ✨';
        } else if (percentage <= 80) {
            return '🚀 Ești pe ultima sută de metri! Aproape acolo! 💫';
        } else if (percentage <= 90) {
            return '🌟 Fantastic! Mai ai foarte puțin! Ești aproape gata! 🎉';
        } else if (percentage < 100) {
            return '✨ Ultima porțiune! Câteva întrebări și ai terminat! 🎯';
        } else {
            return `
                🎉 FELICITĂRI! 🎉
                <br/>
                <span style="font-size: 0.9em">Ai completat tot testul! Ești minunat(ă)! 🌟</span>
                <br/>
                <span style="font-size: 0.85em; color: #666">Apasă pe butonul albastru <b>CALCULEAZĂ SCORUL</b> pentru rezultate! 🎯</span>
            `;
        }
    }
    
    /**
     * Comprehensively updates all progress indicators
     * @param {number} answered Number of answered questions
     * @param {number} total Total number of questions
     * @param {boolean} showRestorationNotification Whether to show the restoration notification
     */
    function updateProgressDisplay(answered, total, showRestorationNotification = false) {
        const percentage = (answered / total) * 100;
        
        // Update question counter
        if (currentQuestionElement) {
            currentQuestionElement.textContent = answered;
        }
        
        // Update progress bar fill
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
            
            // Update ARIA attributes for accessibility
            const progressBar = progressFill.closest('.progress-bar');
            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', Math.round(percentage));
            }
        }
        
        // Update navigation button states based on position, not answer status
        updateNavButtonsState();
        
        // Update time estimate calculation
        if (timeEstimate) {
            const remainingQuestions = total - answered;
            const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.375), 1);
            timeEstimate.textContent = `${estimatedMinutes} minute`;
        }
        
        // Update motivational message
        if (progressMessage) {
            const message = getMotivationalMessage(percentage, answered);
            progressMessage.innerHTML = message;
            
            // Celebrate milestone achievements
            if (milestones.includes(Math.floor(percentage)) && percentage > 0) {
                progressMessage.classList.add('celebrate');
                setTimeout(() => {
                    progressMessage.classList.remove('celebrate');
                }, 1500);
            }
        }
        
        // Show restoration notification if requested
        if (showRestorationNotification && answered > 0) {
            showProgressRestorationNotification(answered, total);
        }
        
        // Auto-save progress
        updateSaveTime(answered > 0);
    }
    
    /**
     * Update navigation button states based on current question position ONLY
     * Not based on answer status
     */
    function updateNavButtonsState() {
        if (!window.questionNavigation) return;
        
        const currentIndex = window.questionNavigation.getCurrentQuestionIndex();
        const allQuestions = window.questionNavigation.getAllQuestionElements();
        const totalQuestionElements = allQuestions.length;
        
        // Previous button should only be disabled when on the first question
        if (prevBtn) {
            const isFirstQuestion = currentIndex === 0;
            prevBtn.disabled = isFirstQuestion;
            prevBtn.classList.toggle('nav-btn-disabled', isFirstQuestion);
        }
        
        // Next button should only be disabled when on the last question
        if (nextBtn) {
            const isLastQuestion = currentIndex === totalQuestionElements - 1;
            nextBtn.disabled = isLastQuestion;
            nextBtn.classList.toggle('nav-btn-disabled', isLastQuestion);
        }
    }
    
    // ===== FORM CHANGE OBSERVATION =====
    
    /**
     * Set up observer to watch for form changes
     */
    function setupChangeObserver() {
        const form = document.getElementById('raadsrForm');
        if (form) {
            form.addEventListener('change', (e) => {
                if (e.target.type === 'radio') {
                    const total = questions?.length || 80;
                    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
                    
                    updateProgressDisplay(answered, total);
                    
                    // Handle completed question styling
                    const currentQuestion = e.target.closest('.question');
                    if (currentQuestion) {
                        currentQuestion.classList.add('completed');
                        currentQuestion.classList.remove('highlight-unanswered');
                        
                        // Find and navigate to next unanswered question
                        const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                            .find(q => !q.querySelector('input[type="radio"]:checked'));
                            
                        if (nextUnanswered) {
                            // Update current question highlighting
                            document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                            nextUnanswered.classList.add('current');
                            
                            // Calculate scroll position
                            const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;
                            const targetPosition = nextUnanswered.getBoundingClientRect().top + 
                                                 window.pageYOffset - offset;
                            
                            // Smooth scroll to next question
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                        
                        // Always update nav button states after changing current question
                        updateNavButtonsState();
                    }
                }
            });
        }
    }
    
    // Initialize the change observer
    setupChangeObserver();
    
    // ===== INITIAL PROGRESS UPDATE =====
    // Calculate current progress on load
    function initialUpdate() {
        const total = questions?.length || 80;
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        
        // Show restoration notification only if there's saved progress
        const showNotification = answered > 0;
        
        updateProgressDisplay(answered, total, showNotification);
        
        // Initialize save indicator with current time
        updateSaveTime(false);
    }
    
    // Perform initial update
    initialUpdate();
    
    // ===== PUBLIC INTERFACE =====
    // Return methods that can be called from outside
    return {
        /**
         * Updates progress display
         * @param {boolean} showRestorationNotification Whether to show restoration notification
         */
        updateProgress: function(showRestorationNotification = false) {
            const total = questions?.length || 80;
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            updateProgressDisplay(answered, total, showRestorationNotification);
        },
        
        /**
         * Updates save time indicator
         * @param {boolean} animate Whether to show animation
         */
        updateSaveTime: function(animate) {
            updateSaveTime(animate);
        },
        
        /**
         * Manually checks visibility
         */
        checkVisibility: handleVisibility,
        
        /**
         * Manually shows the progress restoration notification
         */
        showProgressRestorationNotification: function() {
            const total = questions?.length || 80;
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            if (answered > 0) {
                showProgressRestorationNotification(answered, total);
            }
        }
    };
}

// Replace the existing updateProgress function
function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const questionsCompleted = document.querySelector('.questions-completed');
    const timeEstimate = document.querySelector('.time-estimate');
    const progressMessage = document.querySelector('.progress-message');

    const total = questions.length || 80;
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const percentage = (answered / total) * 100;

    // Update progress bar if it exists (legacy element)
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }

    // Update stats in legacy format if they exist
    if (questionsCompleted) {
        questionsCompleted.innerHTML = `<b>${answered}</b> din <b>${total}</b> întrebări`;
    }

    if (timeEstimate) {
        const remainingQuestions = total - answered;
        const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.375), 1);
        timeEstimate.innerHTML = `Timp rămas estimat: <b>${estimatedMinutes} minute</b>`;
    }

    // Update motivational message in legacy format if it exists
    if (progressMessage) {
        let message = '';

        if (percentage === 0) {
            message = '🚀 Hai să începem! Primul pas este cel mai important! 💫';
        } else if (percentage <= 10) {
            message = '🌟 Minunat început! Pas cu pas, vei reuși! 💪';
        } else if (percentage <= 20) {
            message = '🎯 Ai prins ritmul! Continui excelent! ⭐';
        } else if (percentage <= 30) {
            message = `🌈 Super progres! Ai completat deja ${answered} întrebări! 🎉`;
        } else if (percentage <= 40) {
            message = '💫 Te descurci extraordinar! Ești pe drumul cel bun! 🎈';
        } else if (percentage <= 50) {
            message = '🎊 WOW! Ai ajuns la jumătate! Ești fantastic(ă)! 🌟';
        } else if (percentage <= 60) {
            message = '⚡ Impresionant! Mai puțin de jumătate rămas! 🔥';
        } else if (percentage <= 70) {
            message = '🎯 Extraordinar! Continui să strălucești! ✨';
        } else if (percentage <= 80) {
            message = '🚀 Ești pe ultima sută de metri! Aproape acolo! 💫';
        } else if (percentage <= 90) {
            message = '🌟 Fantastic! Mai ai foarte puțin! Ești aproape gata! 🎉';
        } else if (percentage < 100) {
            message = '✨ Ultima porțiune! Câteva întrebări și ai terminat! 🎯';
        } else {
            message = `
                🎉 FELICITĂRI! 🎉
                <br/>
                <span style="font-size: 0.9em">Ai completat tot testul! Ești minunat(ă)! 🌟</span>
                <br/>
                <span style="font-size: 0.85em; color: #666">Apasă pe butonul albastru <b>CALCULEAZĂ SCORUL</b> pentru rezultate! 🎯</span>
            `;
        }

        progressMessage.innerHTML = message;
    }

    // Add animated celebration when completing milestones
    const milestones = [20, 40, 60, 80, 100];

    if (milestones.includes(Math.floor(percentage)) && percentage > 0) {
        if (progressMessage) {
            progressMessage.classList.add('milestone-reached');
            setTimeout(() => {
                progressMessage.classList.remove('milestone-reached');
            }, 1500);
        }
    }

    // Update navigation buttons state if they exist
    const currentIndex = window.questionNavigation ? window.questionNavigation.getCurrentQuestionIndex() : 0;
    const totalQuestions = window.questionNavigation ? window.questionNavigation.getAllQuestionElements().length : total;

    updateNavButtonsState(currentIndex, totalQuestions);
}

// Function to update navigation buttons state
function updateNavButtonsState(currentIndex, totalQuestions) {
    const prevQuestionBtn = document.getElementById('prev-question-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    if (prevQuestionBtn) {
        prevQuestionBtn.disabled = currentIndex === 0;
        prevQuestionBtn.classList.toggle('nav-btn-disabled', currentIndex === 0);
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.disabled = currentIndex === totalQuestions - 1;
        nextQuestionBtn.classList.toggle('nav-btn-disabled', currentIndex === totalQuestions - 1);
    }
}

/**
 * Unified progress tracking system with enhanced navigation controls
 * Handles progress bar, question navigation, and test reset
 */
function initProgressTracking() {

    // Initialize the progress bar functionality
    const progressBar = initProgressBar();

    // Helper function to check if we're within the test section
    function isInTestSection() {
        const testContainer = document.querySelector('.test-actual-container');
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
                const progressContainer = document.querySelector('.progress-container');
                if (progressContainer) {
                    progressContainer.classList.add('visible');
                }
            } else {
                const progressContainer = document.querySelector('.progress-container');
                if (progressContainer) {
                    progressContainer.classList.remove('visible');
                }
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

    // Function to get all question elements
    function getAllQuestionElements() {
        return Array.from(document.querySelectorAll('.question'));
    }

    // Function to find the current question index
    function getCurrentQuestionIndex() {
        const allQuestions = getAllQuestionElements();
        const currentQuestion = document.querySelector('.question.current');

        if (currentQuestion) {
            return allQuestions.indexOf(currentQuestion);
        }

        // If no current question is marked, find the first unanswered or return 0
        const firstUnanswered = allQuestions.findIndex(q => !q.querySelector('input[type="radio"]:checked'));
        return firstUnanswered >= 0 ? firstUnanswered : 0;
    }

    // Function to navigate to a specific question
    function navigateToQuestion(index) {
        const allQuestions = getAllQuestionElements();

        // Ensure index is within bounds
        if (index < 0) index = 0;
        if (index >= allQuestions.length) index = allQuestions.length - 1;

        // Remove current class from all questions
        allQuestions.forEach(q => q.classList.remove('current'));

        // Add current class to target question
        allQuestions[index].classList.add('current');

        // Scroll to the question
        const progressContainer = document.querySelector('.progress-container');
        const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;
        window.scrollTo({
            top: allQuestions[index].getBoundingClientRect().top + window.pageYOffset - offset,
            behavior: 'smooth'
        });

        // Update nav buttons state
        updateNavButtonsState(index, allQuestions.length);
    }

    // Define a navigation controller that can be used by both buttons and keyboard
    window.questionNavigation = {
        navigateToPrevious: function() {
            const currentIndex = getCurrentQuestionIndex();
            if (currentIndex > 0) {
                navigateToQuestion(currentIndex - 1);
                return true;
            }
            return false;
        },
        navigateToNext: function() {
            const currentIndex = getCurrentQuestionIndex();
            const totalQuestions = getAllQuestionElements().length;
            if (currentIndex < totalQuestions - 1) {
                navigateToQuestion(currentIndex + 1);
                return true;
            }
            return false;
        },
        getCurrentQuestionIndex: getCurrentQuestionIndex,
        getAllQuestionElements: getAllQuestionElements,
        navigateToQuestion: navigateToQuestion
    };

    // Initial update of nav buttons state
    const initialIndex = getCurrentQuestionIndex();
    updateNavButtonsState(initialIndex, getAllQuestionElements().length);

    // Previous question button click handler
    const prevQuestionBtn = document.getElementById('prev-question-btn');
    if (prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', () => {
            window.questionNavigation.navigateToPrevious();
        });
    }

    // Next question button click handler
    const nextQuestionBtn = document.getElementById('next-question-btn');
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            window.questionNavigation.navigateToNext();
        });
    }

    // Reset button click handler
    const quickResetBtn = document.getElementById('quick-reset-btn');
    if (quickResetBtn) {
        quickResetBtn.addEventListener('click', () => {
            // Show confirmation dialog
            if (confirm('Sigur doriți să resetați testul? Toate răspunsurile vor fi șterse.')) {
                restartTest();
            }
        });
    }

    // Event delegation for radio button changes to improve performance
    const form = document.getElementById('raadsrForm');
    if (form) {
        form.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                const currentQuestion = e.target.closest('.question');
                if (currentQuestion) {
                    currentQuestion.classList.add('completed');
                    currentQuestion.classList.remove('highlight-unanswered');

                    updateProgress();

                    // Find and scroll to next unanswered question
                    const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                        .find(q => !q.querySelector('input[type="radio"]:checked'));

                    if (nextUnanswered) {
                        const progressContainer = document.querySelector('.progress-container');
                        const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;
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
            }
        });
    }

    // Initialize progress
    updateProgress();

    return {
        update: handleScroll,
        destroy: () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        }
    };
}

// ===== EVENT HANDLERS =====

/**
 * Submit button click handler - calculates and displays the test score
 */
function handleSubmit(e) {
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

        // Add email button
        const emailBtn = document.getElementById('emailBtn');
        if (emailBtn) {
            emailBtn.style.display = 'block';
        }

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
}

/**
 * Restart test functionality
 */
function restartTest() {
    // Reset progress container visibility with proper error checking
    const progressContainer = document.querySelector('.progress-container');

    // Update navigation buttons state
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('nav-btn-disabled');
        btn.disabled = false;
    });

    // Disable previous button since we're at the first question
    const prevBtn = document.getElementById('prev-question-btn');
    if (prevBtn) {
        prevBtn.disabled = true;
        prevBtn.classList.add('nav-btn-disabled');
    }

    // Enable next button since we have more than one question
    const nextBtn = document.getElementById('next-question-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('nav-btn-disabled');
    }

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
            initProgressTracking();
        }, 100); // Small delay to ensure DOM updates are complete
    }

    // Clear announcer for screen readers
    if (resultAnnouncer) {
        resultAnnouncer.textContent = "Test resetat. Poți începe din nou.";
    }
}

/**
 * Generate a random identifier for sharing
 */
function generateUniqueId() {
    return 'raads_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Enhanced Facebook sharing function
 */
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

// ===== KEYBOARD NAVIGATION =====

/**
 * Enhance keyboard navigation for accessibility
 * - Arrow keys navigate between radio options when a radio button is focused
 * - Ctrl+Arrow Up/Down navigate between questions
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;

        // Skip navigation when focus is in fields that need arrow keys
        if (activeElement.tagName === 'TEXTAREA' ||
            (activeElement.tagName === 'INPUT' &&
            activeElement.type !== 'radio' &&
            activeElement.type !== 'checkbox')) {
            return;
        }

        // Handle radio button group navigation
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
        } else {
            // Handle question navigation with Ctrl+Arrow keys when not focused on radio buttons
            if (e.key === 'ArrowUp' && e.ctrlKey && window.questionNavigation) {
                e.preventDefault();
                window.questionNavigation.navigateToPrevious();
            } else if (e.key === 'ArrowDown' && e.ctrlKey && window.questionNavigation) {
                e.preventDefault();
                window.questionNavigation.navigateToNext();
            }
        }
    });
}

// ===== HELP FUNCTIONALITY =====

/**
 * Setup help button functionality
 */
function setupHelpButtons() {
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
}

// ===== SCROLL HIGHLIGHTING =====

/**
 * Highlight the QuickNav item of the section currently in view
 */
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

// ===== INITIALIZATION =====

// Form generation with Bootstrap classes with enhanced accessibility
function initializeForm() {
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
}

// Initialize event listeners
function setupEventListeners() {
    // Submit button click handler
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    }

    // Export button click handler
    if (exportBtn) {
        exportBtn.addEventListener('click', exportRobustRomanianPDF);
    }

    // Restart button click handler
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

    // Confirm restart button click handler
    const confirmRestartBtn = document.getElementById('confirmRestartBtn');
    if (confirmRestartBtn) {
        confirmRestartBtn.addEventListener('click', restartTest);
    }

    // Start test button click handler
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const disclaimerSection = document.getElementById('first-disclaimer');
            if (disclaimerSection) {
                disclaimerSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Share button click handler
    if (shareBtn) {
        shareBtn.addEventListener('click', shareToFacebook);
    }

    // Highlight unanswered questions when they change
    document.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            const currentQuestion = e.target.closest('.question');
            if (currentQuestion) {
                currentQuestion.classList.remove('highlight-unanswered');
            }
        }
    });
}

// Main initialization function
function init() {
    // Initialize the form with questions
    initializeForm();

    // Ensure autoSaveManager is attached to window
    if (typeof autoSaveManager !== 'undefined' && !window.autoSaveManager) {
        window.autoSaveManager = autoSaveManager;
    }
    
    // Try to restore test state if manager exists
    if (window.autoSaveManager && typeof window.autoSaveManager.restoreTestState === 'function') {
        try {
            window.autoSaveManager.restoreTestState();
        } catch (error) {
            console.error('Error restoring test state during init:', error);
        }
    }

    // Initialize progress tracking
    initProgressTracking();

    // Setup event listeners
    setupEventListeners();

    // Setup keyboard navigation
    setupKeyboardNavigation();

    // Setup help buttons
    setupHelpButtons();

    // Setup section highlighting
    highlightInViewSection();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


/**
 * Advanced Storage Mechanism with Fallbacks
 * Provides a unified API for persistent data storage across browsers and devices
 */
class StorageManager {
    constructor(prefix = 'raads_r_') {
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

function setProgressState(answered, total, animate = false) {
    const percentage = (answered / total) * 100;
    const progressFill = document.querySelector('.progress-fill');
    const questionsCompleted = document.querySelector('.questions-completed');
    const timeEstimate = document.querySelector('.time-estimate');
    const progressMessage = document.querySelector('.progress-message');

    // Handle progress fill animation
    if (progressFill) {
        if (animate) {
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
            progressFill.offsetHeight; // Force reflow
            progressFill.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                progressFill.style.width = percentage + '%';
            }, 50);
        } else {
            progressFill.style.width = percentage + '%';
        }
    }

    // Update completion text
    if (questionsCompleted) {
        questionsCompleted.innerHTML = `<b>${answered}</b> din <b>${total}</b> întrebări`;
    }

    // Update time estimate
    if (timeEstimate) {
        const remainingQuestions = total - answered;
        const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.375), 1);
        timeEstimate.innerHTML = `Timp rămas estimat: <b>${estimatedMinutes} minute</b>`;
    }

    // Update progress message if function available
    if (progressMessage && typeof getProgressMessage === 'function') {
        progressMessage.innerHTML = getProgressMessage(percentage, answered);
    }
}

/**
 * Enhanced progress update during restoration
 * @param {number} answered - Number of answered questions
 * @param {number} total - Total number of questions
 * @param {boolean} animate - Whether to animate the progress transition
 */
function updateProgressOnRestore(answered, total, animate = true) {
    const percentage = (answered / total) * 100;

    // Step 1: Prepare for animation if requested
    if (animate) {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
            // Force reflow to ensure the initial state is rendered
            progressFill.offsetHeight;
            progressFill.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    // Step 2: Directly update text elements for immediate feedback
    const questionsCompleted = document.querySelector('.questions-completed');
    if (questionsCompleted) {
        questionsCompleted.innerHTML = `<b>${answered}</b> din <b>${total}</b> întrebări`;
    }

    const timeEstimate = document.querySelector('.time-estimate');
    if (timeEstimate) {
        const remainingQuestions = total - answered;
        const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.375), 1);
        timeEstimate.innerHTML = `Timp rămas estimat: <b>${estimatedMinutes} minute</b>`;
    }

    const progressMessage = document.querySelector('.progress-message');
    if (progressMessage && typeof getProgressMessage === 'function') {
        progressMessage.innerHTML = getProgressMessage(percentage, answered);
    }

    // Step 3: Animate progress bar with slight delay to ensure visual effect
    if (animate) {
        setTimeout(() => {
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = percentage + '%';
            }
        }, 50);
    }

    // Step 4: Still call the original function to ensure any other side effects
    // are maintained, but with a slight delay to avoid visual conflicts
    setTimeout(() => {
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
    }, animate ? 900 : 0);
}

/**
 * AutoSave Manager for RAADS-R Test
 * Handles saving and restoring test state with enhanced user feedback
 */
class AutoSaveManager {
    constructor() {
        this.storage = new StorageManager('raads_r_');
        this.saveNotificationTimeout = null;
        this.progressNotificationTimeout = null;
        // this.lastSaveIndicator = this.createLastSaveIndicator();
        this.initNotificationSystem();
    }

    /**
     * Create a discreet save time indicator
     * @returns {HTMLElement} The indicator element
     */
    createLastSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'last-save-indicator';
        indicator.className = 'last-save-indicator';
        indicator.innerHTML = '<i class="fas fa-cloud-upload-alt last-save-indicator-icon"></i> <span id="last-save-time">Nesalvat</span>';

        return indicator;
    }

    /**
     * Initialize notification system for save updates
     * @returns {HTMLElement} The save notification element
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
        }

        // Add a progress notification element
        if (!document.getElementById('progress-notification')) {
            const notification = document.createElement('div');
            notification.id = 'progress-notification';
            notification.className = 'progress-notification';
            notification.setAttribute('role', 'status');
            notification.setAttribute('aria-live', 'polite');
            notification.innerHTML = 'Progres salvat';
            document.body.appendChild(notification);
        }

        // Add a toast notification for restoration
        if (!document.getElementById('progress-restoration-toast')) {
            const toast = document.createElement('div');
            toast.id = 'progress-restoration-toast';
            toast.className = 'progress-restoration-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.innerHTML = `
                <div class="toast-icon"><i class="fas fa-history"></i></div>
                <div class="toast-content">
                    <strong>Progres restaurat</strong>
                    <span id="restoration-details">Continuă de unde ai rămas</span>
                </div>
            `;
            document.body.appendChild(toast);
        }

        return document.getElementById('save-notification');
    }

    /**
     * Show notification with custom message
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
     * Show progress notification near the progress bar
     * @param {string} message Message to display
     */
    showProgressNotification(message) {
        const notification = document.getElementById('progress-notification');
        if (!notification) return;

        // Clear previous timeout if any
        if (this.progressNotificationTimeout) {
            clearTimeout(this.progressNotificationTimeout);
        }

        // Update text and show
        notification.textContent = message;
        notification.classList.add('visible');

        // Auto-hide after 2 seconds
        this.progressNotificationTimeout = setTimeout(() => {
            notification.classList.remove('visible');
        }, 2000);
    }

    /**
     * Show restoration toast notification
     * @param {number} answered Number of answered questions
     * @param {number} total Total number of questions
     */
    showRestorationToast(answered, total) {
        const toast = document.getElementById('progress-restoration-toast');
        if (!toast) return;

        // Update details
        const details = toast.querySelector('#restoration-details');
        if (details) {
            details.textContent = `${answered} din ${total} întrebări completate (${Math.round(answered/total*100)}%)`;
        }

        // Show toast
        toast.classList.add('visible');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 5000);
    }

    /**
     * Update last save time indicator
     */
    updateLastSaveTime() {
        const timeIndicator = document.getElementById('last-save-time');
        if (!timeIndicator) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Flash the indicator to show active saving
        const indicator = document.getElementById('last-save-indicator');
        if (indicator) {
            indicator.classList.add('saving');
            setTimeout(() => indicator.classList.remove('saving'), 1000);
        }

        timeIndicator.textContent = `Ultima salvare: ${timeString}`;
    }

    /**
     * Save current test state to storage
     * @returns {boolean} Success status
     */
    saveTestState() {
        try {
            // Get current answers
            const answers = {};
            questions.forEach(question => {
                const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
                if (selected) {
                    answers[question.id] = selected.value;
                }
            });

            // Get completion status
            const completed = Object.keys(answers).length === questions.length;

            // Get active question
            const currentQuestionEl = document.querySelector('.question.current');
            let currentQuestion = null;
            if (currentQuestionEl) {
                const questionNumber = currentQuestionEl.querySelector('input[type="radio"]')?.name?.replace('question_', '');
                if (questionNumber) {
                    currentQuestion = parseInt(questionNumber);
                }
            }

            // Save test state
            const testState = {
                answers,
                timestamp: new Date().toISOString(),
                completed,
                currentQuestion,
                scrollPosition: window.scrollY,
                screenWidth: window.innerWidth, // For responsive adjustments on restore
                lastSaved: new Date().toISOString()
            };

            this.storage.set('test_state', testState, 500); // Debounce by 500ms

            // Save results if test is completed and results are calculated
            if (completed && document.getElementById('result').style.display !== 'none') {
                const calculatedScores = calculateSubscores();
                this.storage.set('test_results', calculatedScores);
            }

            // Update the last save indicator
            this.updateLastSaveTime();

            // Show a discreet notification
            this.showProgressNotification('Progres salvat');

            return true;
        } catch (error) {
            console.error('Error saving test state:', error);
            return false;
        }
    }

    /**
     * Clear saved state
     */
    clearSavedState() {
        this.storage.remove('test_state');
        this.storage.remove('test_results');

        // Remove the last save indicator if present
        const indicator = document.getElementById('last-save-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

/**
 * Complete replacement for AutoSaveManager.restoreTestState method
 * with robust error handling and integrated notification system
 */
AutoSaveManager.prototype.restoreTestState = function() {
    try {
        const testState = this.storage.get('test_state');
        if (!testState || !testState.answers || Object.keys(testState.answers).length === 0) {
            return false;
        }

        // Restore answers
        let answeredCount = 0;
        Object.entries(testState.answers).forEach(([questionId, value]) => {
            const input = document.querySelector(`input[name="question_${questionId}"][value="${value}"]`);
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

        // Ensure progress bar is initialized and updated
        if (typeof updateProgressOnRestore === 'function') {
            updateProgressOnRestore(answeredCount, questions.length, true);
        } else if (typeof updateProgress === 'function') {
            updateProgress();
        }

        // Show restoration notification using our new progress bar API if available
        const progressBar = window.progressBarInstance;
        if (progressBar && typeof progressBar.showProgressRestorationNotification === 'function') {
            // Use new notification system
            progressBar.showProgressRestorationNotification();
        } else {
            // Fallback to creating a standard notification banner
            this.createRestorationBanner(answeredCount, questions.length);
        }

        // Handle completed test
        if (testState.completed) {
            const results = this.storage.get('test_results');

            // If results exist, show them
            if (results) {
                // Call the global handleSubmit function to display results
                if (typeof handleSubmit === 'function') {
                    handleSubmit({ preventDefault: () => {} });
                } else {
                    console.warn('handleSubmit function not found, cannot display results automatically');
                }
                return true;
            }

            // If no saved results but all questions are answered, calculate results
            if (answeredCount === questions.length) {
                if (typeof handleSubmit === 'function') {
                    handleSubmit({ preventDefault: () => {} });
                }
                return true;
            }
        }

        // For incomplete test, set current question
        if (testState.currentQuestion) {
            const currentQuestionEl = document.querySelector(`input[name="question_${testState.currentQuestion}"]`)?.closest('.question');
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

        // Add last save indicator to progress container
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer && !document.getElementById('last-save-indicator') && this.lastSaveIndicator) {
            progressContainer.appendChild(this.lastSaveIndicator);
            
            if (testState.lastSaved) {
                const lastSaveDate = new Date(testState.lastSaved);
                const timeString = lastSaveDate.toLocaleTimeString('ro-RO', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                const timeIndicator = document.getElementById('last-save-time');
                if (timeIndicator) {
                    timeIndicator.textContent = `Ultima salvare: ${timeString}`;
                }
            }
        }
        
        return true;
    } catch (error) {
        console.error('Error restoring test state:', error);
        
        // Create a fallback error notification
        try {
            this.createErrorNotification(error.message);
        } catch (notificationError) {
            // Last resort - log to console if even notification creation fails
            console.error('Failed to create error notification:', notificationError);
        }
        
        return false;
    }
};

// Extend the restartTest function to clear saved state
const originalRestartTest = window.restartTest;
window.restartTest = function() {
    // Call original function
    originalRestartTest();

    // Clear saved state
    autoSaveManager.clearSavedState();

    // Remove restoration banner if present
    const banner = document.querySelector('.test-restored-banner');
    if (banner) banner.remove();

    // Show notification
    autoSaveManager.showNotification('Test resetat', 'info');
};

// Create a globally accessible notification system
window.notificationSystem = {
    initialized: false,
    
    init: function() {
        if (this.initialized) return;
        
        // Ensure notification containers exist
        if (!document.getElementById('progress-restored-toast')) {
            const toast = document.createElement('div');
            toast.id = 'progress-restored-toast';
            toast.className = 'progress-restored-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.innerHTML = `
                <div class="toast-icon"><i class="fas fa-history"></i></div>
                <div class="toast-content">
                    <strong>Progres restaurat</strong>
                    <span id="restoration-details">Continuă de unde ai rămas</span>
                </div>
                <button class="toast-close" aria-label="Închide notificarea">
                    <i class="fas fa-times"></i>
                </button>
            `;
            document.body.appendChild(toast);
            
            // Add close button functionality
            const closeBtn = toast.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    toast.classList.remove('visible');
                    setTimeout(() => {
                        if (document.body.contains(toast)) {
                            toast.remove();
                        }
                    }, 300);
                });
            }
        }
        
        // Ensure we have styles for the toast
        if (!document.getElementById('toast-notification-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'toast-notification-styles';
            styleEl.textContent = `
                .progress-restored-toast {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%) translateY(-100px);
                    background: linear-gradient(135deg, #42a5f5, #1976d2);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    box-shadow: 0 5px 20px rgba(25, 118, 210, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    z-index: 2000;
                    opacity: 0;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    max-width: 90%;
                }
                
                .progress-restored-toast.visible {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                
                .toast-icon {
                    font-size: 1.5rem;
                }
                
                .toast-content strong {
                    display: block;
                    margin-bottom: 2px;
                }
                
                .toast-close {
                    background: transparent;
                    border: none;
                    color: white;
                    opacity: 0.7;
                    cursor: pointer;
                    padding: 4px;
                    margin-left: 12px;
                    font-size: 1rem;
                    transition: opacity 0.2s ease;
                }
                
                .toast-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(styleEl);
        }
        
        this.initialized = true;
    },
    
    showRestoration: function(answered, total) {
        this.init(); // Ensure initialization
        
        const toast = document.getElementById('progress-restored-toast');
        if (!toast) return false;
        
        // Update details
        const details = toast.querySelector('#restoration-details');
        if (details) {
            details.textContent = `${answered} din ${total} întrebări completate (${Math.round(answered/total*100)}%)`;
        }
        
        // Show toast with animation
        toast.classList.add('visible');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 5000);
        
        return true;
    }
};

// Complete replacement for AutoSaveManager.restoreTestState method
AutoSaveManager.prototype.restoreTestState = function() {
    try {
        const testState = this.storage.get('test_state');
        if (!testState || !testState.answers || Object.keys(testState.answers).length === 0) {
            return false;
        }
        
        // Restore answers
        let answeredCount = 0;
        Object.entries(testState.answers).forEach(([questionId, value]) => {
            const input = document.querySelector(`input[name="question_${questionId}"][value="${value}"]`);
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
        
        // Ensure progress bar is initialized and updated
        if (typeof updateProgressOnRestore === 'function') {
            updateProgressOnRestore(answeredCount, questions.length, true);
        } else if (typeof updateProgress === 'function') {
            updateProgress();
        }
        
        // Always use the global notification system
        if (answeredCount > 0) {
            window.notificationSystem.showRestoration(answeredCount, questions.length);
        }
        
        // Handle completed test
        if (testState.completed) {
            const results = this.storage.get('test_results');
            
            // If results exist, show them
            if (results) {
                // Call the global handleSubmit function to display results
                if (typeof handleSubmit === 'function') {
                    handleSubmit({ preventDefault: () => {} });
                } else {
                    console.warn('handleSubmit function not found, cannot display results automatically');
                }
                return true;
            }
            
            // If no saved results but all questions are answered, calculate results
            if (answeredCount === questions.length) {
                if (typeof handleSubmit === 'function') {
                    handleSubmit({ preventDefault: () => {} });
                }
                return true;
            }
        }
        
        // For incomplete test, set current question
        if (testState.currentQuestion) {
            const currentQuestionEl = document.querySelector(`input[name="question_${testState.currentQuestion}"]`)?.closest('.question');
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
        
        // Add last save indicator to progress container
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer && !document.getElementById('last-save-indicator') && this.lastSaveIndicator) {
            progressContainer.appendChild(this.lastSaveIndicator);
            
            if (testState.lastSaved) {
                const lastSaveDate = new Date(testState.lastSaved);
                const timeString = lastSaveDate.toLocaleTimeString('ro-RO', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                const timeIndicator = document.getElementById('last-save-time');
                if (timeIndicator) {
                    timeIndicator.textContent = `Ultima salvare: ${timeString}`;
                }
            }
        }
        
        return true;
    } catch (error) {
        console.error('Error restoring test state:', error);
        
        // Create a fallback error notification
        try {
            this.createErrorNotification(error.message);
        } catch (notificationError) {
            // Last resort - log to console if even notification creation fails
            console.error('Failed to create error notification:', notificationError);
        }
        
        return false;
    }
};

// Safely creates a restoration banner when the main notification system is unavailable
AutoSaveManager.prototype.createRestorationBanner = function(answered, total) {
    try {
        // Remove any existing banners first
        const existingBanner = document.querySelector('.test-restored-banner');
        if (existingBanner && existingBanner.parentNode) {
            existingBanner.parentNode.removeChild(existingBanner);
        }
        
        // Create a new banner with proper DOM methods
        const banner = document.createElement('div');
        banner.className = 'test-restored-banner';
        banner.setAttribute('role', 'status');
        banner.setAttribute('aria-live', 'polite');
        
        // Safe innerHTML assignment
        banner.innerHTML = `
            <strong>Progres restaurat!</strong> Ai completat ${answered} din ${total} întrebări (${Math.round(answered/total*100)}%).
            <button class="close-banner" aria-label="Închide notificarea">&times;</button>
        `;
        
        // Safely find insertion point
        const testContainer = document.getElementById('test') || 
                            document.querySelector('.test-actual-container') || 
                            document.getElementById('raadsrForm')?.parentNode;
        
        if (testContainer) {
            // Insert at the beginning of the container
            if (testContainer.firstChild) {
                testContainer.insertBefore(banner, testContainer.firstChild);
            } else {
                testContainer.appendChild(banner);
            }
            
            // Add close functionality
            const closeButton = banner.querySelector('.close-banner');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    if (banner.parentNode) {
                        banner.parentNode.removeChild(banner);
                    }
                });
            }
        } else {
            // If no suitable container found, add to body as fallback
            document.body.appendChild(banner);
        }
    } catch (error) {
        console.error('Failed to create restoration banner:', error);
    }
};

// Creates an error notification for critical failures
AutoSaveManager.prototype.createErrorNotification = function(errorMessage) {
    try {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #f44336;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 90%;
            text-align: center;
        `;
        
        notification.textContent = `Eroare la restaurarea progresului. Vă rugăm să încercați din nou.`;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    } catch (error) {
        // Last resort - cannot create notifications at all
        console.error('Critical error in notification system:', error);
    }
};

// Add auto-save to form changes
document.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
        autoSaveManager.saveTestState();
        // autoSaveManager.showNotification('Progres salvat', 'success');
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

// First, ensure the global manager is explicitly attached to window
// Create global instance of AutoSaveManager
const autoSaveManager = new AutoSaveManager();
window.autoSaveManager = autoSaveManager; // Explicitly attach to window

/**
 * System Integration Initialization Function 
 * Creates bidirectional communication channels between subsystems
 */
function initializeSystemIntegration() {
    // Establish stable reference to progress bar instance
    window.progressBarInstance = initProgressBar();
    
    // Create adapter that allows AutoSaveManager to trigger progress updates
    if (typeof AutoSaveManager !== 'undefined') {
        // Extend AutoSaveManager with enhanced notification capabilities
        AutoSaveManager.prototype.notifyProgressUpdated = function(answered, total) {
            if (window.progressBarInstance && typeof window.progressBarInstance.updateProgress === 'function') {
                window.progressBarInstance.updateProgress(true); // Show notification
            } else if (typeof updateProgress === 'function') {
                updateProgress(); // Fallback to global function
            }
        };
        
        // Override storage event handler to ensure proper progress updates
        const originalStorageMethod = AutoSaveManager.prototype.saveTestState;
        if (typeof originalStorageMethod === 'function') {
            AutoSaveManager.prototype.saveTestState = function() {
                const result = originalStorageMethod.apply(this, arguments);
                
                // Update save time indicator after save
                if (window.progressBarInstance && typeof window.progressBarInstance.updateSaveTime === 'function') {
                    window.progressBarInstance.updateSaveTime(true);
                }
                
                return result;
            };
        }
    }
    
    // Enhance global progress update function to communicate with AutoSaveManager
    const originalUpdateProgress = window.updateProgress;
    window.updateProgress = function() {
        // Call original function
        if (typeof originalUpdateProgress === 'function') {
            originalUpdateProgress.apply(this, arguments);
        }
        
        // Update our progress bar instance
        if (window.progressBarInstance && typeof window.progressBarInstance.updateProgress === 'function') {
            window.progressBarInstance.updateProgress(false); // Don't show notification for regular updates
        }
    };
    
    // Safely check for autoSaveManager and handle restoration
    if (window.autoSaveManager && window.autoSaveManager.storage) {
        try {
            const testState = window.autoSaveManager.storage.get('test_state');
            if (testState && testState.answers && Object.keys(testState.answers).length > 0) {
                // Get count of answered questions
                const answeredCount = Object.keys(testState.answers).length;
                
                // Show notification using our notification system
                if (window.notificationSystem && typeof window.notificationSystem.showRestoration === 'function') {
                    window.notificationSystem.showRestoration(answeredCount, questions.length);
                }
                
                // Actually restore the test state
                window.autoSaveManager.restoreTestState();
            }
        } catch (error) {
            console.error('Error during test state restoration:', error);
        }
    } else {
        console.warn('AutoSaveManager not fully initialized during system integration. Will retry later.');
        // Schedule another attempt with longer delay
        setTimeout(function() {
            if (window.autoSaveManager && window.autoSaveManager.storage) {
                try {
                    const testState = window.autoSaveManager.storage.get('test_state');
                    if (testState && testState.answers && Object.keys(testState.answers).length > 0) {
                        window.autoSaveManager.restoreTestState();
                    }
                } catch (error) {
                    console.error('Error during delayed test state restoration:', error);
                }
            }
        }, 1000); // Longer 1-second delay
    }
}

// Execute this after DOM is fully loaded to establish system integration
document.addEventListener('DOMContentLoaded', function() {
    // First initialize the notification system
    if (window.notificationSystem && typeof window.notificationSystem.init === 'function') {
        window.notificationSystem.init();
    }
    
    // Make sure autoSaveManager is available globally
    if (typeof autoSaveManager !== 'undefined' && !window.autoSaveManager) {
        window.autoSaveManager = autoSaveManager;
    }
    
    // Use a longer delay for system integration to ensure everything is loaded
    setTimeout(initializeSystemIntegration, 300);
});

// Save periodically (every minute)
setInterval(() => {
    autoSaveManager.saveTestState();
}, 60000);

function unifyNavigationControls() {
    // 1. Establish consistent references to navigation elements
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // 2. Create unified state management function
    function updateButtonStates(currentIndex, totalQuestions) {
        if (prevBtn) {
            const isFirstQuestion = currentIndex === 0;
            prevBtn.disabled = isFirstQuestion;
            prevBtn.classList.toggle('nav-btn-disabled', isFirstQuestion);
            // Ensure ARIA attributes reflect disabled state
            prevBtn.setAttribute('aria-disabled', isFirstQuestion);
        }
        
        if (nextBtn) {
            const isLastQuestion = currentIndex === totalQuestions - 1;
            nextBtn.disabled = isLastQuestion;
            nextBtn.classList.toggle('nav-btn-disabled', isLastQuestion);
            nextBtn.setAttribute('aria-disabled', isLastQuestion);
        }
    }
    
    // 3. Ensure the function is called during initialization
    const initialIndex = window.questionNavigation ? 
        window.questionNavigation.getCurrentQuestionIndex() : 0;
    const totalQuestions = window.questionNavigation ? 
        window.questionNavigation.getAllQuestionElements().length : 
        questions.length;
        
    updateButtonStates(initialIndex, totalQuestions);
    
    // 4. Attach event listeners using the consistent references
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (window.questionNavigation) {
                window.questionNavigation.navigateToPrevious();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (window.questionNavigation) {
                window.questionNavigation.navigateToNext();
            }
        });
    }
    
    // 5. Replace all existing update functions with this unified approach
    window.updateNavButtonsState = updateButtonStates;
    
    return updateButtonStates;
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', unifyNavigationControls);

function enhanceNavigationControls() {
    // 1. Handle tooltip positioning edge cases
    document.querySelectorAll('.nav-btn[title], .reset-btn[title]').forEach(btn => {
        btn.addEventListener('mouseenter', event => {
            // Check if we're on mobile (where tooltips should be hidden)
            if (window.innerWidth <= 768) return;
            
            // Small delay to ensure tooltip is created
            setTimeout(() => {
                const btnRect = event.target.getBoundingClientRect();
                
                // Check if right position would be off-screen
                if (btnRect.right + 150 > window.innerWidth) { // 150px is an estimated tooltip width
                    // Apply alternative positioning via a class for left side tooltip
                    event.target.classList.add('tooltip-left');
                    
                    // Add dynamic style for left positioning if needed
                    if (!document.getElementById('tooltip-left-style')) {
                        const styleEl = document.createElement('style');
                        styleEl.id = 'tooltip-left-style';
                        styleEl.textContent = `
                            .tooltip-left[title]:hover::after {
                                left: auto;
                                right: calc(100% + 10px);
                            }
                        `;
                        document.head.appendChild(styleEl);
                    }
                } else {
                    // Default right side tooltip
                    event.target.classList.remove('tooltip-left');
                }
            }, 10);
        });
        
        // Clean up on mouseleave
        btn.addEventListener('mouseleave', event => {
            event.target.classList.remove('tooltip-left');
        });
    });
    
    // 2. Improve accessibility for mobile users (add ARIA attributes)
    document.querySelectorAll('.nav-btn, .reset-btn').forEach(btn => {
        // Ensure proper ARIA attributes for better screen reader support
        const title = btn.getAttribute('title');
        if (title) {
            btn.setAttribute('aria-label', title);
        }
    });
}

// Initialize the enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', enhanceNavigationControls);

// Update on window resize for responsive behavior
window.addEventListener('resize', () => {
    document.querySelectorAll('.tooltip-left').forEach(el => {
        el.classList.remove('tooltip-left');
    });
});