package com.ruoyi.project.system.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Random;

import com.ruoyi.common.constant.OrderStatusConst;
import com.ruoyi.project.system.domain.CldMove;
import com.ruoyi.project.system.domain.OrderCld;
import com.ruoyi.project.system.domain.OrderItem;
import com.ruoyi.project.system.mapper.CldMoveMapper;
import com.ruoyi.project.system.mapper.OrderCldMapper;
import com.ruoyi.project.system.mapper.OrderItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.system.mapper.SysOrderMapper;
import com.ruoyi.project.system.domain.SysOrder;
import com.ruoyi.project.system.service.ISysOrderService;

import javax.annotation.Resource;

/**
 * sys_order表Service业务层处理
 *
 * @author daniel
 * @date 2020-04-07
 */
@Service
public class SysOrderServiceImpl implements ISysOrderService {
    @Autowired
    private SysOrderMapper sysOrderMapper;

    @Autowired
    private OrderCldMapper orderCldMapper;

    @Autowired
    private OrderItemMapper orderItemMapper;

    @Resource
    private CldMoveMapper cldMoveMapper;


    /**
     * 查询sys_order表
     *
     * @param id sys_order表ID
     * @return sys_order表
     */
    @Override
    public SysOrder selectSysOrderById(Integer id) {
        return sysOrderMapper.selectSysOrderById(id);
    }

    /**
     * 查询sys_order表列表
     *
     * @param sysOrder sys_order表
     * @return sys_order表
     */
    @Override
    public List<SysOrder> selectSysOrderList(SysOrder sysOrder) {
        return sysOrderMapper.selectSysOrderList(sysOrder);
    }

    /**
     * 新建订单
     *
     * @param sysOrder sys_order表
     * @return 结果
     */
    @Override
    public int insertSysOrder(SysOrder sysOrder, List<OrderItem> orderItemList) {
        //生成orderNum
        String newOrderNum = generateOrderNum();
        sysOrder.setOrderNum(newOrderNum);
        //分配第一个配送工
        sysOrder.setToStaffIdFirst(getAFreeDeliverer());
        Date curDate = new Date();
        sysOrder.setCreateDate(curDate);
        sysOrderMapper.insertSysOrder(sysOrder);
        for (OrderItem orderItem : orderItemList) {
            orderItem.setOrderNum(newOrderNum);
            orderItemMapper.insertOrderItem(orderItem);
        }
        return 1;
    }

    /**
     * 生成一个可用的员工
     */
    @Override
    public int getAFreeDeliverer() {
        List<Integer> freeDelivererIds = chooseFreeDelivererId();
        Random random = new Random();
        int n = random.nextInt(freeDelivererIds.size());
        return freeDelivererIds.get(n);
    }

    /**
     * 配送员查看自己的待接单userId
     *
     * @param sysOrder 订单（其中包含必须的userId）
     * @return 订单List
     */
    @Override
    public List<SysOrder> getOrderListByDeliverer(SysOrder sysOrder) {
        return sysOrderMapper.getOrderListByDeliverer(sysOrder);
    }

    /**
     * 查询订单详情列表
     *
     * @param orderNum 订单编号
     * @return 订单详情集合
     */
    @Override
    public List<OrderItem> selectOrderItemList(String orderNum) {
        return orderItemMapper.selectOrderItemList(orderNum);
    }

    /**
     * 新增一个订单钢瓶
     *
     * @param orderCld order_cld表
     * @return 结果
     */
    @Override
    public int insertOrderCld(OrderCld orderCld) {
        return orderCldMapper.insertOrderCld(orderCld);
    }

    @Override
    public Integer selectOrderCldIdByOrderNum(String orderNum) {
        return orderCldMapper.selectOrderCldIdByOrderNum(orderNum);
    }

    @Override
    public String selectFirstOrderStatusByOrderNum(String orderNum) {
        return sysOrderMapper.selectFirstOrderStatusByOrderNum(orderNum);
    }

    @Override
    public String selectSecondOrderStatusByOrderNum(String orderNum) {
        return sysOrderMapper.selectSecondOrderStatusByOrderNum(orderNum);
    }

    /**
     * 查看历史订单by client
     *
     * @return order列表
     * @Param clientId 用户id
     */
    @Override
    public List<SysOrder> getCurOrderByClient(Integer clientId) {
        return sysOrderMapper.getCurOrderByClient(clientId);
    }

    /**
     * 查看历史订单by client
     *
     * @return order列表
     * @Param clientId 用户id
     */
    @Override
    public List<SysOrder> getHisOrderByClient(Integer clientId) {
        return sysOrderMapper.getHisOrderByClient(clientId);
    }

    /**
     * 通过orderNum获取stampId集合
     *
     * @param orderNum 订单编号
     * @return stampId集合
     */
    @Override
    public List<String> selectStampIdByOrderNum(String orderNum) {
        return sysOrderMapper.selectStampIdByOrderNum(orderNum);
    }

    @Override
    public Integer selectClientIdByOrderNum(String orderNum) {
        return sysOrderMapper.selectClientIdByOrderNum(orderNum);
    }


    /**
     * 修改sys_order表
     *
     * @param sysOrder sys_order表
     * @return 结果
     */
    @Override
    public int updateSysOrder(SysOrder sysOrder) {
        return sysOrderMapper.updateSysOrder(sysOrder);
    }

    /**
     * 批量删除sys_order表
     *
     * @param ids 需要删除的sys_order表ID
     * @return 结果
     */
    @Override
    public int deleteSysOrderByIds(Integer[] ids) {
        return sysOrderMapper.deleteSysOrderByIds(ids);
    }

    /**
     * 删除sys_order表信息
     *
     * @param id sys_order表ID
     * @return 结果
     */
    @Override
    public int deleteSysOrderById(Integer id) {
        return sysOrderMapper.deleteSysOrderById(id);
    }

    /**
     * @param orderNum 订单编号
     * @return stampId 集合
     */
    @Override
    public List<OrderCld> selectOrderDetail(String orderNum) {
        return orderCldMapper.selectOrderDetail(orderNum);
    }

    /**
     * 生成随机订单号
     *
     * @return 订单号
     */
    @Override
    public String generateOrderNum() {
        return sysOrderMapper.generateOrderNum();
    }

    /**
     * 选出所有空闲的人
     *
     * @return 空闲人list
     */
    @Override
    public List<Integer> chooseFreeDelivererId() {
        return sysOrderMapper.chooseFreeDelivererId();
    }


}
