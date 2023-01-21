# Jak to uruchomić?
1. Możliwe że IntelliJ nie wykryje projektu, trzeba ustawić manualnie katalogi źródłowe i testowe.

   Sources: `src/main/java`

   Test Sources: `src/test/java`

   Resources: `src/main/resources`

   Excluded: `target`

2. Możliwe że IntelliJ nie wykryje Mavena, wtedy trzeba go dodać w ustawieniach projektu.

   `Project -> Programowanie-zespołowe-IX na górze -> Add Framework Support -> Maven`
    
    Może trzeba będzie przeładować Mavena.

3. W postgresie utwórz baze danych o nazwie `logowanie`
4. W pliku `application.properties` ustaw swoje dane do bazy danych
5. W pliku `application.properties` ustaw spring.jpa.hibernate.ddl-auto na `create`
6. W pliku `application.properties` zakomentuj linię `spring.sql.init.mode=always`
7. Uruchom aplikację po raz pierwszy
8. Odkomentuj linię `spring.sql.init.mode=always`
9. Uruchom aplikację po raz drugi
10. W pliku `application.properties` ustaw spring.jpa.hibernate.ddl-auto na `update`
11. Uruchom aplikację po raz trzeci

# Jak to testować?
1. W postmanie wyślij zapytanie POST na `localhost:8080/api/auth/register`
    z body:
    ```json
    {
    "email": "email",
    "username": "jakub1",
    "password": "password",
    "firstname": "Jakub",
    "lastname": "Kasinski"
    }
    ```
2. W postgresie wyślij zapytanie POST na `localhost:8080/api/auth/login`
   z body:
    ```json
    {
        "username": "admin",
        "password": "admin"
    }
    ```
   
# Wersje zależności
- Java 17.0.6
- Spring Boot Starter 3.0.1
- Spring Security 6.0.1
- Hibernate 6.1.6 Final
- PostgreSQL 42.2.24

# Moje TO-DO list

- Dodać weryfikację przez email
- Dodać logowanie za pomocą innej platformy
- Dodać możliwość rejestrowania się firm
- (Opcjonalnie) Przetestować na froncie
- Ogarnąć dalej Spring Security i JWT
- Pomyśleć nad strukturą serwisu i poprawić TO-DO na mainie

# Timestamp
- 21.01.2022 21:50