package com.ruoyi.project.system.domain;

import com.ruoyi.framework.web.domain.BaseEntity;

public class CldMoveAndOrderCld extends BaseEntity {
    private static final long serialVersionUID = 1L;
    private OrderCld orderCld;
    private CldMove cldMove;
    private SysOrder sysOrder;

    public OrderCld getOrderCld() {
        return orderCld;
    }

    public void setOrderCld(OrderCld orderCld) {
        this.orderCld = orderCld;
    }

    public CldMove getCldMove() {
        return cldMove;
    }

    public void setCldMove(CldMove cldMove) {
        this.cldMove = cldMove;
    }

    public SysOrder getSysOrder() {
        return sysOrder;
    }

    public void setSysOrder(SysOrder sysOrder) {
        this.sysOrder = sysOrder;
    }
}
