# Test Autism Adulți (RAADS-R)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/hodorogandrei/testautism/graphs/commit-activity)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://www.testautism.ro/)

O implementare open source a Scalei Ritvo pentru Autism / Asperger Revizuite (RAADS-R), un instrument validat științific pentru screening-ul trăsăturilor autiste la adulți.

## 🎯 Descriere

RAADS-R evaluează prezența și intensitatea trăsăturilor autiste la adulți, prin 80 de afirmații structurate în patru domenii esențiale:

| Domeniu | Întrebări | Prag | Scor Maxim |
|---------|-----------|------|------------|
| Limbaj | 7 | 4 | 21 |
| Relaționare socială | 39 | 31 | 117 |
| Senzorial-motor | 20 | 16 | 60 |
| Interese circumscrise | 14 | 15 | 42 |

## ⚠️ Disclaimer IMPORTANT

**Acest test este EXCLUSIV pentru screening și NU pentru diagnostic.** Rezultatele trebuie interpretate de profesoniști medicali calificați, sau profesioniști calificați în domeniul sănătății mintale, în contextul unei evaluări amănunțite.

## ✨ Caracteristici

### Frontend

- 🎨 Interfață responsivă și modernă (Bootstrap 5)
- 📊 Vizualizare interactivă a rezultatelor
- 📱 Design adaptiv pentru mobile
- ♿ Accesibilitate prin UserWay
- 🌐 Suport multilingv (pregătit pentru i18n)

### Funcționalități

- 🧮 Sistem avansat de scoring RAADS-R
- 📑 Generare raport detaliat - Export PDF local (client-side)
- 📱 Sharing social media optimizat - Generare și distribuire imagine cu rezultate și 📈 Vizualizări SVG native
- 🔒 Zero data storage - Nu stochează date personale sau cookie-uri

## 🛠️ Tehnologii & atribuții

### Core

- HTML5 semantic
- CSS3 cu Flexbox/Grid
- JavaScript ES6+

### Biblioteci auxiliare frontend (via CDN)

```json
{
  "dependencies": {
    "bootstrap": "^5.3.0",
    "font-awesome": "^6.5.1",
    "html2pdf.js": "^0.9.3",
    "html2canvas": "^1.4.1",
    "userway": "^1.0.0"
  }
}
```

### Atribuiri externe

