package com.ruoyi.project.system.service.impl;

import com.ruoyi.project.system.domain.CldDyn;
import com.ruoyi.project.system.mapper.CldDynMapper;
import com.ruoyi.project.system.service.ICldDynService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CldDynServiceImpl implements ICldDynService {
    @Autowired
    private CldDynMapper cldDynMapper;

    /**
     * 查询所有符合条件的cylinder1动态数据
     *
     * @param cldDyn 条件
     * @return List结果
     */
    @Override
    public List<CldDyn> selectCldDynList(CldDyn cldDyn) {
        return cldDynMapper.selectCldDynList(cldDyn);
    }

    /**
     * 根据钢印号查找cylinder动态信息
     *
     * @param dynStampId 钢印号
     * @return 结果
     */
    @Override
    public CldDyn selectCldDynById(String dynStampId) {
        return cldDynMapper.selectCldDynById(dynStampId);
    }

    /**
     * 新增cylinder动态数据
     *
     * @param cldDyn cylinder动态数据
     * @return 结果
     */
    @Override
    public int insertCldDyn(CldDyn cldDyn) {
        return cldDynMapper.insertCldDyn(cldDyn);
    }

    /**
     * 修改cylinder动态数据
     *
     * @param cldDyn cylinder动态数据
     * @return 结果
     */
    @Override
    public int updateCldDyn(CldDyn cldDyn) {
        return cldDynMapper.updateCldDyn(cldDyn);
    }

    @Override
    public int refillCld(String dynStampId) {
        return cldDynMapper.refillCld(dynStampId);
    }
}
