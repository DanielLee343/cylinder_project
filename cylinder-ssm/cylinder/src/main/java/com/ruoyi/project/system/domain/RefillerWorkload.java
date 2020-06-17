package com.ruoyi.project.system.domain;

import com.ruoyi.framework.web.domain.BaseEntity;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.Date;
import java.util.List;

public class RefillerWorkload extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private Integer refillerId;

    private Date refillTime;

    private String refillStampId;

    private List<String> refillStampIds;

    public List<String> getRefillStampIds() {
        return refillStampIds;
    }

    public void setRefillStampIds(List<String> refillStampIds) {
        this.refillStampIds = refillStampIds;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRefillerId() {
        return refillerId;
    }

    public void setRefillerId(Integer refillerId) {
        this.refillerId = refillerId;
    }

    public Date getRefillTime() {
        return refillTime;
    }

    public void setRefillTime(Date refillTime) {
        this.refillTime = refillTime;
    }

    public String getRefillStampId() {
        return refillStampId;
    }

    public void setRefillStampId(String refillStampId) {
        this.refillStampId = refillStampId;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("id", getId())
                .append("refillerId", getRefillerId())
                .append("refillTime", getRefillTime())
                .append("refillStampId", getRefillStampId())
                .append("refillStampIds", getRefillStampIds())
                .toString();
    }
}
