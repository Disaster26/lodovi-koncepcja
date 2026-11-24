(function(){
  // karta smaków 2027 (z pliku klienta SMAKI- 2027.xls)
  var smaki=[
    ["Cytryna","#e4d779","sorbet"],["Cappuccino - tiramisu","#c1a78e"],["Czekolada mleczna","#9c6b4e"],["Mięta z czekoladą","#81ab77"],
    ["Smerf","#50afca"],["Stracciatella","#e6dfcf"],["Śmietanka","#e7e0c8"],["Truskawka","#e7ada0"],
    ["Arbuz","#d76e57"],["Bakalia sułtańska","#d1a174"],["Banan z wiśnią","#e59a66"],["Ciasteczko Lotus","#c98f5a"],
    ["Ciasteczko Orix","#b3a594"],["Cola z cytryną i żelkami","#dc633b","sorbet"],["Guma balonowa","#e38ea0"],["Jagoda","#6f5a8e"],
    ["Czarna porzeczka","#944d65","jogurtowe"],["Limonka - poziomka","#d98a8f","jogurtowe"],["Kinder czekoladka","#a37d67"],["Malina z aloesem","#da5a70","sorbet"],
    ["Mango - liczi - marakuja","#e0b04a","sorbet"],["Mascarpone leśne","#c27f85"],["Mojito - limonka","#c5d163","sorbet"],["Wanilia Madagaskar","#e9dcb4"],
    ["Wiśnia - rabarbar","#b8394a","sorbet"],["Zielone owoce z miętą","#c3db54","sorbet"],["Biała czekolada z pistacją i maliną","#e8d3c8"],["Brownie Dubai","#8a5a3c"],
    ["Czekolada belgijska","#af7457"],["Kokos - porzeczka","#e2c9d2"],["Pistacja prażona","#d1c278"],["Rocher pralinka","#a8794f"],
    ["Słony karmel","#d99251"],["Wanilia - pecan","#dcc39a"]
  ];
  var ul=document.getElementById('lista');
  if(ul){
    var h='';
    smaki.forEach(function(s){
      h+='<li><svg class="rozek" viewBox="0 0 22 32" aria-hidden="true"><path d="M3.2 13.5h15.6L11 31z" fill="#D9A35B"/><path d="M6 15.5l7.5 8.6M10.4 15.5l5 5.8M14.6 15.5l-8.4 9.3M10.6 15.5l-4.2 4.8" stroke="#B9813F" stroke-width="1" fill="none"/><circle cx="11" cy="9.2" r="8" fill="'+s[1]+'"/><path d="M5.5 11.5c1.6 1.3 3.4 1.9 5.5 1.9s3.9-.6 5.5-1.9" stroke="#fff" stroke-opacity=".4" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg><span>'+s[0]+(s[2]?'<small>'+s[2]+'</small>':'')+'</span></li>';
    });
    ul.innerHTML=h;
    var w=document.querySelector('.wiecej');
    if(w){w.textContent='Pokaż wszystkie smaki ('+smaki.length+')';
      w.addEventListener('click',function(){var z=ul.classList.toggle('zwin');w.setAttribute('aria-expanded',z?'false':'true');w.textContent=z?'Pokaż wszystkie smaki ('+smaki.length+')':'Zwiń listę smaków';if(z)ul.scrollIntoView({block:'start'});});
    }
  }

  // menu
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  function zamknij(){m.classList.remove('otw');b.setAttribute('aria-expanded','false');document.body.style.overflow='';}
  b.addEventListener('click',function(){var o=m.classList.toggle('otw');b.setAttribute('aria-expanded',o?'true':'false');document.body.style.overflow=o?'hidden':'';});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  // cien naglowka
  var linki=[].slice.call(m.querySelectorAll('a[href^="#"]'));
  var top=document.getElementById('top');
  function sc(){top.classList.toggle('cien',scrollY>8);if(scrollY<innerHeight*0.4)linki&&linki.forEach(function(a){a.classList.remove('akt');});}
  addEventListener('scroll',sc,{passive:true});sc();

  // aktywna sekcja
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){linki.forEach(function(a){a.classList.toggle('akt',a.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
    linki.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s);});
    // pasek na telefonie po przewinieciu pierwszego ekranu
    var mob=document.getElementById('mob'),cta=document.querySelector('.hero .cta');
    new IntersectionObserver(function(es){mob.classList.toggle('widac',!es[0].isIntersecting&&es[0].boundingClientRect.top<0);}).observe(cta);
    // mapa przy przewinieciu
    var mp=document.querySelector('[data-mapa]');
    var mio=new IntersectionObserver(function(es){if(es[0].isIntersecting){var f=document.createElement('iframe');f.src=mp.getAttribute('data-mapa');f.title='Mapa: Lodovi, ul. Objazdowa 33, Kutno';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mp.appendChild(f);mio.disconnect();}},{rootMargin:'300px'});
    mio.observe(mp);
  }

  // galeria: palec, mysz, strzalki, kropki
  document.querySelectorAll('[data-gal]').forEach(function(g){
    var tor=g.querySelector('.gal-tor'),fig=[].slice.call(tor.children),kr=g.querySelector('.kropki');
    fig.forEach(function(_,i){var k=document.createElement('button');k.type='button';k.setAttribute('aria-label','Zdjęcie '+(i+1)+' z '+fig.length);k.addEventListener('click',function(){idz(i);});kr.appendChild(k);});
    var kb=[].slice.call(kr.children);
    function nr(){return Math.round(tor.scrollLeft/tor.clientWidth);}
    function idz(i){i=(i+fig.length)%fig.length;tor.scrollTo({left:i*tor.clientWidth,behavior:'smooth'});}
    function zaz(){var n=nr();kb.forEach(function(k,i){k.setAttribute('aria-current',i===n?'true':'false');});}
    tor.addEventListener('scroll',function(){requestAnimationFrame(zaz);},{passive:true});zaz();
    g.querySelector('.wstecz').addEventListener('click',function(){idz(nr()-1);});
    g.querySelector('.dalej').addEventListener('click',function(){idz(nr()+1);});
    tor.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();idz(nr()+1);}if(e.key==='ArrowLeft'){e.preventDefault();idz(nr()-1);}});
    var x0=0,s0=0,ciag=false;
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;x0=e.clientX;s0=tor.scrollLeft;tor.classList.add('ciag');tor.setPointerCapture(e.pointerId);});
    tor.addEventListener('pointermove',function(e){if(!ciag)return;tor.scrollLeft=s0-(e.clientX-x0);});
    function koniec(e){if(!ciag)return;ciag=false;tor.classList.remove('ciag');var d=e.clientX-x0,n=Math.round(s0/tor.clientWidth);if(Math.abs(d)>50)n+=d<0?1:-1;idz(Math.max(0,Math.min(fig.length-1,n)));}
    tor.addEventListener('pointerup',koniec);tor.addEventListener('pointercancel',koniec);
  });

  // formularz pokazowy
  var f=document.getElementById('formularz');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();f.querySelector('.info').hidden=false;});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
