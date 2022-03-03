<!--
 * @Description: 
 * @Author: Friends233
-->
<script>
import cell from "./cell";
export default {
  name: "SlideItem",
  components: {
    cell,
  },
  props: {
    config: {},
  },
  data() {
    return {
      // itemWidth: 100,
      wrapWidth: 0,
      contentWidth: 0,
      offset: 0,
      leftTimer: null,
      rightTimer: null,
      delay: 1000,
    };
  },
  computed: {
    // 单个item的宽度
    itemWidth() {
      return this.config.itemWidth || 80;
    },
    // 实际content的宽度
    slideWidth() {
      return this.config.list.length * (this.itemWidth + 10);
    },
    // 显示的content的宽度
    conWrapWidth() {
      const { conwrap } = this.$refs;
      return conwrap.getBoundingClientRect().width;
    },
    isOverFlow() {
      return this.slideWidth < this.conWrapWidth;
    },
  },
  methods: {
    // 滚轮事件
    onWheelEvent({ deltaY }) {
      if (deltaY > 0) {
        this.clickRight();
      } else {
        this.clickLeft();
      }
    },
    clickLeft() {
      this.$emit("preLeft");
      if (this.offset === 0 || this.isOverFlow) return;
      if (this.offset + this.itemWidth + 10 < 0) {
        this.offset += this.itemWidth + 10;
      } else {
        this.offset = 0;
      }
    },
    clickRight() {
      this.$emit("preRight");
      if (this.offset === -this.slideWidth + this.conWrapWidth + 10 || this.isOverFlow) {
        return;
      }
      if (this.offset - this.conWrapWidth - this.itemWidth - 10 > -this.slideWidth) {
        this.offset -= this.itemWidth + 10;
      } else {
        this.offset = -this.slideWidth + this.conWrapWidth + 10;
      }
    },
    activeItem(index) {
      if (this.isOverFlow) return;
      if (index > this.config.list.length) {
        index = this.config.list.length;
      } else if (index < 0) {
        index = 0;
      }
      const offsetWidth = Math.max(-index * (this.itemWidth + 10), -this.slideWidth + this.conWrapWidth + 10);
      this.offset = offsetWidth;
    },
  },
  render() {
    // TODO VIEW
    const contentStyle = {
      width: this.slideWidth + "px",
      transform: this.offset ? `translateX(${this.offset}px)` : "",
      transitionDuration: this.delay / 1000 + "s",
    };
    return (
      <div class="slide-item-wrapper" onMousewheel={this.onWheelEvent}>
        <div onClick={this.clickLeft} class="slide-left-btn">
          <button type="button" class="slide-item-btn">
            <i class="el-icon-arrow-left"></i>
          </button>
        </div>
        <div ref="conwrap" class="slide-content-wrapper">
          <div class="slide-content" style={contentStyle}>
            {this.config.list.map((item, index) => {
              return (
                <div class="slide-item" style={{ "flex-basis": this.itemWidth + "px" }} key={index}>
                  <cell index={index} row={item} render={this.config.rowRender} />
                </div>
              );
            })}
          </div>
        </div>
        <div onClick={this.clickRight} class="slide-right-btn">
          <button type="button" class="slide-item-btn">
            <i class="el-icon-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
.slide-item-wrapper {
  position: relative;
  .slide-content-wrapper {
    overflow: hidden;
    height: 100%;
    margin: 0 50px;
    .slide-content {
      height: 100%;
      display: flex;
      .slide-item {
        // flex-basis: 100px;
        flex-shrink: 0;
        height: 100%;
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
  }

  .slide-left-btn,
  .slide-right-btn {
    z-index: 10;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &:first-child {
      left: 10px;
    }
    &:last-child {
      right: 10px;
    }
    .slide-item-btn {
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      height: 36px;
      width: 36px;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 50%;
      background-color: rgba(31, 45, 61, 0.11);
      color: #fff;
      text-align: center;
      font-size: 12px;
      &:hover {
        background-color: rgba(31, 45, 61, 0.23);
      }
    }
  }
}
</style>
