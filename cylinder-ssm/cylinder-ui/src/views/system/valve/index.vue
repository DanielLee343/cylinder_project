<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="阀体编号" prop="valveNum">
        <el-input
          v-model="queryParams.valveNum"
          placeholder="请输入阀体编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="钢印号" prop="stampId">
        <el-input
          v-model="queryParams.stampId"
          placeholder="请输入钢印号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产厂家" prop="prodCmp">
        <el-input
          v-model="queryParams.prodCmp"
          placeholder="请输入生产厂家"
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
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生产日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="合格证图片url" prop="ctfUrl">
        <el-input
          v-model="queryParams.ctfUrl"
          placeholder="请输入合格证图片url"
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
      <el-form-item label="阀体录入时间" prop="entryTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.entryTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择阀体录入时间"
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
      <el-form-item label="备注" prop="comment">
        <el-input
          v-model="queryParams.comment"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:valve:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:valve:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:valve:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:valve:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="valveList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="阀体编号" align="center" prop="valveNum" />
      <el-table-column label="钢印号" align="center" prop="stampId" />
      <el-table-column label="生产厂家" align="center" prop="prodCmp" />
      <el-table-column label="生产日期" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合格证图片url" align="center" prop="ctfUrl" />
      <el-table-column label="录入人" align="center" prop="userName" />
      <el-table-column label="阀体录入时间" align="center" prop="entryTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否绑定" align="center" prop="isBind" :formatter="isBindFormat" />
      <el-table-column label="备注" align="center" prop="comment" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:valve:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:valve:remove']"
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

    <!-- 添加或修改valve表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="阀体编号" prop="valveNum">
          <el-input v-model="form.valveNum" placeholder="请输入阀体编号" />
        </el-form-item>
        <el-form-item label="钢印号" prop="stampId">
          <el-input v-model="form.stampId" placeholder="请输入钢印号" />
        </el-form-item>
        <el-form-item label="生产厂家" prop="prodCmp">
          <el-input v-model="form.prodCmp" placeholder="请输入生产厂家" />
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
        <el-form-item label="合格证图片url" prop="ctfUrl">
          <el-input v-model="form.ctfUrl" placeholder="请输入合格证图片url" />
        </el-form-item>
        <el-form-item label="录入人" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入录入人" />
        </el-form-item>
        <el-form-item label="阀体录入时间" prop="entryTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.entryTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择阀体录入时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否绑定">
          <el-select v-model="form.isBind" placeholder="请选择绑定状态">
            <el-option
              v-for="dict in isBindOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" placeholder="请输入备注" />
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
  listValve,
  getValve,
  delValve,
  addValve,
  updateValve,
  exportValve
} from "@/api/system/valve";

export default {
  name: "Valve",
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
      // valve表表格数据
      valveList: [],
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
        valveNum: undefined,
        stampId: undefined,
        prodCmp: undefined,
        createDate: undefined,
        ctfUrl: undefined,
        entryId: undefined,
        userName: undefined,
        entryTime: undefined,
        isBind: undefined,
        comment: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      scanRes: {
        valveNum: "V002",
        stampId: "0",//未绑定 设为0
        prodCmp: "第二个公司",
        createDate: "2020-05-06",
        ctfUrl: "www.baidu.com",
        isBind: "0",
        comment: "第二个阀"
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("is_bind").then(response => {
      this.isBindOptions = response.data;
    });
  },
  methods: {
    /** 查询valve表列表 */
    getList() {
      this.loading = true;
      listValve(this.queryParams).then(response => {
        this.valveList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 是否绑定钢瓶，0：未绑定；1：已绑定字典翻译
    isBindFormat(row, column) {
      return this.selectDictLabel(this.isBindOptions, row.isBind);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        valveId: undefined,
        valveNum: undefined,
        stampId: undefined,
        prodCmp: undefined,
        createDate: undefined,
        ctfUrl: undefined,
        entryId: undefined,
        userName: undefined,
        entryTime: undefined,
        isBind: undefined,
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
      this.ids = selection.map(item => item.valveId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加valve表";
    // },
    
    handleAdd(){
      this.reset();
      this.form = this.scanRes;
      this.form.entryId = entryId;
      this.form.userName = userName;
      addValve(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        } else {
          this.msgError(response.msg);
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const valveId = row.valveId || this.ids;
      getValve(valveId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改valve表";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.valveId != undefined) {
            updateValve(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addValve(this.form).then(response => {
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
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const valveIds = row.valveId || this.ids;
      this.$confirm(
        '是否确认删除valve表编号为"' + valveIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delValve(valveIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有valve表数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportValve(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    }
  }
};
</script>