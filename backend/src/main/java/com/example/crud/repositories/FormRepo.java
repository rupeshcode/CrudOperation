package com.example.crud.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.crud.models.FormData;

public interface FormRepo extends JpaRepository<FormData, Long> {
    FormData findById(int id);

    @Query(nativeQuery = true, value = """
            SELECT id,city, mobile, first_name, last_name,file_path FROM formdata fd WHERE (?1\\:\\:TEXT IS NULL OR fd\\:\\:TEXT ILIKE ?1)
                    """)

    Page<FormData> getSearchedData(String search, Pageable pageable);

}
