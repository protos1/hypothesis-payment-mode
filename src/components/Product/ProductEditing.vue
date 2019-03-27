<template>
  <section class="s1-U__width--900px" style="margin: 0 auto;">
    <header class="s1-U__pd--bt32 s1-U__pd--tp32">
      <p
        class="md-caption s1-U__mg--lt48 s1-U__pd--lt4"
        v-if="Product.Form.Id"
      >{{getNameById(StoreData.Product, Product.Form.Id)}}</p>
      <div class="s1-U__align-children--center">
        <md-button
          class="md-icon-button s1-U__mg--rt8"
          @click="Product.DiscardEditingInterface = true"
        >
          <md-icon>arrow_back</md-icon>
        </md-button>
        <div>
          <h1 class="md-display-1">Product editing</h1>
        </div>
      </div>
    </header>
    <md-card>
      <div
        class="md-layout md-alignment-center-center s1-loc__loading"
        :class="Product.EditingFormLoading && 'active'"
      >
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
      <md-content class="md-scrollbar s1-U__pd16 s1-U__pd--lt48" style="overflow: auto">
        <product-form :setPayments="setPayments" :StoreData="StoreData" :Product="Product" :$v="$v"></product-form>
      </md-content>
      <md-card-actions class="s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
        <md-button
          class="md-primary md-raised"
          :disabled="$v.Product.Form.$invalid"
          @click="saveEdited('Product')"
        >
          <span class="s1-U__pd--lt8 s1-U__pd--rt8">Save changes</span>
        </md-button>
      </md-card-actions>
    </md-card>

    <md-dialog-confirm
      :md-active.sync="Product.DiscardEditingInterface"
      md-title="Discard product editing?"
      md-content="When you discard, the product information edited will be discarded."
      md-confirm-text="discard"
      md-cancel-text="back"
      @md-cancel="Product.DiscardEditingInterface = false"
      @md-confirm="discardEditing('Product')"
    />
  </section>
</template>

<script>
import ProductForm from './ProductForm.vue';

export default {
  name: 'ProductEditing',
  components: {
    ProductForm
  },
  props: {
    Product: Object,
    StoreData: Object,
    $v: Object,
    saveEdited: Function,
    discardEditing: Function,
    setPayments: Function
  }
};
</script>