/* Shared card layout and keyboard behavior for the field guide. */
(() => {
 document.querySelectorAll('.fork-facts h5').forEach(h=>h.setAttribute('aria-level','4'));
 document.body.setAttribute('role','main');document.body.setAttribute('aria-label','Roadtrip field guide');document.querySelectorAll('header').forEach(h=>h.setAttribute('role','presentation'));document.querySelectorAll('#vegas-anchor h4, .branch h4').forEach(h=>h.setAttribute('aria-level','3'));document.querySelector('.hero')?.setAttribute('aria-label','Roadtrip introduction');
 document.querySelectorAll('section.loc').forEach((section,si)=>{
  section.querySelectorAll('.pane[data-tab="Stay"],.pane[data-tab="Do"]').forEach(pane=>{
   const items=[...pane.querySelectorAll(':scope > .item')];if(!items.length)return;
   const heading=document.createElement('h3');heading.className='card-group-title';heading.textContent=pane.dataset.tab==='Stay'?'Places to stay':'Things to do';pane.insertBefore(heading,items[0]);const row=document.createElement('div');row.className='card-row';pane.insertBefore(row,items[0]);
   items.forEach(item=>{item.classList.remove('item');item.classList.add('discovery-card');const body=document.createElement('div');body.className='card-body';while(item.firstChild)body.append(item.firstChild);const context=/Sand Flats/.test(body.textContent)?section.querySelector('.photos img[alt*="Slickrock"]')?.closest('figure'):section.querySelector('.photos figure');if(context){const fig=context.cloneNode(true);const cap=fig.querySelector('figcaption');if(cap)cap.textContent='Area context: '+cap.textContent;item.append(fig);}item.append(body);row.append(item);});
  });
  const tabs=section.querySelector('.tabs');if(!tabs)return;tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',(section.querySelector('h2')?.textContent||'Place')+' options');
  const buttons=[...tabs.querySelectorAll('button')];
  function sync(){buttons.forEach((b,i)=>{const name=b.textContent.trim();const panel=section.querySelector(`.pane[data-tab="${name}"]`);if(!panel)return;const selected=b.classList.contains('on');b.id=`tab-${si}-${i}`;b.setAttribute('role','tab');b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;panel.id=`panel-${si}-${i}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',b.id);b.setAttribute('aria-controls',panel.id);panel.hidden=!selected;});}
  buttons.forEach((b,i)=>{b.addEventListener('click',sync);b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%buttons.length;if(e.key==='ArrowLeft')n=(i-1+buttons.length)%buttons.length;if(e.key==='Home')n=0;if(e.key==='End')n=buttons.length-1;if(n!==undefined){e.preventDefault();buttons[n].click();buttons[n].focus();buttons[n].scrollIntoView({block:'nearest',inline:'nearest'});}});});sync();
 });
 document.querySelectorAll('.mapbox>h3,.branch>h3').forEach(h=>h.setAttribute('aria-level','2'));
 document.querySelectorAll('.card-row').forEach((row,ri)=>{row.tabIndex=0;row.setAttribute('role','region');row.setAttribute('aria-label','Options '+(ri+1)+', scroll horizontally on mobile');});
 const calendar=document.createElement('div');calendar.className='weekend-calendar';calendar.setAttribute('aria-label','Trip dates, weekends highlighted');
 const base=new Date(Date.UTC(2026,8,19));for(let i=0;i<15;i++){const d=new Date(base);d.setUTCDate(d.getUTCDate()+i);const busy=[5,6,0].includes(d.getUTCDay());const cell=document.createElement('div');cell.className='calendar-day'+(busy?' weekend':'');cell.innerHTML=`<b>${d.toLocaleDateString('en-US',{weekday:'short',timeZone:'UTC'})}</b><span>${d.toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})}</span>${busy?'<small>Weekend</small>':''}`;calendar.append(cell);}
 document.querySelector('#tentative-dates h3').after(calendar);
 const note=document.createElement('p');note.className='weekend-note';note.textContent='Friday–Sunday: prioritize event tickets and overnight plans; towns may be livelier and lodging busier. Weekdays stay flexible, but seasonal closures and popular park reservations still apply.';calendar.after(note);
})();
