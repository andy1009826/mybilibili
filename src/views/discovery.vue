<template>
  <div class="discovery">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommond">
      <h3>推荐歌单</h3>
      <div class="items">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="item-wrap">
            <div class="item-txt">
              <span class="txt">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont play-btn"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="music">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div v-for="(item, index) in music" :key="index" class="item">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont play-btn"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">
              {{ item.name }}
            </div>
            <div class="songer">
              {{ item.song.artists[0].name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 最新MV -->
    <div class="mvs">
      <h3 class="title">最新MV</h3>
      <div class="items">
        <div v-for="(item, index) in mvs" :key="index" class="item">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <div class="num-wrap">
              <span class="iconfont play-num">{{ item.playCount }}</span>
            </div>
            <span class="iconfont play-btn"></span>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.copywriter }}</div>
            <div class="singer">{{ item.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
export default {
  name: "discovery",
  data() {
    return {
      // 轮播图
      banners: [],
      //存储推荐歌单
      list: [],
      // 存储最新音乐
      music: [],
      // 存储最新MV
      mvs: [],
    };
  },
  created() {
    // 轮播图
    axios({
      url: "https://autumnfish.cn/banner",
      method: "get",
      params: {},
    }).then((res) => {
      // console.log(res);
      this.banners = res.data.banners;
    });

    // 推荐歌单
    axios({
      url: "https://autumnfish.cn/personalized",
      method: "get",
      params: {
        // 获取的数据量
        limit: 10,
      },
    }).then((res) => {
      // console.log(res);
      this.list = res.data.result;
    });

    // 最新音乐
    axios({
      url: "https://autumnfish.cn/personalized/newsong",
      method: "get",
      params: {},
    }).then((res) => {
      // console.log(res);
      this.music = res.data.result;
    });

    // 推荐mv
    axios({
      url: "https://autumnfish.cn/personalized/mv",
      method: "get",
      params: {},
    }).then((res) => {
      this.mvs = res.data.result;
    });
  },
  methods: {
    playMusic(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        // console.log(res);
        let url = res.data.data[0].url;
        // 设置给父组件的播放地址
        this.$parent.musicUrl = url;
      });
    },
  },
};
</script>

<style>
@import "../assets/style/discovery.css";
</style>
