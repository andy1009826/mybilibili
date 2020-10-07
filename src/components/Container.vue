<template>
  <div class="container">
    <!-- 左侧导航 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery"
            ><span class="iconfont"></span>发现音乐</router-link
          >
        </li>
        <li>
          <router-link to="/songlist"
            ><span class="iconfont">&nbsp;</span>推荐歌单</router-link
          >
        </li>
        <li>
          <router-link to="/music"
            ><span class="iconfont">&nbsp;</span>最新音乐</router-link
          >
        </li>
        <li>
          <router-link to="/mvs"
            ><span class="iconfont">&nbsp;</span>最新MV</router-link
          >
        </li>
      </ul>
    </div>
    <!-- 右侧主体 -->
    <div class="main">
      <!-- <discovery></discovery> -->
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <!-- autoplay 自动播放 -->
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
// 导入发现音乐组件
// import discovery from "../components/discovery";
export default {
  name: "container",
  data() {
    return {
      musicUrl:
        "http://m801.music.126.net/20201005225712/d31f29a3b…68/b4b1/bfaa/c98df0243b9327189c8cf86c64560963.mp3",
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
}
ul,
li {
  list-style: none;
  margin: 0;
}
a {
  text-decoration: none;
  color: #000;
}
.iconfont {
  font-family: "icomoon";
}
.nav {
  position: fixed;
  top: 60px;
  left: 0px;
  margin: 0;
  width: 200px;
  height: 590px;
  background-color: #f4f4f4;
  z-index: 1;
}

.nav li {
  height: 60px;
}
.nav li a {
  height: 100%;
  width: 100%;
  display: block;
  text-align: center;
  line-height: 60px;
  transition: 0.5s;
  font-size: 18px;
}
.nav li a:hover {
  background-color: rgba(255, 255, 255, 0.6);
}
.main {
  flex: 1;
  margin-left: 200px;
  padding: 10px 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.router-link-active {
  color: #dd6d60;
}
.container .player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.container audio {
  width: 100%;
  border-radius: none;
  outline: none;
}
</style>
