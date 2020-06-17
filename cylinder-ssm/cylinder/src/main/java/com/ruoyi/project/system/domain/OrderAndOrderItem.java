package com.ruoyi.project.system.domain;

import com.ruoyi.framework.web.domain.BaseEntity;

import java.util.List;

/**
 * @author daniel
 */
public class OrderAndOrderItem extends BaseEntity {

    private static final long serialVersionUID = 1L;
    private SysOrder sysOrder;
    private List<OrderItem> orderItemList;

    public SysOrder getSysOrder() {
        return sysOrder;
    }

    public void setSysOrder(SysOrder sysOrder) {
        this.sysOrder = sysOrder;
    }

    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
    }
}
