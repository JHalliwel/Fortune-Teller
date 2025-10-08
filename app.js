// Madame Zoltar — Realistic Mystic (English UI)
// Behavior: click button -> show floating bubble with a prophecy + reveal one tarot card.

const askBtn = document.getElementById('askBtn');
const bubble = document.getElementById('bubble');
const prophecyText = document.getElementById('prophecyText');
const revealCard = document.getElementById('revealCard');
const cardImg = document.getElementById('cardImg');
const cardCaption = document.getElementById('cardCaption');

// Mystical & poetic fortunes (English)
const FORTUNES = [
  "The moon whispers: a hidden door will open when you choose calm over haste.",
  "A letter, a call, a sign — destiny arrives dressed as coincidence.",
  "Under the next full moon, a promise blooms into certainty.",
  "A stranger’s kindness bends your path toward a long-awaited answer.",
  "What you release this week returns transformed into opportunity.",
  "Your name will be spoken in the right room — and the room will listen.",
  "The tide turns in your favor; be ready to step forward without fear.",
  "A spark of learning unveils a new craft; commit, and it becomes gold."
];

// Swap this URL for your live tarot API if you have one.
const API_URL = './cards.json';

function pickFortune(){
  return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
}

function pickRandomCard(cards){
  if(!cards?.length) return null;
  const idx = Math.floor(Math.random() * cards.length);
  return cards[idx];
}

async function drawProphecy(){
  // Fortune bubble
  prophecyText.textContent = pickFortune();
  bubble.hidden = false;

  // Fetch one random card
  try{
    const res = await fetch(API_URL, { cache: 'no-store' });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const deck = (data.cards ?? data ?? []).filter(c => c?.image);
    const card = pickRandomCard(deck);
    if(card){
      cardImg.src = card.image;
      cardImg.alt = card.name;
      cardCaption.textContent = card.name + (card.arcana ? " — " + card.arcana : "");
      revealCard.hidden = false;
    }else{
      revealCard.hidden = true;
    }
  }catch(e){
    console.error('Failed to load cards:', e);
    revealCard.hidden = true;
  }
}

askBtn.addEventListener('click', drawProphecy);
