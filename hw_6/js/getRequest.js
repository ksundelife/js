
Vue.component('error', {
    data(){
        return {
            shown: 'display: none;',
        }
    },
    methods: {
        getRequest: function (url) {
                return new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.onreadystatechange = () => {
                        if(xhr.readyState === 4){
                            if(xhr.status !== 200){
                                reject('Error');
                            } else {
                                resolve(xhr.responseText);
                            }
                        }
                    };
                    xhr.send();
                })
            }
    },
    template: `
        <div class="error" :style="shown">
            <p style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(204 136 174 / 50%);
            z-index: 4444;
            text-align: center;
            padding-top: 150px;">Error</p>
        </div>
    `
});

