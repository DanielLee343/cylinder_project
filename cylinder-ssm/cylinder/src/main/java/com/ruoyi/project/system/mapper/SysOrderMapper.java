package com.ruoyi.project.system.mapper;

import java.util.Date;
import java.util.List;

import com.ruoyi.project.system.domain.SysOrder;

/**
 * sys_order表Mapper接口
 *
 * @author daniel
 * @date 2020-04-07
 */
public interface SysOrderMapper {
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
    public int insertSysOrder(SysOrder sysOrder);

    /**
     * 修改sys_order表
     *
     * @param sysOrder sys_order表
     * @return 结果
     */
    public int updateSysOrder(SysOrder sysOrder);

    /**
     * 删除sys_order表
     *
     * @param id sys_order表ID
     * @return 结果
     */
    public int deleteSysOrderById(Integer id);

    /**
     * 批量删除sys_order表
     *
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteSysOrderByIds(Integer[] ids);

    /**
     * 生成order_num
     *
     * @return order_num
     */
    public String generateOrderNum();

    /**
     * 分配两个配送工
     *
     * @return 两个配送工id
     */
    public List<Integer> chooseFreeDelivererId();

    /**
     * 配送员查看自己的待接单userId
     *
     * @param sysOrder 订单（其中包含必须的userId）
     * @return 订单List
     */
    public List<SysOrder> getOrderListByDeliverer(SysOrder sysOrder);

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
     * 查询当前order by client
     * @Param clientId 用户id
     * @return order列表
     */
    public List<SysOrder> getCurOrderByClient(Integer clientId);

    /**
     * 查询历史order by client
     * @Param clientId
     * @return order列表
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
