<template>
    <div class="index8">
        <List2 v-model="form" @clickName="getName" @set-inp="getInp"></List2>
    </div>
</template>

<script>
import List2 from '../components/List2.vue';
export default {
    name: 'index8',
    data () {
        return {
            form: {
                name: '小明'
            }
        }
    },
    components: { List2 },
    methods: {
        getName (name) {
            console.log('父组件接收子组件的传值', name);
        },
        getInp (value) {
            console.log('父组件接收子组件的传值', value);
        }
    }
}
</script>