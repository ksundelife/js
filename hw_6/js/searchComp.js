Vue.component('search', {
    props: ['search'],
    data() {
      return {
        userSearch: '',
      };
    },

    template: `
    <div class="search">
      <form class="header__form" action="#">
          <input type="text" id="search" placeholder="Search something..." v-model="userSearch">
          <button class="header__button fas fa-search" type="submit" @click="$root.$refs.products.goodsFilter(userSearch)"></button>
      </form>
    </div>
    `
  });