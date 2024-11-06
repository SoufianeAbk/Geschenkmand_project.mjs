import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { randomInt } from 'node:crypto';

const rl = readline.createInterface({ input, output });

async function main() {
  let geschenkmand = await maakGeschenkmand();

  let totaalPrijs = berekenTotaal(geschenkmand);
  let totaalPrijsMetBtw = berekenTotaalBtw(geschenkmand);

  console.log(`De waarde van je mand is: ${totaalPrijs} Euro.`);
  console.log(`Inclusief BTW is dit: ${totaalPrijsMetBtw.toFixed(2)} Euro.`);

  loterij();

  rl.close();
}

function loterij() {
    if (randomInt(1, 11) === 1) {
      console.log('Je hebt een geschenk gewonnen!');
    }
}
async function vraagGetal(vraag, min, max) {
  while (true) {
    let antwoord = parseInt(await rl.question(vraag));
    if (antwoord >= min && antwoord <= max) {
      return antwoord;
    }
    console.log('Probeer opnieuw...');
  }
}

async function maakGeschenkmand() {
  let mandGrootte = await vraagGetal('Hoe groot is de geschenkmand (3 - 20)? ', 3, 20);
  let geschenkmand = [];
  let keuzes = { 'W': 'Wijn', 'B': 'Bier', 'F': 'Fruitsap' };

  while (geschenkmand.length < mandGrootte) {
    let keuze = (await rl.question('Welk geschenk kies je? (W, B, F): ')).toUpperCase();
    if (keuzes[keuze]) {
      geschenkmand.push(keuzes[keuze]);
    } else {
      console.log('probeer opnieuw...');
    }
  }

  return geschenkmand;
}

function berekenPrijs(geschenk, metBtw = false) {
  switch (geschenk) {
    case 'Wijn':
      return metBtw ? 10 * 0.21 : 10;
    case 'Bier':
      return metBtw ? 2 * 0.06 : 2;
    case 'Fruitsap':
      return metBtw ? 3 * 0.12 : 3;
    default:
      console.log('Error');
      return 0;
  }
}

function berekenTotaal(geschenkmand) {
  return geschenkmand.reduce((totaal, geschenk) => totaal + berekenPrijs(geschenk), 0);
}

function berekenTotaalBtw(geschenkmand) {
  let totaalPrijs = berekenTotaal(geschenkmand);
  let btw = geschenkmand.reduce((totaalBtw, geschenk) => totaalBtw + berekenPrijs(geschenk, true), 0);
  return totaalPrijs + btw;
}

main();
