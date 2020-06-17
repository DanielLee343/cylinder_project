package com.ruoyi.project.system.controller;

import java.util.List;

import com.ruoyi.project.system.domain.CldMove;
import com.ruoyi.project.system.service.ICldMoveService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
 * @date 2020-04-05
 */
@RestController
@RequestMapping("/system/admin_cld")
public class AdminCldController extends BaseController {
    @Autowired
    private ICldService cldService;
    @Resource
    private ICldMoveService cldMoveService;

    /**
     * 查询cylinder数据列表
     */
    @PreAuthorize("@ss.hasPermi('system:admin_cld:list')")
    @GetMapping("/list")
    public TableDataInfo list(Cld cld) {
        startPage();
        List<Cld> list = cldService.selectCldList(cld);
        return getDataTable(list);
    }

    /**
     * 导出cylinder数据列表
     */
    @PreAuthorize("@ss.hasPermi('system:admin_cld:export')")
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
    @PreAuthorize("@ss.hasPermi('system:admin_cld:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Integer id) {
        return AjaxResult.success(cldService.selectCldById(id));
    }

//    @PreAuthorize("@ss.hasPermi('system:admin_cld:detail')")
    @GetMapping("/getMove")
    public TableDataInfo selectCldMoveList(CldMove cldMove) {
        startPage();
        List<CldMove> cldMoveList = cldMoveService.selectCldMoveList(cldMove);
        return getDataTable(cldMoveList);
    }

}
