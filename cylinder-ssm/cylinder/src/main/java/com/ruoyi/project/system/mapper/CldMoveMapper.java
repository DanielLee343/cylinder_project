package com.ruoyi.project.system.mapper;

import java.util.List;

import com.ruoyi.project.system.domain.CldMove;

/**
 * 钢瓶流转表Mapper接口
 *
 * @author daniel
 * @date 2020-04-16
 */
public interface CldMoveMapper {
    /**
     * 查询钢瓶流转表
     *
     * @param cldmoveId 钢瓶流转表ID
     * @return 钢瓶流转表
     */
    public CldMove selectCldMoveById(Long cldmoveId);

    /**
     * 查询钢瓶流转表列表
     *
     * @param cldMove 钢瓶流转表
     * @return 钢瓶流转表集合
     */
    public List<CldMove> selectCldMoveList(CldMove cldMove);

    /**
     * 获取stampId的上一个所有人的姓名
     *
     * @param stampId 钢印号
     * @return 上一个所有人id
     */
    public String selectToUserName(String stampId);

    /**
     * 新增钢瓶流转表
     *
     * @param cldMove 钢瓶流转表
     * @return 结果
     */
    public int insertCldMove(CldMove cldMove);

    /**
     * 修改钢瓶流转表
     *
     * @param cldMove 钢瓶流转表
     * @return 结果
     */
    public int updateCldMove(CldMove cldMove);

    /**
     * 删除钢瓶流转表
     *
     * @param cldmoveId 钢瓶流转表ID
     * @return 结果
     */
    public int deleteCldMoveById(Long cldmoveId);

    /**
     * 批量删除钢瓶流转表
     *
     * @param cldmoveIds 需要删除的数据ID
     * @return 结果
     */
    public int deleteCldMoveByIds(Long[] cldmoveIds);

    /**
     * 根据stampId查找钢瓶轨迹
     *
     * @param cldMove 对象
     * @return 结果
     */
    public List<CldMove> selectCldRoutes(CldMove cldMove);
}
