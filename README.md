# Portfólio de judô

Site estático de uma página para apresentar Cristian Domingos Costa, divulgar resultados e competições e receber propostas de patrocínio. Até cadastrar as fotos, o site exibe retratos e composições vetoriais.

## Desenvolvimento local

Use Node.js 20.19+ na linha 20 ou Node.js 22.12+.

```bash
npm install
npm run dev
```

Abra o endereço **Local** exibido pelo Vite, normalmente `http://localhost:5173`. As alterações nos componentes e estilos aparecem na prévia.

## Dados do atleta

Edite [src/data/athlete.ts](src/data/athlete.ts). Altere `firstName`, `lastName` e `fullName` para configurar o nome no Hero, no perfil e no rodapé. Atualize também `seo.title`, `seo.description` e `contact.subject`. Configure `city`, `state`, `division`, `team`, `quote`, `bio` e `goals`. Os campos `nextDivision` e `beganAtAge` permitem indicar a categoria planejada e a idade em que o atleta começou. Use `age` para informar diretamente a idade exibida ou `birthDate` no formato `AAAA-MM-DD` para calculá-la.

Os resultados e a trajetória ficam nas listas `results` e `timeline`. Os itens ilustrativos da galeria estão em [src/data/demo.ts](src/data/demo.ts). Substitua `gallery: demoGallery` pela sua lista de fotos e vídeos quando tiver os arquivos.

### Tema e graduação

Mude `belt` e `beltColor` no arquivo de dados para atualizar o nome e os detalhes gráficos da graduação. Os judogis e as faixas das ilustrações SVG fazem parte dos desenhos.

As variáveis de cores, fontes, espaçamentos e gradientes ficam em [src/styles/theme.css](src/styles/theme.css). Para trocar a família tipográfica, ajuste `--font-display` ou `--font-copy` e a importação correspondente em [src/main.tsx](src/main.tsx). As fontes atuais são servidas pelo próprio site. Os parâmetros da animação de rolagem estão em [src/data/theme.ts](src/data/theme.ts).

`scrollSmoothing` ajusta em segundos a suavização da rolagem em desktop. Em `heroScene`, `scrollLength` define a duração da abertura fixa em alturas de tela e `portraitScale` define o tamanho final do retrato. A frase em destaque da abertura vem de `quote`, no arquivo do atleta.

No desktop com espaço suficiente, a galeria se desloca lateralmente conforme a página é rolada e volta à grade quando o filtro deixa menos de três mídias. Em telas estreitas, a galeria fica em grade e a abertura usa uma sequência mais curta quando há espaço. Telas compactas e a preferência de movimento reduzido mantêm as seções no fluxo normal.

## Fotos, vídeos e mídia kit

Coloque os arquivos em `public/` e informe os caminhos a partir dessa pasta. Use, por exemplo, `images/hero/apresentacao.webp`. O site resolve esses caminhos também quando publicado em um subdiretório no GitHub Pages.

| Conteúdo | Pasta sugerida | Campo |
| --- | --- | --- |
| Retratos do Hero | `public/images/hero/` | `hero.primary` e `hero.alternate` |
| Retrato do perfil | `public/images/athlete/` | `portrait` |
| Galeria | `public/images/gallery/` | `gallery[].photo` |
| Fotos de resultados | `public/images/achievements/` | `results[].photo` |
| Logotipos | `public/images/sponsors/` | `sponsors[].logo` |
| Mídia kit em PDF | `public/documents/` | `mediaKit` |

### Revelação no Hero

Preencha as duas propriedades em `hero`. Você pode usar PNG, JPEG, WebP ou AVIF.

```ts
hero: {
  primary: {
    src: 'images/hero/judogi-branco.webp',
    alt: 'Cristian de frente com judogi branco',
    position: 'center 50%',
  },
  alternate: {
    src: 'images/hero/judogi-azul.webp',
    alt: 'Cristian em posição de pegada com judogi azul',
    position: 'center 50%',
  },
  radius: 165,
  feather: 34,
  smoothing: 0.30,
  transition: 0.32,
},
```

Exporte as duas imagens com a mesma proporção e, de preferência, as mesmas dimensões. Alinhe visualmente o rosto e os ombros, mantenha a escala semelhante e deixe espaço lateral para o recorte em telas verticais. Teste a composição em desktop e celular. Use WebP ou AVIF comprimido para os arquivos maiores. O campo opcional `position` usa a sintaxe CSS de `object-position`.

