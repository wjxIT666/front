<template>
    <div class="index3">
        <List :listArr="listArr">
            <!-- 插槽 -->
            <slot>插槽</slot>
        </List>
    </div>
</template>

<script>
import List from '../components/List.vue';
export default {
    name: 'index3',
    data () {
        return {
            listArr: [
                {
                    idno: '0001',
                    name: '北大'
                }, 
                {
                    idno: '0002',
                    name: '清华'
                }
            ]
        }
    },
    components: { List }
}
</script>

<style lang="scss" scoped>

</style>
