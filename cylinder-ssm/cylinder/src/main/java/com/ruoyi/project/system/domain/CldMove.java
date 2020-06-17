package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

import java.util.Date;
import java.util.List;

/**
 * 钢瓶流转表对象 cld_move
 *
 * @author daniel
 * @date 2020-04-16
 */
public class CldMove extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * $column.columnComment
     */
    private Integer cldmoveId;
    private List<String> stampIds;

    /**
     * $column.columnComment
     */
    @Excel(name = "钢印号", readConverterExp = "$column.readConverterExp()")
    private String stampId;

    /**
     * $column.columnComment
     */
    @Excel(name = "流转员工（去往）", readConverterExp = "$column.readConverterExp()")
    private Integer toUserId;

    /**
     * $column.columnComment
     */
    @Excel(name = "流转员工（来自）", readConverterExp = "$column.readConverterExp()")
    private String fromUserName;

    /**
     * $column.columnComment
     */
    @Excel(name = "时间", readConverterExp = "$column.readConverterExp()")
    private Date moveTime;

    private String nickName;

    /**
     * $column.columnComment
     */
    @Excel(name = "地点")
    private String location;

    private String userType;

    private String spec;

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Integer getCldmoveId() {
        return cldmoveId;
    }

    public List<String> getStampIds() {
        return stampIds;
    }

    public void setStampIds(List<String> stampIds) {
        this.stampIds = stampIds;
    }

    public void setCldmoveId(Integer cldmoveId) {
        this.cldmoveId = cldmoveId;
    }

    public Integer getToUserId() {
        return toUserId;
    }

    public void setToUserId(Integer toUserId) {
        this.toUserId = toUserId;
    }

    public void setStampId(String stampId) {
        this.stampId = stampId;
    }

    public String getStampId() {
        return stampId;
    }

    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }

    public String getFromUserName() {
        return fromUserName;
    }

    public void setMoveTime(Date moveTime) {
        this.moveTime = moveTime;
    }

    public Date getMoveTime() {
        return moveTime;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocation() {
        return location;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("cldMoveId", getCldmoveId())
                .append("stampId", getStampId())
                .append("toUserId", getToUserId())
                .append("fromUserName", getFromUserName())
                .append("moveTime", getMoveTime())
                .append("location", getLocation())
                .append("userType", getUserType())
                .append("nickName", getNickName())
                .append("spec", getSpec())
                .toString();
    }
}
