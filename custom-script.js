/**
 * Implementare Optimizată a Testului RAADS-R
 * Gestionează scorarea testului, generarea PDF, interacțiunile UI și urmărirea progresului
 */

// ===== CONSTANTE ȘI DATE TEST =====

/**
 * Întrebările testului, fiecare cu text și indicator de inversare
 */
const questions = [
    // 80 de întrebări ca obiecte cu text și flag de inversare
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

/**
 * Categoriile RAADS-R conform lucrării, pagina 1083
 */
const RAADS_R_CATEGORIES = {
    // Relaționare Socială - 39 întrebări
    socialRelatedness: [1, 6, 8, 11, 14, 17, 18, 25, 37, 38, 3, 5, 12, 28, 39,
                       44, 45, 76, 79, 80, 20, 21, 22, 23, 26, 31, 43, 47, 48,
                       53, 54, 55, 60, 61, 64, 68, 69, 72, 77],

    // Limbaj - 7 întrebări
    language: [2, 7, 27, 35, 58, 66, 15],

    // Senzorial-motor - 20 întrebări
    sensoryMotor: [10, 19, 4, 33, 34, 36, 46, 71, 16, 29, 42, 49, 51, 57, 59,
                   62, 65, 67, 73, 74],

    // Interese Circumscrise - 14 întrebări
    circumscribedInterests: [9, 13, 24, 30, 32, 40, 41, 50, 52, 56, 63, 70, 75, 78]
};

/**
 * Praguri de scor din Tabelul 3, pagina 1079
 */
const RAADS_R_THRESHOLDS = {
    socialRelatedness: 31,  // sensibilitate 96.0%
    circumscribedInterests: 15, // sensibilitate 89.6%
    sensoryMotor: 16, // sensibilitate 85.1%
    language: 4, // sensibilitate 88.6%
    total: 65  // sensibilitate 97%, specificitate 100%
};

/**
 * Întrebări normative care folosesc scorare inversă (marcate cu * în lucrare)
 */
const INVERSE_SCORING_QUESTIONS = [1, 6, 11, 18, 23, 26, 33, 37, 43, 47, 48, 53, 58, 62, 68, 72, 77];

/**
 * Scoruri maxime posibile bazate pe numărul de întrebări pe categorie * 3 puncte
 */
const MAX_SCORES = {
    language: 21,           // 7 întrebări * 3 puncte
    socialRelatedness: 117, // 39 întrebări * 3 puncte
    sensoryMotor: 60,      // 20 întrebări * 3 puncte
    circumscribedInterests: 42,  // 14 întrebări * 3 puncte
    total: 240             // 80 întrebări * 3 puncte
};

// ===== ELEMENTE UI =====

/**
 * Referințe la elementele UI principale
 */
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

// ===== MODUL DE SCORARE ȘI VALIDARE =====

/**
 * Găsește întrebări care ar putea fi numărate în mai multe categorii
 * Aceasta este o funcție de validare pentru a asigura atribuiri corecte de categorii
 */
function findDuplicateQuestionCounts() {
    const questionCounts = {};
    const duplicates = [];

    // Numără aparițiile fiecărei întrebări în categorii
    Object.entries(RAADS_R_CATEGORIES).forEach(([category, questions]) => {
        questions.forEach(questionId => {
            if (!questionCounts[questionId]) {
                questionCounts[questionId] = [];
            }
            questionCounts[questionId].push(category);
        });
    });

    // Verifică întrebările care apar în mai multe categorii
    Object.entries(questionCounts).forEach(([questionId, categories]) => {
        if (categories.length > 1) {
            duplicates.push({
                questionId: parseInt(questionId),
                categories: categories,
                message: `Întrebarea ${questionId} apare în mai multe categorii: ${categories.join(', ')}`
            });
        }
    });

    // Verifică întrebările lipsă (1-80)
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
 * Calculează subscorurile și scorul total conform specificațiilor RAADS-R
 * Bazat pe instrucțiunile de scorare din Anexa 2, pagina 1088
 */
function calculateSubscores() {
    // Mai întâi validează atribuirile de categorii
    const categoryValidation = findDuplicateQuestionCounts();
    if (!categoryValidation.valid) {
        console.warn('Probleme de atribuire a categoriilor detectate:', categoryValidation);
    }

    // Inițializează subscorurile
    const subscores = {
        language: 0,
        socialRelatedness: 0,
        sensoryMotor: 0,
        circumscribedInterests: 0
    };

    // Urmărește detaliile de scorare pentru validare
    const scoringLog = [];

    // Calculează scorurile pentru fiecare categorie
    Object.entries(RAADS_R_CATEGORIES).forEach(([category, questionIds]) => {
        questionIds.forEach(id => {
            const selected = document.querySelector(`input[name="question_${id}"]:checked`);
            if (selected) {
                let score = parseInt(selected.value);
                const isInverse = INVERSE_SCORING_QUESTIONS.includes(id);

                // Aplică scorarea inversă dacă este necesar
                if (isInverse) {
                    score = 3 - score;
                }

                subscores[category] += score;

                // Înregistrează detaliile de scorare
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

    // Calculează scorul total
    const totalScore = Object.values(subscores).reduce((sum, score) => sum + score, 0);

    // Validează scorurile în raport cu maximele
    Object.entries(subscores).forEach(([category, score]) => {
        if (score > MAX_SCORES[category]) {
            console.error(`Scor invalid pentru ${category}: ${score} depășește maximul posibil ${MAX_SCORES[category]}`);
        }
    });

    if (totalScore > MAX_SCORES.total) {
        console.error(`Scor total invalid: ${totalScore} depășește maximul posibil ${MAX_SCORES.total}`);
    }

    // Determină dacă scorurile îndeplinesc pragurile de diagnostic
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
 * Obține interpretarea bazată pe scor
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
 * Obține interpretarea detaliată a categoriei
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
 * Funcție ajutătoare pentru calcularea procentajului scorului și obținerea culorii adecvate
 */
function getScoreDetails(score, threshold, maxScore) {
    const percentage = (score / maxScore) * 100;
    const thresholdPercentage = (threshold / maxScore) * 100;

    // Selecția culorii bazată pe scor în raport cu pragul
    let color;
    if (score < threshold) {
        color = '#4CAF50'; // Verde
    } else if (score < threshold * 1.5) {
        color = '#FFC107'; // Galben
    } else {
        color = '#F44336'; // Roșu
    }

    return { percentage, thresholdPercentage, color };
}

/**
 * Creează componenta vizuală de scor pentru afișarea rezultatelor
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
                <!-- Marcaj prag -->
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
 * Stochează rezultatele testului în localStorage pentru redundanță
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
 * Anunță rezultatul pentru cititoarele de ecran
 */
function announceResult(totalScore, interpretation) {
    if (!resultAnnouncer) return;
    resultAnnouncer.textContent = `Rezultat test: Scor total ${totalScore}. ${interpretation}`;
}

// ===== MODUL GENERARE PDF =====

/**
 * Funcția principală de generare PDF cu suport pentru diacritice românești
 */
async function generateRomanianPDF() {
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

        // ===== PARTEA 2: FUNCȚII HELPER PENTRU TEXT ROMÂNESC =====

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

        // ===== PARTEA 3: GENERARE CONȚINUT PDF =====

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
 * Metodă de backup simplificată pentru generarea PDF
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
 * Funcție robustă de export PDF care încearcă mai multe metode până când una funcționează
 */
async function exportRobustRomanianPDF() {
    // Dezactivează butonul de export în timpul generării
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
        // Re-activate export button
        if (exportBtn) {
            exportBtn.disabled = false;
            exportBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Exportă ca PDF';
        }
    }
}

// ===== MODUL DE URMĂRIRE A PROGRESULUI =====

/**
 * Obține mesajul de progres bazat pe procentajul de completare
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
 * Inițializează bara de progres cu funcționalitate completă
 * @returns {Object} Interfața publică cu metode pentru control extern
 */
function initProgressBar() {
    // Selectează elementele principale
    const progressContainer = document.querySelector('.progress-container');
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionElement = document.querySelector('.current-question');
    const totalQuestionsElement = document.querySelector('.total-questions');
    const progressMessage = document.querySelector('.progress-message');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const saveIndicator = document.querySelector('.save-indicator');
    const saveIndicatorText = document.querySelector('.save-indicator-text');
    
    // Setează numărul total de întrebări
    const totalQuestions = questions?.length || 80;
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = totalQuestions;
    }
    
    // Adaugă marcaje de etape importante dacă nu există deja
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const existingMarkers = progressBar.querySelectorAll('.milestone-marker');
        if (existingMarkers.length === 0) {
            [25, 50, 75].forEach(milestone => {
                const marker = document.createElement('div');
                marker.className = 'milestone-marker';
                marker.style.left = `${milestone}%`;
                marker.setAttribute('aria-hidden', 'true');
                progressBar.appendChild(marker);
            });
        }
    }
    
    // Funcție pentru afișarea notificării de restaurare a progresului
    function showProgressRestorationNotification(answered, total) {
        const existingNotification = document.querySelector('.progress-restored-toast');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        if (answered === 0) return;
        
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
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('visible');
        }, 100);
        
        const closeBtn = notification.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('visible');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
        
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
    
    // Gestionează butoanele de navigare
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
    
    // Gestionează vizibilitatea barei de progres în funcție de poziția de derulare
    function handleVisibility() {
        const testSection = document.getElementById('section-quiz');
        if (testSection) {
            const testRect = testSection.getBoundingClientRect();
            const headerHeight = 60;
            
            if (testRect.top <= headerHeight && testRect.bottom > 0) {
                progressContainer.classList.add('visible');
            } else {
                progressContainer.classList.remove('visible');
            }
        }
    }
    
    // Adaugă listener de derulare cu debouncing
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleVisibility, 100);
    }, { passive: true });
    
    // Verificare inițială a vizibilității
    setTimeout(handleVisibility, 300);
    
    // Gestionează redimensionarea ferestrei
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleVisibility, 200);
    }, { passive: true });
    
    // Adaugă navigare cu tastatură
    document.addEventListener('keydown', (e) => {
        if (!progressContainer.classList.contains('visible')) return;
        
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
    
    // Funcție pentru actualizarea indicatorului de salvare
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
    
    // Funcție pentru actualizarea tuturor indicatorilor de progres
    /**
     * Comprehensively updates all progress indicators
     * @param {number} answered Number of answered questions
     * @param {number} total Total number of questions
     * @param {boolean} showRestorationNotification Whether to show the restoration notification
     */
    function updateProgressDisplay(answered, total, showRestorationNotification = false) {
        const percentage = (answered / total) * 100;
        
        // Update question counter with label
        const counterElement = document.querySelector('.progress-counter');
        const currentQuestionElement = document.querySelector('.current-question');
        const totalQuestionsElement = document.querySelector('.total-questions');
        
        // Add counter label if it doesn't exist
        if (counterElement && !counterElement.querySelector('.counter-label')) {
            const labelDiv = document.createElement('div');
            labelDiv.className = 'counter-label';
            labelDiv.textContent = 'Întrebări completate';
            
            const valueDiv = document.createElement('div');
            valueDiv.className = 'counter-value';
            
            // If the existing counter structure exists, keep it
            if (currentQuestionElement && totalQuestionsElement) {
                valueDiv.appendChild(currentQuestionElement.cloneNode(true));
                valueDiv.appendChild(document.createTextNode('/'));
                valueDiv.appendChild(totalQuestionsElement.cloneNode(true));
            } else {
                valueDiv.innerHTML = `<span class="current-question">${answered}</span>/<span class="total-questions">${total}</span>`;
            }
            
            // Clear and append new elements
            counterElement.innerHTML = '';
            counterElement.appendChild(labelDiv);
            counterElement.appendChild(valueDiv);
        } else if (currentQuestionElement) {
            // Just update the counter value
            currentQuestionElement.textContent = answered;
        }
        
        // Update progress bar fill
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
            
            // Update ARIA attributes for accessibility
            const progressBar = progressFill.closest('.progress-bar');
            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', Math.round(percentage));
            }
        }
        
        // Update time estimate with label
        const timeEstimate = document.querySelector('.time-estimate');
        if (timeEstimate) {
            const remainingQuestions = total - answered;
            const estimatedMinutes = Math.max(Math.ceil(remainingQuestions * 0.375), 1);
            
            // Add time label if it doesn't exist
            if (!timeEstimate.querySelector('.time-label')) {
                const labelDiv = document.createElement('div');
                labelDiv.className = 'time-label';
                labelDiv.textContent = 'Timp estimat rămas';
                
                const valueDiv = document.createElement('div');
                valueDiv.className = 'time-value';
                valueDiv.innerHTML = `<i class="fas fa-clock"></i> <span>${estimatedMinutes} minute</span>`;
                
                // Clear and append new elements
                timeEstimate.innerHTML = '';
                timeEstimate.appendChild(labelDiv);
                timeEstimate.appendChild(valueDiv);
            } else {
                // Just update the value
                const valueSpan = timeEstimate.querySelector('.time-value span');
                if (valueSpan) {
                    valueSpan.textContent = `${estimatedMinutes} minute`;
                }
            }
        }
        
        // Update navigation button states based on position, not answer status
        if (window.updateNavButtonsState) {
            window.updateNavButtonsState();
        }
        
        // Update motivational message
        const progressMessage = document.querySelector('.progress-message');
        if (progressMessage && typeof getMotivationalMessage === 'function') {
            const message = getMotivationalMessage(percentage, answered);
            progressMessage.innerHTML = message;
            
            // Celebrate milestone achievements
            if ([25, 50, 75, 100].includes(Math.floor(percentage)) && percentage > 0) {
                progressMessage.classList.add('celebrate');
                setTimeout(() => {
                    progressMessage.classList.remove('celebrate');
                }, 1500);
            }
        }
        
        // Show restoration notification if requested
        if (showRestorationNotification && answered > 0 && window.notificationSystem) {
            window.notificationSystem.showRestoration(answered, total);
        }
        
        // Update save indicator time
        const saveIndicatorText = document.querySelector('.save-indicator-text');
        if (saveIndicatorText) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ro-RO', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            saveIndicatorText.textContent = `Salvat ${timeString}`;
        }
    }
    
    // Funcție pentru actualizarea stării butoanelor de navigare
    function updateNavButtonsState() {
        if (!window.questionNavigation) return;
        
        const currentIndex = window.questionNavigation.getCurrentQuestionIndex();
        const allQuestions = window.questionNavigation.getAllQuestionElements();
        const totalQuestionElements = allQuestions.length;
        
        if (prevBtn) {
            const isFirstQuestion = currentIndex === 0;
            prevBtn.disabled = isFirstQuestion;
            prevBtn.classList.toggle('nav-btn-disabled', isFirstQuestion);
        }
        
        if (nextBtn) {
            const isLastQuestion = currentIndex === totalQuestionElements - 1;
            nextBtn.disabled = isLastQuestion;
            nextBtn.classList.toggle('nav-btn-disabled', isLastQuestion);
        }
    }
    
    // Configurare observator pentru modificări în formular
    function setupChangeObserver() {
        const form = document.getElementById('raadsrForm');
        if (form) {
            form.addEventListener('change', (e) => {
                if (e.target.type === 'radio') {
                    const total = questions?.length || 80;
                    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
                    
                    updateProgressDisplay(answered, total);
                    
                    const currentQuestion = e.target.closest('.question');
                    if (currentQuestion) {
                        currentQuestion.classList.add('completed');
                        currentQuestion.classList.remove('highlight-unanswered');
                        
                        const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                            .find(q => !q.querySelector('input[type="radio"]:checked'));
                            
                        if (nextUnanswered) {
                            document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                            nextUnanswered.classList.add('current');
                            
                            const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;
                            const targetPosition = nextUnanswered.getBoundingClientRect().top + 
                                                 window.pageYOffset - offset;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                        
                        updateNavButtonsState();
                    }
                }
            });
        }
    }
    
    // Inițializare observator de modificări
    setupChangeObserver();
    
    // Funcție pentru actualizarea inițială
    function initialUpdate() {
        const total = questions?.length || 80;
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        
        updateProgressDisplay(answered, total, answered > 0);
        updateSaveTime(false);
    }
    
    // Efectuează actualizarea inițială
    initialUpdate();
    
    // Returnează interfața publică
    return {
        updateProgress: function(showRestorationNotification = false) {
            const total = questions?.length || 80;
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            updateProgressDisplay(answered, total, showRestorationNotification);
        },
        
        updateSaveTime: function(animate) {
            updateSaveTime(animate);
        },
        
        checkVisibility: handleVisibility,
        
        showProgressRestorationNotification: function() {
            const total = questions?.length || 80;
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            if (answered > 0) {
                showProgressRestorationNotification(answered, total);
            }
        }
    };
}

