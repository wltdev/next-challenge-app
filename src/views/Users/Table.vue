<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CPagination from '@/components/tables/CPagination.vue'
import VsudAvatar from '@/components/VsudAvatar.vue'
import VsudBadge from '@/components/VsudBadge.vue'
import VsudInput from '@/components/VsudInput.vue'
import { formatDate } from '@/common/helpers'
import img1 from '@/assets/img/default-user.png'
import AddUserModal from '@/components/users/AddUserModal.vue'

const router = useRouter()
const store = useStore()
const docs = computed(() => store.getters['users/getItems'])
const activePage = computed(() => store.getters['users/getPage'])
const isLoading = computed(() => store.getters['users/isLoading'])

const search = ref('')

onMounted(() => {
  if (!docs.value.length) store.dispatch('users/setDocs')
})

const setDoc = (doc) => {
  store.dispatch('users/setDoc', doc)
  router.push(`/users/${doc._id}`)
}

const nextPage = () => {
  store.dispatch('users/nextPage')
}

const prevPage = () => {
  store.dispatch('users/prevPage')
}

const setSearch = () => {
  store.dispatch('users/getBySearch', search.value)
}

</script>

<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <div class="d-flex justify-content-between align-i">
        <div>
          <h6>Usuários</h6>
          <AddUserModal />
        </div>
        <vsud-input
          v-model:value="search"
          :icon-clickable="true"
          icon="fa fa-search"
          icon-dir="left"
          type="text"
          placeholder="Ex: jose.."
          name="search"
          @icon-click="setSearch"
        />
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Email
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Phone
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Permission
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Created at
              </th>
              <th class="text-secondary opacity-7" />
            </tr>
          </thead>
          <tbody v-if="docs.length">
            <tr v-for="doc in docs" :key="doc.uid">
              <td>
                <div class="d-flex px-2 py-1 align-items-center">
                  <div>
                    <vsud-avatar
                      :img="doc.photo || img1"
                      size="md"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">
                      {{ doc.name }}
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs text-secondary mb-0">
                  {{ doc.email }}
                </p>
              </td>
              <td>
                <p class="text-xs text-secondary mb-0">
                  {{ doc.phone }}
                </p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge
                  :color="doc.permission === 'admin' ? 'info' : 'warning'"
                  variant="gradient"
                  size="sm"
                >
                  {{ doc.permission }}
                </vsud-badge>
              </td>
              <td>
                <p class="text-xs text-secondary mb-0">
                  {{ doc.createdAt ?? formatDate(doc.createdAt) }}
                </p>
              </td>
              <td class="align-middle">
                <a
                  class="text-secondary font-weight-bold text-xs link"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="setDoc(doc)"
                >Visualizar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <CPagination
        :active-page="activePage"
        :is-loading="isLoading"
        @prev="prevPage"
        @next="nextPage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}
</style>
