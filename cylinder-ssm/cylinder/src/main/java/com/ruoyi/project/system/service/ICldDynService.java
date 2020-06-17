package com.ruoyi.project.system.service;

import com.ruoyi.project.system.domain.CldDyn;

import java.util.List;

/**
 * @author daniel
 */
public interface ICldDynService {

    /**
     * 查询所有符合条件的cylinder1动态数据
     *
     * @param cldDyn 条件
     * @return List结果
     */
    public List<CldDyn> selectCldDynList(CldDyn cldDyn);

    /**
     * 根据钢印号查找cylinder动态信息
     *
     * @param dynStampId 钢印号
     * @return 结果
     */
    public CldDyn selectCldDynById(String dynStampId);

    /**
     * 新增cylinder动态数据
     * @param cldDyn cylinder动态数据
     * @return 结果
     */
    public int insertCldDyn(CldDyn cldDyn);

    /**
     * 修改cylinder动态数据
     * @param cldDyn cylinder动态数据
     * @return 结果
     */
    public int updateCldDyn(CldDyn cldDyn);

    /**
     * 重装空瓶
     *
     * @param dynStampId 空瓶id
     * @return 结果
     */
    public int refillCld(String dynStampId);
}
