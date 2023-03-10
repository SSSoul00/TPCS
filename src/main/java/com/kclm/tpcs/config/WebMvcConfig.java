/****************************************
 * 2018 - 2021 版权所有 CopyRight(c) 快程乐码信息科技有限公司所有, 未经授权，不得复制、转发
 */

package com.kclm.tpcs.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 *
 * @author fangkai
 * @date 2022/1/2 0002 14:08
 * @return web文件上传--虚拟路径映射
 */
@Configuration
@Slf4j
public class WebMvcConfig implements WebMvcConfigurer {
    private final String UPLOAD_IMAGE_URL;

    public WebMvcConfig() {
        log.info("虚拟映射路径处理");
        ApplicationHome applicationHome = new ApplicationHome(getClass());
        String homeDir = System.getProperty("user.dir");
//        UPLOAD_IMAGE_URL = "file:" + homeDir + "\\upload\\images\\";
        UPLOAD_IMAGE_URL = "file:" + applicationHome.getDir() + "/upload/images/";
        log.info("\n----> 上传的图片映射路径：{}",UPLOAD_IMAGE_URL);
    }



    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //添加一个文件上传的静态路径映射, 如果是文件目录，则需要以 file: 开头

    }


    //beanValidation配置
    @Override
    public Validator getValidator() {
        LocalValidatorFactoryBean lvfb = new LocalValidatorFactoryBean();
        //返回
        return lvfb;
    }

}
