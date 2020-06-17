package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

import java.util.Date;

/**
 * sys_order表对象 sys_order
 *
 * @author daniel
 * @date 2020-04-07
 */
public class SysOrder extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
//    @Excel(name = "订单序号", readConverterExp = "$column.readConverterExp()")
    private Integer orderId;

    /**
     * 钢瓶id
     */
    @Excel(name = "订单编号")
    private String orderNum;

    /**
     * 客户id
     */
//    @Excel(name = "客户ID")
    private Integer clientId;

    /**
     * 订单要推给谁的id
     */
//    @Excel(name = "目标员工ID")
    private Integer toStaffIdFirst;

    private Integer toStaffIdSecond;
    /**
     * 目前在哪个员工手里，0：未接单
     */
//    @Excel(name = "当前员工ID")
    private Integer currentStaffId;

    /**
     * 订单是否结束，0：未接单；1：已接单；2：已入户；3：已入库
     */
    @Excel(name = "订单是否结束，0：未接单；1：已接单；2：已入户；3：已入库")
    private String orderStatusFirst;

    private String orderStatusSecond;

    /**
     * 钢瓶数量
     */
    @Excel(name = "钢瓶数量")
    private Integer amount;

    @Excel(name = "订单金额")
    private Integer fee;
    /**
     * 订单接收时间
     */
    @Excel(name = "订单接收时间", width = 30, dateFormat = "yyyy-MM-dd")
    private Date acceptDate;

    /**
     * 运送到家里的时间
     */
    @Excel(name = "运送到家里的时间", width = 30, dateFormat = "yyyy-MM-dd")
    private Date toHouseDate;

    /**
     * 创建时间
     */
    @Excel(name = "创建时间", width = 30, dateFormat = "yyyy-MM-dd")
    private Date createDate;

    /**
     * 目标运输工
     */
    @Excel(name = "目标运输工")
    private String toStaffName;
    /**
     * 当前运输工
     */
    @Excel(name = "当前运输工")
    private String currentStaffName;
    /**
     * 客户姓名
     */
    @Excel(name = "客户姓名")
    private String clientName;

    /**
     * 客户地址
     */
    @Excel(name = "客户地址")
    private String clientLocation;

    /**
     * 客户电话
     */
    @Excel(name = "客户电话")
    private String clientNum;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setCurrentStaffId(Integer currentStaffId) {
        this.currentStaffId = currentStaffId;
    }

    public Integer getCurrentStaffId() {
        return currentStaffId;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAcceptDate(Date acceptDate) {
        this.acceptDate = acceptDate;
    }

    public Date getAcceptDate() {
        return acceptDate;
    }

    public void setToHouseDate(Date toHouseDate) {
        this.toHouseDate = toHouseDate;
    }

    public Date getToHouseDate() {
        return toHouseDate;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getToStaffName() {
        return toStaffName;
    }

    public void setToStaffName(String toStaffName) {
        this.toStaffName = toStaffName;
    }

    public String getCurrentStaffName() {
        return currentStaffName;
    }

    public void setCurrentStaffName(String currentStaffName) {
        this.currentStaffName = currentStaffName;
    }

    public Integer getFee() {
        return fee;
    }

    public void setFee(Integer fee) {
        this.fee = fee;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getClientLocation() {
        return clientLocation;
    }

    public void setClientLocation(String clientLocation) {
        this.clientLocation = clientLocation;
    }

    public String getClientNum() {
        return clientNum;
    }

    public void setClientNum(String clientNum) {
        this.clientNum = clientNum;
    }

    public Integer getToStaffIdFirst() {
        return toStaffIdFirst;
    }

    public void setToStaffIdFirst(Integer toStaffIdFirst) {
        this.toStaffIdFirst = toStaffIdFirst;
    }

    public Integer getToStaffIdSecond() {
        return toStaffIdSecond;
    }

    public void setToStaffIdSecond(Integer toStaffIdSecond) {
        this.toStaffIdSecond = toStaffIdSecond;
    }

    public String getOrderStatusFirst() {
        return orderStatusFirst;
    }

    public void setOrderStatusFirst(String orderStatusFirst) {
        this.orderStatusFirst = orderStatusFirst;
    }

    public String getOrderStatusSecond() {
        return orderStatusSecond;
    }

    public void setOrderStatusSecond(String orderStatusSecond) {
        this.orderStatusSecond = orderStatusSecond;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("id", getOrderId())
                .append("clientId", getClientId())
                .append("toStaffId", getToStaffIdFirst())
                .append("toStaffId", getToStaffIdSecond())
                .append("currentStaffId", getCurrentStaffId())
                .append("orderStatus", getOrderStatusFirst())
                .append("orderStatus", getOrderStatusSecond())
                .append("amount", getAmount())
                .append("acceptDate", getAcceptDate())
                .append("toHouseDate", getToHouseDate())
                .append("createDate", getCreateDate())
                .append("currentStaffName", getCurrentStaffName())
                .append("toStaffName", getToStaffName())
                .append("clientName", getClientName())
                .append("clientLocation", getClientLocation())
                .append("clientNum", getClientNum())
                .toString();
    }
}
