<template>
    <div class="index2">
        <div>
            姓名：{{name}}
        </div>
        <div>
            <button @click="changeName">改变名称</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'index2',
    setup () {
        //name
        let name = ref('小明');

        //changeName
        let changeName = () => {
            name.value = '小红';
        };

        return { name, changeName };
    }
}
</script>

