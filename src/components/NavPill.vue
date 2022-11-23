<script setup>
import { onMounted } from 'vue'
import setNavPills from '@/assets/js/nav-pills.js'

const props = defineProps({
  active: String,
  pills: Array
})

const emit = defineEmits(['click'])

onMounted(() => setNavPills())
</script>

<template>
  <div class="nav-wrapper position-relative end-0">
    <ul class="nav nav-pills nav-fill p-1" role="tablist">
      <li class="nav-item" v-for="pill in props.pills">
        <a
          class="nav-link mb-0 px-0 py-1 active active"
          data-bs-toggle="tab"
          @click="emit('click', pill.value)"
          role="tab"
          aria-selected="true"
          >{{ pill.label }}</a
        >
      </li>
    </ul>
  </div>
</template>
