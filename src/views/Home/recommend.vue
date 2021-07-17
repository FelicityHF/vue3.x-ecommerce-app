<template>
  <div class="recommend-wrapper">
    <ul class="recommend-ul">
      <li
        class="recommend-ul-li"
        v-for="item in recommendData.slice(0, 4)"
        :key="item.id"
      >
        <a class="recommend-ul-li-link" @click="goProductDetail(item.id)">
          <img v-lazy="item.cover_url" alt="" />
          <div class="recommend-product-desc">{{ item.title }}</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "recommend",
  //   props: ["recommendData"],
  props: {
    recommendData: {
      type: Array,
      default() {
        return []; //默认返回一个空数组，就是数据没加载过来，recommendData是个空数组，也不会出错
      },
    },
  },
  setup() {
    const router = useRouter();
    const goProductDetail = (id) => {
      //   router.push({ path: `/detail/${id}` });//这是配合动态路由的写法
      //可以不使用动态路由
      router.push({ path: "/detail", query: { id } });
    };
    return { goProductDetail };
  },
};
</script>
<style lang="scss" scoped>
.recommend-wrapper {
  height: 100px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 8px;
  .recommend-ul {
    display: flex;
    align-items: center;
    height: 100%;
    &-li {
      width: 25%;
      height: 100%;
      &-link {
        display: flex;
        flex-direction: column;
        height: 100%;
        // padding: 0 16px;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 4px;
        img {
          width: 100%;
        }
        .recommend-product-desc {
          width: 100%;
          padding: 0 6px;
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
          margin-top: 2px;
          text-align: center;
        }
      }
    }
  }
}
</style>