`radius` e `feather` controlam raio e suavidade da borda em pixels. `smoothing` e `transition` controlam o acompanhamento do cursor e a transição em segundos. O botão **Alternar retrato** funciona com toque, teclado e a preferência de movimento reduzido.

### Galeria

Inclua um objeto por foto ou vídeo. As categorias aceitas são `Competições`, `Treinos`, `Pódios` e `Bastidores`.

```ts
{
  id: 'treino',
  category: 'Treinos',
  title: 'Sessão de treino',
  caption: 'Prática de entradas e pegadas.',
  photo: { src: 'images/gallery/treino.webp', alt: 'Dois judocas praticando pegadas' },
  illustration: 'images/gallery/treino.svg',
  video: { url: 'images/gallery/treino.mp4', type: 'file' },
}
```

Remova `video` para cadastrar uma foto. Para vídeo de plataforma externa, use `type: 'embed'` e a URL de incorporação do provedor, como o formato `https://www.youtube-nocookie.com/embed/ID_DO_VIDEO`, sem parâmetros de reprodução automática. A página carrega o player ao abrir a mídia. Se a miniatura estiver ausente ou falhar, a galeria usa a ilustração da categoria ou um fundo texturizado. Use o campo opcional `illustration` para informar outro desenho.

## Resultados, trajetória e agenda

Exemplos de objetos para as listas de dados. Substitua todos os campos pelas informações oficiais.

```ts
// results
{ id: 'resultado-1', name: 'Nome do campeonato', year: 2026,
  location: 'Cidade, UF', division: '−73 kg', placement: 1, featured: true }

// timeline
{ id: 'marco-1', year: 2026, type: 'Evolução de faixa',
  title: 'Título do marco', description: 'Relato verificável da graduação.' }

// events
{ id: 'evento-1', name: 'Nome do evento', date: 'AAAA-MM-DD',
  city: 'Cidade', state: 'UF', country: 'Brasil', division: '−73 kg',
  status: 'Previsto' }
```

- `results[].placement` aceita a colocação numérica, como `5`, ou `'participação'`. `featured: true` destaca o resultado e `bracketSize` informa quantos atletas havia na chave. Use o mesmo `competitionId` quando cadastrar vários resultados na mesma competição.
- Use `year` em resultados e marcos quando souber o ano. Se algum marco estiver sem ano, mantenha a lista `timeline` na ordem em que quer exibi-la. Cada marco aceita `photo` opcional.
- Informe as datas reais em `events`. Os status aceitos são `Confirmado`, `Previsto` e `Concluído`. A agenda ordena os eventos por data e separa as competições futuras das anteriores.

## Patrocínio e canais oficiais

Cadastre os patrocinadores e apoiadores autorizados em `sponsors`. Cada item tem `name`, `category`, `logo` opcional no formato `{ src, alt }` e `url` opcional. Use categorias como patrocínio, apoio ou parceria esportiva.

- Defina `mediaKit: 'documents/midia-kit.pdf'` depois de copiar o PDF real. O controle aparece indisponível enquanto o campo estiver vazio.
- Preencha `contact.whatsapp` com o número oficial em formato internacional, incluindo o código de país e o DDD. Use `contact.message` para o texto inicial da conversa.
- Configure `contact.email` e, se aplicável, `contact.commercialEmail`. O link de e-mail inclui `contact.subject` e `contact.message`.
- Use a URL completa do perfil em `contact.instagram`. Adicione outras redes em `contact.socials`, com objetos `{ label, url }`.
- Os canais aparecem após configurar seus endereços. O botão de patrocínio direciona à seção de propostas.

## Build e publicação

```bash
npm run typecheck
npm run build
npm run preview
```

O Vite gera o site estático em `dist/`. A base relativa permite usar o mesmo build na raiz de um domínio ou em um caminho de repositório.

1. Crie um repositório no GitHub e envie os arquivos da pasta do projeto à branch `main`, incluindo o lockfile e o [workflow](.github/workflows/deploy.yml).
2. Em **Settings → Pages**, selecione **GitHub Actions** em **Source**.
3. Configure `seo.siteUrl` com o endereço de publicação completo, incluindo o caminho do repositório, quando houver. Informe em `seo.image` o caminho da imagem de compartilhamento a partir de `public/` ou uma URL absoluta. Use uma imagem JPEG ou PNG de 1200 × 630 para compartilhamento. O build coloca os metadados diretamente no HTML.
4. Execute **Publicar no GitHub Pages** em **Actions** ou envie um commit para `main`. Abra a URL gerada no ambiente `github-pages`.

[Guia oficial de publicação do Vite](https://vite.dev/guide/static-deploy.html#github-pages)

