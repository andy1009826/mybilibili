<template>
  <div class="tab-container">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }"
        >全部</span
      >
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }"
        >华语</span
      >
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }"
        >日本</span
      >
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }"
        >韩国</span
      >
    </div>
    <div class="tab-content">
      <thead>
        <th class="index"></th>
        <th class="img"></th>
        <th class="title">音乐标题</th>
        <th class="singer">歌手</th>
        <th class="album">专辑</th>
        <th class="time">时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <span
                @click="playMusic(item.id)"
                class="iconfont play-btn"
              ></span>
            </div>
          </td>
          <td>
            {{ item.name }}
            <span v-if="item.mvid != 0" class="iconfont play-mv"> </span>
          </td>
          <td>
            {{ item.artists[0].name }}
          </td>
          <td>
            {{ item.album.name }}
          </td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "music",
  data() {
    return {
      // 歌曲列表
      lists: [],
      // 分类
      tag: "0",
    };
  },
  watch: {
    tag() {
      this.getlist();
    },
  },
  created() {
    // 获取最新音乐数据
    this.getlist();
  },
  methods: {
    // 抽取方法 获取最新音乐数据
    getlist() {
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        // console.log(res);
        this.lists = res.data.data;
        // 处理时长 毫秒转为分 秒
        for (let i = 0; i < this.lists.length; i++) {
          // 获取总毫秒数
          let duration = this.lists[i].duration;
          let min = parseInt(duration / 1000 / 60);
          min = min < 10 ? "0" + min : min;
          let sec = parseInt((duration / 1000) % 60);
          sec = sec < 10 ? "0" + sec : sec;
          // console.log(min, sec);
          this.lists[i].duration = `${min} : ${sec}`;
        }
      });
    },
    //  播放歌曲
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

        this.$parent.musicUrl = url;
      });
    },
  },
};
</script>

<style>
@import "../assets/style/music.css";
</style>
