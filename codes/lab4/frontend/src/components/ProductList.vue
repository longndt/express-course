
<script>
export default {
    data() {
        return {
            data: null
        };
    },
    mounted() {
        axios.get('http://localhost:3000/api/product')
            .then(response => {
                this.data = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

<template>
    <div>
        <div v-if="data">{{ data }}</div>
        <div v-else>Loading...</div>
    </div>
</template>