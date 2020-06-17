package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

import java.util.Date;

/**
 * valve表对象 valve
 *
 * @author daniel
 * @date 2020-04-09
 */
public class Valve extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    private Integer valveId;

    /**
     * 阀体编号
     */
    @Excel(name = "阀体编号")
    private String valveNum;

    /**
     * 钢印号
     */
    @Excel(name = "钢印号")
    private String stampId;

    /**
     * 生产厂家
     */
    @Excel(name = "生产厂家")
    private String prodCmp;

    /**
     * 生产日期
     */
    @Excel(name = "生产日期", width = 30, dateFormat = "yyyy-MM-dd")
    private Date valveCreateDate;

    /**
     * 合格证图片url
     */
    @Excel(name = "合格证图片url")
    private String ctfUrl;

    /**
     * 录入人
     */
//    @Excel(name = "录入id")
    private Integer valveEntryId;

    @Excel(name = "录入人")
    private String userName;

    /**
     * 阀体录入时间
     */
    @Excel(name = "阀体录入时间", width = 30, dateFormat = "yyyy-MM-dd")
    private Date valveEntryTime;


    /**
     * 备注
     */
    @Excel(name = "备注")
    private String valveComment;

    /**
     * 钢瓶规格
     */
    private String spec;

    /**
     * 钢瓶租金
     */
    private Integer price;

    /**
     * 钢瓶生产日期
     */
    private Date createDate;

    /**
     * 钢瓶备注
     */
    private String comment;

    /**
     * 空瓶？重瓶？
     */
    private String isFull;

    public void setValveId(Integer valveId) {
        this.valveId = valveId;
    }

    public Integer getValveId() {
        return valveId;
    }

    public void setValveNum(String valveNum) {
        this.valveNum = valveNum;
    }

    public String getValveNum() {
        return valveNum;
    }

    public void setStampId(String stampId) {
        this.stampId = stampId;
    }

    public String getStampId() {
        return stampId;
    }

    public void setProdCmp(String prodCmp) {
        this.prodCmp = prodCmp;
    }

    public String getProdCmp() {
        return prodCmp;
    }

    public void setCtfUrl(String ctfUrl) {
        this.ctfUrl = ctfUrl;
    }

    public String getCtfUrl() {
        return ctfUrl;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getValveCreateDate() {
        return valveCreateDate;
    }

    public void setValveCreateDate(Date valveCreateDate) {
        this.valveCreateDate = valveCreateDate;
    }

    public Integer getValveEntryId() {
        return valveEntryId;
    }

    public void setValveEntryId(Integer valveEntryId) {
        this.valveEntryId = valveEntryId;
    }

    public Date getValveEntryTime() {
        return valveEntryTime;
    }

    public void setValveEntryTime(Date valveEntryTime) {
        this.valveEntryTime = valveEntryTime;
    }

    public String getValveComment() {
        return valveComment;
    }

    public void setValveComment(String valveComment) {
        this.valveComment = valveComment;
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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getIsFull() {
        return isFull;
    }

    public void setIsFull(String isFull) {
        this.isFull = isFull;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("valveId", getValveId())
                .append("valveNum", getValveNum())
                .append("stampId", getStampId())
                .append("prodCmp", getProdCmp())
                .append("valveCreateDate", getValveCreateDate())
                .append("ctfUrl", getCtfUrl())
                .append("valveEntryId", getValveEntryId())
                .append("ValveEntryTime", getValveEntryTime())
                .append("ValveComment", getValveComment())
                .append("isFull", getIsFull())
                .toString();
    }
}
