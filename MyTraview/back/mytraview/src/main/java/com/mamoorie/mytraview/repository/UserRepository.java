package com.mamoorie.mytraview.repository;

import com.mamoorie.mytraview.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository <User, String>{

    User findByName(String name);

    User findByEmail(String email);

    User findByEmailAndPw(String email, String pw);

    Boolean existsByEmail(String email);

    void deleteByEmail(String email);

}
