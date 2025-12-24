package com.axis.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Configuration
public class JacksonConfig {

    
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
    public static final String TIME_FORMAT = "HH:mm:ss";

    @Bean
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
        JavaTimeModule javaTimeModule = new JavaTimeModule();

        
        javaTimeModule.addSerializer(LocalDate.class,
            new LocalDateSerializer(DateTimeFormatter.ofPattern(DATE_FORMAT)));
        javaTimeModule.addSerializer(LocalDateTime.class,
            new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DATETIME_FORMAT)));
        javaTimeModule.addSerializer(LocalTime.class,
            new LocalTimeSerializer(DateTimeFormatter.ofPattern(TIME_FORMAT)));

        
        javaTimeModule.addDeserializer(LocalDate.class,
            new LocalDateDeserializer(DateTimeFormatter.ofPattern(DATE_FORMAT)));
        javaTimeModule.addDeserializer(LocalDateTime.class,
            new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DATETIME_FORMAT)));
        javaTimeModule.addDeserializer(LocalTime.class,
            new LocalTimeDeserializer(DateTimeFormatter.ofPattern(TIME_FORMAT)));

        return new Jackson2ObjectMapperBuilder()
                .modules(javaTimeModule)
                
                .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                
                .failOnUnknownProperties(false);
    }

    
    @Bean
    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
        return builder.build();
    }
}
