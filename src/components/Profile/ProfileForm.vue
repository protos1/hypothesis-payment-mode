<template>
  <div>
    <div class="s1-loc__md-field-wrapper s1-U__width--180px">
      <md-field
        class="md-field-helper-text"
        :class="{
          'md-invalid md-field-helper-text':
            $v.Profile.Form.Name.$dirty && $v.Profile.Form.Name.$invalid
        }"
      >
        <label for="Profile-Name">Nome</label>
        <md-input
          id="Profile-Name"
          name="Profile-Name"
          type="text"
          @blur="$v.Profile.Form.Name.$touch()"
          @focus="$v.Profile.Form.Name.$reset()"
          v-model="Profile.Form.Name"
          maxlength="15"
          required
        ></md-input>
        <span class="md-error" v-if="!$v.Profile.Form.Name.required"
          >Required field</span
        >
      </md-field>
    </div>

    <div class="s1-loc__md-field-wrapper s1-U__width--100px">
      <md-field
        class="md-field-helper-text"
        :class="{
          'md-invalid md-field-helper-text':
            $v.Profile.Form.Abbr.$dirty && $v.Profile.Form.Abbr.$invalid
        }"
      >
        <label for="Profile-Abbr">Abbr</label>
        <md-input
          id="Profile-Abbr"
          name="Profile-Abbr"
          type="text"
          @blur="$v.Profile.Form.Abbr.$touch()"
          @focus="$v.Profile.Form.Abbr.$reset()"
          v-model="Profile.Form.Abbr"
          maxlength="2"
          required
        ></md-input>
        <span class="md-error" v-if="!$v.Profile.Form.Abbr.required"
          >Required</span
        >
      </md-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileForm',
  props: {
    Profile: Object,
    StoreData: Object,
    $v: Object
  }
};
</script>
