package com.example.crud.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.crud.models.FormData;
import com.example.crud.payloads.request.FileForm;
import com.example.crud.payloads.request.FormDataDetails;
import com.example.crud.repositories.FormRepo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin("*")
@RestController
@RequestMapping("/form")
public class FormController {

    @Autowired
    FormRepo formRepo;

    @PostMapping("/add")
    public String addFormData(@RequestParam("file") MultipartFile file, @ModelAttribute FileForm body)
            throws Exception {
        try {
            System.out.println("body" + body);

            String filePath = System.getProperty("user.dir") + "/Uploads" +
                    File.separator
                    + file.getOriginalFilename();

            FileOutputStream fout = new FileOutputStream(filePath);
            fout.write(file.getBytes());

            // Closing the connection
            fout.close();
            FormData fileFormData = new FormData();
            fileFormData.setCity(body.city());
            fileFormData.setFirstName(body.firstName());
            fileFormData.setLastName(body.lastName());
            fileFormData.setMobile(body.mobile());
            fileFormData.setFilePath(filePath);

            formRepo.save(fileFormData);
            return "added";

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Something Went Wrong");
        }

    }

    @PostMapping("/get-all-data")
    public Page<FormData> getAllData(@RequestBody FormDataDetails body) throws Exception {

        // var search =
        // StringUtils.isBlank(reportReq.search()) ? null : "%" + reportReq.search() +
        // "%";

        var search = body.search(); // access the search field directly
        search = StringUtils.isBlank(search) ? null : "%" + search + "%";
        var pagination = body.pagination();

        var pageable = PageRequest.of(pagination.page(), pagination.size());
        Page<FormData> result = formRepo.getSearchedData(search, pageable);

        return result;
    }

    @PostMapping("/delete")
    public String deleteData(@RequestBody FormData body) throws Exception {

        Long id = body.getId();
        formRepo.deleteById(id);

        return "deleted";
    }

    @PostMapping("/edit")
    public String editData(@RequestParam("file") MultipartFile file, @ModelAttribute FormData body) throws Exception {
        String filePath = System.getProperty("user.dir") + "/Uploads" +
                File.separator
                + file.getOriginalFilename();
        FileOutputStream fout = new FileOutputStream(filePath);
        fout.write(file.getBytes());

        // Closing the connection
        fout.close();
        FormData formdata = formRepo.findById(body.getId()).orElseThrow();
        formdata.setFirstName(body.getFirstName());
        formdata.setLastName(body.getLastName());
        formdata.setCity(body.getCity());
        formdata.setMobile(body.getMobile());
        formdata.setFilePath(filePath);
        formRepo.save(formdata);

        return "edited";
    }

}
