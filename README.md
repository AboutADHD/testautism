# Test Autism Adulți (RAADS-R)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Descriere

Acest proiect implementează Scala Ritvo Autism Asperger Diagnostic Revizuită (RAADS-R) - un instrument validat științific pentru screening-ul trăsăturilor autiste la adulți. Testul constă în 80 de afirmații care evaluează patru domenii principale:

- Limbaj (7 întrebări)
- Relaționare socială (39 întrebări)
- Senzorial-motor (20 întrebări)
- Interese circumscrise (14 întrebări)

## Disclaimer

Acest test este destinat EXCLUSIV în scop informativ și NU trebuie utilizat ca un instrument de diagnostic. Deși testul a fost adaptat pentru a răspunde nevoilor persoanelor autiste, el NU înlocuiește o evaluare profesională efectuată de un specialist calificat în domeniul sănătății mintale.

## Caracteristici

- **Interfață intuitivă**: Design modern și responsiv folosind Bootstrap 5
- **Calcul scoring**: Implementare completă a sistemului de scoring RAADS-R
- **Vizualizare rezultate**: Grafice interactive pentru scorurile totale și pe categorii
- **Export PDF**: Generare raport detaliat în format PDF
- **Sharing pe Facebook**: Generare și distribuire imagine cu rezultate
- **Accesibilitate**: Integrare cu UserWay pentru suport de accesibilitate
- **Confidențialitate**: Nu stochează date personale sau cookie-uri, PDF-urile sunt generate local pe partea de Frontend

## Tehnologii utilizate

- HTML5
- CSS3
- JavaScript

## Biblioteci auxiliare

- [Bootstrap](https://github.com/twbs/bootstrap) v5.3.0 - (C) The Bootstrap Authors. Licensed under MIT
- [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome) v6.5.1 - (C) Fonticons, Inc. Licensed under MIT for code, CC BY 4.0 for icons
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) v0.9.3 - (C) Erik Koopmans. Licensed under MIT
- [html2canvas](https://github.com/niklasvh/html2canvas) v1.4.1 - (C) Niklas von Hertzen. Licensed under MIT

## Instalare

1. Clonați repository-ul:
```bash
git clone https://github.com/username/testautism.git
```

2. Verificați că toate dependințele CDN sunt accesibile:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

3. Configurați endpoint-ul pentru salvarea imaginilor de sharing în `save-result-image.php`

## Funcționalități Principale

### Sistem de scoring

- Scor total maxim posibil: 240 puncte
- Prag diagnostic pentru autism: 65 puncte
- Subscoruri cu praguri individuale:
  - Limbaj: 4 puncte
  - Relaționare socială: 31 puncte
  - Senzorial-motor: 16 puncte
  - Interese circumscrise: 15 puncte

### Interpretare rezultate

```javascript
if (score <= 65) return 'Sub pragul pentru autism';
if (score <= 89) return 'Posibil autism';
if (score <= 130) return 'Probabil autism';
return 'Foarte probabil autism';
```

### Export PDF

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

## Validitate științifică

Bazat pe studiul de validare internațională:
- Sensibilitate: 97%
- Specificitate: 100%
- Validitate concurentă: 96%
- Fiabilitate test-retest: 0.987

## Contribuții

Contribuțiile sunt binevenite! Vă rugăm să:
1. Fork repository-ul
2. Creați un branch pentru feature (`git checkout -b facilitate-extraordinara`)
3. Commit modificările (`git commit -m 'adaugat facilitate extraordinara'`)
4. Push către branch (`git push origin facilitate-extraordinara`)
5. Deschideți un Pull Request

## Licență

Acest proiect este licențiat sub GNU General Public License v3.0 - vezi fișierul [LICENSE](LICENSE) pentru detalii.

## Autori și mulțumiri

- **Dezvoltare software**: *Andrei Hodorog* & *Ovidiu Platon*
- **Suport științific**: *Riva Ariella Ritvo, Ph.D.* și *Edward Ritvo, M.D.*, conform lucrărilor seminale
- **Mulțumiri speciale**: *Dr. Natalie Engelbrecht* pentru inspirație

## Contact

- Website: https://www.testautism.ro

- Email 1: andrei.hodorog@suntautist.ro

- Email 1: hello@ovidiuplaton.com

- Facebook: https://www.facebook.com/suntautist

## Citare Academică

Pentru utilizarea în contexte academice, vă rugăm să citați:

```
Ritvo, R. A., et al. (2011). The Ritvo Autism Asperger Diagnostic Scale-Revised (RAADS-R): a scale to assist the diagnosis of autism spectrum disorder in adults: an international validation study. Journal of Autism and Developmental Disorders, 41(8), 1076-1089. https://doi.org/10.1007/s10803-010-1133-5
```