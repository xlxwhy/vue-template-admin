<template>
  <section>
    <div>
      <el-upload action="http://image.mwt315.com/file/resource/json" :on-preview="handlePictureCardPreview" :on-change="handleChange" :on-remove="handleRemove" :file-list="fileList" list-type="picture-card" :auto-upload="false" :disabled="disabled">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">只能上传最多\{{maxNum}}张图片，每张大小不超过5M</div>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="small">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </section>
</template>
<script>
import { uploadPic } from "../apis/common.js";

export default {
  props: ["shouldSubmit", "maxNum"],
  data() {
    return {
      disabled: false,
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  watch: {
    shouldSubmit(val) {
      if (val) {
        this.submitUpload();
      }
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      // const isJPG = (file.type === 'image/jpeg');
      const isLt5M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      // this.$message.error('上传头像图片只能是 JPG 格式!');
      // return fileList.pop();
      // }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return fileList.pop();
      }
      console.log(file, fileList);
      this.fileList = fileList.slice(-this.maxNum);
      if (this.fileList.length == this.maxNum) {
        this.disabled = true;
        // $('.el-upload').hide();
        document.getElementsByClassName(".el-upload").hide();
      }
      // this.fileList = fileList.slice(-3);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList.slice(-this.maxNum);
      if (this.fileList.length < this.maxNum) {
        this.disabled = false;
        setTimeout(function() {
          $(".el-upload").show();
        }, 500);
      }
    },

    submitUpload() {
      let that = this;
      if (typeof FileReader == "undefined") {
        return that.$message({
          message: "当前浏览器版本过低，不支持图片上传。请更新浏览器版本。",
          type: "error"
        });
      } else {
        let total = that.fileList.length;
        if (total == 0) {
          return that.$emit("done", imgs);
        }
        let num = 0;
        let imgs = [];
        let reader = new FileReader();
        for (let item in that.fileList) {
          let file = that.fileList[item];
          let suffix = file.name.substring(
            file.name.lastIndexOf(".") + 1,
            file.name.length
          );
          let reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e) {
            let fileBuffer = this.result.split(",")[1];
            let para = {
              extension: suffix,
              module: "refund",
              fileBuffer: fileBuffer,
              fileName: file.name
            };
            uploadPic(para)
              .then(res => {
                imgs.push(res.data);
                console.log(imgs);
                num++;
                if (num == total) {
                  that.$emit("done", imgs);
                }
              })
              .catch(err => {
                that.$message({
                  message: "成功上传" + num + "张图片后发生异常：" + err,
                  type: "error"
                });
                that.$emit("done", imgs);
              });
          };
        }
      }
    }
  },
  mounted() {}
};
</script>