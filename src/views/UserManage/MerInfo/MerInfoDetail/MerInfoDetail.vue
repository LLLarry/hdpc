<template>
  <div class="merInfoDetail">
    <el-card class="box-card">
      <el-divider content-position="center">
        转移<span class="merName">张三</span>下的用户和设备
      </el-divider>
      <el-row ref="row">
        <el-col :span="8">
          <div class="left_title">张三商户下的用户和设备</div>
          <div class="grid-content bg-purple">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="areaname" label="小区名称" min-width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="userNum" label="用户数量" min-width="100">
                <template slot-scope="{row}">
                  <el-link type="primary">{{row.userNum}}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="deviceNum" label="设备数量" min-width="100">
                <template slot-scope="{row}">
                  <el-link type="primary">{{row.deviceNum}}</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple-light centerWarpper" ref="centerWarpper">
            <el-button type="primary" size="middle" @click="handleTransfer">
              批量转移到右边商户
              <i class="el-icon-d-arrow-right el-icon--right"></i>
            </el-button>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="search">
              <el-select v-model="merInfoDetailForm.type" size="small" placeholder="请选择">
                <el-option label="商户电话" value="1"></el-option>
                <el-option label="商户昵称" value="2"></el-option>
                <el-option label="商户姓名" value="3"></el-option>
              </el-select>
              <el-input v-model="merInfoDetailForm.search" size="small" placeholder="请搜索商户" />
              <el-button type="primary" size="small">搜索</el-button>
            </div>
            <el-table :data="merInfo" style="width: 100%" border :show-header="false">
              <el-table-column prop="title" label="日期" min-width="180"></el-table-column>
              <el-table-column prop="content" label="姓名" min-width="180" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="deleteBtn">
              <el-button type="danger" size="small">清除当前商户</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          areaname: "莲花小区1",
          userNum: 135,
          deviceNum: 5
        },
        {
          areaname: "莲花小区2",
          userNum: 135,
          deviceNum: 5
        },
        {
          areaname: "莲花小区3",
          userNum: 135,
          deviceNum: 5
        },
        {
          areaname: "莲花小区4",
          userNum: 135,
          deviceNum: 5
        },
        {
          areaname: "莲花小区5",
          userNum: 135,
          deviceNum: 5
        },
        {
          areaname: "莲花小区6",
          userNum: 135,
          deviceNum: 5
        },
        {
          areaname: "未绑定小区",
          userNum: 523,
          deviceNum: 12
        }
      ],
      merInfo: [
        {
          title: "商户姓名",
          content: "测试姓名"
        },
        {
          title: "商户昵称",
          content: "测试昵称"
        },
        {
          title: "电话",
          content: "156323XXXXXX"
        }
        //  {
        //   title: '',
        //   content: '测试姓名'
        // },
      ],
      merInfoDetailForm: {
        type: "1"
      },
      multipleSelection: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.centerWarpper.style.height =
        this.$refs.row.$el.offsetHeight + "px";
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleTransfer() {
      console.log(this.multipleSelection);
    }
  }
};
</script>

<style lang="less">
.merInfoDetail {
  .left_title {
    text-align: center;
    margin-bottom:15px;
  }
  .merName {
    font-weight: bold;
    color: #409eff;
  }
  .el-col {
    .centerWarpper {
      position: relative;
      button {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
      }
    }
  }
  .search {
    height: 60px;
    padding: 12px 12px 18px 12px;
    box-sizing: border-box;
    .el-select {
      width: 30%;
      .el-input {
        margin-right: 0;
        width: 100%;
      }
    }
    .el-input {
      width: 50%;
    }
  }
  .deleteBtn {
    padding: 18px 12px 12px 12px;
    text-align: center;
    .el-button {
      width: 50%;
    }
  }
}
</style>