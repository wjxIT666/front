<template>
    <div class="index3">
        <div>
            姓名：{{user.name}}
        </div>
        <div>
            年龄：{{user.age}}
        </div>
        <div>
            <button @click="changeName">改变姓名</button>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    name: 'index3',
    setup () {
        //user
        let user = reactive({
            name: '小明',
            age: 18
        });

        //changeName
        let changeName = () => {
            user.name = '小红';
        };

        return { user, changeName };
    }
}
</script>

<style lang="scss" scoped>

</style>
