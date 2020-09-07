Vue.component('cart', {
    data(){
      return {
          imgCart: 'img.jpg',
          cartUrl: '/getBasket.json',
          cartItems: [],
          countProducts: 4,
          totalPriceSum: 79360,
          showCart: false,
      }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id === product.id);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
        clearCartItems(){
            if(this.cartItems.length > 1){
                this.cartItems = [];
            }
        },

    },
    computed: {
        calcSumQuantityInCartItems(){
            let sum = 0;
            this.cartItems.forEach(({quantity}) => {
                sum += quantity;
            });
            return this.countProducts = sum;
        },
        calcTotalSumCartItems(){
            let sum = 0;
            this.cartItems.forEach(({price, quantity}) => {
                sum += (price * quantity);
            });
            return this.cotalPriceSum = sum;
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div class="header__right">
            <div class="dropdown">
                <div class="header__count" id="basket-count">{{calcSumQuantityInCartItems}}</div>
                <button id="basket-toggler" class="dropdown__cart"><img class="header__img" src="https://raw.githubusercontent.com/ksundelife/js/master/img/cart.png" alt="cart" data="1234" @click="showCart = !showCart""></button>
                <div class="dropdown__shopping" id="basket" v-show="showCart">
                    <p v-if="!cartItems.length">Корзина пуста</p>
                    <cart-item class="cart-item" 
                    v-for="item of cartItems" 
                    :key="item.id"
                    :cart-item="item" 
                    :img="imgCart"
                    @remove="remove">
                    </cart-item>

                    <div class="drop__flex">
                        <div class="dropdown__total">
                            <p class="dropdown__p">TOTAL</p>
                            <p class="dropdown__p" id="total-sum">{{calcTotalSumCartItems}}</p>
                        </div>
                        <div class="dropdown__buttons">
                            <button type="reset" class="dropdown__reset" id="clear-add" @click="clearCartItems">CLEAR SHOPPING CART</button>
                        </div>
                    </div>
                </div>         
            </div>
        </div>
    `

});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="drop__flex cart-item" id="basket-items">
                    <div class="dropdown__product">
                        <a href="single_page.html" class="dropdown__photo"><img :src="img" alt="Some image" class="dropdown__basket_img"></a>
                        <div class="dropdown__content">
                            <a href="single_page.html" class="dropdown__text">{{cartItem.title}}</a>
                            <div class="dropdown__countprice">{{cartItem.quantity}}<span class="dropdown__x">&nbsp;&nbsp;x&nbsp;&nbsp;₽{{cartItem.quantity*cartItem.price}}</span></div>
                        </div>
                        <button class="dropdown__delete fas fa-times-circle" @click="$emit('remove', cartItem)"></button>
                    </div>
                </div>
    `
});
