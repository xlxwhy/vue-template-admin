<template>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" width="50%">
        <div class="pic-zoom">
            <img :src="getPicServer + src" />
        </div>
    </el-dialog>
</template>

<script>
import { getPicServer } from "@/apis/common";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(state) {
      this.dialogVisible = state;
    }
  },
  data() {
    return {
      dialogVisible: false,
      getPicServer: getPicServer()
    };
  },
  methods: {
    handleClose(done) {
      done();
      this.$emit("update:show", false);
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.pic-zoom {
  text-align: center;
  img {
    max-width: 100%;
    max-height: 600px;
  }
}
</style>
