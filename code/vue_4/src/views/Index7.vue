<template>
    <div class="index7">

    </div>
</template>

<script>
import { onMounted } from 'vue';
import axios from 'axios';
export default {
    name: 'index7',
    setup () {
        onMounted( () => {
            axios({
                method: 'GET',
                url: '/api/getRouter'
            }).then(res => {
                console.log(res.data);
            });
        });
    }
}
</script>
