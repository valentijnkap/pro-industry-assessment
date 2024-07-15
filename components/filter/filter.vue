<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface FilterProps {
  id: string;
  value: string;
  checked: boolean;
  label: string;
  groupName: string;
}

const props = defineProps<FilterProps>();
const emit = defineEmits(['update:checked']);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:checked', {
    checked: target.checked,
    value: props.value,
    groupName: props.groupName,
  });
};
</script>

<template>
  <div class="flex items-center gap-4">
    <input
      type="checkbox"
      :id="id"
      :checked="checked"
      :value="value"
      @change="handleChange"
    />
    <label :for="id" class="text-lg text-text-black">{{ label }}</label>
  </div>
</template>
