package com.ruoyi.project.system.controller;

import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.system.domain.Workload;
import com.ruoyi.project.system.service.IWorkloadService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author daniel
 */
@RestController
@Api("工作量统计")
@RequestMapping("/system/workload")
public class WorkloadController extends BaseController {

    @Resource
    private IWorkloadService workloadService;

    @ApiOperation("查看录入工工作量（所有）")
    @GetMapping("/entries")
    @ResponseBody
    public TableDataInfo selectWorkloadEntries(Workload workload) {
        startPage();
        List<Workload> list = workloadService.selectWorkloadEntries(workload);
        return getDataTable(list);
    }

    @ApiOperation("查看录入工工作记录（单个）")
    @GetMapping("/entry/{userId}")
    public TableDataInfo selectWorkloadEntryById(@PathVariable("userId") Integer userId) {
        startPage();
        List<Workload> list = workloadService.selectWorkloadEntryById(userId);
        return getDataTable(list);
    }

    @ApiOperation("查看运输工工作量（所有）")
    @GetMapping("/deliverers")
    public TableDataInfo selectWorkloadDeliverers(Workload workload) {
        startPage();
        List<Workload> list = workloadService.selectWorkloadDeliverers(workload);
        return getDataTable(list);
    }

    @ApiOperation("查看运输工工作量（单个）")
    @GetMapping("/deliverer/{userId}")
    public TableDataInfo selectWorkloadDelivererById(@PathVariable("userId") Integer userId) {
        startPage();
        List<Workload> list = workloadService.selectWorkloadDelivererById(userId);
        return getDataTable(list);
    }

    /**
     * 充装工：查看所有工作量
     * 需要：userId
     */
    @ApiOperation("查看充装工工作量（所有）")
    @GetMapping("/refillers")
    public TableDataInfo selectWorkloadRefillers(Workload workload) {
        startPage();
        List<Workload> list = workloadService.selectWorkloadRefillers(workload);
        return getDataTable(list);
    }

    @ApiOperation("查看充装工工作量（单个）")
    @GetMapping("/refiller/{userId}")
    public TableDataInfo selectWorkloadRefillers(@PathVariable("userId") Integer userId) {
        startPage();
        List<Workload> list = workloadService.selectWorkloadRefillerById(userId);
        return getDataTable(list);
    }
}