/**
 * Funcție unificată pentru actualizarea progresului
 */
function updateProgress() {
    const total = questions.length || 80;
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const percentage = (answered / total) * 100;
    
    // Actualizează bara de progres
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    // Actualizează contorul de întrebări
    const currentQuestionElement = document.querySelector('.current-question');
    if (currentQuestionElement) {
        currentQuestionElement.textContent = answered;
    }
    
    // Actualizează mesajul de progres
    const progressMessage = document.querySelector('.progress-message');
    if (progressMessage) {
        progressMessage.innerHTML = getProgressMessage(percentage, answered);
    }
    
    // Actualizează starea butoanelor de navigare
    const currentIndex = window.questionNavigation ? 
        window.questionNavigation.getCurrentQuestionIndex() : 0;
    const totalQuestions = window.questionNavigation ? 
        window.questionNavigation.getAllQuestionElements().length : total;
    
    updateNavButtonsState(currentIndex, totalQuestions);
}

/**
 * Actualizează starea butoanelor de navigare
 */
function updateNavButtonsState(currentIndex, totalQuestions) {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        const isFirstQuestion = currentIndex === 0;
        prevBtn.disabled = isFirstQuestion;
        prevBtn.classList.toggle('nav-btn-disabled', isFirstQuestion);
    }
    
    if (nextBtn) {
        const isLastQuestion = currentIndex === totalQuestions - 1;
        nextBtn.disabled = isLastQuestion;
        nextBtn.classList.toggle('nav-btn-disabled', isLastQuestion);
    }
}

