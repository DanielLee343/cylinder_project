package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

import java.util.Date;

/**
 * cylinder数据对象 cld
 *
 * @author ruoyi
 * @date 2020-04-05
 */
public class Cld extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    @Excel(name = "序号", readConverterExp = "$column.readConverterExp()")
    private Integer id;

    /**
     * 钢印号
     */
    @Excel(name = "钢印号")
    private String stampId;

    /**
     * 气站id
     */
//    @Excel(name = "气站id")
    private Integer stationId;

    /**
     * 生产日期
     */
    @Excel(name = "生产日期", width = 30, dateFormat = "yyyy-MM-dd")
    private Date createDate;


    /**
     * 报废日期
     */
    @Excel(name = "报废日期", width = 30, dateFormat = "yyyy-MM-dd")
    private Date disposeDate;

    /**
     * 初始重量
     */
    @Excel(name = "初始重量")
    private String initWeight;

    /**
     * 管理员id
     */
    @Excel(name = "录入人id")
    private Integer entryId;

    /**
     * 规格
     */
    @Excel(name = "规格")
    private String spec;

    /**
     * 租用价格
     */
    @Excel(name = "租用价格")
    private Integer price;

    /**
     * 备注
     */
    @Excel(name = "备注")
    private String comment;

    /**
     * 录入人姓名
     */
    @Excel(name = "录入人名字")
    private String userName;

    /**
     * 气站名字
     */
    @Excel(name = "气站")
    private String stationName;

    /**
     * 录入时间
     */
    @Excel(name = "录入时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss", type = Excel.Type.EXPORT)
    private Date entryTime;

    /**
     * 是否绑定钢瓶，0：未绑定；1：已绑定; 2: 已报废
     */
    @Excel(name = "是否绑定钢瓶，0：未绑定；1：已绑定, 2: 已报废")
    private String isBind;

    public String getIsBind() {
        return isBind;
    }

    public void setIsBind(String isBind) {
        this.isBind = isBind;
    }

    public Date getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(Date entryTime) {
        this.entryTime = entryTime;
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

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setStampId(String stampId) {
        this.stampId = stampId;
    }

    public String getStampId() {
        return stampId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Integer getStationId() {
        return stationId;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public Integer getEntryId() {
        return entryId;
    }

    public void setEntryId(Integer entryId) {
        this.entryId = entryId;
    }

    public void setDisposeDate(Date disposeDate) {
        this.disposeDate = disposeDate;
    }

    public Date getDisposeDate() {
        return disposeDate;
    }

    public void setInitWeight(String initWeight) {
        this.initWeight = initWeight;
    }

    public String getInitWeight() {
        return initWeight;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public String getSpec() {
        return spec;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getPrice() {
        return price;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getComment() {
        return comment;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("id", getId())
                .append("stampId", getStampId())
                .append("stationName", getStationName())
                .append("createDate", getCreateDate())
                .append("disposeDate", getDisposeDate())
                .append("initWeight", getInitWeight())
                .append("userName", getUserName())
                .append("spec", getSpec())
                .append("price", getPrice())
                .append("entryTime", getEntryTime())
                .append("comment", getComment())
                .append("isBind", getIsBind())
                .toString();
    }
}
