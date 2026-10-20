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

/* Estados atendidos pelo Triio */
const UF = [
  ['RR','Roraima',false],['AP','Amapá',false],
  ['AM','Amazonas',true],['PA','Pará',true],['MA','Maranhão',false],['PI','Piauí',false],['CE','Ceará',true],['RN','Rio Grande do Norte',false],
  ['AC','Acre',false],['RO','Rondônia',false],['MT','Mato Grosso',true],['TO','Tocantins',false],['BA','Bahia',true],['PE','Pernambuco',true],['PB','Paraíba',false],
  ['MS','Mato Grosso do Sul',true],['GO','Goiás',true],['DF','Distrito Federal',true],['MG','Minas Gerais',true],['AL','Alagoas',false],['SE','Sergipe',false],
  ['PR','Paraná',true],['SP','São Paulo',true],['RJ','Rio de Janeiro',true],['ES','Espírito Santo',true],
  ['SC','Santa Catarina',true],['RS','Rio Grande do Sul',true]
];
const chips = $('#chips');
UF.forEach(([sigla, nome, atendido]) => {
  if (atendido) {
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