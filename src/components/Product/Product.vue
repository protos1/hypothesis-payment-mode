<template>
  <div id="Product">
    <!-- MOCK -->
    <div class="s1-prop__auto-gen">
      <md-button
        class="md-primary md-icon-button squared"
        @click="setMockData('Product')"
      >
        <md-icon>person</md-icon>
      </md-button>
    </div>

    <!-- GENERAL LOADING -->
    <div
      class="md-layout md-alignment-center-center s1-loc__loading s1-loc__above-all"
      :class="Product.Loading && 'active'"
    >
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

    <!-- CONTENT -->
    <product-content
      :StoreData="StoreData"
      :Product="Product"
      :create="create"
      :edit="edit"
      :remove="remove"
      v-if="!Product.CreatingInterface && !Product.EditingInterface"
    />

    <!-- DETAILS -->
    <section
      class="s1-U__width--900px"
      style="margin: 0 auto;"
      v-if="Product.DetailInterface"
    ></section>

    <!-- CREATING -->
    <product-creating
      :StoreData="StoreData"
      :Product="Product"
      :$v="$v"
      :saveCreated="saveCreated"
      :discardCreating="discardCreating"
      v-if="Product.CreatingInterface"
      :setPayments="setPayments"
    />

    <!-- EDITING -->
    <product-editing
      :StoreData="StoreData"
      :Product="Product"
      :$v="$v"
      :saveEdited="saveEdited"
      :discardEditing="discardEditing"
      v-if="Product.EditingInterface"
      :setPayments="setPayments"
    />

    <!-- DELETE -->
    <md-dialog-confirm
      :md-active.sync="Product.DeleteConfirmation"
      :md-title="Product.DeleteInfo.Title"
      :md-content="Product.DeleteInfo.Content"
      md-confirm-text="delete"
      md-cancel-text="back"
      @md-cancel="Product.DeleteConfirmation = false"
      @md-confirm="removeItem('Product', Product.DeleteInfo.Id)"
    />

    <!-- CREATE FEEDBACK -->
    <md-snackbar
      :md-duration="Settings.snackbarDuration"
      :md-active.sync="Product.SuccessFeedbackCreating"
      md-persistent
    >
      <span>Product created successfully</span>
      <md-button
        class="md-accent"
        @click="Product.SuccessFeedbackCreating = false"
        >OK</md-button
      >
    </md-snackbar>

    <!-- EDIT FEEDBACK -->
    <md-snackbar
      :md-duration="Settings.snackbarDuration"
      :md-active.sync="Product.SuccessFeedbackEditing"
      md-persistent
    >
      <span>Product edited successfully</span>
      <md-button
        class="md-accent"
        @click="Product.SuccessFeedbackEditing = false"
        >OK</md-button
      >
    </md-snackbar>

    <!-- DELETE  FEEDBACK -->
    <md-snackbar
      :md-duration="Settings.snackbarDuration"
      :md-active.sync="Product.SuccessFeedbackDeletion"
      md-persistent
    >
      <span>Product deleted successfully</span>
      <md-button
        class="md-accent"
        @click="Product.SuccessFeedbackDeletion = false"
        >OK</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import EntityBase from '../EntityBase';
import _ from 'lodash';

import Products from '../../data/Products.js';

import ProductContent from './ProductContent.vue';
import ProductCreating from './ProductCreating.vue';
import ProductEditing from './ProductEditing.vue';

export default {
  name: 'Product',
  extends: EntityBase,
  props: {
    StoreData: Object,
    Settings: Object,
    updateStoreData: Function,
    setPage: Function
  },
  components: {
    ProductContent,
    ProductCreating,
    ProductEditing
  },
  data: () => ({
    Product: {
      Form: {
        Id: null,
        Name: null,
        Payment: [],
        Installments: {
          'Crédito Parcelado': {
            menu: false,
            min: 2,
            max: 12
          },
          'Crédito Recorrente': {
            menu: false,
            min: 2,
            max: 12
          },
          'Crédito Mista': {
            menu: false,
            min: 2,
            max: 12
          },
          'Débito Parcelado': {
            menu: false,
            min: 2,
            max: 12
          },
          'Débito Recorrente': {
            menu: false,
            min: 2,
            max: 12
          },
          'Débito Mista': {
            menu: false,
            min: 2,
            max: 12
          },
          'Boleta Parcelado': {
            menu: false,
            min: 2,
            max: 12
          },
          'Boleta Recorrente': {
            menu: false,
            min: 2,
            max: 12
          },
          'Boleta Mista': {
            menu: false,
            min: 2,
            max: 12
          }
        },
        Abbr: null
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Payment: [],
        Installments: {
          'Crédito Parcelado': {
            menu: false,
            min: 2,
            max: 12
          },
          'Crédito Recorrente': {
            menu: false,
            min: 2,
            max: 12
          },
          'Crédito Mista': {
            menu: false,
            min: 2,
            max: 12
          },
          'Débito Parcelado': {
            menu: false,
            min: 2,
            max: 12
          },
          'Débito Recorrente': {
            menu: false,
            min: 2,
            max: 12
          },
          'Débito Mista': {
            menu: false,
            min: 2,
            max: 12
          },
          'Boleta Parcelado': {
            menu: false,
            min: 2,
            max: 12
          },
          'Boleta Recorrente': {
            menu: false,
            min: 2,
            max: 12
          },
          'Boleta Mista': {
            menu: false,
            min: 2,
            max: 12
          }
        },
        Abbr: null
      },
      Data: [],
      MockData: Products,
      Loading: false,
      CreatingFormLoading: false,
      EditingFormLoading: false,
      EditingInterface: false,
      DiscardEditingInterface: false,
      SuccessFeedbackEditing: false,
      CreatingInterface: false,
      DiscardCreatingInterface: false,
      SuccessFeedbackCreating: false,
      DeleteConfirmation: false,
      SuccessFeedbackDeletion: false,
      DeleteInfo: {
        Id: null,
        Title: null,
        Content: null
      }
    }
  }),
  mounted() {
    this.Product.Data = [...this.StoreData.Product];
  },
  validations: {
    Product: {
      Form: {
        Name: {
          required,
          minLength: minLength(4)
        },
        Payment: {
          required,
          minLength: minLength(1)
        }
      }
    }
  },
  methods: {
    setPayments(array, inst) {
      this.Product.Form.Payment = _.cloneDeep(array);
      this.Product.Form.Installments = _.cloneDeep(inst);
    }
  }
};
</script>
