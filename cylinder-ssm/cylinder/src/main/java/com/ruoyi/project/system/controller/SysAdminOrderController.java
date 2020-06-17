package com.ruoyi.project.system.controller;

import java.util.List;

import com.ruoyi.project.system.domain.OrderItem;
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
import com.ruoyi.project.system.domain.SysOrder;
import com.ruoyi.project.system.service.ISysOrderService;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.web.page.TableDataInfo;

/**
 * sys_order表Controller
 *
 * @author daniel
 * @date 2020-04-07
 */
@RestController
@RequestMapping("/system/admin_order")
public class SysAdminOrderController extends BaseController {
    @Autowired
    private ISysOrderService sysOrderService;

    /**
     * 查询sys_order表列表
     */
    @PreAuthorize("@ss.hasPermi('system:admin_order:list')")
    @GetMapping("/list")
    public TableDataInfo list(SysOrder sysOrder) {
        startPage();
        List<SysOrder> list = sysOrderService.selectSysOrderList(sysOrder);
        return getDataTable(list);
    }

    /**
     * 导出sys_order表列表
     */
//    @PreAuthorize("@ss.hasPermi('system:order:export')")
    @Log(title = "sys_order表", businessType = BusinessType.EXPORT)
    @GetMapping("/export")
    public AjaxResult export(SysOrder sysOrder) {
        List<SysOrder> list = sysOrderService.selectSysOrderList(sysOrder);
        ExcelUtil<SysOrder> util = new ExcelUtil<SysOrder>(SysOrder.class);
        return util.exportExcel(list, "order");
    }

    /**
     * 获取sys_order表详细信息
     */
//    @PreAuthorize("@ss.hasPermi('system:order:query')")
//    @GetMapping(value = "/{id}")
//    public AjaxResult getInfo(@PathVariable("id") Integer id)
//    {
//        return AjaxResult.success(sysOrderService.selectSysOrderById(id));
//    }

//    /**
//     * 修改sys_order表
//     */
//    @PreAuthorize("@ss.hasPermi('system:order:edit')")
//    @Log(title = "sys_order表", businessType = BusinessType.UPDATE)
//    @PutMapping
//    public AjaxResult edit(@RequestBody SysOrder sysOrder)
//    {
//        return toAjax(sysOrderService.updateSysOrder(sysOrder));
//    }
//
//    /**
//     * 删除sys_order表
//     */
//    @PreAuthorize("@ss.hasPermi('system:order:remove')")
//    @Log(title = "sys_order表", businessType = BusinessType.DELETE)
//	@DeleteMapping("/{ids}")
//    public AjaxResult remove(@PathVariable Integer[] ids)
//    {
//        return toAjax(sysOrderService.deleteSysOrderByIds(ids));
//    }

    /**
     * 查询order详细数据
     */
//    @PreAuthorize("@ss.hasPermi('system:admin_order:detail')")
    @GetMapping(value = "/detail/{orderNum}")
    public AjaxResult list(@PathVariable("orderNum") String orderNum) {
        List<OrderItem> orderItemList = sysOrderService.selectOrderItemList(orderNum);
        return AjaxResult.success(orderItemList);
    }
}
