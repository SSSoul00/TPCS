package com.kclm.tpcs.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kclm.tpcs.entity.Employee;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmployeeDao extends BaseMapper<Employee> {
}
