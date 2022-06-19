<template>
    <div class="list">
        <div v-for="item in listArr" :key="item.idno">
            <h5>{{item.name}}</h5>
        </div>
        <!-- 插槽 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: {
        listArr: {
            type: Array
        }
    }
}
</script>


