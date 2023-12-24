<template>
    <div>
      <div v-for="tab in tabs" :key="tab.id" @click="selectTab(tab.id)">
        {{ tab.label }}
      </div>
      <div v-if="selectedTab">
        <component :is="selectedTab.component"></component>
      </div>
    </div>
  </template>
  <script >
  export default {
    data() {
      return {
        tabs: [
          { id: 1, label: 'Tab 1', component: 'CreateSurvey' },
          { id: 2, label: 'Tab 2', component: 'Questions' },
          { id: 3, label: 'Tab 3', component: 'Response' },
          { id: 4, label: 'Tab 4', component: 'Statis' },
          
        ],
        selectedTab: null,
      };
    },
    methods: {
      selectTab(tabId) {
        this.selectedTab = this.tabs.find(tab => tab.id === tabId);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  
  </style>