package com.ruoyi.project.system.service;

import java.util.List;
import com.ruoyi.project.system.domain.Cld;
/**
 * cylinder数据Service接口
 * 
 * @author ruoyi
 * @date 2020-04-05
 */
public interface ICldService 
{
    public Cld setPrice(Cld cld);
    /**
     * 查询cylinder数据
     * 
     * @param id cylinder数据ID
     * @return cylinder数据
     */
    public Cld selectCldById(Integer id);

    /**
     * 查询cylinder数据列表
     * 
     * @param cld cylinder数据
     * @return cylinder数据集合
     */
    public List<Cld> selectCldList(Cld cld);

    /**
     * 查询cylinder数据列表
     *
     * @param cld cylinder数据
     * @Param entryId 录入人id
     * @return cylinder数据集合
     */
    public List<Cld> selectCldListByEntry(Cld cld);

    /**
     * 新增cylinder数据
     * 
     * @param cld cylinder数据
     * @return 结果
     */
    public int insertCld(Cld cld);

    /**
     * 修改cylinder数据
     * 
     * @param cld cylinder数据
     * @return 结果
     */
    public int updateCld(Cld cld);

    /**
     * 批量删除cylinder数据
     * 
     * @param ids 需要删除的cylinder数据ID
     * @return 结果
     */
    public int deleteCldByIds(Integer[] ids);

    /**
     * 删除cylinder数据信息
     * 
     * @param id cylinder数据ID
     * @return 结果
     */
    public int deleteCldById(Integer id);

    /**
     * 更新is_bind
     * @param stampId 钢印号
     * @return 结果
     */
    public int updateBind(String stampId);

    /**
     * 解绑
     * @param stampId 钢印号
     * @return 结果
     */
    public int updateUnbind(String stampId);
}
