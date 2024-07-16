<script setup lang="ts">
import { defineProps, defineEmits, computed, onMounted, ref } from 'vue';

export interface Page {
  number: number;
  current: boolean;
}

interface PaginationProps {
  pages: Page[];
}

const props = defineProps<PaginationProps>();
const emit = defineEmits(['update:next', 'update:prev', 'update:page']);

const indexOfCurrent = () => {
  const current = props.pages.find((page) => page.current);

  if (current) {
    return props.pages.findIndex((page) => page === current);
  }
};

const displayedPages = () => {
  const current = indexOfCurrent() as number

  return props.pages.filter((_, i) => {
    if(i === 0) {
      return (
        current === i || current + 1 === i || current + 2 === i
      )
    } else if (i > 0) {
      return (current === i || current - 1 === i || current + 1 === i)
    } else if (i === props.pages.length - 1) {
      return  current === i || current - 1 === i || current - 2 === i
    }
  })
}

const handleNext = () => {
  emit('update:next');
}

const handlePrev = () => {
  emit('update:prev');
}

const handlePage = (event: number) => {
  emit('update:page', event);
}
</script>

<template>
  <nav class="py-8 flex justify-center">
    <ul class="flex gap-5 items-baseline">
      <li>
        <button 
          class="py-2 px-3 bg-primary text-white font-medium rounded" 
          :disabled="indexOfCurrent() === 0"
          @click="handlePrev"
        >Vorige</button>
      </li>
      <li v-for="{ number, current } in displayedPages()" :key="number">
        <span v-if="current" class="pb-1 px-3 border-b-2 border-primary">{{ number }}</span>
        <button 
          v-if="!current" 
          class="pb-1 px-3 border-b-2 border-white"
          @click="handlePage(number)"
        >
          {{ number }}
        </button>
      </li>
      <li>
        <button 
          class="py-2 px-3 bg-primary text-white font-medium rounded" 
          :disabled="indexOfCurrent() === pages.length - 1"
          @click="handleNext"
        >Volgende</button>
      </li>
    </ul>
  </nav>
</template>
