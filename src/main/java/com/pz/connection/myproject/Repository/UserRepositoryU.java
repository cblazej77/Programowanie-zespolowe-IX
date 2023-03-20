package com.pz.connection.myproject.Repository;


import com.pz.connection.myproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepositoryU extends JpaRepository<User, Long> {
    List<User> findUserById(Long id);
    List<User> findUserByName(String Name);
    List<User> findUserByNickname(String Nickname);
    //List<User> findUsersByNameOrderByNameAsc(String Name);
    //List<User> findUsersByNameOrderByNameDesc(String Name);
    //List<User> findUserByNickname(String Nickname);
    List<User> findUsersByLiczbaZrealizowanychZlecenGreaterThanEqualOrderByLiczbaZrealizowanychZlecenAsc(Integer LiczbaZrealizowanychZLecen);
    List<User> findUsersByLiczbaZrealizowanychZlecenGreaterThanEqualOrderByLiczbaZrealizowanychZlecenDesc(Integer LiczbaZrealizowanychZLecen);
    List<User> findUsersByJezykOrderByNicknameAsc(String Jezyk);
    List<User> findUsersBySredniaOcenZaZleceniaGreaterThanEqualOrderBySredniaOcenZaZleceniaAsc(Double SredniaOcenZaZlecenia);
    List<User> findUsersBySredniaOcenZaZleceniaGreaterThanEqualOrderBySredniaOcenZaZleceniaDesc(Double SredniaOcenZaZlecenia);
    List<User> findUsersByUmiejetnosciContainsOrderByNicknameAsc(String Umiejetnosci);
}
