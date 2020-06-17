package com.ruoyi.project.system.service.impl;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.ruoyi.common.utils.IdUtils;
import com.ruoyi.common.utils.security.Md5Utils;
import com.ruoyi.framework.security.service.SysLoginService;
import com.ruoyi.framework.web.domain.AjaxResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.system.mapper.ClientMapper;
import com.ruoyi.project.system.domain.Client;
import com.ruoyi.project.system.service.IClientService;

/**
 * client表Service业务层处理
 *
 * @author daniel
 * @date 2020-04-20
 */
@Service
public class ClientServiceImpl implements IClientService {
    @Autowired
    private ClientMapper clientMapper;

    @Autowired
    private SysLoginService sysLoginService;

    /**
     * 查询client表
     *
     * @param clientId client表ID
     * @return client表
     */
    @Override
    public Client selectClientById(Integer clientId) {
        return clientMapper.selectClientById(clientId);
    }

    /**
     * 查询client表列表
     *
     * @param client client表
     * @return client表
     */
    @Override
    public List<Client> selectClientList(Client client) {
        return clientMapper.selectClientList(client);
    }

    /**
     * 新增client表
     *
     * @param client client表
     * @return 结果
     */
    @Override
    public int insertClient(Client client) {
        //此处加密
        client.setClientPwd(Md5Utils.hash(client.getClientPwd()));
        return clientMapper.insertClient(client);
    }

    /**
     * 修改client表
     *
     * @param client client表
     * @return 结果
     */
    @Override
    public int updateClient(Client client) {
        return clientMapper.updateClient(client);
    }

    /**
     * 批量删除client表
     *
     * @param clientIds 需要删除的client表ID
     * @return 结果
     */
    @Override
    public int deleteClientByIds(Integer[] clientIds) {
        return clientMapper.deleteClientByIds(clientIds);
    }

    /**
     * 删除client表信息
     *
     * @param clientId client表ID
     * @return 结果
     */
    @Override
    public int deleteClientById(Integer clientId) {
        return clientMapper.deleteClientById(clientId);
    }

    /**
     * 客户登录
     * @param clientNum 客户电话号
     * @param clientPwd 客户密码
     * @return 客户对象
     */
    @Override
    public AjaxResult clientLogin(String clientNum, String clientPwd) {
        Client client = clientMapper.selectClientByNum(clientNum);
        if(client == null) {
            return new AjaxResult(500, "用户不存在！");
        }else {
            String resPwd = Md5Utils.hash(clientPwd);
            if(client.getClientPwd().equals(resPwd)) {
                return new AjaxResult(200, "登陆成功！", client);
            }else {
                return new AjaxResult(501, "密码错误！");
            }
        }
    }
}
