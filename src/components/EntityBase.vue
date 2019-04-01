<template>
  <div>JUST A SIMPLE TEMPLATE, SON</div>
</template>

<script>
import * as U from '../assets/utils/index.js';
import _ from 'lodash';

export default {
  name: 'EntityBase',
  methods: {
    setMockData(entityName) {
      this[entityName].Data = [
        ..._.cloneDeep(this[entityName].Data),
        ..._.cloneDeep(this[entityName].MockData)
      ];
      this.updateStoreData(entityName, this[entityName].Data);
    },
    create(entityName, idToFocus = null) {
      this[entityName].Form = _.cloneDeep(this[entityName].DefaultForm);
      this[entityName].Form.Id = U.randomString(64, '#aA');

      this[entityName].CreatingInterface = true;

      if (idToFocus) {
        setTimeout(() => {
          if (document.getElementById(idToFocus))
            document.getElementById(idToFocus).focus();
        }, 300);
      }
    },
    edit(entityName, id, idToFocus = null) {
      this[entityName].Form = {
        ..._.cloneDeep(U.getObjByProp(this[entityName].Data, id, 'Id'))
      };
      this[entityName].EditingInterface = true;

      if (idToFocus) {
        setTimeout(() => {
          if (document.getElementById(idToFocus))
            document.getElementById(idToFocus).focus();
        }, 300);
      }
    },
    discardEditing(entityName) {
      this[entityName].Form = _.cloneDeep(this[entityName].DefaultForm);
      this[entityName].DiscardEditingInterface = false;
      this[entityName].EditingInterface = false;
      this.$v[entityName].Form.$reset();
    },
    discardCreating(entityName) {
      this[entityName].Form = _.cloneDeep(this[entityName].DefaultForm);
      this[entityName].DiscardCreatingInterface = false;
      this[entityName].CreatingInterface = false;
      this.$v[entityName].Form.$reset();
    },
    remove(entityName, id, prop, label) {
      let name = U.getPropById(this[entityName].Data, id, prop);
      this[entityName].DeleteConfirmation = true;
      this[entityName].DeleteInfo = {
        Id: id,
        Title: `Delete ${label} ${name}?`,
        Content: `Deleting ${label} ${name} will not be able to retrieve this data.`
      };
    },
    removeItem(entityName, id) {
      this[entityName].Data = _.cloneDeep(this[entityName].Data).filter(
        item => item.Id !== id
      );
      this[entityName].SuccessFeedbackDeletion = true;
      this.updateStoreData(entityName, this[entityName].Data);
      this.$forceUpdate();
    },
    saveCreated(entityName, end = false) {
      this[entityName].Loading = true;
      let self = this;

      setTimeout(() => {
        self[entityName].Data = !end
          ? U.addNewItemAbove(self[entityName].Data, {
              ...this[entityName].Form
            })
          : U.addNewItemBelow(self[entityName].Data, {
              ...this[entityName].Form
            });
      }, 1000);

      setTimeout(() => {
        self[entityName].Loading = false;
        self[entityName].CreatingInterface = false;
        self[entityName].SuccessFeedbackCreating = true;
        self.$v[entityName].Form.$reset();
        self[entityName].Form = _.cloneDeep(self[entityName].DefaultForm);
        self.updateStoreData(entityName, self[entityName].Data);
        self.$forceUpdate();
      }, 1200);
    },
    saveEdited(entityName) {
      this[entityName].Loading = true;
      let self = this;

      setTimeout(() => {
        self[entityName].Data = self[entityName].Data.map(item => {
          if (item.Id === this[entityName].Form.Id)
            return this[entityName].Form;
          return item;
        });
      }, 1000);

      setTimeout(() => {
        self[entityName].Loading = false;
        self[entityName].EditingInterface = false;
        self[entityName].SuccessFeedbackEditing = true;
        self.$v[entityName].Form.$reset();
        self[entityName].Form = _.cloneDeep(self[entityName].DefaultForm);
        self.updateStoreData(entityName, self[entityName].Data);
        self.$forceUpdate();
      }, 1200);
    },
    detail(entityName, obj) {
      this[entityName].Detailed = _.cloneDeep(obj);
      this[entityName].DetailInterface = true;
    },
    closeDetail(entityName) {
      this[entityName].DetailInterface = false;
      this[entityName].Detailed = null;
    }
  }
};
</script>
