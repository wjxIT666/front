<template>
    <div class="index2">
        Token：{{token}}
        <div>
            <button @click="changeToken(111111)">改变Token</button>
        </div>
    </div>
</template>

<script>
import { state, mutations } from '../js/observable.js';
export default {
    name: 'index2',
    computed: {
        token: {
            get () {
                return state.token;
            },
            set (newVal) {
                console.log(newVal);
            }
        }
    },
    methods: {
        changeToken (val) {
            mutations(val);
        }
    }
}
</script>
