package com.pz.designmatch.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import org.springframework.context.annotation.Configuration;

@Configuration
@SuppressWarnings("SpellCheckingInspection")
@OpenAPIDefinition(info = @Info(title = "Designmatch API", version = "1.0.0", description = "API aplikacji Designmatch",
        contact = @Contact(name = "Zespół IX", email = "308297@stud.umk.pl", url = "https://aleks-2.mat.umk.pl/pz2022/zesp09/")),
        security = {@SecurityRequirement(name = "basicAuth"), @SecurityRequirement(name = "bearerToken")}
)
@SecuritySchemes({
        @SecurityScheme(name = "basicAuth", type = SecuritySchemeType.HTTP, scheme = "basic", description = "Basic Authentication"),
        @SecurityScheme(name = "bearerToken", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT", description = "JWT Authentication")
})
public class OpenApiConfig {
}
