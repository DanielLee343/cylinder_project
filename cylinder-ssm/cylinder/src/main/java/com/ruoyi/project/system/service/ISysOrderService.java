package com.ruoyi.project.system.service;

import java.util.Date;
import java.util.List;

import com.ruoyi.project.system.domain.*;

/**
 * sys_order表Service接口
 *
 * @author daniel
 * @date 2020-04-07
 */
public interface ISysOrderService {
    /**
     * 查询sys_order表
     *
     * @param id sys_order表ID
     * @return sys_order表
     */
    public SysOrder selectSysOrderById(Integer id);

    /**
     * 查询sys_order表列表
     *
     * @param sysOrder sys_order表
     * @return sys_order表集合
     */
    public List<SysOrder> selectSysOrderList(SysOrder sysOrder);

    /**
     * 新增sys_order表
     *
     * @param sysOrder sys_order表
     * @return 结果
     */
    public int insertSysOrder(SysOrder sysOrder, List<OrderItem> orderItemList);

    /**
     * 修改sys_order表
     *
     * @param sysOrder sys_order表
     * @return 结果
     */
    public int updateSysOrder(SysOrder sysOrder);

    /**
     * 批量删除sys_order表
     *
     * @param ids 需要删除的sys_order表ID
     * @return 结果
     */
    public int deleteSysOrderByIds(Integer[] ids);

    /**
     * 删除sys_order表信息
     *
     * @param id sys_order表ID
     * @return 结果
     */
    public int deleteSysOrderById(Integer id);

    /**
     * @param orderNum 订单编号
     * @return stampId 集合
     */
    public List<OrderCld> selectOrderDetail(String orderNum);

    /**
     * 生成随机订单号
     *
     * @return 订单号
     */
    public String generateOrderNum();

    /**
     * 选出所有空闲的人
     * @return 空闲人list
     */
    public List<Integer> chooseFreeDelivererId();

    /**
     * 生成一个可用的员工
     *
     * @return 员工id
     */
    public int getAFreeDeliverer();

    /**
     * 配送员查看自己的待接单userId
     *
     * @param sysOrder 订单（其中包含必须的userId）
     * @return 订单List
     */
    public List<SysOrder> getOrderListByDeliverer(SysOrder sysOrder);

    /**
     * 查询订单详情列表
     *
     * @param orderNum 订单编号
     * @return 订单详情集合
     */
    public List<OrderItem> selectOrderItemList(String orderNum);

    /**
     * 新增一个订单钢瓶
     *
     * @param orderCld order_cld表
     * @return 结果
     */
    public int insertOrderCld(OrderCld orderCld);

    /**
     * 查询order_cld id
     *
     * @param  orderNum 根据订单编号
     * @return id
     */
    public Integer selectOrderCldIdByOrderNum(String orderNum);

    /**
     * 通过orderNum查找orderStatus1
     * @param orderNum 订单编号
     * @return orderStatus
     */
    public String selectFirstOrderStatusByOrderNum(String orderNum);

    /**
     * 通过orderNum查找orderStatus2
     * @param orderNum 订单编号
     * @return orderStatus
     */
    public String selectSecondOrderStatusByOrderNum(String orderNum);

    /**
     * 通过clientId查询order信息
     * @Param clientId 用户id
     * @return order列表
     */
    public List<SysOrder> getCurOrderByClient(Integer clientId);

    /**
     * 查看当前订单by client
     *
     * @return order列表
     * @Param clientId 用户id
     */
    public List<SysOrder> getHisOrderByClient(Integer clientId);
    /**
     * 通过orderNum获取stampId集合
     * @param orderNum 订单编号
     * @return stampId集合
     */
    public List<String> selectStampIdByOrderNum(String orderNum);

    /**
     * 通过订单编号获取客户id
     * @param orderNum 订单编号
     * @return 客户id
     */
    public Integer selectClientIdByOrderNum(String orderNum);

}
