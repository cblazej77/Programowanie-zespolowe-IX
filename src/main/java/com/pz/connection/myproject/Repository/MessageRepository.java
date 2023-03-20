package com.pz.connection.myproject.Repository;

import com.pz.connection.myproject.entity.Message;
import com.pz.connection.myproject.entity.Zlecenia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findMessageByClientidAndUserid(Long clientid, Long userid);
    Optional<Message> findMessageById(Long id);
}