/**
 * Sistem unificat de urmărire a progresului cu controale de navigare îmbunătățite
 */
function initProgressTracking() {
    // Inițializează funcționalitatea barei de progres
    const progressBar = initProgressBar();
    window.progressBarInstance = progressBar;
    
    // Funcție pentru a verifica dacă suntem în secțiunea de test
    function isInTestSection() {
        const testContainer = document.querySelector('.test-actual-container');
        if (!testContainer) return false;

        const testRect = testContainer.getBoundingClientRect();
        const testStart = testContainer.offsetTop;
        const testEnd = testStart + testContainer.offsetHeight;
        const currentScroll = window.scrollY;

        return currentScroll >= testStart && currentScroll <= testEnd;
    }
    
    // Gestionarea derulării cu debouncing pentru performanță
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            const progressContainer = document.querySelector('.progress-container');
            if (progressContainer) {
                if (isInTestSection()) {
                    progressContainer.classList.add('visible');
                } else {
                    progressContainer.classList.remove('visible');
                }
            }
        }, 100);
    }
    
    // Monitorizează poziția de derulare
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Verificare inițială
    handleScroll();
    
    // Gestionează redimensionarea ferestrei
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleScroll, 200);
    }, { passive: true });
    
    // Funcții pentru navigarea între întrebări
    function getAllQuestionElements() {
        return Array.from(document.querySelectorAll('.question'));
    }
    
    function getCurrentQuestionIndex() {
        const allQuestions = getAllQuestionElements();
        const currentQuestion = document.querySelector('.question.current');

        if (currentQuestion) {
            return allQuestions.indexOf(currentQuestion);
        }

        // Găsește prima întrebare fără răspuns sau returnează 0
        const firstUnanswered = allQuestions.findIndex(q => !q.querySelector('input[type="radio"]:checked'));
        return firstUnanswered >= 0 ? firstUnanswered : 0;
    }
    
    function navigateToQuestion(index) {
        const allQuestions = getAllQuestionElements();

        // Asigură-te că indexul este în limite
        if (index < 0) index = 0;
        if (index >= allQuestions.length) index = allQuestions.length - 1;

        // Elimină clasa current de la toate întrebările
        allQuestions.forEach(q => q.classList.remove('current'));

        // Adaugă clasa current la întrebarea țintă
        allQuestions[index].classList.add('current');

        // Derulează la întrebare
        const progressContainer = document.querySelector('.progress-container');
        const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;
        window.scrollTo({
            top: allQuestions[index].getBoundingClientRect().top + window.pageYOffset - offset,
            behavior: 'smooth'
        });

        // Actualizează starea butoanelor de navigare
        updateNavButtonsState(index, allQuestions.length);
    }
    
    // Definește un controler de navigare care poate fi folosit de butoane și tastatură
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
    
    // Actualizare inițială a stării butoanelor de navigare
    const initialIndex = getCurrentQuestionIndex();
    updateNavButtonsState(initialIndex, getAllQuestionElements().length);
    
    // Delegare de evenimente pentru schimbările butoanelor radio
    const form = document.getElementById('raadsrForm');
    if (form) {
        form.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                const currentQuestion = e.target.closest('.question');
                if (currentQuestion) {
                    currentQuestion.classList.add('completed');
                    currentQuestion.classList.remove('highlight-unanswered');

                    updateProgress();

                    // Găsește și derulează la următoarea întrebare fără răspuns
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

                        // Actualizează evidențierea întrebării curente
                        document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                        nextUnanswered.classList.add('current');
                    }
                }
            }
        });
    }
    
    // Inițializează progresul
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

