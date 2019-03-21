<template>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </el-form>

</template>

<script>
export default {
  name: 'FormCondition',
  watch: {
    properties (props) {
      if(props.length < 3) {
        this.line = 0
      } else if (props.length -2 % 3 == 0) {
        this.line = props.length / 3
      } else {
        this.line = props.length / 3 + 1
      }
    }
  },
  data () {
    return {
      line : 0
    }
  },
  props: {
    properties: {
      type: Array,
      required: true
    }
  }
}
</script>