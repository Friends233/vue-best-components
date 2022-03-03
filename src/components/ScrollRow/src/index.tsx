/*
 * @Description: 滑动的row
 * @Author: Friends233
 */
import Vue from "vue";
import styles from "./index.module.scss";
import { ConfigType } from "./type";

export default Vue.extend({
  name: "ScrollRow",
  props:{
    propconfig:{},
    config:{
      type:Object
    }
  },
  data() {
    return {
      top: 0,
      interval: null,
      rowHeight: 0
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    duration(){
      return this.propconfig.duration
    },
    configList() {
      return (this.propconfig && this.propconfig.list) || [];
    },
    renderRow() {
      return this.propconfig.renderRow;
    },
    // 实际盒子的高度
    contentHeight() {
      return this.rowHeight * this.configList.length;
    },
    // 显示窗口的高度
    viewHeight() {
      const { View } = this.$refs;
      return View.getBoundingClientRect().height;
    },
  },
  methods: {
    init() {
      const { Row } = this.$refs;
      this.rowHeight = Row.getBoundingClientRect().height;

      const { Content } = this.$refs;
      Content.innerHTML = Content.innerHTML + Content.innerHTML;
      this.start();
    },
    start() {
      clearInterval(this.interval);
      const Marqueehq = () => {
        if (this.top <= -this.contentHeight) {
          this.top = 0;
        } else {
          this.top -= 1;
        }
      };
      this.interval = setInterval(Marqueehq, this.duration);
    },
    stopAnimation() {
      clearInterval(this.interval)
    },
  },
  render() {
    const { configList, renderRow } = this;
    const newStyle = {
      top: this.top + "px",
    };
    return (
      <div
        // {...{
        //   on: { focus: this.stopAnimation, blur: () => console.log("blur"),click:()=>console.log('click') },
        // }}
        ref="View"
        class={styles["scorll-wrapper"]}
      >
        <div ref="Content" style={newStyle} class={styles["content-wrapper"]}>
          {configList.map((item, index) => {
            return (
              <div ref="Row" class={styles["scorll-row"]}>
                {renderRow && renderRow({ ...item }, index)}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
