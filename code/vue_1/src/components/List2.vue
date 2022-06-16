<template>
    <div class="list">
        <div>
            <input type="text" v-model="value.name" @input="handlerInput"/>
        </div>
        <div>
            <button @click="btnClick(value.name)">按钮</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: ['value'],
    methods: {
        btnClick (name) {
            //子组件向父组件传值
            this.$emit('clickName', name);
        },
        handlerInput (e) {
            //子组件向父组件传值
            this.$emit('set-inp', e.target.value);
        }
    }
}
</script>
