<script setup>
import LoadingSpinner from './LoadingSpinner.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const getGlobalLoading = computed(() => store.getters.getGlobalLoading)
</script>

<template>
  <transition name="fade">
    <div v-if="getGlobalLoading" class="global-loading">
      <LoadingSpinner />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade {
  &-leave-to,
  &-enter {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 250ms ease 0s;
  }
}
</style>
