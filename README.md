# Triio Software

Site institucional da Triio, plataforma de gestão para arenas de esportes de raquete. O projeto é estático e usa HTML, CSS e JavaScript, sem etapa de build ou dependências de pacote.

## Executar localmente

Abra `index.html` em um navegador. Para testar como um site publicado, abra a pasta no VS Code e inicie um servidor estático, por exemplo com a extensão Live Server.

As fontes Bricolage Grotesque e Inter são carregadas pelo Google Fonts, portanto precisam de conexão com a internet. O vídeo de depoimento é servido localmente.

## Estrutura

- `index.html`: conteúdo e estrutura das seções do site.
- `css/style.css`: identidade visual, layout e estilos responsivos.
- `js/main.js`: menu mobile, abas de depoimentos, animações e lista de estados atendidos.
- `img/logo-triio.svg`: logo original da Triio.
- `img/bolinhas.svg`: ilustração decorativa da página inicial.
- `img/mapa-brasil.svg`: mapa vetorial com as 27 unidades federativas.
- `video/depoimento-mais-sports.mp4`: vídeo de depoimento.
- `LICENSE`: GNU General Public License v3.0.

## Mapa de atendimento

As UFs atendidas são definidas no array `UF` de `js/main.js`. A cor de cada estado também está indicada pela classe `ativo` em `img/mapa-brasil.svg`. Ao alterar a cobertura, atualize os dois arquivos para manter o mapa e a lista de estados sincronizados.

Os contornos do mapa foram gerados com dados do projeto [click_that_hood](https://github.com/codeforgermany/click_that_hood), mantido pela Code for Germany.

## Funcionalidades

- Navegação responsiva com menu mobile.
- Hub interativo de módulos.
- Mapa dos estados com destaque de atendimento e lista das UFs atendidas.
- Abas para depoimentos e animações de entrada das seções.
- Links para contato pelo WhatsApp e Instagram.
- Área de vídeo com conteúdo local.

## Licença

Este projeto está sob a licença GNU GPL v3.0. Consulte o arquivo `LICENSE` para os termos completos.