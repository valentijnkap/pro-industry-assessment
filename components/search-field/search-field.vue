<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';

const emit = defineEmits(['update:search']);

const query = ref('');

const handleInput = useDebounceFn(() => {
  emit('update:search', query.value);
}, 300);

</script>

<template>
  <div class="grid grid-cols-[1fr] gap-5">
    <label for="search">Zoeken</label>
    <input 
      id="search" 
      type="text" 
      placeholder="Waar ben je naar op zoek?"
      class="p-3 border border-border-gray" 
      v-model="query" 
      @input="handleInput"
    >
  </div>
</template>