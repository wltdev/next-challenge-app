<script setup>
import VsudProgress from '@/components/VsudProgress.vue'
const props = defineProps({
  activePage: {
    type: Number,
    required: false,
    default: 1
  },
  totalDocs: {
    type: Number,
    required: false,
    default: 0
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const totalPages = Math.ceil(props.totalDocs / 10)

const emit = defineEmits(['prev', 'next'])

</script>

<template>
  <div>
    <VsudProgress v-if="props.isLoading" />
    <div class="d-flex justify-content-between px-3 align-items-center border-top">
      <p v-if="props.totalDocs" class="text">
        Total de registros: {{ props.totalDocs }}
      </p>
      <div v-else />

      <p class="text">
        Página {{ props.activePage }} <span v-if="props.totalDocs">
          de {{ totalPages }}
        </span>
      </p>
      <div>
        <ul class="pagination d-flex justify-content-between">
          <li class="page-item">
            <a class="page-link" href="javascript:;" @click="emit('prev')">
              <i class="fa fa-angle-left" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="javascript:;" @click="emit('next')">
              <i class="fa fa-angle-right" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text {
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
}

.pagination {
  min-width: 100px;
}
</style>
