<template>
  <section class="s1-U__width--900px" style="margin: 0 auto;">
    <header class="s1-U__pd--bt32 s1-U__pd--tp32">
      <div class="s1-U__align-children--center">
        <md-button
          class="md-icon-button s1-U__mg--rt8"
          @click="Product.DiscardCreatingInterface = true"
        >
          <md-icon>arrow_back</md-icon>
        </md-button>
        <h1 class="md-display-1">Product creation</h1>
      </div>
    </header>
    <md-card>
      <div
        class="md-layout md-alignment-center-center s1-loc__loading"
        :class="Product.CreatingFormLoading && 'active'"
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
          @click="saveCreated('Product')"
        >
          <span class="s1-U__pd--lt8 s1-U__pd--rt8">Create product</span>
        </md-button>
      </md-card-actions>
    </md-card>

    <md-dialog-confirm
      :md-active.sync="Product.DiscardCreatingInterface"
      md-title="Discard product registration?"
      md-content="When you exit, the product information provided will be discarded."
      md-confirm-text="discard"
      md-cancel-text="back"
      @md-cancel="Product.DiscardCreatingInterface = false"
      @md-confirm="discardCreating('Product')"
    />
  </section>
</template>

<script>
import ProductForm from './ProductForm.vue';

export default {
  name: 'ProductCreating',
  components: {
    ProductForm
  },
  props: {
    Product: Object,
    StoreData: Object,
    $v: Object,
    saveCreated: Function,
    discardCreating: Function,
    setPayments: Function
  }
};
</script>