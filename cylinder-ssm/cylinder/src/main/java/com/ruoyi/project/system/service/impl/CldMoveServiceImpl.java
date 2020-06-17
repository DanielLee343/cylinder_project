package com.ruoyi.project.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.project.system.mapper.CldMoveMapper;
import com.ruoyi.project.system.domain.CldMove;
import com.ruoyi.project.system.service.ICldMoveService;

/**
 * 钢瓶流转表Service业务层处理
 * 
 * @author daniel
 * @date 2020-04-16
 */
@Service
public class CldMoveServiceImpl implements ICldMoveService 
{
    @Autowired
    private CldMoveMapper cldMoveMapper;

    /**
     * 查询钢瓶流转表
     * 
     * @param cldmoveId 钢瓶流转表ID
     * @return 钢瓶流转表
     */
    @Override
    public CldMove selectCldMoveById(Long cldmoveId)
    {
        return cldMoveMapper.selectCldMoveById(cldmoveId);
    }

    /**
     * 查询钢瓶流转表列表
     * 
     * @param cldMove 钢瓶流转表
     * @return 钢瓶流转表
     */
    @Override
    public List<CldMove> selectCldMoveList(CldMove cldMove)
    {
        return cldMoveMapper.selectCldMoveList(cldMove);
    }

    /**
     * 新增钢瓶流转表
     * 
     * @param cldMove 钢瓶流转表
     * @return 结果
     */
    @Override
    public int insertCldMove(CldMove cldMove)
    {
        return cldMoveMapper.insertCldMove(cldMove);
    }

    /**
     * 修改钢瓶流转表
     * 
     * @param cldMove 钢瓶流转表
     * @return 结果
     */
    @Override
    public int updateCldMove(CldMove cldMove)
    {
        return cldMoveMapper.updateCldMove(cldMove);
    }

    /**
     * 批量删除钢瓶流转表
     * 
     * @param cldmoveIds 需要删除的钢瓶流转表ID
     * @return 结果
     */
    @Override
    public int deleteCldMoveByIds(Long[] cldmoveIds)
    {
        return cldMoveMapper.deleteCldMoveByIds(cldmoveIds);
    }

    /**
     * 删除钢瓶流转表信息
     * 
     * @param cldmoveId 钢瓶流转表ID
     * @return 结果
     */
    @Override
    public int deleteCldMoveById(Long cldmoveId)
    {
        return cldMoveMapper.deleteCldMoveById(cldmoveId);
    }

    @Override
    public String selectToUserName(String stampId) {
        return cldMoveMapper.selectToUserName(stampId);
    }

    @Override
    public List<CldMove> selectCldRoutes(CldMove cldMove) {
        return cldMoveMapper.selectCldRoutes(cldMove);
    }


}
