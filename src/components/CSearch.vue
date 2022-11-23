<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: ''
  }
})
const store = useStore()
const emit = defineEmits(['set-search', 'refresh'])
const search = computed(() => store.getters['users/getSearch'])

const state = reactive({
  search: search.value || ''
})

const setSearch = () => emit('set-search', state.search)
const setRefresh = () => {
  state.search = ''
  store.dispatch('users/setDocs')
}
</script>

<template>
  <div>
    <div class="search">
      <div v-if="search.length" class="refresh">
        <i class="fa fa-refresh" @click="setRefresh" />
      </div>
      <label class="search-label">
        Busca
      </label>
      <input
        v-model="state.search"
        type="text"
        class="search-input"
        :placeholder="props.placeholder"
      />
      <button
        class="search-icon"
        :disabled="state.search.length < 2"
        @click="setSearch"
      >
        <i class="fa fa-search" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  background-color: transparent;
  padding: 8px;
  border: 1px solid #e9ecef;
  border-radius: 5px;
}

.refresh {
  cursor: pointer;
  position: absolute;
  left: -30px;

  i {
    color: #878889;
  }
}

.search-label {
  position: absolute;
  background-color: #ffffff;
  color: #bfc5cb;
  top: -12px;
  margin: 0 !important;
  padding: 0 5px;
}

.search-input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  caret-color: transparent;
  transition: width 0.4s linear;

  &::placeholder {
    font-size: 0.9rem;
  }
}

.search .search-input {
  padding: 0 10px;
  width: 100%;
  caret-color: #536bf6;
  // font-size: 19px;
  font-weight: 300;
  color: black;
  transition: width 0.4s linear;
}

.search-icon {
  cursor: pointer;
  height: 34px;
  width: 34px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  // background-color: #536bf6;
  border: transparent;
  font-size: 10px;
  bottom: 30px;
  position: relative;
  border-radius: 5px;

  i {
    color: #545556;
  }

  // &:hover:enabled {
  //   background-color: #dedfdf;
  // }

  &:hover, &:active {
    &:not([disabled]) {
      background-color: #dedfdf;
    }
  }

  &:disabled {
    cursor: default;
  }
}
</style>
