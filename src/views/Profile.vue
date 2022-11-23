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
              {{ loggedUser.email }}
            </p>
            <p class="mb-0 text-sm font-weight-bold">
              {{ loggedUser.permission }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="px-4 container-fluid">
    <div class="mt-3 row">
      <div class="col">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">
              Account
            </h6>
          </div>
          <div class="p-3 card-body">
            <form role="form" class="text-start" @submit.prevent="_updateProfile">
              <div class="row">
                <div class="col">
                  <label>Name</label>
                  <vsud-input
                    v-model:value="editUser.name"
                    icon="fa fa-user"
                    icon-dir="left"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                </div>

                <div class="col">
                  <label>Phone</label>
                  <vsud-input
                    v-model:value="editUser.phone"
                    icon="fa fa-phone"
                    icon-dir="left"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label>Password</label>
                  <vsud-input
                    v-model:value="password"
                    icon="fa fa-key"
                    icon-dir="left"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div class="col">
                  <label>Password confirmation</label>
                  <vsud-input
                    v-model:value="passwordConfirmation"
                    icon="fa fa-key"
                    icon-dir="left"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
              </div>

              <!-- <vsud-switch id="rememberMe" checked>Lembrar dados</vsud-switch> -->
              <div class="d-flex justify-content-center">
                <vsud-button
                  style="width:fit-content !important"
                  class="my-4 mb-2"
                  variant="gradient"
                  color="info"
                  full-width
                >
                  Save
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
import { mapActions, mapGetters } from 'vuex'
import VsudInput from '@/components/VsudInput.vue'
import VsudButton from '@/components/VsudButton.vue'
import bgImg from '@/assets/img/curved-images/curved14.jpg'
import { getLocalUser } from '@/utils/localStorage'

export default {
  name: 'ProfileOverview',
  components: {
    VsudInput,
    VsudButton
  },
  data() {
    return {
      showMenu: false,
      bgImg,
      editUser: {
        name: '',
        phone: ''
      },
      password: '',
      passwordConfirmation: ''
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

  async mounted() {
    this.$store.state.isAbsolute = true
    this.$store.state.isNavFixed = false
    this.editUser = await getLocalUser()
  },

  beforeUnmount() {
    this.$store.state.isAbsolute = false
  },

  methods: {
    ...mapActions('auth', ['updateProfile']),

    async _updateProfile () {
      if (this.password !== this.passwordConfirmation) {
        this.$toast.error('Passwords must be equal', {
          position: 'bottom'
        })
      } else {
        await this.updateProfile({ ...this.editUser, password: this.password })
      }
    }
  }

}
</script>
