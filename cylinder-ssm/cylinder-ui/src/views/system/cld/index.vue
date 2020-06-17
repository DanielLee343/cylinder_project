
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

      <el-form-item label="报废日期" prop="disposeDate">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.disposeDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择报废日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="初始重量" prop="initWeight">
        <el-input
          v-model="queryParams.initWeight"
          placeholder="请输入初始重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['system:cld:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:cld:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:cld:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:cld:add']"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="cldList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="钢印号" align="center" prop="stampId" />
      <el-table-column label="气站名" align="center" prop="stationName" />
      <el-table-column label="生产日期" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报废日期" align="center" prop="disposeDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.disposeDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="初始重量" align="center" prop="initWeight" />
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:cld:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:cld:remove']"
          >删除</el-button>
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

    <!-- 添加或修改cylinder数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="钢印号" prop="stampId">
          <el-input v-model="form.stampId" placeholder="请输入钢印号" />
        </el-form-item>
        <el-form-item label="生产日期" prop="createDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生产日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="报废日期" prop="disposeDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.disposeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择报废日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="初始重量" prop="initWeight">
          <el-input v-model="form.initWeight" placeholder="请输入初始重量" />
        </el-form-item>
        <el-form-item label="规格(KG)">
          <el-select v-model="form.spec" placeholder="请选择规格">
            <el-option
              v-for="dict in specOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const userName = window.sessionStorage.getItem("userName");
const entryId = window.sessionStorage.getItem("userId");
import {
  listCld,
  getCld,
  delCld,
  addCld,
  updateCld,
  exportCld
} from "@/api/system/cld";

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
      // 总条数
      total: 0,
      // cylinder数据表格数据
      cldList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 规格字典
      specOptions: [],
      // entry ID
      entryId: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        stampId: undefined,
        stationName: undefined,
        createDate: undefined,
        disposeDate: undefined,
        initWeight: undefined,
        entryId: undefined,
        userName: undefined, //录入人
        entryTime: undefined,
        spec: undefined,
        price: undefined,
        comment: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
    this.getDicts("cld_spec").then(response => {
      this.specOptions = response.data;
    });
  },
  methods: {
    /** 查询cylinder数据列表 */
    getList() {
      this.queryParams.entryId = entryId;
      this.loading = true;
      listCld(this.queryParams).then(response => {
        this.cldList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
        initWeight: undefined,
        userName: undefined,
        entryId: undefined,
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加cylinder数据";
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
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCld(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改cylinder数据";
        console.log(this.form);
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除cylinder数据编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delCld(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.userName = userName;
          this.form.entryId = entryId;
          if (this.form.id != undefined) {
            updateCld(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addCld(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    }
  }
};
</script>