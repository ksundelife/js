const imgURL = 'https://raw.githubusercontent.com/ksundelife/js/master/img/product_';
let products = [
  {id: 1, title: 'Ноутбук Apple MacBook Air 13.3" (MQD32RU/A)', price: 66990},
  {id: 2, title: 'Мышь HP Z3700 Black (V0L79AA)', price: 890},
  {id: 3, title: 'Клавиатура Apple Magic Keyboard (MLA22RU/A)', price: 8490},
  {id: 4, title: 'Геймпад Logitech Wireless Gamepad F710', price: 2990},
];


const renderProduct = (title, price, img = getArrayOfObjectsImg()) => {
  return `<div class="product-wrap">
            <a href="#"><img class="product__img" src="${img}" alt="product"></a>
            <div class="product__content">
              <a href="#" class="product__name">${title}</a>
              <div class="product__price">₽${price}</div>
            </div>
            <button class="product__add fas fa-shopping-cart"></button>
          </div>`
};
const renderProducts = () => {
  products.map(item => {
      document.querySelector('#catalog').innerHTML += renderProduct(item.title, item.price, item.img)
});
}
function getArrayOfObjectsImg() {
  for (let i = 0; i < products.length; i++) {
    products[i].img = `${imgURL}${i + 1}.jpeg`;
  } return products.img;
}
renderProducts(products);




/*****ВТОРОЙ ВАРИАНТ РЕШЕНИЯ


function getArrayOfObjects() {
  for (let i = 0; i < 4; i++) {
    products[i].img = `${imgURL}${i + 1}.jpeg`;
  } return products;
}

let catalog = {
  container: null,
  items: [],
  shown: false,
  init() {
      this.container = document.querySelector('#catalog');
      this._fillCatalog();
      this._render();
      this._handleActions();
  },
  _fillCatalog() {
      this.items = getArrayOfObjects();
  },
  _render() {
      let htmlStr = '';
      this.items.forEach(item => {
          htmlStr += createItemTemplate(item);
      });
      this.container.innerHTML = htmlStr;
  },
  _handleActions() {
    document.querySelector('#basket-toggler').addEventListener('click', () => {
        this.shown = !this.shown;
        this.container.classList.toggle('invisible');
    });
  }
}

function createItemTemplate(item) {
   
  return `<div class="product-wrap">
              <a href="#"><img class="product__img" src="${item.img}" alt="product"></a>
              <div class="product__content">
                  <a href="#" class="product__name">${item.title}</a>
                  <div class="product__price">₽${item.price}</div>
              </div>
              <button class="product__add fas fa-shopping-cart"></button>
          </div>`
}
catalog.init();*/





/*
 *code from the lesson*

const renderProduct = (title, price, img = '') => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
};

const renderProducts = (list) => {
  const productList = list.map((product) => {
      return renderProduct(product.title, product.price);
  });
  // console.log(productList);
  document.querySelector('.products').innerHTML = productList;
}

renderProducts(products);*/
