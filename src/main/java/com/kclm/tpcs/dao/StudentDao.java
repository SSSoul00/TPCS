package com.kclm.tpcs.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kclm.tpcs.entity.Student;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudentDao extends BaseMapper<Student> {
}
