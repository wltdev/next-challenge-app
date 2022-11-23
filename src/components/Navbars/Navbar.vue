<template>
  <nav
    v-bind="$attrs"
    id="navbarBlur"
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    data-scroll="true"
  >
    <div class="px-2 py-1 container-fluid">
      <!-- <breadcrumbs :current-page="currentRouteName" :text-white="textWhite" /> -->
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="$store.state.isRTL ? 'px-0' : 'me-sm-4'"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        />

        <ul class="navbar-nav justify-content-end">
          <li v-if="!loggedUser" class="nav-item d-flex align-items-center">
            <router-link
              :to="{ name: 'Sign In' }"
              class="px-0 nav-link font-weight-bold"
              :class="textWhite ? textWhite : 'text-body'"
            >
              <i
                class="fa fa-user"
                :class="$store.state.isRTL ? 'ms-sm-2' : 'me-sm-1'"
              />
              <span class="d-sm-inline d-none">
                Sign In
              </span>
            </router-link>
          </li>

          <li v-else class="nav-item dropdown">
            <a
              id="dropdownMenuUser"
              href="#"
              class="p-0 nav-link d-flex align-items-center pe-2"
              :class="[textWhite ? textWhite : 'text-body', showMenuUser ? 'show' : '']"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="showMenuUser = !showMenuUser"
            >
              <img
                v-if="loggedUser.photo"
                :src="loggedUser.photo"
                class="avatar sm me-3"
                alt="user image"
              />
              <img
                v-else
                class="avatar sm me-3"
                alt="user image"
                src="../../assets/img/team-2.jpg"
              />

              <span class="me-2">
                Olá, {{ loggedUser.name }}
              </span>

              <i class="fa fa-caret-down" />
            </a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenuUser ? 'show' : ''"
              aria-labelledby="dropdownMenuUser"
            >
              <li class="mb-2">
                <a
                  class="dropdown-item border-radius-md"
                  href="javascript:;"
                  @click="goToProfile"
                >
                  <div class="py-1 d-flex">Profile</div>
                </a>
              </li>
              <li class="mb-2">
                <a
                  class="dropdown-item border-radius-md"
                  href="javascript:;"
                  @click="_signOut"
                >
                  <div class="py-1 d-flex">Sair</div>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item d-xl-none px-2 d-flex align-items-center">
            <a
              id="iconNavbarSidenav" class="p-0 nav-link text-body"
              :style="{ cursor: 'pointer' }"
              @click="toggleSidebar"
            >
              <div class="sidenav-toggler-inner"><i class="sidenav-toggler-line" />
                <i class="sidenav-toggler-line" />
                <i class="sidenav-toggler-line" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavbarComponent',

  props: {
    minNav: {
      type: Function,
      default: () => {}
    },
    textWhite: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showMenu: false,
      showMenuUser: false
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

  watch: {
    $route(to, from) {
      const sidenavShow = document.querySelector('.g-sidenav-show')
      if (sidenavShow.classList.contains('g-sidenav-pinned')) {
        this.toggleSidebar()
      }
    }
  },

  created() {
    this.minNav()
  },

  updated() {
    const navbar = document.getElementById('navbarBlur')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10 && this.$store.state.isNavFixed) {
        navbar.classList.add('blur')
        navbar.classList.add('position-sticky')
        navbar.classList.add('shadow-blur')
      } else {
        navbar.classList.remove('blur')
        navbar.classList.remove('position-sticky')
        navbar.classList.remove('shadow-blur')
      }
    })
  },
  methods: {
    ...mapMutations(['navbarMinimize', 'toggleConfigurator']),
    ...mapActions(['toggleSidebarColor']),
    ...mapActions('auth', ['signOut']),

    goToProfile () {
      console.log('alskjdlkasjd')
      this.showMenuUser = false
      this.$router.push('/profile')
    },

    toggleSidebar() {
      this.toggleSidebarColor('bg-white')
      this.navbarMinimize()
    },

    _signOut() {
      this.signOut()
      this.$router.push('/sign-in')
    }
  }
}
</script>
