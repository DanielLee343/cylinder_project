package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

/**
 * cld_dyn表对象 cld_dyn
 *
 * @author daniel
 * @date 2020-04-29
 */
public class CldDyn extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    private Integer id;

    /**
     * 钢瓶id
     */
    @Excel(name = "钢瓶id")
    private String dynStampId;

    /**
     * 是否空瓶，0：空瓶；1：重瓶
     */
    @Excel(name = "是否空瓶，0：空瓶；1：重瓶")
    private String isFull;

    /**
     * 冲装次数
     */
    @Excel(name = "冲装次数")
    private Integer refillNum;

    /**
     * 钢瓶是否可用
     */
    @Excel(name = "钢瓶是否可用")
    private String inStock;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getDynStampId() {
        return dynStampId;
    }

    public void setDynStampId(String dynStampId) {
        this.dynStampId = dynStampId;
    }

    public void setIsFull(String isFull) {
        this.isFull = isFull;
    }

    public String getIsFull() {
        return isFull;
    }

    public void setRefillNum(Integer refillNum) {
        this.refillNum = refillNum;
    }

    public Integer getRefillNum() {
        return refillNum;
    }

    public void setInStock(String inStock) {
        this.inStock = inStock;
    }

    public String getInStock() {
        return inStock;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("id", getId())
                .append("cldId", getDynStampId())
                .append("isFull", getIsFull())
                .append("refillNum", getRefillNum())
                .append("inStock", getInStock())
                .toString();
    }
}
