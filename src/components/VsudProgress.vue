<template>
  <div class="progress">
    <div
      class="progress-bar"
      :class="getClasses(color, variant)"
      :style="{ width: percentageProgress + '%' }"
      aria-valuenow="100"
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </div>
</template>

<script>
export default {
  name: 'VsudProgress',
  props: {
    color: {
      type: String,
      default: 'secondary'
    },
    variant: {
      type: String,
      default: 'fill'
    },
    percentage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      progress: 0,
      progessInterval: undefined
    }
  },

  computed: {
    percentageProgress () {
      if (this.percentage.length) return this.percentage

      return this.progress
    }
  },

  mounted() {
    this.progessInterval = setInterval(() => {
      // if (this.progress === 100) this.progress = 10
      if (this.progress >= 100) this.progress = 10
      this.progress += 10
    }, 100)
  },

  beforeUnmount() {
    clearInterval(this.progessInterval)
  },

  methods: {
    getClasses: (color, variant) => {
      let colorValue

      if (variant === 'gradient') {
        colorValue = `bg-gradient-${color}`
      } else {
        colorValue = `bg-${color}`
      }

      return `${colorValue}`
    }
  }
}
</script>
