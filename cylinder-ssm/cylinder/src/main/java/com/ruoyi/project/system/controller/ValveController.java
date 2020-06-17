package com.ruoyi.project.system.controller;

import java.util.Date;
import java.util.List;

import com.ruoyi.project.system.service.ICldService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.project.system.domain.Valve;
import com.ruoyi.project.system.service.IValveService;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;

import javax.annotation.Resource;

/**
 * valve表Controller
 *
 * @author daniel
 * @date 2020-04-09
 */
@Api("valve表处理")
@RestController
@RequestMapping("/system/valve")
public class ValveController extends BaseController {
    @Resource
    private IValveService valveService;

    @Resource
    private ICldService cldService;

    /**
     * 查询valve表列表
     */
//    @PreAuthorize("@ss.hasPermi('system:valve:list')")
    @ApiOperation("显示所有valve")
    @GetMapping("/list")
    public TableDataInfo list(Valve valve) {
        startPage();
        List<Valve> list = valveService.selectValveList(valve);
        return getDataTable(list);
    }

//    /**
//     * 导出valve表列表
//     */
//    @PreAuthorize("@ss.hasPermi('system:valve:export')")
//    @Log(title = "valve表", businessType = BusinessType.EXPORT)
//    @GetMapping("/export")
//    public AjaxResult export(Valve valve)
//    {
//        List<Valve> list = valveService.selectValveList(valve);
//        ExcelUtil<Valve> util = new ExcelUtil<Valve>(Valve.class);
//        return util.exportExcel(list, "valve");
//    }

    /**
     * 获取valve表详细信息，根据id
     */
    //@PreAuthorize("@ss.hasPermi('system:valve:query')")
    @ApiOperation("显示某一valve信息")
    @GetMapping(value = "/{valveId}")
    public AjaxResult getInfo(@PathVariable("valveId") Integer valveId) {
        return AjaxResult.success(valveService.selectValveById(valveId));
    }

    /**
     * 新增valve表,需要entryId
     */
    //@PreAuthorize("@ss.hasPermi('system:valve:add')")
    @ApiOperation("新增valve数据")
    @Log(title = "valve表", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Valve valve) {
        Date curDate = new Date();
        valve.setValveEntryTime(curDate);
        return toAjax(valveService.insertValve(valve));
    }

    /**
     * 删除valve表
     */
    //@PreAuthorize("@ss.hasPermi('system:valve:remove')")
    @ApiOperation("删除valve数据")
    @Log(title = "valve表", businessType = BusinessType.DELETE)
    //这里更改,需要传valveId, stampId
    @DeleteMapping
    public AjaxResult remove(@RequestBody Valve valve) {
        Integer valveId = valve.getValveId();
        cldService.updateUnbind(valve.getStampId());
        return toAjax(valveService.deleteValveById(valveId));
    }

    /**
     * 绑定CV
     * 需要传：stampId, valveNum
     */
    @ApiOperation("绑定CV")
    @Log(title = "valve表", businessType = BusinessType.UPDATE)
    @PutMapping("/bind")
    public AjaxResult bindCV(@RequestBody Valve valve) {
        //输入stampId
        valveService.bindCV(valve);
        // 更新绑定字段
        cldService.updateBind(valve.getStampId());
        return toAjax(1);
    }

    /**
     * 解绑CV
     * 需要传：stampId
     */
    @ApiOperation("解绑CV")
    @Log(title = "valve表", businessType = BusinessType.UPDATE)
    @PutMapping("/unbind")
    public AjaxResult unbindCV(@RequestBody Valve valve) {
        cldService.updateUnbind(valve.getStampId());
        valveService.unbindCV(valve.getStampId());
        return toAjax(1);
    }
}
