<template>
    <div class="index5">
        <div>
            姓名：<input type="text" v-model="name"/>
        </div>
        <div>
            电话：<input type="text" v-model="tel"/>
        </div>
        <div>
            <button @click="btnClick">跳转</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index5',
    data () {
        return {
            name: '',
            tel: ''
        }
    },
    methods: {
        btnClick () {
            this.$router.push({
                path: '/index6'
            });
        }
    }
}
</script>
