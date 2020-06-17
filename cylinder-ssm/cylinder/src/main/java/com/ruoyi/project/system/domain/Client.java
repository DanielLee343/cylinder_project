package com.ruoyi.project.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

/**
 * client表对象 client
 * 
 * @author daniel
 * @date 2020-04-20
 */
public class Client extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** $column.columnComment */
    private Integer clientId;

    /** 用户用户名 */
    @Excel(name = "用户用户名")
    private String clientAccount;

    /** 用户密码 */
    @Excel(name = "用户密码")
    private String clientPwd;

    /** 用户地址 */
    @Excel(name = "用户地址")
    private String clientLocation;

    /** 用户名字 */
    @Excel(name = "用户名字")
    private String clientName;

    /** 用户性别，1：男；0：女 */
    @Excel(name = "用户性别，1：男；0：女")
    private String clientGender;

    /** 用户电话 */
    @Excel(name = "用户电话")
    private String clientNum;

    /** 是否删除，0：未删除 */
    @Excel(name = "是否删除，0：未删除")
    private String isDelete;

    public void setClientId(Integer clientId) 
    {
        this.clientId = clientId;
    }

    public Integer getClientId() 
    {
        return clientId;
    }
    public void setClientAccount(String clientAccount) 
    {
        this.clientAccount = clientAccount;
    }

    public String getClientAccount() 
    {
        return clientAccount;
    }
    public void setClientPwd(String clientPwd) 
    {
        this.clientPwd = clientPwd;
    }

    public String getClientPwd() 
    {
        return clientPwd;
    }
    public void setClientLocation(String clientLocation) 
    {
        this.clientLocation = clientLocation;
    }

    public String getClientLocation() 
    {
        return clientLocation;
    }
    public void setClientName(String clientName) 
    {
        this.clientName = clientName;
    }

    public String getClientName() 
    {
        return clientName;
    }
    public void setClientGender(String clientGender) 
    {
        this.clientGender = clientGender;
    }

    public String getClientGender() 
    {
        return clientGender;
    }
    public void setClientNum(String clientNum) 
    {
        this.clientNum = clientNum;
    }

    public String getClientNum() 
    {
        return clientNum;
    }
    public void setIsDelete(String isDelete) 
    {
        this.isDelete = isDelete;
    }

    public String getIsDelete() 
    {
        return isDelete;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("clientId", getClientId())
            .append("clientAccount", getClientAccount())
            .append("clientPwd", getClientPwd())
            .append("clientLocation", getClientLocation())
            .append("clientName", getClientName())
            .append("clientGender", getClientGender())
            .append("clientNum", getClientNum())
            .append("isDelete", getIsDelete())
            .toString();
    }
}
