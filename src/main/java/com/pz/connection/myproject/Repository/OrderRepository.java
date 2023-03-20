package com.pz.connection.myproject.Repository;

import com.pz.connection.myproject.entity.Zlecenia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Zlecenia, Long> {
    List<Zlecenia> findZleceniaByNrZlecenia(Long NrZlecenia);
    List<Zlecenia> findZleceniasByNazwaOrderByDataPublikacjiAsc(String Nazwa);
    List<Zlecenia> findZleceniasByDataPublikacjiEqualsOrderByNazwaAsc(SimpleDateFormat DataPublikacji);
    List<Zlecenia> findZleceniasByDataPublikacjiBeforeOrderByNazwaAsc(SimpleDateFormat DataPublikacji);
    List<Zlecenia> findZleceniasByDataPublikacjiAfterOrderByNazwaAsc(SimpleDateFormat DataPublikacji);
    List<Zlecenia> findZleceniasByWymaganiaContainsOrderByNazwaAsc(String Wymagania);
    List<Zlecenia> findZleceniasByJezykOrderByNazwaAsc(String Jezyk);
}
