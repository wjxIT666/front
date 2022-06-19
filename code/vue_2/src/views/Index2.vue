<template>
    <div class="index2">
        <!-- 事件修饰符 -->
        <!-- .self 只在当前元素触发 -->
        <div class="box" @click.self="boxClick">
            <!-- .once 只执行一次 -->
            <button @click.once="btnClickA">按钮A</button>
            <button @click="btnClickB">按钮B</button>
            <!-- .prevent 阻止默认事件 -->
            <a href="https://www.baidu.com" @click.prevent="aClick">链接</a>
        </div>

        <!-- 按键修饰符 -->
        <div>
            <div>
                <input type="text" v-model="name" @keyup.enter="keyupEnter">
            </div>
        </div>

        <!-- 表单修饰符 -->
        <div>
            <div>
                <input type="text" v-model.trim="tel" />
            </div>
            <div>
                <input type="text" v-model.lazy="age" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index2',
    data () {
        return {
            name: '',
            tel: '',
            age: ''
        }
    },
    methods: {
        boxClick () {
            alert('盒子')
        },
        btnClickA () {
            alert('按钮A');
        },
        btnClickB () {
            alert('按钮B');
        },
        aClick () {
            console.log('阻止默认事件');
        },
        keyupEnter (e) {
            console.log('按键修饰符', e);
        }
    },
    watch: {
        age: {
            deep: true,
            handler: function (newVal) {
                console.log(newVal);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100px;
    height: 100px;
    background-color: pink;
}
</style>
