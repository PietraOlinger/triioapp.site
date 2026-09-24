document.documentElement.classList.add('js');
const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => [...e.querySelectorAll(s)];

/* Cabeçalho ganha fundo sólido ao rolar */
const cab = $('#cabecalho');
addEventListener('scroll', () => cab.classList.toggle('rolado', scrollY > 40), { passive: true });

/* Menu mobile */
const ham = $('#hamburguer'), nav = $('#nav');
ham.addEventListener('click', () => {
  ham.setAttribute('aria-expanded', nav.classList.toggle('aberto'));
});
$$('#nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('aberto');
  ham.setAttribute('aria-expanded', false);
}));

/* Abas dos depoimentos */
$$('.aba').forEach(b => b.addEventListener('click', () => {
  $$('.aba').forEach(x => x.classList.toggle('ativa', x === b));
  $$('.painel-aba').forEach(p => p.classList.toggle('ativo', p.dataset.painel === b.dataset.aba));
}));

/* Mapa de blocos: [sigla, nome, coluna, linha, atendido?] */
const UF = [
  ['RR','Roraima',1,0],['AP','Amapá',2,0],
  ['AM','Amazonas',1,1,1],['PA','Pará',2,1,1],['MA','Maranhão',3,1],['PI','Piauí',4,1],['CE','Ceará',5,1,1],['RN','Rio Grande do Norte',6,1],
  ['AC','Acre',0,2],['RO','Rondônia',1,2],['MT','Mato Grosso',2,2,1],['TO','Tocantins',3,2],['BA','Bahia',4,2,1],['PE','Pernambuco',5,2,1],['PB','Paraíba',6,2],
  ['MS','Mato Grosso do Sul',1,3,1],['GO','Goiás',2,3,1],['DF','Distrito Federal',3,3,1],['MG','Minas Gerais',4,3,1],['AL','Alagoas',5,3],['SE','Sergipe',6,3],
  ['PR','Paraná',1,4,1],['SP','São Paulo',2,4,1],['RJ','Rio de Janeiro',3,4,1],['ES','Espírito Santo',4,4,1],
  ['SC','Santa Catarina',1,5,1],['RS','Rio Grande do Sul',1,6,1]
];
const tiles = $('#tiles'), chips = $('#chips'), dica = $('#dica');
UF.forEach(([sigla, nome, c, l, on]) => {
  const t = document.createElement('div');
  t.className = 'tile' + (on ? ' ativo' : '');
  t.textContent = sigla;
  t.style.gridColumn = c + 1;
  t.style.gridRow = l + 1;
  t.addEventListener('pointermove', e => {
    dica.textContent = nome + (on ? ' · com arenas Triio' : '');
    dica.style.left = e.clientX + 'px';
    dica.style.top = e.clientY + 'px';
    dica.classList.add('visivel');
  });
  t.addEventListener('pointerleave', () => dica.classList.remove('visivel'));
  tiles.appendChild(t);
  if (on) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = nome;
    chips.appendChild(chip);
  }
});

/* Seções aparecem suavemente ao entrar na tela */
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('visivel');
  obs.unobserve(e.target);
}), { threshold: 0.15 });
$$('.revelar').forEach(el => obs.observe(el));

/* Vídeo: se o arquivo não carregar, mostra aviso em vez de caixa preta */
const vid = $('#video-depoimento video');
const src = vid && $('source', vid);
if (src) {
  const falha = () => {
    vid.insertAdjacentHTML('afterend', '<div class="aviso-video">Não foi possível carregar o vídeo agora. Recarregue a página.</div>');
    vid.remove();
  };
  if (vid.networkState === 3) falha(); else src.addEventListener('error', falha);
}