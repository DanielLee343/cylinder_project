package com.ruoyi.project.system.service;

import java.util.List;
import com.ruoyi.project.system.domain.Valve;

/**
 * valve表Service接口
 * 
 * @author daniel
 * @date 2020-04-09
 */
public interface IValveService 
{
    /**
     * 查询valve表
     * 
     * @param valveId valve表ID
     * @return valve表
     */
    public Valve selectValveById(Integer valveId);

    /**
     * 查询valve表列表
     * 
     * @param valve valve表
     * @return valve表集合
     */
    public List<Valve> selectValveList(Valve valve);

    /**
     * 新增valve表
     * 
     * @param valve valve表
     * @return 结果
     */
    public int insertValve(Valve valve);

    /**
     * 批量删除valve表
     * 
     * @param valveIds 需要删除的valve表ID
     * @return 结果
     */
    public int deleteValveByIds(Integer[] valveIds);

    /**
     * 删除valve表信息
     * 
     * @param valveId valve表ID
     * @return 结果
     */
    public int deleteValveById(Integer valveId);

    /**
     * 通过valveNum，获取StampId的（通过扫码）
     *
     * @param valveNum 气阀编号
     * @return valve对象
     */
    public Valve selectStampIdByValveNum(String valveNum);

    /**
     * @return 结果
     * @Param valve 气阀对象
     */
    public int updateValve(Valve valve);

    /**
     * 绑定CV
     * @param valve 气阀
     * @return 结果
     */
    public int bindCV(Valve valve);

    /**
     * 解绑CV
     * @param valve 气阀
     * @return 结果
     */
    public int unbindCV(String stampId);
}
