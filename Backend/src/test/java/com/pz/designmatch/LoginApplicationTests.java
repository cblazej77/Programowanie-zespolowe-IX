package com.pz.designmatch;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

@SpringBootTest
class LoginApplicationTests {

    @Test
    void contextLoads() {
//        System.out.println("Hello World!");
//        Category.getDisplayNames().forEach(System.out::println);
//        City.getDisplayNames().forEach(System.out::println);
//        Language.getDisplayNames().forEach(System.out::println);
//        Level.getDisplayNames().forEach(System.out::println);
//        Subcategory.getDisplayNames().forEach(System.out::println);
//        Tag.getDisplayNames().forEach(System.out::println);
        YearMonth yearMonth = YearMonth.of(2022, 4);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yyyy");
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
        String formattedDate = yearMonth.format(formatter);
        String date = "01/2001";
        System.out.println(formattedDate);
        YearMonth parsedYearMonth = YearMonth.parse(date, formatter);
        System.out.println(parsedYearMonth);
    }

}
