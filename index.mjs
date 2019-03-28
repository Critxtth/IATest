/*import {facturedic} from "./lib/facturedictionnary";
import {lettredic} from "./lib/lettredictionnary";
import {ribdic} from "./lib/ribdictionnary";

const natural = require('natural');
const stemmer = natural.PorterStemmerFr;

let facturedic = facturedic;
let lettredic = lettredic;
let ribdic = ribdic;

*/

const natural = require('natural');
const stemmer = natural.PorterStemmerFr;

const facturedic = 'description cout prix euros total HT TTC TVA facture N° client ';
const ribdic = 'numéro de compte relevé d\'identité bancaire IBAN BIC RIB identité Clé numéro de compte agence de domicialisation';
const lettredic = 'Objet, veuillez agréer monsieur, expression de mes sentiments distingués,' +
    ' salutations';

const facturelike = stemmer.tokenizeAndStem(facturedic);
const riblike = stemmer.tokenizeAndStem(ribdic);
const lettrelike = stemmer.tokenizeAndStem(lettredic);

const train = [
    {text: facturelike, label: 'facture'},
    {text: riblike, label: 'rib'},
    {text: lettrelike, label: 'lettre'},

];

const test = [
    {
        text: stemmer.tokenizeAndStem('100\n' +
            '\n' +
            'Date\n' +
            '\n' +
            '27/03/2019\n' +
            '\n' +
            'PointRD\n' +
            '\n' +
            '17 Rue de Normandie\n' +
            '92400, Courbevoie, France\n' +
            '\n' +
            'Facturé à\n' +
            'Mahanna Rayan\n' +
            '56 avenue de l\'arche\n' +
            '92400, Courbevoie\n' +
            '\n' +
            'Désignation\n' +
            '\n' +
            'Montant HT\n' +
            '\n' +
            'Traitement CDP\n' +
            '\n' +
            'Total de la facture\n' +
            '\n' +
            'Conditions et modalités de paiement\n' +
            'Paiement à 15 jours dès réception de la facture.\n' +
            '\n' +
            '550,00\n' +
            'Total HT\n' +
            '\n' +
            '550,00\n' +
            '\n' +
            'TVA 20.0%\n' +
            '\n' +
            '110,00\n' +
            '\n' +
            '660,00 €\n' +
            '\n' +
            '\f'), label: 'facture'
    },
    {
        text: stemmer.tokenizeAndStem('100\n' +
            'PointRD\n' +
            '17 Rue de Normandie\n' +
            '92400, Courbevoie,\n' +
            'France\n' +
            '\n' +
            'Date\n' +
            '27/03/2019\n' +
            '\n' +
            'Facturé à\n' +
            'Mahanna Rayan\n' +
            '56 avenue de l\'arche\n' +
            '92400, Courbevoie\n' +
            '\n' +
            'DÉSIGNATION\n' +
            'Traitement CDP\n' +
            '\n' +
            'Total de la facture:\n' +
            '\n' +
            'PRIX UNIT. HT MONTANT HT\n' +
            '550,00\n' +
            '\n' +
            '550,00\n' +
            '\n' +
            'Total HT\n' +
            '\n' +
            '550,00\n' +
            '\n' +
            'TVA 20.0%\n' +
            '\n' +
            '110,00\n' +
            '\n' +
            '660,00 €\n' +
            '\n' +
            'Conditions et modalités de paiement\n' +
            'Paiement à 15 jours dès réception de la facture.\n' +
            '\n' +
            '\f'), label: 'facture'
    },
    {
        text: stemmer.tokenizeAndStem('PointRD\n' +
            '17 Rue de Normandie\n' +
            '92400, Courbevoie, France\n' +
            '\n' +
            'Facturé à\n' +
            'Mahanna Rayan\n' +
            '\n' +
            'Facture n°\n' +
            '\n' +
            '100\n' +
            '\n' +
            'Date\n' +
            '\n' +
            '27/03/2019\n' +
            '\n' +
            '26 avenue de leonard' +
            '92400, Courbevoie\n' +
            '\n' +
            'Désignation\n' +
            '\n' +
            'Montant HT\n' +
            '\n' +
            'Traitement CDP\n' +
            '\n' +
            '550,00\n' +
            'Total HT\n' +
            '\n' +
            '550,00\n' +
            '\n' +
            'TVA 20.0%\n' +
            '\n' +
            '110,00\n' +
            '\n' +
            'Total\n' +
            '660,00 €\n' +
            '\n' +
            'Conditions et modalités de paiement\n' +
            'Paiement à 15 jours dès réception de la facture.\n' +
            '\n' +
            '\f'), label: 'facture'
    },
    {
        text: stemmer.tokenizeAndStem('Je vous prie d\'agréer (ou de croire), Monsieur Dupont (pensez toujours à utiliser la même dénomination que dans l\'introduction de votre lettre), à l\'expression de mes salutations distinguées.'),
        label: 'lettre'
    },
    {
        text: stemmer.tokenizeAndStem('Relevé d\'Identité Bancaire / IBAN\n' +
            '\n' +
            'MR  Martin Dupont\n' +
            '5 ROUTE DE MAGNY\n' +
            '60000 MAGNY\n' +
            '\n' +
            'IBAN (1) :\n' +
            '\n' +
            'FR76 3000 4008 0000 0000 0000\n' +
            'BEEARRPXXX\n' +
            '\n' +
            'BIC (2) :\n' +
            'RIB (3) :\n' +
            '(1)\n' +
            '\n' +
            'Code banque\n' +
            '13004\n' +
            '\n' +
            'Code agence\n' +
            '56325\n' +
            '\n' +
            'International Bank Account Number\n' +
            '\n' +
            '(2)\n' +
            '\n' +
            'Numéro de compte\n' +
            '0003341641\n' +
            'Bank Identifier Code\n' +
            '\n' +
            'Clé RIB\n' +
            '34\n' +
            '(3)\n' +
            '\n' +
            'Agence de domiciliation\n' +
            'BNPPARB MAGNY (03410)\n' +
            '\n' +
            'Relevé d\'Identité Bancaire\n' +
            '\n' +
            'Relevé d\'Identité Bancaire / IBAN'), label: 'rib'
    },
    //...
];

classifier = new natural.BayesClassifier();

for (let i = 0; i < train.length; i++) {
    classifier.addDocument(train[i].text, train[i].label);
}
classifier.train();

let correctResults = 0;

for (let i = 0; i < test.length; i++) {
    const result = classifier.classify(test[i].text);
    console.log(result);
    if (result === test[i].label) {
        correctResults++;
    }
}
classifier.save('classifier.json', function(err, classifier) {
    // the classifier is saved to the classifier.json file!
});
console.log(`Correct Results: ${correctResults}/${test.length}`);

