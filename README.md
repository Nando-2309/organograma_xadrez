# Jogadores e suas Personalidades ♟️

Galeria interativa de campeões de xadrez, organizados por personalidade e estilo de jogo. Uma aplicação de estudos de React personalizada com 20 jogadores, imagens individuais e uma imagem de destaque futurista em 3D.

## Demonstração

![Aplicação no computador e no celular](docs/demo.gif)

## Funcionalidades

- 20 jogadores distribuídos em seis categorias.
- Imagens com nome e período de reinado como campeão.
- Cadastro de cartões usando nome, profissão, endereço da imagem e categoria.
- Criação de categorias com nome e cor personalizados.
- Alteração da cor das categorias em tempo real.
- Favoritar e excluir jogadores.
- Interface adaptável ao tamanho da tela, com carrossel no celular, gestos, setas e contador.
- Acesso aos perfis do autor no Facebook e Instagram.

## Categorias

| Categoria | Jogadores |
| --- | --- |
| Os Monstros | Bobby Fischer, Magnus Carlsen, Garry Kasparov |
| Os Universais | Boris Spassky, Ding Liren, Capablanca, Anand |
| Os Táticos ou Românticos | Paul Morphy, Mikhail Tal, Alexander Alekhine |
| Os Posicionais | Tigran Petrosian, Emanuel Lasker, Wilhelm Steinitz, Anatoly Karpov, Vladimir Kramnik |
| Os Subestimados | Gukesh D, Max Euwe, Veselin Topalov, Mikhail Botvinnik |
| Os Clássicos | Vasily Smyslov |

As categorias representam a classificação escolhida para este projeto.

## Tecnologias

React 18, JavaScript, CSS, Create React App, React Icons, UUID e hex-to-rgba. Testes com Jest e React Testing Library.

## Como executar

Instale o Node.js com npm. Na pasta do projeto, execute:

```bash
npm install
npm start
```

Abra [http://localhost:3000](http://localhost:3000).

No Windows, se o PowerShell bloquear `npm`, use `npm.cmd install` e `npm.cmd start`.

### Acessar pelo celular

Com o servidor em execução, conecte computador e celular à mesma rede Wi-Fi. Abra `http://IP_DO_COMPUTADOR:3000` no navegador do celular. No Windows, consulte o IPv4 com `ipconfig`.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm start` | Iniciar o servidor de desenvolvimento |
| `npm test -- --watchAll=false --runInBand` | Executar os testes uma vez |
| `npm run build` | Gerar a versão de produção em `build/` |

## Estrutura

```text
public/imagens/       Imagem de destaque, retratos dos jogadores e ícones sociais
src/App.js           Categorias, jogadores e estado da aplicação
src/componentes/     Cabeçalho, formulários, cartões, categorias e rodapé
docs/demo.gif        Demonstração animada para o GitHub
scripts/             Programa para gerar a demonstração
```

### Gerar novamente o GIF

No Windows, com Chrome ou Edge e ImageMagick (`magick`) instalados, execute:

```bash
npm run build
node scripts/generate-demo.cjs
```

O programa abre um navegador sem janela, captura a aplicação nas visualizações de computador e celular e salva o resultado em `docs/demo.gif`.

## Armazenamento dos dados

Cadastros, favoritos, exclusões e alterações de cor ficam na memória da sessão. Ao atualizar a página, a aplicação volta aos dados iniciais. Não há servidor de armazenamento ou banco de dados.

## Autor

Desenvolvido e personalizado por **Leandro do Nascimento**, a partir do projeto de estudos Organo.

- [Facebook](https://web.facebook.com/leandro.nascimento.37266)
- [Instagram](https://www.instagram.com/leandro_nscmt?psln=MTJmY3Q1cjI3M2R4cg==)
