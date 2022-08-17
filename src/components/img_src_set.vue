<script setup lang="ts">
import { ref } from "vue";

let count = ref(1);
setInterval(() => {
  count.value++;
}, 1000);
</script>

<template>
  <p>{{ count }}</p>
</template>
