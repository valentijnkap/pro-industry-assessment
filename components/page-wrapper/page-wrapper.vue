<template>
  <div class="container flex gap-6 flex-col md:flex-row mt-10 mb-10">
    <aside class="w-full md:w-2/6">
      <slot name="sidebar"></slot>
    </aside>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
