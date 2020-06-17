package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

/**
 * 【请填写功能名称】对象 order_item
 * 
 * @author ruoyi
 * @date 2020-04-10
 */
public class OrderItem extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** $column.columnComment */
    private Long orderItemId;

    /** 订单编号 */
    @Excel(name = "订单编号")
    private String orderNum;

    /** 钢瓶规格 */
    @Excel(name = "钢瓶规格")
    private String cldSpec;

    /** 钢瓶数量 */
    @Excel(name = "钢瓶数量")
    private Integer cldAmount;

    public void setOrderItemId(Long orderItemId) 
    {
        this.orderItemId = orderItemId;
    }

    public Long getOrderItemId() 
    {
        return orderItemId;
    }
    public void setOrderNum(String orderNum) 
    {
        this.orderNum = orderNum;
    }

    public String getOrderNum() 
    {
        return orderNum;
    }
    public void setCldSpec(String cldSpec) 
    {
        this.cldSpec = cldSpec;
    }

    public String getCldSpec() 
    {
        return cldSpec;
    }
    public void setCldAmount(Integer cldAmount) 
    {
        this.cldAmount = cldAmount;
    }

    public Integer getCldAmount() 
    {
        return cldAmount;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("orderItemId", getOrderItemId())
            .append("orderNum", getOrderNum())
            .append("cldSpec", getCldSpec())
            .append("cldAmount", getCldAmount())
            .toString();
    }
}
