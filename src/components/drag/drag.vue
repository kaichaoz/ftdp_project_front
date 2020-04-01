<!-- 拖拽滑动 -->
<template>
  <div id="default_drag_comp"
    @click="goNext"
    @touchstart="down"
    @touchmove="move"
    @touchend="end"
  >
    <span>询价车</span>
  </div>
</template>

<script>
export default {
  name: "defaultDrag",
  data() {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    goNext() {
      this.$emit("goNext");
    },
    // 实现移动端拖拽
    down() {
      let default_drag_comp = document.querySelector("#default_drag_comp");
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.maxW = document.body.clientWidth - default_drag_comp.offsetWidth;
      this.maxH = document.body.clientHeight - default_drag_comp.offsetHeight;

      this.position.x = touch.clientX - default_drag_comp.offsetLeft;
      this.position.y = touch.clientY - default_drag_comp.offsetTop;
      this.dx = touch.clientX;
      this.dy = touch.clientY;
    },
    move(event) {
      event.preventDefault();
      let default_drag_comp = document.querySelector("#default_drag_comp");
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;

        if (this.nx < 0) {
          this.nx = 0;
        } else if (this.nx > this.maxW) {
          this.nx = this.maxW;
        }

        if (this.ny < 0) {
          this.ny = 0;
        } else if (this.ny >= this.maxH) {
          this.ny = this.maxH;
        }

        default_drag_comp.style.left = this.nx + "px";
        default_drag_comp.style.top = this.ny + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          function() {
            // event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    }
  }
};
</script>
<style scoped lang="scss">
#default_drag_comp {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0.4rem 2px #d3d3d3;
  background: #ff9966;
  position: fixed;
  z-index: 1000;
  bottom: 0.8rem;
  right: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #ffffff;
    font-size: 0.24rem;
  }
}
</style>