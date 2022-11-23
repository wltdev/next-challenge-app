<template>
  <transition name="fade">
    <div class="component-loading" :class="{ hide: hiddenBackgroundColor }">
      <loading-spinner :size="size" />
    </div>
  </transition>
</template>

<script>
import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

export default {
  name: 'ComponentLoading',

  components: {
    LoadingSpinner
  },

  props: {
    size: {
      type: String,
      required: false,
      default: () => '',
      validator: (e) => ['', 'small'].includes(e)
    },
    hiddenBackgroundColor: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  mounted() {
    console.log({ hiddenBackgroundColor: this.hiddenBackgroundColor })
  }
}
</script>

<style lang="scss" scoped>
.component-loading {
  position: absolute;
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

.hide {
  background-color: transparent !important;
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
