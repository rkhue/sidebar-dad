# Sidebar Sitesfatório 
[![License](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)


Esse é um projeto de DAD (Desenvolvimento de Aplicações Dinâmicas) criado em um curso de desenvolvimento técnico.

Acesse o site em: [https://rkhue.github.io/sidebar-dad/](https://rkhue.github.io/sidebar-dad/)

## Overview 🌠
Esse projeto é um site com javascript puro para fazer uma sidebar com animações satisfatórias usando o DOM e CSS

### Tecnologias usadas 💻
* HTML
* CSS
* JavaScript
* Github Actions / Pages


### Animações 💃
Estão disponíveis no site **duas** animações principais

1. **Bolinhas** 🟣
    - Uma `grid` posicionada absolutamente no centro da tela contendo N bolinhas

    - Utiliza o evento `mousemove` para encontrar a posição do mouse

    - Com base na distância do mouse às bolinhas, ele aplica uma regra de três e aumenta a margem de cada bolinha proporcionalmente

    - Tem um efeito de *ripple* ao passar o mouse pelas bolinhas, como se elas tivessem 'medo' do mouse.
    
2. **Lanternas** 🔦
    - Utiliza do CSS para criar auras de luz com luminosidade variada e com blur
    - Espalha N lanternas aleatóriamente na página
    - Com base na distância do mouse, as lanternas aumentam ou idminuem de luminosidade e intensidade
    - Cada aura de luz tem um movimento próprio seguindo um `offset` aleatório

### Deploy 📤
Utilizamos o **GitHub Actions** para subir a página no GitHub Pages.

- [Veja a pipeline de deploy](/.github/workflows/ci.yml)

Acesse o site em: [https://rkhue.github.io/sidebar-dad/](https://rkhue.github.io/sidebar-dad/)

### Compatibilidade 🦽
As animações utilizam o DOM, e os cáuculos de distância funcionam corretamente apenas no **Google Chrome.**, outros browsers aplicam otimizações que quebram o efeito.

---

### Autores  
Feito com muito ❤️ por:
- Enzo Iapichini Braz (enzo.braz@germinare.org.br)
- Felipe Fernandes dos Santos Oliveira (felipe.fernandes@germinare.org.br)

**Profº Rodolfo Gonçalves**