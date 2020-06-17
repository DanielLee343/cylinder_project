package com.ruoyi.project.system.controller;

import java.util.Date;
import java.util.List;

import com.ruoyi.project.system.domain.CldDyn;
import com.ruoyi.project.system.domain.CldMove;
import com.ruoyi.project.system.domain.RefillerWorkload;
import com.ruoyi.project.system.service.ICldDynService;
import com.ruoyi.project.system.service.ICldMoveService;
import com.ruoyi.project.system.service.IWorkloadService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.project.system.domain.Cld;
import com.ruoyi.project.system.service.ICldService;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.web.page.TableDataInfo;

import javax.annotation.Resource;

/**
 * cylinder数据Controller
 *
 * @author daniel
 * @date 2020-04-06
 */
@RestController
@RequestMapping("/system/cld")
public class CldController extends BaseController {
    @Autowired
    private ICldService cldService;

    @Autowired
    private ICldDynService cldDynService;

    @Autowired
    private IWorkloadService workloadService;

    @Resource
    private ICldMoveService cldMoveService;

    //@PreAuthorize("@ss.hasPermi('system:cld:list')")
    @GetMapping("/list")
    public TableDataInfo list(Cld cld) {
        startPage();
        List<Cld> list = cldService.selectCldListByEntry(cld);
        return getDataTable(list);
    }

    @GetMapping("/unbindList")
    public TableDataInfo selectUnbindCldList(Cld cld) {
        startPage();
        cld.setIsBind("0");
        List<Cld> list = cldService.selectCldList(cld);
        return getDataTable(list);
    }

    /**
     * 导出cylinder数据列表
     */
    @PreAuthorize("@ss.hasPermi('system:cld:export')")
    @Log(title = "cylinder数据", businessType = BusinessType.EXPORT)
    @GetMapping("/export")
    public AjaxResult export(Cld cld) {
        List<Cld> list = cldService.selectCldList(cld);
        ExcelUtil<Cld> util = new ExcelUtil<Cld>(Cld.class);
        return util.exportExcel(list, "cld");
    }

    /**
     * 获取cylinder数据详细信息
     */
    //@PreAuthorize("@ss.hasPermi('system:cld:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Integer id) {
        return AjaxResult.success(cldService.selectCldById(id));
    }

    /**
     * 新增cylinder数据
     */
    //@PreAuthorize("@ss.hasPermi('system:cld:add')")
    @Log(title = "cylinder数据", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Cld cld) {
        Date curDate = new Date();
        cld.setEntryTime(curDate);
        cldService.insertCld(cld);
        CldDyn cldDyn = new CldDyn();
        cldDyn.setDynStampId(cld.getStampId());
        cldDyn.setIsFull("0");
        cldDyn.setInStock("1");
        return AjaxResult.success(cldDynService.insertCldDyn(cldDyn));
    }

    /**
     * 修改cylinder数据
     */
    //@PreAuthorize("@ss.hasPermi('system:cld:edit')")
    @Log(title = "cylinder数据", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Cld cld) {
        return toAjax(cldService.updateCld(cld));
    }

    /**
     * 删除cylinder数据
     */
    //@PreAuthorize("@ss.hasPermi('system:cld:remove')")
    @Log(title = "cylinder数据", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Integer[] ids) {
        return toAjax(cldService.deleteCldByIds(ids));
    }

    /**
     * 充装员：充装空瓶
     * 需要：stampId, userId
     */
    @Log(title = "cylinder动态数据", businessType = BusinessType.UPDATE)
    @PutMapping("/refill")
    public AjaxResult refillCld(@RequestBody RefillerWorkload refillerWorkload) {
        Date curTime = new Date();
        List<String> stampIds = refillerWorkload.getRefillStampIds();
        Integer refillerId = refillerWorkload.getRefillerId();
        for (String stampId : stampIds) {
            refillerWorkload.setRefillerId(refillerId);
            refillerWorkload.setRefillTime(curTime);
            refillerWorkload.setRefillStampId(stampId);
            workloadService.insertRefillerWorkload(refillerWorkload);
            cldDynService.refillCld(stampId);
        }
        return toAjax(1);
    }

//    @GetMapping("/routes")
//    public TableDataInfo selectCldRoutes(CldMove cldMove) {
//        startPage();
//        List<CldMove> cldMoveList = cldMoveService.selectCldRoutes(cldMove);
//        return getDataTable(cldMoveList);
//    }


}
