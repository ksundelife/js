const API = 'https://raw.githubusercontent.com/ksundelife/static/master/JSON2/catalog.json';

//Promise
function getRequest(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (this.status == !200) {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      } else {
        resolve(this.response);
      }
    };
    
    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}
getRequest(API)
  .then(
    response => console.log(`Fulfilled: ${response}`),
    error => console.log(`Rejected: ${error}`)
  );






class ProductList {
  #goods;
  
  constructor(container = '#catalog', basketContainer = '#basket-items') {
    this.container = container;
    this.basketContainer = basketContainer;
    this.#goods = [];
    this.allProducts = [];
    this.basket = [];
    this.#getProducts()
        .then(data => {this.#goods = [...data];})
        .finally(() => {
          this.#render();
          this.#handleActions();
          this.#basketRender();
          this.#basketHandleActions();
          this.getTotalSum();
          this.getCountsItemsFromBasket();
          this.getTotalClear();
          this.calcSum();
        });
  }

  #getProducts() {
    return fetch(API)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        });
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  #handleActions() {
   
    document.querySelector(this.container).addEventListener('click', evt => {
      console.log(evt.target)
      console.log(evt.target.name)
      if (evt.target.name == 'add') {
        let datas = evt.target.dataset;

        let newProd = {
          id: datas.id,
          price: +datas.price,
          title: datas.name,
          img: datas.image
        }
        this.add(newProd);
      }
    })
  }
  #basketRender() {
    let str = '';
    this.basket.forEach(item => {
  
      str += `<div class="dropdown__product" data-id="${item.id}">
                <a href="single_page.html" class="dropdown__photo"><img src="${item.img}}" alt="" class="dropdown__basket_img"></a>
                <div class="dropdown__content">
                  <a href="single_page.html" class="dropdown__text">${item.title}</a>
                  <div class="dropdown__countprice">${item.amount}<span class="dropdown__x">&nbsp;&nbsp;x&nbsp;&nbsp;</span>₽${item.price * item.amount}</div>
                </div>
                <button class="dropdown__delete fas fa-times-circle" data-id="${item.id}" name="remove"><button>
              </div>`;
    });
    const block = document.querySelector(this.basketContainer);
    block.insertAdjacentHTML('beforeend', str);
  }

  #basketHandleActions() {
    document.querySelector('#basket').addEventListener('click', ev => {
      console.log(ev.target.name)
      if (ev.target.name == 'remove') {
          this.#remove(ev.target.dataset.id);
      }
  });
  }

  add(product) {
    const productObj = new ProductItem(product);
    let find = this.basket.find(el => {el.id === this.#goods.id});
    if (!find) {
      this.basket.push(Object.assign(productObj, { amount: 1 }));
    } else {
      find.amount++;
    }
    this.#basketRender();
  }

  #remove(id) {
    let find = this.basket.find(el => el.id === id);
    if (find.amount > 1) {
        find.amount--;
    } else {
        this.basket.splice(this.basket.indexOf(find), 1);
    }
  }
 
  getTotalSum() {
      let price = this.basket.find(a => a.price);
      console.log(price);
      let sum = 0;
      for (let key in price) {
          sum += +(`${price[key] * this.basket[key].amount}`);
      }
      return document.querySelector('#total-sum').textContent = `₽${sum}`;
  }

  getCountsItemsFromBasket() {
      let counter = this.basket.find(a => a.amount);
      console.log(counter);
      let sum = 0;
      for (let key in counter) {
          sum += +counter[key];
      }
      return document.querySelector('#basket-count').textContent = `${sum}`;
      
  }

  getTotalClear() {
      document.querySelector('#clear-add').addEventListener('click', () => {
          this.basket.splice(0, this.basket.length);
          localStorage.removeItem('#basket-items');
          document.querySelector('#basket-items').textContent = `empty =(`;
          document.querySelector('#basket-count').textContent = `0`;
          document.querySelector('#total-sum').textContent = `$0`;
          console.log('Корзина очищена.');
      }); 
  } 

  calcSum() {
    console.log(this.#goods.reduce((sumPrice, { price }) => sumPrice + price, 0))
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
              <button
                class="product__add fas fa-shopping-cart"
                name="add"
                data-id="${this.id}" 
                data-price="${this.price}" 
                data-name="${this.title}" 
                data-image="${this.img}"
              ></button>
          </div>`
  }
}

const list = new ProductList();
