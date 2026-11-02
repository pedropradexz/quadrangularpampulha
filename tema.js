/* Tema Mês Quadrangular • só mexe na aparência; não altera nenhuma função do site */
(function(){
  var BASE=new URL('.',document.currentScript.src).href+'assets/';
  var IC={cruz:BASE+'cruz.png',pomba:BASE+'pomba.png',calice:BASE+'calice.png',coroa:BASE+'coroa.png'};
  var ORDER=['cruz','pomba','calice','coroa'];
  function icons(cls){return ORDER.map(function(k){return '<img src="'+IC[k]+'" alt="" class="'+(cls||'')+'">'}).join('')}
  function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f)}
  ready(function(){
    var b=document.body;
    // fundo
    var a=document.createElement('div');a.className='tq-aurora';var s=document.createElement('div');s.className='tq-stripes';
    b.prepend(s);b.prepend(a);

    // limpa marcações "[cite: ...]" e troca os quadradinhos de emoji pelos ícones originais
    var w=document.createTreeWalker(b,NodeFilter.SHOW_TEXT),nodes=[],n;
    while(n=w.nextNode())nodes.push(n);
    nodes.forEach(function(t){
      var v=t.nodeValue;if(/SCRIPT|STYLE/.test(t.parentNode.nodeName))return;
      var nv=v.replace(/\s*\[cite:[^\]]*\]/g,'');
      if(nv.indexOf('🟥')>-1){
        nv=nv.replace('🟥🟨🟦🟪','');
        var sp=document.createElement('span');sp.innerHTML=icons('tq-navico');
        t.parentNode.insertBefore(sp,t.nextSibling);
      }
      if(nv!==v)t.nodeValue=nv;
    });

    // pilares: ícones originais
    var map={'✝️':'cruz','🕊️':'pomba','🏆':'calice','👑':'coroa'};
    document.querySelectorAll('#viewQuadrangular .w-10.h-10').forEach(function(d){
      var k=map[d.textContent.trim()];
      if(k){d.className='pilar-ico';d.innerHTML='<img src="'+IC[k]+'" alt="">'}
    });

    // hero da página inicial
    var hero=document.querySelector('#viewPortal>div');
    if(hero){
      var v=document.createElement('video');v.className='tq-hero-video';v.src=BASE+'logo-motion.mp4';
      v.autoplay=v.loop=v.muted=v.playsInline=true;v.setAttribute('muted','');hero.prepend(v);
      [['8%','4%',0],['70%','8%',1],['18%','78%',2],['60%','74%',3]].forEach(function(p,i){
        var im=document.createElement('img');im.src=IC[ORDER[p[2]]];im.className='tq-float';
        im.style.left=p[0];im.style.top=p[1];im.style.animationDelay=(i*1.2)+'s';hero.prepend(im);
      });
      var h2=hero.querySelector('h2');
      if(h2){var lg=document.createElement('img');lg.src=BASE+'logo-75-anos.png';lg.alt='75 anos Quadrangular';lg.className='tq-hero-logo';h2.parentNode.insertBefore(lg,h2)}
      var dv=document.createElement('div');dv.className='tq-divider';dv.innerHTML=icons();hero.after(dv);
    }

    // página do Mês Quadrangular
    var q=document.querySelector('#viewQuadrangular h2');
    if(q){
      var lg2=document.createElement('img');lg2.src=BASE+'logo-75-anos.png';lg2.alt='75 anos Quadrangular';lg2.className='tq-hero-logo';lg2.style.margin='0 auto 1rem';
      q.parentNode.insertBefore(lg2,q);
      q.innerHTML=q.innerHTML.replace('Mês','<span class="tq-serif">Mês</span>');
    }

    // rodapé
    var f=document.createElement('footer');f.className='tq-footer';
    f.innerHTML='<img class="tq-flogo" src="'+BASE+'logo-75-anos.png" alt="75 anos Quadrangular"><div class="tq-icons">'+icons()+'</div><p>Quadrangular Pampulha • 3ª IEQ Agudos • SP</p><p style="opacity:.7;margin-top:.25rem">Mês Quadrangular • Novembro de 2026 • 75 anos</p>';
    var toast=document.getElementById('toast');toast?b.insertBefore(f,toast):b.appendChild(f);
  });
})();
