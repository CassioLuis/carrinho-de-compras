// import filmes from "./filmes.json" assert { type: "json" };

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const convertBrl = (val) => {
  return val.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

let carrinho = [];
let key = 0;
let resolKey = 0;
let quantidade = 1;
let preco = filmes_list[key].priceResol[0].price;
const filtroModal = select(".filtro-modal");

filmes_list.map((filme, index) => {
  let cardClone = select(".container-filmes .card-filme").cloneNode(true);
  cardClone.setAttribute("key", index);
  cardClone.querySelector(".img-filme").src = filme.img;
  cardClone.querySelector(".titulo-filme").innerHTML = filme.titulo;
  cardClone.querySelector(".subtitulo-filme").innerHTML = filme.subTitulo;
  select(".container-filmes").append(cardClone);

  cardClone.addEventListener("click", (e) => {
    key = e.target.closest(".card-filme").getAttribute("key");
    select(".modal-titulo").innerHTML = filmes_list[key].titulo;
    select(".modal-subtitulo").innerHTML = filmes_list[key].subTitulo;
    select(".modal-img").src = filmes_list[key].img;
    select(".modal").classList.remove("hidden");
    select(".modal").classList.add("flex");
    filtroModal.style.display = "block";
    setTimeout(() => {
      select(".modal").style.opacity = "1";
      filtroModal.style.opacity = "1";
    });

    filmes_list[key].priceResol.map((resol, indexResol) => {
      let resolucao = select(".resolucao").cloneNode(true);
      preco = filmes_list[key].priceResol[0].price;
      quantidade = 1;
      select(".modal-price").innerHTML = convertBrl(preco);
      resolucao.setAttribute("resol-key", indexResol);
      resolucao.setAttribute("value", resol.resolucao);
      resolucao.classList.add("remover");
      select(".select-resolucao").append(resolucao);
      selectResolucao();
    });
  });
});

const fechaModal = () => {
  select(".modal").style.opacity = 0;
  select(".modal").classList.remove("flex");
  select(".modal").classList.add("hidden");
  filtroModal.style.opacity = "0";
  setTimeout(() => {
    filtroModal.style.display = "none";
    selectAll(".remover").forEach((e) => e.remove());
    select(".content").value = 1;
  }, 100);
};

const selectResolucao = () => {
  const elementos = selectAll(".resolucao");

  for (let el of elementos) {
    el.addEventListener("click", () => {
      for (let remov of elementos) {
        remov.classList.remove("btn-focus");
      }
      el.classList.add("btn-focus");
      resolKey = el.getAttribute("resol-key");
      preco = filmes_list[key].priceResol[resolKey].price;
      quantidade = select(".content").value;
      attPreco(quantidade);
    });
  }
};

const attPreco = (qtd) => {
  preco = qtd * filmes_list[key].priceResol[resolKey].price;
  select(".modal-price").innerHTML = convertBrl(preco);
};

const decrement = () => {
  if (select(".content").value > 1) {
    select(".content").value--;
    quantidade = select(".content").value;
    attPreco(quantidade);
  }
};
// const decrement = () => {
//   let e = select(".decrement");
//   e.addEventListener("click", (el) => {
//     console.log(el.target.nextSibling);
//     // if (select(".content").value > 1) {
//     //   select(".content").value--;
//     //   quantidade = select(".content").value;
//     //   attPreco(quantidade);
//     // }
//   });
// };
const increment = () => {
  if (select(".content").value < 5) {
    select(".content").value++;
    quantidade = select(".content").value;
    attPreco(quantidade);
  }
};

const addCarrinho = () => {
  carrinho.push({
    id: parseInt(key),
    resolucao: parseInt(resolKey),
    quantidade: parseInt(quantidade),
  });
  let notific = carrinho.length;
  select(".notificacao").classList.remove("hidden");
  select(".notificacao").innerHTML = notific;
  fechaModal();
  mapeiaCarrinho();
};

const mapeiaCarrinho = () => {
  carrinho.map((item, index) => {
    let cardCart = select(".card-cart").cloneNode(true);
    cardCart.setAttribute("key", index);
    cardCart.querySelector(".img-card-cart").src = filmes_list[item.id].img;
    select(".carrinho-items").append(cardCart);

    console.log(carrinho);
    console.log(cardCart.querySelector(".img-card-cart"));
  }, carrinho.length);
};

const removeItem = () => {
  select(".remove-btn").addEventListener("click", (e) => {});
};

const abreCarrinho = () => {
  const element = select(".carrinho");
  const margin = select(".carrinho").style.marginRight;
  const filtroCarrinho = select(".filtro-carrinho");

  if (!margin) {
    element.style.marginRight = "0px";
    filtroCarrinho.style.display = "block";
    setTimeout(() => {
      filtroCarrinho.style.opacity = "1";
    });
  }
  if (margin === "-600px") {
    element.style.marginRight = "0px";
    filtroCarrinho.style.display = "block";
    setTimeout(() => {
      filtroCarrinho.style.opacity = "1";
    });
  }
  if (margin === "0px") {
    element.style.marginRight = "-600px";
    setTimeout(() => {
      filtroCarrinho.style.display = "none";
    }, 200);
    filtroCarrinho.style.opacity = "0";
  }
};
