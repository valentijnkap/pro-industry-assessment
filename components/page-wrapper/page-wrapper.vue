<template>
  <div class="w-full flex flex-col md:flex-row">
    <aside
      class="w-full md:w-2/6 md:min-w-96 bg-background-gray pt-10 pb-10 px-10"
    >
      <slot name="sidebar"></slot>
    </aside>
    <main class="pt-10 pb-10 ps-20 pe-10 md:w-4/6">
      <slot></slot>
    </main>
  </div>
</template>
