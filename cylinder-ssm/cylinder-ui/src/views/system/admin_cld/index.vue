<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="钢印号" prop="stampId">
        <el-input
          v-model="queryParams.stampId"
          placeholder="请输入钢印号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="气站名" prop="stationName">
        <el-input
          v-model="queryParams.stationName"
          placeholder="请输入气站名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产日期" prop="createDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.createDate"
          value-format="yyyy-MM-dd"
          placeholder="选择生产日期"
          type="date"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="是否绑定" prop="isBind">
        <el-select v-model="queryParams.isBind" placeholder="请选择绑定状态" clearable size="small">
          <el-option
            v-for="dict in isBindOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格(KG)" prop="spec">
        <el-select v-model="queryParams.spec" placeholder="请选择规格" clearable size="small">
          <el-option
            v-for="dict in specOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="租用价格" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入租用价格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="录入人" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入录入人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="录入时间" prop="entryTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.entryTime"
          value-format="yyyy-MM-dd"
          placeholder="选择录入时间"
          type="date"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:admin_cld:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="cldList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="钢印号" align="center" prop="stampId">
        <template scope="scope">
          <span
            style="color:#1990FF;cursor:pointer;"
            @click="clickStampId(scope.row)"
          >{{ scope.row.stampId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="气站名" align="center" prop="stationName" />
      <el-table-column label="生产日期" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否绑定" align="center" prop="isBind" :formatter="isBindFormat" />
      <el-table-column label="规格(KG)
" align="center" prop="spec" />
      <el-table-column label="租用价格" align="center" prop="price" />
      <el-table-column label="录入人" align="center" prop="userName" />
      <el-table-column label="录入时间" align="center" prop="entryTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="comment" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog title="订单详情" :visible.sync="detailVisible" border stripe center width="30%">
      <div style="height: 50px">
        钢印号：
        <span style="color:#135D55">{{cldDetail.stampId}}</span>
      </div>
      <div style="height: 50px">
        最后一次交接处：
        <span style="color:#135D55">{{cldDetail.location}}</span>
      </div>
      <div style="height: 50px">
        递交人：
        <span style="color:#135D55">{{cldDetail.fromUserName}}</span>
      </div>
      <div style="height: 50px">
        接收人：
        <span style="color:#135D55">{{cldDetail.nickName}}</span>
      </div>
      <div style="height: 50px">
        时间：
        <span style="color:#135D55">{{parseTime(cldDetail.moveTime)}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog title="温馨提示" :visible.sync="detailVisible" center width="30%">
      <span>同一账号已在另一设备登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">退出</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import {
  listCld,
  getCld,
  delCld,
  addCld,
  updateCld,
  exportCld,
  getCldDetail,
  getAddress
} from "@/api/system/admin_cld";

export default {
  name: "adminCld",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 是否显示详情
      detailVisible: false,
      // cld详情
      cldDetail: {},
      // 总条数
      total: 0,
      // cylinder数据表格数据
      cldList: [],
      // 规格字典
      specOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否绑定钢瓶，0：未绑定；1：已绑定字典
      isBindOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        stampId: undefined,
        stationName: undefined,
        createDate: undefined,
        disposeDate: undefined,
        isBind: undefined,
        userName: undefined, //录入人
        entryTime: undefined,
        spec: undefined,
        price: undefined,
        comment: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      detailParams: {
        stampId: ""
      },
      getAddrParams: {
        location: "",
        key: "H2PBZ-DNM3G-4CVQO-IRH4G-3JDO5-R6BRC"
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("cld_spec").then(response => {
      this.specOptions = response.data;
    });
    this.getDicts("is_bind").then(response => {
      this.isBindOptions = response.data;
    });
  },
  methods: {
    //获取描述地址
    clickGetAddress(params) {
      getAddress(params).then(response => {
        this.cldDetail.location = response.result.address;
        this.detailVisible = true;
      });
    },
    clickStampId(row) {
      //row是个对象
      this.detailParams.stampId = row.stampId;
      getCldDetail(this.detailParams).then(response => {
        this.cldDetail = response.rows[0];
        this.getAddrParams.location = this.cldDetail.location;
        this.clickGetAddress(this.getAddrParams);
      });
    },
    /** 查询cylinder数据列表 */
    getList() {
      this.loading = true;
      listCld(this.queryParams).then(response => {
        this.cldList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 是否绑定钢瓶，0：未绑定；1：已绑定字典翻译
    isBindFormat(row, column) {
      return this.selectDictLabel(this.isBindOptions, row.isBind);
    },
    // 规格字典翻译
    specFormat(row, column) {
      return this.selectDictLabel(this.specOptions, row.spec);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        stampId: undefined,
        stationName: undefined,
        createDate: undefined,
        disposeDate: undefined,
        isBind: undefined,
        userName: undefined,
        entryTime: undefined,
        spec: undefined,
        price: undefined,
        comment: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有cylinder数据数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportCld(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    }
  }
};
</script>