
Vue.component('error', {
    data(){
        return {
            text: ''
        }
    },
    methods: {
        setError(error){
            this.text = error
        }
      },
      computed: {
        isVisible(){
            return this.text !== ''
        }
      },
      template: `
        <div class="error" v-if="isVisible"
        style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(204 136 174 / 50%);
            z-index: 4444;">

            <p style="
            padding: 30px 20px;
            background-color: white;
            color: black;
            text-align: center;">
                <button class="dropdown__delete fas fa-times-circle" @click="setError('')"></button>
                {{ text }}
            </p>
        </div>
    `
});

