package com.example.crud.payloads.request;

import org.springframework.web.multipart.MultipartFile;

public record FileForm(String firstName, String lastName, String city, String mobile) {

}
