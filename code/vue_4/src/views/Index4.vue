<template>
    <div class="index4">
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
import { ref, computed, watch } from 'vue';
export default {
    name: 'index4',
    setup () {
        //firstName
        let firstName = ref('');
        //lastName
        let lastName = ref('');
        //fullName
        let fullName = computed({
            get () {
                return firstName.value + lastName.value;
            },
            set (newVal) {
                console.log(newVal);
            }
        });

        //watch-firstName
        watch(firstName, (newVal) => {
            lastName.value = newVal;
        });

        return { firstName, lastName, fullName };
    }
}
</script>