// ===== MODUL DE STOCARE ȘI SALVARE AUTOMATĂ =====

/**
 * Manager de stocare avansat cu alternativă
 * Oferă un API unificat pentru stocarea persistentă a datelor
 */
class StorageManager {
    constructor(prefix = 'raads_r_') {
        this.prefix = prefix;
        this.mechanism = this._detectBestMechanism();
        this.debounceTimers = {};
    }

    /**
     * Detectează cel mai bun mecanism de stocare disponibil
     * @returns {string} Numele mecanismului disponibil
     */
    _detectBestMechanism() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return 'localStorage';
        } catch (e) {
            try {
                sessionStorage.setItem('test', 'test');
                sessionStorage.removeItem('test');
                return 'sessionStorage';
            } catch (e) {
                return 'cookies';
            }
        }
    }

    /**
     * Construiește o cheie cu prefix
     * @param {string} key Cheia de bază
     * @returns {string} Cheia cu prefix
     */
    _buildKey(key) {
        return `${this.prefix}${key}`;
    }

    /**
     * Setează o valoare cu debouncing opțional
     * @param {string} key Cheia sub care se stochează
     * @param {any} value Valoarea de stocat
     * @param {number} debounceMs Timp de debounce în milisecunde (0 pentru imediat)
     */
    set(key, value, debounceMs = 0) {
        const prefixedKey = this._buildKey(key);

        if (this.debounceTimers[prefixedKey]) {
            clearTimeout(this.debounceTimers[prefixedKey]);
        }

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
     * Metodă internă pentru setarea valorii bazată pe mecanismul disponibil
     * @param {string} key Cheia cu prefix
     * @param {any} value Valoarea de stocat
     */
    _setValue(key, value) {
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
                    const expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 30);
                    document.cookie = `${key}=${encodeURIComponent(serialized)};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
                    break;
            }
        } catch (e) {
            console.warn(`Eșec la stocarea valorii pentru ${key}:`, e);
        }
    }

    /**
     * Obține o valoare stocată
     * @param {string} key Cheia de recuperat
     * @param {any} defaultValue Valoarea implicită dacă cheia nu există
     * @returns {any} Valoarea stocată sau implicită
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
            console.warn(`Eșec la recuperarea valorii pentru ${key}:`, e);
            return defaultValue;
        }
    }

    /**
     * Elimină o valoare stocată
     * @param {string} key Cheia de eliminat
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
            console.warn(`Eșec la eliminarea valorii pentru ${key}:`, e);
        }
    }

    /**
     * Șterge toate valorile stocate cu acest prefix
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
            console.warn('Eșec la ștergerea tuturor valorilor stocate:', e);
        }
    }
}

/**
 * Manager pentru salvare automată a testului RAADS-R
 * Gestionează salvarea și restaurarea stării testului cu feedback îmbunătățit pentru utilizator
 */
class AutoSaveManager {
    constructor() {
        this.storage = new StorageManager('raads_r_');
        this.saveNotificationTimeout = null;
        this.progressNotificationTimeout = null;
        this.initNotificationSystem();
    }

    /**
     * Inițializează sistemul de notificări pentru actualizările de salvare
     */
    initNotificationSystem() {
        if (!document.getElementById('save-notification')) {
            const notification = document.createElement('div');
            notification.id = 'save-notification';
            notification.className = 'save-notification';
            notification.setAttribute('role', 'status');
            notification.setAttribute('aria-live', 'polite');
            notification.innerHTML = `
                <i class="fas fa-floppy-disk"></i>
                <span id="save-notification-text">Salvat</span>
            `;
            document.body.appendChild(notification);
        }

        if (!document.getElementById('progress-notification')) {
            const notification = document.createElement('div');
            notification.id = 'progress-notification';
            notification.className = 'progress-notification';
            notification.setAttribute('role', 'status');
            notification.setAttribute('aria-live', 'polite');
            notification.innerHTML = 'Progres salvat';
            document.body.appendChild(notification);
        }

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
     * Afișează notificare cu mesaj personalizat
     * @param {string} message Mesajul de afișat
     * @param {string} type Tipul de notificare (success, info, warning)
     */
    showNotification(message, type = 'success') {
        const notification = document.getElementById('save-notification');
        if (!notification) return;
        
        const textSpan = notification.querySelector('#save-notification-text');
        if (textSpan) textSpan.textContent = message;
        
        notification.style.background = 
            type === 'success' ? '#4CAF50' :
            type === 'info' ? '#2196F3' :
            type === 'warning' ? '#FF9800' : '#4CAF50';
        
        notification.classList.add('visible');
        
        if (this.saveNotificationTimeout) {
            clearTimeout(this.saveNotificationTimeout);
        }
        
        this.saveNotificationTimeout = setTimeout(() => {
            notification.classList.remove('visible');
        }, 2000);
    }

    /**
     * Afișează notificare de progres în apropiere de bara de progres
     * @param {string} message Mesajul de afișat
     */
    showProgressNotification(message) {
        const notification = document.getElementById('progress-notification');
        if (!notification) return;
        
        if (this.progressNotificationTimeout) {
            clearTimeout(this.progressNotificationTimeout);
        }
        
        notification.textContent = message;
        notification.classList.add('visible');
        
        this.progressNotificationTimeout = setTimeout(() => {
            notification.classList.remove('visible');
        }, 2000);
    }

    /**
     * Afișează notificare toast de restaurare
     * @param {number} answered Numărul de întrebări cu răspuns
     * @param {number} total Numărul total de întrebări
     */
    showRestorationToast(answered, total) {
        const toast = document.getElementById('progress-restoration-toast');
        if (!toast) return;
        
        const details = toast.querySelector('#restoration-details');
        if (details) {
            details.textContent = `${answered} din ${total} întrebări completate (${Math.round(answered/total*100)}%)`;
        }
        
        toast.classList.add('visible');
        
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 5000);
    }

    /**
     * Actualizează indicatorul de timp pentru ultima salvare
     */
    updateLastSaveTime() {
        const timeIndicator = document.getElementById('last-save-time');
        if (!timeIndicator) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const indicator = document.getElementById('last-save-indicator');
        if (indicator) {
            indicator.classList.add('saving');
            setTimeout(() => indicator.classList.remove('saving'), 1000);
        }
        
        timeIndicator.textContent = `Ultima salvare: ${timeString}`;
    }

    /**
     * Salvează starea actuală a testului în stocare
     * @returns {boolean} Starea de succes
     */
    saveTestState() {
        try {
            // Obține răspunsurile curente
            const answers = {};
            questions.forEach(question => {
                const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);
                if (selected) {
                    answers[question.id] = selected.value;
                }
            });
            
            // Obține starea de completare
            const completed = Object.keys(answers).length === questions.length;
            
            // Obține întrebarea activă
            const currentQuestionEl = document.querySelector('.question.current');
            let currentQuestion = null;
            if (currentQuestionEl) {
                const questionNumber = currentQuestionEl.querySelector('input[type="radio"]')?.name?.replace('question_', '');
                if (questionNumber) {
                    currentQuestion = parseInt(questionNumber);
                }
            }
            
            // Salvează starea testului
            const testState = {
                answers,
                timestamp: new Date().toISOString(),
                completed,
                currentQuestion,
                scrollPosition: window.scrollY,
                screenWidth: window.innerWidth,
                lastSaved: new Date().toISOString()
            };
            
            this.storage.set('test_state', testState, 500); // Debounce cu 500ms
            
            // Salvează rezultatele dacă testul este completat și rezultatele sunt calculate
            if (completed && document.getElementById('result').style.display !== 'none') {
                const calculatedScores = calculateSubscores();
                this.storage.set('test_results', calculatedScores);
            }
            
            // Actualizează indicatorul de ultimă salvare
            this.updateLastSaveTime();
            
            // Afișează o notificare discretă
            this.showProgressNotification('Progres salvat');
            
            return true;
        } catch (error) {
            console.error('Eroare la salvarea stării testului:', error);
            return false;
        }
    }

    /**
     * Restaurează starea testului din stocare
     * @returns {boolean} Starea de succes
     */
    restoreTestState() {
        try {
            const testState = this.storage.get('test_state');
            if (!testState || !testState.answers || Object.keys(testState.answers).length === 0) {
                return false;
            }
            
            // Restaurează răspunsurile
            let answeredCount = 0;
            Object.entries(testState.answers).forEach(([questionId, value]) => {
                const input = document.querySelector(`input[name="question_${questionId}"][value="${value}"]`);
                if (input) {
                    input.checked = true;
                    answeredCount++;
                    
                    // Marchează întrebarea ca fiind completată
                    const questionDiv = input.closest('.question');
                    if (questionDiv) {
                        questionDiv.classList.add('completed');
                    }
                }
            });
            
            // Asigură-te că bara de progres este inițializată și actualizată
            if (typeof updateProgress === 'function') {
                updateProgress();
            }
            
            // Arată notificarea de restaurare
            if (window.notificationSystem && typeof window.notificationSystem.showRestoration === 'function') {
                window.notificationSystem.showRestoration(answeredCount, questions.length);
            } else {
                this.showRestorationToast(answeredCount, questions.length);
            }
            
            // Gestionează testul completat
            if (testState.completed) {
                const results = this.storage.get('test_results');
                
                if (results) {
                    if (typeof handleSubmit === 'function') {
                        handleSubmit({ preventDefault: () => {} });
                    } else {
                        console.warn('Funcția handleSubmit nu a fost găsită, nu se pot afișa rezultatele automat');
                    }
                    return true;
                }
                
                if (answeredCount === questions.length) {
                    if (typeof handleSubmit === 'function') {
                        handleSubmit({ preventDefault: () => {} });
                    }
                    return true;
                }
            }
            
            // Pentru test incomplet, setează întrebarea curentă
            if (testState.currentQuestion) {
                const currentQuestionEl = document.querySelector(`input[name="question_${testState.currentQuestion}"]`)?.closest('.question');
                if (currentQuestionEl) {
                    document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                    currentQuestionEl.classList.add('current');
                }
            }
            
            // Găsește următoarea întrebare fără răspuns dacă nu există o întrebare curentă
            if (!document.querySelector('.question.current')) {
                const nextUnanswered = Array.from(document.querySelectorAll('.question:not(.completed)'))
                    .find(q => !q.querySelector('input[type="radio"]:checked'));
                    
                if (nextUnanswered) {
                    document.querySelectorAll('.question').forEach(q => q.classList.remove('current'));
                    nextUnanswered.classList.add('current');
                }
            }
            
            return true;
        } catch (error) {
            console.error('Eroare la restaurarea stării testului:', error);
            return false;
        }
    }

    /**
     * Șterge starea salvată
     */
    clearSavedState() {
        this.storage.remove('test_state');
        this.storage.remove('test_results');
    }

    /**
     * Creează o notificare de eroare pentru eșecuri critice
     * @param {string} errorMessage Mesajul de eroare
     */
    createErrorNotification(errorMessage) {
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
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        } catch (error) {
            console.error('Eroare critică în sistemul de notificări:', error);
        }
    }
}

// Creează instanță globală a AutoSaveManager
const autoSaveManager = new AutoSaveManager();
window.autoSaveManager = autoSaveManager;

// Sistem de notificări global
window.notificationSystem = {
    initialized: false,
    
    init: function() {
        if (this.initialized) return;
        
        // Asigură-te că containerele de notificări există
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
            
            // Adaugă funcționalitate butonului de închidere
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
        
        this.initialized = true;
    },
    
    showRestoration: function(answered, total) {
        this.init(); // Asigură inițializarea
        
        const toast = document.getElementById('progress-restored-toast');
        if (!toast) return false;
        
        // Actualizează detaliile
        const details = toast.querySelector('#restoration-details');
        if (details) {
            details.textContent = `${answered} din ${total} întrebări completate (${Math.round(answered/total*100)}%)`;
        }
        
        // Afișează toast-ul cu animație
        toast.classList.add('visible');
        
        // Ascunde automat după 5 secunde
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 5000);
        
        return true;
    }
};

// ===== CONTROL NAVIGARE TASTATURĂ =====

/**
 * Îmbunătățește navigarea cu tastatură pentru accesibilitate
 * - Tastele săgeată navighează între opțiunile radio când un buton radio este focalizat
 * - Ctrl+Săgeată Sus/Jos navighează între întrebări
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;

        // Sari navigarea când focusul este în câmpuri care au nevoie de tastele săgeată
        if (activeElement.tagName === 'TEXTAREA' ||
            (activeElement.tagName === 'INPUT' &&
            activeElement.type !== 'radio' &&
            activeElement.type !== 'checkbox')) {
            return;
        }

        // Gestionează navigarea grupului de butoane radio
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
            // Gestionează navigarea întrebărilor cu tastele Ctrl+Săgeată
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

// ===== GESTIUNE BUTOANE DE AJUTOR =====

/**
 * Configurează funcționalitatea butonului de ajutor
 */
function setupHelpButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.help-button')) {
            const button = e.target.closest('.help-button');
            const helpContent = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Comută conținutul de ajutor
            button.setAttribute('aria-expanded', !isExpanded);
            helpContent.hidden = isExpanded;

            // Adaugă clasa de animație
            if (!isExpanded) {
                helpContent.classList.add('help-content-show');
            } else {
                helpContent.classList.remove('help-content-show');
            }

            // Anunță cititoarele de ecran
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

// ===== EVIDENȚIERE SECȚIUNE VIZIBILĂ =====

/**
 * Evidențiază elementul QuickNav al secțiunii aflate momentan în vizualizare
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

    // Folosește un handler de derulare cu debouncing pentru performanță mai bună
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

                // Verifică dacă secțiunea este în mijlocul vizualizării
                if (window.scrollY + window.innerHeight / 2 >= sectionTop &&
                    window.scrollY + window.innerHeight / 2 < sectionBottom) {
                    currentSection = section.id;
                }
            });

            // Elimină clasa active de la toate elementele QuickNav
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Setează clasa active pe elementul nav al secțiunii curente
            if (currentSection) {
                const activeNavItem = document.querySelector(`a[href="#${currentSection}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        }, 100);
    }

    // Adaugă listener de eveniment de derulare cu opțiunea pasivă pentru performanță
    window.addEventListener('scroll', checkSectionVisibility, { passive: true });

    // Verificare inițială
    checkSectionVisibility();

    return {
        destroy: () => {
            window.removeEventListener('scroll', checkSectionVisibility);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        }
    };
}

