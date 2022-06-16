<template>
    <div class="index">
        <div>
            firstName：<input type="text" v-model="firstName"/>
        </div>
        <div>
            lastName：<input type="text" v-model="lastName"/>
        </div>
        <div>
            fullName：<input type="text" v-model="fullName"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            firstName: '',
            lastName: ''
        }
    },
    computed: {
        fullName: {
            get () {
                return this.firstName + this.lastName;
            },
            set (newVal) {
                console.log(newVal);
            }
        }
    },
    watch: {
        firstName: {
            deep: true,
            handler: function (newVal) {
                this.lastName = newVal;
            }
        }
    }
}
</script>
