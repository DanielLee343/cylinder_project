package com.ruoyi.project.system.mapper;

import java.util.List;
import com.ruoyi.project.system.domain.OrderItem;

/**
 * 【请填写功能名称】Mapper接口
 * 
 * @author ruoyi
 * @date 2020-04-10
 */
public interface OrderItemMapper 
{
    /**
     * 查询【请填写功能名称】
     * 
     * @param orderItemId 【请填写功能名称】ID
     * @return 【请填写功能名称】
     */
    public OrderItem selectOrderItemById(Long orderItemId);

    /**
     * 查询订单详情列表
     * 
     * @param orderNum 订单编号
     * @return 订单详情集合
     */
    public List<OrderItem> selectOrderItemList(String orderNum);

    /**
     * 新增【请填写功能名称】
     * 
     * @param orderItem 【请填写功能名称】
     * @return 结果
     */
    public int insertOrderItem(OrderItem orderItem);

    /**
     * 修改【请填写功能名称】
     * 
     * @param orderItem 【请填写功能名称】
     * @return 结果
     */
    public int updateOrderItem(OrderItem orderItem);

    /**
     * 删除【请填写功能名称】
     * 
     * @param orderItemId 【请填写功能名称】ID
     * @return 结果
     */
    public int deleteOrderItemById(Long orderItemId);

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param orderItemIds 需要删除的数据ID
     * @return 结果
     */
    public int deleteOrderItemByIds(Long[] orderItemIds);
}
