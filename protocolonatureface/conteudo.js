/* =====================================================================
   CONTEÚDO DA LANDING PAGE — Formação Protocolo NatureFace®
   ---------------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA ATUALIZAR O SITE.
   O layout (index.html, estilo.css, script.js) lê tudo daqui.

   Regras rápidas para editar sem quebrar:
   1. Edite só o texto que está entre aspas "assim". Não apague vírgulas,
      chaves { } nem colchetes [ ].
   2. Se o texto tiver aspas duplas dentro, use aspas curvas “ ” ou \".
   3. Pode usar <strong>negrito</strong> e <em>itálico</em> dentro dos textos.
   4. Tudo que estiver escrito [PREENCHER: ...] ou [CONFIRMAR: ...] aparece
      no site como um marcador discreto. Troque pelo dado real e o marcador
      some sozinho.
   5. Fotos: coloque o arquivo na pasta imagens/ e escreva o nome aqui,
      ex.: "imagens/turma-maio-01.jpg". Prefira .webp ou .jpg com até
      ~1600 px de largura.
   6. Vídeos: cole o link normal do YouTube ou do Vimeo
      (ex.: "https://www.youtube.com/watch?v=XXXX" ou "https://vimeo.com/123").
      O site transforma em vídeo incorporado sozinho.
   7. Depois de salvar, é só recarregar a página no navegador.
   ===================================================================== */

