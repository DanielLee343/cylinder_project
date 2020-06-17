package com.ruoyi.project.system.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.system.domain.Client;

/**
 * client表Service接口
 *
 * @author daniel
 * @date 2020-04-20
 */
public interface IClientService {
    /**
     * 查询client表
     *
     * @param clientId client表ID
     * @return client表
     */
    public Client selectClientById(Integer clientId);

    /**
     * 查询client表列表
     *
     * @param client client表
     * @return client表集合
     */
    public List<Client> selectClientList(Client client);

    /**
     * 新增client表
     *
     * @param client client表
     * @return 结果
     */
    public int insertClient(Client client);

    /**
     * 修改client表
     *
     * @param client client表
     * @return 结果
     */
    public int updateClient(Client client);

    /**
     * 批量删除client表
     *
     * @param clientIds 需要删除的client表ID
     * @return 结果
     */
    public int deleteClientByIds(Integer[] clientIds);

    /**
     * 删除client表信息
     *
     * @param clientId client表ID
     * @return 结果
     */
    public int deleteClientById(Integer clientId);

    /**
     * 客户登录
     * @param clientNum 客户电话号
     * @param clientPwd 客户密码
     * @return 客户对象
     */
    public AjaxResult clientLogin(String clientNum, String clientPwd);
}
