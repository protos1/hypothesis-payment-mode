<template>
  <div id="Profile">
    <!-- MOCK -->
    <div class="s1-prop__auto-gen">
      <md-button class="md-primary md-icon-button squared" @click="setMockData('Profile');">
        <md-icon>person</md-icon>
      </md-button>
    </div>

    <!-- GENERAL LOADING -->
    <div
      class="md-layout md-alignment-center-center s1-loc__loading s1-loc__above-all"
      :class="Profile.Loading && 'active'"
    >
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

    <!-- CONTENT -->
    <profile-content
      :StoreData="StoreData"
      :Profile="Profile"
      :create="create"
      :edit="edit"
      :remove="remove"
      v-if="!Profile.CreatingInterface && !Profile.EditingInterface"
    />

    <!-- DETAILS -->
    <section class="s1-U__width--900px" style="margin: 0 auto;" v-if="Profile.DetailInterface"></section>

    <!-- CREATING -->
    <profile-creating
      :StoreData="StoreData"
      :Profile="Profile"
      :$v="$v"
      :saveCreated="saveCreated"
      :discardCreating="discardCreating"
      v-if="Profile.CreatingInterface"
    />

    <!-- EDITING -->
    <profile-editing
      :StoreData="StoreData"
      :Profile="Profile"
      :$v="$v"
      :saveEdited="saveEdited"
      :discardEditing="discardEditing"
      v-if="Profile.EditingInterface"
    />

    <!-- DELETE -->
    <md-dialog-confirm
      :md-active.sync="Profile.DeleteConfirmation"
      :md-title="Profile.DeleteInfo.Title"
      :md-content="Profile.DeleteInfo.Content"
      md-confirm-text="delete"
      md-cancel-text="back"
      @md-cancel="Profile.DeleteConfirmation = false"
      @md-confirm="removeItem('Profile', Profile.DeleteInfo.Id)"
    />

    <!-- CREATE FEEDBACK -->
    <md-snackbar
      :md-duration="Settings.snackbarDuration"
      :md-active.sync="Profile.SuccessFeedbackCreating"
      md-persistent
    >
      <span>Profile created successfully</span>
      <md-button class="md-accent" @click="Profile.SuccessFeedbackCreating = false">OK</md-button>
    </md-snackbar>

    <!-- EDIT FEEDBACK -->
    <md-snackbar
      :md-duration="Settings.snackbarDuration"
      :md-active.sync="Profile.SuccessFeedbackEditing"
      md-persistent
    >
      <span>Profile edited successfully</span>
      <md-button class="md-accent" @click="Profile.SuccessFeedbackEditing = false">OK</md-button>
    </md-snackbar>

    <!-- DELETE  FEEDBACK -->
    <md-snackbar
      :md-duration="Settings.snackbarDuration"
      :md-active.sync="Profile.SuccessFeedbackDeletion"
      md-persistent
    >
      <span>Profile deleted successfully</span>
      <md-button class="md-accent" @click="Profile.SuccessFeedbackDeletion = false">OK</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import EntityBase from "../EntityBase";

import Profiles from "../../data/Profiles.js";

import ProfileContent from "./ProfileContent.vue";
import ProfileCreating from "./ProfileCreating.vue";
import ProfileEditing from "./ProfileEditing.vue";

export default {
  name: "Profile",
  extends: EntityBase,
  props: {
    StoreData: Object,
    Settings: Object,
    updateStoreData: Function,
    setPage: Function
  },
  components: {
    ProfileContent,
    ProfileCreating,
    ProfileEditing
  },
  data: () => ({
    Profile: {
      Form: {
        Id: null,
        Name: null,
        Abbr: null
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Abbr: null
      },
      Data: [],
      MockData: Profiles,
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
    this.Profile.Data = [...this.StoreData.Profile];
  },
  validations: {
    Profile: {
      Form: {
        Name: {
          required
        },
        Abbr: {
          required
        }
      }
    }
  }
};
</script>
