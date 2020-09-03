const API = 'https://raw.githubusercontent.com/ksundelife/static/master/JSON2';

Vue.component('search-form', {
  props: ['value'],
  template: `
      <input type="text" id="search" placeholder="Search something..." v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)">
  `
})

Vue.component('goods-list', {
  props: ['products'],
  template: `
      <div v-if="products.length !== 0" class="goods-list">
        <p class="product__content">Результаты поиска</p>
        <div class="product-wrap" v-for="product of products" :key="product.id">
          <a href="#"><img class="product__img" src="img.jpg" alt="Some img"></a>
          <div class="product__content">
            <a href="#" class="product__name">{{product.title}}</a>
            <div class="product__price">₽{{product.price}}</div>
          </div>
          <button class="product__add fas fa-shopping-cart" @click="addProduct(product)"></button>
        </div>
        <p class="product__content">Все товары</p>
      </div>
      <div v-else class="goods-list" data-id="">

      </div>

  `
})

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalog.json',
    products: [],
    filteredGoods: [],
    basket: [],
    searchLine: '',
    imgCatalog: 'img.jpg'
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      console.log(product.id);
    },
    isVisibleCart(){
      if (document.querySelector('#basket').style.display == "block") {
        document.querySelector('#basket').style.display = "none";
      } else {
        document.querySelector('#basket').style.display = "block";
      }
    },

    filterGoods() {
      let text = this.searchLine.toLowerCase().trim();
      if(text === '') {
        document.location.reload();
      } else {
        this.filteredGoods = this.products.filter((el) => {
          return el.title.toLowerCase().includes(text);
        });
      }
    }
  },
  created(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  },
});

