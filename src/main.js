// import filmes from "./filmes.json" assert { type: "json" };

const convertBrl = (val) => {
  return val.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

let carrinho = [];
let key = 0;
let resolKey = 0;
let quantidade = 1;
let preco = filmes_list[key].priceResol[0].price;

const criaCardsFilmes = filmes_list.map((filme, index) => {
  let cardClone = select(".container-filmes .card-filme").cloneNode(true);
  cardClone.setAttribute("key", index);
  cardClone.querySelector(".img-filme").src = filme.img;
  cardClone.querySelector(".titulo-filme").innerHTML = filme.titulo;
  cardClone.querySelector(".subtitulo-filme").innerHTML = filme.subTitulo;
  select(".container-filmes").append(cardClone);
  return cardClone;
});

const criaOpcoesDeResolucao = () => {
  filmes_list[key].priceResol.map((resol, indexResol) => {
    let resolucao = select(".resolucao").cloneNode(true);
    preco = filmes_list[key].priceResol[0].price;
    quantidade = 1;
    select(".modal-price").innerHTML = convertBrl(preco);
    resolucao.setAttribute("resol-key", indexResol);
    resolucao.setAttribute("value", resol.resolucao);
    resolucao.classList.add("remover");
    select(".select-resolucao").append(resolucao);
    seletorDeResolucao();
  });
};

const criaModalComItem = (e) => {
  key = e.target.closest(".card-filme").getAttribute("key");
  select(".modal-titulo").innerHTML = filmes_list[key].titulo;
  select(".modal-subtitulo").innerHTML = filmes_list[key].subTitulo;
  select(".modal-img").src = filmes_list[key].img;
  select(".modal").classList.remove("hidden");
  select(".modal").classList.add("flex");
  setTimeout(() => {
    select(".fundo-escuro-modal").style.display = "block";
    select(".fundo-escuro-modal").style.opacity = "1";
    select(".modal").style.opacity = "1";
  });
  criaOpcoesDeResolucao();
};

for (let card of criaCardsFilmes) {
  card.addEventListener("click", criaModalComItem);
}

const fechaModal = () => {
  select(".modal").style.opacity = 0;
  select(".modal").classList.remove("flex");
  select(".modal").classList.add("hidden");
  select(".fundo-escuro-modal").style.opacity = "0";
  setTimeout(() => {
    select(".fundo-escuro-modal").style.display = "none";
    selectAll(".remover").forEach((e) => e.remove());
    select(".modal-qtd").value = 1;
  });
};

const seletorDeResolucao = () => {
  const resolucoes = selectAll(".resolucao");

  for (let resolucao of resolucoes) {
    resolucao.addEventListener("click", () => {
      for (let remov of resolucoes) {
        remov.classList.remove("btn-focus");
      }
      resolucao.classList.add("btn-focus");
      resolKey = resolucao.getAttribute("resol-key");
      preco = filmes_list[key].priceResol[resolKey].price;
      quantidade = parseInt(select(".modal-qtd").value);
      attPreco(quantidade);
    });
  }
};

const attPreco = (qtd) => {
  preco = qtd * filmes_list[key].priceResol[resolKey].price;
  select(".modal-price").innerHTML = convertBrl(preco);
};

const modalDecrement = () => {
  if (select(".modal-qtd").value > 1) {
    select(".modal-qtd").value--;
    quantidade = parseInt(select(".modal-qtd").value);
    attPreco(quantidade);
  }
};

const modalIncrement = () => {
  if (select(".modal-qtd").value < 5) {
    select(".modal-qtd").value++;
    quantidade = parseInt(select(".modal-qtd").value);
    attPreco(quantidade);
  }
};

select(".modal-decrement").addEventListener("click", modalDecrement);

select(".modal-increment").addEventListener("click", modalIncrement);

const addArrayCarrinho = () => {
  let idCarrinho = `${key}@${resolKey}`;
  let itemCarrinho = carrinho.findIndex(
    (item) => item.idCarrinho === idCarrinho
  );

  itemCarrinho > -1
    ? ((carrinho[itemCarrinho].quantidade += quantidade),
      (carrinho[itemCarrinho].preco =
        filmes_list[key].priceResol[resolKey].price *
        carrinho[itemCarrinho].quantidade))
    : carrinho.push({
        idCarrinho,
        filmeKey: parseInt(key),
        resolucao: parseInt(resolKey),
        quantidade: parseInt(quantidade),
        preco,
        titulo: filmes_list[key].titulo,
        subTitulo: filmes_list[key].subTitulo,
      });
  fechaModal();
  insereItensNaTelaCarrinho();
};

const insereItensNaTelaCarrinho = () => {
  select(".carrinho-items").innerHTML = "";

  carrinho.map((item, index) => {
    let cardCart = select(".card-cart").cloneNode(true);
    let valorUnitario = item.preco / item.quantidade;

    cardCart.classList.remove("hidden");
    cardCart.setAttribute("key", index);
    cardCart.querySelector(".img-card-cart").src =
      filmes_list[item.filmeKey].img;
    cardCart.querySelector(".valor-item").innerHTML = convertBrl(item.preco);
    cardCart.querySelector(".titulo-item").innerHTML = item.titulo;
    cardCart.querySelector(".sub-titulo").innerHTML = item.subTitulo;
    cardCart.querySelector(".carrinho-qtd").value = item.quantidade;
    select(".carrinho-items").append(cardCart);
    cardCart
      .querySelector(".carrinho-decrement")
      .addEventListener("click", () => {
        item.quantidade > 1 ? item.quantidade-- : item.quantidade;
        item.preco = item.quantidade * valorUnitario;
        insereItensNaTelaCarrinho();
      });
    cardCart
      .querySelector(".carrinho-increment")
      .addEventListener("click", () => {
        item.quantidade < 5 ? item.quantidade++ : item.quantidade;
        item.preco = item.quantidade * valorUnitario;
        insereItensNaTelaCarrinho();
      });
    cardCart.querySelector(".remove-btn").addEventListener("click", (e) => {
      e.target.closest(".card-cart").style.marginRight = "-100px";
      const atrib = e.target.closest(".card-cart").getAttribute("key");
      carrinho.splice(atrib, 1);
      e.target.closest(".card-cart").remove();
      insereItensNaTelaCarrinho();
    });
  });
  select(".notificacao").classList.remove("hidden");
  select(".notificacao").innerHTML =
    carrinho.length || select(".notificacao").classList.add("hidden");
  atualizaTotaisCarrinho();
};

const atualizaTotaisCarrinho = () => {
  const totalizador = carrinho.reduce((acc, curr) => {
    return acc + curr.preco;
  }, 0);
  select(".total-compra").innerHTML = convertBrl(totalizador);
};

const abreCarrinho = () => {
  const carrinho = select(".carrinho");
  const marginCarrinho = select(".carrinho").style.marginRight;
  const fundoEscuroCarrinho = select(".fundo-escuro-carrinho");
  const larguraCarrinho = select(".carrinho");

  console.dir(larguraCarrinho);
  if (!marginCarrinho) {
    carrinho.style.marginRight = "0px";
    fundoEscuroCarrinho.style.display = "block";
    setTimeout(() => {
      fundoEscuroCarrinho.style.opacity = "1";
    });
  }
  if (marginCarrinho === "-600px") {
    carrinho.style.marginRight = "0px";
    fundoEscuroCarrinho.style.display = "block";
    setTimeout(() => {
      fundoEscuroCarrinho.style.opacity = "1";
    });
  }
  if (marginCarrinho === "0px") {
    carrinho.style.marginRight = "-600px";
    setTimeout(() => {
      fundoEscuroCarrinho.style.display = "none";
    }, 200);
    fundoEscuroCarrinho.style.opacity = "0";
  }
};

const alternaTema = () => {
  const toggle = select(".toggle");
  toggle.onclick = () => {
    select(".toggle-indicator").classList.toggle("active");
    select("body").classList.toggle("dark");
  };
};

alternaTema();

const pirataria = () => {
  alert("DIGA NÃO A PIRATARIA");
};
