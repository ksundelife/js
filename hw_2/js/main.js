class ProductList {

  constructor(container = '#catalog') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this.#fetchProducts();
    this.render();
    this.calcSum();
  }

  #fetchProducts() {
    this.goods = [
      {id: 1, title: 'Ноутбук Apple MacBook Air 13.3" (MQD32RU/A)', price: 66990},
      {id: 2, title: 'Мышь HP Z3700 Black (V0L79AA)', price: 890},
      {id: 3, title: 'Клавиатура Apple Magic Keyboard (MLA22RU/A)', price: 8490},
      {id: 4, title: 'Геймпад Logitech Wireless Gamepad F710', price: 2990},
    ];
  }
  
  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  calcSum() {
    const price = this.goods.map(a => a.price);
    const sum = price.reduce((a, b) => (a + b));
    return document.querySelector('#sum').textContent = `TOTAL: ₽${sum}`;
  }

}

class ProductItem {
  constructor(product, img = 'https://raw.githubusercontent.com/ksundelife/js/master/img/product_') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = `${img}${this.id}.jpeg`;
  }

  render() {
    return `<div class="product-wrap">
              <a href="#"><img class="product__img" src="${this.img}" alt="product"></a>
              <div class="product__content">
                  <a href="#" class="product__name">${this.title}</a>
                  <div class="product__price">₽${this.price}</div>
              </div>
              <button class="product__add fas fa-shopping-cart"></button>
          </div>`
  }
}

const list = new ProductList();

