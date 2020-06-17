package com.ruoyi.project.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.system.mapper.ValveMapper;
import com.ruoyi.project.system.domain.Valve;
import com.ruoyi.project.system.service.IValveService;

/**
 * valve表Service业务层处理
 *
 * @author daniel
 * @date 2020-04-09
 */
@Service
public class ValveServiceImpl implements IValveService {
    @Autowired
    private ValveMapper valveMapper;

    /**
     * 查询valve表
     *
     * @param valveId valve表ID
     * @return valve表
     */
    @Override
    public Valve selectValveById(Integer valveId) {
        return valveMapper.selectValveById(valveId);
    }

    /**
     * 查询valve表列表
     *
     * @param valve valve表
     * @return valve表
     */
    @Override
    public List<Valve> selectValveList(Valve valve) {
        return valveMapper.selectValveList(valve);
    }

    /**
     * 新增valve表
     *
     * @param valve valve表
     * @return 结果
     */
    @Override
    public int insertValve(Valve valve) {
        return valveMapper.insertValve(valve);
    }

    /**
     * 批量删除valve表
     *
     * @param valveIds 需要删除的valve表ID
     * @return 结果
     */
    @Override
    public int deleteValveByIds(Integer[] valveIds) {
        return valveMapper.deleteValveByIds(valveIds);
    }

    /**
     * 删除valve表信息
     *
     * @param valveId valve表ID
     * @return 结果
     */
    @Override
    public int deleteValveById(Integer valveId) {
        return valveMapper.deleteValveById(valveId);
    }

    /**
     * 通过valveNum，获取StampId的（通过扫码）
     *
     * @param valveNum 气阀编号
     * @return valve对象
     */
    @Override
    public Valve selectStampIdByValveNum(String valveNum) {
        return valveMapper.selectStampIdByValveNum(valveNum);
    }

    @Override
    public int updateValve(Valve valve) {
        return valveMapper.updateValve(valve);
    }

    @Override
    public int bindCV(Valve valve) {
        return valveMapper.bindCV(valve);
    }

    @Override
    public int unbindCV(String stampId) {
        return valveMapper.unbindCV(stampId);
    }

}
