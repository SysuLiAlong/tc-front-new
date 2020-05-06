<template>
    <div>
      <input type="text" :value="a + '|' +b">
    </div>
</template>

<script>
  export default {
    name: 'BindTest',
    data() {
      return {
        a: 'a',
        b: 'b'
      }
    }
  }
</script>

<style scoped>

</style>
