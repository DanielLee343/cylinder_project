package com.ruoyi.project.system.domain;

import com.ruoyi.framework.web.domain.BaseEntity;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.Date;

/**
 * @author daniel
 */
public class Workload extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private String userType;

    private Integer userId;

    private String nickName;

    private String phoneNumber;

    private String sex;

    private String isDelivering;

    private Integer sumUp;

    private String stampId;

    private Integer initWeight;

    private String spec;

    private Integer price;

    private Date entryTime;

    private Date moveTime;

    private String location;

    private Date refillTime;

    private String refillStampId;

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

    public Date getMoveTime() {
        return moveTime;
    }

    public void setMoveTime(Date moveTime) {
        this.moveTime = moveTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStampId() {
        return stampId;
    }

    public void setStampId(String stampId) {
        this.stampId = stampId;
    }

    public Integer getInitWeight() {
        return initWeight;
    }

    public void setInitWeight(Integer initWeight) {
        this.initWeight = initWeight;
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getIsDelivering() {
        return isDelivering;
    }

    public void setIsDelivering(String isDelivering) {
        this.isDelivering = isDelivering;
    }

    public Integer getSumUp() {
        return sumUp;
    }

    public void setSumUp(Integer sumUp) {
        this.sumUp = sumUp;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("userType", getUserType())
                .append("userId", getUserId())
                .append("nickName", getNickName())
                .append("phoneNumber", getPhoneNumber())
                .append("sex", getSex())
                .append("isDelivering", getIsDelivering())
                .append("sumUp", getSumUp())
                .append("initWeight", getInitWeight())
                .append("spec", getSpec())
                .append("price", getPrice())
                .append("stampId", getStampId())
                .append("entryTime", getEntryTime())
                .append("moveTime", getMoveTime())
                .append("location", getLocation())
                .append("refillTime", getRefillTime())
                .append("refillStampId", getRefillStampId())
                .toString();
    }
}
