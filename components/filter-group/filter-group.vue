<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface FilterGroupProps {
  title: string;
  showButton: boolean;
  buttonTxt: string;
}

const props = defineProps<FilterGroupProps>();
const emit = defineEmits(['toggle:show']);

const onClickToggle = () => {
  emit('toggle:show');
};
</script>

<template>
  <section class="mt-10 pt-5 pb-5 border-b border-border-gray">
    <h3 class="text-2xl font-bold mb-4">{{ props.title }}</h3>
    <slot></slot>
    <button
      class="mt-5 text-primary font-medium"
      v-if="props.showButton"
      @click="onClickToggle"
    >
      {{ buttonTxt }}
    </button>
  </section>
</template>
