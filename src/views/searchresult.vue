<template>
  <div class="result">
    <!-- 标题部分 -->
    <div class="title">
      <h2>{{ $route.query.q }}</h2>
      <span class="num">
        找到<span>{{ count }}</span
        >个结果
      </span>
    </div>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="first">
        <thead>
          <th></th>
          <th class="music-title">音乐标题</th>
          <th class="singer">歌手</th>
          <th class="abulm">专辑</th>
          <th class="time">时长</th>
        </thead>
        <tbody>
          <tr
            @dblclick="playMusic(item.id)"
            v-for="(item, index) in songs"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.artists[0].name }}</td>
            <td>{{ item.album.name }}</td>
            <td>{{ item.duration }}</td>
          </tr>
        </tbody>
      </el-tab-pane>
      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="second">
        <div class="items">
          <div v-for="(item, index) in lists" :key="index" class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量：
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont play-btn"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <!-- MV -->
      <el-tab-pane label="MV" name="third">
        <div class="mvs-content">
          <div class="items">
            <div v-for="(item, index) in mvlist" :key="index" class="item">
              <div class="img-wrap">
                <div class="num-wrap">
                  <span class="iconfont ico-play"></span>
                  {{ item.playCount }}
                </div>
                <img :src="item.cover" alt="" />
                <div class="iconfont play-btn"></div>
              </div>
              <div class="info-wrap">
                <div class="title">{{ item.name }}</div>
                <div class="info-txt">{{ item.artistName }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页区 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="5"
      :limit="limit"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 总条数
      total: 20,
      // 当前页码
      page: 1,
      // 每一页的容量
      limit: 10,
      activeName: "second",
      // 存储歌曲的
      songs: [],
      // 搜索歌曲结果的总数
      count: 0,
      //搜索歌单
      lists: [],
      // 搜索MV结果
      mvlist: [],
    };
  },
  created() {
    this.page = 1;
    this.getSong();
    this.getList();
    this.getMvlist();
  },
  // watch() {},
  methods: {
    // 获取歌曲数据
    getSong() {
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          type: 1,
          limit: 10,
        },
      }).then((res) => {
        // console.log(res);
        this.songs = res.data.result.songs;
        // 计算歌曲时间
        for (let i = 0; i < this.songs.length; i++) {
          let min = parseInt(this.songs[i].duration / 1000 / 60);
          min = min < 10 ? "0" + min : min;
          let sec = parseInt((this.songs[i].duration / 1000) % 60);
          sec = sec < 10 ? "0" + sec : sec;
          // console.log(min, sec);
          this.songs[i].duration = `${min} : ${sec}`;
        }
        // 保存搜索结果的总数
        this.count = res.data.result.songCount;
      });
    },

    // 获取歌单的数据
    getList() {
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          type: 1000,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        // console.log(res);
        this.lists = res.data.result.playlists;
        // 播放量
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i].playCount > 100000) {
            this.lists[i].playCount =
              parseInt(this.lists[i].playCount / 10000) + "万";
          }
        }
        // 保存总条数
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },

    // 获取MV数据
    getMvlist() {
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          type: 1004,
          keywords: this.$route.query.q,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        console.log(res);
        this.mvlist = res.data.result.mvs;
        // 处理播放次数
        for (let i = 0; i < this.mvlist.length; i++) {
          if (this.mvlist[i].playCount > 100000) {
            this.mvlist[i].playCount =
              parseInt(this.mvlist[i].playCount / 10000) + "万";
          }
        }
        // 保存总条数
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },

    //双击播放歌曲
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
    handleCurrentChange(val) {
      // 保存页码 重新获取数据
      this.page = val;
      this.getList();
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
@import "../assets/style/searchresult.css";
</style>
