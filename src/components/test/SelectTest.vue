<template>
    <div>
      <select class="mySelect" style="width: 100px;display: block">
        <option v-for="item in arr" :value="item.value">
          {{item.text}}
        </option>
      </select>
      <select style="width: 100px" disabled>
        <option v-for="item in arr" :value="item.value">
          {{item.text}}
        </option>
      </select>
    </div>
</template>

<script>
  export default {
    name: 'SelectTest',
    data() {
      return {
        arr: [
          {value: 1, text: '1'},
          {value: 2, text: '2'},
          {value: 3, text: '3'},
          {value: 4, text: '4'},
          {value: 5, text: '5'},
          {value: 6, text: '6'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
          {value: 7, text: '7'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
