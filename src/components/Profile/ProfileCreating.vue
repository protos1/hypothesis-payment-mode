<template>
  <section class="s1-U__width--900px" style="margin: 0 auto;">
    <header class="s1-U__pd--bt32 s1-U__pd--tp32">
      <div class="s1-U__align-children--center">
        <md-button
          class="md-icon-button s1-U__mg--rt8"
          @click="Profile.DiscardCreatingInterface = true"
        >
          <md-icon>arrow_back</md-icon>
        </md-button>
        <h1 class="md-display-1">Profile creation</h1>
      </div>
    </header>
    <md-card>
      <div
        class="md-layout md-alignment-center-center s1-loc__loading"
        :class="Profile.CreatingFormLoading && 'active'"
      >
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
      <md-content class="md-scrollbar s1-U__pd16 s1-U__pd--lt48" style="overflow: auto">
        <profile-form :StoreData="StoreData" :Profile="Profile" :$v="$v"></profile-form>
      </md-content>
      <md-card-actions class="s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
        <md-button
          class="md-primary md-raised"
          :disabled="$v.Profile.Form.$invalid"
          @click="saveCreated('Profile')"
        >
          <span class="s1-U__pd--lt8 s1-U__pd--rt8">Create profile</span>
        </md-button>
      </md-card-actions>
    </md-card>

    <md-dialog-confirm
      :md-active.sync="Profile.DiscardCreatingInterface"
      md-title="Discard profile registration?"
      md-content="When you exit, the profile information provided will be discarded."
      md-confirm-text="discard"
      md-cancel-text="back"
      @md-cancel="Profile.DiscardCreatingInterface = false"
      @md-confirm="discardCreating('Profile')"
    />
  </section>
</template>

<script>
import ProfileForm from "./ProfileForm.vue";

export default {
  name: "ProfileCreating",
  components: {
    ProfileForm
  },
  props: {
    Profile: Object,
    StoreData: Object,
    $v: Object,
    saveCreated: Function,
    discardCreating: Function
  }
};
</script>