<template>
  <div class="song-list">
    <!-- 头部卡片开始 -->
    <div class="top-card">
      <div class="img-wrap">
        <img :src="toplist.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">{{ toplist.name }}</div>
        <div class="info">
          {{ toplist.description }}
        </div>
        <img :src="toplist.coverImgUrl" alt="" />
        <div class="bg-mask"></div>
      </div>
    </div>
    <!-- 头部卡片结束 -->

    <!-- tab栏开始 -->
    <div class="tab-container">
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: select == '全部' }"
          @click="select = '全部'"
          >全部</span
        >
        <span
          class="item"
          :class="{ active: select == '欧美' }"
          @click="select = '欧美'"
          >欧美</span
        >
        <span
          class="item"
          :class="{ active: select == '华语' }"
          @click="select = '华语'"
          >华语</span
        >
        <span
          class="item"
          :class="{ active: select == '流行' }"
          @click="select = '流行'"
          >流行</span
        >
        <span
          class="item"
          :class="{ active: select == '说唱' }"
          @click="select = '说唱'"
          >说唱</span
        >
        <span
          class="item"
          :class="{ active: select == '摇滚' }"
          @click="select = '摇滚'"
          >摇滚</span
        >
        <span
          class="item"
          :class="{ active: select == '民谣' }"
          @click="select = '民谣'"
          >民谣</span
        >
        <span
          class="item"
          :class="{ active: select == '电子' }"
          @click="select = '电子'"
          >电子</span
        >
        <span
          class="item"
          :class="{ active: select == '轻音乐' }"
          @click="select = '轻音乐'"
          >轻音乐</span
        >
        <span
          class="item"
          :class="{ active: select == '影视原声' }"
          @click="select = '影视原声'"
          >影视原声</span
        >
        <span
          class="item"
          :class="{ active: select == 'ACG' }"
          @click="select = 'ACG'"
          >ACG</span
        >
        <span
          class="item"
          :class="{ active: select == '怀旧' }"
          @click="select = '怀旧'"
          >怀旧</span
        >
        <span
          class="item"
          :class="{ active: select == '治愈' }"
          @click="select = '治愈'"
          >治愈</span
        >
        <span
          class="item"
          :class="{ active: select == '旅行' }"
          @click="select = '旅行'"
          >旅行</span
        >
      </div>
      <div class="tab-content">
        <div class="items">
          <div v-for="(item, index) in songlist" :key="index" class="item">
            <div class="img-wrap">
              <div class="num-wrap">播放量：{{ item.playCount }}</div>
              <img :src="item.coverImgUrl" alt="" />
              <div class="iconfont play-btn"></div>
            </div>
            <p class="name">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- tab栏结束 -->

    <!-- 分页菜单开始 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    >
    </el-pagination>
    <!-- 分页菜单结束 -->
  </div>
</template>
b
<script>
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      // 总页数
      total: 0,
      // 当前页码
      page: 1,
      // 顶部的精品歌单
      toplist: {},
      // 歌单列表
      songlist: [],
      // 当前选择的数据
      select: "全部",
    };
  },
  //  侦听器
  watch: {
    select() {
      // 顶部的精品歌单
      this.topData();
      // 歌单列表
      this.listData();
      this.page = 1;
    },
  },

  created() {
    // 顶部的精品歌单
    this.topData();
    // 歌单列表
    this.listData();
  },
  methods: {
    // 抽取的方法1 顶部的精品歌单
    topData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.select,
        },
      }).then((res) => {
        // console.log(res);
        this.toplist = res.data.playlists[0];
      });
    },
    // 抽取的方法2 歌单列表
    listData() {
      axios({
        url: "https://autumnfish.cn/top/playlist",
        method: "get",
        params: {
          limit: 10,
          // 用于分页，（页数-1）*limit
          offset: (this.page - 1) * 10,
          cat: this.select,
        },
      }).then((res) => {
        // console.log(res);
        // 保存总条数
        this.total = res.data.total;
        this.songlist = res.data.playlists;
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页：${val}`);
      this.page = val;
      // 重新获取数据
      this.listData();
    },
  },
};
</script>

<style>
@import "../assets/style/songlist.css";
</style>