#### Biblioteci JavaScript & CSS
| Bibliotecă | Versiune | Copyright | Licență | Link |
|------------|----------|-----------|----------|------|
| Bootstrap | 5.3.0 | © 2011-2024 The Bootstrap Authors | [MIT](https://github.com/twbs/bootstrap/blob/main/LICENSE) | [GitHub](https://github.com/twbs/bootstrap) |
| Font Awesome Free | 6.5.1 | © Fonticons, Inc. | [Font: SIL OFL 1.1](https://scripts.sil.org/OFL)<br>[Code: MIT](https://opensource.org/licenses/MIT)<br>[Icons: CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [GitHub](https://github.com/FortAwesome/Font-Awesome) |
| html2pdf.js | 0.9.3 | © Erik Koopmans | [MIT](https://github.com/eKoopmans/html2pdf.js/blob/master/LICENSE) | [GitHub](https://github.com/eKoopmans/html2pdf.js) |
| html2canvas | 1.4.1 | © Niklas von Hertzen | [MIT](https://github.com/niklasvh/html2canvas/blob/master/LICENSE) | [GitHub](https://github.com/niklasvh/html2canvas) |
| UserWay Widget | - | © 2024 UserWay.org | [Commercial](https://userway.org/terms) | [Website](https://userway.org/) |

#### Instrumente de screening
| Instrument | Versiune | Copyright | Citare | DOI |
|------------|----------|-----------|---------|-----|
| RAADS-R | 2011 | © Ritvo et al. | Ritvo et al. (2011) | [10.1007/s10803-010-1133-5](https://doi.org/10.1007/s10803-010-1133-5) |

## 🚀 Quick Start

### Variantă rapidă
```bash
git clone https://github.com/username/testautism.git
cd testautism
# Deschideți index.html într-un browser modern
```

### Dezvoltare Locală
1. Faceți Fork la repository

2. Clonați local
```bash
git clone https://github.com/username/testautism.git
```
3. Configurați sharing endpoint în `config.js`:
```javascript
const CONFIG = {
  SHARING_ENDPOINT: '/save-result-image.php',
  FB_APP_ID: 'your_app_id'
};
```

4. Verificați că toate dependințele CDN sunt accesibile:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

## 📊 Sistem de Scoring

### Algoritm
```javascript
function calculateScore(answers) {
  const scoring = {
    normal: [3,2,1,0],     // Pentru întrebări standard
    inverse: [0,1,2,3]     // Pentru întrebări inverse
  };

  return answers.reduce((total, ans, idx) =>
    total + (inverseQuestions.includes(idx) ?
      scoring.inverse[ans] :
      scoring.normal[ans])
  , 0);
}
```

### Interpretare
| Scor | Interpretare |
|------|--------------|
| ≤ 65 | Sub prag |
| 66-89 | Posibil autism |
| 90-130 | Probabil autism |
| > 130 | Foarte probabil |

```javascript
if (score <= 65) return 'Sub pragul pentru autism';
if (score <= 89) return 'Posibil autism';
if (score <= 130) return 'Probabil autism';
return 'Foarte probabil autism';
```

## 📈 Validitate

Date din studiul de validare internațională (n=962):

```python
metrics = {
    'sensibilitate': 0.97,  # 97% true positive
    'specificitate': 1.00,  # 100% true negative
    'validitate_concurenta': 0.96,  # vs. ADOS-4
    'test_retest': 0.987    # repeatability
}
```

### 📑 Export PDF

Generează un raport PDF complet care include:
- Scor total și interpretare
- Scoruri pe categorii cu vizualizări
- Toate răspunsurile oferite
- Data completării testului

### Sharing Facebook

Generează o imagine personalizată cu:
- Scor total și interpretare
- Vizualizări pentru subscoruri
- Design adaptativ bazat pe scoruri
- Call-to-action pentru alți utilizatori

## 🤝 Contribuții

Contribuțiile sunt binevenite! Vă rugăm să:

1. Faceți **fork** la repository
2. Creați un **branch** pentru feature-ul vostru (`git checkout -b feature/AmazingFeature`)
3. Faceți **commit** la modificări (`git commit -m 'Add some AmazingFeature'`)
4. Faceți **push** către branch (`git push origin feature/AmazingFeature`)
5. Deschideți un **Pull Request**

## 📝 TO DO
- [ ] Traduceri în alte limbi
- [ ] Suport PWA (Progressive Web Application)
- [ ] mod offline
- [ ] GitHub Actions CI/CD (Continuous Integration / Continuous Delivery)
- [ ] Unit tests

## 📜 Licență și biblioteci auxiliare

Proiect sub licență [GNU GPL v3](LICENSE). Bibliotecile externe își păstrează licențele respective:

| Bibliotecă | Licență | Copyright |
|------------|---------|-----------|
| Bootstrap | MIT | The Bootstrap Authors |
| Font Awesome | MIT + CC BY 4.0 | Fonticons, Inc. |
| html2pdf.js | MIT | Erik Koopmans |
| html2canvas | MIT | Niklas von Hertzen |

## ✍️ Autori, Contribuitori și Atribuiri

### Echipa de dezvoltare

- **Andrei Hodorog** - _Lead Developer & Technical Architect_
  - [GitHub](https://github.com/hodorogandrei)
  - [LinkedIn](https://www.linkedin.com/in/andreihodorog/)
  - Contribuții: Arhitectură tehnică, implementare frontend, implementare algoritmi de scoring

- **Ovidiu Platon** - _Product Owner & Subject Matter Expert_
  - [Website - Ovidiu Platon - Cabinet de Consiliere Neuroafirmativă](https://www.ovidiuplaton.com)
  - [LinkedIn](https://www.linkedin.com/in/ovidiuplaton/)
  - Contribuții: Specificații funcționale, validare științifică, adaptare metodologie scoring

### Parteneri
- [SuntAutist - Autismul explicat de autiști](https://www.suntautist.ro) - Comunitate pentru suport și diseminare
- [About ADHD România](https://www.despreadhd.ro) - Resurse educaționale complementare

## 📬 Contact

📧 andrei.hodorog@suntautist.ro [Lead Developer & Technical Architect]
📧 hello@ovidiuplaton.com [Product Owner & Subject Matter Expert]

### Mulțumiri speciale

- **Dr. Natalie Engelbrecht**
  - [Website - Embrace Autism](https://embrace-autism.com/raads-r/)
  - Contribuții: Inspirație implementare și adaptare

- **Bootstrap Team**
  - [Bootstrap Team](https://getbootstrap.com/docs/5.3/about/team/) - Pentru framework-ul de bază al interfeței

- **Font Awesome Team**
  - [Font Awesome Team](https://fontawesome.com/team) - Pentru setul de iconițe utilizat

### Autori metodologie originală RAADS-R

- **Riva Ariella Ritvo, Ph.D.**
  - Yale Child Study Center
  - Contribuții: Dezvoltare metodologie originală, validare studiu internațional

- **Edward Ritvo, M.D.**
  - UCLA School of Medicine
  - Contribuții: Co-autor metodologie, supervizare studiu validare

## 📚 Citări academice

### Studiul original RAADS-R
```bibtex
@article{ritvo2011raadsr,
    title={The Ritvo Autism Asperger Diagnostic Scale-Revised (RAADS-R): A Scale to Assist the Diagnosis of Autism Spectrum Disorder in Adults: An International Validation Study},
    author={Ritvo, Riva Ariella and Ritvo, Edward R. and Guthrie, Donald and Ritvo, Max J. and Hufnagel, Demetra H. and McMahon, William and Tonge, Bruce and Mataix-Cols, David and Jassi, Amita and Attwood, Tony and Eloff, Johann},
    journal={Journal of Autism and Developmental Disorders},
    volume={41},
    number={8},
    pages={1076--1089},
    year={2011},
    publisher={Springer},
    doi={10.1007/s10803-010-1133-5},
    url={https://doi.org/10.1007/s10803-010-1133-5}
}
```

### Studii de validare suplimentare

#### Validare suedeză
```bibtex
@article{andersen2011swedish,
    title={The Swedish Version of the Ritvo Autism and Asperger Diagnostic Scale: Revised (RAADS-R). A Validation Study of a Rating Scale for Adults},
    author={Andersen, Lisa M. J. and Näswall, Katharina and Manouilenko, Irina and Nylander, Lena and Edgar, Johan and Ritvo, Riva Ariella and Ritvo, Edward and Bejerot, Susanne},
    journal={Journal of Autism and Developmental Disorders},
    volume={41},
    number={12},
    pages={1635--1645},
    year={2011},
    doi={10.1007/s10803-011-1191-3}
}
```

### Pentru a cita acest proiect
Când folosiți acest software în cercetare, vă rugăm să citați atât studiul original RAADS-R, cât și această implementare:

```bibtex
@software{hodorog2024testautism,
    title={Test Autism Adulți (RAADS-R) - Implementare Web Open Source},
    author={Hodorog, Andrei and Platon, Ovidiu},
    year={2024},
    url={https://www.testautism.ro},
    version={1.0.0}
}
```