package com.pz.designmatch;

import com.pz.designmatch.model.enums.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LoginApplicationTests {

    @Test
    void contextLoads() {
        System.out.println("Hello World!");
        Category.getDisplayNames().forEach(System.out::println);
        City.getDisplayNames().forEach(System.out::println);
        Language.getDisplayNames().forEach(System.out::println);
        Level.getDisplayNames().forEach(System.out::println);
        Subcategory.getDisplayNames().forEach(System.out::println);
        Tag.getDisplayNames().forEach(System.out::println);
    }

}
