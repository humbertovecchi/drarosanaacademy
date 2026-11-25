/* =====================================================================
   script.js — monta a página a partir do conteudo.js
   Não é preciso mexer aqui para trocar textos, fotos ou vídeos.
   ===================================================================== */
(function () {
  "use strict";
  var C = window.CONTEUDO || {};

  /* ---------- utilidades ---------- */
  function pega(caminho) {
    return caminho.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  }
  // Transforma [PREENCHER: ...] e [CONFIRMAR: ...] em marcadores discretos
  var MOSTRA = C.mostrarMarcadores === true;
  function marca(txt) {
    if (txt == null) return "";
    return String(txt).replace(/\s*\[(PREENCHER|CONFIRMAR)[^\]]*\]/g, function (m) {
      return MOSTRA ? ' <span class="marcador">' + m.trim() + "</span>" : '<span class="marcador-oculto"></span>';
    });
  }
  function vazio(txt) { return !txt || /^\s*\[(PREENCHER|CONFIRMAR)/.test(txt); }
  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function semTags(s) { return String(s || "").replace(/<[^>]+>/g, ""); }

  // Converte link do YouTube/Vimeo em endereço de vídeo incorporado
  function embed(url) {
    if (!url) return "";
    var m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (m) return "https://www.youtube-nocookie.com/embed/" + m[1] + "?rel=0";
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return "https://player.vimeo.com/video/" + m[1];
    return url;
  }
  function iframe(url, titulo) {
    return '<iframe src="' + esc(embed(url)) + '" title="' + esc(titulo || "Vídeo") + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  }

  // Marcador de foto/vídeo ainda não enviado (mostra o logo bem suave)
  function placeholder(texto, claro) {
    return '<div class="ph' + (claro ? " ph-claro" : "") + '"><div class="ph-mono"><img src="imagens/logo-natureface-ouro.webp" alt=""></div><p class="ph-txt">' + marca(texto) + "</p></div>";
  }
  function dois(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- WhatsApp ---------- */
  var ct = C.contato || {};
  var numero = String(ct.whatsapp || "").replace(/\D/g, "");
  var linkWa = "https://wa.me/" + (numero.length >= 12 ? numero : "") + "?text=" + encodeURIComponent(ct.mensagemWhatsapp || "");
  document.querySelectorAll(".js-wa").forEach(function (a) {
    a.href = linkWa; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll(".js-insta").forEach(function (a) {
    if (ct.instagramLink) { a.href = ct.instagramLink; a.target = "_blank"; a.rel = "noopener"; }
    else a.removeAttribute("href");
  });
  document.querySelectorAll(".js-privacidade").forEach(function (a) { a.href = ct.linkPrivacidade || "politica-de-privacidade.html"; a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll(".js-termos").forEach(function (a) { a.href = ct.linkTermos || "#"; });

  document.querySelectorAll(".js-ano").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- textos simples (data-c) ---------- */
  document.querySelectorAll("[data-c]").forEach(function (el) {
    var v = pega(el.getAttribute("data-c"));
    if (v != null) el.innerHTML = marca(v);
  });

  /* ---------- fotos principais ---------- */
  function foto(el, arquivo, alt, texto, claro, eager, celular, srcset, sizes) {
    if (!el) return;
    if (!arquivo) { el.innerHTML = placeholder(texto, claro); return; }
    var img = '<img src="' + esc(arquivo) + '"' + (srcset ? ' srcset="' + esc(srcset) + '" sizes="' + esc(sizes || "100vw") + '"' : "") + ' alt="' + esc(alt) + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
    el.innerHTML = celular ? '<picture><source media="(max-width: 720px)" srcset="' + esc(celular) + '">' + img + "</picture>" : img;
  }
  var b = C.banner || {};
  foto(document.querySelector('[data-foto="banner"]'), b.foto, b.fotoDescricao, "[PREENCHER: foto da Dra. Rosana]", false, true, b.fotoCelular,
    b.foto === "imagens/dra-rosana-hero-asa.webp" ? "imagens/dra-rosana-hero-asa-700.webp 700w, imagens/dra-rosana-hero-asa.webp 1244w" : "", "(max-width: 1100px) 50vw, 640px");
  var dr = C.draRosana || {};
  foto(document.querySelector('[data-foto="draRosana"]'), dr.foto, dr.titulo, "[PREENCHER: foto da Dra. Rosana em atendimento ou aula]", true, false, "",
    dr.foto === "imagens/dra-rosana-retrato.webp" ? "imagens/dra-rosana-retrato-600.webp 600w, imagens/dra-rosana-retrato.webp 1000w" : "", "(max-width: 720px) 92vw, 40vw");

  /* ---------- card da prática: vídeo curto mudo em loop (compatível com iPhone) ---------- */
  var pm = document.querySelector("[data-pratica]");
  if (pm && C.incluso) {
    var I = C.incluso;
    if (I.praticaVideo) {
      var v = document.createElement("video");
      v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      ["muted", "loop", "autoplay", "playsinline", "webkit-playsinline"].forEach(function (a) { v.setAttribute(a, ""); });
      v.setAttribute("preload", "auto"); v.setAttribute("aria-hidden", "true");
      if (I.praticaImagem) v.poster = I.praticaImagem;
      var s1 = document.createElement("source"); s1.src = I.praticaVideo; s1.type = "video/mp4"; v.appendChild(s1);
      if (I.praticaVideoWebm) { var s2 = document.createElement("source"); s2.src = I.praticaVideoWebm; s2.type = "video/webm"; v.appendChild(s2); }
      pm.appendChild(v);
      var play = document.createElement("button");
      play.type = "button"; play.className = "video-play"; play.setAttribute("aria-label", "Tocar vídeo"); play.hidden = true;
      play.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
      pm.appendChild(play);
      function tenta() { var p = v.play(); if (p && p.catch) p.then(function () { play.hidden = true; }).catch(function () { play.hidden = false; }); }
      play.addEventListener("click", function () { v.muted = true; tenta(); });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (ents) { ents.forEach(function (e) { if (e.isIntersecting) tenta(); else v.pause(); }); }, { threshold: .25 }).observe(pm);
      } else tenta();
    } else if (I.praticaImagem) pm.innerHTML = '<img src="' + esc(I.praticaImagem) + '" alt="">';
  }

  /* ---------- vídeo do protocolo ---------- */
  var pv = document.querySelector('[data-video="protocolo"]');
  var P = C.protocolo || {};
  if (pv) pv.innerHTML = P.video ? iframe(P.video, P.titulo) : placeholder(P.videoMarcador || "[PREENCHER: vídeo]", true);

  /* ---------- listas ---------- */
  var listas = {
    "menu": function () {
      return (C.menu.itens || []).map(function (i) { return '<li><a href="' + esc(i.ancora) + '">' + marca(i.texto) + "</a></li>"; }).join("");
    },
    "protocolo.paragrafos": function () {
      return (P.paragrafos || []).map(function (t) { return "<p>" + marca(t) + "</p>"; }).join("");
    },
    "protocolo.principios": function () {
      return (P.principios || []).map(function (p, i) {
        return '<div class="principio revela" style="--d:' + i + '"><h3>' + marca(p.nome) + '</h3><span class="fio" aria-hidden="true"></span><p>' + marca(p.texto) + "</p></div>";
      }).join("");
    },
    "draRosana.paragrafos": function () {
      return (dr.paragrafos || []).map(function (t) { return "<p>" + marca(t) + "</p>"; }).join("");
    },
    "draRosana.trajetoria": function () {
      return (dr.trajetoria || []).map(function (t) { return "<p>" + marca(t) + "</p>"; }).join("");
    },
    "draRosana.formacaoInternacional": function () {
      return (dr.formacaoInternacional || []).map(function (t) { return "<p>" + marca(t) + "</p>"; }).join("");
    },
    "draRosana.destaques": function () {
      return (dr.destaques || []).map(function (t) { return "<li>" + marca(t) + "</li>"; }).join("");
    },
    "tratamentos.protocolos": function () {
      return (C.tratamentos.protocolos || []).map(function (p, i) {
        return '<li class="trat-card revela" style="--d:' + (i % 2) + '"><span class="trat-num ouro-grad" aria-hidden="true">' + dois(i + 1) + '</span><span class="fio" aria-hidden="true"></span><h3>' + marca(p.nome) + "</h3><p>" + marca(p.texto) + "</p></li>";
      }).join("");
    },
    "tratamentos.beneficios": function () {
      return (C.tratamentos.beneficios || []).map(function (p, i) {
        return '<li class="revela" style="--d:' + i + '"><strong>' + marca(p.nome) + "</strong><span>" + marca(p.texto) + "</span></li>";
      }).join("");
    },
    "conteudo.abas": function () {
      return (C.conteudo.etapas || []).map(function (e, i) {
        return '<button class="aba" type="button" role="tab" id="aba-' + i + '" aria-controls="painel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
          '<span class="aba-num" aria-hidden="true">' + dois(i + 1) + '</span><span class="aba-nome">' + marca(e.nome) + '</span><span class="aba-mod">' + marca(e.modulos) + "</span></button>";
      }).join("");
    },
    "conteudo.paineis": function () {
      return (C.conteudo.etapas || []).map(function (e, i) {
        return '<div class="painel" role="tabpanel" id="painel-' + i + '" aria-labelledby="aba-' + i + '"' + (i ? " hidden" : "") + ">" +
          '<div class="painel-cab"><p>Etapa ' + dois(i + 1) + " · " + marca(e.modulos) + "</p><h3>" + marca(e.nome) + "</h3></div>" +
          "<ul>" + (e.topicos || []).map(function (t, j) { return '<li style="--i:' + j + '">' + marca(t) + "</li>"; }).join("") + "</ul></div>";
      }).join("");
    },
    "conteudo.acordeao": function () {
      return (C.conteudo.etapas || []).map(function (e, i) {
        return '<details class="acordeao"><summary><span class="aba-num">' + dois(i + 1) + '</span><span class="acordeao-nome">' + marca(e.nome) + '</span><span class="faq-ic" aria-hidden="true"></span></summary>' +
          '<ul>' + (e.topicos || []).map(function (t) { return "<li>" + marca(t) + "</li>"; }).join("") + "</ul></details>";
      }).join("");
    },
    "resultados.casos": function () {
      return (C.resultados.casos || []).map(function (f, i) {
        return '<div class="marquee-item">' +
          '<button class="caso protegida" type="button" data-galeria="resultados" data-indice="' + i + '" aria-label="Ampliar: ' + esc(semTags(f.descricao || f.legenda)) + '">' +
          '<div class="caso-img"><img src="' + esc(f.card) + '" srcset="' + esc(f.card.replace(".webp", "-600.webp")) + ' 604w, ' + esc(f.card) + ' 1208w" sizes="(max-width: 720px) 85vw, 520px" alt="' + esc(semTags(f.descricao || f.legenda)) + '" width="1208" height="800" loading="lazy" decoding="async" draggable="false">' +
          '<span class="caso-tag antes">Antes</span><span class="caso-tag depois">Depois</span></div></button></div>';
      }).join("");
    },
    "depoimentos.videos": function () {
      return (C.depoimentos.itens || []).filter(function (d) { return d.tipo === "video"; }).map(function (d, i) {
        return '<article class="dep dep-video revela" style="--d:' + i + '"><div class="moldura">' +
          (d.video ? iframe(d.video, "Depoimento de " + semTags(d.nome)) : placeholder("[PREENCHER: vídeo de depoimento]", false)) +
          '</div><div class="dep-assina"><strong>' + marca(d.nome) + "</strong><span>" + marca(d.detalhe) + "</span></div></article>";
      }).join("");
    },
    "depoimentos.textos": function () {
      return (C.depoimentos.itens || []).filter(function (d) { return d.tipo === "texto"; }).map(function (d, i) {
        return '<article class="dep dep-texto revela" style="--d:' + i + '"><blockquote>' + marca(d.texto) + '</blockquote><div class="dep-assina"><strong>' + marca(d.nome) + "</strong><span>" + marca(d.detalhe) + "</span></div></article>";
      }).join("");
    },
    "experiencia.itens": function () {
      return (C.experiencia.itens || []).map(function (x, i) {
        var tem = x.tipo === "video" ? !!x.video : !!x.arquivo;
        var dentro;
        if (x.tipo === "foto" && x.arquivo) {
          dentro = '<img src="' + esc(x.arquivo) + '" alt="' + esc(semTags(x.legenda)) + '" loading="lazy">';
        } else if (x.tipo === "video" && x.video) {
          dentro = (x.capa ? '<img src="' + esc(x.capa) + '" alt="" loading="lazy">' : placeholder("", false)) +
            '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>';
        } else {
          dentro = placeholder(x.legenda, false);
        }
        return '<button class="foto-btn" type="button" data-galeria="experiencia" data-indice="' + i + '" aria-label="Ampliar: ' + esc(semTags(x.legenda)) + '"' + (tem ? "" : ' data-vazio="1"') + '>' +
          '<div class="moldura">' + dentro + "</div></button>";
      }).join("");
    },
    "depoimentos.destaques": function () {
      return (C.depoimentos.destaques || []).map(function (t) { return "<p>“" + marca(t) + "”</p>"; }).join("");
    },
    "depoimentos.prints": function () {
      return (C.depoimentos.itens || []).filter(function (d) { return d.tipo === "print" && d.imagem; }).map(function (d, i) {
        return '<button class="dep-print" type="button" data-galeria="depoimentos" data-indice="' + i + '" aria-label="Ampliar: ' + esc(d.descricao) + '">' +
          '<img src="' + esc(d.imagem) + '" alt="' + esc(d.descricao) + '" decoding="async"></button>';
      }).join("");
    },
    "incluso.protocolos": function () {
      return (C.incluso.protocolos || []).map(function (t) { return "<li>" + marca(t) + "</li>"; }).join("");
    },
    "incluso.extras": function () {
      var ic = {
        apostila: '<path d="M4 5.5C6.5 4 9.5 4 12 5.5v14C9.5 18 6.5 18 4 19.5zM20 5.5C17.5 4 14.5 4 12 5.5v14c2.5-1.5 5.5-1.5 8 0z"/>',
        guia: '<rect x="4" y="5" width="16" height="15" rx="1"/><path d="M4 9.5h16M8.5 3v4M15.5 3v4M8 13.5h3M8 16.5h6"/>',
        certificado: '<circle cx="12" cy="9.5" r="5.5"/><path d="M9 14.5 7.5 21l4.5-2.2 4.5 2.2-1.5-6.5"/>',
        grupo: '<circle cx="9" cy="8.5" r="3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M3.5 19c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5M14.5 14.3c.6-.2 1.3-.3 2-.3 2.2 0 3.9 1.4 4.4 4.2"/>'
      };
      return (C.incluso.extras || []).map(function (x) {
        return '<li class="revela"><span class="inc-ic"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">' + (ic[x.icone] || ic.apostila) + "</svg></span><strong>" + marca(x.titulo || x.texto) + "</strong>" + (x.titulo ? "<span>" + marca(x.texto) + "</span>" : "") + "</li>";
      }).join("");
    },
    "turmas.lista": function () {
      var T = C.turmas || {};
      return (T.lista || []).map(function (t, i) {
        var mods = marca(t.formato || "Presencial");
        return '<li class="turma revela" style="--d:' + i + '"><p class="turma-mes">' + marca(t.mes) + " " + marca(t.ano) + '</p>' +
          '<p class="turma-dias">' + marca(t.dias) + '</p>' +
          '<span class="fio" aria-hidden="true"></span><p class="turma-formato">' + mods + (t.horario ? " · " + marca(t.horario) : "") + '</p>' +
          '<button class="btn btn-ouro js-abre-form" type="button" data-turma="' + esc(semTags(t.dataCompleta)) + '">' + marca(T.botaoTurma || "Quero esta turma") + "</button></li>";
      }).join("");
    },
    "formulario.profissoes": function () {
      return '<option value="">Selecione</option>' + (C.formulario.profissoes || []).filter(function (p) { return MOSTRA || !vazio(p); }).map(function (p) {
        return '<option value="' + esc(p) + '">' + esc(p) + "</option>";
      }).join("");
    },
    "formulario.turmas": function () {
      return '<option value="">Selecione</option>' + (C.turmas.lista || []).map(function (t) {
        var nome = semTags(t.dataCompleta || t.data || t.nome);
        return '<option value="' + esc(nome) + '">' + esc(nome) + "</option>";
      }).join("") + '<option value="ainda nao sei">Ainda não sei</option>';
    },
    "faq.itens": function () {
      return (C.faq.itens || []).map(function (f, i) {
        return '<details><summary><span class="faq-num">' + dois(i + 1) + '</span><span class="faq-q">' + marca(f.pergunta) + '</span><span class="faq-ic" aria-hidden="true"></span></summary><div class="faq-r"><p>' + marca(f.resposta) + "</p></div></details>";
      }).join("");
    }
  };
  document.querySelectorAll("[data-lista]").forEach(function (el) {
    var f = listas[el.getAttribute("data-lista")];
    if (f) { try { el.innerHTML = f(); } catch (e) { console.warn("Erro ao montar", el.getAttribute("data-lista"), e); } }
  });

  /* ---------- esconde o que ainda está pendente ([PREENCHER]/[CONFIRMAR]) ---------- */
  if (!MOSTRA) {
    document.querySelectorAll(".marcador-oculto").forEach(function (m) {
      if (!m.isConnected) return;
      var alvo = m.closest(".ph") ? m.closest(".protocolo-video, article.dep, .foto-btn, .hero-foto, .dra-foto") :
        m.closest("li, details, article.dep, .foto-btn, .conteudo-fato, option, .dep-assina, p, h2, h3");
      if (alvo) alvo.remove(); else m.remove();
    });
    // blocos que ficaram vazios
    document.querySelectorAll(".dep-videos, .dep-textos, .mosaico, .faq-lista, .conteudo-rodape").forEach(function (b) {
      if (!b.querySelector("article, button, details, .conteudo-fato, a")) b.classList.add("vazio");
    });
    var mos = document.querySelector(".mosaico");
    if (mos && !mos.children.length) { var sec = mos.closest("section"); if (sec) sec.hidden = true; }
    var pv2 = document.querySelector(".protocolo-video");
    if (!pv2) document.querySelector(".protocolo-topo") && document.querySelector(".protocolo-topo").classList.add("sem-video");
    // profissões: sem lista definida, vira campo de texto
    var sp = document.getElementById("f-prof");
    if (sp && sp.options.length <= 2) {
      var inp = document.createElement("input");
      inp.type = "text"; inp.id = "f-prof"; inp.name = "profissao"; inp.required = true; inp.placeholder = "Ex.: biomédica, esteticista";
      sp.replaceWith(inp);
    }
  }

  /* ---------- menu do celular ---------- */
  var topo = document.querySelector(".topo");
  var botaoMenu = document.querySelector(".topo-menu");
  if (botaoMenu) {
    botaoMenu.addEventListener("click", function () {
      var aberto = topo.classList.toggle("aberto");
      document.body.classList.toggle("menu-aberto", aberto);
      botaoMenu.setAttribute("aria-expanded", aberto);
      botaoMenu.textContent = aberto ? "Fechar" : "Menu";
    });
    document.querySelectorAll(".topo-nav a").forEach(function (a) {
      a.addEventListener("click", function () { topo.classList.remove("aberto"); document.body.classList.remove("menu-aberto"); botaoMenu.setAttribute("aria-expanded", "false"); botaoMenu.textContent = "Menu"; });
    });
  }

  /* ---------- topo: some ao rolar para baixo, volta ao rolar para cima ---------- */
  (function () {
    var ultimo = window.scrollY, pendente = false;
    function atualiza() {
      pendente = false;
      var y = window.scrollY, dy = y - ultimo;
      if (y < 80 || topo.classList.contains("aberto")) { topo.classList.remove("escondido"); ultimo = y; return; }
      if (dy > 6) { topo.classList.add("escondido"); ultimo = y; }
      else if (dy < -10) { topo.classList.remove("escondido"); ultimo = y; }
    }
    window.addEventListener("scroll", function () { if (!pendente) { pendente = true; requestAnimationFrame(atualiza); } }, { passive: true });
    topo.addEventListener("focusin", function () { topo.classList.remove("escondido"); });
  })();

  /* ---------- menu: destaca a seção visível (scrollspy) ---------- */
  (function () {
    var links = Array.prototype.slice.call(document.querySelectorAll(".topo-nav a[href^='#']"));
    var nav = document.querySelector(".topo-nav ul");
    if (!links.length || !nav || !("IntersectionObserver" in window)) return;
    var barra = document.createElement("span"); barra.className = "nav-barra"; barra.setAttribute("aria-hidden", "true");
    nav.style.position = "relative"; nav.appendChild(barra);
    var mapa = {};
    links.forEach(function (a) { var sec = document.querySelector(a.getAttribute("href")); if (sec) mapa[sec.id] = a; });
    // "Turmas e condições" cobre também a faixa de condições logo abaixo
    var cond = document.querySelector(".condicoes"); if (cond && mapa.investimento) { cond.id = cond.id || "condicoes"; mapa[cond.id] = mapa.investimento; }
    function marca(a) {
      links.forEach(function (l) { l.classList.toggle("ativo", l === a); if (l === a) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
      if (a && a.offsetParent && window.innerWidth > 1100) {
        var r = a.getBoundingClientRect(), base = nav.getBoundingClientRect();
        barra.style.width = r.width + "px"; barra.style.transform = "translateX(" + (r.left - base.left) + "px)"; barra.style.opacity = "1";
      } else barra.style.opacity = "0";
    }
    var visiveis = {};
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { visiveis[e.target.id] = e.isIntersecting; });
      var ativo = null;
      Object.keys(mapa).forEach(function (id) { if (visiveis[id]) ativo = mapa[id]; });
      marca(ativo);
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(mapa).forEach(function (id) { io.observe(document.getElementById(id)); });
    links.forEach(function (a) { a.addEventListener("click", function () { marca(a); }); });
    window.addEventListener("resize", function () { var a = document.querySelector(".topo-nav a.ativo"); if (a) marca(a); });
  })();

  /* ---------- botão flutuante do WhatsApp some enquanto o banner (com o botão de WhatsApp) está na tela ---------- */
  (function () {
    var wa = document.querySelector(".wa-flutuante"), hero = document.querySelector(".hero-acoes");
    if (!wa || !hero || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (ents) { wa.classList.toggle("oculto", ents[0].isIntersecting); }).observe(hero);
  })();

  /* ---------- abas das etapas ---------- */
  var abas = Array.prototype.slice.call(document.querySelectorAll(".aba"));
  function ativa(i, foco) {
    abas.forEach(function (a, j) {
      var sel = i === j;
      a.setAttribute("aria-selected", sel); a.tabIndex = sel ? 0 : -1;
      var p = document.getElementById("painel-" + j);
      if (p) { p.hidden = !sel; p.classList.toggle("entra", sel); }
    });
    if (foco) abas[i].focus();
    abas[i].scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  abas.forEach(function (a, i) {
    a.addEventListener("click", function () { ativa(i); });
    a.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); ativa((i + 1) % abas.length, true); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); ativa((i - 1 + abas.length) % abas.length, true); }
    });
  });

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var midia = lb.querySelector(".lb-midia"), legenda = lb.querySelector(".lb-legenda");
  var grupo = [], atual = 0, origem = null;
  function itensDe(nome) {
    if (nome === "depoimentos") return (C.depoimentos.itens || []).filter(function (d) { return d.tipo === "print" && d.imagem; }).map(function (d) { return { tipo: "foto", src: d.imagem, alt: d.descricao, leg: "" }; });
    if (nome === "resultados") return (C.resultados.casos || []).map(function (f) { return { tipo: "foto", src: f.original || f.card, alt: f.descricao || f.legenda, leg: f.legenda }; });
    return (C.experiencia.itens || []).map(function (x) {
      return { tipo: x.tipo, src: x.tipo === "video" ? x.video : x.arquivo, alt: semTags(x.legenda), leg: x.legenda };
    });
  }
  function mostra() {
    var it = grupo[atual];
    if (!it.src) midia.innerHTML = '<div class="lb-vazio">' + marca(it.leg) + "</div>";
    else if (it.tipo === "video") midia.innerHTML = '<div class="lb-video">' + iframe(it.src, semTags(it.leg)) + "</div>";
    else midia.innerHTML = '<img src="' + esc(it.src) + '" alt="' + esc(semTags(it.alt)) + '">';
    legenda.innerHTML = it.src && it.leg ? marca(it.leg) : "";
    midia.classList.toggle("protegida", grupo === grupoRes);
    var multi = grupo.length > 1;
    lb.querySelector(".lb-ant").hidden = !multi; lb.querySelector(".lb-prox").hidden = !multi;
  }
  var grupoRes = null;
  function abre(nome, i, el) {
    grupo = itensDe(nome); atual = i; origem = el;
    grupoRes = nome === "resultados" ? grupo : null;
    mostra(); lb.hidden = false; document.body.classList.add("travado");
    lb.querySelector(".lb-fechar").focus();
  }
  function fecha() {
    lb.hidden = true; midia.innerHTML = ""; document.body.classList.remove("travado");
    if (origem) origem.focus();
  }
  function passo(d) { atual = (atual + d + grupo.length) % grupo.length; mostra(); }
  document.addEventListener("click", function (e) {
    var bt = e.target.closest("[data-galeria]");
    if (bt && !arrastou) abre(bt.getAttribute("data-galeria"), +bt.getAttribute("data-indice"), bt);
  });
  lb.querySelector(".lb-fechar").addEventListener("click", fecha);
  lb.querySelector(".lb-ant").addEventListener("click", function () { passo(-1); });
  lb.querySelector(".lb-prox").addEventListener("click", function () { passo(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-palco") || e.target.classList.contains("lb-midia")) fecha(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") fecha();
    if (e.key === "ArrowRight") passo(1);
    if (e.key === "ArrowLeft") passo(-1);
    if (e.key === "Tab") { // mantém o foco dentro do lightbox
      var f = Array.prototype.filter.call(lb.querySelectorAll("button, iframe"), function (x) { return !x.hidden; });
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  var tx = null, ty = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx == null) return; var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = ty = null;
    if (dy > 90 && Math.abs(dy) > Math.abs(dx)) { fecha(); return; }   // arrastar para baixo fecha
    if (Math.abs(dx) > 50 && grupo.length > 1) passo(dx < 0 ? 1 : -1);
  });

  /* ---------- faixas contínuas (casos e depoimentos): andam sozinhas e aceitam arrastar ---------- */
  var arrastou = false;
  var celular = window.matchMedia("(max-width: 768px)").matches;
  document.querySelectorAll("[data-marquee]").forEach(function (mq) {
    var faixa = mq.querySelector(".marquee-faixa");
    if (!faixa || !faixa.children.length) return;
    if (celular && mq.closest("#resultados")) { umPorVez(mq, faixa); return; }
    // duplica a lista para o loop não ter emenda; as cópias ficam fora do teclado/leitor de tela
    Array.prototype.slice.call(faixa.children).forEach(function (el) {
      var c = el.cloneNode(true); c.setAttribute("aria-hidden", "true");
      c.querySelectorAll("button").forEach(function (b) { b.tabIndex = -1; });
      faixa.appendChild(c);
    });
    mq.classList.add("js-rolagem");
    var vel = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 30; // px por segundo
    var parado = false, toque = null, ultimo = null, pos = 0;
    function metade() { return faixa.scrollWidth / 2; }
    function passo(t) {
      if (ultimo != null && !parado && !document.hidden) {
        pos += vel * Math.min(0.05, (t - ultimo) / 1000);
        if (pos >= metade()) pos -= metade();
        mq.scrollLeft = pos;
      } else { pos = mq.scrollLeft; }
      ultimo = t;
      requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
    function para() { parado = true; clearTimeout(toque); }
    function volta(ms) { clearTimeout(toque); toque = setTimeout(function () { pos = mq.scrollLeft; if (pos >= metade()) { pos -= metade(); mq.scrollLeft = pos; } parado = false; }, ms || 0); }
    mq.addEventListener("mouseenter", para);
    mq.addEventListener("mouseleave", function () { volta(0); });
    mq.addEventListener("touchstart", para, { passive: true });
    mq.addEventListener("touchend", function () { volta(2500); }, { passive: true });
    mq.addEventListener("focusin", para);
    mq.addEventListener("focusout", function () { volta(0); });
    // arrastar com o mouse no computador
    var x0 = 0, s0 = 0, segurando = false;
    mq.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; segurando = true; arrastou = false; x0 = e.clientX; s0 = mq.scrollLeft; });
    window.addEventListener("pointermove", function (e) { if (!segurando) return; var dx = e.clientX - x0; if (Math.abs(dx) > 6) arrastou = true; if (arrastou) { mq.scrollLeft = s0 - dx; pos = mq.scrollLeft; } });
    window.addEventListener("pointerup", function () { if (!segurando) return; segurando = false; setTimeout(function () { arrastou = false; }, 0); });
    mq.addEventListener("dragstart", function (e) { e.preventDefault(); });
  });

  /* ---------- celular: casos de antes e depois um por vez, com bolinhas ---------- */
  function umPorVez(mq, faixa) {
    mq.classList.add("um-por-vez");
    var itens = Array.prototype.slice.call(faixa.children), n = itens.length, atual = 0, timer = null, pausa = false;
    var pontos = document.createElement("div"); pontos.className = "carrossel-pontos um-pontos"; pontos.setAttribute("role", "group"); pontos.setAttribute("aria-label", "Escolher caso");
    pontos.innerHTML = itens.map(function (_, i) { return '<button type="button" class="ponto" aria-label="Caso ' + (i + 1) + '"' + (i ? "" : ' aria-current="true"') + "></button>"; }).join("");
    mq.parentNode.insertBefore(pontos, mq.nextSibling);
    function vai(i) { atual = (i + n) % n; mq.scrollTo({ left: itens[atual].offsetLeft - faixa.offsetLeft, behavior: "smooth" }); marcaPonto(); }
    function marcaPonto() { Array.prototype.forEach.call(pontos.children, function (b, j) { b.toggleAttribute("aria-current", j === atual); }); }
    Array.prototype.forEach.call(pontos.children, function (b, i) { b.addEventListener("click", function () { vai(i); reinicia(); }); });
    var fim = null;
    mq.addEventListener("scroll", function () { clearTimeout(fim); fim = setTimeout(function () {
      var w = itens[0].getBoundingClientRect().width; atual = Math.round(mq.scrollLeft / (w + 12)); marcaPonto(); }, 120); }, { passive: true });
    function reinicia() { clearInterval(timer); timer = setInterval(function () { if (!pausa && !document.hidden) vai(atual + 1); }, 4000); }
    mq.addEventListener("touchstart", function () { pausa = true; }, { passive: true });
    mq.addEventListener("touchend", function () { setTimeout(function () { pausa = false; }, 3000); }, { passive: true });
    reinicia();
  }

  /* ---------- celular: "ler mais" nos textos longos ---------- */
  document.querySelectorAll(".ler-mais").forEach(function (b) {
    var alvo = b.closest(b.getAttribute("data-alvo")) || b.parentNode;
    b.addEventListener("click", function () {
      var aberto = alvo.classList.toggle("expandido");
      b.setAttribute("aria-expanded", aberto);
      b.textContent = aberto ? "Mostrar menos" : "Ler trajetória completa";
    });
  });

  /* ---------- proteção básica das fotos de antes e depois ---------- */
  document.addEventListener("contextmenu", function (e) { if (e.target.closest(".protegida")) e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { if (e.target.closest(".protegida")) e.preventDefault(); });

  /* ---------- janela (modal) do formulário ---------- */
  var modal = document.getElementById("modal-inscricao");
  var modalOrigem = null;
  function focaveis() { return Array.prototype.filter.call(modal.querySelectorAll("button, input, select, a[href]"), function (el) { return !el.hidden && el.offsetParent !== null; }); }
  function abreForm(turma, origemEl) {
    modalOrigem = origemEl || document.activeElement;
    limpaForm();
    if (turma) { var sel = document.getElementById("f-turma"); if (sel) sel.value = turma; }
    modal.hidden = false;
    document.body.classList.add("travado");
    requestAnimationFrame(function () { modal.classList.add("aberto"); });
    setTimeout(function () { var f = document.getElementById("f-nome"); if (f) f.focus({ preventScroll: true }); }, 60);
  }
  function fechaForm() {
    modal.classList.remove("aberto");
    document.body.classList.remove("travado");
    setTimeout(function () { modal.hidden = true; }, 320);
    if (modalOrigem && modalOrigem.focus) modalOrigem.focus({ preventScroll: true });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href="#formulario"], .js-abre-form');
    if (a) { e.preventDefault(); abreForm(a.getAttribute("data-turma"), a); return; }
    if (e.target.closest("[data-fecha-modal]")) fechaForm();
  });
  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") { fechaForm(); return; }
    if (e.key === "Tab") {
      var f = focaveis(), i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- formulário (envio provisório pelo WhatsApp) ---------- */
  var form = document.getElementById("form-interesse");
  function limpaForm() {
    if (!form) return;
    form.reset();
    form.querySelectorAll(".invalido").forEach(function (c) { c.classList.remove("invalido"); });
    form.querySelector(".form-erro").hidden = true;
    form.querySelector(".form-ok").hidden = true;
    form.querySelector('button[type="submit"]').hidden = false;
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var erro = form.querySelector(".form-erro"), ok = form.querySelector(".form-ok"), primeiro = null;
      form.querySelectorAll("input, select").forEach(function (c) {
        if (c.name === "whatsapp") c.setCustomValidity(c.value.replace(/\D/g, "").length >= 10 ? "" : "Informe DDD e número.");
        var valido = c.checkValidity();
        if (c.type !== "radio" && c.type !== "checkbox") c.classList.toggle("invalido", !valido);
        if (!valido && !primeiro) primeiro = c;
      });
      if (primeiro) { erro.hidden = false; primeiro.focus(); return; }
      erro.hidden = true;
      if (!enviarFormulario(Object.fromEntries(new FormData(form)))) return;
      form.querySelector('button[type="submit"]').hidden = true;
      ok.hidden = false;
    });
    form.addEventListener("input", function (e) {
      if (e.target.name === "whatsapp") e.target.setCustomValidity("");
      if (e.target.checkValidity()) e.target.classList.remove("invalido"); });
  }
  // >>> PROVISÓRIO até o CRM: o lead vai para o WhatsApp comercial com os dados preenchidos <<<
  // (quando o CRM entrar, trocar por um fetch para a URL do CRM)
  var NUM_LEADS = "5562985150061";
  var EXPERIENCIA = { sim: "Sim", nao: "Não", comecando: "Estou começando" };
  function limpa(v, max) { return String(v == null ? "" : v).replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max); }
  function enviarFormulario(dados) {
    var linhas = [
      "Olá! Quero receber informações sobre a Formação Protocolo NatureFace.",
      "",
      "Nome: " + limpa(dados.nome, 80),
      "WhatsApp: " + limpa(dados.whatsapp, 20),
      "E-mail: " + limpa(dados.email, 100),
      "Cidade/Estado: " + limpa(dados.cidade, 60),
      "Profissão: " + (limpa(dados.profissao, 60) || "Não informada"),
      "Já atua com procedimentos faciais: " + (EXPERIENCIA[dados.experiencia] || "Não informado"),
      "Turma: " + (dados.turma === "ainda nao sei" ? "Ainda não sei" : (limpa(dados.turma, 60) || "Não informada"))
    ];
    var url = "https://wa.me/" + NUM_LEADS + "?text=" + encodeURIComponent(linhas.join("\n"));
    var janela = window.open(url, "_blank");
    if (janela) janela.opener = null;
    else location.href = url; // pop-up bloqueado: abre na mesma aba
    return true;
  }

  /* ---------- entradas ao rolar ---------- */
  if (/estatico/.test(location.search)) document.querySelectorAll('img[loading="lazy"]').forEach(function (i) { i.loading = "eager"; });
  var revela = document.querySelectorAll(".revela");
  if ("IntersectionObserver" in window && !/estatico/.test(location.search)) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visivel"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revela.forEach(function (el) { io.observe(el); });
  } else {
    revela.forEach(function (el) { el.classList.add("visivel"); });
  }
})();
