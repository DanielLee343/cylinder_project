package com.ruoyi.project.system.controller;

import com.ruoyi.common.constant.OrderStatusConst;
import com.ruoyi.common.constant.UserIdNotList;
import com.ruoyi.common.constant.UserTypeConstants;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.system.domain.*;
import com.ruoyi.project.system.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Date;
import java.util.List;

/**
 * @author daniel
 */
@Api("订单管理")
@RestController
@RequestMapping("/system/order")
public class SysOrderController extends BaseController {

    @Resource
    private ISysOrderService sysOrderService;

    @Resource
    private ISysUserService userService;

    @Resource
    private IValveService valveService;

    @Resource
    private ICldMoveService cldMoveService;

    @Resource
    private ICldDynService cldDynService;

    /**
     * 客户新增订单表
     */
    @ApiOperation("新增订单")
    @Log(title = "sys_order表", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult addOrder(@RequestBody OrderAndOrderItem orderAndOrderItem) {
        SysOrder sysOrder = orderAndOrderItem.getSysOrder();
        List<OrderItem> orderItemList = orderAndOrderItem.getOrderItemList();
        return toAjax(sysOrderService.insertSysOrder(sysOrder, orderItemList));
    }

    /**
     * 运输工查看当前订单
     *
     * @param sysOrder 包含toStaffId = 自己
     */
    @ApiOperation("员工查看订单")
    @GetMapping("/cur_list")
    public TableDataInfo getOrderListByDeliverer(SysOrder sysOrder) {
        startPage();
        List<SysOrder> list = sysOrderService.getOrderListByDeliverer(sysOrder);
        return getDataTable(list);
    }

    /**
     * 运输工查看当前订单详情
     *
     * @Param orderNum 订单编号
     */
    @ApiOperation("员工查看订单详情")
    @GetMapping("/cur_list/{orderNum}")
    public AjaxResult getCurrentOrderDetailByDeliverer(@PathVariable("orderNum") String orderNum) {
        List<OrderItem> list = sysOrderService.selectOrderItemList(orderNum);
        return AjaxResult.success(list);
    }

    /**
     * 运输工接单
     *
     * @param sysOrder 订单 这里更改
     * @return 结果
     */
    @ApiOperation("订单流程：接单，二次转单")
    @Log(title = "订单流程", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult updateOrder(@RequestBody SysOrder sysOrder) throws IOException {
        //参数：currentStaffId，orderNum
        int res = 0;
        // 1. 设置isDelivering = 1
        userService.setDelivering(sysOrder.getCurrentStaffId());
        Date date = new Date();
        String orderStatusFirst = sysOrderService.selectFirstOrderStatusByOrderNum(sysOrder.getOrderNum());
        String orderStatusSecond = sysOrderService.selectSecondOrderStatusByOrderNum(sysOrder.getOrderNum());
        if (orderStatusFirst.equals(OrderStatusConst.ORDER_INIT)) {
            //表示运输工第一次接单
            // 2. 设置acceptDate
            sysOrder.setAcceptDate(date);
            // 3. 再选择一个二级配送
            sysOrder.setToStaffIdSecond(sysOrderService.getAFreeDeliverer());
            // 4. 更改订单状态
            sysOrder.setOrderStatusFirst(OrderStatusConst.ORDER_ACCEPT);
            sysOrderService.updateSysOrder(sysOrder);
            return AjaxResult.success(sysOrderService.getAFreeDeliverer());
        } else if (orderStatusFirst.equals(OrderStatusConst.ORDER_ACCEPT)) {
            // 二级配送交接
            sysOrder.setOrderStatusSecond(OrderStatusConst.ORDER_ACCEPT);
            sysOrderService.updateSysOrder(sysOrder);
        }
        return toAjax(res);
    }

    @ApiOperation("运输工扫码查看钢瓶和气阀信息")
    @GetMapping("/VC/{valveNum}")
    public AjaxResult getValveAndCldDetailByDeliverer(@PathVariable("valveNum") String valveNum) {
        return AjaxResult.success(valveService.selectStampIdByValveNum(valveNum));
    }


    /**
     * @param cldMove 钢瓶流转记录
     * @return 结果
     */
    @ApiOperation("钢瓶流转")
    @Log(title = "钢瓶流转", businessType = BusinessType.INSERT)
    @PostMapping("/delCld")
    public AjaxResult cldDeliver(@RequestBody CldMove cldMove) {
        List<String> stampIds = cldMove.getStampIds();
        //需要获取stampIdList, toUserId， location
        Integer toUserId = cldMove.getToUserId();
        String location = cldMove.getLocation();
        Date date = new Date();
        for (String stampId : stampIds) {
            CldMove cldMoveSingle = new CldMove();
            cldMoveSingle.setStampId(stampId);
            cldMoveSingle.setMoveTime(date);
            cldMoveSingle.setToUserId(toUserId);
            cldMoveSingle.setFromUserName(cldMoveService.selectToUserName(stampId));
            cldMoveSingle.setLocation(location);
            cldMoveSingle.setUserType(UserTypeConstants.STAFF);
            cldMoveService.insertCldMove(cldMoveSingle);
            CldDyn cldDyn = new CldDyn();
            cldDyn.setDynStampId(stampId);
            cldDyn.setInStock("0");
            cldDynService.updateCldDyn(cldDyn);
        }
        //增加钢瓶流转项
        return toAjax(1);
    }

    /**
     * 客户通过差距岸边当前订单
     *
     * @return order列表
     * @Param clientId 用户id
     */
    @ApiOperation("客户查看自己的订单")
    @GetMapping("/client_cur_order/{clientId}")
    public TableDataInfo getCurOrderByClient(@PathVariable("clientId") Integer clientId) {
        startPage();
        List<SysOrder> list = sysOrderService.getCurOrderByClient(clientId);
        return getDataTable(list);
    }

    @ApiOperation("客户查看历史订单")
    @GetMapping("/client_his_order/{clientId}")
    public TableDataInfo getHisOrderByClient(@PathVariable("clientId") Integer clientId) {
        startPage();
        List<SysOrder> list = sysOrderService.getHisOrderByClient(clientId);
        return getDataTable(list);
    }

    /**
     * 客户查看订单详细数据
     */
    @ApiOperation("客户查看订单详细数据")
    @GetMapping("client_order/detail/{orderNum}")
    public AjaxResult list(@PathVariable("orderNum") String orderNum) {
        List<OrderItem> orderItemList = sysOrderService.selectOrderItemList(orderNum);
        return AjaxResult.success(orderItemList);
    }

    /**
     * 钢瓶入户
     *
     * @Param orderNum
     */
    @ApiOperation("钢瓶入户")
    @Log(title = "钢瓶入户", businessType = BusinessType.INSERT)
    @PostMapping("/home")
    public AjaxResult cldToHouse(@RequestBody CldMoveAndOrderCld cldMoveAndOrderCld) {
        SysOrder sysOrder = cldMoveAndOrderCld.getSysOrder();
        //前端需要获取orderNum
        sysOrder.setCurrentStaffId(UserIdNotList.AT_HOME);
//        sysOrder.setOrderStatusSecond(OrderStatusConst.ORDER_AT_HOME);
        sysOrder.setOrderStatusFirst(OrderStatusConst.ORDER_AT_HOME);
//        sysOrder.setToHouseDate(DateUtils.getCurrentDateTime());
        sysOrderService.updateSysOrder(sysOrder);
        String curOrderNum = sysOrder.getOrderNum();
        Integer curClientId = sysOrderService.selectClientIdByOrderNum(curOrderNum);
        Date date = new Date();
        CldMove cldMove = cldMoveAndOrderCld.getCldMove();
        //获取stampIds
        List<String> stampIds = cldMove.getStampIds();
        for (String stampId : stampIds) {
            cldMove.setStampId(stampId);
            cldMove.setMoveTime(date);
            cldMove.setToUserId(curClientId);
            cldMove.setLocation(sysOrder.getClientLocation());
            cldMove.setFromUserName(cldMoveService.selectToUserName(stampId));
            cldMove.setUserType(UserTypeConstants.CLIENT);
            cldMoveService.insertCldMove(cldMove);
        }
        return toAjax(1);
    }

    @ApiOperation("用户确定钢瓶入户")
    @Log(title = "钢瓶入户", businessType = BusinessType.UPDATE)
    @PostMapping("/confirmToHome")
    public AjaxResult cldToHouseByClient(@RequestBody SysOrder sysOrder) {
        Date date = new Date();
        sysOrder.setOrderStatusSecond(OrderStatusConst.ORDER_AT_HOME);
        sysOrder.setToHouseDate(date);
        return toAjax(sysOrderService.updateSysOrder(sysOrder));
    }

    /**
     * 钢品回转
     *
     * @return 结果
     * @Param cldMove对象，包含：stampId扫码获得，toUserId = 运输工自己id，location："当前地址"
     */
    @ApiOperation("钢瓶回转")
    @Log(title = "钢瓶回转", businessType = BusinessType.INSERT)
    @PostMapping("/sendBack")
    public AjaxResult sendBackCld(@RequestBody CldMove cldMove) {
        Date date = new Date();
        List<String> stampIds = cldMove.getStampIds();
        String location = cldMove.getLocation();
        Integer toUserId = cldMove.getToUserId();
        for (String stampId : stampIds) {
            cldMove.setStampId(stampId);
            cldMove.setMoveTime(date);
            cldMove.setToUserId(toUserId);
            cldMove.setLocation(location);
            cldMove.setFromUserName("用户家");
            cldMove.setUserType(UserTypeConstants.STAFF);
            cldMoveService.insertCldMove(cldMove);
            // 更新cld动态表
            CldDyn cldDyn = new CldDyn();
            cldDyn.setDynStampId(stampId);
            cldDyn.setIsFull("0");
            cldDynService.updateCldDyn(cldDyn);
        }
        return toAjax(1);
    }

    /**
     * 钢瓶入库
     *
     * @param cldMove 对象，包括stampIds[], toUserId, location
     * @return 结果
     */
    @ApiOperation("钢品入库")
    @Log(title = "钢品入库", businessType = BusinessType.INSERT)
    @PostMapping("/toStorage")
    public AjaxResult toStorage(@RequestBody CldMove cldMove) {
        Date date = new Date();
        List<String> stampIds = cldMove.getStampIds();
        String location = cldMove.getLocation();
        Integer toUserId = cldMove.getToUserId();
        for (String stampId : stampIds) {
            cldMove.setStampId(stampId);
            cldMove.setMoveTime(date);
            cldMove.setToUserId(toUserId);
            cldMove.setLocation(location);
            cldMove.setFromUserName(cldMoveService.selectToUserName(cldMove.getStampId()));
            cldMove.setUserType(UserTypeConstants.STAFF);
            cldMoveService.insertCldMove(cldMove);
            CldDyn cldDyn = new CldDyn();
            cldDyn.setDynStampId(cldMove.getStampId());
            cldDyn.setInStock("1");
            // 钢瓶入库
            cldDynService.updateCldDyn(cldDyn);
        }
        return toAjax(1);
    }
}
