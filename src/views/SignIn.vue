<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-center">
                  <img src="@/assets/img/nextar/app-logo.png" width="200" />
                  <p class="mb-0">
                    User management
                  </p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" @submit.prevent="signin">
                    <label>Email</label>
                    <vsud-input
                      id="email"
                      v-model:value="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                    <label>Password</label>
                    <vsud-input
                      id="password"
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
            <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div
                  class="bg-contain oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${bgImg})`
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import VsudInput from '@/components/VsudInput.vue'
import VsudButton from '@/components/VsudButton.vue'
import bgImg from '@/assets/img/curved-images/curved9.jpg'
// import bgImg from '@/assets/img/curved-images/white-curved.jpeg'
// import bgImg from '@/assets/img/introspecta/background-1.png'
const body = document.getElementsByTagName('body')[0]

export default {
  name: 'SigninPage',
  components: {
    VsudInput,
    VsudButton
  },
  data() {
    return {
      bgImg,
      email: '',
      password: ''
    }
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true
    this.$store.state.showNavbar = false
    this.$store.state.showSidenav = false
    this.$store.state.showFooter = false
    body.classList.remove('bg-gray-100')
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false
    this.$store.state.showNavbar = true
    this.$store.state.showSidenav = true
    this.$store.state.showFooter = true
    body.classList.add('bg-gray-100')
  },

  methods: {
    async signin() {
      const auth = await this.$store.dispatch('auth/signIn', {
        email: this.email,
        password: this.password
      })

      if (auth) {
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>
