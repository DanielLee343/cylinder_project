<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="订单编号" prop="orderNum">
        <el-input
          v-model="queryParams.orderNum"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名" prop="clientName">
        <el-input
          v-model="queryParams.clientName"
          placeholder="请输入客户名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当前所属员工" prop="currentStaffName">
        <el-input
          v-model="queryParams.currentStaffName"
          placeholder="当前所属员工"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatusFirst">
        <el-select
          v-model="queryParams.orderStatusFirst"
          placeholder="请选择订单状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in orderStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="钢瓶订单数量" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入订单金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单金额" prop="fee">
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入订单金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单接收时间" prop="acceptDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.acceptDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择订单接收时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="运送到家里的时间" prop="toHouseDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.toHouseDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择运送到家里的时间"
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
          v-hasPermi="['system:order:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单编号" align="center" prop="orderNum" />
      <el-table-column label="客户名" align="center" prop="clientName" />
      <el-table-column label="当前所属员工" align="center" prop="currentStaffName" />
      <el-table-column
        label="订单状态"
        align="center"
        prop="orderStatusFirst"
        :formatter="orderStatusFormat"
      />
      <el-table-column label="订单钢瓶数量" align="center" prop="amount" />
      <el-table-column label="订单金额" align="center" prop="fee" />
      <el-table-column label="订单接收时间" align="center" prop="acceptDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.acceptDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运送到家里的时间" align="center" prop="toHouseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.toHouseDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-info" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog title="订单详情" :visible.sync="detailVisible" border stripe>
      <span v-html="currentOrderNum"></span>
      <el-table :data="detailParams" style="width: 100%">
        <el-table-column prop="cldSpec" label="钢瓶规格(KG)"></el-table-column>
        <el-table-column prop="cldAmount" label="钢瓶数量"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  delOrder,
  addOrder,
  updateOrder,
  exportOrder,
  getOrderDetail
} from "@/api/system/admin_order";

export default {
  name: "Order",
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
      // 总条数
      total: 0,
      // sys_order表表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      //详情显示弹出框
      detailVisible: false,
      // 是否显示弹出层
      open: false,
      // 订单是否结束，0：未接单；1：已接单；2：已入户；3：已入库 字典
      orderStatusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderNum: undefined,
        clientName: undefined,
        currentStaffName: undefined,
        orderStatusFirst: undefined,
        amount: undefined,
        fee: undefined,
        acceptDate: undefined,
        toHouseDate: undefined
      },
      detailParams: {},
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      currentOrderNum: ""
    };
  },
  created() {
    this.getList();
    this.getDicts("order_status").then(response => {
      this.orderStatusOptions = response.data;
    });
  },
  methods: {
    /** 查询sys_order表列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 订单是否结束，0：未接单；1：已接单；2：已入户；3：已入库字典翻译
    orderStatusFormat(row, column) {
      return this.selectDictLabel(
        this.orderStatusOptions,
        row.orderStatusFirst
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        orderNum: undefined,
        clientName: undefined,
        currentStaffName: undefined,
        orderStatusFirst: "0",
        amount: undefined,
        fee: undefined,
        acceptDate: undefined,
        toHouseDate: undefined
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
      this.$confirm("是否确认导出所有sys_order表数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportOrder(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    // 查询order详细信息
    handleDetail(row) {
      this.currentOrderNum = row.orderNum;
      console.log(this.currentOrderNum);
      getOrderDetail(this.currentOrderNum).then(response => {
        this.detailParams = response.data;
        this.detailVisible = true;
        this.title = "订单详细信息";
      });
      this.currentOrderNum =
        "订单编号：" + this.currentOrderNum + "<br/>" + "<br/>";
    }
  }
};
</script>