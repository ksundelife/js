const API = 'https://raw.githubusercontent.com/ksundelife/static/master/JSON2';

const app = new Vue({
    el: '#app',
    data: {
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    //$refs.foo.error.getRequest(error);
                
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

