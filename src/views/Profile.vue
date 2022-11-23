<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-300 border-radius-xl"
      :style="{
        backgroundImage:`url(${bgImg})`,
        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-gradient-success opacity-6" />
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">
              {{ loggedUser.name }}
            </h5>
            <p class="mb-0 text-sm font-weight-bold">
              {{ loggedUser.permission }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="col-12">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">
              Platform Settings
            </h6>
          </div>
          <div class="p-3 card-body">
            <h6 class="text-xs text-uppercase text-body font-weight-bolder">
              Account
            </h6>

            <form role="form" class="text-start" @submit.prevent="signin">
              <label>Email</label>
              <vsud-input
                v-model:value="email"
                type="email"
                placeholder="Email"
                name="email"
              />
              <label>Password</label>
              <vsud-input
                v-model:value="password"
                type="password"
                placeholder="Password"
                name="password"
              />
              <!-- <vsud-switch id="rememberMe" checked>Lembrar dados</vsud-switch> -->
              <div class="text-center">
                <vsud-button
                  class="my-4 mb-2"
                  variant="gradient"
                  color="info"
                  full-width
                >
                  Entrar
                </vsud-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import VsudInput from '@/components/VsudInput.vue'
import VsudButton from '@/components/VsudButton.vue'
import bgImg from '@/assets/img/curved-images/curved14.jpg'

export default {
  name: 'ProfileOverview',
  components: {
    VsudInput,
    VsudButton
  },
  data() {
    return {
      showMenu: false,
      bgImg
    }
  },

  computed: {
    ...mapGetters('auth', ['getUser']),

    currentRouteName() {
      return this.$route.name
    },
    loggedUser() {
      return this.getUser
    }
  },

  mounted() {
    this.$store.state.isAbsolute = true
    this.$store.state.isNavFixed = false
  },

  beforeUnmount() {
    this.$store.state.isAbsolute = false
  }
}
</script>
