'use strict';
const $ = id => document.getElementById(id);
const prompts = [
 'Make the spectator the magician. What would you need to change?',
 'Keep the secret. Invent a completely different ending.',
 'What if you never touched the cards?',
 'Give the trick a reason to happen beyond finding a card.',
 'Strip away one step. Does the effect get clearer or fall apart?',
 'Could the same principle work with photographs, names, or borrowed objects?',
 'Imagine performing this without saying a word.',
 'Make the apparent failure the beginning of the trick.',
 'What would make this feel like a coincidence rather than a demonstration?',
 'Find the smallest version of this idea. One spectator, one moment.'
];
let data = [], pile = [], history = [], cursor = -1, lastPrompt = -1;
let kept = new Set();
try { const saved = JSON.parse(localStorage.getItem('rct-keepers-v1') || '[]'); if (Array.isArray(saved)) kept = new Set(saved.filter(x => typeof x === 'string')); } catch {}
function shuffled(items) { const a = [...items]; for (let i = a.length-1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function current() { return data.find(t => t.id === history[cursor]); }
function updateKeepers() {
 $('saved-count').textContent = kept.size;
 const t = current(), active = !!t && kept.has(t.id);
 $('keep').textContent = active ? '♥ Kept' : '♡ Keep this one';
 $('keep').setAttribute('aria-pressed', String(active));
 const list = $('saved-list'); list.replaceChildren();
 for (const t of data.filter(t => kept.has(t.id))) { const b = document.createElement('button'); b.className='saved-item'; b.textContent=t.title+' ↗'; b.onclick=()=>{history.push(t.id);cursor=history.length-1;render();}; list.append(b); }
 if (!list.children.length) { const p=document.createElement('p');p.textContent='Nothing up your sleeve yet. Keep a trick and it will appear here.';p.className='small';list.append(p); }
}
function render() {
 const t = current(); if(!t) return;
 $('reader').hidden=false; $('title').textContent=t.title;
 $('credit').textContent=t.author ? 'CREDITED TO '+t.author.toUpperCase() : (t.review_batch ? 'ORIGINATOR: SOURCE UNKNOWN' : 'A LITTLE SOMETHING FROM THE ARCHIVE');
 $('pages').textContent=Number.isInteger(t.page_start)&&Number.isInteger(t.page_end)?'PDF '+(t.page_start===t.page_end?'page '+t.page_start:'pages '+t.page_start+'–'+t.page_end):'Supplied PDF edition';
 $('deal-number').textContent='ONE THING LEADS TO ANOTHER';
 $('text').replaceChildren(...t.text.split(/\n\n/).filter(Boolean).map(s=>{const p=document.createElement('p');p.textContent=s;return p;}));
 const priorContext=document.getElementById('routine-context');if(priorContext)priorContext.remove();if(t.context_text){const details=document.createElement('details');details.id='routine-context';details.className='routine-context';const summary=document.createElement('summary');summary.textContent=t.context_title||'Read the base routine';details.append(summary);for(const block of t.context_text.split(/\n\n/)){const para=document.createElement('p');para.textContent=block;details.append(para);}$('text').after(details);}
 const priorNote=document.getElementById('editor-note');if(priorNote)priorNote.remove();if(t.editor_note){const note=document.createElement('p');note.id='editor-note';note.className='editor-note';note.textContent=t.editor_note;$('text').after(note);}
 $('back').disabled=cursor<1; $('prompt').hidden=true; updateKeepers();
 $('deal').innerHTML='Deal me another <span aria-hidden="true">↗</span>';
 $('title').focus({preventScroll:true}); $('reader').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}
function deal() {
 if(cursor<history.length-1) {cursor++;render();return;}
 if(!pile.length) {pile=shuffled(data.map(t=>t.id));if(pile.length>1&&pile[pile.length-1]===current()?.id) [pile[0],pile[pile.length-1]]=[pile[pile.length-1],pile[0]];}
 history.push(pile.pop());cursor=history.length-1;render();
}
$('deal').onclick=deal; $('another').onclick=deal;
$('back').onclick=()=>{if(cursor>0){cursor--;render();}};
$('keep').onclick=()=>{const t=current();if(!t)return;kept.has(t.id)?kept.delete(t.id):kept.add(t.id);updateKeepers();try{localStorage.setItem('rct-keepers-v1',JSON.stringify([...kept]));$('status').textContent=kept.has(t.id)?'Kept for later on this device.':'Removed from your keepers.';}catch{$('status').textContent='Saved for this visit. Your browser is blocking permanent storage.';}};
function toggleSaved(open){$('saved-panel').hidden=!open;$('saved-toggle').setAttribute('aria-expanded',String(open));if(open)$('saved-panel').scrollIntoView({block:'start'});}
$('saved-toggle').onclick=()=>toggleSaved($('saved-panel').hidden);$('close-saved').onclick=()=>{toggleSaved(false);$('saved-toggle').focus();};
$('twist-button').onclick=()=>{let n;do{n=Math.floor(Math.random()*prompts.length);}while(n===lastPrompt);lastPrompt=n;$('prompt').textContent=prompts[n];$('prompt').hidden=false;};
async function boot(){try{const r=await fetch('tricks.json');if(!r.ok)throw Error();data=await r.json();if(!Array.isArray(data)||!data.length)throw Error();kept=new Set([...kept].filter(id=>data.some(t=>t.id===id)));updateKeepers();$('deal').disabled=false;$('deal').innerHTML='Deal me something <span aria-hidden="true">↗</span>';}catch{$('status').textContent='The deck didn’t arrive. Reload the page to try again.';$('deal').textContent='Reload to try again';$('deal').disabled=false;$('deal').onclick=()=>location.reload();}}
boot();
