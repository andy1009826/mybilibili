<template>
  <div class="mvs-container">
    <div class="wrap">
      <div class="select-wrap">
        <span class="select-type">地区：</span>
        <ul class="tabs">
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: area == '全部' }"
              @click="area = '全部'"
              >全部</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: area == '内地' }"
              @click="area = '内地'"
              >内地</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: area == '港台' }"
              @click="area = '港台'"
              >港台</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: area == '欧美' }"
              @click="area = '欧美'"
              >欧美</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: area == '日本' }"
              @click="area = '日本'"
              >日本</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: area == '韩国' }"
              @click="area = '韩国'"
              >韩国</a
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型：</span>
        <ul class="tabs">
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: type == '全部' }"
              @click="type = '全部'"
              >全部</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: type == '官方版' }"
              @click="type = '官方版'"
              >官方版</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: type == '原声' }"
              @click="type = '原声'"
              >原声</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: type == '现场版' }"
              @click="type = '现场版'"
              >现场版</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
              >网易出品</a
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">类型：</span>
        <ul class="tabs">
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
              >上升最快</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: order == '最热' }"
              @click="order = '最热'"
              >最热</a
            >
          </li>
          <li class="tab-item">
            <a
              href="#"
              class="title"
              :class="{ active: order == '最新' }"
              @click="order = '最新'"
              >最新</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="mvs">
      <!-- mv列表区 -->
      <div class="items">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="num-wrap">
              <span class="iconfont ico-play"></span>
              <span class="num">{{ item.playCount }}</span>
            </div>
          </div>
          <div class="info-wrap">
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
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
  name: "mvs",
  data() {
    return {
      // 总条数
      total: 20,
      // 当前页码
      page: 1,
      // 每一页的容量
      limit: 8,
      // 地区
      area: "全部",
      // 类型
      type: "全部",
      // 排序
      order: "上升最快",
      // 存储MV列表的数据
      list: [],
    };
  },
  watch: {
    area() {
      // 返回第一页
      this.page = 1;
      this.getList();
    },
    type() {
      // 返回第一页
      this.page = 1;
      this.getList();
    },
    order() {
      // 返回第一页
      this.page = 1;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取MV列表数据
    getList() {
      axios({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
          limit: this.limit,
          area: this.area,
          order: this.order,
          type: this.type,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        // console.log(res);
        this.list = res.data.data;
        // 处理播放次数
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].playCount > 100000) {
            this.list[i].playCount =
              parseInt(this.list[i].playCount / 10000) + "万";
          }
        }

        // 保存总条数
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页：${val}`);
      // 保存页码 重新获取数据
      this.page = val;
      this.getList();
    },
  },
};
</script>

<style>
@import "../assets/style/mvs.css";
</style>
