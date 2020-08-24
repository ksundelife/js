class BasketProductList {

    constructor(container = '#basket-items') {
      this.container = container;
      this.goods = [];
      this.items = [];
      this.#fetchProducts();
      this.render();
      this.add(); //при добавлении товара в корзину идет проверка наличия его в ней - если добавляемый товар уже есть в корзине, то меняется счетчик количества добавлений в корзину данного товара ("amount"). Если добавляемого товара в корзине еще нет - то в корзину генерируется новый товар
      this.remove(); // удаление товаров по одному. пересчет значения ("amount") количества оставшихся в корзине товаров.
      this.calcTotalSum(); // общая сумма стоимостей товаров в корзине 
      this.getCountsItemsFromBasket(); // общее количество товаров в корзине, которое выводится на кнопке самой корзины
      this.getTotalClear(); // удаление всех товаров с корзины
    }
  
  }
  
  class BasketProductItem {
    constructor(product, img = 'https://raw.githubusercontent.com/ksundelife/js/master/img/product_') {
      this.title = product.title;
      this.price = product.price;
      this.id = product.id;
      this.img = `${img}${this.id}.jpeg`;
      this.amount = ``;
    }
  
    render() {
      
      return `<div class="dropdown__product" data-id="${this.id}">
                <a href="single_page.html" class="dropdown__photo"><img src="${this.img}}" alt="" class="dropdown__basket_img"></a>
                <div class="dropdown__content">
                  <a href="single_page.html" class="dropdown__text">${this.title}</a>
                  <div class="dropdown__countprice">${this.amount}<span class="dropdown__x">&nbsp;&nbsp;x&nbsp;&nbsp;</span>₽${this.price * this.amount}</div>
                </div>
                <button class="dropdown__delete fas fa-times-circle" data-id="${item.productId}" name="remove"><button>
              </div>`;
    }
  }
  
  const list = new BasketProductList();
  