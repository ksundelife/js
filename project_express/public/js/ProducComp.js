Vue.component('products', {
    data(){
        return {
            catalogUrl: '',
            products: [],
            filtered: [],
            imgCatalog: 'img.jpg',
        }
    },
    methods: {
        goodsFilter(){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.$nextTick(() => {
                        this.filtered.push(el);
                    });
                }
            });
    },
    template: `
        <div class="products-wrap products" id="catalog">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          /**
           * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
           * то мы легко можем получить доступ к ним используя свойство $root.
           * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
           */
        cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
      };
    },

    template: `
            <div class="product-wrap product">
                <a href="#"><img class="product__img" :src="img" alt="Some img"></a>
                <div class="product__content">
                    <a href="#" class="product__name">{{product.product_name}}</a>
                    <div class="product__price">₽{{product.price}}</div>
                </div>
                <button class="product__add fas fa-shopping-cart" @click="cartAPI.addProduct(product)"></button>
            </div>
    `
});