// ===== INIȚIALIZARE ȘI GESTIONARE EVENIMENTE =====

/**
 * Generează formularul cu clase Bootstrap îmbunătățite pentru accesibilitate
 */
function initializeForm() {
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question', 'mb-4');
        questionDiv.setAttribute('role', 'group');
        questionDiv.setAttribute('aria-labelledby', `question-${question.id}-label`);
        questionDiv.setAttribute('data-question-number', question.id);

        // Container etichetă întrebare
        const questionLabel = document.createElement('div');
        questionLabel.id = `question-${question.id}-label`;
        questionLabel.classList.add('question-text');
        questionLabel.innerHTML = `${question.id}. ${question.text}`;

        // Adaugă indicator de scorare inversă pentru cititoarele de ecran
        if (INVERSE_SCORING_QUESTIONS.includes(question.id)) {
            const inverseNote = document.createElement('span');
            inverseNote.classList.add('sr-only');
            inverseNote.innerHTML = ' (Întrebare cu scorare inversă)';
            questionLabel.appendChild(inverseNote);
        }

        questionDiv.appendChild(questionLabel);

        // Creează fieldset pentru butoane radio
        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('options');

        // Adaugă legendă pentru cititoarele de ecran
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

            // Adaugă descriere pentru cititoarele de ecran
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

        // Adaugă buton de ajutor
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

/**
 * Gestionare click buton de transmitere - calculează și afișează scorul testului
 */
function handleSubmit(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }

    // Resetează stările de eroare
    errorDiv.style.display = 'none';
    errorBelowDiv.style.display = 'none';
    errorDiv.innerHTML = '';
    errorBelowDiv.innerHTML = '';

    // Elimină evidențierile anterioare
    document.querySelectorAll('.highlight-unanswered').forEach(el => {
        el.classList.remove('highlight-unanswered');
    });

    // Găsește întrebările fără răspuns
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

    // Gestionează întrebările fără răspuns
    if (unanswered.length > 0) {
        const errorMessage = `Te rog să răspunzi la toate întrebările. Întrebările fără răspuns: ${unanswered.join(', ')}`;
        errorDiv.innerHTML = errorMessage;
        errorBelowDiv.innerHTML = errorMessage;
        errorDiv.style.display = 'block';
        errorBelowDiv.style.display = 'block';
        resultDiv.style.display = 'none';

        // Găsește și derulează la prima întrebare fără răspuns
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
        // Calculează scorurile
        const results = calculateSubscores();
        const { subscores, totalScore, diagnosticIndicators } = results;
        const interpretation = getInterpretation(totalScore);

        // Anunță rezultatul cititoarelor de ecran
        announceResult(totalScore, interpretation);

        // Creează HTML-ul rezultatelor îmbunătățite
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

                    <!-- Componente vizuale scor -->
                    ${createScoreVisual('Limbaj', subscores.language, RAADS_R_THRESHOLDS.language, 21)}
                    ${createScoreVisual('Relaționare socială', subscores.socialRelatedness, RAADS_R_THRESHOLDS.socialRelatedness, 117)}
                    ${createScoreVisual('Senzorial-motor', subscores.sensoryMotor, RAADS_R_THRESHOLDS.sensoryMotor, 60)}
                    ${createScoreVisual('Interese circumscrise', subscores.circumscribedInterests, RAADS_R_THRESHOLDS.circumscribedInterests, 42)}

                    <!-- Interpretări Categorii -->
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

                    <!-- Legendă -->
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

        // Actualizează starea UI
        resultDiv.style.display = 'block';
        submitBtn.style.display = 'none';
        exportBtn.style.display = 'block';
        restartBtn.style.display = 'block';
        shareBtn.style.display = 'block';

        // Ascunde bara de progres
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            // Mai întâi elimină clasa 'visible' cu tranziție
            progressContainer.classList.remove('visible');

            // După tranziție, forțează ascunderea
            setTimeout(() => {
                progressContainer.style.display = 'none';
            }, 300); // Potrivește cu timpul de tranziție CSS
        }

        // Actualizează padding-ul containerului de test pentru a preveni saltul de layout
        const testContainer = document.querySelector('.test-actual-container');
        if (testContainer) {
            testContainer.style.paddingTop = '20px'; // Resetează la padding-ul implicit
        }

        // Dezactivează toate input-urile radio
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.disabled = true;
        });

        // Adaugă buton email
        const emailBtn = document.getElementById('emailBtn');
        if (emailBtn) {
            emailBtn.style.display = 'block';
        }

        // Derulează la rezultate
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
        console.error('Eroare la calcularea scorurilor:', error);
        errorDiv.innerHTML = `A apărut o eroare în timpul calculării scorului: ${error.message}`;
        errorDiv.style.display = 'block';
    }
}

