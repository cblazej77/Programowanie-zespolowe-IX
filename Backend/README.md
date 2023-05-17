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
9. W pliku `application.properties` ustaw spring.jpa.hibernate.ddl-auto na `update`
10. Uruchom aplikację po raz drugi

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

3. W postgresie wyślij zapytanie PUT na `http://localhost:8080/api/artist/updateArtistProfile?username=jakub2`
   
   jako parametr `username` podaj nazwę użytkownika którego chcesz edytować
   
   jako body body (`start_date` i `end_date` w formacie `MM/yyyy`):
    ```json
   {
   "bio": "Siema to ja michała",
   "level": "Mid",
   "location": "Warszawa",
   "skills": [
   "Maskotka"
   ],
   "tags": [
   "Fotografia"
   ],
   "languages": [
   "Polski"
   ],
   "education": [
   {
   "school_name": "UMK",
   "faculty": "STEM",
   "field_of_study": "IT",
   "degree": "master",
   "start_date": "01/2001",
   "end_date": "03/2004",
   "description": "string"
   }
   ],
   "experience": [
   {
   "company": "UMK",
   "city": "Trouń",
   "position": "Programmer",
   "description": "programming programs",
   "start_date": "06/2004",
   "end_date": "01/2007"
   }
   ],
   "website": "string",
   "facebook": "string",
   "linkedin": "string",
   "instagram": "string",
   "dribble": "string",
   "pinterest": "string",
   "twitter": "string"
   }
    ```
   Żeby wydobyć z powrotem GET `http://localhost:8080/api/artist/getArtistProfile?username=jakub2`
   Pod 'http://localhost:8080/swagger-ui' znajduje się swagger z dokumentacją API

   http://localhost:8080/api/artist/getShortArtistProfile?username=jakub2

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