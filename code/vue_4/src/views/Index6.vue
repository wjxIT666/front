<template>
    <div class="index6">
        <div>
            姓名：{{name}}
        </div>
        <div>
            <button @click="cnageName">改变姓名</button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    name: 'index6',
    setup () {
        //name
        let state = useStore().state;
        let { name } = state;
        
        return { name };
    }
}
</script>
