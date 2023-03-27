package com.pz.designmatch.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition
@Configuration
public class SpringdocConfig {
    @Bean
    public OpenAPI baseOpenAPI() {

        return new OpenAPI().info(new Info()
                .title("Designmatch API")
                .description("Portal for freelance designers and clients")
                .version("1.0.0")
                .contact(new Contact().name("Zespół 9 Programowanie Zespołowe").url("https://aleks-2.mat.umk.pl/pz2022/zesp09/").email("308297@stud.umk.pl"))
                .license(new License().name("License TBD")));
    }
}