<template>
  <div class="playlist">
    <!-- 顶部详情 -->
    <div class="top">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <div class="title-wrap">{{ playlist.name }}</div>
        <div class="author-wrap">
          <img :src="playlist.creator.avatarUrl" alt="" />
          <span class="author">{{ playlist.creator.nickname }}</span>
          <span class="time">{{ playlist.createTime }} 创建</span>
        </div>
        <div class="tag">
          <span>标签：</span>

          <span v-for="(item, index) in playlist.tags" :key="index"
            >{{ item }} /
          </span>
        </div>
        <div class="tag">
          <span>简介：</span>
          <span>
            {{ playlist.description }}
          </span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表和评论 -->
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first">
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
              <tr v-for="(item, index) in playlist.tracks" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="img-wrap">
                    <img :src="item.al.picUrl" alt="" />
                    <span
                      @click="playMusic(item.id)"
                      class="iconfont play-btn"
                    ></span>
                  </div>
                </td>
                <td>
                  {{ item.name }}
                  <span v-if="item.mv != 0" class="iconfont play-mv"> </span>
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.al.name }}
                </td>
                <td>{{ item.duration }}</td>
              </tr>
            </tbody>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论(20)" name="second">
          <div class="comment">
            <!-- 热门评论 -->
            <div class="hot">
              <h3>
                热门评论
                <span class="num">({{ this.hotCount }})</span>
              </h3>
              <ul>
                <li
                  v-for="(item, index) in hotcomment"
                  :key="index"
                  class="item"
                >
                  <img :src="item.user.avatarUrl" alt="" />
                  <div class="com-info">
                    <a class="pname" href="#">{{ item.user.nickname }}：</a>
                    <div class="com-content">{{ item.content }}</div>
                    <div class="com-time">
                      <span>2020-04-02</span>
                      <span>10:35:07</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 最新评论 -->
            <div class="new">
              <h3>
                最新评论
                <span class="num">({{ total }})</span>
              </h3>
              <ul>
                <li v-for="(item, index) in comments" :key="index" class="item">
                  <img :src="item.user.avatarUrl" alt="" />
                  <div class="com-info">
                    <a class="pname" href="#">{{ item.user.nickname }}：</a>
                    <div class="com-content">{{ item.content }}</div>
                    <div class="com-time">
                      <span>2020-04-02</span>
                      <span>10:35:07</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 分页区 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      activeName: "second",
      // 歌曲列表
      total: 0,
      page: 1,
      tracks: [],
      limit: 10,
      //   歌单的详情数据
      playlist: {},
      //   热门评论
      hotcomment: [],
      // 热门评论的个数
      hotCount: 0,
      //   最新评论
      comments: [],
      // 最新评论的个数
    };
  },
  created() {
    //   获取歌单的详情
    axios({
      url: "https://autumnfish.cn/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      //   console.log(res);
      //   console.log(res.data.playlist);
      this.playlist = res.data.playlist;
    });

    // 获取评论
    axios({
      url: "https://autumnfish.cn/comment/hot",
      method: "get",
      params: {
        id: this.$route.query.q,
        type: 2,
      },
    }).then((res) => {
      //   console.log(res);
      this.hotcomment = res.data.hotcomments;
      // 保存热门评论的个数
      this.hotCount = res.data.total;
    });

    // 获取最新评论
    axios({
      url: "https://autumnfish.cn/comment/playlist",
      method: "get",
      params: {
        id: this.$route.query.q,
        limit: 5,
        offset: 0,
      },
    }).then((res) => {
      //   console.log(res);
      // 保存最新评论
      this.comments = res.data.comments;
      // 保存最新评论的个数
      this.total = res.data.total;
    });

    // 获歌曲数据
    // this.getlist();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 抽取方法 获取歌曲列表数据
    getlist() {
      axios({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.q,
        },
      }).then((res) => {
        // console.log(res);
        // this.lists = res.data.data;
        // // 处理时长 毫秒转为分 秒
        // for (let i = 0; i < this.lists.length; i++) {
        //   // 获取总毫秒数
        //   let duration = this.lists[i].duration;
        //   let min = parseInt(duration / 1000 / 60);
        //   min = min < 10 ? "0" + min : min;
        //   let sec = parseInt((duration / 1000) % 60);
        //   sec = sec < 10 ? "0" + sec : sec;
        //   // console.log(min, sec);
        //   this.lists[i].duration = `${min} : ${sec}`;
        // }
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
    handleCurrentChange(val) {
      this.page = val;
      // 获取最新评论
      axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 5,
          offset: (this.page - 1) * 10,
        },
      }).then((res) => {
        //   console.log(res);
        // 保存最新评论
        this.comments = res.data.comments;
        // 保存最新评论的个数
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.top {
  margin-top: 100px;
  height: 250px;
  width: 100%;
  /* background-color: pink; */
  overflow: hidden;
}
.top .img-wrap {
  margin: 10px 15px 0 0;
}
.top .img-wrap img {
  width: 230px;
  float: left;
}
.top .info-wrap {
  float: left;
  margin-left: 35px;
}
.top .info-wrap .title-wrap {
  font-size: 18px;
  line-height: 40px;
}
.top .info-wrap .author-wrap img {
  width: 35px;
  border-radius: 50%;
  vertical-align: middle;
}
.top .info-wrap .author-wrap span {
  line-height: 40px;
  margin-left: 15px;
}
.top .info-wrap .author-wrap .time {
  font-size: 14px;
}
.top .info-wrap .tag {
  margin-top: 15px;
  font-size: 18px;
}
.top .info-wrap .tag span {
  list-style: none;
  /* float: left; */
  font-size: 14px;
  display: inline-block;
}
.el-tabs__item.is-active {
  color: #c3473a;
}
.el-tabs__item:hover {
  color: #c3473a;
  cursor: pointer;
}
.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  /* display: inline-block; */
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  /* color: #303133; */
  position: relative;
}

.el-tabs__active-bar {
  background-color: #c3473a;
}

.tab-content thead {
  color: #909399;
}
.tab-content thead th {
  font-size: 14px;
  font-weight: normal;
  height: 40px;
  text-align: left;
}
.tab-content thead th.index {
  width: 50px;
}
.tab-content thead th.img {
  width: 130px;
}
.tab-content thead th.title {
  width: 300px;
}
.tab-content thead th.singer {
  width: 200px;
}
.tab-content thead th.album {
  width: 380px;
}
.tab-content thead th.time {
  width: 50px;
}
.tab-content tbody tr {
  height: 90px;
  box-sizing: border-box;
  padding: 15px 10px;
  font-size: 14px;
}
.tab-content tbody .img-wrap {
  position: relative;
  width: 70px;
  height: 70px;
}
.tab-content tbody .img-wrap img {
  width: 70px;
}
.tab-content tbody .img-wrap .play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  color: #dd6d60;
  font-size: 12px;
  border-radius: 50%;
  background: hsla(0, 0%, 100%, 0.8);
  font-size: 10px;
}
.tab-content tbody .img-wrap .play-btn:after {
  content: "\ea1c";
  transform: translate(0, 6px);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab-content tbody .play-mv {
  color: #dd6d60;
  padding: 0 5px;
  cursor: pointer;
}
.tab-content tbody tr:nth-child(2n + 1) {
  background-color: #fafafa;
}
.tab-content tbody tr:hover {
  background-color: #f5f7fa;
}

/* 评论 */
.comment {
  margin-bottom: 200px;
}
.comment h3 {
  font-weight: 400;
  line-height: 60px;
}
.comment ul li {
  height: 70px;
  width: 50%;
  /* background-color: skyblue; */
  overflow: hidden;
  font-size: 14px;
  border-bottom: 1px solid #f2f2f1;
  margin-bottom: 20px;
}
.comment ul li:last-child {
  border: none;
}
.comment li .pname {
  color: #517eaf;
}
.comment li .com-info .com-content {
  /* float: left; */
  display: inline-block;
}
.comment li .com-info .com-time {
  margin-top: 10px;
}
.comment li .com-info .com-time span {
  padding-right: 10px;
  color: #bebebe;
}
.comment .hot {
  margin-bottom: 50px;
  /* background-color: pink; */
}
.comment li .com-info {
  float: left;
}

.comment ul li img {
  width: 50px;
  border-radius: 50%;
  float: left;
  margin-right: 15px;
}
</style>