/**
 * Funcționalitate de restart test
 */
function restartTest() {
    // Resetează vizibilitatea containerului de progres
    const progressContainer = document.querySelector('.progress-container');

    if (progressContainer) {
        progressContainer.style.display = ''; // Elimină display: none

        // Scurtă întârziere pentru a permite afișajului să își facă efectul înainte de adăugarea clasei visible
        setTimeout(() => {
            progressContainer.classList.add('visible');
        }, 10);
    }

    // Resetează padding-ul containerului de test
    const testContainer = document.querySelector('.test-actual-container');
    if (testContainer) {
        testContainer.style.paddingTop = '120px'; // Resetează la padding-ul original
    }

    // Activează toate input-urile radio și le deselectează
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = false;
        radio.checked = false;
    });

    // Elimină clasele de completare din întrebări
    document.querySelectorAll('.question').forEach(question => {
        question.classList.remove('completed');
        question.classList.remove('current');
    });

    // Ascunde rezultatele și butoanele de acțiune
    if (resultDiv) resultDiv.style.display = 'none';
    if (exportBtn) exportBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (shareBtn) shareBtn.style.display = 'none';

    // Afișează butonul de trimitere
    if (submitBtn) submitBtn.style.display = 'block';

    // Elimină orice evidențiere
    document.querySelectorAll('.highlight-unanswered').forEach(el => {
        el.classList.remove('highlight-unanswered');
    });

    // Ascunde modalul
    const restartWarningModal = document.getElementById('restartWarningModal');
    if (restartWarningModal) {
        const bsModal = bootstrap.Modal.getInstance(restartWarningModal);
        if (bsModal) bsModal.hide();
    }

    // Resetează progresul
    updateProgress();

    // Resetează starea salvată
    if (window.autoSaveManager) {
        window.autoSaveManager.clearSavedState();
    }

    // Găsește prima întrebare
    const firstQuestion = document.querySelector('.question');
    if (firstQuestion) {
        // Adaugă clasa current la prima întrebare
        firstQuestion.classList.add('current');

        // Derulează la prima întrebare cu offset pentru bara de progres
        const offset = progressContainer ? progressContainer.offsetHeight + 20 : 20;

        setTimeout(() => {
            const targetPosition = firstQuestion.getBoundingClientRect().top +
                                 window.pageYOffset -
                                 offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 100); // Mică întârziere pentru a asigura actualizări complete DOM
    }

    // Șterge anunțătorul pentru cititoarele de ecran
    if (resultAnnouncer) {
        resultAnnouncer.textContent = "Test resetat. Poți începe din nou.";
    }
}

