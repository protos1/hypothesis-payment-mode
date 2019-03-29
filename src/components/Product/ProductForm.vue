<template>
  <div>
    <h2 class="s1-U__text-color--primary md-title s1-U__mg--tp24 s1-U__mg--bt4">
      Pacotes
    </h2>
    <p class="s1-U__mg--bt40 md-display-1">...</p>
    <h2
      class="s1-U__text-color--primary md-title s1-U__mg--tp16 s1-U__mg--bt16"
    >
      Informações gerais
    </h2>
    <div class="s1-loc__md-field-wrapper s1-U__width--180px">
      <md-field
        :md-counter="false"
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
    <div class="s1-loc__md-field-wrapper s1-U__width--400px">
      <md-field :md-counter="false">
        <label for="Product-Description">Descrição</label>
        <md-textarea
          id="Product-Description"
          name="Product-Description"
          v-model="Product.Form.Description"
          :md-autogrow="Product.CreatingInterface"
          maxlength="280"
        ></md-textarea>
      </md-field>
    </div>
    <h2
      class="s1-U__text-color--primary md-title s1-U__mg--tp16 s1-U__mg--bt16"
    >
      Contratação
    </h2>
    <div class="s1-loc__md-field-wrapper">
      <label class="s1-U__text-color--dark-2" for="Product-Vigence"
        >Vigência</label
      >
      <div class="s1-U__align-children--center">
        <md-field :md-counter="false" class="s1-md-field--w50px s1-U__mg--tp8">
          <md-input
            id="Product-Vigence"
            name="Product-Vigence"
            class="s1-U__text-align--center"
            type="number"
            @blur="
              $v.Product.Form.Vigence.$touch();
              Product.Form.Vigence = vigenceCheck(Product.Form.Vigence);
            "
            @focus="$v.Product.Form.Vigence.$reset()"
            v-model="Product.Form.Vigence"
            required
          ></md-input>
          <span class="md-error" v-if="!$v.Product.Form.Vigence.required"
            >Required field</span
          >
        </md-field>
        <span class="s1-U__mg--lt8">meses</span>
      </div>
    </div>
    <div class="s1-loc__md-field-wrapper s1-U__width--100px">
      <md-field>
        <label for="Product-Currency">Moeda</label>
        <md-select
          id="Product-Currency"
          name="Product-Currency"
          v-model="Product.Form.Currency"
          disabled
        >
          <md-option value="real">Real</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="s1-loc__md-field-wrapper s1-loc__width--70px">
      <md-field>
        <label for="Product-Price">Valor</label>
        <md-input
          id="Product-Price"
          name="Product-Price"
          type="number"
          @blur="Product.Form.Price = priceCheck(Product.Form.Price)"
          v-model="Product.Form.Price"
          required
        />
      </md-field>
    </div>
    <h2 class="s1-U__text-color--primary md-title s1-U__mg--tp24 s1-U__mg--bt4">
      Certificado
    </h2>
    <p class="s1-U__mg--bt40 md-display-1">...</p>
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
                    :class="{
                      's1-loc__bg-color--grey':
                        Installments[`${pm[0]} ${pm[1]}`].max === n + 1
                    }"
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

    <h2 class="s1-U__text-color--primary md-title s1-U__mg--tp48 s1-U__mg--bt4">
      Comunicação
    </h2>
    <p class="s1-U__mg--bt40 md-display-1">...</p>

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

    <md-dialog :md-active.sync="preDialog" class="s1-U__width--540px">
      <md-dialog-content class="s1-U__pd24">
        <md-steppers :md-active-step.sync="stepperActive" md-vertical>
          <md-step
            id="first"
            md-label="Tipo do produto"
            :md-description="
              stepperActive !== 'first'
                ? ProductPackage === 'with'
                  ? 'Criar produto com pacote'
                  : 'Criar produto sem pacote'
                : ''
            "
            :md-done.sync="first"
          >
            <h2
              class="md-title s1-U__text-color--primary s1-U__mg--tp16 s1-U__mg--bt16"
            >
              Selecione o tipo de produto
            </h2>
            <div class="s1-U__pd--lt16">
              <md-radio class="s1-U__mg0" v-model="ProductPackage" value="with"
                >Criar produto com pacote</md-radio
              >
            </div>
            <div class="s1-U__pd--lt16">
              <md-radio
                class="s1-U__mg0 s1-U__mg--tp8"
                v-model="ProductPackage"
                value="without"
                >Criar produto sem pacote</md-radio
              >
            </div>
            <md-button
              class="md-primary s1-U__mg--tp32 s1-md-bordered"
              @click="
                ProductPackage === 'with'
                  ? setDone('first', 'second')
                  : setDone('first', 'third')
              "
            >
              <div class="s1-U__align-children--center">
                <span>Continuar</span>
              </div>
            </md-button>
          </md-step>

          <md-step
            id="second"
            md-label="Tipo de pacote"
            :md-description="
              stepperActive !== 'second'
                ? PackageType === 'sale'
                  ? 'Venda'
                  : 'Benefício'
                : ''
            "
            v-show="ProductPackage === 'with'"
            :md-done.sync="second"
          >
            <h2
              class="md-title s1-U__text-color--primary s1-U__mg--tp16 s1-U__mg--bt16"
            >
              Selecione o tipo de pacote que você quer adicionar
            </h2>
            <div class="s1-U__pd--lt16">
              <md-radio class="s1-U__mg0" v-model="PackageType" value="sale"
                >Venda</md-radio
              >
            </div>
            <div class="s1-U__pd--lt16">
              <md-radio
                class="s1-U__mg0 s1-U__mg--tp8"
                v-model="PackageType"
                value="benefit"
                >Benefício</md-radio
              >
            </div>
            <md-button
              class="md-primary s1-U__mg--tp32 s1-md-bordered"
              @click="setDone('second', 'third')"
            >
              <div class="s1-U__align-children--center">
                <span>Continuar</span>
              </div>
            </md-button>
          </md-step>

          <md-step
            id="third"
            md-label="Vigência do produto"
            :md-description="
              stepperActive !== 'third'
                ? VigenceType === 'with'
                  ? 'Com vigência definida'
                  : 'Sem vigência definida (Recorrente infinito)'
                : ''
            "
            :md-done.sync="third"
          >
            <h2
              class="md-title s1-U__text-color--primary s1-U__mg--tp16 s1-U__mg--bt16"
            >
              Selecione o tipo de vigência do produto
            </h2>
            <div class="s1-U__pd--lt16">
              <md-radio class="s1-U__mg0" v-model="VigenceType" value="with"
                >Com vigência definida</md-radio
              >
            </div>
            <div class="s1-U__pd--lt16">
              <md-radio
                class="s1-U__mg0 s1-U__mg--tp8"
                v-model="VigenceType"
                value="without"
                >Sem vigência definida (Recorrente infinito)</md-radio
              >
            </div>
            <md-button
              class="md-primary s1-U__mg--tp32 s1-md-bordered"
              @click="setDone('third', 'fourth')"
            >
              <div class="s1-U__align-children--center">
                <span>Continuar</span>
              </div>
            </md-button>
          </md-step>
          <md-step id="fourth" md-label="Conclusão" :md-done.sync="fourth">
            <h2
              class="md-title s1-U__text-color--primary s1-U__mg--tp16 s1-U__mg--bt16"
            >
              Resumo do novo produto:
            </h2>
            <ul class="s1-U__pd--lt16">
              <li>
                {{
                  ProductPackage === 'with'
                    ? 'Produto com pacote;'
                    : 'Produto sem pacote;'
                }}
              </li>
              <li v-if="ProductPackage === 'with'">
                {{
                  PackageType === 'sale'
                    ? 'Listar pacotes para venda;'
                    : 'Listar pacotes para benefício;'
                }}
              </li>
              <li>
                {{
                  VigenceType === 'with'
                    ? 'Com vigência definida.'
                    : 'Sem vigência definida (será recorrente infinito).'
                }}
              </li>
            </ul>
            <div class="s1-U__text-align--right">
              <md-button
                class="md-raised md-primary s1-U__mg--tp32"
                @click="preDialog = false"
                >Criar produto</md-button
              >
            </div>
          </md-step>
        </md-steppers>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ProductForm',
  data: () => ({
    showDialog: false,
    preDialog: true,
    stepperActive: 'first',
    first: false,
    second: false,
    third: false,
    fourth: false,
    ProductPackage: 'with',
    VigenceType: 'with',
    PackageType: 'sale',
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
      }, 100);
    },
    vigenceCheck(vigence) {
      return !vigence || vigence === '0' ? 1 : vigence;
    },
    priceCheck(price) {
      return !price || parseFloat(price) < 0.01 ? 0 : price;
    },
    setDone(id, index) {
      this[id] = true;

      if (index) {
        this.stepperActive = index;
      }
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
