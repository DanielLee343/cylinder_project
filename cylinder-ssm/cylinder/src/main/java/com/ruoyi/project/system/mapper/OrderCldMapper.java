package com.ruoyi.project.system.mapper;

import java.util.List;

import com.ruoyi.project.system.domain.Cld;
import com.ruoyi.project.system.domain.OrderCld;
import org.springframework.core.annotation.Order;

/**
 * order_cld表Mapper接口
 * 
 * @author daniel
 * @date 2020-04-09
 */
public interface OrderCldMapper 
{
    /**
     * 查询order_cld表详细
     * 
     * @param orderCldId order_cld表ID
     * @return order_cld表
     */
    public OrderCld selectOrderCldById(Integer orderCldId);

    /**
     * 查询order_cld表列表
     * 
     * @param  orderNum 根据订单编号
     * @return stampId 集合
     */
    public List<OrderCld> selectOrderDetail(String orderNum);

    /**
     * 查询order_cld id
     *
     * @param  orderNum 根据订单编号
     * @return id
     */
    public Integer selectOrderCldIdByOrderNum(String orderNum);
    /**
     * 新增一个订单钢瓶
     * 
     * @param orderCld order_cld表
     * @return 结果
     */
    public int insertOrderCld(OrderCld orderCld);

    /**
     * 修改order_cld表
     * 
     * @param orderCld order_cld表
     * @return 结果
     */
    public int updateOrderCld(OrderCld orderCld);

    /**
     * 删除order_cld表
     * 
     * @param orderCldId order_cld表ID
     * @return 结果
     */
    public int deleteOrderCldById(Integer orderCldId);

    /**
     * 批量删除order_cld表
     * 
     * @param orderCldIds 需要删除的数据ID
     * @return 结果
     */
    public int deleteOrderCldByIds(Integer[] orderCldIds);
}
