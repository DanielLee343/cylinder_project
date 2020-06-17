package com.ruoyi.project.system.mapper;

import java.util.List;
import com.ruoyi.project.system.domain.Client;

/**
 * client表Mapper接口
 * 
 * @author daniel
 * @date 2020-04-20
 */
public interface ClientMapper 
{
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
     * 删除client表
     * 
     * @param clientId client表ID
     * @return 结果
     */
    public int deleteClientById(Integer clientId);

    /**
     * 批量删除client表
     * 
     * @param clientIds 需要删除的数据ID
     * @return 结果
     */
    public int deleteClientByIds(Integer[] clientIds);

    /**
     * 通过电话号查看客户
     * @param clientNum 电话号
     * @return 客户对象
     */
    public Client selectClientByNum(String clientNum);
}
