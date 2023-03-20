package com.pz.connection.myproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyProjectApplication {

    //@Autowired
    //private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(MyProjectApplication.class, args);
    }


    /*public static SessionFactory getSessionFactory(){
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                .applySetting(dbSettings())
                .build();
        Metadata metadata = new MetadataSources(serviceRegistry)
                .addAnnotatedClass(User.class)
                .addAnnotatedClass(Client.class)
                .buildMetadata();
        return metadata.buildSessionFactory();

    }

    private static Map<String, String> dbSettings(){

    }*/
////
    ///

}
