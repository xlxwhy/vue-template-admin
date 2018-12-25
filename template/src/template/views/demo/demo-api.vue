<template>
  <div class="dashboard-container">
    <div v-for="(item,i) in table.data" v-bind:key="i">
      {{item.memberId}}-{{item.memberName}}
    </div>

  </div>
</template>
<script>
{{#useCommonLayer }}
import MemberApi from "common-layer/apis/infra-member/MemberApi.js";
{{else}}
import MemberApi from "@/../library/apis/infra-member/MemberApi.js"; 
{{/useCommonLayer }}

export default {
  data() {
    return {
      table: {
        data: []
      }
    };
  },
  mounted() {
    this.loadMemers();
  },
  methods: {
    loadMemers() {
      MemberApi.list({}, res => {
        this.table.data = res.data.list;
      });
    }
  }
};
</script>

<style lang="scss">
.dashboard-container {
  padding: 10px 30px;
}
</style>
