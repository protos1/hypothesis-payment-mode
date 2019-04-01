<template>
  <section class="s1-U__width--900px" style="margin: 0 auto;">
    <!-- MAIN TITLE -->
    <div class="s1-U__pd--bt32 s1-U__pd--tp32">
      <h1 class="md-display-1">Produtos</h1>
    </div>

    <!-- NO PRODUCT DATA -->
    <article
      class="s1-U__text-align--center s1-U__pd32"
      v-if="StoreData.Product.length === 0"
    >
      <p class="md-body-2 s1-U__mg--bt16 s1-U__text-color--dark-2">
        Nenhum produto criado
      </p>
      <md-button
        class="md-raised md-primary"
        @click="create('Product', 'Product-Name')"
      >
        <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
          <md-icon class="s1-U__mg--rt4">add</md-icon>
          <span>produto</span>
        </div>
      </md-button>
    </article>

    <!-- LIST -->
    <article v-if="StoreData.Product.length > 0">
      <header
        class="s1-U__align-children--center s1-U__mg--bt16 s1-U__justify-content--space-between"
      >
        <md-button class="s1-md-bordered s1-U__mg--bt16">
          <div class="s1-U__align-children--center">
            <md-icon>filter_list</md-icon>
            <span>filtros</span>
          </div>
        </md-button>
        <md-button
          class="md-raised md-primary s1-U__mg--bt16"
          @click="create('Product', 'Product-Name')"
        >
          <div class="s1-U__align-children--center">
            <md-icon>add</md-icon>
            <span>produto</span>
          </div>
        </md-button>
      </header>
      <div class="md-layout md-gutter">
        <div
          class="md-layout-item md-size-50 s1-U__mg--bt20"
          v-for="product in StoreData.Product"
          :key="product.Id"
        >
          <md-card>
            <div class="s1-U__pd16">
              <h2 class="md-title">{{ product.Name }}</h2>
            </div>
            <!-- <div class="s1-U__text-align--right s1-U__pd16 s1-U__pd--tp0">
              <md-button
                class="md-icon-button"
                @click="remove('Product', product.Id, 'Name', 'product')"
              >
                <md-icon>delete</md-icon>
              </md-button>
              <md-button
                class="md-icon-button"
                @click="edit('Product', product.Id, 'Product-Name')"
              >
                <md-icon>edit</md-icon>
              </md-button>
            </div> -->
          </md-card>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'ProductContent',
  props: {
    Product: Object,
    StoreData: Object,
    create: Function,
    edit: Function,
    remove: Function
  }
};
</script>
