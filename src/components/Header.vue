<template>
  <div class="head-container">
    <div class="box-left">
      <div class="icon-wrapper">
        <span class="icon icon-home"></span>
        <span class="icon icon-select"></span>
        <span class="icon icon-full"></span>
      </div>
      <div class="history-wrapper">
        <a class="iconlink left" href="#"></a>
        <a class="iconlink right" href="#"></a>
      </div>
    </div>
    <div class="box-right">
      <div class="search">
        <input
          v-model="inputValue"
          @keyup.enter="toSearch"
          type="text"
          placeholder="搜索"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      // 如果输入为空  提示
      if (this.inputValue == "") {
        this.$message.warning(`请输入内容`);
      }
      // 如果有输入就跳转
      else {
        this.$router.push("/searchresult?q=" + this.inputValue);
      }
    },
  },
};
</script>

<style>
.head-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #f9f9f9;
  z-index: 999;
}

.box-left {
  height: 60px;
  width: 15px0px;
  background-color: #f9f9f9;
  margin-left: 20px;
  overflow: hidden;
}
.box-left .icon-wrapper {
  height: 60px;
  width: 170px;
  float: left;
}

.box-left .icon-wrapper .icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin: 0 10px 0 0;
  font-size: 14px;
  text-align: center;
  padding: 2px 0;
  box-sizing: border-box;
}
.box-left .icon-wrapper .icon {
  font-family: "icomoon";
}

.box-left .icon-home {
  background-color: #dd6d60;
}

.box-left .icon-select {
  background-color: #dcc060;
}
.box-left .icon-full {
  background-color: #84bb58;
}
.box-left .history-wrapper {
  position: relative;
  height: 60px;
  float: left;
  width: 80px;
  /* background-color: pink; */
}
.box-left .history-wrapper .iconlink {
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  /* background-color: pink; */
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}
.box-left .history-wrapper .iconlink:hover {
  background-color: #ededed;
}
.box-left .history-wrapper .left {
  left: 0;
}
.box-left .history-wrapper .right {
  right: 0;
}
.box-left .history-wrapper .iconlink:after {
  /* position: absolute; */
  content: "";
  display: inline-block;
  width: 9px;
  height: 9px;
  border-top: 2px solid #808290;
}
.box-left .history-wrapper .left:after {
  border-left: 2px solid #808290;
  transform: rotate(-45deg);
}
.box-left .history-wrapper .right:after {
  border-left: 2px solid #808290;
  transform: rotate(135deg);
}
.box-right .search {
  /* position: relative; */
}
.box-right .search input {
  position: absolute;
  top: 15px;
  right: 20px;
  line-height: 28px;
  width: 200px;
  outline: none;
  border: 1px solid #dcdfe6;
  /* color: #dcdfe6; */
  border-radius: 4px;
  padding-left: 15px;
  box-sizing: border-box;
}
</style>
