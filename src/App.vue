<template>
  <div id="app">
    <md-app class="s1-md-app">
      <md-app-drawer
        class="md-xsmall-hide md-small-hide"
        :md-active.sync="Settings.menuVisible"
        md-persistent="mini"
      >
        <div class="s1-logo__wrapper">
          <img class="s1-logo__img" src="https://s1vm.netlify.com/logo.svg" alt="company logo">
        </div>
        <md-list :md-expand-single="true">
          <md-list-item @click="toggleMenu">
            <md-icon v-if="!Settings.menuVisible">menu</md-icon>
            <md-icon v-if="Settings.menuVisible">keyboard_arrow_left</md-icon>
            <span class="md-list-item-text">Esconder</span>
            <md-tooltip md-direction="right" v-show="!Settings.menuVisible">Expandir menu</md-tooltip>
          </md-list-item>
          <md-list-item @click="setPage('Product')">
            <md-icon>person</md-icon>
            <span class="md-list-item-text">Products</span>
            <md-tooltip md-direction="right" v-show="!Settings.menuVisible">Products</md-tooltip>
          </md-list-item>
          <md-list-item @click="setPage('Profile')">
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">Profiles</span>
            <md-tooltip md-direction="right" v-show="!Settings.menuVisible">Profiles</md-tooltip>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content class="s1-loc__body-bg s1-U__pd--tp0 s1-U__bg-color--body-bg">
        <Product
          v-if="Page.Current === 'Product'"
          :StoreData="StoreData"
          :Settings="Settings"
          :updateStoreData="updateStoreData"
          :setPage="setPage"
        />
        <Profile
          v-if="Page.Current === 'Profile'"
          :StoreData="StoreData"
          :Settings="Settings"
          :updateStoreData="updateStoreData"
          :setPage="setPage"
        />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Product from './components/Product/Product';
import Profile from './components/Profile/Profile';

export default {
  name: 'App',
  components: {
    Product,
    Profile
  },
  data: () => ({
    Page: {
      Current: 'Product'
    },
    StoreData: {
      Product: [],
      Profile: []
    },
    Settings: {
      menuVisible: false,
      snackbarDuration: 3000
    }
  }),
  methods: {
    updateStoreData(entityName, data) {
      this.StoreData[entityName] = [...data];
    },
    setPage(entityName) {
      this.Page.Current = entityName;
    },
    toggleMenu() {
      this.Settings.menuVisible = !this.Settings.menuVisible;
    }
  }
};
</script>
