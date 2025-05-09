// 📁 com.sns_backend1.config.WebConfig.java
package com.sns_backend1.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/uploads/**") // 🔗 클라이언트에서 접근할 URL
            .addResourceLocations("file:uploads/"); // 📂 실제 서버 로컬 경로
    }
}
