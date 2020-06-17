package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

import javax.validation.constraints.Max;
import java.util.Date;
import java.util.List;

/**
 * order_cld表对象 order_cld
 *
 * @author daniel
 * @date 2020-04-09
 */
public class OrderCld extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    private Integer orderCldId;

    /**
     * 订单编号
     */
    @Excel(name = "订单编号")
    private String orderNum;

    /**
     * 钢瓶钢印号
     */
    @Excel(name = "钢瓶钢印号")
    private String stampId;

    private List<String> stampIds;

    private String stationName;

    private String userName;

    private String spec;

    private Integer price;

    private Date entryTime;

    private String comment;

    private String valveNum;

    public void setOrderCldId(Integer orderCldId) {
        this.orderCldId = orderCldId;
    }

    public Integer getOrderCldId() {
        return orderCldId;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setStampId(String stampId) {
        this.stampId = stampId;
    }

    public String getStampId() {
        return stampId;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Date getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(Date entryTime) {
        this.entryTime = entryTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getValveNum() {
        return valveNum;
    }

    public void setValveNum(String valveNum) {
        this.valveNum = valveNum;
    }

    public List<String> getStampIds() {
        return stampIds;
    }

    public void setStampIds(List<String> stampIds) {
        this.stampIds = stampIds;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("orderCldId", getOrderCldId())
                .append("orderNum", getOrderNum())
                .append("stampId", getStampId())
                .append("stationName", getStationName())
                .append("userName", getUserName())
                .append("spec", getSpec())
                .append("price", getPrice())
                .append("entryTime", getEntryTime())
                .append("comment", getComment())
                .append("valveNum", getValveNum())
                .toString();
    }
}
