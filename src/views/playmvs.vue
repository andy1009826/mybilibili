<template>
  <div class="playmvs">
    <!-- MV详情 -->
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <div class="video-wrap">
        <video controls :src="url"></video>
      </div>
      <div class="info-wrap">
        <div class="singer-info">
          <div class="img-info">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h1 class="title">{{ mvInfo.name }}</h1>

          <span class="time">发布： 2017-08-03</span>
          <span class="num">播放： {{ mvInfo.playCount }}次</span>
          <p>{{ mvInfo.desc }}</p>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment">
        <!-- 热门评论 -->
        <div class="hot">
          <h2>
            热门评论
            <span class="num">(20)</span>
          </h2>
          <ul>
            <li class="item" v-for="(item, index) in hotComments" :key="index">
              <img :src="item.user.avatarUrl" alt="" />
              <div class="com-info">
                <a class="pname" href="#">{{ item.nickName }}：</a>
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
          <h2>
            最新评论
            <span class="num">({{ total }})</span>
          </h2>
          <ul>
            <li class="item" v-for="(item, index) in comments" :key="index">
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
      <!-- 分页菜单开始 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
      >
      </el-pagination>
      <!-- 分页菜单结束 -->
    </div>
    <!-- 相关推荐 -->
    <div class="mv-recommon">
      <h3 class="title">相关推荐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in simiMvs" :key="index">
          <div class="img-wrap">
            <div class="num-wrap">
              <span class="iconfont ico-play"></span>
              <span class="num">{{ item.playCount }}</span>
            </div>
            <img :src="item.cover" alt="" />
            <div class="iconfont play-btn"></div>
            <span class="time">{{ item.duration }}</span>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 总页数
      total: 0,
      // 当前页码
      page: 1,
      limit: 10,
      // mv地址
      url: "",
      // 相关mv
      simiMvs: [],
      // mv的信息
      mvInfo: [],
      // 歌手头像
      icon: "",
      // 最新评论
      comments: [],
      // 热门评论
      hotComments: [],
      hotCount: "",
    };
  },
  created() {
    // 获取mv播放地址
    axios({
      url: "https://autumnfish.cn/mv/url",
      method: "get",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      // console.log(res);
      this.url = res.data.data.url;
    });
    // 获取相关的mv
    axios({
      url: "https://autumnfish.cn/simi/mv",
      method: "get",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      // console.log(res);
      this.simiMvs = res.data.mvs;
    });
    //获取mv的信息
    axios({
      url: "https://autumnfish.cn/mv/detail",
      method: "get",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      // console.log(res);
      this.mvInfo = res.data.data;
      // 获取歌手信息
      axios({
        url: "https://autumnfish.cn/artists",
        method: "get",
        params: {
          id: this.mvInfo.artists[0].id,
        },
      }).then((res) => {
        // console.log(res);
        this.icon = res.data.artist.picUrl;
      });
    });

    // 获取评论
    axios({
      url: "https://autumnfish.cn/comment/mv",
      method: "get",
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0,
      },
    }).then((res) => {
      console.log(res);
      this.comments = res.data.comments;
      this.hotComments = res.data.hotComments;
      this.hotCount = res.data.total;
      this.total = res.data.total;
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      // 获取最新评论
      axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
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
  transition: 0.5s;
}
.playmvs {
  display: flex;
  margin-top: 60px;
}
.mv-wrap {
  width: 700px;
  /* background-color: pink; */
  margin-right: 35px;
}
.mv-wrap .title {
  margin: 10px 0;
}
.mv-wrap .video-wrap {
  width: 100%;
  height: 390px;
  margin-bottom: 20px;
}
.mv-wrap .video-wrap video {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  outline: none;
}
.mv-wrap .singer-info {
  /* overflow: hidden; */
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  margin-bottom: 30px;
}
.mv-wrap .singer-info .img-info {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}
.mv-wrap .singer-info .img-info img {
  width: 100%;
  height: 100%;
}
.mv-wrap .mv-info span {
  color: #bebebe;
  font-size: 14px;
}

.mv-wrap .comment h2 {
  font-weight: 400;
  line-height: 90px;
}
.comment {
  margin-top: 20px;
}
.comment ul li {
  margin-bottom: 20px;
  width: 100%;
}
.comment ul li:last-child {
  border: none;
}
.comment .hot ul li {
  /* border: none;
  height: 90px; */
}
.mv-recommon {
  flex: 1;
  /* background-color: skyblue; */
}
/* 相关推荐 */
.mv-recommon .item .img-wrap img {
  border-radius: 5px;
  width: 180px;
}
.mv-recommon .title {
  margin: 10px 0;
}
.mv-recommon .item {
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  padding: 10px;
  /* overflow: hidden; */
  box-sizing: border-box;
}
.mv-recommon .item:hover {
  background-color: #f5f7fa;
}
.mv-recommon .item .img-wrap {
  position: relative;
  color: #fff;
  font-size: 14px;
}
.mv-recommon .item .img-wrap .num-wrap {
  position: absolute;
  top: 0;
  right: 2px;
}
.mv-recommon .item .img-wrap .time {
  position: absolute;
  bottom: 3px;
  right: 5px;
}
.mv-recommon .item .img-wrap .play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 12px;
  border-radius: 50%;
  background: hsla(0, 0%, 100%, 0.8);
  font-size: 10px;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mv-recommon .item .img-wrap .play-btn:after {
  content: "\ea1c";
  font-size: 28px;

  transform: translate(2px, 1px);
}
.mv-recommon .item .img-wrap:hover .play-btn {
  opacity: 1;
}
.iconfont {
  font-family: "icomoon";
}
.mv-recommon .item .info-wrap {
  margin-left: 10px;
  font-size: 16px;
}
.mv-recommon .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>