window.CONTEUDO = {

  /* -------------------------------------------------------------------
     CONTATO — usado no botão flutuante, nos botões de WhatsApp e no rodapé
     ------------------------------------------------------------------- */
  // false = marcadores [PREENCHER]/[CONFIRMAR] e itens pendentes ficam ESCONDIDOS no site.
  // true  = mostra os marcadores (útil para revisar o que falta).
  mostrarMarcadores: false,

  contato: {
    // Número do WhatsApp comercial: só números, com 55 + DDD.
    // Exemplo: "5511999998888". Enquanto estiver vazio, o botão abre o
    // WhatsApp sem destinatário (a pessoa escolhe o contato).
    whatsapp: "5562985150061",
    // Mensagem que já vem escrita quando a pessoa abre o WhatsApp
    mensagemWhatsapp: "Olá! Tenho interesse na Formação Protocolo NatureFace.",
    // Como o número aparece escrito no rodapé
    whatsappExibicao: "(62) 98515-0061",
    instagram: "@dra.rosanaa",   // Instagram da Dra. Rosana
    instagramLink: "https://www.instagram.com/dra.rosanaa/",
    email: "",                  // opcional
    empresa: "NatureFace Academy",
    cnpj: "65.972.495/0001-66",
    endereco: "[PREENCHER: endereço]",
    linkPrivacidade: "politica-de-privacidade.html",   // página da Política de Privacidade
    linkTermos: "#"             // link dos Termos de uso
  },

  /* -------------------------------------------------------------------
     PEQUENOS RÓTULOS DOURADOS (aparecem acima dos títulos das seções)
     ------------------------------------------------------------------- */
  rotulos: {
    protocolo: "O Protocolo",
    dra: "Quem conduz a formação",
    tratamentos: "O que você vai dominar",
    beneficios: "Para a sua prática",
    conteudo: "Conteúdo programático",
    resultados: "Resultados",
    depoimentos: "Depoimentos",
    experiencia: "Formação presencial",
    incluso: "Incluso",
    turmas: "Agenda",
    condicoes: "Investimento",
    formulario: "Inscrição",
    faq: "Dúvidas",
    cta: "Próxima turma"
  },

  /* -------------------------------------------------------------------
     MENU DO TOPO
     ------------------------------------------------------------------- */
  menu: {
    itens: [
      { texto: "O Protocolo",   ancora: "#protocolo" },
      { texto: "A Dra. Rosana", ancora: "#dra-rosana" },
      { texto: "Resultados",    ancora: "#resultados" },
      { texto: "Depoimentos",   ancora: "#depoimentos" },
      { texto: "Turmas e condições", ancora: "#investimento" }
    ],
    botao: "Quero participar"
  },

  /* -------------------------------------------------------------------
     1. BANNER PRINCIPAL
     ------------------------------------------------------------------- */
  banner: {
    // Foto da Dra. Rosana. Enquanto estiver vazio, aparece um marcador.
    // Ex.: "imagens/dra-rosana-banner.jpg" (vertical, de preferência 4:5)
    foto: "imagens/dra-rosana-hero-asa.webp",   // laboratório de anatomia (American Society of Anatomy)
    fotoCelular: "imagens/dra-rosana-hero-asa-vertical.webp", // recorte vertical usado no celular
    fotoDescricao: "Dra. Rosana Vecchi Caldas",
    // Frase curta ao lado da foto do banner
    destaqueFoto: "Mais de 6 mil profissionais formadas",
    nomeFormacao: "Formação Protocolo NatureFace®",
    titulo: "Regenerar e reconectar.",
    tituloComplemento: "A estética que respeita a biologia da pele.",
    subtitulo: "Aprenda com a Dra. Rosana Vecchi Caldas um protocolo de rejuvenescimento facial regenerativo, da consulta ao pós-procedimento. Ciência, segurança e precisão em cada etapa.",
    botaoPrincipal: "Quero garantir minha vaga",
    botaoWhatsapp: "Falar com a equipe no WhatsApp",
    // Linha de apoio abaixo dos botões.
    linhaApoio: "Próxima turma: 4 e 5 de dezembro de 2026 · Presencial"
  },

  /* -------------------------------------------------------------------
     2. O PROTOCOLO (com vídeo)
     ------------------------------------------------------------------- */
  protocolo: {
    titulo: "O que é o Protocolo NatureFace",
    // Link do vídeo de apresentação (YouTube ou Vimeo). Vazio = marcador.
    video: "",
    videoMarcador: "[PREENCHER: vídeo de apresentação do protocolo]",
    paragrafos: [
      "O NatureFace nasce da Estética Regenerativa. Em vez de corrigir só a superfície, ele trata a pele como órgão.",
      "O protocolo atua em camadas, da epiderme às estruturas de suporte profundo. Primeiro prepara. Depois estimula. Sempre no tempo fisiológico de cada pele."
    ],
    principiosIntro: "Dois princípios guiam tudo:",
    principios: [
      { nome: "Regenerar",  texto: "Reativar as vias de produção estrutural da pele: colágeno, elastina e renovação epidérmica." },
      { nome: "Reconectar", texto: "Devolver a integração entre as camadas da pele e a confiança de quem se olha no espelho." }
    ],
    fechamento: "Nada de transformação artificial. Restauração estrutural, com ciência e precisão clínica.",
    botao: "Quero conhecer a formação"
  },

  /* -------------------------------------------------------------------
     3. A DRA. ROSANA
     ------------------------------------------------------------------- */
  draRosana: {
    // Foto vertical da Dra. Rosana (4:5). Vazio = marcador.
    foto: "imagens/dra-rosana-retrato.webp",
    titulo: "Dra. Rosana Vecchi Caldas",
    apresentacao: "quem conduz a formação",
    // Número em destaque (grande, dourado) e o rótulo embaixo
    numero: "+6 mil",
    numeroRotulo: "alunas formadas",
    // Destaques curtos em dourado (aparecem logo abaixo do nome)
    destaques: [
      "Biomédica",
      "Mestrado Internacional em Harmonização Facial e Saúde Estética",
      "Anatomia · Harvard Medical School",
      "Criadora do Protocolo NatureFace e do Bléfaro Sem Cortes"
    ],
    // Texto oficial da trajetória (não alterar o conteúdo)
    trajetoria: [
      "Dra. Rosana Vecchi Caldas é biomédica, com pós-graduações na área da Estética e Mestrado Internacional em Harmonização Facial e Saúde Estética.",
      "Atualmente, amplia sua formação acadêmica cursando Medicina, mantendo sua trajetória direcionada ao estudo da pele e à futura Dermatologia.",
      "Sua trajetória acadêmica inclui formação internacional, com estudos em anatomia pela Harvard Medical School, em Boston, além de aperfeiçoamentos realizados nos Estados Unidos e na Argentina.",
      "É pesquisadora, professora e desenvolvedora de protocolos voltados ao tratamento e à regeneração da pele, sendo criadora do Protocolo NatureFace e do método Bléfaro Sem Cortes.",
      "Ao longo de sua trajetória, já contribuiu para a formação de milhares de profissionais por meio de cursos, imersões e programas de aperfeiçoamento no Brasil e no exterior."
    ],
    // Frase da missão (vira citação em destaque)
    missao: "Sua missão une ciência, prática clínica e educação: desenvolver protocolos capazes de transformar peles e formar profissionais cada vez mais preparados.",
    formacaoInternacionalTitulo: "Formação Internacional",
    formacaoInternacional: [
      "E é também a idealizadora do projeto Formação Internacional, iniciativa que reúne profissionais e doutores da área da Estética em uma experiência de aprofundamento científico, aperfeiçoamento da prática clínica e ampliação do domínio anatômico.",
      "Um projeto que nasceu com o propósito de ultrapassar fronteiras, aproximar profissionais da ciência e elevar, cada vez mais, o nível da Estética brasileira."
    ],
    // Visão dela sobre a pele (texto do copy) e frase da apostila
    paragrafos: [
      "Para a Dra. Rosana, cada pele carrega uma história biológica própria. Fototipo, idade, hormônios, sol acumulado, hábitos de vida. Tudo isso muda a resposta a qualquer procedimento.",
      "Por isso a formação não ensina só o que aplicar. Ensina a ler a pele, reconhecer riscos e decidir com segurança."
    ],
    citacao: "Quando técnica e propósito caminham juntos, o resultado deixa de ser apenas estético e torna-se transformador.",
    botao: "Quero aprender com a Dra. Rosana"
  },

  /* -------------------------------------------------------------------
     4. TRATAMENTOS E BENEFÍCIOS
     ------------------------------------------------------------------- */
  tratamentos: {
    titulo: "O que você vai dominar",
    protocolosTitulo: "Protocolos ensinados",
    protocolosApoio: "Seis protocolos com a mesma lógica regenerativa: preparar, estimular e respeitar o tempo de cada pele.",
    protocolos: [
      { nome: "NatureFace full face",  texto: "Fases epidérmicas e fase injetável, em versão leve ou forte." },
      { nome: "Microtox",              texto: "Aplicação intradérmica integrada ao protocolo." },
      { nome: "NatureNeck",            texto: "Pele do pescoço, com técnica adaptada a uma pele mais fina e reativa." },
      { nome: "NatureHands",           texto: "Qualidade de pele e manchas nas mãos." },
      { nome: "Bléfaro sem Cortes",    texto: "Região dos olhos, com foco em segurança ocular." },
      { nome: "Regenerando Melasma",   texto: "Abordagem do melasma e da hiperpigmentação." }
    ],
    beneficiosTitulo: "O que muda na sua prática",
    beneficios: [
      { nome: "Raciocínio clínico, não receita pronta.", texto: "Você aprende a escolher a conduta certa para cada pele." },
      { nome: "Segurança em primeiro lugar.",            texto: "Anatomia vascular, zonas de risco, mapa anestésico e manejo de intercorrências." },
      { nome: "Atenção à pele brasileira.",              texto: "Fototipos, risco de mancha pós-inflamatória e preparo adequado." },
      { nome: "Do diagnóstico ao pós.",                  texto: "Consulta estruturada, execução e guia de cuidados de 30 dias para a paciente." },
      { nome: "Base científica.",                        texto: "Conteúdo revisado com literatura científica de referência." }
    ],
    botao: "Quero dominar o protocolo"
  },

  /* -------------------------------------------------------------------
     5. CONTEÚDO PROGRAMÁTICO (4 etapas)
     ------------------------------------------------------------------- */
  conteudo: {
    titulo: "Sua jornada em 4 etapas",
    subtitulo: "12 módulos organizados do fundamento à prática.",
    aviso: "[CONFIRMAR com a Dra. Rosana a divisão dos módulos em 4 etapas]",
    etapas: [
      {
        nome: "Entender a pele",
        modulos: "Módulos 01, 02 e 03",
        topicos: [
          "Anatomia e fisiologia da pele",
          "Melanogênese e melasma"
        ]
      },
      {
        nome: "Segurança e anatomia",
        modulos: "Módulos 04, 06 e 07",
        topicos: [
          "Anatomia vascular da face e zonas de risco",
          "Harmonização: técnica dos 6 pontos de embelezamento",
          "Mapa anestésico da face"
        ]
      },
      {
        nome: "Os protocolos na prática",
        modulos: "Módulos 05 e 08",
        topicos: [
          "NatureFace, Microtox, NatureNeck, NatureHands, Bléfaro sem Cortes e Regenerando Melasma",
          "Consulta e checklist de risco",
          "Preparo e execução passo a passo"
        ]
      },
      {
        nome: "Pós, peelings, homecare e intercorrências",
        modulos: "Módulos 09, 10, 11 e 12",
        topicos: [
          "Pós-procedimento e guia de 30 dias para a paciente",
          "Peelings: escolha e preparo por fototipo",
          "Homecare e fotoproteção",
          "Intercorrências: prevenção e conduta"
        ]
      }
    ],
    cargaHoraria: "2 dias presenciais · das 8h às 18h",
    formato: "Presencial",
    botao: "Quero receber a grade completa"
  },

  /* -------------------------------------------------------------------
     6. ANTES E DEPOIS (galeria com ampliação ao clicar)
     Para incluir mais: copie uma linha { ... }, troque o arquivo e a legenda.
     ------------------------------------------------------------------- */
  resultados: {
    titulo: "Casos clínicos",
    rotulo: "Resultados",
    legenda: "Resultados reais de pacientes atendidas com o Protocolo NatureFace. Cada pele responde de um jeito.",
    // Cada caso tem duas imagens:
    //   card     → imagem lado a lado (antes | depois), todas no mesmo tamanho (1208 x 800 px)
    //   original → foto completa, que aparece ao clicar em "Ampliar"
    casos: [
      { card: "imagens/caso-01.webp", original: "imagens/antes-depois-01.webp", legenda: "Região periorbital e malar",    descricao: "Antes e depois: pele da região dos olhos e da bochecha" },
      { card: "imagens/caso-02.webp", original: "imagens/antes-depois-02.webp", legenda: "Região periorbital e temporal", descricao: "Antes e depois: pele ao redor dos olhos e da têmpora" },
      { card: "imagens/caso-03.webp", original: "imagens/antes-depois-03.webp", legenda: "Face completa",                 descricao: "Antes e depois: rosto inteiro de frente" },
      { card: "imagens/caso-04.webp", original: "imagens/antes-depois-04.webp", legenda: "Região dos olhos", descricao: "Antes e depois: região dos olhos" },
      { card: "imagens/caso-05.webp", original: "imagens/antes-depois-05.webp", legenda: "Textura e cicatrizes",          descricao: "Antes e depois: textura da pele e cicatrizes na bochecha" }
    ]
  },

  /* -------------------------------------------------------------------
     7. DEPOIMENTOS (cards em vídeo e em texto)
     tipo: "video" → preencha "video" com o link do YouTube/Vimeo
     tipo: "print" → print de mensagem (imagem em imagens/depoimentos/)
     tipo: "texto" → depoimento escrito (preencha "texto", "nome", "detalhe")
     Nos prints, nomes, telefones, @ e horários já foram borrados.
     Só use depoimentos reais, com autorização por escrito.
     ------------------------------------------------------------------- */
  depoimentos: {
    titulo: "Quem já viveu a formação",
    // Frases curtas em destaque acima da faixa de prints (trechos reais dos depoimentos)
    destaques: ["Eu já fiz tantos cursos e nada se compara a esse!", "Falei que pagaria o dobro."],
    itens: [
      { tipo: "video", video: "", nome: "[PREENCHER: nome da aluna 1]", detalhe: "[PREENCHER: profissão, cidade]" },
      { tipo: "video", video: "", nome: "[PREENCHER: nome da aluna 2]", detalhe: "[PREENCHER: profissão, cidade]" },
      { tipo: "video", video: "", nome: "[PREENCHER: nome da aluna 3]", detalhe: "[PREENCHER: profissão, cidade]" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-07.webp", descricao: "Mensagem de aluna agradecendo o conhecimento e o cuidado na formação" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-02.webp", descricao: "Mensagem de aluna dizendo que a vida profissional tomou outro rumo" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-05.webp", descricao: "Mensagem de aluna orgulhosa por ter escolhido a Dra. Rosana" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-01.webp", descricao: "Mensagem de aluna dizendo que nenhum curso se compara" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-04.webp", descricao: "Mensagem elogiando o jeito atencioso da Dra. Rosana" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-06.webp", descricao: "Mensagem de aluna: não foi apenas mais um curso" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-03.webp", descricao: "Mensagem: não tem igual NatureFace" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-10.webp", descricao: "Mensagem de aluna: no curso descobri o seu amor por ensinar" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-09.webp", descricao: "Mensagem de aluna agradecendo a entrega do final de semana" },
      { tipo: "print", imagem: "imagens/depoimentos/depoimento-08.webp", descricao: "Mensagem: falei que pagaria o dobro" }
    ],
    botao: "Quero ser a próxima"
  },

  /* -------------------------------------------------------------------
     8. EXPERIÊNCIA PRESENCIAL (fotos e vídeos das turmas)
     tipo: "foto"  → arquivo: "imagens/nome-da-foto.jpg"
     tipo: "video" → video: link do YouTube/Vimeo, capa: foto opcional
     Itens com arquivo/vídeo vazio aparecem como marcador.
     ------------------------------------------------------------------- */
  experiencia: {
    titulo: "Viva a experiência",
    texto: "Teoria com profundidade. Prática com acompanhamento. Um ambiente pensado para você aprender com calma e precisão.",
    marcador: "",
    itens: [
      { tipo: "foto",  arquivo: "", legenda: "[PREENCHER: foto da turma — sala]" },
      { tipo: "video", video: "",   capa: "", legenda: "[PREENCHER: vídeo HandsOn]" },
      { tipo: "foto",  arquivo: "", legenda: "[PREENCHER: foto da prática]" },
      { tipo: "foto",  arquivo: "", legenda: "[PREENCHER: foto da Dra. Rosana com alunas]" },
      { tipo: "foto",  arquivo: "", legenda: "[PREENCHER: foto do material/apostila]" },
      { tipo: "video", video: "",   capa: "", legenda: "[PREENCHER: vídeo da turma]" }
    ]
  },

  /* -------------------------------------------------------------------
     9. TUDO QUE ESTÁ INCLUSO
     ------------------------------------------------------------------- */
  incluso: {
    titulo: "O que está incluso na sua formação",
    protocolosTitulo: "Protocolos que você domina",
    protocolos: ["NatureFace full face", "Microtox", "NatureNeck", "NatureHands", "Bléfaro sem Cortes", "Regenerando Melasma"],
    praticaTitulo: "Prática em paciente modelo",
    praticaSelo: "Na formação",
    praticaTexto: "Você aplica o protocolo em paciente modelo, com acompanhamento.",
    praticaVideo: "videos/pratica-turma.mp4",       // vídeo curto, mudo, em loop (fundo do card)
    praticaVideoWebm: "videos/pratica-turma.webm",  // versão mais leve para navegadores compatíveis
    praticaImagem: "videos/pratica-turma-poster.webp", // capa (aparece antes do vídeo carregar)
    // Faixa discreta no fim da seção (ícone: apostila, guia, certificado, grupo)
    extras: [
      { icone: "apostila",    titulo: "Apostila completa", texto: "12 módulos de formação clínica" },
      { icone: "guia",        titulo: "Guia de 30 dias",   texto: "Para entregar às suas pacientes" },
      { icone: "certificado", titulo: "Certificado",       texto: "Formação Protocolo NatureFace®" },
      { icone: "grupo",       titulo: "Grupo de experts",  texto: "Suporte pós-curso com as experts" }
    ],
    botao: "Quero minha vaga"
  },

  /* -------------------------------------------------------------------
     PRÓXIMAS TURMAS — aparecem na tabela e na lista do formulário
     ------------------------------------------------------------------- */
  turmas: {
    titulo: "Próximas turmas",
    // Cada turma vira um card. "dataCompleta" vai na mensagem do WhatsApp
    // e na lista do formulário.
    lista: [
      { mes: "Dezembro", dias: "04 e 05", ano: "2026", formato: "2 dias presenciais", horario: "8h às 18h", dataCompleta: "4 e 5 de dezembro de 2026" },
      { mes: "Janeiro",  dias: "15 e 16", ano: "2027", formato: "2 dias presenciais", horario: "8h às 18h", dataCompleta: "15 e 16 de janeiro de 2027" }
    ],
    botaoTurma: "Quero esta turma",
    // Mensagem do WhatsApp ao clicar em "Quero esta turma" ({data} vira a data da turma)
    mensagemTurma: "Olá! Tenho interesse na Formação Protocolo NatureFace, turma de {data}.",
    texto: "",   // frase opcional abaixo do título (vazio = não aparece)
    botao: "Quero reservar minha vaga"
  },

  /* -------------------------------------------------------------------
     INVESTIMENTO — o site NÃO mostra valores.
     A seção convida a falar com o time comercial pelo WhatsApp.
     ------------------------------------------------------------------- */
  investimento: {
    titulo: "Condições e valores",
    texto: "Valores, formas de pagamento e condições de cada turma são apresentados pelo nosso time comercial, de forma individual.",
    detalhe: "Chame no WhatsApp e receba as informações da turma que combina com a sua agenda.",
    botao: "Falar com o time comercial"
  },

  /* -------------------------------------------------------------------
     10. FORMULÁRIO DE INTERESSE (abre numa janela ao clicar nos botões
     "Quero participar", "Quero garantir minha vaga" etc.)
     Por enquanto o envio abre o WhatsApp comercial com os dados
     preenchidos. A ligação com o CRM entra depois, no arquivo
     script.js, na função enviarFormulario.
     ------------------------------------------------------------------- */
  formulario: {
    titulo: "Dê o primeiro passo",
    texto: "Deixe seus dados. Nossa equipe entra em contato com as próximas datas e condições.",
    profissoes: [
      "[PREENCHER: profissões habilitadas]",
      "Outra"
    ],
    botaoAbrir: "Quero me inscrever",   // botão da seção que abre o formulário
    botao: "Quero receber as informações",
    mensagemEnviado: "Falta só um passo: toque em Enviar no WhatsApp para falar com nossa equipe.",
    botaoWhatsapp: "Prefiro falar no WhatsApp"
  },

  /* -------------------------------------------------------------------
     PERGUNTAS FREQUENTES
     ------------------------------------------------------------------- */
  faq: {
    titulo: "Perguntas frequentes",
    apoio: "Ainda ficou alguma dúvida? Fale com nosso time.",
    botaoWhatsapp: "Falar no WhatsApp",
    botaoInscricao: "Quero me inscrever",
    itens: [
      { pergunta: "Tem prática?",                  resposta: "Sim. A formação inclui prática em paciente modelo." },
      { pergunta: "Recebo certificado?",           resposta: "Sim." },
      { pergunta: "Qual a carga horária e o formato?", resposta: "A formação é presencial: 2 dias, das 8h às 18h." },
      { pergunta: "Como funciona o pagamento?",    resposta: "Valores e condições são passados pelo nosso time comercial. É só chamar no WhatsApp." },
      { pergunta: "Tenho suporte depois do curso?", resposta: "Sim. Você entra no grupo com todas as experts no Protocolo NatureFace." }
    ],
    botao: "Tirar minhas dúvidas"
  },

  /* -------------------------------------------------------------------
     CHAMADA FINAL
     ------------------------------------------------------------------- */
  ctaFinal: {
    titulo: "Sua próxima pele não é só mais um atendimento.",
    texto: "É a chance de aplicar ciência, segurança e precisão em cada decisão.",
    botao: "Quero fazer parte da próxima turma"
  },

  /* -------------------------------------------------------------------
     RODAPÉ
     ------------------------------------------------------------------- */
  rodape: {
    aviso: "Os resultados dos procedimentos variam de pessoa para pessoa."
  }
};
