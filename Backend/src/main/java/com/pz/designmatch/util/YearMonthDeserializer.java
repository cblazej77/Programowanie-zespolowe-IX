package com.pz.designmatch.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

public class YearMonthDeserializer extends JsonDeserializer<YearMonth> {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("MM/yyyy");

    @Override
    public YearMonth deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String yearMonthString = parser.getText().trim();
        return YearMonth.parse(yearMonthString, FORMATTER);
    }
}