/**
 * Generează un identificator aleator pentru partajare
 */
function generateUniqueId() {
    return 'raads_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Funcție îmbunătățită de partajare pe Facebook
 */
async function shareToFacebook() {
    try {
        // Afișează starea de încărcare
        if (!shareBtn) return;

        shareBtn.disabled = true;
        shareBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Se pregătește imaginea...';

        // Calculează scorurile folosind sistemul de scorare RAADS-R
        const results = calculateSubscores();

        // Formatează scorurile
        const formattedResults = {
            subscores: {
                language: Math.round(results.subscores.language) || 0,
                socialRelatedness: Math.round(results.subscores.socialRelatedness) || 0,
                sensoryMotor: Math.round(results.subscores.sensoryMotor) || 0,
                circumscribedInterests: Math.round(results.subscores.circumscribedInterests) || 0
            },
            totalScore: Math.round(results.totalScore) || 0
        };

        // Obține interpretarea bazată pe scorul total
        const interpretation = getInterpretation(formattedResults.totalScore);

        // Obține culoarea pentru scorul total
        const totalScoreColor = formattedResults.totalScore < 65 ? '#4CAF50' :
                               formattedResults.totalScore < 90 ? '#FFC107' : '#F44336';

        // Creează un container vizibil pentru html2canvas
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

        // Definește categoriile de scor
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

        // Creează conținutul HTML
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

        // Așteaptă un moment scurt pentru randare
        await new Promise(resolve => setTimeout(resolve, 100));

        // Generează imaginea
        const canvas = await html2canvas(container, {
            width: 1200,
            height: 630,
            scale: 1,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        });

        // Elimină containerul
        document.body.removeChild(container);

        // Convertește canvas în blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));

        // Creează FormData
        const formData = new FormData();
        const uniqueId = generateUniqueId();
        formData.append('image', blob, uniqueId + '.jpg');
        formData.append('id', uniqueId);
        formData.append('score', formattedResults.totalScore.toString());
        formData.append('subscores', JSON.stringify(formattedResults.subscores));
        formData.append('interpretation', interpretation);

        // Încarcă și partajează
        const response = await fetch('/save-result-image.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Încărcarea a eșuat: ' + response.statusText);
        }

        const data = await response.json();

        // Deschide dialogul de partajare Facebook
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.shareUrl)}`;
        window.open(
            fbShareUrl,
            'facebook-share-dialog',
            'width=626,height=436,top=' + (window.innerHeight - 436) / 2 + ',left=' + (window.innerWidth - 626) / 2
        );

    } catch (error) {
        console.error('Eroare la partajare:', error);
        alert('A apărut o eroare la distribuirea rezultatelor. Vă rugăm să încercați din nou.');
    } finally {
        if (shareBtn) {
            shareBtn.disabled = false;
            shareBtn.innerHTML = '<i class="fab fa-facebook me-2"></i>Distribuie pe Facebook';
        }
    }
}

/**
 * Configurează ascultătorii de evenimente
 */
function setupEventListeners() {
    // Handler buton de trimitere
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    }

    // Handler buton de export
    if (exportBtn) {
        exportBtn.addEventListener('click', exportRobustRomanianPDF);
    }

    // Handler buton de restart
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

    // Handler buton de confirmare restart
    const confirmRestartBtn = document.getElementById('confirmRestartBtn');
    if (confirmRestartBtn) {
        confirmRestartBtn.addEventListener('click', restartTest);
    }

    // Handler buton de start test
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

    // Handler buton de partajare
    if (shareBtn) {
        shareBtn.addEventListener('click', shareToFacebook);
    }

    // Evidențiază întrebările fără răspuns când se schimbă
    document.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            const currentQuestion = e.target.closest('.question');
            if (currentQuestion) {
                currentQuestion.classList.remove('highlight-unanswered');

                // Salvează starea testului când se selectează un buton radio
                if (window.autoSaveManager) {
                    window.autoSaveManager.saveTestState();
                }
            }
        }
    });

    // Salvează la focus/blur fereastră (utilizator care schimbă aplicații/taburi)
    window.addEventListener('focus', () => {
        if (window.autoSaveManager) {
            window.autoSaveManager.saveTestState();
        }
    });

    window.addEventListener('blur', () => {
        if (window.autoSaveManager) {
            window.autoSaveManager.saveTestState();
        }
    });

    // Salvează înainte de descărcare (utilizator care închide pagina)
    window.addEventListener('beforeunload', () => {
        if (window.autoSaveManager) {
            window.autoSaveManager.saveTestState();
        }
    });

    // Salvează periodic (la fiecare minut)
    setInterval(() => {
        if (window.autoSaveManager) {
            window.autoSaveManager.saveTestState();
        }
    }, 60000);
}

/**
 * Îmbunătățește controalele de navigare pentru mobile și desktop
 */
function enhanceNavigationControls() {
    // Gestionează poziționarea tooltip-urilor pentru cazuri de margine
    document.querySelectorAll('.nav-btn[title], .reset-btn[title]').forEach(btn => {
        btn.addEventListener('mouseenter', event => {
            // Verifică dacă suntem pe mobil (unde tooltip-urile ar trebui ascunse)
            if (window.innerWidth <= 768) return;
            
            // Mică întârziere pentru a asigura crearea tooltip-ului
            setTimeout(() => {
                const btnRect = event.target.getBoundingClientRect();
                
                // Verifică dacă poziția din dreapta ar fi în afara ecranului
                if (btnRect.right + 150 > window.innerWidth) { // 150px este o lățime estimată a tooltip-ului
                    // Aplică poziționare alternativă prin intermediul unei clase pentru tooltip pe partea stângă
                    event.target.classList.add('tooltip-left');
                } else {
                    // Tooltip în partea dreaptă implicită
                    event.target.classList.remove('tooltip-left');
                }
            }, 10);
        });
        
        // Curăță la părăsirea cu mouse-ul
        btn.addEventListener('mouseleave', event => {
            event.target.classList.remove('tooltip-left');
        });
    });
    
    // Îmbunătățește accesibilitatea pentru utilizatorii de dispozitive mobile (adaugă atribute ARIA)
    document.querySelectorAll('.nav-btn, .reset-btn').forEach(btn => {
        // Asigură atribute ARIA corecte pentru suport mai bun pentru cititoarele de ecran
        const title = btn.getAttribute('title');
        if (title) {
            btn.setAttribute('aria-label', title);
        }
    });
}

/**
 * Inițializează integrarea sistemelor
 * Creează canale de comunicare bidirecționale între subsisteme
 */
function initializeSystemIntegration() {
    // Stabilește referință stabilă la instanța barei de progres
    window.progressBarInstance = initProgressBar();
    
    // Extinde AutoSaveManager cu capacități îmbunătățite de notificare
    if (typeof AutoSaveManager !== 'undefined') {
        AutoSaveManager.prototype.notifyProgressUpdated = function(answered, total) {
            if (window.progressBarInstance && typeof window.progressBarInstance.updateProgress === 'function') {
                window.progressBarInstance.updateProgress(true); // Arată notificarea
            } else if (typeof updateProgress === 'function') {
                updateProgress(); // Fallback la funcția globală
            }
        };
        
        // Suprascrie handler-ul de eveniment de stocare pentru a asigura actualizări corecte de progres
        const originalStorageMethod = AutoSaveManager.prototype.saveTestState;
        if (typeof originalStorageMethod === 'function') {
            AutoSaveManager.prototype.saveTestState = function() {
                const result = originalStorageMethod.apply(this, arguments);
                
                // Actualizează indicatorul de timp de salvare după salvare
                if (window.progressBarInstance && typeof window.progressBarInstance.updateSaveTime === 'function') {
                    window.progressBarInstance.updateSaveTime(true);
                }
                
                return result;
            };
        }
    }
    
    // Verifică în siguranță pentru autoSaveManager și gestionează restaurarea
    if (window.autoSaveManager && window.autoSaveManager.storage) {
        try {
            const testState = window.autoSaveManager.storage.get('test_state');
            if (testState && testState.answers && Object.keys(testState.answers).length > 0) {
                // Obține numărul de întrebări cu răspuns
                const answeredCount = Object.keys(testState.answers).length;
                
                // Arată notificarea folosind sistemul nostru de notificări
                if (window.notificationSystem && typeof window.notificationSystem.showRestoration === 'function') {
                    window.notificationSystem.showRestoration(answeredCount, questions.length);
                }
                
                // Restaurează de fapt starea testului
                window.autoSaveManager.restoreTestState();
            }
        } catch (error) {
            console.error('Eroare în timpul restaurării stării testului:', error);
        }
    }
}

/**
 * Banner Termeni și Condiții - Funcționalitate simplificată
 */
function initTermsAndConditions() {
    const banner = document.getElementById('terms-banner');
    const dismissButton = document.getElementById('terms-dismiss');
    const understandButton = document.getElementById('terms-understand');
    const keyboardHintText = document.getElementById('keyboard-hint-text');
    
    // Check if banner exists
    if (!banner) {
        console.warn('Terms banner element not found');
        return;
    }
    
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem('termsBannerDismissed');
    
    if (isDismissed === 'true') {
        banner.classList.add('dismissed');
        document.body.classList.add('terms-dismissed');
        return; // Exit early if already dismissed
    }
    
    // Ensure banner is visible by removing any dismissed class
    banner.classList.remove('dismissed');
    document.body.classList.remove('terms-dismissed');
    
    // Add entrance animation
    banner.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        banner.style.transform = 'translateY(0)';
    }, 100);
    
    // Function to dismiss the banner
    function dismissBanner() {
        banner.classList.add('dismissed');
        document.body.classList.add('terms-dismissed');
        localStorage.setItem('termsBannerDismissed', 'true');
        
        // Announce to screen readers that the banner is dismissed
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.textContent = 'Notificare despre Termeni și Condiții închisă. Folosirea site-ului constituie în continuare acceptarea acestora.';
        document.body.appendChild(announcement);
        
        // Remove announcement after it's read
        setTimeout(function() {
            document.body.removeChild(announcement);
        }, 3000);
    }
    
    // Add click event to dismiss button
    if (dismissButton) {
        dismissButton.addEventListener('click', dismissBanner);
    }
    
    // Add click event to understand button
    if (understandButton) {
        understandButton.addEventListener('click', dismissBanner);
    }
    
    // Update keyboard hint text - simplify to only show Escape key
    if (keyboardHintText) {
        keyboardHintText.innerHTML = 'Apasă <kbd>Esc</kbd> pentru a închide';
    }
    
    // Add keyboard shortcut - only Escape key
    document.addEventListener('keydown', function(e) {
        // Escape key to dismiss
        if (e.key === 'Escape' && !banner.classList.contains('dismissed')) {
            dismissBanner();
        }
        
        // Debug: Ctrl+Shift+T to reset banner (for testing)
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            localStorage.removeItem('termsBannerDismissed');
            banner.classList.remove('dismissed');
            document.body.classList.remove('terms-dismissed');
            console.log('Terms banner reset - page will reload');
            location.reload();
        }
    });
    
    // Debug info
    console.log('Terms banner initialized:', {
        bannerExists: !!banner,
        isDismissed: isDismissed,
        bannerClasses: banner ? banner.className : 'N/A'
    });
}

/**
 * Funcția principală de inițializare
 */
function init() {
    // Inițializează Banner Termeni și Condiții
    initTermsAndConditions();

    // Inițializează formularul cu întrebări
    initializeForm();
    
    // Asigură-te că autoSaveManager este atașat la fereastră
    if (typeof autoSaveManager !== 'undefined' && !window.autoSaveManager) {
        window.autoSaveManager = autoSaveManager;
    }
    
    // Încearcă să restaurezi starea testului dacă managerul există
    if (window.autoSaveManager && typeof window.autoSaveManager.restoreTestState === 'function') {
        try {
            window.autoSaveManager.restoreTestState();
        } catch (error) {
            console.error('Eroare la restaurarea stării testului în timpul init:', error);
        }
    }

    // Inițializează urmărirea progresului
    initProgressTracking();

    // Configurează ascultătorii de evenimente
    setupEventListeners();

    // Configurează navigarea cu tastatură
    setupKeyboardNavigation();

    // Configurează butoanele de ajutor
    setupHelpButtons();

    // Configurează evidențierea secțiunii
    highlightInViewSection();
    
    // Îmbunătățește controalele de navigare
    enhanceNavigationControls();
    
    // Inițializează integrarea sistemelor
    setTimeout(initializeSystemIntegration, 300);
}

// Inițializează când DOM-ul este încărcat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}