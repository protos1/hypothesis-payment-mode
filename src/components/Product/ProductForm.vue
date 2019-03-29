<template>
  <div>
    <h2
      class="s1-U__text-color--primary md-title s1-U__mg--tp16 s1-U__mg--bt16"
    >
      Informações gerais
    </h2>
    <div class="s1-loc__md-field-wrapper s1-U__width--180px">
      <md-field
        class="md-field-helper-text"
        :class="{
          'md-invalid md-field-helper-text':
            $v.Product.Form.Name.$dirty && $v.Product.Form.Name.$invalid
        }"
      >
        <label for="Product-Name">Nome</label>
        <md-input
          id="Product-Name"
          name="Product-Name"
          type="text"
          @blur="$v.Product.Form.Name.$touch()"
          @focus="$v.Product.Form.Name.$reset()"
          v-model="Product.Form.Name"
          maxlength="20"
          required
        ></md-input>
        <span class="md-error" v-if="!$v.Product.Form.Name.required"
          >Required field</span
        >
        <span class="md-error" v-if="!$v.Product.Form.Name.minLength"
          >4 characters minimum</span
        >
      </md-field>
    </div>
    <h2
      class="s1-U__text-color--primary md-title s1-U__mg--tp16 s1-U__mg--bt16"
    >
      Formas de pagamento
    </h2>

    <div class="s1-U__width--400px" v-if="AllPayments.length === 0">
      <p class="s1-U__text-color--dark-2">
        Nenhuma forma de pagamento adicionada (obrigatório)
      </p>
      <md-button
        class="s1-md-bordered md-primary s1-U__mg--tp8"
        @click="showDialog = true"
      >
        <span class="s1-U__pd--lt8 s1-U__pd--rt8"
          >Adicionar formas de pagamento</span
        >
      </md-button>
    </div>

    <md-table
      md-card
      class="s1-U__width--400px pb"
      v-if="AllPayments.length > 0"
    >
      <md-table-toolbar>
        <div
          class="s1-U__align-children--center s1-U__justify-content--space-between s1-U__full-width"
        >
          <h3 class="md-body-2 s1-U__text-color--dark-2 s1-U__pd--lt12">
            {{ AllPayments.length }} adicionadas
          </h3>
          <div>
            <md-button
              class="s1-md-bordered md-dense md-primary"
              @click="showDialog = !showDialog"
              :disabled="
                AllPayments.length ===
                  ChargeMethodOptions.length * PaymentOptions.length
              "
              >Adicionar formas de pagamento</md-button
            >
            <md-tooltip
              md-direction="bottom"
              v-show="
                AllPayments.length ===
                  ChargeMethodOptions.length * PaymentOptions.length
              "
              >Todas as possibilidades adicionadas</md-tooltip
            >
          </div>
        </div>
      </md-table-toolbar>
      <md-table-row
        v-for="pm in AllPayments"
        :key="pm[0] + pm[1]"
        :style="`border-left: 3px solid ${getColor(pm[0])}`"
      >
        <md-table-cell>
          <span>{{ pm[0] }}</span>
          <span class="s1-U__mg--lt4 s1-U__text-lowercase">{{ pm[1] }}</span>
        </md-table-cell>
        <md-table-cell
          class="s1-U__text-align--right s1-U__pd--tp8 s1-U__pd--bt8"
        >
          <div
            class="s1-U__align-children--center s1-U__justify-content--flex-end"
          >
            <div
              class="s1-U__flex-shrink-0"
              style="position: relative"
              v-if="
                pm[1] === 'Parcelado' ||
                  pm[1] === 'Recorrente' ||
                  pm[1] === 'Mista'
              "
            >
              <md-menu md-direction="bottom-end">
                <md-button
                  style="min-width: auto"
                  class="squared md-dense"
                  @click="
                    menuContentScrollTo(
                      `${pm[0]}${pm[1]}-menu-content`,
                      Installments[`${pm[0]} ${pm[1]}`].max
                    )
                  "
                  md-menu-trigger
                >
                  <div class="s1-U__align-children--center s1-U__pd--lt8">
                    <!-- <span
                      class="s1-U__text-lowercase"
                    >Entre {{Installments[`${pm[0]} ${pm[1]}`].min}}x e {{Installments[`${pm[0]} ${pm[1]}`].max}}x</span>-->
                    <span class="s1-U__text-lowercase"
                      >em até {{ Installments[`${pm[0]} ${pm[1]}`].max }}x</span
                    >
                    <md-icon>arrow_drop_down</md-icon>
                    <md-tooltip md-direction="left"
                      >Configurar parcelas</md-tooltip
                    >
                  </div>
                </md-button>
                <md-menu-content
                  class="s1-loc__width--70px s1-U__no-min-width-force"
                  :class="`${pm[0]}${pm[1]}-menu-content`"
                >
                  <md-menu-item
                    v-for="n in 23"
                    :key="`option-${n}`"
                    id="${pm[0]}${pm[1]}-menu-content-${n}"
                    @click="Installments[`${pm[0]} ${pm[1]}`].max = n + 1"
                    >{{ n + 1 }}x</md-menu-item
                  >
                </md-menu-content>
              </md-menu>
            </div>
            <md-button
              class="squared md-dense md-icon-button s1-U__mg--lt8"
              @click="removePayment(pm[0], pm[1])"
            >
              <md-icon>delete</md-icon>
              <md-tooltip md-direction="right">Remover</md-tooltip>
            </md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog :md-active.sync="showDialog">
      <div
        class="s1-U__pd24 s1-U__align-children--center s1-U__justify-content--space-between s1-U__flex-shrink-0"
      >
        <h2 class="md-headline">Formas de pagamento</h2>
        <md-button
          class="squared md-dense md-icon-button"
          @click="closeDialog()"
        >
          <md-icon>close</md-icon>
        </md-button>
      </div>
      <md-dialog-content class="s1-U__pd24">
        <p class="s1-U__text-color--dark-2">
          Formas de cobrança produto oferece:
        </p>
        <div>
          <md-checkbox
            class="s1-U__mg--rt48"
            v-model="ChargesSelected"
            :disabled="isChargeDisable('Crédito')"
            :class="{ 's1-U__text-color--dark-3': isChargeDisable('Crédito') }"
            value="Crédito"
            >Crédito</md-checkbox
          >
          <md-checkbox
            class="s1-U__mg--rt48"
            v-model="ChargesSelected"
            :disabled="isChargeDisable('Débito')"
            :class="{ 's1-U__text-color--dark-3': isChargeDisable('Débito') }"
            value="Débito"
            >Débito</md-checkbox
          >
          <md-checkbox
            class="s1-U__mg--rt48"
            v-model="ChargesSelected"
            :disabled="isChargeDisable('Boleta')"
            :class="{ 's1-U__text-color--dark-3': isChargeDisable('Boleta') }"
            value="Boleta"
            >Boleta</md-checkbox
          >
        </div>

        <p class="s1-U__text-color--dark-2 s1-U__mg--tp24">
          Selecione as opções de pagamento que seu produto oferece:
        </p>
        <md-checkbox
          class="s1-U__mg--rt48"
          v-model="PaymentsSelected"
          :disabled="isPaymentDisable('À vista')"
          :class="{ 's1-U__text-color--dark-3': isPaymentDisable('À vista') }"
          value="À vista"
          >À vista</md-checkbox
        >
        <md-checkbox
          class="s1-U__mg--rt48"
          v-model="PaymentsSelected"
          :disabled="isPaymentDisable('Parcelado')"
          :class="{ 's1-U__text-color--dark-3': isPaymentDisable('Parcelado') }"
          value="Parcelado"
          >Parcelado</md-checkbox
        >
        <md-checkbox
          class="s1-U__mg--rt48"
          v-model="PaymentsSelected"
          :disabled="isPaymentDisable('Recorrente')"
          :class="{
            's1-U__text-color--dark-3': isPaymentDisable('Recorrente')
          }"
          value="Recorrente"
          >Recorrente</md-checkbox
        >
        <md-checkbox
          class="s1-U__mg--rt48"
          v-model="PaymentsSelected"
          :disabled="isPaymentDisable('Mista')"
          :class="{ 's1-U__text-color--dark-3': isPaymentDisable('Mista') }"
          value="Mista"
          >Mista</md-checkbox
        >
        <p
          class="s1-U__text-color--dark-2 s1-U__mg--tp24"
          v-show="combine(ChargesSelected, PaymentsSelected).length > 0"
        >
          Serão adicionados:
        </p>
        <ul
          class="s1-U__pd--lt16"
          :style="
            `column-count: ${Math.ceil(
              combine(ChargesSelected, PaymentsSelected).length / 4
            )}`
          "
        >
          <li
            v-for="pm in combine(ChargesSelected, PaymentsSelected).sort()"
            :key="`summary-${pm[0]}-${pm[1]}`"
          >
            <span>{{ pm[0] }}</span>
            <span class="s1-U__mg--lt4 s1-U__text-lowercase">{{ pm[1] }}</span>
          </li>
        </ul>
      </md-dialog-content>
      <md-dialog-actions class="s1-U__pd24 s1-U__flex-shrink-0">
        <md-button
          class="md-raised md-primary"
          @click="closeDialog()"
          :disabled="
            ChargesSelected.length === 0 || PaymentsSelected.length === 0
          "
        >
          <span class="s1-U__pd--lt8 s1-U__pd--rt8">Adicionar</span>
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ProductForm',
  data: () => ({
    showDialog: false,
    ChargeMethodOptions: ['Crédito', 'Débito', 'Boleta'],
    PaymentOptions: ['À vista', 'Parcelado', 'Recorrente', 'Mista'],
    ChargesSelected: [],
    PaymentsSelected: [],
    AllPayments: [],
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
    }
  }),
  props: {
    Product: Object,
    StoreData: Object,
    $v: Object,
    setPayments: Function
  },
  methods: {
    addPayment() {
      let array = [
        ...this.combine(this.ChargesSelected, this.PaymentsSelected),
        ...this.AllPayments
      ];
      this.AllPayments = array.sort();
      this.ChargesSelected = [];
      this.PaymentsSelected = [];
    },
    combine(arr1, arr2) {
      const array = [];
      for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
          array.push([arr1[i], arr2[j]]);
        }
      }
      return array;
    },
    closeDialog() {
      this.addPayment();
      this.showDialog = false;
    },
    removePayment(charge, payment) {
      this.AllPayments = this.AllPayments.filter(item => {
        if (item[0] === charge && item[1] === payment) {
          null;
        } else {
          return item;
        }
      });
    },
    getColor(type) {
      return (
        (type === 'Crédito' && '#039BE5') ||
        (type === 'Débito' && '#BBDEFB') ||
        (type === 'Boleta' && '#CE93D8')
      );
    },
    isPaymentDisable(item) {
      let isDisabled = false;
      let array = [];

      if (this.ChargesSelected.length > 0) {
        for (var i = 0; i < this.ChargesSelected.length; i++) {
          for (var j = 0; j < this.AllPayments.length; j++) {
            if (this.AllPayments[j][0] === this.ChargesSelected[i])
              array.push(this.AllPayments[j][1]);
          }
        }

        if (array.includes(item)) return true;
      }
      return isDisabled;
    },
    isChargeDisable(item) {
      let isDisabled = false;
      let array = [];

      if (this.PaymentsSelected.length > 0) {
        for (var i = 0; i < this.PaymentsSelected.length; i++) {
          for (var j = 0; j < this.AllPayments.length; j++) {
            if (this.AllPayments[j][1] === this.PaymentsSelected[i])
              array.push(this.AllPayments[j][0]);
          }
        }

        if (array.includes(item)) return true;
      }
      return isDisabled;
    },
    menuContentScrollTo(cl, value) {
      setTimeout(() => {
        let c = document.querySelector(`.${cl} .md-scrollbar`);
        if (c) c.scrollTop = 8 + 48 * (value - 2);
      }, 300);
    }
  },
  watch: {
    AllPayments: function() {
      this.setPayments(this.AllPayments, this.Installments);
    }
  },
  mounted() {
    this.AllPayments = _.cloneDeep(this.Product.Form.Payment);
    this.Installments = _.cloneDeep(this.Product.Form.Installments);
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
