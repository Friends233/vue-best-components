<!--
 * @Description: 
 * @Author: Friends233
-->
<script lang="tsx">
import ScrollRow from '@/components/ScrollRow'
import { ConfigType } from "@/components/ScrollRow/src/type";

export default {
  name: 'home',
  data(){
    return {
      propconfig: {
        list: Array(20).fill({
          label: "滑动的row",
        }),
        duration:50,
        renderRow: (row, index) => {
          // console.log(row)
          return (
            <div class="custom-row">
              {row.label}:{index}
            </div>
          );
        },
      } as ConfigType,
    }
  },
  components: {
    ScrollRow
  },
  props: {
    msg: String
  },
  methods: {
  },
  render() {
    return (
      <div class="hello">
        <ScrollRow propconfig={this.propconfig} />
      </div>
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom-row {
  height: 30px;

  border: 1px solid red;
  // margin: 5px;
}
</style>
