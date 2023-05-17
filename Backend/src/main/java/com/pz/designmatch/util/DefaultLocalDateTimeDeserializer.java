package com.pz.designmatch.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DefaultLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

    @Override
    public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException {
        // TODO Auto-generated method stub
        String input = p.getText().replace(" ", "T");
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

        return LocalDateTime.parse(input, formatter);
    }
}
